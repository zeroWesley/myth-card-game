import { create } from 'zustand'
import type {
  GamePhase, GameMap, CombatState, PlayerRun, EventDef,
  ShopState, CharacterId, MapNode, ShopItem,
} from '../types'
import { CHARACTERS } from '../data/characters'
import { TREASURES, TREASURE_POOL_BY_GRADE } from '../data/treasures'
import { CARDS, COMMON_CARD_POOL } from '../data/cards'
import { EVENTS } from '../data/events'
import { generateMap, getEnemyIdForNode } from '../engine/mapGenerator'
import {
  initCombat, playCard, endTurn, useCharacterSkill, healPlayer,
} from '../engine/combatEngine'

interface GameStore {
  phase: GamePhase
  run: PlayerRun | null
  map: GameMap | null
  combat: CombatState | null
  currentEvent: EventDef | null
  currentShop: ShopState | null
  currentNodeId: string | null

  // 行动
  startRun: (characterId: CharacterId) => void
  selectNode: (nodeId: string) => void
  playCard: (instanceId: string, targetIndex: number) => void
  endTurn: () => void
  useSkill: () => void
  collectReward: (chosenCardId?: string) => void
  chooseEventOption: (choiceIndex: number) => void
  purchaseShopItem: (itemIndex: number) => void
  leaveShop: () => void
  rest: () => void
  upgradeCard: (cardId: string) => void
  goToMap: () => void
  backToMenu: () => void
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateShop(currentDeck: string[]): ShopState {
  const cards = COMMON_CARD_POOL
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .map(id => ({
      type: 'card' as const,
      id,
      price: CARDS[id].rarity === 'rare' ? 120 : CARDS[id].rarity === 'uncommon' ? 85 : 60,
      purchased: false,
    }))

  const treasure: ShopItem = {
    type: 'treasure',
    id: pickRandom(TREASURE_POOL_BY_GRADE.common),
    price: 150,
    purchased: false,
  }

  const removeItem: ShopItem = {
    type: 'remove',
    id: '',
    price: 75,
    purchased: false,
  }

  return { items: [...cards, treasure, removeItem] }
}

export const useGameStore = create<GameStore>((set, get) => ({
  phase: 'main_menu',
  run: null,
  map: null,
  combat: null,
  currentEvent: null,
  currentShop: null,
  currentNodeId: null,

  startRun: (characterId) => {
    const char = CHARACTERS[characterId]
    const run: PlayerRun = {
      characterId,
      hp: char.maxHp,
      maxHp: char.maxHp,
      gold: 100,
      deck: [...char.startingDeck],
      treasures: [],
      fateActivated: false,
      fateCounters: { attackDamageDealt: 0, trickCardsUsed: 0, totalHealed: 0 },
      floor: 1,
    }
    const map = generateMap()
    set({ phase: 'map', run, map, combat: null, currentEvent: null, currentShop: null, currentNodeId: null })
  },

  selectNode: (nodeId) => {
    const { map, run } = get()
    if (!map || !run) return

    const node = map.nodes.find(n => n.id === nodeId)
    if (!node || !node.available || node.completed) return

    // 标记当前节点
    set({ currentNodeId: nodeId })

    if (node.type === 'battle' || node.type === 'elite' || node.type === 'boss') {
      const char = CHARACTERS[run.characterId]
      const treasures = run.treasures.map(id => TREASURES[id]).filter(Boolean)
      const enemyId = getEnemyIdForNode(node, run.floor)
      const combat = initCombat(
        run.hp, run.maxHp,
        run.deck,
        [enemyId],
        char,
        treasures,
        run.fateCounters,
        run.fateActivated,
      )
      set({ phase: 'combat', combat })
    } else if (node.type === 'event') {
      const event = pickRandom(EVENTS)
      set({ phase: 'event', currentEvent: event })
    } else if (node.type === 'shop') {
      const shop = generateShop(run.deck)
      set({ phase: 'shop', currentShop: shop })
    } else if (node.type === 'camp') {
      set({ phase: 'camp' })
    }
  },

  playCard: (instanceId, targetIndex) => {
    const { combat, run } = get()
    if (!combat || !run || combat.phase !== 'player_turn') return
    const char = CHARACTERS[run.characterId]
    const treasures = run.treasures.map(id => TREASURES[id]).filter(Boolean)
    const newCombat = playCard(combat, instanceId, targetIndex, char, treasures)
    set({ combat: newCombat })
  },

  endTurn: () => {
    const { combat, run } = get()
    if (!combat || !run || combat.phase !== 'player_turn') return
    const char = CHARACTERS[run.characterId]
    const treasures = run.treasures.map(id => TREASURES[id]).filter(Boolean)
    const newCombat = endTurn(combat, char, treasures)
    set({ combat: newCombat })

    // 若战斗结束，同步run数据
    if (newCombat.phase === 'victory' || newCombat.phase === 'defeat') {
      const { run: r, currentNodeId, map } = get()
      if (!r) return
      const updatedRun: PlayerRun = {
        ...r,
        hp: newCombat.playerHp,
        fateCounters: newCombat.fateCounters,
        fateActivated: newCombat.fateActivated,
      }
      if (newCombat.phase === 'defeat') {
        set({ phase: 'defeat', run: updatedRun })
      } else {
        // 标记节点完成，解锁下一节点
        if (map && currentNodeId) {
          const updatedMap = markNodeCompleted(map, currentNodeId)
          set({ run: updatedRun, map: updatedMap, combat: newCombat })
        } else {
          set({ run: updatedRun, combat: newCombat })
        }
      }
    }
  },

  useSkill: () => {
    const { combat, run } = get()
    if (!combat || !run || combat.phase !== 'player_turn') return
    const char = CHARACTERS[run.characterId]
    const newCombat = useCharacterSkill(combat, char)
    set({ combat: newCombat })
  },

  collectReward: (chosenCardId) => {
    const { run, currentNodeId, map } = get()
    if (!run) return

    let updatedRun = { ...run }

    // 根据节点类型给予奖励
    const node = map?.nodes.find(n => n.id === currentNodeId)
    if (node) {
      if (node.type === 'battle') updatedRun.gold += 15
      if (node.type === 'elite') {
        updatedRun.gold += 30
        // 随机法宝
        const treasureId = pickRandom(TREASURE_POOL_BY_GRADE.common)
        if (!updatedRun.treasures.includes(treasureId)) {
          updatedRun.treasures = [...updatedRun.treasures, treasureId]
        }
      }
      if (node.type === 'boss') {
        updatedRun.gold += 60
        const treasureId = pickRandom(TREASURE_POOL_BY_GRADE.spirit)
        updatedRun.treasures = [...updatedRun.treasures, treasureId]
        // 进入下一层
        updatedRun.floor = Math.min(3, updatedRun.floor + 1)
      }
    }

    if (chosenCardId) {
      updatedRun.deck = [...updatedRun.deck, chosenCardId]
    }

    const updatedMap = map && currentNodeId ? markNodeCompleted(map, currentNodeId) : map

    set({ run: updatedRun, map: updatedMap, phase: 'map', combat: null })
  },

  chooseEventOption: (choiceIndex) => {
    const { currentEvent, run, currentNodeId, map } = get()
    if (!currentEvent || !run) return
    const choice = currentEvent.choices[choiceIndex]
    if (!choice) return

    let updatedRun = { ...run }
    const effect = choice.effect

    if (effect.hpChange) {
      updatedRun.hp = Math.max(1, Math.min(updatedRun.maxHp, updatedRun.hp + effect.hpChange))
    }
    if (effect.goldChange) {
      updatedRun.gold = Math.max(0, updatedRun.gold + effect.goldChange)
    }
    if (effect.addCard) {
      updatedRun.deck = [...updatedRun.deck, effect.addCard]
    }
    if (effect.addTreasure) {
      if (!updatedRun.treasures.includes(effect.addTreasure)) {
        updatedRun.treasures = [...updatedRun.treasures, effect.addTreasure]
      }
    }

    const updatedMap = map && currentNodeId ? markNodeCompleted(map, currentNodeId) : map
    set({ run: updatedRun, map: updatedMap, phase: 'map', currentEvent: null })
  },

  purchaseShopItem: (itemIndex) => {
    const { currentShop, run } = get()
    if (!currentShop || !run) return
    const item = currentShop.items[itemIndex]
    if (!item || item.purchased || run.gold < item.price) return

    let updatedRun = { ...run, gold: run.gold - item.price }

    if (item.type === 'card') {
      updatedRun.deck = [...updatedRun.deck, item.id]
    } else if (item.type === 'treasure') {
      if (!updatedRun.treasures.includes(item.id)) {
        updatedRun.treasures = [...updatedRun.treasures, item.id]
      }
    }

    const updatedItems = [...currentShop.items]
    updatedItems[itemIndex] = { ...item, purchased: true }
    set({ run: updatedRun, currentShop: { items: updatedItems } })
  },

  leaveShop: () => {
    const { currentNodeId, map } = get()
    const updatedMap = map && currentNodeId ? markNodeCompleted(map, currentNodeId) : map
    set({ phase: 'map', currentShop: null, map: updatedMap })
  },

  rest: () => {
    const { run, currentNodeId, map } = get()
    if (!run) return
    const healAmount = Math.floor(run.maxHp * 0.3)
    const updatedRun = { ...run, hp: Math.min(run.maxHp, run.hp + healAmount) }
    const updatedMap = map && currentNodeId ? markNodeCompleted(map, currentNodeId) : map
    set({ run: updatedRun, map: updatedMap, phase: 'map' })
  },

  upgradeCard: (cardId) => {
    const { run, currentNodeId, map } = get()
    if (!run) return
    // 升级：找到第一张该id的卡牌，替换为同id（暂用id+_u标记，实际engine需处理）
    // MVP简化：直接替换为带upgraded标记的版本
    const idx = run.deck.indexOf(cardId)
    if (idx === -1) return
    const newDeck = [...run.deck]
    newDeck[idx] = cardId + '_u'
    const updatedMap = map && currentNodeId ? markNodeCompleted(map, currentNodeId) : map
    set({ run: { ...run, deck: newDeck }, map: updatedMap, phase: 'map' })
  },

  goToMap: () => set({ phase: 'map' }),

  backToMenu: () => set({
    phase: 'main_menu',
    run: null, map: null, combat: null,
    currentEvent: null, currentShop: null, currentNodeId: null,
  }),
}))

// 开发调试用：全局暴露store
if (typeof window !== 'undefined') {
  ;(window as unknown as Record<string, unknown>).__gameStore = useGameStore
}

/** 标记节点完成，并解锁其连接的下一节点 */
function markNodeCompleted(map: GameMap, nodeId: string): GameMap {
  const nodes = map.nodes.map(n => {
    if (n.id === nodeId) return { ...n, completed: true, available: false }
    // 解锁：若该节点在已完成节点的连接中
    const hasCompletedParent = map.nodes.some(
      p => (p.completed || p.id === nodeId) && p.connections.includes(n.id)
    )
    if (hasCompletedParent && !n.completed) return { ...n, available: true }
    return n
  })
  return { ...map, nodes }
}

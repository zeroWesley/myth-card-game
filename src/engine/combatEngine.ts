import type { CombatState, CombatCard, EnemyState, CardDef, CharacterDef, TreasureDef, EnemyDef } from '../types'
import { CARDS } from '../data/cards'
import { ENEMIES } from '../data/enemies'

// ============================================================
// 战斗引擎 —— 纯函数，不持有任何状态
// ============================================================

let _instanceCounter = 0
const newInstanceId = () => `c${_instanceCounter++}`

export function buildDeck(cardIds: string[]): CombatCard[] {
  return cardIds.map(id => ({ defId: id, instanceId: newInstanceId() }))
}

export function shuffleDeck(deck: CombatCard[]): CombatCard[] {
  const arr = [...deck]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function drawCards(state: CombatState, count: number): CombatState {
  let s = { ...state }
  let deck = [...s.deck]
  let hand = [...s.hand]
  let discard = [...s.discard]

  for (let i = 0; i < count; i++) {
    if (deck.length === 0) {
      if (discard.length === 0) break
      deck = shuffleDeck(discard)
      discard = []
    }
    hand.push(deck.pop()!)
  }
  return { ...s, deck, hand, discard }
}

/** 回合开始 */
export function startTurn(
  state: CombatState,
  charDef: CharacterDef,
  treasures: TreasureDef[]
): CombatState {
  let s: CombatState = { ...state, phase: 'player_turn' as const }

  // 重置格挡（格挡不跨回合）
  s = { ...s, playerBlock: 0, qi: s.qiMax, doubleNextAttack: false }

  // 法宝 onTurnStart 效果
  for (const t of treasures) {
    if (t.trigger === 'onTurnStart') {
      if (t.effect.healPerTurn) {
        s = healPlayer(s, t.effect.healPerTurn)
      }
      if (t.effect.drawOnTurnStart) {
        s = drawCards(s, t.effect.drawOnTurnStart)
      }
    }
  }

  // 摸牌：5 + 角色被动加成
  const baseDrawCount = 5 + (charDef.passiveEffect.drawExtra ?? 0)
  s = drawCards(s, baseDrawCount)
  s = addLog(s, `─── 第 ${s.turn + 1} 回合开始 ─── 摸 ${baseDrawCount} 张牌`)

  return s
}

/** 使用卡牌 */
export function playCard(
  state: CombatState,
  instanceId: string,
  targetIndex: number,
  charDef: CharacterDef,
  treasures: TreasureDef[]
): CombatState {
  let s = { ...state }
  const cardIdx = s.hand.findIndex(c => c.instanceId === instanceId)
  if (cardIdx === -1) return s

  const combatCard = s.hand[cardIdx]
  const def: CardDef | undefined = CARDS[combatCard.defId]
  if (!def) return s

  // 检查气力
  if (s.qi < def.cost) {
    return addLog(s, `气力不足，无法使用「${def.name}」`)
  }

  // 扣气力，从手牌移除
  s = { ...s, qi: s.qi - def.cost }
  const newHand = [...s.hand]
  newHand.splice(cardIdx, 1)

  // 放入弃牌或消耗堆
  if (def.exhausts) {
    s = { ...s, exhaust: [...s.exhaust, combatCard] }
  } else {
    s = { ...s, discard: [...s.discard, combatCard] }
  }
  s = { ...s, hand: newHand }

  // 执行效果
  s = applyCardEffect(s, def, targetIndex, charDef, treasures)

  return s
}

function applyCardEffect(
  state: CombatState,
  def: CardDef,
  targetIndex: number,
  charDef: CharacterDef,
  treasures: TreasureDef[]
): CombatState {
  let s = { ...state }
  const effect = def.effect

  // 伤害
  if (effect.damage && effect.damage > 0) {
    let dmg = effect.damage
    // 翻倍检查
    if (s.doubleNextAttack && def.type === 'attack') {
      dmg *= 2
      s = { ...s, doubleNextAttack: false }
    }
    // 法宝：双倍攻击概率
    for (const t of treasures) {
      if (t.trigger === 'onAttack' && t.effect.doubleAttackChance) {
        if (Math.random() < t.effect.doubleAttackChance) {
          dmg *= 2
          s = addLog(s, `✨ 九齿钉耙触发：伤害翻倍！`)
        }
      }
    }
    // 天命剑客特技双倍
    s = dealDamage(s, targetIndex, dmg)
    // 天命计数：攻击伤害
    if (def.type === 'attack') {
      s = {
        ...s,
        fateCounters: {
          ...s.fateCounters,
          attackDamageDealt: s.fateCounters.attackDamageDealt + dmg,
        },
      }
    }
  }

  // 格挡
  if (effect.block && effect.block > 0) {
    s = { ...s, playerBlock: s.playerBlock + effect.block }
    s = addLog(s, `获得 ${effect.block} 点格挡`)
  }

  // 摸牌
  if (effect.draw && effect.draw > 0) {
    s = drawCards(s, effect.draw)
  }

  // 气力加成
  if (effect.gainQi && effect.gainQi > 0) {
    s = { ...s, qi: Math.min(s.qiMax, s.qi + effect.gainQi) }
    s = addLog(s, `获得 ${effect.gainQi} 点气力`)
  }

  // 气力上限加成（本回合）
  if (effect.qiLimitBonus && effect.qiLimitBonus > 0) {
    s = {
      ...s,
      qiMax: s.qiMax + effect.qiLimitBonus,
      qi: s.qi + effect.qiLimitBonus,
    }
    s = addLog(s, `本回合气力上限 +${effect.qiLimitBonus}`)
  }

  // 下一攻击翻倍
  if (effect.doubleNextAttack) {
    s = { ...s, doubleNextAttack: true }
    s = addLog(s, `下一次攻击伤害翻倍！`)
  }

  // 状态效果
  if (effect.applyStatus) {
    s = applyStatusToEnemy(s, targetIndex, effect.applyStatus)
  }

  // 诡计牌被动：天机谋士摸1张牌
  if (def.type === 'trick' && charDef.id === 'tianji') {
    s = drawCards(s, 1)
    s = {
      ...s,
      fateCounters: {
        ...s.fateCounters,
        trickCardsUsed: s.fateCounters.trickCardsUsed + 1,
      },
    }
  }

  // 特殊卡牌处理
  s = handleSpecialCards(s, def)

  return s
}

function handleSpecialCards(state: CombatState, def: CardDef): CombatState {
  let s = state
  switch (def.id) {
    case 'soul_return': {
      // 从弃牌堆随机取1张到手牌
      if (s.discard.length > 0) {
        const idx = Math.floor(Math.random() * s.discard.length)
        const card = s.discard[idx]
        const newDiscard = [...s.discard]
        newDiscard.splice(idx, 1)
        s = { ...s, hand: [...s.hand, card], discard: newDiscard }
        s = addLog(s, `借尸还魂：从弃牌堆取回「${CARDS[card.defId]?.name ?? card.defId}」`)
      }
      break
    }
    case 'empty_city': {
      // 格挡 = 当前手牌数
      const block = s.hand.length
      s = { ...s, playerBlock: s.playerBlock + block }
      s = addLog(s, `空城计：获得 ${block} 点格挡`)
      break
    }
    case 'healing_rain': {
      s = healPlayer(s, 8)
      break
    }
  }
  return s
}

/** 天同福道专属技能：格挡 = 当前qi */
export function useCharacterSkill(
  state: CombatState,
  charDef: CharacterDef
): CombatState {
  let s = state
  const skill = charDef.skill
  if (s.qi < skill.cost) return addLog(s, '气力不足，无法释放技能')
  s = { ...s, qi: s.qi - skill.cost, skillUsedThisCombat: true }

  if (charDef.id === 'tiantong') {
    // 获得等于当前qi值的格挡（扣费后的qi）
    const block = s.qi
    s = { ...s, playerBlock: s.playerBlock + block }
    s = addLog(s, `金刚护体：获得 ${block} 点格挡`)
  } else if (charDef.id === 'ziwei') {
    s = { ...s, doubleNextAttack: true }
    s = addLog(s, `天命一击：下一张攻击牌伤害翻倍！`)
  } else if (charDef.id === 'tianji') {
    const bonus = skill.effect.qiLimitBonus ?? 3
    s = { ...s, qiMax: s.qiMax + bonus, qi: s.qi + bonus }
    s = addLog(s, `借东风：本回合气力上限 +${bonus}`)
  }

  return s
}

/** 结束回合 */
export function endTurn(
  state: CombatState,
  charDef: CharacterDef,
  treasures: TreasureDef[]
): CombatState {
  let s = state

  // 天同福道被动：有剩余气力则回血
  if (charDef.id === 'tiantong' && charDef.passiveEffect.onTurnEndQiLeft && s.qi > 0) {
    s = healPlayer(s, charDef.passiveEffect.onTurnEndQiLeft.heal)
  }

  // 丢弃手牌
  s = { ...s, discard: [...s.discard, ...s.hand], hand: [] }

  // 重置
  s = { ...s, playerBlock: 0, qi: 3, qiMax: 3, turn: s.turn + 1, phase: 'enemy_turn' }

  // 天命检查
  s = checkFate(s, charDef)

  // 敌人回合
  s = runEnemyTurn(s, treasures)

  // 检查胜负
  if (s.enemies.every(e => e.currentHp <= 0)) {
    s = { ...s, phase: 'victory' }
    s = addLog(s, '🎉 战斗胜利！')
  } else if (s.playerHp <= 0) {
    s = { ...s, phase: 'defeat' }
    s = addLog(s, '💀 战斗失败...')
  } else {
    // 开始新回合
    s = { ...s, phase: 'player_turn' }
    s = startTurn(s, charDef, treasures)
  }

  return s
}

function runEnemyTurn(state: CombatState, treasures: TreasureDef[]): CombatState {
  let s = { ...state }

  for (let i = 0; i < s.enemies.length; i++) {
    const enemy = s.enemies[i]
    if (enemy.currentHp <= 0) continue

    const def: EnemyDef | undefined = ENEMIES[enemy.defId]
    if (!def) continue

    const actionIdx = enemy.nextActionIndex % def.actions.length
    const action = def.actions[actionIdx]

    s = addLog(s, `【${def.name}】${action.description}`)

    if (action.type === 'attack' && action.value) {
      let dmg = action.value
      // 敌人易伤状态：受到25%额外伤害（玩家攻击时处理）
      // 这里是敌人攻击，减去玩家格挡
      const actualDmg = Math.max(0, dmg - s.playerBlock)
      s = { ...s, playerBlock: Math.max(0, s.playerBlock - dmg) }
      if (actualDmg > 0) {
        s = { ...s, playerHp: s.playerHp - actualDmg }
        s = addLog(s, `  受到 ${actualDmg} 点伤害（格挡抵消了 ${dmg - actualDmg} 点）`)

        // 法宝 onHurt
        for (const t of treasures) {
          if (t.trigger === 'onHurt' && t.effect.blockOnHurt && s.turn > 0) {
            s = { ...s, playerBlock: s.playerBlock + t.effect.blockOnHurt }
          }
        }
      }
    } else if (action.type === 'defend' && action.value) {
      const enemies = [...s.enemies]
      enemies[i] = { ...enemies[i], block: enemies[i].block + action.value }
      s = { ...s, enemies }
    }

    // 推进动作索引
    const enemies = [...s.enemies]
    enemies[i] = { ...enemies[i], nextActionIndex: (actionIdx + 1) }
    s = { ...s, enemies }

    // dot效果：burn/poison
    s = applyDoTEffects(s, i)
  }

  return s
}

function applyDoTEffects(state: CombatState, enemyIndex: number): CombatState {
  let s = state
  const enemy = s.enemies[enemyIndex]
  const enemies = [...s.enemies]

  if (enemy.statuses.burn && enemy.statuses.burn > 0) {
    const dmg = enemy.statuses.burn
    enemies[enemyIndex] = {
      ...enemy,
      currentHp: enemy.currentHp - dmg,
      statuses: { ...enemy.statuses, burn: Math.max(0, enemy.statuses.burn - 1) },
    }
    s = addLog(s, `  「${ENEMIES[enemy.defId]?.name}」灼烧 ${dmg} 伤害`)
    s = { ...s, enemies }
  }
  if (enemy.statuses.poison && enemy.statuses.poison > 0) {
    const dmg = enemy.statuses.poison
    enemies[enemyIndex] = {
      ...enemies[enemyIndex],
      currentHp: enemies[enemyIndex].currentHp - dmg,
      statuses: { ...enemies[enemyIndex].statuses, poison: Math.max(0, enemy.statuses.poison - 1) },
    }
    s = addLog(s, `  「${ENEMIES[enemy.defId]?.name}」中毒 ${dmg} 伤害`)
    s = { ...s, enemies }
  }

  return s
}

function dealDamage(state: CombatState, targetIndex: number, damage: number): CombatState {
  let s = state
  if (targetIndex < 0 || targetIndex >= s.enemies.length) return s

  const enemies = [...s.enemies]
  const enemy = { ...enemies[targetIndex] }
  const enemyDef = ENEMIES[enemy.defId]

  // 易伤状态：伤害+25%
  let finalDmg = damage
  if (enemy.statuses.vulnerable) {
    finalDmg = Math.floor(finalDmg * 1.25)
  }

  const actualDmg = Math.max(0, finalDmg - enemy.block)
  enemy.block = Math.max(0, enemy.block - finalDmg)
  enemy.currentHp -= actualDmg

  s = addLog(s, `对「${enemyDef?.name ?? enemy.defId}」造成 ${actualDmg} 点伤害（格挡抵消 ${finalDmg - actualDmg} 点）`)

  enemies[targetIndex] = enemy
  return { ...s, enemies }
}

function applyStatusToEnemy(state: CombatState, targetIndex: number, status: string): CombatState {
  if (targetIndex < 0 || targetIndex >= state.enemies.length) return state
  const enemies = [...state.enemies]
  const enemy = { ...enemies[targetIndex] }
  const current = (enemy.statuses as Record<string, number>)[status] ?? 0;
  (enemy.statuses as Record<string, number>)[status] = current + 1
  enemies[targetIndex] = enemy
  return addLog({ ...state, enemies }, `敌人获得「${status}」状态`)
}

export function healPlayer(state: CombatState, amount: number): CombatState {
  const newHp = Math.min(state.playerMaxHp, state.playerHp + amount)
  const actual = newHp - state.playerHp
  const s = {
    ...state,
    playerHp: newHp,
    fateCounters: {
      ...state.fateCounters,
      totalHealed: state.fateCounters.totalHealed + actual,
    },
  }
  return addLog(s, `恢复 ${actual} 点生命（当前 ${newHp}/${state.playerMaxHp}）`)
}

function checkFate(state: CombatState, charDef: CharacterDef): CombatState {
  if (state.fateActivated) return state
  const { conditionKey, conditionValue } = charDef.fateDef
  if (state.fateCounters[conditionKey] >= conditionValue) {
    return addLog(
      { ...state, fateActivated: true },
      `⚡️ 天命激活！「${charDef.fateDef.effectDescription}」`
    )
  }
  return state
}

function addLog(state: CombatState, msg: string): CombatState {
  return { ...state, log: [...state.log.slice(-50), msg] }
}

/** 初始化战斗状态 */
export function initCombat(
  playerHp: number,
  playerMaxHp: number,
  deckIds: string[],
  enemyIds: string[],
  charDef: CharacterDef,
  treasures: TreasureDef[],
  fateCounters: CombatState['fateCounters'],
  fateActivated: boolean
): CombatState {
  const deck = shuffleDeck(buildDeck(deckIds))
  const enemies: EnemyState[] = enemyIds.map(id => {
    const def = ENEMIES[id]
    return {
      defId: id,
      currentHp: def.maxHp,
      maxHp: def.maxHp,
      block: 0,
      statuses: {},
      nextActionIndex: 0,
    }
  })

  let state: CombatState = {
    phase: 'player_turn',
    playerHp,
    playerMaxHp,
    playerBlock: 0,
    qi: 3,
    qiMax: 3,
    hand: [],
    deck,
    discard: [],
    exhaust: [],
    enemies,
    turn: 0,
    log: [],
    skillUsedThisCombat: false,
    doubleNextAttack: false,
    fateCounters,
    fateActivated,
  }

  // 法宝战斗开始效果
  for (const t of treasures) {
    if (t.trigger === 'onBattleStart') {
      if (t.effect.blockOnHurt) { // 日月宝伞：战斗开始获得格挡
        state = { ...state, playerBlock: state.playerBlock + t.effect.blockOnHurt }
      }
      if (t.effect.copyCard && state.deck.length > 0) {
        const firstCard = state.deck[0]
        state = { ...state, deck: [...state.deck, { ...firstCard, instanceId: newInstanceId() }] }
      }
    }
  }

  // 摸初始手牌
  state = startTurn(state, charDef, treasures)

  return state
}

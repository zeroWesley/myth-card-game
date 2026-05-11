// ============================================================
// 核心类型定义
// ============================================================

export type CardType = 'attack' | 'defense' | 'spell' | 'trick'
export type CardRarity = 'common' | 'uncommon' | 'rare'
export type TreasureGrade = 'common' | 'spirit' | 'immortal'
export type NodeType = 'battle' | 'elite' | 'event' | 'shop' | 'camp' | 'boss'
export type StatusEffect = 'burn' | 'poison' | 'weak' | 'vulnerable' | 'charm'
export type CharacterId = 'ziwei' | 'tianji' | 'tiantong'

// ---- 卡牌 ----
export interface CardEffect {
  damage?: number
  block?: number
  draw?: number
  gainQi?: number
  applyStatus?: StatusEffect
  doubleNextAttack?: boolean
  qiLimitBonus?: number
}

export type CardId = string

export interface CardDef {
  id: CardId
  name: string
  type: CardType
  rarity: CardRarity
  cost: number
  description: string
  effect: CardEffect
  upgradedEffect?: CardEffect
  exhausts?: boolean
  ethereal?: boolean
}

// ---- 角色 ----
export interface CharacterSkillEffect {
  block?: number
  draw?: number
  gainQi?: number
  qiLimitBonus?: number
  doubleNextAttack?: boolean
  damage?: number
}

export interface CharacterSkill {
  name: string
  description: string
  cost: number
  effect: CharacterSkillEffect
}

export interface CharacterPassiveEffect {
  drawExtra?: number
  onTrickUsed?: { draw: number }
  onTurnEndQiLeft?: { heal: number }
}

export interface FateDef {
  condition: string
  conditionKey: 'attackDamageDealt' | 'trickCardsUsed' | 'totalHealed'
  conditionValue: number
  effectDescription: string
}

export interface CharacterDef {
  id: CharacterId
  name: string
  title: string
  description: string
  color: string
  maxHp: number
  passive: string
  passiveEffect: CharacterPassiveEffect
  skill: CharacterSkill
  startingDeck: CardId[]
  fateDef: FateDef
}

// ---- 法宝 ----
export interface TreasureEffect {
  healPerTurn?: number
  doubleAttackChance?: number
  copyCard?: boolean
  drawOnTurnStart?: number
  blockOnHurt?: number
  maxHpBonus?: number
}

export interface TreasureDef {
  id: string
  name: string
  grade: TreasureGrade
  description: string
  trigger: 'passive' | 'onBattleStart' | 'onTurnStart' | 'onAttack' | 'onHurt' | 'onCardUsed'
  effect: TreasureEffect
}

// ---- 敌人 ----
export type EnemyIntent = 'attack' | 'defend' | 'buff' | 'special'

export interface EnemyAction {
  type: EnemyIntent
  value?: number
  description: string
  applyStatus?: StatusEffect
}

export interface EnemyDef {
  id: string
  name: string
  maxHp: number
  actions: EnemyAction[]
  isBoss?: boolean
  reward?: { gold?: number; card?: boolean; treasure?: boolean }
}

// ---- 地图 ----
export interface MapNode {
  id: string
  type: NodeType
  layer: number
  col: number
  connections: string[]
  completed: boolean
  available: boolean
}

export interface GameMap {
  nodes: MapNode[]
  currentNodeId: string | null
  bossNodeIds: string[]
}

// ---- 战斗状态 ----
export interface CombatCard {
  defId: CardId
  instanceId: string
}

export interface EnemyState {
  defId: string
  currentHp: number
  maxHp: number
  block: number
  statuses: Partial<Record<StatusEffect, number>>
  nextActionIndex: number
}

export interface FateCounters {
  attackDamageDealt: number
  trickCardsUsed: number
  totalHealed: number
}

export interface CombatState {
  phase: 'player_turn' | 'enemy_turn' | 'victory' | 'defeat'
  playerHp: number
  playerMaxHp: number
  playerBlock: number
  qi: number
  qiMax: number
  hand: CombatCard[]
  deck: CombatCard[]
  discard: CombatCard[]
  exhaust: CombatCard[]
  enemies: EnemyState[]
  turn: number
  log: string[]
  skillUsedThisCombat: boolean
  doubleNextAttack: boolean
  fateCounters: FateCounters
  fateActivated: boolean
}

// ---- 玩家存档 ----
export interface PlayerRun {
  characterId: CharacterId
  hp: number
  maxHp: number
  gold: number
  deck: CardId[]
  treasures: string[]
  fateActivated: boolean
  fateCounters: FateCounters
  floor: number
}

// ---- 全局游戏阶段 ----
export type GamePhase =
  | 'main_menu'
  | 'character_select'
  | 'map'
  | 'combat'
  | 'event'
  | 'shop'
  | 'camp'
  | 'victory'
  | 'defeat'

// ---- 事件 ----
export interface EventEffect {
  hpChange?: number
  goldChange?: number
  addCard?: CardId
  removeCard?: boolean
  addTreasure?: string
}

export interface EventChoice {
  text: string
  outcome: string
  effect: EventEffect
}

export interface EventDef {
  id: string
  title: string
  description: string
  choices: EventChoice[]
}

// ---- 商店 ----
export interface ShopItem {
  type: 'card' | 'treasure' | 'remove'
  id: string
  price: number
  purchased: boolean
}

export interface ShopState {
  items: ShopItem[]
}

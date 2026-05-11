import type { CardDef } from '../types'

// ============================================================
// 卡牌数据定义（MVP：30张）
// ============================================================

export const CARDS: Record<string, CardDef> = {

  // ===== 通用攻击牌 =====
  strike: {
    id: 'strike',
    name: '击打',
    type: 'attack',
    rarity: 'common',
    cost: 1,
    description: '造成 6 点伤害。',
    effect: { damage: 6 },
    upgradedEffect: { damage: 9 },
  },
  heavy_strike: {
    id: 'heavy_strike',
    name: '重击',
    type: 'attack',
    rarity: 'common',
    cost: 2,
    description: '造成 14 点伤害。',
    effect: { damage: 14 },
    upgradedEffect: { damage: 20 },
  },
  twin_strike: {
    id: 'twin_strike',
    name: '双刺',
    type: 'attack',
    rarity: 'common',
    cost: 1,
    description: '造成 5 点伤害，再造成 5 点伤害。',
    effect: { damage: 5 },  // engine 层面处理两次
    upgradedEffect: { damage: 7 },
  },
  tiger_roar: {
    id: 'tiger_roar',
    name: '虎啸',
    type: 'attack',
    rarity: 'uncommon',
    cost: 2,
    description: '造成 12 点伤害，附加「易伤」状态（受到伤害+25%）。',
    effect: { damage: 12, applyStatus: 'vulnerable' },
    upgradedEffect: { damage: 16, applyStatus: 'vulnerable' },
  },
  thunder_palm: {
    id: 'thunder_palm',
    name: '雷霆掌',
    type: 'attack',
    rarity: 'rare',
    cost: 3,
    description: '造成 24 点伤害，附加「灼烧」2 层。',
    effect: { damage: 24, applyStatus: 'burn' },
    upgradedEffect: { damage: 30, applyStatus: 'burn' },
  },
  piercing_sword: {
    id: 'piercing_sword',
    name: '穿心剑',
    type: 'attack',
    rarity: 'uncommon',
    cost: 2,
    description: '造成 18 点伤害，无视格挡。',
    effect: { damage: 18 },
    upgradedEffect: { damage: 24 },
  },

  // ===== 通用防御牌 =====
  guard: {
    id: 'guard',
    name: '格挡',
    type: 'defense',
    rarity: 'common',
    cost: 1,
    description: '获得 5 点格挡。',
    effect: { block: 5 },
    upgradedEffect: { block: 8 },
  },
  iron_body: {
    id: 'iron_body',
    name: '金刚护体',
    type: 'defense',
    rarity: 'common',
    cost: 1,
    description: '获得 8 点格挡。',
    effect: { block: 8 },
    upgradedEffect: { block: 12 },
  },
  bagua_shield: {
    id: 'bagua_shield',
    name: '八卦盾',
    type: 'defense',
    rarity: 'uncommon',
    cost: 2,
    description: '获得 14 点格挡，摸 1 张牌。',
    effect: { block: 14, draw: 1 },
    upgradedEffect: { block: 18, draw: 1 },
  },
  tortoise_shell: {
    id: 'tortoise_shell',
    name: '玄龟壳',
    type: 'defense',
    rarity: 'rare',
    cost: 0,
    description: '获得 4 点格挡。',
    effect: { block: 4 },
    upgradedEffect: { block: 7 },
  },

  // ===== 法术牌 =====
  borrow_wind: {
    id: 'borrow_wind',
    name: '借东风',
    type: 'spell',
    rarity: 'uncommon',
    cost: 1,
    description: '本回合气力上限 +3。',
    effect: { qiLimitBonus: 3 },
    upgradedEffect: { qiLimitBonus: 5 },
  },
  five_thunder: {
    id: 'five_thunder',
    name: '五雷法',
    type: 'spell',
    rarity: 'rare',
    cost: 2,
    description: '造成 10 点伤害，摸 2 张牌。',
    effect: { damage: 10, draw: 2 },
    upgradedEffect: { damage: 14, draw: 2 },
  },
  meditation: {
    id: 'meditation',
    name: '打坐',
    type: 'spell',
    rarity: 'common',
    cost: 1,
    description: '摸 2 张牌。',
    effect: { draw: 2 },
    upgradedEffect: { draw: 3 },
  },
  qi_gathering: {
    id: 'qi_gathering',
    name: '聚气',
    type: 'spell',
    rarity: 'uncommon',
    cost: 0,
    description: '获得 2 点额外气力。',
    effect: { gainQi: 2 },
    upgradedEffect: { gainQi: 3 },
    exhausts: true,
  },
  healing_rain: {
    id: 'healing_rain',
    name: '甘霖法',
    type: 'spell',
    rarity: 'uncommon',
    cost: 2,
    description: '恢复 8 点生命。',
    effect: { block: 0 },  // handled specially by engine (heal)
    upgradedEffect: {},
  },

  // ===== 诡计牌 =====
  soul_return: {
    id: 'soul_return',
    name: '借尸还魂',
    type: 'trick',
    rarity: 'rare',
    cost: 0,
    description: '从弃牌堆随机取回 1 张牌到手牌，消耗本牌。',
    effect: { draw: 0 },  // engine 特殊处理
    exhausts: true,
  },
  flower_swap: {
    id: 'flower_swap',
    name: '移花接木',
    type: 'trick',
    rarity: 'uncommon',
    cost: 1,
    description: '弃掉手牌中任意张牌，等量摸牌。',
    effect: { draw: 0 },  // engine 特殊处理
  },
  empty_city: {
    id: 'empty_city',
    name: '空城计',
    type: 'trick',
    rarity: 'uncommon',
    cost: 1,
    description: '获得等于手牌数量的格挡。',
    effect: { block: 0 },  // engine 特殊处理
  },
  thirty_six: {
    id: 'thirty_six',
    name: '三十六计',
    type: 'trick',
    rarity: 'rare',
    cost: 2,
    description: '摸 3 张牌，本回合结束时丢弃额外摸到的牌。',
    effect: { draw: 3 },
    ethereal: true,
    exhausts: true,
  },

  // ===== 紫薇剑客专属 =====
  ziwei_blade: {
    id: 'ziwei_blade',
    name: '紫薇剑法',
    type: 'attack',
    rarity: 'uncommon',
    cost: 1,
    description: '造成 8 点伤害，下一次攻击伤害翻倍。',
    effect: { damage: 8, doubleNextAttack: true },
    upgradedEffect: { damage: 12, doubleNextAttack: true },
  },
  star_burst: {
    id: 'star_burst',
    name: '星辰爆',
    type: 'attack',
    rarity: 'rare',
    cost: 3,
    description: '造成 30 点伤害，摸 1 张牌。',
    effect: { damage: 30, draw: 1 },
    upgradedEffect: { damage: 40, draw: 1 },
  },

  // ===== 天机谋士专属 =====
  stratagem: {
    id: 'stratagem',
    name: '阵法',
    type: 'trick',
    rarity: 'uncommon',
    cost: 1,
    description: '摸 2 张牌，造成 4 点伤害。',
    effect: { draw: 2, damage: 4 },
    upgradedEffect: { draw: 2, damage: 7 },
  },
  ghost_step: {
    id: 'ghost_step',
    name: '鬼步',
    type: 'trick',
    rarity: 'rare',
    cost: 2,
    description: '获得 12 点格挡，摸 2 张牌。',
    effect: { block: 12, draw: 2 },
    upgradedEffect: { block: 16, draw: 2 },
  },

  // ===== 天同福道专属 =====
  compassion: {
    id: 'compassion',
    name: '慈悲掌',
    type: 'defense',
    rarity: 'uncommon',
    cost: 1,
    description: '获得 10 点格挡，摸 1 张牌。',
    effect: { block: 10, draw: 1 },
    upgradedEffect: { block: 14, draw: 1 },
  },
  blessing: {
    id: 'blessing',
    name: '福泽加身',
    type: 'spell',
    rarity: 'rare',
    cost: 2,
    description: '获得 6 点格挡，摸 2 张牌，获得 1 点气力。',
    effect: { block: 6, draw: 2, gainQi: 1 },
    upgradedEffect: { block: 8, draw: 2, gainQi: 2 },
    exhausts: true,
  },
}

// 获取所有卡牌列表
export const getAllCards = (): CardDef[] => Object.values(CARDS)

// 通用卡牌池（不含角色专属）
export const COMMON_CARD_POOL: CardId[] = [
  'strike', 'heavy_strike', 'twin_strike', 'tiger_roar', 'thunder_palm', 'piercing_sword',
  'guard', 'iron_body', 'bagua_shield', 'tortoise_shell',
  'borrow_wind', 'five_thunder', 'meditation', 'qi_gathering',
  'soul_return', 'flower_swap', 'empty_city', 'thirty_six',
]

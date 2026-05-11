import type { EnemyDef } from '../types'

export const ENEMIES: Record<string, EnemyDef> = {
  // ===== 第一层 普通敌人 =====
  shansao: {
    id: 'shansao',
    name: '山魈',
    maxHp: 42,
    actions: [
      { type: 'attack', value: 8, description: '抓击 8' },
      { type: 'attack', value: 8, description: '抓击 8' },
      { type: 'buff', description: '积蓄怒气（下次攻击+6）' },
      { type: 'attack', value: 14, description: '暴走猛击 14' },
    ],
    reward: { gold: 12, card: true },
  },
  fox_spirit: {
    id: 'fox_spirit',
    name: '狐狸精',
    maxHp: 35,
    actions: [
      { type: 'attack', value: 6, description: '媚爪 6', applyStatus: 'charm' },
      { type: 'defend', value: 8, description: '魅惑屏障' },
      { type: 'attack', value: 10, description: '妖术 10' },
    ],
    reward: { gold: 10, card: true },
  },
  yaksha: {
    id: 'yaksha',
    name: '夜叉',
    maxHp: 55,
    actions: [
      { type: 'attack', value: 10, description: '魔拳 10' },
      { type: 'defend', value: 12, description: '金刚不坏' },
      { type: 'attack', value: 10, description: '魔拳 10' },
      { type: 'special', description: '召唤小鬼（下回合+4伤害）' },
    ],
    reward: { gold: 14, card: true },
  },
  white_snake: {
    id: 'white_snake',
    name: '白蛇',
    maxHp: 38,
    actions: [
      { type: 'attack', value: 7, description: '毒牙 7', applyStatus: 'poison' },
      { type: 'attack', value: 7, description: '毒牙 7', applyStatus: 'poison' },
      { type: 'buff', description: '蜕皮（回复12血）' },
    ],
    reward: { gold: 11, card: true },
  },

  // ===== 第二层 普通敌人 =====
  hell_soldier: {
    id: 'hell_soldier',
    name: '阴兵',
    maxHp: 60,
    actions: [
      { type: 'attack', value: 12, description: '阴刀 12' },
      { type: 'defend', value: 10, description: '阴盾' },
      { type: 'attack', value: 12, description: '阴刀 12' },
      { type: 'attack', value: 18, description: '群体阴击 18' },
    ],
    reward: { gold: 16, card: true },
  },
  bone_demon: {
    id: 'bone_demon',
    name: '骷髅将',
    maxHp: 70,
    actions: [
      { type: 'attack', value: 14, description: '骨刃 14' },
      { type: 'buff', description: '召集骨兵（下次攻击+8）' },
      { type: 'attack', value: 22, description: '万骨冲 22' },
      { type: 'defend', value: 15, description: '骨盾' },
    ],
    reward: { gold: 18, card: true },
  },

  // ===== 第三层 普通敌人 =====
  heaven_soldier: {
    id: 'heaven_soldier',
    name: '天兵',
    maxHp: 80,
    actions: [
      { type: 'attack', value: 16, description: '天戟 16' },
      { type: 'defend', value: 18, description: '天盾' },
      { type: 'attack', value: 16, description: '天戟 16' },
      { type: 'special', description: '天罚警示（施加易伤）', applyStatus: 'vulnerable' },
    ],
    reward: { gold: 20, card: true },
  },

  // ===== 精英 =====
  zhong_kui: {
    id: 'zhong_kui',
    name: '钟馗',
    maxHp: 110,
    actions: [
      { type: 'special', description: '召唤小鬼 ×2（各造成3伤害/回合）' },
      { type: 'attack', value: 20, description: '捉鬼斩 20' },
      { type: 'defend', value: 16, description: '判官盾' },
      { type: 'attack', value: 25, description: '地狱之怒 25' },
    ],
    reward: { gold: 35, card: true, treasure: true },
  },
  sun_wukong_early: {
    id: 'sun_wukong_early',
    name: '孙悟空（前期）',
    maxHp: 130,
    actions: [
      { type: 'defend', value: 999, description: '金刚不坏（前3回合免疫所有伤害）' },
      { type: 'defend', value: 999, description: '金刚不坏' },
      { type: 'defend', value: 999, description: '金刚不坏' },
      { type: 'attack', value: 35, description: '如意棒全力 35' },
      { type: 'attack', value: 20, description: '七十二变 20', applyStatus: 'weak' },
    ],
    reward: { gold: 40, card: true, treasure: true },
  },

  // ===== BOSS =====
  nezha: {
    id: 'nezha',
    name: '哪吒三太子',
    maxHp: 200,
    isBoss: true,
    actions: [
      { type: 'attack', value: 18, description: '乾坤圈 18' },
      { type: 'defend', value: 20, description: '天命护盾（弃置手牌以减半伤害）' },
      { type: 'attack', value: 24, description: '混天绫 24', applyStatus: 'burn' },
      { type: 'special', description: '风火轮（下回合攻击+10）' },
      { type: 'attack', value: 32, description: '火尖枪 32' },
    ],
    reward: { gold: 60, treasure: true },
  },
  dragon_king: {
    id: 'dragon_king',
    name: '四海龙王',
    maxHp: 260,
    isBoss: true,
    actions: [
      { type: 'attack', value: 15, description: '海浪 15' },
      { type: 'special', description: '龙威（海浪伤害+5叠加）' },
      { type: 'attack', value: 20, description: '暴风骤雨 20' },
      { type: 'defend', value: 25, description: '龙鳞护体' },
      { type: 'attack', value: 35, description: '龙卷风 35', applyStatus: 'vulnerable' },
    ],
    reward: { gold: 80, treasure: true },
  },
  jade_emperor: {
    id: 'jade_emperor',
    name: '玉皇大帝',
    maxHp: 320,
    isBoss: true,
    actions: [
      { type: 'attack', value: 20, description: '天罚 20' },
      { type: 'buff', description: '天威（若玩家本回合出牌超5张，雷击25）' },
      { type: 'attack', value: 22, description: '天庭神鞭 22' },
      { type: 'defend', value: 30, description: '玉帝之盾' },
      { type: 'special', description: '封印（随机封锁1张手牌无法使用）' },
      { type: 'attack', value: 40, description: '万雷降临 40' },
    ],
    reward: { gold: 100 },
  },
}

// 按层分组（用于地图生成时随机敌人）
export const ENEMY_POOL: Record<number, string[]> = {
  1: ['shansao', 'fox_spirit', 'yaksha', 'white_snake'],
  2: ['hell_soldier', 'bone_demon'],
  3: ['heaven_soldier'],
}

export const ELITE_POOL: Record<number, string[]> = {
  1: ['zhong_kui'],
  2: ['sun_wukong_early'],
  3: ['zhong_kui', 'sun_wukong_early'],
}

export const BOSS_PER_FLOOR: Record<number, string> = {
  1: 'nezha',
  2: 'dragon_king',
  3: 'jade_emperor',
}

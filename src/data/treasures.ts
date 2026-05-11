import type { TreasureDef } from '../types'

export const TREASURES: Record<string, TreasureDef> = {
  // ===== 凡器 =====
  golden_gourd: {
    id: 'golden_gourd',
    name: '紫金葫芦',
    grade: 'common',
    description: '每回合开始恢复 1 点生命。',
    trigger: 'onTurnStart',
    effect: { healPerTurn: 1 },
  },
  jade_amulet: {
    id: 'jade_amulet',
    name: '白玉护身符',
    grade: 'common',
    description: '每回合开始摸 1 张额外牌。',
    trigger: 'onTurnStart',
    effect: { drawOnTurnStart: 1 },
  },
  iron_shield: {
    id: 'iron_shield',
    name: '黑铁盾',
    grade: 'common',
    description: '受到伤害时额外获得 3 点格挡（仅当回合）。',
    trigger: 'onHurt',
    effect: { blockOnHurt: 3 },
  },
  // ===== 灵器 =====
  nine_tine_rake: {
    id: 'nine_tine_rake',
    name: '九齿钉耙',
    grade: 'spirit',
    description: '攻击命中时有 25% 概率造成双倍伤害。',
    trigger: 'onAttack',
    effect: { doubleAttackChance: 0.25 },
  },
  sun_umbrella: {
    id: 'sun_umbrella',
    name: '日月宝伞',
    grade: 'spirit',
    description: '战斗开始时获得 8 点格挡。',
    trigger: 'onBattleStart',
    effect: { blockOnHurt: 8 },
  },
  qi_ring: {
    id: 'qi_ring',
    name: '乾坤圈',
    grade: 'spirit',
    description: '最大生命上限 +15。',
    trigger: 'passive',
    effect: { maxHpBonus: 15 },
  },
  // ===== 仙器 =====
  universe_map: {
    id: 'universe_map',
    name: '山河社稷图',
    grade: 'immortal',
    description: '每场战斗开始时，将手牌中第一张牌复制一份。',
    trigger: 'onBattleStart',
    effect: { copyCard: true },
  },
}

export const TREASURE_POOL_BY_GRADE = {
  common: ['golden_gourd', 'jade_amulet', 'iron_shield'],
  spirit: ['nine_tine_rake', 'sun_umbrella', 'qi_ring'],
  immortal: ['universe_map'],
}

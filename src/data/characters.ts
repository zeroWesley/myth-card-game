import type { CharacterDef } from '../types'

export const CHARACTERS: Record<string, CharacterDef> = {
  ziwei: {
    id: 'ziwei',
    name: '紫薇剑客',
    title: '帝星命将',
    description: '以星宿之力驱剑，攻势如潮。专精攻击流，每回合额外摸牌，天命一击可将下一张攻击翻倍。',
    color: '#8b5cf6',
    maxHp: 80,
    passive: '每回合开始额外摸 1 张牌。',
    passiveEffect: { drawExtra: 1 },
    skill: {
      name: '天命一击',
      description: '下一张攻击牌伤害翻倍。',
      cost: 3,
      effect: { doubleNextAttack: true },
    },
    startingDeck: [
      'strike', 'strike', 'strike', 'strike', 'strike',
      'iron_body', 'iron_body', 'guard',
      'ziwei_blade', 'meditation',
    ],
    fateDef: {
      condition: '本局攻击牌合计造成 500 点伤害',
      conditionKey: 'attackDamageDealt',
      conditionValue: 500,
      effectDescription: '所有攻击牌费用永久 -1（最低0）',
    },
  },

  tianji: {
    id: 'tianji',
    name: '天机谋士',
    title: '算命先生',
    description: '运筹帷幄，以谋制敌。专精控制诡计流，每使用一张诡计牌额外摸牌，天命激活后可预知敌人行动。',
    color: '#06b6d4',
    maxHp: 72,
    passive: '每次使用诡计牌后额外摸 1 张牌。',
    passiveEffect: { onTrickUsed: { draw: 1 } },
    skill: {
      name: '借东风',
      description: '本回合气力上限 +3。',
      cost: 2,
      effect: { qiLimitBonus: 3 },
    },
    startingDeck: [
      'strike', 'strike', 'strike',
      'guard', 'guard',
      'stratagem', 'stratagem',
      'flower_swap', 'soul_return',
      'meditation',
    ],
    fateDef: {
      condition: '本局使用 30 张诡计牌',
      conditionKey: 'trickCardsUsed',
      conditionValue: 30,
      effectDescription: '每回合开始预知敌人下一步行动（显示意图）',
    },
  },

  tiantong: {
    id: 'tiantong',
    name: '天同福道',
    title: '福泽护道',
    description: '以德御剑，以守为攻。专精防御回复流，气力未用完则自动回血，天命激活后每层开始恢复血量。',
    color: '#10b981',
    maxHp: 90,
    passive: '回合结束时，若有剩余气力则恢复 1 点生命。',
    passiveEffect: { onTurnEndQiLeft: { heal: 1 } },
    skill: {
      name: '金刚护体',
      description: '获得等于当前剩余气力值的格挡。',
      cost: 1,
      effect: { block: 0 },  // engine 动态计算：block = 当前qi
    },
    startingDeck: [
      'strike', 'strike',
      'iron_body', 'iron_body', 'iron_body', 'guard', 'guard',
      'compassion',
      'meditation',
      'blessing',
    ],
    fateDef: {
      condition: '本局累计恢复 50 点生命',
      conditionKey: 'totalHealed',
      conditionValue: 50,
      effectDescription: '每层开始自动恢复 15 点生命',
    },
  },
}

export const ALL_CHARACTERS = Object.values(CHARACTERS)

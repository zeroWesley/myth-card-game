import type { EventDef } from '../types'

export const EVENTS: EventDef[] = [
  {
    id: 'ancient_shrine',
    title: '古神祠',
    description: '荒野中矗立着一座古老的神祠，香烟缭绕，似有神明驻守。神祠内有一只残破的香炉，上书「虔诚者得福，贪婪者受戮」。',
    choices: [
      {
        text: '献上 50 金币祈愿',
        outcome: '神明感念你的虔诚，赐下一件法宝碎片！',
        effect: { goldChange: -50, addTreasure: 'golden_gourd' },
      },
      {
        text: '取走香炉中的香灰（获得 30 金）',
        outcome: '你感觉一阵寒意袭来……神明降下惩戒，失去 10 点生命。',
        effect: { goldChange: 30, hpChange: -10 },
      },
      {
        text: '默默离开',
        outcome: '你选择了不打扰，平安离开。',
        effect: {},
      },
    ],
  },
  {
    id: 'wandering_merchant',
    title: '流浪术士',
    description: '路旁坐着一位老术士，怀抱书卷，见你走来，递出一卷泛黄的符文。「此符价值连城，贫道以 75 金换你一件法宝，如何？」',
    choices: [
      {
        text: '以 75 金换取一张稀有卡牌',
        outcome: '术士展颜而笑，递来一张散发着金光的卡牌。',
        effect: { goldChange: -75, addCard: 'thunder_palm' },
      },
      {
        text: '出手 25 金，只换取符文指引（摸1牌）',
        outcome: '术士指点了你一些战术要领，你感到思路清晰。',
        effect: { goldChange: -25 },
      },
      {
        text: '谢绝离开',
        outcome: '术士耸耸肩，重新闭目养神。',
        effect: {},
      },
    ],
  },
  {
    id: 'demon_spring',
    title: '妖泉',
    description: '林间有一潭碧绿色的泉水，水中隐约可见奇异的光芒。附近的告示牌写着「妖泉，饮者神力大增，然有中毒之虞」。',
    choices: [
      {
        text: '痛饮妖泉（恢复20血，有50%概率中毒-10血）',
        outcome: '泉水清凉甘甜，你感到精力充沛！',
        effect: { hpChange: 20 },
      },
      {
        text: '小口品尝（恢复10血）',
        outcome: '只喝了一小口，感觉到丝丝暖意。',
        effect: { hpChange: 10 },
      },
      {
        text: '不予理会',
        outcome: '谨慎固然是对的，你安然无恙地离开。',
        effect: {},
      },
    ],
  },
  {
    id: 'ghost_village',
    title: '鬼村',
    description: '眼前是一座空无一人的村落，家家户户大门紧闭。唯有一处老宅灯火通明，隐约传来孩童哭泣声。',
    choices: [
      {
        text: '推门进入（可能发现宝藏，也可能遭遇鬼魂-15血）',
        outcome: '屋内一片狼藉，地板下藏着一个小箱子，内有金币。',
        effect: { goldChange: 45 },
      },
      {
        text: '在外围搜索（获得 20 金）',
        outcome: '你在枯井旁找到了一个钱袋。',
        effect: { goldChange: 20 },
      },
      {
        text: '立刻离开',
        outcome: '你快步走过，背后传来一声叹息。',
        effect: {},
      },
    ],
  },
  {
    id: 'celestial_test',
    title: '天庭试炼',
    description: '金光乍现，一位仙官降临于此。「凡人，天庭考验你的勇气。若你愿以血肉换取天赐，可向前一步。」',
    choices: [
      {
        text: '接受试炼（失去20血，获得一件灵器）',
        outcome: '仙官点头称赞，赐下一件宝物。',
        effect: { hpChange: -20, addTreasure: 'nine_tine_rake' },
      },
      {
        text: '拒绝试炼',
        outcome: '仙官摇摇头，身影消散。「尘缘未了，下次再来。」',
        effect: {},
      },
    ],
  },
]

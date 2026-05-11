import type { GameMap, MapNode, NodeType } from '../types'
import { BOSS_PER_FLOOR, ENEMY_POOL, ELITE_POOL } from '../data/enemies'

// ============================================================
// 分支地图生成器
// 每层：4列（每列1-3个节点），共3层 + 3个BOSS节点
// ============================================================

function randomInt(min: number, max: number, rng: () => number): number {
  return Math.floor(rng() * (max - min + 1)) + min
}

// 按权重随机选择节点类型（非BOSS层）
function pickNodeType(layer: number, rng: () => number): NodeType {
  // layer 0: 多战斗事件；layer 1: 精英增多；layer 2: 精英/法宝
  const weights: [NodeType, number][] =
    layer === 0
      ? [['battle', 50], ['event', 25], ['shop', 10], ['camp', 10], ['elite', 5]]
      : layer === 1
      ? [['battle', 35], ['event', 20], ['shop', 15], ['camp', 10], ['elite', 20]]
      : [['battle', 25], ['event', 15], ['shop', 15], ['camp', 15], ['elite', 30]]

  const total = weights.reduce((a, [, w]) => a + w, 0)
  let roll = rng() * total
  for (const [type, w] of weights) {
    roll -= w
    if (roll <= 0) return type
  }
  return 'battle'
}

export function generateMap(seed?: number): GameMap {
  // 简单 seeded RNG（LCG）
  let s = seed ?? Math.floor(Math.random() * 99999)
  const rng = () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }

  const nodes: MapNode[] = []
  let idCounter = 0
  const nextId = () => `n${idCounter++}`

  // 每层节点网格：layer 0-2，每层 cols 列，每列1个节点
  const COLS_PER_LAYER = 4
  const layerNodes: MapNode[][] = []

  for (let layer = 0; layer < 3; layer++) {
    const cols: MapNode[] = []
    for (let col = 0; col < COLS_PER_LAYER; col++) {
      const node: MapNode = {
        id: nextId(),
        type: layer === 0 && col === 0 ? 'battle' : pickNodeType(layer, rng), // 起始节点固定为战斗
        layer,
        col,
        connections: [],
        completed: false,
        available: false,
      }
      cols.push(node)
      nodes.push(node)
    }
    layerNodes.push(cols)
  }

  // BOSS节点（每层各一个）
  const bossNodeIds: string[] = []
  for (let layer = 0; layer < 3; layer++) {
    const boss: MapNode = {
      id: nextId(),
      type: 'boss',
      layer,
      col: COLS_PER_LAYER, // boss在最右边
      connections: [],
      completed: false,
      available: false,
    }
    nodes.push(boss)
    bossNodeIds.push(boss.id)
    // BOSS连接到该层最后2个普通节点
    const layerNorms = layerNodes[layer]
    const lastTwoCols = layerNorms.slice(-2)
    lastTwoCols.forEach(n => { n.connections.push(boss.id) })
  }

  // 普通节点连接：每个节点连接下一层的1-2个相邻节点
  for (let layer = 0; layer < 2; layer++) {
    for (const node of layerNodes[layer]) {
      // 连接到下一层相邻列（±1范围内），随机1-2个
      const nextLayer = layerNodes[layer + 1]
      const candidates = nextLayer.filter(n => Math.abs(n.col - node.col) <= 1)
      const count = randomInt(1, Math.min(2, candidates.length), rng)
      // shuffle
      const shuffled = [...candidates].sort(() => rng() - 0.5)
      const chosen = shuffled.slice(0, count)
      node.connections.push(...chosen.map(n => n.id))
    }
  }

  // 每层最后两列连接到该层BOSS（已在上面设置）

  // 第一层所有节点可用（玩家自由选择起始路线）
  layerNodes[0].forEach(n => { n.available = true })

  return {
    nodes,
    currentNodeId: null,
    bossNodeIds,
  }
}

export function getEnemyIdForNode(node: MapNode, floor: number): string {
  if (node.type === 'boss') return BOSS_PER_FLOOR[floor]
  if (node.type === 'elite') {
    const pool = ELITE_POOL[floor] ?? ELITE_POOL[1]
    return pool[Math.floor(Math.random() * pool.length)]
  }
  const pool = ENEMY_POOL[floor] ?? ENEMY_POOL[1]
  return pool[Math.floor(Math.random() * pool.length)]
}

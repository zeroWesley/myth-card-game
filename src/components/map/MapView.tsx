import { useGameStore } from '../../store/gameStore'
import type { MapNode, NodeType } from '../../types'
import { CHARACTERS } from '../../data/characters'
import { TREASURES } from '../../data/treasures'

const NODE_ICONS: Record<NodeType, string> = {
  battle: '⚔',
  elite: '💀',
  event: '📜',
  shop: '🏪',
  camp: '🔥',
  boss: '☠',
}
const NODE_COLORS: Record<NodeType, string> = {
  battle: '#e05555',
  elite: '#a78bfa',
  event: '#38bdf8',
  shop: '#fbbf24',
  camp: '#34d399',
  boss: '#f87171',
}
const NODE_LABELS: Record<NodeType, string> = {
  battle: '战斗',
  elite: '精英',
  event: '事件',
  shop: '商店',
  camp: '营地',
  boss: 'BOSS',
}

const LAYER_TITLES = ['── 人 间 道 ──', '── 妖 界 途 ──', '── 天 庭 路 ──']

// SVG 布局常数
const SVG_W = 560
const NODE_R = 26          // 节点圆半径
const COLS = 5             // 4普通 + 1 BOSS
const COL_W = SVG_W / COLS // 每列宽度
const ROW_H = 120          // 每行高度
const ROWS = 3

// 节点坐标 (cx, cy)
function nodePos(layer: number, col: number): [number, number] {
  const cx = COL_W * col + COL_W / 2
  const cy = (ROWS - 1 - layer) * ROW_H + ROW_H / 2
  return [cx, cy]
}

export function MapView() {
  const { phase, run, map, selectNode } = useGameStore()

  if (phase !== 'map' || !map || !run) return null

  const char = CHARACTERS[run.characterId]
  const currentFloor = run.floor

  // 节点 id → MapNode
  const nodeById = new Map<string, MapNode>()
  for (const n of map.nodes) nodeById.set(n.id, n)

  // 按层分组
  const layerNodes: MapNode[][] = [[], [], []]
  const bossNodes: MapNode[] = []
  for (const node of map.nodes) {
    if (node.type === 'boss') bossNodes.push(node)
    else layerNodes[node.layer]?.push(node)
  }

  // 构造 SVG 路径数据：收集所有连线
  const edges: Array<{ x1: number; y1: number; x2: number; y2: number; active: boolean }> = []
  for (const node of map.nodes) {
    const [x1, y1] = nodePos(node.layer, node.col)
    for (const connId of node.connections) {
      const conn = nodeById.get(connId)
      if (!conn) continue
      const [x2, y2] = nodePos(conn.layer, conn.col)
      const active = node.completed
      edges.push({ x1, y1, x2, y2, active })
    }
  }

  const svgH = ROWS * ROW_H

  return (
    <div className="flex flex-col h-full bg-[#0d0500] text-[#f5e6c8]">
      {/* 顶部状态栏 */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#5a3a2a] bg-[#1a0a00]">
        <div className="flex items-center gap-4">
          <div className="text-lg font-bold" style={{ color: char.color }}>{char.name}</div>
          <div className="flex items-center gap-1 text-base">
            <span className="text-[#f87171]">❤</span>
            <span className="font-bold text-[#f87171]">{run.hp}</span>
            <span className="text-[#8b6655] mx-0.5">/</span>
            <span className="text-[#e0c8a0]">{run.maxHp}</span>
          </div>
          <div className="text-[#fbbf24] font-semibold">💰 {run.gold}</div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {run.treasures.map(tid => {
            const t = TREASURES[tid]
            return t ? (
              <div key={tid} className="text-xs border border-[#fbbf2466] px-2 py-1 text-[#fbbf24] bg-[#1a0a00]" title={t.description}>
                {t.name}
              </div>
            ) : null
          })}
        </div>
        <div className="text-[#c8a870] text-sm font-semibold">第 {currentFloor} 层 / 3</div>
      </div>

      {/* 地图主体 */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center py-6 px-2">
        <div className="w-full max-w-xl">

          {/* 层标题行 —— 从上到下对应 layer2 → layer0 */}
          {[2, 1, 0].map(layerIdx => {
            const layerFloor = layerIdx + 1
            const isCurrentFloor = layerFloor === currentFloor
            const isPastFloor = layerFloor < currentFloor

            return (
              <div key={layerIdx} className="mb-1">
                <div className={`text-xs tracking-widest text-center mb-2 select-none ${
                  isCurrentFloor ? 'text-[#fbbf24]' :
                  isPastFloor   ? 'text-[#c8a870]' :
                                  'text-[#9a7050]'
                }`}>
                  {LAYER_TITLES[layerIdx]}
                  {isPastFloor && <span className="ml-2 text-[#d4af37]">✓</span>}
                </div>
              </div>
            )
          })}

          {/* SVG 地图 */}
          <div className="relative w-full">
            <svg
              viewBox={`0 0 ${SVG_W} ${svgH}`}
              className="w-full"
              style={{ height: svgH }}
            >
              {/* 背景网格装饰 */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2a1200" strokeWidth="0.5" />
                </pattern>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <rect width={SVG_W} height={svgH} fill="url(#grid)" opacity="0.5" />

              {/* 连线 */}
              {edges.map((e, i) => (
                <line
                  key={i}
                  x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                  stroke={e.active ? '#d4af37' : '#3d2010'}
                  strokeWidth={e.active ? 2 : 1.5}
                  strokeDasharray={e.active ? 'none' : '6 4'}
                  opacity={e.active ? 0.9 : 0.5}
                />
              ))}

              {/* 节点 */}
              {map.nodes.map(node => {
                const layerFloor = node.layer + 1
                const isFutureLayer = layerFloor > currentFloor
                const [cx, cy] = nodePos(node.layer, node.col)
                const color = NODE_COLORS[node.type]
                const isAvailable = node.available && !node.completed && !isFutureLayer
                const isCompleted = node.completed
                const opacity = isFutureLayer ? 0.2 : isCompleted ? 0.45 : 1

                return (
                  <g
                    key={node.id}
                    transform={`translate(${cx},${cy})`}
                    style={{ cursor: isAvailable ? 'pointer' : 'default', opacity }}
                    onClick={() => isAvailable && selectNode(node.id)}
                  >
                    {/* 可用光晕 */}
                    {isAvailable && (
                      <circle
                        r={NODE_R + 8}
                        fill={color}
                        opacity={0.15}
                        style={{ animation: 'qi-pulse 2s ease-in-out infinite' }}
                      />
                    )}

                    {/* 外圈 */}
                    <circle
                      r={NODE_R}
                      fill={isCompleted ? '#1a1008' : `${color}22`}
                      stroke={isAvailable ? color : isCompleted ? '#d4af3766' : '#3d2010'}
                      strokeWidth={isAvailable ? 2.5 : 1.5}
                      filter={isAvailable ? 'url(#glow)' : undefined}
                    />

                    {/* 内部装饰圆 */}
                    {node.type === 'boss' && !isCompleted && (
                      <circle r={NODE_R - 6} fill="none" stroke={color} strokeWidth={1} opacity={0.4} />
                    )}

                    {/* 图标 */}
                    <text
                      textAnchor="middle"
                      dominantBaseline="middle"
                      y={-5}
                      fontSize={16}
                      style={{ filter: isCompleted ? 'grayscale(1) opacity(0.5)' : 'none', userSelect: 'none' }}
                    >
                      {NODE_ICONS[node.type]}
                    </text>

                    {/* 标签 */}
                    <text
                      textAnchor="middle"
                      dominantBaseline="middle"
                      y={12}
                      fontSize={9}
                      fill={isAvailable ? color : isCompleted ? '#d4af3766' : '#7a4a2a'}
                      fontWeight={isAvailable ? 'bold' : 'normal'}
                      letterSpacing="1"
                      style={{ userSelect: 'none' }}
                    >
                      {NODE_LABELS[node.type]}
                    </text>

                    {/* 完成打勾 */}
                    {isCompleted && (
                      <g transform={`translate(${NODE_R - 8},${-NODE_R + 8})`}>
                        <circle r={7} fill="#0d0500" stroke="#d4af37" strokeWidth={1} />
                        <text textAnchor="middle" dominantBaseline="middle" fontSize={9} fill="#d4af37">✓</text>
                      </g>
                    )}

                    {/* 当前层可用脉冲圈 */}
                    {isAvailable && (
                      <circle
                        r={NODE_R + 2}
                        fill="none"
                        stroke={color}
                        strokeWidth={1}
                        opacity={0.6}
                        style={{ animation: 'qi-pulse 2s ease-in-out infinite' }}
                      />
                    )}
                  </g>
                )
              })}

              {/* 层分隔线 */}
              {[1, 2].map(i => (
                <line
                  key={i}
                  x1={0} y1={i * ROW_H}
                  x2={SVG_W} y2={i * ROW_H}
                  stroke="#2a1200"
                  strokeWidth={1}
                  strokeDasharray="4 8"
                  opacity={0.6}
                />
              ))}
            </svg>

            {/* 层标题叠加在SVG两侧 —— 竖排文字 */}
            {[0, 1, 2].map(layerIdx => {
              const layerFloor = layerIdx + 1
              const isCurrentFloor = layerFloor === currentFloor
              const isPastFloor = layerFloor < currentFloor
              // SVG中 layer 0 在最下方，layer 2在最上方
              const rowIndex = 2 - layerIdx  // 0=top row(layer2), 2=bottom row(layer0)
              const topPct = (rowIndex * ROW_H / svgH) * 100
              const heightPct = (ROW_H / svgH) * 100

              return (
                <div
                  key={layerIdx}
                  className="absolute left-0 flex items-center pl-1"
                  style={{
                    top: `${topPct}%`,
                    height: `${heightPct}%`,
                    transform: 'translateX(-100%)',
                  }}
                >
                  <div
                    className={`text-xs writing-vertical select-none tracking-widest ${
                      isCurrentFloor ? 'text-[#fbbf24]' :
                      isPastFloor   ? 'text-[#c8a870]' :
                                      'text-[#9a7050]'
                    }`}
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    {['人间道', '妖界途', '天庭路'][layerIdx]}
                    {isPastFloor && ' ✓'}
                  </div>
                </div>
              )
            })}
          </div>

          {/* 图例 */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
            {(Object.entries(NODE_ICONS) as [NodeType, string][]).map(([type, icon]) => (
              <div key={type} className="flex items-center gap-1">
                <span className="text-base">{icon}</span>
                <span className="text-xs" style={{ color: NODE_COLORS[type] }}>{NODE_LABELS[type]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

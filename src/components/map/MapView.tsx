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
  battle: '#c0392b',
  elite: '#8b5cf6',
  event: '#06b6d4',
  shop: '#d4af37',
  camp: '#10b981',
  boss: '#ef4444',
}
const NODE_LABELS: Record<NodeType, string> = {
  battle: '战斗',
  elite: '精英',
  event: '事件',
  shop: '商店',
  camp: '营地',
  boss: 'BOSS',
}

export function MapView() {
  const { phase, run, map, selectNode } = useGameStore()

  if (phase !== 'map' || !map || !run) return null

  const char = CHARACTERS[run.characterId]

  // 将节点按 layer 分组
  const layers: MapNode[][] = [[], [], []]
  const bossNodes: MapNode[] = []
  for (const node of map.nodes) {
    if (node.type === 'boss') bossNodes.push(node)
    else layers[node.layer]?.push(node)
  }
  layers.forEach(l => l.sort((a, b) => a.col - b.col))
  bossNodes.sort((a, b) => a.layer - b.layer)

  const currentFloor = run.floor

  return (
    <div className="flex flex-col h-full bg-[#0d0500] text-[#f5e6c8]">
      {/* 顶部状态栏 */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#3d1f00] bg-[#1a0a00]">
        <div className="flex items-center gap-4">
          <div className="text-lg font-bold" style={{ color: char.color }}>{char.name}</div>
          <div className="flex items-center gap-1">
            <span className="text-[#c0392b]">❤</span>
            <span className="font-bold text-[#c0392b]">{run.hp}</span>
            <span className="text-[#3d1f00]">/</span>
            <span className="text-[#8b5e3c]">{run.maxHp}</span>
          </div>
          <div className="text-[#d4af37]">💰 {run.gold}</div>
        </div>
        <div className="flex items-center gap-2">
          {run.treasures.map(tid => {
            const t = TREASURES[tid]
            return t ? (
              <div key={tid} className="text-xs border border-[#d4af3344] px-2 py-1 text-[#d4af37]" title={t.description}>
                {t.name}
              </div>
            ) : null
          })}
        </div>
        <div className="text-[#8b5e3c] text-sm">第 {currentFloor} 层 / 3</div>
      </div>

      {/* 地图主体 */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-0">

          {[0, 1, 2].map(layerIdx => {
            const layerFloor = layerIdx + 1
            const nodes = layers[layerIdx]
            const bossNode = bossNodes[layerIdx]
            const isCurrentFloor = layerFloor === currentFloor
            const isPastFloor = layerFloor < currentFloor
            const isFutureFloor = layerFloor > currentFloor

            return (
              <div key={layerIdx}>
                {/* 层标题 */}
                <div className={`text-xs tracking-wider mb-3 text-center transition-opacity ${
                  isCurrentFloor ? 'text-[#d4af37] opacity-100' :
                  isPastFloor ? 'text-[#8b5e3c] opacity-70' :
                  'text-[#5a3a2a] opacity-80'
                }`}>
                  {['── 人 间 道 ──', '── 妖 界 途 ──', '── 天 庭 路 ──'][layerIdx]}
                  {isPastFloor && ' ✓'}
                </div>

                {/* 节点行 */}
                <div className={`flex justify-around items-center mb-1 transition-opacity ${
                  isFutureFloor ? 'opacity-25' : isPastFloor ? 'opacity-40' : 'opacity-100'
                }`}>
                  {nodes.map(node => (
                    <NodeButton
                      key={node.id}
                      node={node}
                      forceDisabled={isFutureFloor}
                      onSelect={() => selectNode(node.id)}
                    />
                  ))}
                  {bossNode && (
                    <NodeButton
                      key={bossNode.id}
                      node={bossNode}
                      forceDisabled={isFutureFloor}
                      onSelect={() => selectNode(bossNode.id)}
                    />
                  )}
                </div>

                {/* 层间连接指示 */}
                {layerIdx < 2 && (
                  <div className={`text-center text-[#3d1f00] text-xs my-2 transition-opacity ${
                    isFutureFloor ? 'opacity-20' : 'opacity-60'
                  }`}>
                    ↓
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function NodeButton({
  node, onSelect, forceDisabled,
}: { node: MapNode; onSelect: () => void; forceDisabled: boolean }) {
  const color = NODE_COLORS[node.type]
  const isAvailable = node.available && !node.completed && !forceDisabled
  const isCompleted = node.completed
  const isLocked = !node.available && !node.completed && !forceDisabled

  return (
    <button
      onClick={() => isAvailable && onSelect()}
      disabled={!isAvailable}
      title={NODE_LABELS[node.type]}
      className={`
        w-16 h-16 flex flex-col items-center justify-center border-2 text-2xl
        transition-all duration-200 relative select-none
        ${isAvailable ? 'cursor-pointer hover:scale-110 hover:-translate-y-1' : 'cursor-default'}
      `}
      style={{
        borderColor: isAvailable
          ? color
          : isCompleted
          ? '#d4af3766'
          : isLocked
          ? '#3d1f0088'
          : '#3d1f0044',
        backgroundColor: isAvailable
          ? color + '28'
          : isCompleted
          ? '#d4af3711'
          : 'transparent',
        boxShadow: isAvailable
          ? `0 0 16px ${color}88, inset 0 0 8px ${color}22`
          : 'none',
        clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
        opacity: isCompleted ? 0.5 : 1,
      }}
    >
      {/* 图标 */}
      <span style={{
        filter: isAvailable ? 'none' : isCompleted ? 'grayscale(1) opacity(0.5)' : 'grayscale(1) opacity(0.4)',
      }}>
        {NODE_ICONS[node.type]}
      </span>

      {/* 标签 */}
      <span
        className="text-[9px] tracking-wider mt-0.5"
        style={{
          color: isAvailable ? color : isCompleted ? '#d4af3766' : '#5a3a2a',
        }}
      >
        {NODE_LABELS[node.type]}
      </span>

      {/* 完成标记 */}
      {isCompleted && (
        <span className="absolute -top-1 -right-1 text-[10px] text-[#d4af37] bg-[#0d0500] rounded-full w-4 h-4 flex items-center justify-center border border-[#d4af3766]">
          ✓
        </span>
      )}

      {/* 可用光晕动画 */}
      {isAvailable && (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: `0 0 0 1px ${color}44`,
            animation: 'qi-pulse 2s ease-in-out infinite',
            clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
          }}
        />
      )}
    </button>
  )
}

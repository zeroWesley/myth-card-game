import type { EnemyState } from '../../types'
import { ENEMIES } from '../../data/enemies'

interface Props {
  enemy: EnemyState
  index: number
  selected: boolean
  onClick: () => void
  showIntent?: boolean
}

export function EnemyComponent({ enemy, index, selected, onClick, showIntent }: Props) {
  const def = ENEMIES[enemy.defId]
  if (!def) return null

  const hpPercent = Math.max(0, (enemy.currentHp / enemy.maxHp) * 100)
  const nextAction = def.actions[enemy.nextActionIndex % def.actions.length]
  const isDead = enemy.currentHp <= 0

  if (isDead) {
    return (
      <div className="flex flex-col items-center opacity-20">
        <div className="text-4xl">💀</div>
        <div className="text-xs text-[#8b5e3c] mt-1">{def.name}</div>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className={`
        flex flex-col items-center cursor-pointer transition-all duration-150
        ${selected ? 'scale-105' : 'hover:scale-102'}
      `}
    >
      {/* 意图 */}
      {showIntent && nextAction && (
        <div className="mb-2 text-xs text-center max-w-[120px]">
          <div className="bg-[#1a0a00] border border-[#3d1f00] px-2 py-1 rounded text-[#d4af37]">
            {nextAction.type === 'attack' ? `⚔ ${nextAction.description}`
              : nextAction.type === 'defend' ? `🛡 ${nextAction.description}`
              : nextAction.type === 'buff' ? `✨ ${nextAction.description}`
              : `🌀 ${nextAction.description}`}
          </div>
          <div className="w-2 h-2 bg-[#3d1f00] rotate-45 mx-auto -mt-1" />
        </div>
      )}

      {/* 敌人图像 */}
      <div
        className={`
          w-20 h-24 border flex flex-col items-center justify-center text-4xl
          transition-all duration-150 relative
          ${selected ? 'border-[#c0392b]' : 'border-[#3d1f0066]'}
          ${def.isBoss ? 'w-28 h-32 text-5xl' : ''}
        `}
        style={{
          backgroundColor: selected ? '#c0392b11' : '#1a0a00',
          boxShadow: selected ? '0 0 20px #c0392b66' : 'none',
          clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
        }}
      >
        {def.isBoss ? '👿' : '👹'}
        {enemy.block > 0 && (
          <div className="absolute bottom-0 right-0 bg-[#2e8b5733] border border-[#2e8b57] text-[10px] px-1 text-[#66bb6a]">
            🛡 {enemy.block}
          </div>
        )}
      </div>

      {/* 名字 */}
      <div className="text-sm font-bold mt-1 text-[#f5e6c8]">{def.name}</div>

      {/* 血条 */}
      <div className="w-28 mt-1">
        <div className="flex justify-between text-[10px] text-[#8b5e3c] mb-0.5">
          <span>{enemy.currentHp}</span>
          <span>{enemy.maxHp}</span>
        </div>
        <div className="h-2 bg-[#3d1f00] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${hpPercent}%`,
              backgroundColor: hpPercent > 50 ? '#c0392b' : hpPercent > 25 ? '#e67e22' : '#e74c3c',
            }}
          />
        </div>
      </div>

      {/* 状态效果 */}
      <div className="flex gap-1 mt-1">
        {Object.entries(enemy.statuses).map(([k, v]) => v && v > 0 ? (
          <span key={k} className="text-[9px] border border-[#3d1f00] px-1 text-[#8b5e3c]">
            {k === 'burn' ? `🔥${v}` : k === 'poison' ? `☠${v}` : k === 'vulnerable' ? `💔${v}` : `${k}${v}`}
          </span>
        ) : null)}
      </div>
    </div>
  )
}

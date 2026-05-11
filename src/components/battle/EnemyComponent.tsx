import { useState, useEffect } from 'react'
import type { EnemyState } from '../../types'
import { ENEMIES } from '../../data/enemies'
import { EnemySprite } from './EnemySprite'

interface Props {
  enemy: EnemyState
  index: number
  selected: boolean
  onClick: () => void
  showIntent?: boolean
  /** 受到伤害时传入伤害数值，触发动画 */
  damageTaken?: number
}

export function EnemyComponent({ enemy, index: _index, selected, onClick, showIntent, damageTaken }: Props) {
  const def = ENEMIES[enemy.defId]
  const [shaking, setShaking] = useState(false)
  const [showDmg, setShowDmg] = useState<number | null>(null)

  // 受到伤害动画
  useEffect(() => {
    if (damageTaken && damageTaken > 0) {
      setShaking(true)
      setShowDmg(damageTaken)
      const t1 = setTimeout(() => setShaking(false), 400)
      const t2 = setTimeout(() => setShowDmg(null), 1000)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [damageTaken])

  if (!def) return null

  const hpPercent = Math.max(0, (enemy.currentHp / enemy.maxHp) * 100)
  const nextAction = def.actions[enemy.nextActionIndex % def.actions.length]
  const isDead = enemy.currentHp <= 0

  if (isDead) {
    return (
      <div className="flex flex-col items-center opacity-25 select-none">
        <EnemySprite defId={enemy.defId} isBoss={def.isBoss} size={def.isBoss ? 88 : 64} />
        <div className="text-xs text-[#b08060] mt-1">{def.name}</div>
        <div className="text-2xl mt-1">💀</div>
      </div>
    )
  }

  const spriteSize = def.isBoss ? 96 : 72

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer transition-all duration-150 select-none relative"
      style={{
        transform: selected ? 'scale(1.06)' : 'scale(1)',
      }}
    >
      {/* 意图气泡 */}
      {showIntent && nextAction && (
        <div className="mb-2 text-xs text-center max-w-[130px]">
          <div
            className="border px-2 py-1 rounded text-white font-medium"
            style={{ backgroundColor: '#1a0a00dd', borderColor: '#7a4a2a' }}
          >
            {nextAction.type === 'attack'
              ? `⚔ ${nextAction.description}`
              : nextAction.type === 'defend'
              ? `🛡 ${nextAction.description}`
              : nextAction.type === 'buff'
              ? `✨ ${nextAction.description}`
              : `🌀 ${nextAction.description}`}
          </div>
          <div className="w-2 h-2 rotate-45 mx-auto -mt-1" style={{ backgroundColor: '#3d1f00' }} />
        </div>
      )}

      {/* 敌人立绘 + 受击效果 */}
      <div
        className="relative transition-all"
        style={{
          animation: shaking ? 'enemy-shake 0.35s ease' : 'none',
          filter: selected ? 'brightness(1.2)' : 'brightness(1)',
        }}
      >
        <EnemySprite
          defId={enemy.defId}
          isBoss={def.isBoss}
          size={spriteSize}
          selected={selected}
        />

        {/* 护盾徽章 */}
        {enemy.block > 0 && (
          <div
            className="absolute bottom-0 right-0 text-[10px] px-1 py-0.5 font-bold"
            style={{
              backgroundColor: '#2e8b5744',
              border: '1px solid #2e8b57',
              color: '#4ade80',
              borderRadius: '2px',
            }}
          >
            🛡 {enemy.block}
          </div>
        )}

        {/* 伤害数字飘出 */}
        {showDmg !== null && (
          <div
            className="absolute text-white font-black text-lg pointer-events-none"
            style={{
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'dmg-float 0.9s ease-out forwards',
              color: showDmg > 15 ? '#f87171' : '#fbbf24',
              textShadow: '0 2px 6px #000, 0 0 12px #f8717188',
            }}
          >
            -{showDmg}
          </div>
        )}
      </div>

      {/* 名字 */}
      <div className="text-sm font-bold mt-1 text-white" style={{ textShadow: '0 1px 4px #000' }}>
        {def.name}
      </div>

      {/* 血条 */}
      <div className="w-28 mt-1">
        <div className="flex justify-between text-[11px] font-semibold mb-0.5" style={{ color: '#e5d5b5' }}>
          <span>{enemy.currentHp}</span>
          <span className="opacity-60">/{enemy.maxHp}</span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: '#3d1f00' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${hpPercent}%`,
              backgroundColor:
                hpPercent > 60 ? '#ef4444' :
                hpPercent > 30 ? '#f97316' : '#dc2626',
              boxShadow: `0 0 6px ${hpPercent > 60 ? '#ef4444' : '#f97316'}88`,
            }}
          />
        </div>
      </div>

      {/* 状态效果 */}
      <div className="flex gap-1 mt-1 flex-wrap justify-center max-w-[120px]">
        {Object.entries(enemy.statuses).map(([k, v]) =>
          v && v > 0 ? (
            <span
              key={k}
              className="text-[9px] px-1 py-0.5 font-semibold"
              style={{
                border: '1px solid #7a4a2a',
                color: '#f0e0c0',
                backgroundColor: '#2a1200',
              }}
            >
              {k === 'burn' ? `🔥${v}` : k === 'poison' ? `☠${v}` : k === 'vulnerable' ? `💔${v}` : `${k}${v}`}
            </span>
          ) : null
        )}
      </div>
    </div>
  )
}

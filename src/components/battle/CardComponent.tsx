import { useState } from 'react'
import type { CombatCard } from '../../types'
import { CARDS } from '../../data/cards'

interface Props {
  card: CombatCard
  selected?: boolean
  playable?: boolean
  onClick?: () => void
  /** 出牌动画触发时传入目标 DOM 位置 */
  onPlay?: () => void
}

const TYPE_COLORS: Record<string, string> = {
  attack: '#ff6b6b',
  defense: '#4ade80',
  spell: '#fcd34d',
  trick: '#38bdf8',
}
const TYPE_BG: Record<string, string> = {
  attack: '#3a0a0a',
  defense: '#0a2a1a',
  spell: '#2a1e00',
  trick: '#001a2a',
}
const TYPE_LABELS: Record<string, string> = {
  attack: '攻击',
  defense: '防御',
  spell: '法术',
  trick: '诡计',
}
const TYPE_ICONS: Record<string, string> = {
  attack: '⚔',
  defense: '🛡',
  spell: '✨',
  trick: '🌀',
}

export function CardComponent({ card, selected, playable, onClick }: Props) {
  const def = CARDS[card.defId]
  const [isPlaying, setIsPlaying] = useState(false)

  if (!def) return null

  const color = TYPE_COLORS[def.type]
  const bgColor = TYPE_BG[def.type]

  const handleClick = () => {
    if (!playable) return
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 300)
    onClick?.()
  }

  return (
    <div
      onClick={handleClick}
      className={`
        w-28 h-40 border flex flex-col select-none shrink-0 relative
        transition-all duration-150
        ${selected ? 'scale-115 -translate-y-4' : ''}
        ${playable ? 'hover:-translate-y-3 hover:scale-105 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
        ${isPlaying ? 'scale-90 opacity-70' : ''}
      `}
      style={{
        borderColor: selected ? color : color + '88',
        backgroundColor: bgColor,
        boxShadow: selected
          ? `0 0 24px ${color}, 0 0 6px ${color}88`
          : playable
          ? `0 4px 16px #00000099, inset 0 1px 0 ${color}22`
          : 'none',
        clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
      }}
    >
      {/* 顶部渐变装饰 */}
      <div
        className="absolute top-0 left-0 right-0 h-8 opacity-20"
        style={{ background: `linear-gradient(to bottom, ${color}, transparent)` }}
      />

      {/* 费用 */}
      <div
        className="absolute top-1.5 left-1.5 w-6 h-6 flex items-center justify-center text-xs font-black rounded-full z-10"
        style={{
          backgroundColor: '#d4af37',
          color: '#1a0a00',
          boxShadow: '0 1px 4px #00000088',
        }}
      >
        {def.cost}
      </div>

      {/* 类型标签 */}
      <div
        className="absolute top-1.5 right-1.5 text-[9px] px-1 py-0.5 tracking-wider font-bold z-10"
        style={{
          backgroundColor: color + '44',
          color: color,
          border: `1px solid ${color}88`,
        }}
      >
        {TYPE_LABELS[def.type]}
      </div>

      {/* 中央图标 */}
      <div className="flex-1 flex items-center justify-center mt-5 z-10">
        <div
          className="w-12 h-12 flex items-center justify-center text-2xl rounded-full"
          style={{
            backgroundColor: color + '33',
            border: `2px solid ${color}66`,
            boxShadow: selected ? `0 0 12px ${color}66` : 'none',
          }}
        >
          {TYPE_ICONS[def.type]}
        </div>
      </div>

      {/* 分隔线 */}
      <div className="mx-2 h-px opacity-30" style={{ backgroundColor: color }} />

      {/* 卡牌名 */}
      <div
        className="text-center text-xs font-bold px-1 pt-1.5 z-10"
        style={{ color: color }}
      >
        {def.name}
      </div>

      {/* 描述 — 白色文字保证可读 */}
      <div
        className="text-[10px] text-center px-1.5 pb-2 leading-tight min-h-[2.5rem] z-10"
        style={{ color: '#f0e8d8' }}
      >
        {def.description}
      </div>
    </div>
  )
}

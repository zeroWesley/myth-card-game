import type { CombatCard } from '../../types'
import { CARDS } from '../../data/cards'

interface Props {
  card: CombatCard
  selected?: boolean
  playable?: boolean
  onClick?: () => void
}

const TYPE_COLORS: Record<string, string> = {
  attack: '#c0392b',
  defense: '#2e8b57',
  spell: '#d4af37',
  trick: '#06b6d4',
}
const TYPE_LABELS: Record<string, string> = {
  attack: '攻击',
  defense: '防御',
  spell: '法术',
  trick: '诡计',
}

export function CardComponent({ card, selected, playable, onClick }: Props) {
  const def = CARDS[card.defId]
  if (!def) return null

  const color = TYPE_COLORS[def.type]

  return (
    <div
      onClick={() => playable && onClick?.()}
      className={`
        w-28 h-40 border flex flex-col cursor-pointer select-none
        transition-all duration-150 relative shrink-0
        ${selected ? 'scale-110 -translate-y-3' : ''}
        ${playable ? 'hover:-translate-y-2 hover:scale-105' : 'opacity-50 cursor-not-allowed'}
      `}
      style={{
        borderColor: selected ? color : color + '66',
        backgroundColor: '#0d0500',
        boxShadow: selected ? `0 0 20px ${color}` : playable ? `0 4px 12px #00000088` : 'none',
        clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
      }}
    >
      {/* 费用 */}
      <div
        className="absolute top-1 left-1 w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full"
        style={{ backgroundColor: '#d4af37', color: '#1a0a00' }}
      >
        {def.cost}
      </div>

      {/* 类型标签 */}
      <div
        className="absolute top-1 right-1 text-[9px] px-1 py-0.5 tracking-wider"
        style={{ backgroundColor: color + '33', color, border: `1px solid ${color}66` }}
      >
        {TYPE_LABELS[def.type]}
      </div>

      {/* 中央图标 */}
      <div className="flex-1 flex items-center justify-center mt-4">
        <div
          className="w-12 h-12 flex items-center justify-center text-2xl rounded-full"
          style={{ backgroundColor: color + '22', border: `1px solid ${color}44` }}
        >
          {def.type === 'attack' ? '⚔' : def.type === 'defense' ? '🛡' : def.type === 'spell' ? '✨' : '🌀'}
        </div>
      </div>

      {/* 卡牌名 */}
      <div className="text-center text-xs font-bold px-1 pb-1" style={{ color }}>
        {def.name}
      </div>

      {/* 描述 */}
      <div className="text-[10px] text-[#8b5e3c] text-center px-1 pb-2 leading-tight min-h-[2.5rem]">
        {def.description}
      </div>
    </div>
  )
}

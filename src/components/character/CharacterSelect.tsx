import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { ALL_CHARACTERS } from '../../data/characters'
import { CARDS } from '../../data/cards'
import type { CharacterId } from '../../types'

export function CharacterSelect() {
  const { phase, startRun } = useGameStore()
  const [selected, setSelected] = useState<CharacterId | null>('ziwei')

  if (phase !== 'character_select') return null

  const char = selected ? ALL_CHARACTERS.find(c => c.id === selected) : null

  return (
    <div className="flex flex-col h-full bg-[#0d0500] text-[#f5e6c8]">
      {/* 顶部标题 */}
      <div className="text-center py-6 border-b border-[#3d1f00]">
        <h2 className="text-2xl tracking-[0.5em] text-[#d4af37]">选择角色</h2>
        <p className="text-xs text-[#8b5e3c] mt-1 tracking-wider">MVP 版本三位角色均已解锁</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 左侧：角色列表 */}
        <div className="w-72 border-r border-[#3d1f00] flex flex-col gap-3 p-4 overflow-y-auto">
          {ALL_CHARACTERS.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`p-4 border text-left transition-all duration-200 ${
                selected === c.id
                  ? 'border-[#d4af37] bg-[#d4af3711]'
                  : 'border-[#3d1f00] hover:border-[#8b5e3c]'
              }`}
              style={{ clipPath: 'polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)' }}
            >
              {/* 角色头像占位 */}
              <div
                className="w-12 h-12 rounded-full mb-2 flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: c.color + '33', border: `2px solid ${c.color}` }}
              >
                {c.name[0]}
              </div>
              <div className="font-bold text-base">{c.name}</div>
              <div className="text-xs text-[#8b5e3c] tracking-wider">{c.title}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-[#c0392b]">❤ {c.maxHp}</span>
              </div>
            </button>
          ))}
        </div>

        {/* 中间：角色详情 */}
        {char && (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6">
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: char.color, textShadow: `0 0 20px ${char.color}66` }}
              >
                {char.name}
              </div>
              <div className="text-[#d4af37] text-sm tracking-wider mb-3">{char.title}</div>
              <p className="text-[#c8b89a] text-sm leading-relaxed">{char.description}</p>
            </div>

            {/* 属性 */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="border border-[#3d1f00] p-3">
                <div className="text-xs text-[#8b5e3c] mb-1">最大生命</div>
                <div className="text-[#c0392b] font-bold text-lg">❤ {char.maxHp}</div>
              </div>
              <div className="border border-[#3d1f00] p-3">
                <div className="text-xs text-[#8b5e3c] mb-1">初始气力</div>
                <div className="text-[#d4af37] font-bold text-lg">⚡ 3</div>
              </div>
            </div>

            {/* 被动 */}
            <div className="border border-[#3d1f00] p-4 mb-4">
              <div className="text-[#d4af37] text-xs tracking-wider mb-2">【被动技能】</div>
              <p className="text-sm">{char.passive}</p>
            </div>

            {/* 主动技能 */}
            <div className="border p-4 mb-4" style={{ borderColor: char.color + '66' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs tracking-wider" style={{ color: char.color }}>【主动技能】</span>
                <span className="text-xs text-[#d4af37] bg-[#d4af3722] px-2 py-0.5 rounded">
                  {char.skill.cost} 气力
                </span>
              </div>
              <div className="font-bold mb-1">{char.skill.name}</div>
              <p className="text-sm text-[#c8b89a]">{char.skill.description}</p>
            </div>

            {/* 天命 */}
            <div className="border border-[#8b5cf633] p-4 mb-6 bg-[#8b5cf611]">
              <div className="text-[#8b5cf6] text-xs tracking-wider mb-2">【天命】</div>
              <div className="text-xs text-[#c8b89a] mb-1">激活条件：{char.fateDef.condition}</div>
              <div className="text-sm">{char.fateDef.effectDescription}</div>
            </div>

            {/* 初始卡组 */}
            <div>
              <div className="text-xs text-[#8b5e3c] tracking-wider mb-3">初始卡组（10张）</div>
              <div className="flex flex-wrap gap-2">
                {char.startingDeck.map((cardId, i) => {
                  const card = CARDS[cardId]
                  if (!card) return null
                  return (
                    <div
                      key={i}
                      className="px-2 py-1 text-xs border rounded"
                      style={{
                        borderColor: card.type === 'attack' ? '#c0392b66'
                          : card.type === 'defense' ? '#2e8b5766'
                          : card.type === 'trick' ? '#06b6d466'
                          : '#d4af3766',
                        color: card.type === 'attack' ? '#e57373'
                          : card.type === 'defense' ? '#66bb6a'
                          : card.type === 'trick' ? '#4dd0e1'
                          : '#fdd835',
                      }}
                    >
                      {card.name} ({card.cost}⚡)
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部确认按钮 */}
      <div className="p-4 border-t border-[#3d1f00] flex justify-between items-center">
        <button
          onClick={() => useGameStore.setState({ phase: 'main_menu' })}
          className="px-6 py-2 text-sm text-[#8b5e3c] border border-[#3d1f00] hover:border-[#8b5e3c] transition-colors"
        >
          返回
        </button>
        {selected && (
          <button
            onClick={() => startRun(selected)}
            className="px-8 py-3 text-base font-bold tracking-[0.3em] bg-[#d4af37] text-[#1a0a00]
              hover:bg-[#e8c84a] transition-colors"
            style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}
          >
            开始冒险
          </button>
        )}
      </div>
    </div>
  )
}

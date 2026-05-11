import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { CARDS } from '../../data/cards'

export function CampView() {
  const { phase, run, rest, upgradeCard, goToMap } = useGameStore()
  const [mode, setMode] = useState<'choose' | 'upgrade'>('choose')

  if (phase !== 'camp' || !run) return null

  const healAmount = Math.floor(run.maxHp * 0.3)
  const canHeal = run.hp < run.maxHp

  // 可升级的卡（排除已升级的）
  const upgradableCards = run.deck.filter(id => !id.endsWith('_u'))
  const uniqueUpgradable = [...new Set(upgradableCards)]

  if (mode === 'upgrade') {
    return (
      <div className="flex flex-col h-full bg-[#0d0500] text-[#f5e6c8] p-8">
        <div className="max-w-lg w-full mx-auto">
          <div className="text-[#d4af37] text-xs tracking-[0.5em] mb-2">⬆ 升级卡牌</div>
          <h2 className="text-xl font-bold mb-6">选择一张卡牌升级</h2>

          <div className="flex flex-wrap gap-3 mb-8">
            {uniqueUpgradable.map((cardId, i) => {
              const card = CARDS[cardId]
              if (!card) return null
              const upgCard = CARDS[cardId + '_u'] ?? card
              return (
                <button
                  key={i}
                  onClick={() => { upgradeCard(cardId); setMode('choose') }}
                  className="border border-[#3d1f00] hover:border-[#d4af37] p-3 text-left transition-all w-36"
                  style={{ clipPath: 'polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)' }}
                >
                  <div className="font-bold text-sm mb-1">{card.name}</div>
                  <div className="text-xs text-[#8b5e3c] mb-1">{card.description}</div>
                  <div className="text-xs text-[#d4af37]">→ {upgCard.description}</div>
                </button>
              )
            })}
            {uniqueUpgradable.length === 0 && (
              <div className="text-[#8b5e3c] text-sm">牌库中没有可升级的卡牌</div>
            )}
          </div>

          <button
            onClick={() => setMode('choose')}
            className="text-sm text-[#8b5e3c] border border-[#3d1f00] px-4 py-2 hover:border-[#8b5e3c] transition-colors"
          >
            返回
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#0d0500] text-[#f5e6c8] p-8">
      <div className="max-w-lg w-full">
        <div className="text-[#d4af37] text-xs tracking-[0.5em] mb-2">🔥 营地</div>
        <h2 className="text-2xl font-bold mb-2">篝火歇脚</h2>
        <p className="text-[#8b5e3c] text-sm mb-8">
          生命 {run.hp} / {run.maxHp}
          {!canHeal && <span className="ml-2 text-[#d4af37] text-xs">（已满血）</span>}
        </p>

        <div className="flex gap-4">
          {/* 休息选项 */}
          <button
            onClick={rest}
            disabled={!canHeal}
            className={`flex-1 border p-6 text-center transition-colors ${
              canHeal
                ? 'border-[#10b981] hover:bg-[#10b98122] cursor-pointer'
                : 'border-[#3d1f00] opacity-40 cursor-not-allowed'
            }`}
            style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}
          >
            <div className="text-3xl mb-3">💤</div>
            <div className="font-bold mb-1">休息</div>
            <div className={`text-xs ${canHeal ? 'text-[#10b981]' : 'text-[#3d1f00]'}`}>
              {canHeal ? `恢复 ${healAmount} 点生命` : '生命已满'}
            </div>
          </button>

          {/* 升级选项 */}
          <button
            onClick={() => setMode('upgrade')}
            disabled={uniqueUpgradable.length === 0}
            className={`flex-1 border p-6 text-center transition-colors ${
              uniqueUpgradable.length > 0
                ? 'border-[#d4af37] hover:bg-[#d4af3711] cursor-pointer'
                : 'border-[#3d1f00] opacity-40 cursor-not-allowed'
            }`}
            style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}
          >
            <div className="text-3xl mb-3">⬆</div>
            <div className="font-bold mb-1">升级</div>
            <div className={`text-xs ${uniqueUpgradable.length > 0 ? 'text-[#d4af37]' : 'text-[#3d1f00]'}`}>
              升级一张卡牌
            </div>
          </button>
        </div>

        {/* 离开按钮 */}
        <div className="mt-6 text-center">
          <button
            onClick={goToMap}
            className="text-sm text-[#8b5e3c] hover:text-[#c8b89a] transition-colors tracking-wider"
          >
            继续前行 →
          </button>
        </div>
      </div>
    </div>
  )
}

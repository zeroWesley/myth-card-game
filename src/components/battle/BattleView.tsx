import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { CardComponent } from './CardComponent'
import { EnemyComponent } from './EnemyComponent'
import { CHARACTERS } from '../../data/characters'
import { CARDS } from '../../data/cards'
import { COMMON_CARD_POOL } from '../../data/cards'

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function BattleView() {
  const { phase, combat, run, playCard: storePlayCard, endTurn, useSkill, collectReward } = useGameStore()
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [selectedEnemy, setSelectedEnemy] = useState<number>(0)
  const [rewardCards, setRewardCards] = useState<string[] | null>(null)
  const [pickedReward, setPickedReward] = useState(false)

  if (phase !== 'combat' || !combat || !run) return null

  const char = CHARACTERS[run.characterId]

  // 战斗胜利：显示奖励界面
  if (combat.phase === 'victory' && !pickedReward) {
    if (!rewardCards) {
      // 生成3个奖励卡
      const pool = COMMON_CARD_POOL.filter(id => !run.deck.includes(id))
      const rewards = [
        pickRandom(pool.filter(id => CARDS[id]?.rarity === 'rare') || pool),
        pickRandom(pool.filter(id => CARDS[id]?.rarity === 'uncommon') || pool),
        pickRandom(pool),
      ].filter(Boolean)
      setRewardCards(rewards)
    }
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#0d0500] text-[#f5e6c8]">
        <div className="text-[#d4af37] text-3xl mb-2 tracking-wider">⚔ 战斗胜利</div>
        <div className="text-[#8b5e3c] text-sm mb-8">选择一张卡牌加入牌库</div>
        <div className="flex gap-6 mb-8">
          {(rewardCards || []).map(cardId => {
            const def = CARDS[cardId]
            if (!def) return null
            return (
              <div key={cardId}
                className="cursor-pointer border border-[#3d1f00] p-4 hover:border-[#d4af37] transition-colors w-40"
                onClick={() => {
                  setPickedReward(true)
                  collectReward(cardId)
                }}
              >
                <div className="text-center font-bold mb-2">{def.name}</div>
                <div className="text-xs text-[#8b5e3c] text-center">{def.description}</div>
              </div>
            )
          })}
        </div>
        <button
          className="text-sm text-[#8b5e3c] underline"
          onClick={() => { setPickedReward(true); collectReward() }}
        >
          跳过，不取卡牌
        </button>
      </div>
    )
  }

  if (combat.phase === 'defeat') {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#0d0500] text-[#f5e6c8]">
        <div className="text-[#c0392b] text-4xl mb-4">💀 战败</div>
        <div className="text-[#8b5e3c] mb-8">你已倒在征途之中...</div>
        <button
          onClick={() => useGameStore.getState().backToMenu()}
          className="px-6 py-3 border border-[#3d1f00] hover:border-[#8b5e3c] transition-colors"
        >
          返回主菜单
        </button>
      </div>
    )
  }

  const isPlayerTurn = combat.phase === 'player_turn'
  const fateActivated = combat.fateActivated
  const fateProgress = combat.fateCounters[char.fateDef.conditionKey]
  const fateTotal = char.fateDef.conditionValue

  const handleCardClick = (instanceId: string) => {
    if (!isPlayerTurn) return
    const card = combat.hand.find(c => c.instanceId === instanceId)
    if (!card) return
    const def = CARDS[card.defId]
    if (!def || def.cost > combat.qi) return

    if (selectedCard === instanceId) {
      // 二次点击：出牌
      storePlayCard(instanceId, selectedEnemy)
      setSelectedCard(null)
    } else {
      setSelectedCard(instanceId)
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#0d0500] text-[#f5e6c8] select-none">
      {/* 顶部：玩家状态栏 */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#3d1f00] bg-[#1a0a00]">
        {/* 血量 */}
        <div className="flex items-center gap-3">
          <div>
            <div className="text-xs text-[#8b5e3c]">生命</div>
            <div className="flex items-center gap-1">
              <span className="text-[#c0392b] font-bold text-lg">{combat.playerHp}</span>
              <span className="text-[#3d1f00]">/</span>
              <span className="text-[#8b5e3c]">{combat.playerMaxHp}</span>
            </div>
            <div className="w-32 h-2 bg-[#3d1f00] rounded-full mt-0.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(combat.playerHp / combat.playerMaxHp) * 100}%`,
                  backgroundColor: '#c0392b',
                }}
              />
            </div>
          </div>
          {combat.playerBlock > 0 && (
            <div className="text-[#2e8b57] font-bold">
              🛡 {combat.playerBlock}
            </div>
          )}
        </div>

        {/* 气力 */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-[#8b5e3c] mb-1">气力</div>
          <div className="flex gap-1">
            {Array.from({ length: combat.qiMax }).map((_, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all"
                style={{
                  backgroundColor: i < combat.qi ? '#d4af3733' : 'transparent',
                  borderColor: i < combat.qi ? '#d4af37' : '#3d1f00',
                  color: i < combat.qi ? '#d4af37' : '#3d1f00',
                  boxShadow: i < combat.qi ? '0 0 6px #d4af3788' : 'none',
                }}
              >⚡</div>
            ))}
          </div>
          <div className="text-xs mt-1 text-[#d4af37]">{combat.qi} / {combat.qiMax}</div>
        </div>

        {/* 角色名+天命 */}
        <div className="text-right">
          <div className="font-bold" style={{ color: char.color }}>{char.name}</div>
          {fateActivated ? (
            <div className="text-xs text-[#8b5cf6]">⚡ 天命已激活</div>
          ) : (
            <div className="text-xs text-[#3d1f00]">
              天命 {fateProgress}/{fateTotal}
            </div>
          )}
        </div>
      </div>

      {/* 中部：战斗区域 */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        {/* 敌人区 */}
        <div className="flex items-end justify-center gap-12 py-6 px-4">
          {combat.enemies.map((enemy, i) => (
            <EnemyComponent
              key={i}
              enemy={enemy}
              index={i}
              selected={selectedEnemy === i}
              onClick={() => setSelectedEnemy(i)}
              showIntent={isPlayerTurn}
            />
          ))}
        </div>

        {/* 回合日志（最新一条） */}
        {combat.log.length > 0 && (
          <div className="text-center text-xs text-[#8b5e3c] px-4 py-1 bg-[#1a0a0088]">
            {combat.log[combat.log.length - 1]}
          </div>
        )}

        {/* 手牌区 */}
        <div className="bg-[#1a0a00] border-t border-[#3d1f00] p-3">
          {/* 手牌 */}
          <div className="flex gap-2 overflow-x-auto pb-2 justify-center flex-wrap">
            {combat.hand.map(card => {
              const def = CARDS[card.defId]
              const canPlay = isPlayerTurn && def && def.cost <= combat.qi
              return (
                <CardComponent
                  key={card.instanceId}
                  card={card}
                  selected={selectedCard === card.instanceId}
                  playable={canPlay}
                  onClick={() => handleCardClick(card.instanceId)}
                />
              )
            })}
            {combat.hand.length === 0 && isPlayerTurn && (
              <div className="text-[#3d1f00] text-sm self-center py-4">手牌已空</div>
            )}
          </div>

          {/* 底部操作按钮 */}
          <div className="flex items-center justify-between mt-2 px-2">
            {/* 牌库/弃牌堆计数 */}
            <div className="flex gap-4 text-xs text-[#8b5e3c]">
              <span>牌库 {combat.deck.length}</span>
              <span>弃牌 {combat.discard.length}</span>
              <span>消耗 {combat.exhaust.length}</span>
            </div>

            {/* 专属技能按钮 */}
            <button
              onClick={() => isPlayerTurn && useSkill()}
              disabled={!isPlayerTurn || combat.qi < char.skill.cost}
              className={`
                px-4 py-2 text-xs border tracking-wider transition-all
                ${isPlayerTurn && combat.qi >= char.skill.cost
                  ? 'border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf622]'
                  : 'border-[#3d1f00] text-[#3d1f00] cursor-not-allowed'
                }
              `}
              style={{ clipPath: 'polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)' }}
            >
              {char.skill.name} ({char.skill.cost}⚡)
            </button>

            {/* 结束回合 */}
            <button
              onClick={() => isPlayerTurn && endTurn()}
              disabled={!isPlayerTurn}
              className={`
                px-6 py-2 font-bold tracking-wider text-sm transition-all
                ${isPlayerTurn
                  ? 'bg-[#d4af37] text-[#1a0a00] hover:bg-[#e8c84a]'
                  : 'bg-[#3d1f00] text-[#1a0a00] cursor-not-allowed'
                }
              `}
              style={{ clipPath: 'polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)' }}
            >
              {isPlayerTurn ? '结束回合' : '敌方回合...'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

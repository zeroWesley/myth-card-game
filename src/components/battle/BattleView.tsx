import { useState, useRef, useCallback } from 'react'
import { useGameStore } from '../../store/gameStore'
import { CardComponent } from './CardComponent'
import { EnemyComponent } from './EnemyComponent'
import { CharacterSprite } from './CharacterSprite'
import { CHARACTERS } from '../../data/characters'
import { CARDS } from '../../data/cards'
import { COMMON_CARD_POOL } from '../../data/cards'

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

interface FlyCard {
  id: string
  x: number
  y: number
  tx: number
  ty: number
}

export function BattleView() {
  const { phase, combat, run, playCard: storePlayCard, endTurn, useSkill, collectReward } = useGameStore()
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [selectedEnemy, setSelectedEnemy] = useState<number>(0)
  const [rewardCards, setRewardCards] = useState<string[] | null>(null)
  const [pickedReward, setPickedReward] = useState(false)
  const [flyCards, setFlyCards] = useState<FlyCard[]>([])
  const [enemyDamage, setEnemyDamage] = useState<Record<number, number>>({})
  const [screenShake, setScreenShake] = useState(false)
  const handRef = useRef<HTMLDivElement>(null)
  const enemyAreaRef = useRef<HTMLDivElement>(null)

  const triggerFlyCard = useCallback((cardEl: HTMLElement | null, _targetIdx: number) => {
    if (!cardEl || !enemyAreaRef.current) return
    const cr = cardEl.getBoundingClientRect()
    const er = enemyAreaRef.current.getBoundingClientRect()
    const tx = er.left + er.width / 2 - cr.left - cr.width / 2
    const ty = er.top + er.height / 2 - cr.top - cr.height / 2
    const id = Math.random().toString(36).slice(2)
    setFlyCards(prev => [...prev, { id, x: 0, y: 0, tx, ty }])
    setTimeout(() => setFlyCards(prev => prev.filter(f => f.id !== id)), 450)
  }, [])

  if (phase !== 'combat' || !combat || !run) return null

  const char = CHARACTERS[run.characterId]

  // 战斗胜利
  if (combat.phase === 'victory' && !pickedReward) {
    if (!rewardCards) {
      const pool = COMMON_CARD_POOL.filter(id => !run.deck.includes(id))
      const rewards = [
        pickRandom(pool.filter(id => CARDS[id]?.rarity === 'rare') || pool),
        pickRandom(pool.filter(id => CARDS[id]?.rarity === 'uncommon') || pool),
        pickRandom(pool),
      ].filter(Boolean)
      setRewardCards(rewards)
    }
    return (
      <div className="flex flex-col items-center justify-center h-full select-none"
        style={{ backgroundColor: '#0d0500' }}>
        <div className="text-[#fbbf24] text-3xl mb-2 tracking-wider">⚔ 战斗胜利</div>
        <div className="text-sm mb-8" style={{ color: '#c8a870' }}>选择一张卡牌加入牌库</div>
        <div className="flex gap-6 mb-8">
          {(rewardCards || []).map(cardId => {
            const def = CARDS[cardId]
            if (!def) return null
            const typeColors: Record<string, string> = {
              attack: '#ff6b6b', defense: '#4ade80', spell: '#fcd34d', trick: '#38bdf8'
            }
            const c = typeColors[def.type] || '#f5e6c8'
            return (
              <div
                key={cardId}
                className="cursor-pointer p-4 hover:scale-105 transition-all duration-150 w-40"
                style={{
                  backgroundColor: '#1a0a00',
                  border: `1px solid ${c}66`,
                  clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
                }}
                onClick={() => { setPickedReward(true); collectReward(cardId) }}
              >
                <div className="text-center font-bold mb-2" style={{ color: c }}>{def.name}</div>
                <div className="text-xs text-center" style={{ color: '#e8d8b8' }}>{def.description}</div>
              </div>
            )
          })}
        </div>
        <button
          className="text-sm underline hover:text-[#fbbf24] transition-colors"
          style={{ color: '#c8a870' }}
          onClick={() => { setPickedReward(true); collectReward() }}
        >
          跳过，不取卡牌
        </button>
      </div>
    )
  }

  if (combat.phase === 'defeat') {
    return (
      <div className="flex flex-col items-center justify-center h-full select-none"
        style={{ backgroundColor: '#0d0500' }}>
        <div className="text-4xl mb-4" style={{ color: '#f87171' }}>💀 战败</div>
        <div className="mb-8" style={{ color: '#c8a870' }}>你已倒在征途之中...</div>
        <button
          onClick={() => useGameStore.getState().backToMenu()}
          className="px-6 py-3 border transition-colors"
          style={{ borderColor: '#5a3a2a', color: '#c8a870' }}
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

  const handleCardClick = (instanceId: string, cardEl: HTMLElement | null) => {
    if (!isPlayerTurn) return
    const card = combat.hand.find(c => c.instanceId === instanceId)
    if (!card) return
    const def = CARDS[card.defId]
    if (!def || def.cost > combat.qi) return

    if (selectedCard === instanceId) {
      // 触发飞牌动画
      triggerFlyCard(cardEl, selectedEnemy)

      // 受击效果
      setTimeout(() => {
        if (def.type === 'attack') {
          setEnemyDamage(prev => ({ ...prev, [selectedEnemy]: def.effect.damage ?? 0 }))
          setScreenShake(true)
          setTimeout(() => setScreenShake(false), 350)
          setTimeout(() => setEnemyDamage(prev => {
            const n = { ...prev }; delete n[selectedEnemy]; return n
          }), 1200)
        }
      }, 320)

      storePlayCard(instanceId, selectedEnemy)
      setSelectedCard(null)
    } else {
      setSelectedCard(instanceId)
    }
  }

  return (
    <div
      className="flex flex-col h-full select-none relative overflow-hidden"
      style={{
        backgroundColor: '#0d0500',
        color: '#f5e6c8',
        animation: screenShake ? 'screen-shake 0.3s ease' : 'none',
      }}
    >
      {/* 飞牌动画层 */}
      {flyCards.map(fc => (
        <div
          key={fc.id}
          className="absolute pointer-events-none z-50 w-10 h-14 rounded"
          style={{
            left: '50%',
            top: '75%',
            backgroundColor: '#d4af37',
            opacity: 0,
            animation: `fly-card 0.4s ease-out forwards`,
            '--tx': `${fc.tx}px`,
            '--ty': `${fc.ty}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* 顶部状态栏 */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: '#5a3a2a', backgroundColor: '#1a0a00' }}
      >
        {/* 血量 */}
        <div className="flex items-center gap-3">
          <div>
            <div className="text-xs font-semibold" style={{ color: '#e0c8a0' }}>生命</div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg" style={{ color: '#f87171' }}>{combat.playerHp}</span>
              <span style={{ color: '#8b6655' }}>/</span>
              <span style={{ color: '#e0c8a0' }}>{combat.playerMaxHp}</span>
            </div>
            <div className="w-32 h-2 rounded-full mt-0.5 overflow-hidden" style={{ backgroundColor: '#3d1f00' }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(combat.playerHp / combat.playerMaxHp) * 100}%`,
                  backgroundColor: '#ef4444',
                  boxShadow: '0 0 6px #ef444488',
                }}
              />
            </div>
          </div>
          {combat.playerBlock > 0 && (
            <div className="font-bold text-base" style={{ color: '#34d399' }}>
              🛡 {combat.playerBlock}
            </div>
          )}
        </div>

        {/* 气力 */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-semibold mb-1" style={{ color: '#e0c8a0' }}>气力</div>
          <div className="flex gap-1">
            {Array.from({ length: combat.qiMax }).map((_, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all"
                style={{
                  backgroundColor: i < combat.qi ? '#d4af3733' : 'transparent',
                  borderColor: i < combat.qi ? '#fbbf24' : '#5a3a2a',
                  color: i < combat.qi ? '#fbbf24' : '#5a3a2a',
                  boxShadow: i < combat.qi ? '0 0 6px #fbbf2488' : 'none',
                }}
              >⚡</div>
            ))}
          </div>
          <div className="text-xs mt-1 font-semibold" style={{ color: '#fbbf24' }}>
            {combat.qi} / {combat.qiMax}
          </div>
        </div>

        {/* 角色名 + 天命 */}
        <div className="text-right">
          <div className="font-bold" style={{ color: char.color }}>{char.name}</div>
          {fateActivated ? (
            <div className="text-xs" style={{ color: '#c4b5fd' }}>⚡ 天命已激活</div>
          ) : (
            <div className="text-xs" style={{ color: '#d4b896' }}>
              天命 {fateProgress}/{fateTotal}
            </div>
          )}
        </div>
      </div>

      {/* 中部战斗区域 */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        {/* 战场 */}
        <div className="flex items-end justify-center gap-8 py-4 px-4 relative" ref={enemyAreaRef}>
          {/* 角色立绘（左下角） */}
          <div
            className="absolute left-4 bottom-0 opacity-80"
            style={{ filter: 'drop-shadow(0 0 8px ' + char.color + '44)' }}
          >
            <CharacterSprite characterId={run.characterId} size={64} glowing={isPlayerTurn} />
          </div>

          {/* 敌人 */}
          {combat.enemies.map((enemy, i) => (
            <EnemyComponent
              key={i}
              enemy={enemy}
              index={i}
              selected={selectedEnemy === i}
              onClick={() => setSelectedEnemy(i)}
              showIntent={isPlayerTurn}
              damageTaken={enemyDamage[i]}
            />
          ))}
        </div>

        {/* 战斗日志（最新一条） */}
        {combat.log.length > 0 && (
          <div
            className="text-center text-xs px-4 py-1.5 font-medium"
            style={{ backgroundColor: '#1a0a00cc', color: '#e8d8b8' }}
          >
            {combat.log[combat.log.length - 1]}
          </div>
        )}

        {/* 手牌区 */}
        <div className="border-t" style={{ backgroundColor: '#140800', borderColor: '#5a3a2a' }}>
          {/* 手牌 */}
          <div
            ref={handRef}
            className="flex gap-2 overflow-x-auto pb-2 pt-3 px-3 justify-center flex-wrap"
          >
            {combat.hand.map(card => {
              const def = CARDS[card.defId]
              const canPlay = isPlayerTurn && def && def.cost <= combat.qi
              return (
                <CardComponent
                  key={card.instanceId}
                  card={card}
                  selected={selectedCard === card.instanceId}
                  playable={canPlay}
                  onClick={() => {
                    // 找到被点击的卡片元素
                    const cardEls = handRef.current?.querySelectorAll('[data-card-id]')
                    let el: HTMLElement | null = null
                    cardEls?.forEach(e => {
                      if ((e as HTMLElement).dataset.cardId === card.instanceId) {
                        el = e as HTMLElement
                      }
                    })
                    handleCardClick(card.instanceId, el)
                  }}
                />
              )
            })}
            {combat.hand.length === 0 && isPlayerTurn && (
              <div className="text-sm self-center py-4" style={{ color: '#8b6655' }}>手牌已空</div>
            )}
          </div>

          {/* 底部操作栏 */}
          <div className="flex items-center justify-between px-3 pb-3 pt-1">
            {/* 牌库/弃牌堆 */}
            <div className="flex gap-4 text-xs font-medium" style={{ color: '#c8a870' }}>
              <span>牌库 {combat.deck.length}</span>
              <span>弃牌 {combat.discard.length}</span>
              <span>消耗 {combat.exhaust.length}</span>
            </div>

            {/* 技能按钮 */}
            <button
              onClick={() => isPlayerTurn && useSkill()}
              disabled={!isPlayerTurn || combat.qi < char.skill.cost}
              className="px-4 py-2 text-xs border tracking-wider transition-all"
              style={{
                clipPath: 'polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)',
                borderColor: isPlayerTurn && combat.qi >= char.skill.cost ? '#a78bfa' : '#5a3a2a',
                color: isPlayerTurn && combat.qi >= char.skill.cost ? '#c4b5fd' : '#5a3a2a',
                backgroundColor:
                  isPlayerTurn && combat.qi >= char.skill.cost ? '#a78bfa11' : 'transparent',
                cursor: isPlayerTurn && combat.qi >= char.skill.cost ? 'pointer' : 'not-allowed',
              }}
            >
              {char.skill.name} ({char.skill.cost}⚡)
            </button>

            {/* 结束回合 */}
            <button
              onClick={() => isPlayerTurn && endTurn()}
              disabled={!isPlayerTurn}
              className="px-6 py-2 font-bold tracking-wider text-sm transition-all"
              style={{
                clipPath: 'polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)',
                backgroundColor: isPlayerTurn ? '#d4af37' : '#3d1f00',
                color: isPlayerTurn ? '#1a0a00' : '#7a5535',
                cursor: isPlayerTurn ? 'pointer' : 'not-allowed',
              }}
            >
              {isPlayerTurn ? '结束回合' : '敌方回合...'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

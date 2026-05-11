import { useGameStore } from '../../store/gameStore'

export function MainMenu() {
  const { phase } = useGameStore()

  if (phase !== 'main_menu') return null

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0500] via-[#1a0a00] to-[#0d0500]" />
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #d4af37 0, #d4af37 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* 标题区 */}
      <div className="relative z-10 text-center mb-16">
        <div className="text-[#d4af37] text-sm tracking-[0.8em] mb-4 opacity-70">志怪肉鸽</div>
        <h1 className="text-7xl font-bold text-[#f5e6c8] mb-2"
          style={{ textShadow: '0 0 40px #d4af37, 0 0 80px #d4af3744' }}>
          山海志
        </h1>
        <div className="text-[#d4af37] text-sm tracking-[0.5em] mt-4 opacity-60">异兽 · 仙法 · 轮回</div>
      </div>

      {/* 按钮区 */}
      <div className="relative z-10 flex flex-col gap-4 items-center">
        <button
          onClick={() => useGameStore.getState().phase === 'main_menu' && 
            useGameStore.setState({ phase: 'character_select' })}
          className="w-56 py-4 text-lg font-bold tracking-[0.3em] border border-[#d4af37] text-[#d4af37]
            bg-transparent hover:bg-[#d4af3722] transition-all duration-200
            relative overflow-hidden group"
          style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
        >
          <span className="relative z-10">开始新局</span>
        </button>
        <div className="text-[#8b5e3c] text-xs tracking-widest mt-4">
          版本 MVP 0.1
        </div>
      </div>

      {/* 底部装饰文字 */}
      <div className="absolute bottom-8 text-[#3d1f00] text-xs tracking-widest">
        山海经 · 搜神记 · 聊斋志异
      </div>
    </div>
  )
}

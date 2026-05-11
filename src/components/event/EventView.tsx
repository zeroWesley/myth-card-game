import { useGameStore } from '../../store/gameStore'

export function EventView() {
  const { phase, currentEvent, chooseEventOption } = useGameStore()

  if (phase !== 'event' || !currentEvent) return null

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#0d0500] text-[#f5e6c8] p-8">
      <div className="max-w-lg w-full">
        {/* 标题 */}
        <div className="text-[#d4af37] text-xs tracking-[0.5em] mb-2">📜 奇遇事件</div>
        <h2 className="text-2xl font-bold mb-6 border-b border-[#3d1f00] pb-4">
          {currentEvent.title}
        </h2>

        {/* 描述 */}
        <div className="bg-[#1a0a00] border border-[#3d1f00] p-4 mb-8 leading-relaxed text-[#c8b89a] text-sm">
          {currentEvent.description}
        </div>

        {/* 选项 */}
        <div className="flex flex-col gap-3">
          {currentEvent.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => chooseEventOption(i)}
              className="text-left p-4 border border-[#3d1f00] hover:border-[#d4af37] hover:bg-[#d4af3711]
                transition-all duration-150 text-sm"
              style={{ clipPath: 'polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)' }}
            >
              <div className="text-[#d4af37] text-xs mb-1">
                {String.fromCharCode(65 + i)}. 
              </div>
              <div>{choice.text}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

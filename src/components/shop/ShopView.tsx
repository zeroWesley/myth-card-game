import { useGameStore } from '../../store/gameStore'
import { CARDS } from '../../data/cards'
import { TREASURES } from '../../data/treasures'

export function ShopView() {
  const { phase, currentShop, run, purchaseShopItem, leaveShop } = useGameStore()

  if (phase !== 'shop' || !currentShop || !run) return null

  return (
    <div className="flex flex-col h-full bg-[#0d0500] text-[#f5e6c8]">
      {/* 顶部 */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#5a3a2a]">
        <div>
          <h2 className="text-xl font-bold text-[#fbbf24] tracking-wider">🏪 云游术士商店</h2>
          <p className="text-xs text-[#c8a870] mt-1">稀奇古怪，应有尽有</p>
        </div>
        <div className="text-[#fbbf24] font-bold text-lg">💰 {run.gold} 金</div>
      </div>

      {/* 商品列表 */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {currentShop.items.map((item, i) => {
            const canBuy = !item.purchased && run.gold >= item.price

            if (item.type === 'card') {
              const card = CARDS[item.id]
              if (!card) return null
              return (
                <div key={i}
                  className={`border p-4 flex flex-col transition-all bg-[#110800] ${
                    item.purchased ? 'opacity-40' : 'hover:border-[#fbbf2444]'
                  }`}
                  style={{
                    borderColor: item.purchased ? '#3d1f0044' : '#5a3a2a',
                    clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
                  }}
                >
                  <div className="text-xs text-[#b08060] mb-1">卡牌 · {card.rarity === 'rare' ? '稀有' : card.rarity === 'uncommon' ? '罕见' : '普通'}</div>
                  <div className="font-bold mb-1 text-[#f5e6c8]">{card.name}</div>
                  <div className="text-xs text-[#d4b896] flex-1">{card.description}</div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[#fbbf24] font-bold">{item.price} 金</span>
                    <button
                      onClick={() => canBuy && purchaseShopItem(i)}
                      disabled={!canBuy}
                      className={`text-xs px-3 py-1 border transition-colors ${
                        canBuy
                          ? 'border-[#fbbf24] text-[#fbbf24] hover:bg-[#fbbf2422]'
                          : 'border-[#5a3a2a] text-[#7a5535] cursor-not-allowed'
                      }`}
                    >
                      {item.purchased ? '已购' : '购买'}
                    </button>
                  </div>
                </div>
              )
            }

            if (item.type === 'treasure') {
              const treasure = TREASURES[item.id]
              if (!treasure) return null
              return (
                <div key={i}
                  className={`border p-4 flex flex-col transition-all bg-[#110800] ${
                    item.purchased ? 'opacity-40' : 'hover:border-[#fbbf2466]'
                  }`}
                  style={{
                    borderColor: item.purchased ? '#3d1f0044' : '#7a5a1a',
                    clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
                  }}
                >
                  <div className="text-xs text-[#fbbf24] mb-1">
                    法宝 · {treasure.grade === 'immortal' ? '仙器' : treasure.grade === 'spirit' ? '灵器' : '凡器'}
                  </div>
                  <div className="font-bold mb-1 text-[#f5e6c8]">{treasure.name}</div>
                  <div className="text-xs text-[#d4b896] flex-1">{treasure.description}</div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[#fbbf24] font-bold">{item.price} 金</span>
                    <button
                      onClick={() => canBuy && purchaseShopItem(i)}
                      disabled={!canBuy}
                      className={`text-xs px-3 py-1 border transition-colors ${
                        canBuy
                          ? 'border-[#fbbf24] text-[#fbbf24] hover:bg-[#fbbf2422]'
                          : 'border-[#5a3a2a] text-[#7a5535] cursor-not-allowed'
                      }`}
                    >
                      {item.purchased ? '已购' : '购买'}
                    </button>
                  </div>
                </div>
              )
            }

            if (item.type === 'remove') {
              return (
                <div key={i}
                  className={`border p-4 flex flex-col transition-all bg-[#110800] ${
                    item.purchased ? 'opacity-40' : 'hover:border-[#f8717144]'
                  }`}
                  style={{
                    borderColor: item.purchased ? '#3d1f0044' : '#7a2020',
                    clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
                  }}
                >
                  <div className="text-xs text-[#f87171] mb-1">服务</div>
                  <div className="font-bold mb-1 text-[#f5e6c8]">去除卡牌</div>
                  <div className="text-xs text-[#d4b896] flex-1">
                    从牌库中永久移除一张你不想要的卡牌。
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[#fbbf24] font-bold">{item.price} 金</span>
                    <button
                      disabled={!canBuy}
                      onClick={() => canBuy && purchaseShopItem(i)}
                      className={`text-xs px-3 py-1 border transition-colors ${
                        canBuy
                          ? 'border-[#f87171] text-[#f87171] hover:bg-[#f8717122]'
                          : 'border-[#5a3a2a] text-[#7a5535] cursor-not-allowed'
                      }`}
                    >
                      {item.purchased ? '已使用' : '购买'}
                    </button>
                  </div>
                </div>
              )
            }

            return null
          })}
        </div>
      </div>

      {/* 离开按钮 */}
      <div className="p-4 border-t border-[#5a3a2a] flex justify-center">
        <button
          onClick={leaveShop}
          className="px-8 py-2 border border-[#9a6a3a] text-[#c8a870] hover:border-[#fbbf24] hover:text-[#fbbf24]
            transition-colors tracking-wider text-sm"
        >
          离开商店
        </button>
      </div>
    </div>
  )
}

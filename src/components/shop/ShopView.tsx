import { useGameStore } from '../../store/gameStore'
import { CARDS } from '../../data/cards'
import { TREASURES } from '../../data/treasures'

export function ShopView() {
  const { phase, currentShop, run, purchaseShopItem, leaveShop } = useGameStore()

  if (phase !== 'shop' || !currentShop || !run) return null

  return (
    <div className="flex flex-col h-full bg-[#0d0500] text-[#f5e6c8]">
      {/* 顶部 */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#3d1f00]">
        <div>
          <h2 className="text-xl font-bold text-[#d4af37] tracking-wider">🏪 云游术士商店</h2>
          <p className="text-xs text-[#8b5e3c] mt-1">稀奇古怪，应有尽有</p>
        </div>
        <div className="text-[#d4af37] font-bold text-lg">💰 {run.gold} 金</div>
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
                  className={`border p-4 flex flex-col transition-all ${
                    item.purchased ? 'opacity-30' : ''
                  }`}
                  style={{
                    borderColor: item.purchased ? '#3d1f0044' : '#3d1f00',
                    clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
                  }}
                >
                  <div className="text-xs text-[#8b5e3c] mb-1">卡牌 · {card.rarity === 'rare' ? '稀有' : card.rarity === 'uncommon' ? '罕见' : '普通'}</div>
                  <div className="font-bold mb-1">{card.name}</div>
                  <div className="text-xs text-[#c8b89a] flex-1">{card.description}</div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[#d4af37] font-bold">{item.price} 金</span>
                    <button
                      onClick={() => canBuy && purchaseShopItem(i)}
                      disabled={!canBuy}
                      className={`text-xs px-3 py-1 border transition-colors ${
                        canBuy
                          ? 'border-[#d4af37] text-[#d4af37] hover:bg-[#d4af3722]'
                          : 'border-[#3d1f00] text-[#3d1f00] cursor-not-allowed'
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
                  className={`border p-4 flex flex-col transition-all ${
                    item.purchased ? 'opacity-30' : ''
                  }`}
                  style={{
                    borderColor: item.purchased ? '#3d1f0044' : '#d4af3744',
                    clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
                  }}
                >
                  <div className="text-xs text-[#d4af37] mb-1">
                    法宝 · {treasure.grade === 'immortal' ? '仙器' : treasure.grade === 'spirit' ? '灵器' : '凡器'}
                  </div>
                  <div className="font-bold mb-1">{treasure.name}</div>
                  <div className="text-xs text-[#c8b89a] flex-1">{treasure.description}</div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[#d4af37] font-bold">{item.price} 金</span>
                    <button
                      onClick={() => canBuy && purchaseShopItem(i)}
                      disabled={!canBuy}
                      className={`text-xs px-3 py-1 border transition-colors ${
                        canBuy
                          ? 'border-[#d4af37] text-[#d4af37] hover:bg-[#d4af3722]'
                          : 'border-[#3d1f00] text-[#3d1f00] cursor-not-allowed'
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
                  className={`border border-[#c0392b44] p-4 flex flex-col transition-all ${
                    item.purchased ? 'opacity-30' : ''
                  }`}
                  style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}
                >
                  <div className="text-xs text-[#c0392b] mb-1">服务</div>
                  <div className="font-bold mb-1">去除卡牌</div>
                  <div className="text-xs text-[#c8b89a] flex-1">
                    从牌库中永久移除一张你不想要的卡牌。
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[#d4af37] font-bold">{item.price} 金</span>
                    <button
                      disabled={!canBuy}
                      onClick={() => canBuy && purchaseShopItem(i)}
                      className={`text-xs px-3 py-1 border transition-colors ${
                        canBuy
                          ? 'border-[#c0392b] text-[#c0392b] hover:bg-[#c0392b22]'
                          : 'border-[#3d1f00] text-[#3d1f00] cursor-not-allowed'
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
      <div className="p-4 border-t border-[#3d1f00] flex justify-center">
        <button
          onClick={leaveShop}
          className="px-8 py-2 border border-[#8b5e3c] text-[#8b5e3c] hover:border-[#d4af37] hover:text-[#d4af37]
            transition-colors tracking-wider text-sm"
        >
          离开商店
        </button>
      </div>
    </div>
  )
}

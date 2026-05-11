import { useGameStore } from './store/gameStore'
import { MainMenu } from './components/ui/MainMenu'
import { CharacterSelect } from './components/character/CharacterSelect'
import { MapView } from './components/map/MapView'
import { BattleView } from './components/battle/BattleView'
import { EventView } from './components/event/EventView'
import { ShopView } from './components/shop/ShopView'
import { CampView } from './components/ui/CampView'

function App() {
  const { phase } = useGameStore()

  return (
    <div className="w-full h-full">
      <MainMenu />
      <CharacterSelect />
      <MapView />
      <BattleView />
      <EventView />
      <ShopView />
      <CampView />
      {phase === 'victory' && <VictoryScreen />}
      {phase === 'defeat' && <DefeatScreen />}
    </div>
  )
}

function VictoryScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#0d0500] text-[#f5e6c8]">
      <div className="text-[#d4af37] text-5xl mb-4">🏆</div>
      <h2 className="text-3xl font-bold text-[#d4af37] mb-4">通关胜利！</h2>
      <p className="text-[#8b5e3c] mb-8">天地归心，山海已定。</p>
      <button
        onClick={() => useGameStore.getState().backToMenu()}
        className="px-8 py-3 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af3722] transition-colors"
      >
        返回主菜单
      </button>
    </div>
  )
}

function DefeatScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#0d0500] text-[#f5e6c8]">
      <div className="text-[#c0392b] text-5xl mb-4">💀</div>
      <h2 className="text-3xl font-bold text-[#c0392b] mb-4">英魂已散</h2>
      <p className="text-[#8b5e3c] mb-8">此番征途，止于此处。</p>
      <button
        onClick={() => useGameStore.getState().backToMenu()}
        className="px-8 py-3 border border-[#3d1f00] text-[#8b5e3c] hover:border-[#8b5e3c] transition-colors"
      >
        返回主菜单
      </button>
    </div>
  )
}

export default App

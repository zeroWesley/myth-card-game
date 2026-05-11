import React from 'react'

/**
 * 国风敌人立绘 —— SVG 绘制
 */

interface EnemySpriteProps {
  defId: string
  isBoss?: boolean
  size?: number
  selected?: boolean
}

/* ────────── 山魈 ────────── */
function ShansaoSprite({ size, selected }: { size: number; selected?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
      style={{ filter: selected ? 'drop-shadow(0 0 8px #f87171)' : 'none' }}>
      {/* 身体 */}
      <ellipse cx="40" cy="55" rx="16" ry="18" fill="#7f1d1d" stroke="#b91c1c" strokeWidth="1.2" />
      {/* 腹部纹 */}
      <ellipse cx="40" cy="58" rx="9" ry="12" fill="#991b1b" opacity="0.6" />
      {/* 尾巴 */}
      <path d="M52 60 Q70 52 68 38 Q66 28 58 30 Q62 40 56 52 Z" fill="#7f1d1d" stroke="#b91c1c" strokeWidth="0.8" />
      {/* 腿 */}
      <rect x="30" y="68" width="8" height="10" rx="3" fill="#991b1b" />
      <rect x="42" y="68" width="8" height="10" rx="3" fill="#991b1b" />
      {/* 手臂 */}
      <path d="M24 48 L12 58 L16 65 L28 56 Z" fill="#7f1d1d" stroke="#b91c1c" strokeWidth="0.8" />
      <path d="M56 48 L68 58 L64 65 L52 56 Z" fill="#7f1d1d" stroke="#b91c1c" strokeWidth="0.8" />
      {/* 爪 */}
      <path d="M12 58 L8 54 L11 62 M12 58 L6 60 L11 66" stroke="#fca5a5" strokeWidth="1" fill="none" />
      <path d="M68 58 L72 54 L69 62 M68 58 L74 60 L69 66" stroke="#fca5a5" strokeWidth="1" fill="none" />
      {/* 头 */}
      <ellipse cx="40" cy="32" rx="14" ry="15" fill="#b91c1c" stroke="#991b1b" strokeWidth="1" />
      {/* 耳朵 */}
      <ellipse cx="27" cy="24" rx="5" ry="7" fill="#b91c1c" stroke="#991b1b" strokeWidth="0.8" />
      <ellipse cx="53" cy="24" rx="5" ry="7" fill="#b91c1c" stroke="#991b1b" strokeWidth="0.8" />
      <ellipse cx="27" cy="24" rx="2.5" ry="4" fill="#fda4af" opacity="0.7" />
      <ellipse cx="53" cy="24" rx="2.5" ry="4" fill="#fda4af" opacity="0.7" />
      {/* 眼睛（凶狠） */}
      <ellipse cx="33" cy="31" rx="4" ry="3.5" fill="#1c0900" />
      <ellipse cx="47" cy="31" rx="4" ry="3.5" fill="#1c0900" />
      <ellipse cx="33" cy="31" rx="2.5" ry="2.5" fill="#fbbf24" />
      <ellipse cx="47" cy="31" rx="2.5" ry="2.5" fill="#fbbf24" />
      <circle cx="32.5" cy="30.5" r="1" fill="white" />
      <circle cx="46.5" cy="30.5" r="1" fill="white" />
      {/* 眉骨突起 */}
      <path d="M29 27 Q33 25 37 27" stroke="#7f1d1d" strokeWidth="2" fill="none" />
      <path d="M43 27 Q47 25 51 27" stroke="#7f1d1d" strokeWidth="2" fill="none" />
      {/* 嘴（龇牙） */}
      <path d="M33 39 L47 39" stroke="#1c0900" strokeWidth="2" />
      <path d="M36 39 L35 44 L38 39" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="0.5" />
      <path d="M42 39 L43 44 L46 39" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="0.5" />
    </svg>
  )
}

/* ────────── 狐狸精 ────────── */
function FoxSprite({ size, selected }: { size: number; selected?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
      style={{ filter: selected ? 'drop-shadow(0 0 8px #f87171)' : 'none' }}>
      {/* 尾巴 */}
      <path d="M52 55 Q78 45 74 26 Q71 14 60 18 Q66 30 58 44 Q54 52 52 55 Z"
        fill="#f97316" stroke="#fb923c" strokeWidth="0.8" />
      <path d="M52 55 Q76 47 72 30 Q70 22 65 24 Q70 34 62 46 Z" fill="#fed7aa" opacity="0.85" />
      {/* 身体 */}
      <ellipse cx="37" cy="54" rx="15" ry="14" fill="#f97316" stroke="#ea580c" strokeWidth="1" />
      <ellipse cx="37" cy="57" rx="9" ry="10" fill="#fed7aa" opacity="0.9" />
      {/* 腿 */}
      <rect x="29" y="64" width="7" height="12" rx="3" fill="#ea580c" />
      <rect x="39" y="64" width="7" height="12" rx="3" fill="#ea580c" />
      <ellipse cx="32.5" cy="76" rx="5" ry="3" fill="#c2410c" />
      <ellipse cx="42.5" cy="76" rx="5" ry="3" fill="#c2410c" />
      {/* 手臂 */}
      <rect x="20" y="45" width="8" height="16" rx="4" fill="#f97316" />
      <rect x="49" y="45" width="8" height="16" rx="4" fill="#f97316" />
      {/* 头 */}
      <ellipse cx="37" cy="31" rx="14" ry="13" fill="#fb923c" stroke="#f97316" strokeWidth="0.8" />
      <ellipse cx="37" cy="35" rx="9" ry="8" fill="#fed7aa" opacity="0.9" />
      {/* 耳 */}
      <path d="M24 24 L19 10 L31 20 Z" fill="#f97316" stroke="#ea580c" strokeWidth="0.8" />
      <path d="M50 24 L55 10 L49 20 Z" fill="#f97316" stroke="#ea580c" strokeWidth="0.8" />
      <path d="M25 23 L21 12 L30 20 Z" fill="#fda4af" opacity="0.7" />
      <path d="M49 23 L53 12 L50 20 Z" fill="#fda4af" opacity="0.7" />
      {/* 眼（妖艳） */}
      <ellipse cx="31" cy="29" rx="3.5" ry="3" fill="#fef2f2" />
      <ellipse cx="43" cy="29" rx="3.5" ry="3" fill="#fef2f2" />
      <ellipse cx="31" cy="29.5" rx="2.2" ry="2.2" fill="#dc2626" />
      <ellipse cx="43" cy="29.5" rx="2.2" ry="2.2" fill="#dc2626" />
      <circle cx="30.5" cy="28.8" r="0.8" fill="white" />
      <circle cx="42.5" cy="28.8" r="0.8" fill="white" />
      {/* 鼻/嘴 */}
      <ellipse cx="37" cy="35" rx="2" ry="1.5" fill="#c2410c" />
      <path d="M35 37.5 Q37 40 39 37.5" stroke="#c2410c" strokeWidth="0.8" fill="none" />
      {/* 须 */}
      <line x1="39" y1="36" x2="52" y2="33" stroke="#d4b896" strokeWidth="0.7" opacity="0.8" />
      <line x1="39" y1="37" x2="52" y2="37" stroke="#d4b896" strokeWidth="0.7" opacity="0.8" />
      <line x1="35" y1="36" x2="22" y2="33" stroke="#d4b896" strokeWidth="0.7" opacity="0.8" />
      <line x1="35" y1="37" x2="22" y2="37" stroke="#d4b896" strokeWidth="0.7" opacity="0.8" />
    </svg>
  )
}

/* ────────── 夜叉 ────────── */
function YakshaSprite({ size, selected }: { size: number; selected?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
      style={{ filter: selected ? 'drop-shadow(0 0 8px #f87171)' : 'none' }}>
      {/* 身体（甲胄） */}
      <rect x="24" y="38" width="32" height="30" rx="4" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1.2" />
      <path d="M24 50 L56 50" stroke="#4338ca" strokeWidth="0.5" opacity="0.4" />
      {/* 腰带 */}
      <rect x="24" y="62" width="32" height="5" rx="1" fill="#4338ca" />
      {/* 腿 */}
      <rect x="28" y="66" width="9" height="12" rx="2" fill="#1e1b4b" stroke="#4338ca" strokeWidth="0.8" />
      <rect x="43" y="66" width="9" height="12" rx="2" fill="#1e1b4b" stroke="#4338ca" strokeWidth="0.8" />
      {/* 手臂 */}
      <rect x="10" y="36" width="15" height="24" rx="4" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1" />
      <rect x="55" y="36" width="15" height="24" rx="4" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1" />
      {/* 手持武器（戟） */}
      <line x1="8" y1="10" x2="8" y2="68" stroke="#78716c" strokeWidth="2.5" />
      <path d="M4 18 L8 10 L12 18 L10 22 L8 18 L6 22 Z" fill="#94a3b8" stroke="#64748b" strokeWidth="0.8" />
      {/* 颈 */}
      <rect x="36" y="30" width="8" height="10" rx="2" fill="#fbbf9d" />
      {/* 头 */}
      <ellipse cx="40" cy="22" rx="14" ry="13" fill="#c4a882" stroke="#a08050" strokeWidth="0.8" />
      {/* 头盔 */}
      <path d="M26 18 Q26 6 40 6 Q54 6 54 18 L52 20 Q44 10 40 10 Q36 10 28 20 Z" fill="#1e1b4b" stroke="#4338ca" strokeWidth="0.8" />
      <rect x="36" y="5" width="8" height="6" rx="1" fill="#4338ca" />
      <path d="M38 5 L40 0 L42 5" fill="#818cf8" />
      {/* 眼（威严） */}
      <ellipse cx="34" cy="21" rx="3.5" ry="3" fill="#1c0900" />
      <ellipse cx="46" cy="21" rx="3.5" ry="3" fill="#1c0900" />
      <ellipse cx="34" cy="21" rx="2" ry="2" fill="#fbbf24" />
      <ellipse cx="46" cy="21" rx="2" ry="2" fill="#fbbf24" />
      {/* 眉（浓眉） */}
      <path d="M30 17.5 Q34 16 38 17.5" stroke="#1c0900" strokeWidth="2.2" fill="none" />
      <path d="M42 17.5 Q46 16 50 17.5" stroke="#1c0900" strokeWidth="2.2" fill="none" />
      {/* 嘴（肃穆） */}
      <path d="M36 28 L44 28" stroke="#805030" strokeWidth="1.2" />
    </svg>
  )
}

/* ────────── 白蛇 ────────── */
function WhiteSnakeSprite({ size, selected }: { size: number; selected?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
      style={{ filter: selected ? 'drop-shadow(0 0 8px #f87171)' : 'none' }}>
      <ellipse cx="40" cy="72" rx="22" ry="5" fill="#14532d" opacity="0.3" />
      {/* 蛇身盘绕 */}
      <path d="M55 65 Q72 54 67 38 Q62 22 50 18 Q33 13 26 27 Q18 42 30 53 Q42 64 52 56 Q60 48 57 36 Q54 27 44 26"
        stroke="#bbf7d0" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M55 65 Q72 54 67 38 Q62 22 50 18 Q33 13 26 27 Q18 42 30 53 Q42 64 52 56 Q60 48 57 36 Q54 27 44 26"
        stroke="#4ade80" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M55 65 Q72 54 67 38 Q62 22 50 18 Q33 13 26 27 Q18 42 30 53 Q42 64 52 56 Q60 48 57 36 Q54 27 44 26"
        stroke="#86efac" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeDasharray="8 5" opacity="0.5" />
      {/* 蛇头 */}
      <ellipse cx="43" cy="23" rx="11" ry="9" fill="#6ee7b7" stroke="#34d399" strokeWidth="1" />
      {/* 蛇眼 */}
      <ellipse cx="38" cy="21" rx="2.8" ry="3.2" fill="#fef9ee" />
      <ellipse cx="48" cy="21" rx="2.8" ry="3.2" fill="#fef9ee" />
      <ellipse cx="38" cy="21.5" rx="1.5" ry="2.2" fill="#dc2626" />
      <ellipse cx="48" cy="21.5" rx="1.5" ry="2.2" fill="#dc2626" />
      <circle cx="38" cy="20.5" r="0.6" fill="white" />
      <circle cx="48" cy="20.5" r="0.6" fill="white" />
      {/* 信子 */}
      <path d="M41 29 L39 34 M41 29 L43 34" stroke="#ef4444" strokeWidth="1.3" fill="none" />
      {/* 毒气 */}
      <circle cx="18" cy="44" r="2.2" fill="#4ade80" opacity="0.6" />
      <circle cx="13" cy="36" r="1.5" fill="#86efac" opacity="0.5" />
    </svg>
  )
}

/* ────────── 阴兵 ────────── */
function HellSoldierSprite({ size, selected }: { size: number; selected?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
      style={{ filter: selected ? 'drop-shadow(0 0 8px #f87171)' : 'none' }}>
      {/* 阴气光晕 */}
      <ellipse cx="40" cy="40" rx="30" ry="30" fill="#1e1b4b" opacity="0.2" />
      {/* 身体（半透明） */}
      <rect x="26" y="36" width="28" height="32" rx="3" fill="#312e81" stroke="#4338ca" strokeWidth="1" opacity="0.85" />
      {/* 盔甲纹 */}
      <path d="M26 48 L54 48" stroke="#6366f1" strokeWidth="0.5" opacity="0.4" />
      <path d="M26 60 L54 60" stroke="#6366f1" strokeWidth="0.5" opacity="0.4" />
      {/* 武器（阴刀） */}
      <path d="M60 10 L62 14 Q65 22 62 38 L60 38" stroke="#a78bfa" strokeWidth="2.5" fill="none" />
      <path d="M56 10 L60 10 L62 14 L58 14 Z" fill="#c4b5fd" stroke="#8b5cf6" strokeWidth="0.8" />
      {/* 手臂 */}
      <rect x="12" y="34" width="15" height="22" rx="3" fill="#312e81" stroke="#4338ca" strokeWidth="0.8" opacity="0.85" />
      <rect x="53" y="34" width="15" height="22" rx="3" fill="#312e81" stroke="#4338ca" strokeWidth="0.8" opacity="0.85" />
      {/* 颈 */}
      <rect x="36" y="28" width="8" height="10" rx="2" fill="#c7d2fe" opacity="0.7" />
      {/* 头盔 */}
      <path d="M24 22 Q24 8 40 8 Q56 8 56 22 L54 24 Q46 14 40 14 Q34 14 26 24 Z" fill="#312e81" stroke="#4338ca" strokeWidth="0.8" />
      {/* 头 */}
      <ellipse cx="40" cy="23" rx="14" ry="13" fill="#c7d2fe" opacity="0.75" stroke="#818cf8" strokeWidth="0.8" />
      {/* 眼（鬼火） */}
      <ellipse cx="33.5" cy="22" rx="4" ry="3.5" fill="#1e1b4b" />
      <ellipse cx="46.5" cy="22" rx="4" ry="3.5" fill="#1e1b4b" />
      <ellipse cx="33.5" cy="22" rx="2.5" ry="2.5" fill="#818cf8" />
      <ellipse cx="46.5" cy="22" rx="2.5" ry="2.5" fill="#818cf8" />
      {/* 口（阴森） */}
      <path d="M34 29 Q40 33 46 29" stroke="#6366f1" strokeWidth="0.8" fill="none" />
      {/* 阴气粒子 */}
      <circle cx="16" cy="38" r="1.5" fill="#818cf8" opacity="0.7" />
      <circle cx="12" cy="48" r="2" fill="#6366f1" opacity="0.5" />
    </svg>
  )
}

/* ────────── 骷髅将 ────────── */
function BoneDemonSprite({ size, selected }: { size: number; selected?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
      style={{ filter: selected ? 'drop-shadow(0 0 8px #f87171)' : 'none' }}>
      {/* 身体（骨架） */}
      <rect x="28" y="38" width="24" height="28" rx="2" fill="#1c1917" stroke="#78716c" strokeWidth="1" />
      <path d="M28 44 L52 44 M28 52 L52 52 M28 60 L52 60" stroke="#57534e" strokeWidth="0.6" opacity="0.5" />
      <line x1="40" y1="38" x2="40" y2="66" stroke="#57534e" strokeWidth="0.5" opacity="0.4" />
      {/* 肋骨纹 */}
      <path d="M30 45 Q36 48 30 51" stroke="#78716c" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M50 45 Q44 48 50 51" stroke="#78716c" strokeWidth="1" fill="none" opacity="0.6" />
      {/* 手臂（骨） */}
      <rect x="10" y="36" width="19" height="8" rx="2" fill="#292524" stroke="#78716c" strokeWidth="0.8" />
      <rect x="51" y="36" width="19" height="8" rx="2" fill="#292524" stroke="#78716c" strokeWidth="0.8" />
      <rect x="8" y="42" width="22" height="7" rx="2" fill="#1c1917" stroke="#78716c" strokeWidth="0.8" />
      <rect x="50" y="42" width="22" height="7" rx="2" fill="#1c1917" stroke="#78716c" strokeWidth="0.8" />
      {/* 持武器（骨刃） */}
      <path d="M8 20 L12 22 L10 42" stroke="#e7e5e4" strokeWidth="2.5" fill="none" />
      <path d="M6 20 L8 20 L12 22 L10 18 Z" fill="#f5f5f4" stroke="#a8a29e" strokeWidth="0.8" />
      {/* 腿 */}
      <rect x="30" y="65" width="8" height="13" rx="1" fill="#292524" stroke="#78716c" strokeWidth="0.8" />
      <rect x="42" y="65" width="8" height="13" rx="1" fill="#292524" stroke="#78716c" strokeWidth="0.8" />
      {/* 头颅 */}
      <ellipse cx="40" cy="25" rx="14" ry="15" fill="#292524" stroke="#78716c" strokeWidth="1.2" />
      {/* 眼窝 */}
      <ellipse cx="33" cy="23" rx="6" ry="6.5" fill="#0c0a09" />
      <ellipse cx="47" cy="23" rx="6" ry="6.5" fill="#0c0a09" />
      {/* 鬼火 */}
      <ellipse cx="33" cy="23" rx="3.5" ry="4" fill="#fbbf24" opacity="0.8" />
      <ellipse cx="47" cy="23" rx="3.5" ry="4" fill="#fbbf24" opacity="0.8" />
      <ellipse cx="33" cy="22" rx="1.8" ry="2.5" fill="#fef08a" opacity="0.9" />
      <ellipse cx="47" cy="22" rx="1.8" ry="2.5" fill="#fef08a" opacity="0.9" />
      {/* 鼻腔 */}
      <path d="M37.5 30 L40 35 L42.5 30" stroke="#57534e" strokeWidth="0.8" fill="none" />
      {/* 牙 */}
      <path d="M30 36 L50 36" stroke="#57534e" strokeWidth="1.2" />
      <rect x="33" y="36" width="3" height="5" rx="1" fill="#e7e5e4" />
      <rect x="38" y="36" width="3" height="6" rx="1" fill="#e7e5e4" />
      <rect x="43" y="36" width="3" height="5" rx="1" fill="#e7e5e4" />
    </svg>
  )
}

/* ────────── 天兵 ────────── */
function HeavenSoldierSprite({ size, selected }: { size: number; selected?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
      style={{ filter: selected ? 'drop-shadow(0 0 8px #f87171)' : 'none' }}>
      {/* 金甲光晕 */}
      <ellipse cx="40" cy="40" rx="28" ry="28" fill="#fbbf24" opacity="0.08" />
      {/* 身体（金甲） */}
      <rect x="26" y="38" width="28" height="28" rx="4" fill="#78350f" stroke="#d4af37" strokeWidth="1.5" />
      {/* 甲纹 */}
      <path d="M26 50 L54 50" stroke="#d4af37" strokeWidth="0.7" opacity="0.5" />
      <path d="M26 60 L54 60" stroke="#d4af37" strokeWidth="0.7" opacity="0.5" />
      {/* 胸章 */}
      <path d="M40 42 L42 47 L47 47 L43 50 L44.5 55 L40 52 L35.5 55 L37 50 L33 47 L38 47 Z"
        fill="#fbbf24" opacity="0.9" />
      {/* 腿 */}
      <rect x="29" y="64" width="9" height="14" rx="2" fill="#92400e" stroke="#d4af37" strokeWidth="0.8" />
      <rect x="42" y="64" width="9" height="14" rx="2" fill="#92400e" stroke="#d4af37" strokeWidth="0.8" />
      {/* 手臂 */}
      <rect x="11" y="36" width="16" height="24" rx="4" fill="#78350f" stroke="#d4af37" strokeWidth="1" />
      <rect x="53" y="36" width="16" height="24" rx="4" fill="#78350f" stroke="#d4af37" strokeWidth="1" />
      {/* 天戟 */}
      <line x1="65" y1="6" x2="65" y2="68" stroke="#94a3b8" strokeWidth="3" />
      <path d="M60 12 L65 6 L70 12 L67 18 L65 12 L63 18 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
      <line x1="60" y1="24" x2="70" y2="24" stroke="#94a3b8" strokeWidth="2" />
      {/* 颈 */}
      <rect x="36" y="30" width="8" height="10" rx="2" fill="#fed7aa" />
      {/* 头（金盔） */}
      <path d="M24 22 Q24 8 40 8 Q56 8 56 22 L54 25 Q46 14 40 14 Q34 14 26 25 Z"
        fill="#78350f" stroke="#d4af37" strokeWidth="1" />
      <ellipse cx="40" cy="23" rx="14" ry="13" fill="#fbbf9d" stroke="#d4af37" strokeWidth="0.5" />
      {/* 额饰 */}
      <path d="M36 8 L40 4 L44 8" fill="#fbbf24" stroke="#d4af37" strokeWidth="0.8" />
      <circle cx="40" cy="4" r="2.5" fill="#fbbf24" />
      {/* 眼 */}
      <ellipse cx="34" cy="22" rx="3.5" ry="3" fill="#1c0900" />
      <ellipse cx="46" cy="22" rx="3.5" ry="3" fill="#1c0900" />
      <ellipse cx="34" cy="22" rx="2" ry="2" fill="#fbbf24" />
      <ellipse cx="46" cy="22" rx="2" ry="2" fill="#fbbf24" />
      <circle cx="33.5" cy="21.5" r="0.7" fill="white" />
      <circle cx="45.5" cy="21.5" r="0.7" fill="white" />
      {/* 眉 */}
      <path d="M30 18.5 Q34 17 38 18.5" stroke="#1c0900" strokeWidth="1.8" fill="none" />
      <path d="M42 18.5 Q46 17 50 18.5" stroke="#1c0900" strokeWidth="1.8" fill="none" />
      {/* 嘴 */}
      <path d="M36 29 L44 29" stroke="#805030" strokeWidth="1" />
    </svg>
  )
}

/* ────────── 钟馗（精英） ────────── */
function ZhongKuiSprite({ size, selected }: { size: number; selected?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
      style={{ filter: selected ? 'drop-shadow(0 0 10px #f87171)' : 'none' }}>
      <ellipse cx="40" cy="74" rx="24" ry="6" fill="#1c1917" opacity="0.4" />
      {/* 官袍 */}
      <path d="M22 70 L16 78 L28 76 L34 70 Z" fill="#14532d" stroke="#15803d" strokeWidth="0.8" />
      <path d="M58 70 L64 78 L52 76 L46 70 Z" fill="#14532d" stroke="#15803d" strokeWidth="0.8" />
      <rect x="25" y="40" width="30" height="32" rx="4" fill="#14532d" stroke="#15803d" strokeWidth="1.2" />
      {/* 云纹 */}
      <path d="M32 52 Q36 48 40 52 Q44 56 48 52" stroke="#22c55e" strokeWidth="0.7" fill="none" opacity="0.5" />
      {/* 腰带 */}
      <rect x="25" y="66" width="30" height="6" rx="1" fill="#166534" stroke="#d4af37" strokeWidth="0.8" />
      {/* 宝剑 */}
      <line x1="62" y1="10" x2="62" y2="68" stroke="#e2e8f0" strokeWidth="3" />
      <path d="M58 16 L62 10 L66 16 L64 22 L62 16 L60 22 Z" fill="#f5f5f4" stroke="#94a3b8" strokeWidth="0.8" />
      <line x1="56" y1="42" x2="68" y2="42" stroke="#94a3b8" strokeWidth="2.5" />
      {/* 手臂 */}
      <path d="M25 44 L10 56 L14 65 L28 54 Z" fill="#14532d" stroke="#15803d" strokeWidth="0.8" />
      <path d="M55 44 L70 56 L66 65 L52 54 Z" fill="#14532d" stroke="#15803d" strokeWidth="0.8" />
      {/* 颈 */}
      <rect x="36" y="32" width="8" height="10" rx="2" fill="#fbbf9d" />
      {/* 头（威武） */}
      <ellipse cx="40" cy="22" rx="16" ry="15" fill="#c4a882" stroke="#a08050" strokeWidth="0.8" />
      {/* 官帽 */}
      <rect x="26" y="10" width="28" height="14" rx="3" fill="#14532d" stroke="#15803d" strokeWidth="1" />
      <rect x="30" y="6" width="20" height="6" rx="2" fill="#15803d" stroke="#d4af37" strokeWidth="0.8" />
      <path d="M24 10 L18 12 L26 16 Z" fill="#14532d" stroke="#15803d" strokeWidth="0.5" />
      <path d="M56 10 L62 12 L54 16 Z" fill="#14532d" stroke="#15803d" strokeWidth="0.5" />
      {/* 络腮胡 */}
      <path d="M24 26 Q27 38 34 40" stroke="#1c1917" strokeWidth="3" fill="none" />
      <path d="M56 26 Q53 38 46 40" stroke="#1c1917" strokeWidth="3" fill="none" />
      <path d="M34 40 Q40 42 46 40" stroke="#1c1917" strokeWidth="3" fill="none" />
      {/* 眼（威严） */}
      <ellipse cx="33" cy="22" rx="4" ry="3.5" fill="#1c0900" />
      <ellipse cx="47" cy="22" rx="4" ry="3.5" fill="#1c0900" />
      <ellipse cx="33" cy="22" rx="2.5" ry="2.5" fill="#fbbf24" />
      <ellipse cx="47" cy="22" rx="2.5" ry="2.5" fill="#fbbf24" />
      {/* 眉（剑眉） */}
      <path d="M28 18 Q33 15 38 18" stroke="#1c1917" strokeWidth="2.5" fill="none" />
      <path d="M42 18 Q47 15 52 18" stroke="#1c1917" strokeWidth="2.5" fill="none" />
    </svg>
  )
}

/* ────────── 哪吒（BOSS） ────────── */
function NezhaSprite({ size, selected }: { size: number; selected?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
      style={{ filter: selected ? 'drop-shadow(0 0 14px #f87171)' : 'none' }}>
      <defs>
        <radialGradient id="nezha-aura" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="40" cy="40" rx="35" ry="35" fill="url(#nezha-aura)" />
      {/* 混天绫（红绸） */}
      <path d="M20 40 Q10 22 22 10 Q28 18 24 28 Q22 35 24 42 Z" fill="#ef4444" opacity="0.85" stroke="#b91c1c" strokeWidth="0.8" />
      <path d="M60 40 Q70 22 58 10 Q52 18 56 28 Q58 35 56 42 Z" fill="#ef4444" opacity="0.85" stroke="#b91c1c" strokeWidth="0.8" />
      {/* 身体 */}
      <rect x="28" y="36" width="24" height="28" rx="4" fill="#991b1b" stroke="#dc2626" strokeWidth="1.2" />
      {/* 乾坤圈（腰带） */}
      <rect x="26" y="58" width="28" height="6" rx="3" fill="#fbbf24" stroke="#d4af37" strokeWidth="1" />
      <circle cx="40" cy="61" r="4" fill="#fbbf24" stroke="#d4af37" strokeWidth="1.2" />
      {/* 风火轮（脚下） */}
      <circle cx="32" cy="74" r="6" fill="none" stroke="#f97316" strokeWidth="2" />
      <path d="M29 74 Q32 70 35 74 Q32 78 29 74 Z" fill="#f97316" opacity="0.7" />
      <circle cx="48" cy="74" r="6" fill="none" stroke="#f97316" strokeWidth="2" />
      <path d="M45 74 Q48 70 51 74 Q48 78 45 74 Z" fill="#f97316" opacity="0.7" />
      {/* 腿 */}
      <rect x="30" y="62" width="8" height="14" rx="2" fill="#b91c1c" stroke="#dc2626" strokeWidth="0.8" />
      <rect x="42" y="62" width="8" height="14" rx="2" fill="#b91c1c" stroke="#dc2626" strokeWidth="0.8" />
      {/* 手臂 */}
      <rect x="14" y="34" width="15" height="22" rx="4" fill="#991b1b" stroke="#dc2626" strokeWidth="1" />
      <rect x="51" y="34" width="15" height="22" rx="4" fill="#991b1b" stroke="#dc2626" strokeWidth="1" />
      {/* 火尖枪 */}
      <line x1="62" y1="8" x2="62" y2="62" stroke="#78350f" strokeWidth="2.5" />
      <path d="M57 14 L62 6 L67 14 L64 20 L62 12 L60 20 Z" fill="#f97316" stroke="#ea580c" strokeWidth="0.8" />
      <path d="M57 14 L67 14" stroke="#fbbf24" strokeWidth="1.2" />
      {/* 颈 */}
      <rect x="36" y="28" width="8" height="10" rx="2" fill="#fbbf9d" />
      {/* 头 */}
      <ellipse cx="40" cy="20" rx="14" ry="13" fill="#fbbf9d" stroke="#f59e0b" strokeWidth="0.5" />
      {/* 发髻（3个小丸子） */}
      <circle cx="32" cy="10" r="4" fill="#ef4444" stroke="#dc2626" strokeWidth="1" />
      <circle cx="40" cy="8" r="4" fill="#ef4444" stroke="#dc2626" strokeWidth="1" />
      <circle cx="48" cy="10" r="4" fill="#ef4444" stroke="#dc2626" strokeWidth="1" />
      {/* 眼（无邪神威） */}
      <ellipse cx="34.5" cy="19" rx="3.5" ry="3" fill="#1c0900" />
      <ellipse cx="45.5" cy="19" rx="3.5" ry="3" fill="#1c0900" />
      <ellipse cx="34.5" cy="19" rx="2" ry="2.2" fill="#ef4444" />
      <ellipse cx="45.5" cy="19" rx="2" ry="2.2" fill="#ef4444" />
      <circle cx="34" cy="18.5" r="0.7" fill="white" />
      <circle cx="45" cy="18.5" r="0.7" fill="white" />
      {/* 眉 */}
      <path d="M31 15.5 Q35 14 39 15.5" stroke="#1c0900" strokeWidth="1.5" fill="none" />
      <path d="M41 15.5 Q45 14 49 15.5" stroke="#1c0900" strokeWidth="1.5" fill="none" />
      {/* 嘴（英气） */}
      <path d="M37 25 Q40 27.5 43 25" stroke="#c07050" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

/* ────────── 四海龙王（BOSS） ────────── */
function DragonKingSprite({ size, selected }: { size: number; selected?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
      style={{ filter: selected ? 'drop-shadow(0 0 14px #38bdf8)' : 'none' }}>
      <defs>
        <radialGradient id="dragon-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="40" cy="40" rx="36" ry="36" fill="url(#dragon-aura)" />
      {/* 龙角 */}
      <path d="M28 16 L22 2 L32 14" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
      <path d="M52 16 L58 2 L48 14" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
      {/* 龙鳞披风 */}
      <path d="M22 44 Q10 52 12 68 L24 66 L28 54 Z" fill="#0369a1" stroke="#0ea5e9" strokeWidth="0.8" />
      <path d="M58 44 Q70 52 68 68 L56 66 L52 54 Z" fill="#0369a1" stroke="#0ea5e9" strokeWidth="0.8" />
      {/* 身体 */}
      <rect x="24" y="36" width="32" height="32" rx="5" fill="#075985" stroke="#0ea5e9" strokeWidth="1.5" />
      {/* 龙鳞纹路 */}
      <path d="M28 42 Q34 46 28 50" stroke="#38bdf8" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M52 42 Q46 46 52 50" stroke="#38bdf8" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M28 52 Q34 56 28 60" stroke="#38bdf8" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M52 52 Q46 56 52 60" stroke="#38bdf8" strokeWidth="1" fill="none" opacity="0.4" />
      {/* 胸口龙珠 */}
      <circle cx="40" cy="54" r="8" fill="#0ea5e9" opacity="0.3" stroke="#38bdf8" strokeWidth="1" />
      <circle cx="40" cy="54" r="4" fill="#7dd3fc" opacity="0.8" />
      <circle cx="38.5" cy="52.5" r="1.5" fill="white" opacity="0.9" />
      {/* 腿 */}
      <rect x="27" y="66" width="10" height="12" rx="3" fill="#0369a1" stroke="#0ea5e9" strokeWidth="0.8" />
      <rect x="43" y="66" width="10" height="12" rx="3" fill="#0369a1" stroke="#0ea5e9" strokeWidth="0.8" />
      {/* 手臂 */}
      <rect x="10" y="34" width="15" height="24" rx="4" fill="#075985" stroke="#0ea5e9" strokeWidth="1" />
      <rect x="55" y="34" width="15" height="24" rx="4" fill="#075985" stroke="#0ea5e9" strokeWidth="1" />
      {/* 龙爪 */}
      <path d="M10 54 L4 52 L8 60 M10 54 L3 56 L8 63" stroke="#38bdf8" strokeWidth="1.2" fill="none" />
      <path d="M70 54 L76 52 L72 60 M70 54 L77 56 L72 63" stroke="#38bdf8" strokeWidth="1.2" fill="none" />
      {/* 颈 */}
      <rect x="36" y="28" width="8" height="10" rx="2" fill="#7dd3fc" opacity="0.8" />
      {/* 头 */}
      <ellipse cx="40" cy="20" rx="16" ry="15" fill="#0369a1" stroke="#0ea5e9" strokeWidth="1.2" />
      {/* 须 */}
      <path d="M26 24 Q18 28 16 36" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
      <path d="M54 24 Q62 28 64 36" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
      {/* 眼（龙目） */}
      <ellipse cx="33" cy="20" rx="5" ry="4.5" fill="#082f49" />
      <ellipse cx="47" cy="20" rx="5" ry="4.5" fill="#082f49" />
      <ellipse cx="33" cy="20" rx="3" ry="3.5" fill="#fbbf24" />
      <ellipse cx="47" cy="20" rx="3" ry="3.5" fill="#fbbf24" />
      <ellipse cx="33" cy="20.5" rx="1.5" ry="2.5" fill="#1c0900" />
      <ellipse cx="47" cy="20.5" rx="1.5" ry="2.5" fill="#1c0900" />
      {/* 鼻/嘴 */}
      <path d="M38 27 Q40 30 42 27" stroke="#0ea5e9" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

/* ────────── 玉皇大帝（最终BOSS） ────────── */
function JadeEmperorSprite({ size, selected }: { size: number; selected?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
      style={{ filter: selected ? 'drop-shadow(0 0 16px #fbbf24)' : 'none' }}>
      <defs>
        <radialGradient id="jade-aura" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="40" cy="40" rx="36" ry="36" fill="url(#jade-aura)" />
      {/* 光芒 */}
      {[0,30,60,90,120,150,210,240,270,300,330].map((deg, i) => (
        <line key={i}
          x1={40 + 20 * Math.cos(deg * Math.PI / 180)}
          y1={40 + 20 * Math.sin(deg * Math.PI / 180)}
          x2={40 + 38 * Math.cos(deg * Math.PI / 180)}
          y2={40 + 38 * Math.sin(deg * Math.PI / 180)}
          stroke="#fbbf24" strokeWidth="1" opacity="0.35" />
      ))}
      {/* 龙袍 */}
      <path d="M22 70 L14 80 L30 78 L36 68 Z" fill="#7c2d12" stroke="#d4af37" strokeWidth="0.8" />
      <path d="M58 70 L66 80 L50 78 L44 68 Z" fill="#7c2d12" stroke="#d4af37" strokeWidth="0.8" />
      <rect x="24" y="38" width="32" height="32" rx="5" fill="#7c2d12" stroke="#d4af37" strokeWidth="1.5" />
      {/* 龙纹 */}
      <path d="M28 46 Q34 42 40 46 Q46 50 52 46" stroke="#fbbf24" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M28 56 Q34 52 40 56 Q46 60 52 56" stroke="#fbbf24" strokeWidth="0.8" fill="none" opacity="0.5" />
      {/* 玉带 */}
      <rect x="23" y="64" width="34" height="7" rx="2" fill="#d4af37" stroke="#fbbf24" strokeWidth="1" />
      {/* 腿 */}
      <rect x="28" y="69" width="9" height="11" rx="2" fill="#92400e" stroke="#d4af37" strokeWidth="0.8" />
      <rect x="43" y="69" width="9" height="11" rx="2" fill="#92400e" stroke="#d4af37" strokeWidth="0.8" />
      {/* 手臂 */}
      <path d="M24 42 L8 54 L12 64 L28 52 Z" fill="#7c2d12" stroke="#d4af37" strokeWidth="0.8" />
      <path d="M56 42 L72 54 L68 64 L52 52 Z" fill="#7c2d12" stroke="#d4af37" strokeWidth="0.8" />
      {/* 玉圭（手持） */}
      <rect x="6" y="44" width="8" height="22" rx="2" fill="#a7f3d0" stroke="#34d399" strokeWidth="0.8" />
      <path d="M6 44 L10 38 L14 44 Z" fill="#6ee7b7" stroke="#34d399" strokeWidth="0.8" />
      {/* 颈 */}
      <rect x="36" y="30" width="8" height="10" rx="2" fill="#fed7aa" />
      {/* 头 */}
      <ellipse cx="40" cy="20" rx="14" ry="14" fill="#fde68a" stroke="#d4af37" strokeWidth="0.5" />
      {/* 皇冠 */}
      <rect x="26" y="8" width="28" height="12" rx="2" fill="#92400e" stroke="#d4af37" strokeWidth="1.2" />
      <rect x="30" y="4" width="20" height="6" rx="1" fill="#d4af37" stroke="#fbbf24" strokeWidth="0.8" />
      <path d="M30 4 L32 0 L34 4" fill="#fbbf24" />
      <path d="M38 4 L40 0 L42 4" fill="#fbbf24" />
      <path d="M46 4 L48 0 L50 4" fill="#fbbf24" />
      <circle cx="32" cy="0" r="1.5" fill="#fbbf24" />
      <circle cx="40" cy="0" r="1.5" fill="#fbbf24" />
      <circle cx="48" cy="0" r="1.5" fill="#fbbf24" />
      {/* 眼（威严） */}
      <ellipse cx="33.5" cy="20" rx="4" ry="3.5" fill="#1c0900" />
      <ellipse cx="46.5" cy="20" rx="4" ry="3.5" fill="#1c0900" />
      <ellipse cx="33.5" cy="20" rx="2.5" ry="2.5" fill="#fbbf24" />
      <ellipse cx="46.5" cy="20" rx="2.5" ry="2.5" fill="#fbbf24" />
      <circle cx="33" cy="19.5" r="1" fill="white" />
      <circle cx="46" cy="19.5" r="1" fill="white" />
      {/* 眉 */}
      <path d="M29 16.5 Q33.5 14.5 38 16.5" stroke="#1c0900" strokeWidth="1.8" fill="none" />
      <path d="M42 16.5 Q46.5 14.5 51 16.5" stroke="#1c0900" strokeWidth="1.8" fill="none" />
      {/* 胡须 */}
      <path d="M34 28 Q32 34 30 40" stroke="#d4b896" strokeWidth="1.2" fill="none" />
      <path d="M37 28 Q36 34 35 40" stroke="#d4b896" strokeWidth="1" fill="none" opacity="0.8" />
      <path d="M43 28 Q44 34 45 40" stroke="#d4b896" strokeWidth="1" fill="none" opacity="0.8" />
      <path d="M46 28 Q48 34 50 40" stroke="#d4b896" strokeWidth="1.2" fill="none" />
      {/* 嘴（庄严） */}
      <path d="M37 26 L43 26" stroke="#805030" strokeWidth="1.2" />
    </svg>
  )
}

/* ────────── 孙悟空（精英） ────────── */
function WukongSprite({ size, selected }: { size: number; selected?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
      style={{ filter: selected ? 'drop-shadow(0 0 10px #f87171)' : 'none' }}>
      {/* 金箍棒 */}
      <rect x="58" y="8" width="5" height="64" rx="2" fill="#fbbf24" stroke="#d4af37" strokeWidth="0.8" />
      <rect x="54" y="8" width="13" height="8" rx="2" fill="#f97316" stroke="#d4af37" strokeWidth="0.8" />
      <rect x="54" y="64" width="13" height="8" rx="2" fill="#f97316" stroke="#d4af37" strokeWidth="0.8" />
      {/* 身体（蟠桃红） */}
      <ellipse cx="37" cy="54" rx="16" ry="16" fill="#7c3aed" stroke="#6d28d9" strokeWidth="1.2" />
      {/* 虎皮裙 */}
      <ellipse cx="37" cy="62" rx="12" ry="9" fill="#92400e" stroke="#d4af37" strokeWidth="1" />
      <path d="M28 58 Q30 62 32 60 Q34 64 36 61 Q38 65 40 62 Q42 64 44 61 Q46 62 48 58" stroke="#d4af37" strokeWidth="0.7" fill="none" opacity="0.5" />
      {/* 腿 */}
      <rect x="29" y="68" width="7" height="10" rx="3" fill="#78350f" />
      <rect x="39" y="68" width="7" height="10" rx="3" fill="#78350f" />
      {/* 手臂 */}
      <rect x="18" y="44" width="12" height="20" rx="4" fill="#7c3aed" stroke="#6d28d9" strokeWidth="0.8" />
      <rect x="47" y="44" width="12" height="20" rx="4" fill="#7c3aed" stroke="#6d28d9" strokeWidth="0.8" />
      {/* 颈 */}
      <rect x="33" y="34" width="8" height="10" rx="2" fill="#d4a574" />
      {/* 头（猴脸） */}
      <ellipse cx="37" cy="25" rx="14" ry="14" fill="#d4a574" stroke="#b8864e" strokeWidth="0.8" />
      {/* 金箍 */}
      <rect x="24" y="18" width="26" height="5" rx="2" fill="#fbbf24" stroke="#d4af37" strokeWidth="0.8" />
      {/* 猴脸白毛 */}
      <ellipse cx="37" cy="29" rx="9" ry="8" fill="#fde68a" opacity="0.6" />
      {/* 耳 */}
      <ellipse cx="23" cy="22" rx="4" ry="5" fill="#d4a574" stroke="#b8864e" strokeWidth="0.8" />
      <ellipse cx="51" cy="22" rx="4" ry="5" fill="#d4a574" stroke="#b8864e" strokeWidth="0.8" />
      <ellipse cx="23" cy="22" rx="2" ry="3" fill="#fda4af" opacity="0.6" />
      <ellipse cx="51" cy="22" rx="2" ry="3" fill="#fda4af" opacity="0.6" />
      {/* 眼 */}
      <ellipse cx="31.5" cy="22" rx="3.5" ry="3" fill="#1c0900" />
      <ellipse cx="42.5" cy="22" rx="3.5" ry="3" fill="#1c0900" />
      <ellipse cx="31.5" cy="22" rx="2" ry="2" fill="#fbbf24" />
      <ellipse cx="42.5" cy="22" rx="2" ry="2" fill="#fbbf24" />
      <circle cx="31" cy="21.5" r="0.8" fill="white" />
      <circle cx="42" cy="21.5" r="0.8" fill="white" />
      {/* 鼻/嘴 */}
      <ellipse cx="37" cy="27" rx="3" ry="2.5" fill="#c4906e" />
      <path d="M35 30 Q37 33 39 30" stroke="#b8864e" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

/* ────────── 通用骷髅（兜底） ────────── */
function DefaultSprite({ size, selected }: { size: number; selected?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
      style={{ filter: selected ? 'drop-shadow(0 0 8px #f87171)' : 'none' }}>
      <ellipse cx="40" cy="74" rx="20" ry="5" fill="#1a0a00" opacity="0.4" />
      <rect x="26" y="36" width="28" height="28" rx="3" fill="#292524" stroke="#78716c" strokeWidth="1" />
      <rect x="10" y="34" width="18" height="8" rx="2" fill="#292524" stroke="#78716c" strokeWidth="0.7" />
      <rect x="52" y="34" width="18" height="8" rx="2" fill="#292524" stroke="#78716c" strokeWidth="0.7" />
      <rect x="30" y="62" width="8" height="14" rx="2" fill="#292524" stroke="#78716c" strokeWidth="0.7" />
      <rect x="42" y="62" width="8" height="14" rx="2" fill="#292524" stroke="#78716c" strokeWidth="0.7" />
      <ellipse cx="40" cy="22" rx="14" ry="15" fill="#292524" stroke="#78716c" strokeWidth="1.2" />
      <ellipse cx="33" cy="20" rx="5.5" ry="6" fill="#0c0a09" />
      <ellipse cx="47" cy="20" rx="5.5" ry="6" fill="#0c0a09" />
      <ellipse cx="33" cy="20" rx="3" ry="3.5" fill="#ef4444" opacity="0.85" />
      <ellipse cx="47" cy="20" rx="3" ry="3.5" fill="#ef4444" opacity="0.85" />
      <path d="M30 32 L50 32" stroke="#57534e" strokeWidth="1.5" />
      <path d="M35 32 L34 38 L37 32" fill="#e7e5e4" />
      <path d="M43 32 L44 38 L47 32" fill="#e7e5e4" />
    </svg>
  )
}

const SPRITE_MAP: Record<string, (p: { size: number; selected?: boolean }) => React.ReactElement> = {
  shansao: ShansaoSprite,
  fox_spirit: FoxSprite,
  yaksha: YakshaSprite,
  white_snake: WhiteSnakeSprite,
  hell_soldier: HellSoldierSprite,
  bone_demon: BoneDemonSprite,
  heaven_soldier: HeavenSoldierSprite,
  zhong_kui: ZhongKuiSprite,
  sun_wukong_early: WukongSprite,
  nezha: NezhaSprite,
  dragon_king: DragonKingSprite,
  jade_emperor: JadeEmperorSprite,
}

export function EnemySprite({ defId, isBoss, size = 80, selected }: EnemySpriteProps) {
  if (isBoss) {
    // BOSS 用专属精绘
    const BossComp = SPRITE_MAP[defId]
    if (BossComp) return <BossComp size={size} selected={selected} />
  }
  const SpriteComp = SPRITE_MAP[defId]
  if (SpriteComp) return <SpriteComp size={size} selected={selected} />
  return <DefaultSprite size={size} selected={selected} />
}

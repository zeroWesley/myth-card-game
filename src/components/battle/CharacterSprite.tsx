/**
 * 国风像素风角色立绘 —— SVG 绘制
 * 三个角色：紫薇剑客、天机谋士、天同福道
 */

interface SpriteProps {
  characterId: string
  size?: number
  glowing?: boolean
}

/** 紫薇剑客 —— 星紫色，持剑，星纹铠甲 */
function ZiweiSprite({ size = 80, glowing }: { size?: number; glowing?: boolean }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 80 112" fill="none">
      <defs>
        <radialGradient id="ziwei-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>
      {glowing && <ellipse cx="40" cy="100" rx="28" ry="8" fill="url(#ziwei-glow)" />}
      {/* 身体光晕 */}
      {glowing && <ellipse cx="40" cy="56" rx="22" ry="32" fill="#8b5cf611" />}

      {/* 披风 */}
      <path d="M28 48 L18 95 Q22 98 28 96 L34 70 Z" fill="#4c1d95" stroke="#7c3aed" strokeWidth="0.8" />
      <path d="M52 48 L62 95 Q58 98 52 96 L46 70 Z" fill="#4c1d95" stroke="#7c3aed" strokeWidth="0.8" />

      {/* 腿部 */}
      <rect x="32" y="80" width="7" height="24" rx="2" fill="#2d1b69" stroke="#5b21b6" strokeWidth="0.7" />
      <rect x="41" y="80" width="7" height="24" rx="2" fill="#2d1b69" stroke="#5b21b6" strokeWidth="0.7" />
      {/* 靴子 */}
      <rect x="30" y="100" width="11" height="7" rx="2" fill="#1e1b4b" />
      <rect x="39" y="100" width="11" height="7" rx="2" fill="#1e1b4b" />

      {/* 腰带 */}
      <rect x="28" y="76" width="24" height="5" rx="1" fill="#7c3aed" />
      <rect x="37" y="74" width="6" height="9" rx="1" fill="#c4b5fd" stroke="#8b5cf6" strokeWidth="0.5" />

      {/* 身体 —— 铠甲 */}
      <rect x="28" y="44" width="24" height="35" rx="3" fill="#3730a3" stroke="#6d28d9" strokeWidth="1" />
      {/* 铠甲纹路 */}
      <path d="M36 48 L40 52 L44 48" stroke="#c4b5fd" strokeWidth="0.8" fill="none" opacity="0.7" />
      <line x1="28" y1="56" x2="52" y2="56" stroke="#5b21b6" strokeWidth="0.5" opacity="0.5" />
      <line x1="28" y1="64" x2="52" y2="64" stroke="#5b21b6" strokeWidth="0.5" opacity="0.5" />
      {/* 胸口星纹 */}
      <path d="M40 54 L41.5 57.5 L45 57.5 L42.3 59.7 L43.5 63 L40 61 L36.5 63 L37.7 59.7 L35 57.5 L38.5 57.5 Z"
        fill="#c4b5fd" opacity="0.8" />

      {/* 左臂 */}
      <rect x="21" y="44" width="8" height="22" rx="3" fill="#3730a3" stroke="#6d28d9" strokeWidth="0.8" />
      {/* 右臂(持剑) */}
      <rect x="51" y="44" width="8" height="22" rx="3" fill="#3730a3" stroke="#6d28d9" strokeWidth="0.8" />

      {/* 剑 */}
      <line x1="63" y1="20" x2="63" y2="72" stroke="#e2e8f0" strokeWidth="2" />
      <line x1="58" y1="50" x2="68" y2="50" stroke="#94a3b8" strokeWidth="2.5" />
      <path d="M61 20 L63 10 L65 20 Z" fill="#c4b5fd" />
      {/* 剑上星光 */}
      <circle cx="63" cy="30" r="1.5" fill="#c4b5fd" opacity="0.9" />
      <circle cx="63" cy="40" r="1" fill="#a78bfa" opacity="0.7" />

      {/* 颈部 */}
      <rect x="36" y="36" width="8" height="10" rx="2" fill="#fbbf9d" />

      {/* 头部 */}
      <ellipse cx="40" cy="26" rx="12" ry="13" fill="#fbbf9d" stroke="#f59e0b" strokeWidth="0.5" />
      {/* 头发 */}
      <path d="M28 22 Q28 10 40 10 Q52 10 52 22 L50 28 Q44 18 40 18 Q36 18 30 28 Z" fill="#1e1b4b" />
      {/* 发冠 */}
      <rect x="36" y="8" width="8" height="5" rx="1" fill="#7c3aed" />
      <path d="M37 8 L40 3 L43 8" fill="#c4b5fd" />
      {/* 眼睛 */}
      <ellipse cx="35.5" cy="25" rx="2.5" ry="2" fill="#1e1b4b" />
      <ellipse cx="44.5" cy="25" rx="2.5" ry="2" fill="#1e1b4b" />
      <circle cx="36" cy="24.5" r="0.8" fill="white" />
      <circle cx="45" cy="24.5" r="0.8" fill="white" />
      {/* 眉毛 */}
      <path d="M33 22.5 Q35.5 21 38 22.5" stroke="#1e1b4b" strokeWidth="1.2" fill="none" />
      <path d="M42 22.5 Q44.5 21 47 22.5" stroke="#1e1b4b" strokeWidth="1.2" fill="none" />
      {/* 嘴巴 */}
      <path d="M38 30 Q40 32 42 30" stroke="#c07050" strokeWidth="0.8" fill="none" />

      {/* 星光粒子 */}
      <circle cx="20" cy="35" r="1.2" fill="#c4b5fd" opacity="0.8" />
      <circle cx="15" cy="50" r="0.8" fill="#a78bfa" opacity="0.6" />
      <circle cx="65" cy="35" r="1" fill="#c4b5fd" opacity="0.7" />
    </svg>
  )
}

/** 天机谋士 —— 青蓝色，持羽扇，道袍 */
function TianjiSprite({ size = 80, glowing }: { size?: number; glowing?: boolean }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 80 112" fill="none">
      <defs>
        <radialGradient id="tianji-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </radialGradient>
      </defs>
      {glowing && <ellipse cx="40" cy="100" rx="28" ry="8" fill="url(#tianji-glow)" />}
      {glowing && <ellipse cx="40" cy="56" rx="22" ry="32" fill="#06b6d411" />}

      {/* 道袍下摆 */}
      <path d="M26 75 L16 108 Q20 110 28 108 L36 82 Z" fill="#0e7490" stroke="#06b6d4" strokeWidth="0.8" />
      <path d="M54 75 L64 108 Q60 110 52 108 L44 82 Z" fill="#0e7490" stroke="#06b6d4" strokeWidth="0.8" />
      <path d="M30 75 L28 108 L52 108 L50 75 Z" fill="#164e63" stroke="#0e7490" strokeWidth="0.5" />

      {/* 腰带玉佩 */}
      <rect x="28" y="74" width="24" height="5" rx="1" fill="#0e7490" />
      <ellipse cx="40" cy="80" rx="5" ry="7" fill="#67e8f9" stroke="#06b6d4" strokeWidth="0.8" opacity="0.9" />
      <ellipse cx="40" cy="80" rx="2.5" ry="4" fill="#cffafe" opacity="0.6" />

      {/* 身体 —— 道袍 */}
      <rect x="27" y="43" width="26" height="34" rx="4" fill="#155e75" stroke="#0e7490" strokeWidth="1" />
      {/* 道袍纹路 */}
      <path d="M40 45 L40 76" stroke="#06b6d4" strokeWidth="0.5" opacity="0.4" />
      <path d="M34 43 L30 76" stroke="#0e7490" strokeWidth="0.4" opacity="0.3" />
      <path d="M46 43 L50 76" stroke="#0e7490" strokeWidth="0.4" opacity="0.3" />
      {/* 八卦符文 */}
      <circle cx="40" cy="58" r="8" stroke="#67e8f9" strokeWidth="0.6" fill="none" opacity="0.6" />
      <path d="M40 50 L40 66 M33 54 L47 62 M33 62 L47 54" stroke="#67e8f9" strokeWidth="0.5" opacity="0.5" />

      {/* 袖子 */}
      <path d="M27 43 L15 58 L18 65 L30 55 Z" fill="#155e75" stroke="#0e7490" strokeWidth="0.8" />
      <path d="M53 43 L65 58 L62 65 L50 55 Z" fill="#155e75" stroke="#0e7490" strokeWidth="0.8" />

      {/* 羽扇 */}
      <path d="M62 30 Q75 25 72 40 Q68 50 62 48" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="0.8" opacity="0.9" />
      <path d="M62 30 Q70 28 69 38 Q67 45 62 44" fill="#bae6fd" stroke="#38bdf8" strokeWidth="0.5" />
      <path d="M62 48 L62 60" stroke="#92400e" strokeWidth="1.5" />
      {/* 扇骨 */}
      <line x1="62" y1="48" x2="75" y2="25" stroke="#7dd3fc" strokeWidth="0.5" opacity="0.6" />
      <line x1="62" y1="48" x2="73" y2="30" stroke="#7dd3fc" strokeWidth="0.5" opacity="0.6" />
      <line x1="62" y1="48" x2="70" y2="35" stroke="#7dd3fc" strokeWidth="0.5" opacity="0.6" />

      {/* 颈部 */}
      <rect x="36" y="35" width="8" height="10" rx="2" fill="#fed7aa" />

      {/* 头 */}
      <ellipse cx="40" cy="24" rx="12" ry="13" fill="#fed7aa" stroke="#fbbf24" strokeWidth="0.5" />
      {/* 头发 */}
      <path d="M28 20 Q28 8 40 8 Q52 8 52 20 L50 26 Q44 16 40 16 Q36 16 30 26 Z" fill="#0c4a6e" />
      {/* 发髻 */}
      <path d="M36 8 Q38 2 40 6 Q42 2 44 8" stroke="#06b6d4" strokeWidth="1.5" fill="#0c4a6e" />
      <circle cx="40" cy="6" r="2.5" fill="#67e8f9" stroke="#0891b2" strokeWidth="0.8" />
      {/* 胡须（飘逸感） */}
      <path d="M36 32 Q35 36 34 40" stroke="#d4b896" strokeWidth="0.8" fill="none" opacity="0.7" />
      <path d="M38 33 Q38 37 37 41" stroke="#d4b896" strokeWidth="0.7" fill="none" opacity="0.6" />
      <path d="M44 32 Q45 36 46 40" stroke="#d4b896" strokeWidth="0.8" fill="none" opacity="0.7" />
      {/* 眼睛（睿智微眯） */}
      <path d="M33 23 Q35.5 21 38 23" stroke="#0c4a6e" strokeWidth="1.5" fill="none" />
      <path d="M42 23 Q44.5 21 47 23" stroke="#0c4a6e" strokeWidth="1.5" fill="none" />
      {/* 眉毛 */}
      <path d="M32 20.5 Q35.5 19 38.5 20.5" stroke="#0c4a6e" strokeWidth="1.2" fill="none" />
      <path d="M41.5 20.5 Q44.5 19 48 20.5" stroke="#0c4a6e" strokeWidth="1.2" fill="none" />
      {/* 微笑 */}
      <path d="M37 29 Q40 31.5 43 29" stroke="#c07050" strokeWidth="0.8" fill="none" />

      {/* 水流粒子 */}
      <circle cx="18" cy="42" r="1" fill="#67e8f9" opacity="0.8" />
      <circle cx="14" cy="52" r="1.5" fill="#38bdf8" opacity="0.6" />
    </svg>
  )
}

/** 天同福道 —— 翠绿色，持禅杖，禅袍 */
function TiantongSprite({ size = 80, glowing }: { size?: number; glowing?: boolean }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 80 112" fill="none">
      <defs>
        <radialGradient id="tiantong-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
      </defs>
      {glowing && <ellipse cx="40" cy="100" rx="28" ry="8" fill="url(#tiantong-glow)" />}
      {glowing && <ellipse cx="40" cy="56" rx="24" ry="34" fill="#10b98111" />}

      {/* 禅袍（宽大） */}
      <path d="M24 75 L12 110 Q17 112 26 110 L34 82 Z" fill="#065f46" stroke="#10b981" strokeWidth="0.8" />
      <path d="M56 75 L68 110 Q63 112 54 110 L46 82 Z" fill="#065f46" stroke="#10b981" strokeWidth="0.8" />
      <path d="M28 75 L26 110 L54 110 L52 75 Z" fill="#064e3b" stroke="#065f46" strokeWidth="0.5" />
      {/* 袍子边缘金边 */}
      <path d="M28 75 L26 110" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
      <path d="M52 75 L54 110" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />

      {/* 腰带 */}
      <rect x="26" y="73" width="28" height="6" rx="2" fill="#047857" stroke="#10b981" strokeWidth="0.8" />
      {/* 腰间法器 */}
      <circle cx="40" cy="76" r="4" fill="#34d399" stroke="#10b981" strokeWidth="1" />
      <path d="M38 76 L42 76 M40 74 L40 78" stroke="#064e3b" strokeWidth="1.2" />

      {/* 身体 */}
      <rect x="25" y="42" width="30" height="34" rx="5" fill="#065f46" stroke="#047857" strokeWidth="1" />
      {/* 禅袍纹路 */}
      <path d="M40 44 L40 75" stroke="#10b981" strokeWidth="0.5" opacity="0.35" />
      {/* 领口 */}
      <path d="M36 42 L40 48 L44 42" stroke="#10b981" strokeWidth="1" fill="none" opacity="0.8" />
      {/* 莲花纹 */}
      <circle cx="40" cy="60" r="7" stroke="#34d399" strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M40 53 Q44 57 40 67 Q36 57 40 53 Z" fill="#34d399" opacity="0.2" />
      <path d="M33 57 Q40 53 47 57 Q40 64 33 57 Z" fill="#34d399" opacity="0.2" />

      {/* 宽袖 */}
      <path d="M25 42 L10 60 L14 68 L28 54 Z" fill="#065f46" stroke="#047857" strokeWidth="0.8" />
      <path d="M55 42 L70 60 L66 68 L52 54 Z" fill="#065f46" stroke="#047857" strokeWidth="0.8" />

      {/* 禅杖 */}
      <line x1="14" y1="15" x2="14" y2="80" stroke="#92400e" strokeWidth="2.5" />
      {/* 杖头环形 */}
      <circle cx="14" cy="20" r="7" fill="none" stroke="#d4af37" strokeWidth="2" />
      <circle cx="14" cy="20" r="4" fill="none" stroke="#fbbf24" strokeWidth="1" />
      <circle cx="14" cy="13" r="3" fill="#fbbf24" stroke="#d4af37" strokeWidth="1" />
      {/* 杖头铃铛 */}
      <ellipse cx="8" cy="18" rx="2.5" ry="3" fill="#fbbf24" stroke="#d4af37" strokeWidth="0.8" />
      <ellipse cx="20" cy="18" rx="2.5" ry="3" fill="#fbbf24" stroke="#d4af37" strokeWidth="0.8" />

      {/* 颈部 */}
      <rect x="36" y="34" width="8" height="10" rx="2" fill="#fed7aa" />

      {/* 头（圆润慈祥） */}
      <ellipse cx="40" cy="23" rx="14" ry="14" fill="#fed7aa" stroke="#fbbf24" strokeWidth="0.5" />
      {/* 头发（短发） */}
      <path d="M26 19 Q26 9 40 9 Q54 9 54 19 L52 22 Q46 12 40 12 Q34 12 28 22 Z" fill="#1c1917" />
      {/* 发饰 */}
      <rect x="37" y="8" width="6" height="4" rx="1" fill="#047857" />
      <circle cx="40" cy="7" r="2" fill="#34d399" />
      {/* 慈眉善目 */}
      <path d="M33 22 Q36 20 39 22" stroke="#1c1917" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M41 22 Q44 20 47 22" stroke="#1c1917" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* 眉 */}
      <path d="M32 19 Q35.5 17.5 39 19" stroke="#1c1917" strokeWidth="1.2" fill="none" />
      <path d="M41 19 Q44.5 17.5 48 19" stroke="#1c1917" strokeWidth="1.2" fill="none" />
      {/* 慈祥微笑 */}
      <path d="M36 29 Q40 33 44 29" stroke="#c07050" strokeWidth="1" fill="none" />
      {/* 笑纹 */}
      <path d="M33 27 Q31 30 33 33" stroke="#c07050" strokeWidth="0.6" fill="none" opacity="0.6" />
      <path d="M47 27 Q49 30 47 33" stroke="#c07050" strokeWidth="0.6" fill="none" opacity="0.6" />

      {/* 光环 */}
      {glowing && <circle cx="40" cy="23" r="18" fill="none" stroke="#34d399" strokeWidth="1" opacity="0.4" strokeDasharray="3 4" />}
    </svg>
  )
}

export function CharacterSprite({ characterId, size = 80, glowing = false }: SpriteProps) {
  if (characterId === 'ziwei') return <ZiweiSprite size={size} glowing={glowing} />
  if (characterId === 'tianji') return <TianjiSprite size={size} glowing={glowing} />
  if (characterId === 'tiantong') return <TiantongSprite size={size} glowing={glowing} />
  return null
}

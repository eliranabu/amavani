import Image from "next/image";
import type { Shape, Tone } from "@/lib/types";

/**
 * תמונת מוצר/קטגוריה.
 * כשיש src אמיתי – מוצגת תמונה רספונסיבית (next/image, WebP/AVIF, lazy).
 * בלי src – placeholder מופשט בגווני הפלטה, כדי לא להשתמש בתמונות ללא זכויות.
 */
interface Props {
  tone: Tone;
  shape: Shape;
  src?: string;
  alt: string;
  variant?: number;
  label?: string;
  /** תמונה שנייה שמוצגת במעבר עכבר (כרטיס מוצר) */
  hoverSrc?: string;
  priority?: boolean;
  sizes?: string;
}

export function ProductImage({ tone, shape, src, alt, variant = 0, label, priority, sizes, hoverSrc }: Props) {
  const bg = `var(--tone-${tone})`;
  const ink = `var(--tone-${tone}-ink)`;

  if (src) {
    return (
      <div className="ph" style={{ ["--ph-bg" as string]: bg }}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes ?? "(min-width:1024px) 25vw, 50vw"} style={{ objectFit: "cover" }} />
        {hoverSrc && (
          <div className="ph__alt" aria-hidden="true">
            <Image src={hoverSrc} alt="" fill sizes={sizes ?? "(min-width:1024px) 25vw, 50vw"} style={{ objectFit: "cover" }} />
          </div>
        )}
      </div>
    );
  }

  // תזוזה קלה בין "תמונות" שונות בגלריה
  const dx = [0, -18, 14, -8][variant % 4];
  const dy = [0, 10, -12, 6][variant % 4];
  const s = [1, 0.82, 1.12, 0.95][variant % 4];

  return (
    <div className="ph" style={{ ["--ph-bg" as string]: bg }} role="img" aria-label={alt}>
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="500" fill={bg} />
        {/* "משטח" – רצפה/שולחן רך */}
        <rect y="360" width="400" height="140" fill="#fff" opacity="0.28" />
        <g transform={`translate(${200 + dx} ${255 + dy}) scale(${s})`}>
          <ShapeArt kind={shape} ink={ink} />
        </g>
        {/* צל רך */}
        <ellipse cx={200 + dx} cy={372} rx={80 * s} ry={10} fill="#292B28" opacity="0.06" />
      </svg>
      {label && <span className="ph__label">{label}</span>}
    </div>
  );
}

function ShapeArt({ kind, ink }: { kind: Shape; ink: string }) {
  const soft = "#ffffff";
  switch (kind) {
    case "arch":
      return (<g><path d="M-80 115 V-20 a80 80 0 0 1 160 0 V115 Z" fill={ink} /><circle cx="95" cy="85" r="30" fill={soft} opacity="0.65" /></g>);
    case "circle":
      return (<g><circle r="92" cy="20" fill={ink} /><circle r="40" cx="-70" cy="85" fill={soft} opacity="0.7" /></g>);
    case "pill":
      return (<g><rect x="-60" y="-110" width="120" height="225" rx="60" fill={ink} /><rect x="45" y="20" width="60" height="95" rx="30" fill={soft} opacity="0.65" /></g>);
    case "wave":
      return (<g><path d="M-120 115 C-120 0 -40 -40 0 -20 C40 0 120 -40 120 40 V115 Z" fill={ink} /><circle cx="-60" cy="-60" r="26" fill={soft} opacity="0.7" /></g>);
    case "drop":
      return (<g><path d="M0 -120 C55 -40 85 10 85 45 a85 85 0 0 1 -170 0 C-85 10 -55 -40 0 -120Z" fill={ink} /><rect x="55" y="70" width="70" height="45" rx="10" fill={soft} opacity="0.65" /></g>);
    case "stack":
      return (<g><rect x="-95" y="35" width="190" height="80" rx="10" fill={ink} /><rect x="-70" y="-35" width="140" height="70" rx="10" fill={ink} opacity="0.75" /><rect x="-40" y="-90" width="80" height="55" rx="10" fill={soft} opacity="0.7" /></g>);
  }
}

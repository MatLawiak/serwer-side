// Na podstawie Motion-Primitives `border-trail` (MIT, github.com/ibelick/motion-primitives).
// Zmiany: kolor z tokenu marki zamiast bg-zinc-500, ruch wyłączony przy
// prefers-reduced-motion (ramka zostaje, światło stoi).
import { MotionConfig, motion, type Transition } from 'motion/react';
import type { CSSProperties } from 'react';
import { cn } from '../../lib/utils';

export function BorderTrail({
  className,
  size = 80,
  transition,
  style,
}: {
  className?: string;
  size?: number;
  transition?: Transition;
  style?: CSSProperties;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
        <motion.div
          className={cn('absolute aspect-square bg-accent', className)}
          style={{ width: size, offsetPath: `rect(0 auto auto 0 round ${size}px)`, ...style }}
          animate={{ offsetDistance: ['0%', '100%'] }}
          transition={transition ?? { repeat: Infinity, duration: 6, ease: 'linear' }}
        />
      </div>
    </MotionConfig>
  );
}

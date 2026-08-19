'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring, motion } from 'motion/react';

interface CountUpProps {
  end: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export default function CountUp({
  end,
  suffix = '',
  decimals = 0,
  duration = 3,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState('0' + (decimals ? '.' + '0'.repeat(decimals) : '') + suffix);
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(end);
    }
  }, [isInView, motionValue, end]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setDisplayValue(latest.toFixed(decimals) + suffix);
    });
  }, [springValue, decimals, suffix]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

import { useEffect, useState, useRef, useCallback, type JSX } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover' | 'click';
  as?: keyof JSX.IntrinsicElements;
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'view',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);

  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const availableChars = characters.split('');

  const shuffleText = useCallback(
    (originalText: string, currentRevealed: Set<number>) => {
      return originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join('');
    },
    [availableChars]
  );

  const computeOrder = useCallback(
    (len: number): number[] => {
      const order: number[] = [];
      if (len <= 0) return order;
      if (revealDirection === 'start') {
        for (let i = 0; i < len; i++) order.push(i);
        return order;
      }
      if (revealDirection === 'end') {
        for (let i = len - 1; i >= 0; i--) order.push(i);
        return order;
      }
      const middle = Math.floor(len / 2);
      let offset = 0;
      while (order.length < len) {
        if (offset % 2 === 0) {
          const idx = middle + offset / 2;
          if (idx >= 0 && idx < len) order.push(idx);
        } else {
          const idx = middle - Math.ceil(offset / 2);
          if (idx >= 0 && idx < len) order.push(idx);
        }
        offset++;
      }
      return order.slice(0, len);
    },
    [revealDirection]
  );

  useEffect(() => {
    if (animateOn !== 'view') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            triggerDecrypt();
          }
        });
      },
      { threshold: 0.1 }
    );
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  });

  const triggerDecrypt = useCallback(() => {
    if (sequential) {
      const order = computeOrder(text.length);
      let pointer = 0;
      const revealed = new Set<number>();

      intervalRef.current = setInterval(() => {
        if (pointer < order.length) {
          revealed.add(order[pointer]);
          pointer++;
          setRevealedIndices(new Set(revealed));
          setDisplayText(shuffleText(text, revealed));
        } else {
          clearInterval(intervalRef.current ?? undefined);
          setIsAnimating(false);
          setDisplayText(text);
        }
      }, speed);
    } else {
      let iteration = 0;
      const revealed = new Set<number>();

      intervalRef.current = setInterval(() => {
        setDisplayText(shuffleText(text, revealed));
        iteration++;
        if (iteration >= maxIterations) {
          clearInterval(intervalRef.current ?? undefined);
          setIsAnimating(false);
          setDisplayText(text);
        }
      }, speed);
    }
    setIsAnimating(true);
  }, [text, speed, maxIterations, sequential, computeOrder, shuffleText]);

  const triggerHoverDecrypt = useCallback(() => {
    if (isAnimating) return;
    const revealed = new Set<number>();
    setRevealedIndices(revealed);
    setDisplayText(shuffleText(text, revealed));
    setIsAnimating(true);

    if (sequential) {
      const order = computeOrder(text.length);
      let pointer = 0;
      intervalRef.current = setInterval(() => {
        if (pointer < order.length) {
          revealed.add(order[pointer]);
          pointer++;
          setRevealedIndices(new Set(revealed));
          setDisplayText(shuffleText(text, revealed));
        } else {
          clearInterval(intervalRef.current ?? undefined);
          setIsAnimating(false);
          setDisplayText(text);
        }
      }, speed);
    } else {
      let iteration = 0;
      intervalRef.current = setInterval(() => {
        setDisplayText(shuffleText(text, revealed));
        iteration++;
        if (iteration >= maxIterations) {
          clearInterval(intervalRef.current ?? undefined);
          setIsAnimating(false);
          setDisplayText(text);
        }
      }, speed);
    }
  }, [isAnimating, text, speed, maxIterations, sequential, computeOrder, shuffleText]);

  const resetToPlainText = useCallback(() => {
    clearInterval(intervalRef.current ?? undefined);
    setIsAnimating(false);
    setRevealedIndices(new Set());
    setDisplayText(text);
  }, [text]);

  const hoverHandlers =
    animateOn === 'hover'
      ? { onMouseEnter: triggerHoverDecrypt, onMouseLeave: resetToPlainText }
      : {};

  return (
    <span ref={containerRef} className={parentClassName} {...hoverHandlers}>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealed = revealedIndices.has(index) || (!isAnimating && displayText === text);
          return (
            <span key={index} className={isRevealed ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}

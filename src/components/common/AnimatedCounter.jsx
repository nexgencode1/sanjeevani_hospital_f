import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter component
 * Animates a numeric value smoothly from 0 to the target value when visible in the viewport.
 * @param {number|string} target - The ending number (e.g. 50000, 1000)
 * @param {string} prefix - Optional prefix (e.g. "₹")
 * @param {string} suffix - Optional suffix (e.g. "+", "%")
 * @param {number} duration - Animation duration in ms (default: 2000)
 * @param {string} className - Optional Tailwind/CSS classes
 */
export default function AnimatedCounter({ 
  target, 
  prefix = '', 
  suffix = '+', 
  duration = 2000, 
  className = '' 
}) {
  // Extract pure numeric value if target is a string like "50,000+"
  const numericTarget = typeof target === 'number' 
    ? target 
    : parseInt(String(target).replace(/[^0-9]/g, ''), 10) || 0;

  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = performance.now();

          const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Smooth easeOutCubic: continuous rolling count visible from 0 to target
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOutCubic * numericTarget);

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(numericTarget);
            }
          };

          // Small 80ms breathing pause before launching the count
          setTimeout(() => {
            requestAnimationFrame(step);
          }, 80);
        }
      },
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentElem = elementRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [numericTarget, duration, hasAnimated]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

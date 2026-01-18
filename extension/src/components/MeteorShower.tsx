import { useEffect, useRef } from 'react';

interface Star {
  element: HTMLDivElement;
  x: number;
  duration: number;
  delay: number;
}

export function MeteorShower() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stars: Star[] = [];
    const starCount = 30;

    // Create star elements
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.textContent = '⭐';
      star.style.cssText = `
        position: fixed;
        top: -50px;
        font-size: ${24 + Math.random() * 16}px;
        left: ${Math.random() * 100}%;
        pointer-events: none;
        z-index: 10000;
        opacity: 0;
      `;

      container.appendChild(star);

      const duration = 2 + Math.random() * 2;
      const delay = Math.random() * 1.5;

      // Animate using Web Animations API
      const animation = star.animate([
        {
          opacity: 0,
          transform: 'translateY(0) rotate(0deg) scale(0)'
        },
        {
          opacity: 1,
          transform: `translateY(20vh) rotate(90deg) scale(1)`,
          offset: 0.2
        },
        {
          opacity: 1,
          transform: `translateY(80vh) rotate(270deg) scale(1)`,
          offset: 0.8
        },
        {
          opacity: 0,
          transform: `translateY(120vh) rotate(360deg) scale(0.5)`
        }
      ], {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: 'ease-in',
        fill: 'forwards'
      });

      stars.push({ element: star, x: Math.random() * 100, duration, delay });

      // Remove after animation
      setTimeout(() => {
        star.remove();
      }, (duration + delay) * 1000);
    }

    return () => {
      stars.forEach(s => s.element.remove());
    };
  }, []);

  return <div ref={containerRef} />;
}

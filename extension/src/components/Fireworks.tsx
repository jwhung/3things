import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Confetti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  width: number;
  height: number;
  alpha: number;
  oscillation: number;
  oscillationSpeed: number;
}

export function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<Confetti[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Elegant confetti colors - soft pastel palette
    const colors = [
      '#F7B731', // Warm Yellow
      '#FA8231', // Soft Orange
      '#EB3B5A', // Gentle Pink
      '#45AAF2', // Soft Blue
      '#26DE81', // Mint Green
      '#A55EEA', // Lavender
      '#FC5C65', // Coral
      '#4BCFFA', // Sky Blue
    ];

    const createConfetti = () => {
      const confettiCount = 150;

      for (let i = 0; i < confettiCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * canvas.width;
        const startY = -20 - Math.random() * 100;

        confettiRef.current.push({
          x: startX,
          y: startY,
          vx: (Math.random() - 0.5) * 2,
          vy: 2 + Math.random() * 2,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 8,
          color,
          width: 6 + Math.random() * 4,
          height: 10 + Math.random() * 6,
          alpha: 1,
          oscillation: Math.random() * Math.PI * 2,
          oscillationSpeed: 0.02 + Math.random() * 0.02
        });
      }
    };

    // Launch confetti in waves
    const launchConfetti = () => {
      createConfetti();
      setTimeout(() => {
        createConfetti();
      }, 200);
      setTimeout(() => {
        createConfetti();
      }, 400);
    };

    launchConfetti();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiRef.current = confettiRef.current.filter(confetti => {
        confetti.y += confetti.vy;
        confetti.x += confetti.vx + Math.sin(confetti.oscillation) * 0.5;
        confetti.rotation += confetti.rotationSpeed;
        confetti.oscillation += confetti.oscillationSpeed;

        // Fade out near bottom
        if (confetti.y > canvas.height * 0.7) {
          confetti.alpha -= 0.01;
        }

        if (confetti.alpha <= 0 || confetti.y > canvas.height) {
          return false;
        }

        ctx.save();
        ctx.translate(confetti.x, confetti.y);
        ctx.rotate((confetti.rotation * Math.PI) / 180);
        ctx.globalAlpha = confetti.alpha;
        ctx.fillStyle = confetti.color;
        ctx.fillRect(-confetti.width / 2, -confetti.height / 2, confetti.width, confetti.height);
        ctx.restore();

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}

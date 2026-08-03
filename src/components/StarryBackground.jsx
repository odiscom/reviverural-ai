import React, { useEffect, useRef } from 'react';

export default function StarryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate Stars
    const numStars = Math.floor((window.innerWidth * window.innerHeight) / 3200);
    const stars = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.6 + 0.4,
        color: Math.random() > 0.35 ? '#fbbf24' : '#ffffff',
        alpha: Math.random(),
        twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
      });
    }

    // Shooting Stars
    const shootingStars = [];
    const createShootingStar = () => {
      if (Math.random() < 0.02) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height * 0.5),
          length: Math.random() * 80 + 40,
          speed: Math.random() * 6 + 4,
          alpha: 1
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Radial Gold Glow in Center Top
      const glowGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 0.3, 50,
        canvas.width / 2, canvas.height * 0.3, canvas.width * 0.6
      );
      glowGradient.addColorStop(0, 'rgba(251, 191, 36, 0.05)');
      glowGradient.addColorStop(0.5, 'rgba(15, 25, 50, 0.03)');
      glowGradient.addColorStop(1, 'rgba(5, 10, 22, 0)');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render & Twinkle Stars
      stars.forEach(star => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha <= 0.1 || star.alpha >= 1) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
        ctx.shadowColor = '#fbbf24';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Render Shooting Stars
      createShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length, s.y + s.length * 0.5);
        ctx.strokeStyle = 'rgba(251, 191, 36, ' + s.alpha + ')';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        s.x += s.speed;
        s.y += s.speed * 0.5;
        s.alpha -= 0.02;

        if (s.alpha <= 0) {
          shootingStars.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0
      }} 
    />
  );
}

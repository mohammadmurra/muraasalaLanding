import { useCallback, useRef, useState, useEffect } from 'react';

interface TiltValues {
  rotateX: number;
  rotateY: number;
  scale: number;
  glowX: number;
  glowY: number;
}

interface Use3DEffectOptions {
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  speed?: number;
  glare?: boolean;
  maxGlare?: number;
}

export function use3DEffect({
  maxTilt = 15,
  scale = 1.02,
  perspective = 1000,
  speed = 400,
  glare = true,
  maxGlare = 0.3,
}: Use3DEffectOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltValues>({ 
    rotateX: 0, 
    rotateY: 0, 
    scale: 1,
    glowX: 50,
    glowY: 50,
  });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

      const glowX = 50 + (rotateY / maxTilt) * 25;
      const glowY = 50 + (rotateX / maxTilt) * 25;

      setTilt({ 
        rotateX, 
        rotateY, 
        scale,
        glowX,
        glowY,
      });
    },
    [maxTilt, scale]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0, scale: 1, glowX: 50, glowY: 50 });
  }, []);

  const style: React.CSSProperties = {
    transform: `
      perspective(${perspective}px) 
      rotateX(${tilt.rotateX}deg) 
      rotateY(${tilt.rotateY}deg) 
      scale3d(${tilt.scale}, ${tilt.scale}, ${tilt.scale})
    `,
    transition: `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  };

  const glareStyle: React.CSSProperties = glare ? {
    background: isHovering 
      ? `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(255,255,255,${maxGlare}) 0%, transparent 60%)`
      : 'transparent',
    transition: `background ${speed}ms ease`,
  } : {};

  return {
    ref,
    style,
    glareStyle,
    isHovering,
    tilt,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}

export function useMagneticButton({ strength = 0.3 } = {}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      setPosition({
        x: distanceX * strength,
        y: distanceY * strength,
      });
    },
    [strength]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  const style: React.CSSProperties = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: isHovering 
      ? 'transform 0.1s ease-out' 
      : 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  return {
    ref,
    style,
    isHovering,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}

export function useTiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlarePosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePosition({ x: 50, y: 50 });
  }, []);

  return {
    cardRef,
    transform,
    glarePosition,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}

export function useFloatingAnimation(delay: number = 0) {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime + delay * 1000;
      
      const y = Math.sin(elapsed / 1000) * 15;
      const rotate = Math.sin(elapsed / 1500) * 3;
      
      setStyle({
        transform: `translateY(${y}px) rotate(${rotate}deg)`,
        transition: 'none',
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [delay]);

  return style;
}

export function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef<number>();

  const startAnimation = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const startTime = performance.now();
    const diff = end - start;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(start + diff * easeProgress));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [end, duration, start, isAnimating]);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return { count, startAnimation, isAnimating };
}

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface MouseSpeedContextType {
  averageSpeed: number;
  movementSpeeds: number[];
  resetSpeeds: () => void;
}

const MouseSpeedContext = createContext<MouseSpeedContextType | undefined>(undefined);

export const MouseSpeedProvider = ({ children }: { children: ReactNode }) => {
  const [movementSpeeds, setMovementSpeeds] = useState<number[]>([]);
  const [prevPos, setPrevPos] = useState<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const x = e.clientX;
      const y = e.clientY;

      if (prevPos) {
        const dx = x - prevPos.x;
        const dy = y - prevPos.y;
        const dt = (now - prevPos.time) / 1000; // seconds

        if (dt > 0) {
          const distance = Math.sqrt(dx * dx + dy * dy);
          const speed = distance / dt; // pixels/second
          setMovementSpeeds((s) => [...s.slice(-99), speed]); // keep last 100
        }
      }

      setPrevPos({ x, y, time: now });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prevPos]);

  const averageSpeed =
    movementSpeeds.reduce((sum, s) => sum + s, 0) / (movementSpeeds.length || 1);

  return (
    <MouseSpeedContext.Provider value={{
      averageSpeed,
      movementSpeeds,
      resetSpeeds: () => setMovementSpeeds([])
    }}>
      {children}
    </MouseSpeedContext.Provider>
  );
};

export const useMouseSpeed = () => {
  const context = useContext(MouseSpeedContext);
  if (!context) throw new Error("useMouseSpeed must be used inside MouseSpeedProvider");
  return context;
};

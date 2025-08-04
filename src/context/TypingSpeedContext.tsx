import React, { createContext, useContext, useState, useRef } from 'react';

interface TypingSpeedContextType {
  averageCPM: number;
  startTracking: () => void;
  recordKeystroke: () => void;
  stopTracking: () => void;
  resetTracking: () => void;
}

const TypingSpeedContext = createContext<TypingSpeedContextType | undefined>(undefined);

export const TypingSpeedProvider = ({ children }: { children: React.ReactNode }) => {
  const [averageCPM, setAverageCPM] = useState<number>(0);

  const totalCharsRef = useRef<number>(0);
  const totalTimeRef = useRef<number>(0); // in minutes

  const currentStartRef = useRef<number | null>(null);
  const currentCharCountRef = useRef<number>(0);

  const startTracking = () => {
    if (currentStartRef.current === null) {
      currentStartRef.current = Date.now();
      currentCharCountRef.current = 0;
    }
  };

  const recordKeystroke = () => {
    if (currentStartRef.current === null) startTracking();
    currentCharCountRef.current += 1;
  };

  const stopTracking = () => {
    if (currentStartRef.current !== null) {
      const endTime = Date.now();
      const durationMinutes = (endTime - currentStartRef.current) / 60000;

      totalCharsRef.current += currentCharCountRef.current;
      totalTimeRef.current += durationMinutes;

      const newAvg = Math.round(totalCharsRef.current / totalTimeRef.current);
      setAverageCPM(newAvg+200);

      // reset current session
      currentStartRef.current = null;
      currentCharCountRef.current = 0;
    }
  };

  const resetTracking = () => {
    totalCharsRef.current = 0;
    totalTimeRef.current = 0;
    currentStartRef.current = null;
    currentCharCountRef.current = 0;
    setAverageCPM(0);
  };

  return (
    <TypingSpeedContext.Provider
      value={{ averageCPM, startTracking, recordKeystroke, stopTracking, resetTracking }}
    >
      {children}
    </TypingSpeedContext.Provider>
  );
};

export const useTypingSpeed = (): TypingSpeedContextType => {
  const context = useContext(TypingSpeedContext);
  if (!context) {
    throw new Error('useTypingSpeed must be used within TypingSpeedProvider');
  }
  return context;
};

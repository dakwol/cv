'use client';

import './styles.scss';
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { MeInfo } from "@/app/features/MeInfo/MeInfo";
import defaultProps from '@/app/main/drawConfig';
import { useCanvasDraw } from './hooks/useCanvasDraw';
import { SwitchTheme } from "@/app/features/SwitchTheme/SwitchTheme";
import { useSwitchTheme } from "@/app/features/SwitchTheme/hooks/useSwitchTheme";

const CanvasDraw = dynamic(() => import('react-canvas-draw'), {
  ssr: false,
  loading: () => <></>
});

export default function MainPage() {
  const { canvasRef, drawLineCount, handleChange, isStartDraw } = useCanvasDraw();
  const { isDarkTheme, toggleTheme } = useSwitchTheme();
  const [saveData, setSaveData] = useState<string | undefined>(undefined);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedData = localStorage?.getItem("autosave");
    setSaveData(savedData || undefined);

    try {
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (Array.isArray(parsedData)) {
          const drawsColors = parsedData.map((item) => ({
            ...item,
            lines: item.lines?.map((itemDraw) => ({
              ...itemDraw,
              brushColor: isDarkTheme ? '#ffffff' : '#000'
            })) || []
          }));
          localStorage.setItem("autosave", JSON.stringify(drawsColors));
        }
      }
    } catch (error) {
      console.error('Error parsing saved data:', error);
    }
  }, [isDarkTheme]);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const handleInteraction = () => setHasUserInteracted(true);

    container.addEventListener('mouseup', handleInteraction);
    container.addEventListener('touchstart', handleInteraction);

    return () => {
      container.removeEventListener('mouseup', handleInteraction);
      container.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <div className="mainPage">
      <SwitchTheme isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      <div ref={canvasContainerRef}>
        <CanvasDraw
          ref={canvasRef}
          className="drawingCanvas"
          onChange={handleChange}
          hideGrid={isDarkTheme}
          backgroundColor={isDarkTheme ? '#131313' : '#fff'}
          brushColor={isDarkTheme ? '#ffffff' : '#000'}
          saveData={saveData}
          {...defaultProps}
        />
      </div>
      <MeInfo 
        name={'Hello'} 
        isFixed={isStartDraw && hasUserInteracted}
        theme={isDarkTheme ? 'ux' : 'ui'} 
        drawLineCount={drawLineCount} 
      />
    </div>
  );
}
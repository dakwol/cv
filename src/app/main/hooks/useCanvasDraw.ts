import { useEffect, useRef, useState } from 'react';

export function useCanvasDraw() {
  const canvasRef = useRef(null);
  const [isRestored, setIsRestored] = useState(false);
  const [drawLineCount, setDrawLineCount] = useState(0);
  const [isStartDraw, setIsStartDraw] = useState<boolean>(false);
  const prevLinesCountRef = useRef(0);

  useEffect(() => {
    const saved = localStorage.getItem('autosave');
    if (saved && canvasRef.current) {
      canvasRef.current.loadSaveData(saved, true);
      try {
        const data = JSON.parse(saved);
        prevLinesCountRef.current = data?.lines?.length || 0;
        setDrawLineCount(prevLinesCountRef.current);
      } catch (e) {
        console.error('Ошибка парсинга сохраненных данных:', e);
      }
    }
    setIsRestored(true);
  }, []);

  const handleChange = () => {
    if (!isRestored || !canvasRef.current) return;

    const dataStr = canvasRef.current.getSaveData();

    try {
      const data = JSON.parse(dataStr);
      const lines = data?.lines || [];
      const currentLinesCount = lines.length;

      setDrawLineCount(currentLinesCount);

      // Устанавливаем isStartDraw в true только если появилась новая линия
      if (currentLinesCount > prevLinesCountRef.current) {
        setIsStartDraw(true);
      }
      prevLinesCountRef.current = currentLinesCount;

      const shouldClear = lines.some(line => line.points.length > 600);
      if (shouldClear) {
        canvasRef.current.clear();
        localStorage.removeItem('autosave');
        setDrawLineCount(0);
        setIsStartDraw(false);
        prevLinesCountRef.current = 0;
        return;
      }

      localStorage.setItem('autosave', dataStr);
    } catch (e) {
      console.error('Ошибка парсинга данных canvas:', e);
    }
  };

  return {
    canvasRef,
    isStartDraw,
    drawLineCount,
    handleChange,
  };
}
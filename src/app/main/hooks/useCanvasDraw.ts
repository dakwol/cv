import { useEffect, useRef, useState } from 'react';

export function useCanvasDraw() {
  const canvasRef = useRef<any>(null); // или более точный тип, если доступен
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

      if (currentLinesCount > prevLinesCountRef.current) {
        setIsStartDraw(true);
      }
      prevLinesCountRef.current = currentLinesCount;

      const shouldClear = lines.some((line: any) => line.points.length > 600);
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

  const handleSaveImage = () => {
    if (!canvasRef.current) return;
  
    // Получаем все canvas-элементы внутри компонента
    const canvasElements = document.querySelectorAll('.drawingCanvas canvas');
    
    // Второй canvas обычно содержит готовый рисунок
    const drawingCanvas = canvasElements[1] as HTMLCanvasElement;
    
    if (!drawingCanvas) {
      console.error('Drawing canvas not found');
      return;
    }
  
    // Создаем временный canvas для экспорта
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = drawingCanvas.width;
    tempCanvas.height = drawingCanvas.height;
    
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;
  
    // Заливаем фон (если нужно)
    ctx.fillStyle = '#ffffff'; // или текущий цвет фона
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    
    // Копируем рисунок
    ctx.drawImage(drawingCanvas, 0, 0);
  
    // Экспортируем
    const imageData = tempCanvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = imageData;
    link.click();
  };

  const clearDraw = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  return {
    canvasRef,
    isStartDraw,
    drawLineCount,
    handleChange,
    handleSaveImage,
    clearDraw,
  };
}
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

  const handleSaveImage = async () => {
    if (!canvasRef.current) return;
  
    const canvasElements = document.querySelectorAll('.drawingCanvas canvas');
    const drawingCanvas = canvasElements[1] as HTMLCanvasElement;
    
    if (!drawingCanvas) {
      console.error('Drawing canvas not found');
      return;
    }
  
    // Создаем временный canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = drawingCanvas.width;
    tempCanvas.height = drawingCanvas.height;
    const ctx = tempCanvas.getContext('2d');
    
    if (!ctx) return;
    
    // Заливаем фон и копируем рисунок
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    ctx.drawImage(drawingCanvas, 0, 0);
  
    // Конвертируем canvas в Blob
    const blob = await new Promise<Blob | null>((resolve) => {
      tempCanvas.toBlob((blob) => resolve(blob), 'image/png');
    });
  
    if (!blob) {
      console.error('Failed to create blob');
      return;
    }
  
    // Создаем FormData и добавляем файл
    const formData = new FormData();
    formData.append('image', blob, 'drawing.png');
    formData.append('prompt', 'Красивая картинка в стиле киберпанк');
  
    try {
      const response = await fetch('http://localhost:3001/generate', {
        method: 'POST',
        body: formData,
        // Не устанавливайте Content-Type вручную - браузер сделает это сам с boundary
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Сгенерированное изображение:', result.imageUrl);
      return result.imageUrl;
      
    } catch (error) {
      console.error('Ошибка при отправке изображения:', error);
      throw error;
    }
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
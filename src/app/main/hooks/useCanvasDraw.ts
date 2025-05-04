import { useEffect, useRef, useState } from 'react';

export function useCanvasDraw() {
	const canvasRef = useRef(null);
	const [isRestored, setIsRestored] = useState(false);
	const [drawLineCount, setDrawLineCount] = useState(0);

	useEffect(() => {
		const saved = localStorage.getItem('autosave');
		if (saved && canvasRef.current) {
			canvasRef.current.loadSaveData(saved, true);
		}
		setIsRestored(true);
	}, []);

	const handleChange = () => {
		if (!isRestored || !canvasRef.current) return;

		const dataStr = canvasRef.current.getSaveData();

		try {
			const data = JSON.parse(dataStr);
			const lines = data?.lines || [];

			setDrawLineCount(lines.length);

			const shouldClear = lines.some(line => line.points.length > 600);
			if (shouldClear) {
				canvasRef.current.clear();
				localStorage.removeItem('autosave');
				setDrawLineCount(0);
				return;
			}

			localStorage.setItem('autosave', dataStr);
		} catch (e) {
			console.error('Ошибка парсинга данных canvas:', e);
		}
	};

	return {
		canvasRef,
		drawLineCount,
		handleChange,
	};
}

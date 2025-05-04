'use client';

import './styles.scss';
import dynamic from 'next/dynamic';
import {useEffect, useState} from 'react';
import { MeInfo } from "@/app/features/MeInfo/MeInfo";
import defaultProps from '@/app/main/drawConfig';
import { useCanvasDraw } from './hooks/useCanvasDraw';
import {SwitchTheme} from "@/app/features/SwitchTheme/SwitchTheme";
import {useSwitchTheme} from "@/app/features/SwitchTheme/hooks/useSwitchTheme";

const CanvasDraw = dynamic(() => import('react-canvas-draw'), {
	ssr: false,
	loading: () => <p>Loading canvas...</p>
});

export default function MainPage() {
	const { canvasRef, drawLineCount, handleChange } = useCanvasDraw();
	const { isDarkTheme, toggleTheme } = useSwitchTheme();
	const [isFixedMenu] = useState(false);
	const [saveData, setSaveData] = useState<string | undefined>(undefined);

	useEffect(() => {
		// This effect runs only on client side
		const savedData = localStorage?.getItem("autosave");
		setSaveData(savedData || undefined);

		try {
			if (savedData) {
				const parsedData = JSON.parse(savedData);
				// Check if parsedData is an array
				if (Array.isArray(parsedData)) {
					const drawsColors = parsedData.map((item) => {
						return {
							...item,
							lines: item.lines?.map((itemDraw) => ({
								...itemDraw,
								brushColor: isDarkTheme ? '#ffffff' : '#000'
							})) || []
						};
					});
					localStorage.setItem("autosave", JSON.stringify(drawsColors));
				}
			}
		} catch (error) {
			console.error('Error parsing saved data:', error);
		}
	}, [isDarkTheme]);

	return (
		<div className="mainPage">
			<SwitchTheme isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
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
			<MeInfo name={'Даниил'} drawLineCount={drawLineCount} isFixed={isFixedMenu} />
		</div>
	);
}
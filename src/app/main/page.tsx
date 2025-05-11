'use client';

import './styles.scss';
import dynamic from 'next/dynamic';
import {useEffect, useRef, useState} from 'react';
import {MeInfo} from "@/app/features/MeInfo/MeInfo";
import defaultProps from '@/app/main/drawConfig';
import {useCanvasDraw} from './hooks/useCanvasDraw';
import {SwitchTheme} from "@/app/features/SwitchTheme/SwitchTheme";
import {useSwitchTheme} from "@/app/features/SwitchTheme/hooks/useSwitchTheme";
import {SidebarProject} from "@/app/features/SidebarProject/SidebarProject";
import {SidebarCv} from "@/app/features/SidebarCv/SidebarCv";
import {useSidebar} from "@/app/main/hooks/useSidebar";
import {FaFilePdf, FaIndustry} from "react-icons/fa";

const CanvasDraw = dynamic(() => import('react-canvas-draw'), {
	ssr: false,
	loading: () => <></>
});

const Waves = dynamic(() => import('@/app/features/Waves/Waves'), {ssr: false});


export default function MainPage() {
	const pdfUrl = '/cv.pdf';
	const {canvasRef, drawLineCount, handleChange, isStartDraw, handleSaveImage, clearDraw} = useCanvasDraw();
	const {isDarkTheme, toggleTheme} = useSwitchTheme();
	const [saveData, setSaveData] = useState<string | undefined>(undefined);
	const [hasUserInteracted, setHasUserInteracted] = useState(false);
	const canvasContainerRef = useRef<HTMLDivElement>(null);

	const {activeSidebar, openSidebar, closeSidebar, isProjectsOpen, isCvOpen} = useSidebar();

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


	const buttonsConfig = [
		{
			id: 'cv',
			label: 'Резюме',
			icon: <FaFilePdf size={20}/>,
			onClick: () => openSidebar('cv')
		},
		{
			id: 'projects',
			label: 'Проекты',
			icon: <FaIndustry size={20}/>,
			onClick: () => openSidebar('projects')
		}
	];

	return (
		<div className="mainPage">
			<SwitchTheme isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} onClickClear={clearDraw}/>
			<div ref={canvasContainerRef}>
				{isDarkTheme ?
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
					:
					<Waves/>
					// <></>
				}
			</div>
			<MeInfo
				name={'Даниил Фоменко'}
				isFixed={isStartDraw && hasUserInteracted}
				theme={isDarkTheme ? 'ux' : 'ui'}
				drawLineCount={drawLineCount}
				buttons={buttonsConfig}
			/>

			<SidebarProject
				isOpened={isProjectsOpen}
				onClose={closeSidebar}
				theme={isDarkTheme ? 'ux' : 'ui'}
			/>
			<SidebarCv
				isOpened={isCvOpen}
				onClose={closeSidebar}
				pdfUrl={pdfUrl}
			/>
		</div>
	);
}
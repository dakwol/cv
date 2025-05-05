// @flow 
import * as React from 'react';
import {Sidebar} from "@/app/components/Sidebar/Sidebar";
import {FC} from "react";
import './styles.scss';

type SidebarProjectProps = {
	isOpened: boolean,
	onClose: () => void,
	pdfUrl: string,
};

export const SidebarCv: FC<SidebarProjectProps> = ({isOpened, onClose, pdfUrl}) => {
	return (
		<Sidebar isOpen={isOpened} position={'left'} onClose={onClose}>
			<div className="cvContainer">
				<iframe
					src={pdfUrl}
					className="cvContainerIframe"
					frameBorder="0"
					title="Резюме"
				>
					Ваш браузер не поддерживает PDF.
					<a href={pdfUrl}>Скачайте резюме</a>.
				</iframe>
			</div>
		</Sidebar>
	);
};
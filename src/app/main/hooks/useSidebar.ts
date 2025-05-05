import { useState } from 'react';

type SidebarType = 'projects' | 'cv' | null;

export const useSidebar = () => {
	const [activeSidebar, setActiveSidebar] = useState<SidebarType>(null);

	const openSidebar = (type: SidebarType) => {
		setActiveSidebar(type);
	};

	const closeSidebar = () => {
		setActiveSidebar(null);
	};

	return {
		activeSidebar,
		openSidebar,
		closeSidebar,
		isProjectsOpen: activeSidebar === 'projects',
		isCvOpen: activeSidebar === 'cv',
	};
};
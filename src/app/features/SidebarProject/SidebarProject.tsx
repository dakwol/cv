// @flow 
import * as React from 'react';
import {Sidebar} from "@/app/components/Sidebar/Sidebar";
import {FC} from "react";

type SidebarProjectProps = {
	isOpened: boolean,
	onClose: () => void,
};
export const SidebarProject:FC<SidebarProjectProps> = ({isOpened, onClose}) => {
	return (
		<Sidebar isOpen={isOpened} onClose={onClose}>
			<div>123</div>
		</Sidebar>
	);
};
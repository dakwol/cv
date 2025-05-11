// @flow
import * as React from 'react';
import './styles.scss';
import {FC} from "react";
import classNames from "classnames";

type SidebarProps = {
	children: React.ReactNode;
	position?: "left" | "right";
	isOpen: boolean;
	onClose: () => void;
};
export const Sidebar:FC<SidebarProps> = ({
	                                         children,
	                                         isOpen,
	                                         position = 'right',
	                                         onClose,
}) => {
	return (
		<div className={classNames("sidebarContaner", {'open': isOpen}, position)}>
			<div
				onClick={() => onClose()}
				className={classNames('closeSidebarButton', position)}
			>
				×
			</div>
			<div className={'sidebarContainerBlock'}>

				{children}
			</div>
		</div>
	);
};
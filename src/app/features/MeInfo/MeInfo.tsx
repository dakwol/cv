// @flow
import * as React from 'react';
import {FC, useState} from 'react';
import './styles.scss'
import classNames from "classnames";
import Button from '@/app/components/Button/Button/Button';
import PixelCard from "@/app/features/PixelCard/PixelCard";

type ButtonConfig = {
	id: string;
	label: string;
	icon?: React.ReactNode;
	onClick: () => void;
};

type MeInfoProps = {
	name: string | undefined;
	drawLineCount: number;
	isFixed?: boolean;
	theme?: 'ux' | 'ui';
	buttons: ButtonConfig[];
};
export const MeInfo: FC<MeInfoProps> = ({
	                                        name,
	                                        isFixed,
	                                        theme = 'ux',
	                                        buttons,
                                        }) => {
	const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);
	const firstLetter = name?.substring(0, 1);

	return (
		<PixelCard className={classNames('meInfoContainer', {'fixed': isFixed})}>
			<div
				className={classNames('avatarContainer', {'fixed': isFixed}, {'active': isActiveMenu})}
				onClick={() => setIsActiveMenu(!isActiveMenu)}
			>
				{theme === 'ux' ? <div>{firstLetter}</div> : <></>}
			</div>

			{name && !isFixed && <h1>{name}</h1>}

			<div className={classNames('meInfoButtons', {'fixed': isFixed}, {'active': isActiveMenu})}>
				{buttons.map(button => (
					<Button
						key={button.id}
						icon={button.icon}
						label={button.label}
						onClick={() => button.onClick()}
					/>
				))}
			</div>
		</PixelCard>
	);
};

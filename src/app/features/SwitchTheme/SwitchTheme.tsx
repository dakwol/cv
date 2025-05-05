// @flow
import * as React from 'react';
import './styles.scss';
import {FC} from "react";
import classNames from 'classnames';

type SwitchThemeProps = {
	toggleTheme: () => void,
	isDarkTheme: boolean,
}

export const SwitchTheme:FC<SwitchThemeProps> = ({toggleTheme, isDarkTheme}) => {

	return (
		<div className={'switchThemeContainer'} onClick={toggleTheme}>
			{
				isDarkTheme ?
					<span className={isDarkTheme ? 'active' : ''}>UX</span>
					:
					<span className={!isDarkTheme ? 'active' : ''}>UI</span>
			}
		</div>
	);
};

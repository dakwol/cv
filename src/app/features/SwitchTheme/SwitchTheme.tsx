// @flow
import * as React from 'react';
import {FC} from 'react';
import './styles.scss';
import {FaEraser} from 'react-icons/fa';
import classNames from "classnames";

type SwitchThemeProps = {
	toggleTheme: () => void,
	onClickClear: () => void,
	isDarkTheme: boolean,
}

export const SwitchTheme: FC<SwitchThemeProps> = ({toggleTheme, isDarkTheme, onClickClear}) => {

	return (
		<div className={'switchThemeContainer'}>
			<div className={'switchButton'} onClick={toggleTheme}>
				{
					isDarkTheme ?
						<span className={isDarkTheme ? 'active' : ''}>UX</span>
						:
						<span className={!isDarkTheme ? 'active' : ''}>UI</span>
				}
			</div>
			<div className={classNames('switchButton', {'close': !isDarkTheme})} onClick={onClickClear}>
				<FaEraser/>
			</div>
		</div>
	);
};

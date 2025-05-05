// @flow
import * as React from 'react';
import {FC, useState} from "react";
import './styles.scss'
import classNames from "classnames";
import Button from '@/app/components/Button/Button/Button';

type MeInfoProps = {
	name: string | undefined;
	drawLineCount: number;
	linkCv?: string | undefined;
	isFixed?: boolean | undefined;
	theme?: 'ux' | 'ui';
};
export const MeInfo:FC<MeInfoProps> = ({
	name, 
	linkCv, 
	drawLineCount, 
	isFixed,
	theme = 'ux',
  }) => {
	const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false)
	const firstLetter = name?.substring(0, 1);

	return (
	  <div className={classNames('meInfoContainer', { 'fixed': isFixed })}>
		<div 
			className={classNames('avatarContainer', {'fixed': isFixed}, {'active': isActiveMenu})} 
			onClick={() => setIsActiveMenu(!isActiveMenu)}
		>
		  {theme === 'ux' ? 
			<div>{firstLetter}</div>
			:
			// <img src={''}></img>
			<></>
		  }
		</div>
		{name && !isFixed && <h1>{name}</h1>}
		<div className={classNames('meInfoButtons', {'fixed': isFixed}, {'active': isActiveMenu})}>
		  {linkCv && <a href={linkCv}>{linkCv}</a>}
		  <Button label='Проекты' onClick={() => {}}/>
		  <div>{drawLineCount}</div>
		</div>
	  </div>
	);
  };
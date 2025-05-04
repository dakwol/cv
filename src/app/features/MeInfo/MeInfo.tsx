// @flow
import * as React from 'react';
import {FC} from "react";
import './styles.scss'
import classNames from "classnames";

type MeInfoProps = {
	name: string | undefined;
	drawLineCount: number;
	linkCv?: string | undefined;
	isFixed?: boolean | undefined;

};
export const MeInfo:FC<MeInfoProps> = ({name, linkCv, drawLineCount, isFixed}) => {
	return (
		<div className={classNames('meInfoContainer', isFixed)}>
			{name && <h1>{name}</h1>}
			<div>
				{linkCv && <a href={linkCv}>{linkCv}</a>}
				<button>11</button>
				<div>{drawLineCount}</div>
			</div>
		</div>
	);
};
// @flow
import * as React from 'react';
import {FC} from 'react';
import {Sidebar} from "@/app/components/Sidebar/Sidebar";
import TelegramContact from "@/app/features/TelegramContact/TelegramContact";

type SidebarProjectProps = {
	isOpened: boolean,
	onClose: () => void,
	theme: 'ux' | 'ui',
};

const blocksProj = [
	{
		id: 1,
		linkImg: 'https://media.istockphoto.com/id/1411682102/ru/%D1%84%D0%BE%D1%82%D0%BE/3d-%D0%B0%D0%B1%D1%81%D1%82%D1%80%D0%B0%D0%BA%D1%82%D0%BD%D1%8B%D0%B9-%D0%BA%D1%80%D0%B0%D1%81%D0%BE%D1%87%D0%BD%D1%8B%D0%B9-%D1%84%D0%BE%D0%BD-%D0%BF%D0%BE%D0%B4%D1%85%D0%BE%D0%B4%D0%B8%D1%82-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%B1%D0%BB%D0%BE%D0%B6%D0%B5%D0%BA-%D0%B6%D1%83%D1%80%D0%BD%D0%B0%D0%BB%D0%BE%D0%B2-%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%BE%D0%B2-%D0%B8-%D0%B1%D1%80%D0%BE%D1%88%D1%8E%D1%80-3d-%D1%80%D0%B5%D0%BD%D0%B4%D0%B5%D1%80.jpg?s=612x612&w=0&k=20&c=DzdlgLZPRsupF4OkcZykxaTAE318mDWQIGt1IN9Vqog=',
		title: 'Test title',
		text: 'test text',
	},
	{
		id: 2,
		linkImg: 'https://media.istockphoto.com/id/1411682102/ru/%D1%84%D0%BE%D1%82%D0%BE/3d-%D0%B0%D0%B1%D1%81%D1%82%D1%80%D0%B0%D0%BA%D1%82%D0%BD%D1%8B%D0%B9-%D0%BA%D1%80%D0%B0%D1%81%D0%BE%D1%87%D0%BD%D1%8B%D0%B9-%D1%84%D0%BE%D0%BD-%D0%BF%D0%BE%D0%B4%D1%85%D0%BE%D0%B4%D0%B8%D1%82-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%B1%D0%BB%D0%BE%D0%B6%D0%B5%D0%BA-%D0%B6%D1%83%D1%80%D0%BD%D0%B0%D0%BB%D0%BE%D0%B2-%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%BE%D0%B2-%D0%B8-%D0%B1%D1%80%D0%BE%D1%88%D1%8E%D1%80-3d-%D1%80%D0%B5%D0%BD%D0%B4%D0%B5%D1%80.jpg?s=612x612&w=0&k=20&c=DzdlgLZPRsupF4OkcZykxaTAE318mDWQIGt1IN9Vqog=',
		title: 'Test title',
		text: 'test text',
	},
	{
		id: 3,
		linkImg: 'https://media.istockphoto.com/id/1411682102/ru/%D1%84%D0%BE%D1%82%D0%BE/3d-%D0%B0%D0%B1%D1%81%D1%82%D1%80%D0%B0%D0%BA%D1%82%D0%BD%D1%8B%D0%B9-%D0%BA%D1%80%D0%B0%D1%81%D0%BE%D1%87%D0%BD%D1%8B%D0%B9-%D1%84%D0%BE%D0%BD-%D0%BF%D0%BE%D0%B4%D1%85%D0%BE%D0%B4%D0%B8%D1%82-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%B1%D0%BB%D0%BE%D0%B6%D0%B5%D0%BA-%D0%B6%D1%83%D1%80%D0%BD%D0%B0%D0%BB%D0%BE%D0%B2-%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%BE%D0%B2-%D0%B8-%D0%B1%D1%80%D0%BE%D1%88%D1%8E%D1%80-3d-%D1%80%D0%B5%D0%BD%D0%B4%D0%B5%D1%80.jpg?s=612x612&w=0&k=20&c=DzdlgLZPRsupF4OkcZykxaTAE318mDWQIGt1IN9Vqog=',
		title: 'Test title',
		text: 'test text',
	},
	{
		id: 4,
		linkImg: 'https://media.istockphoto.com/id/1411682102/ru/%D1%84%D0%BE%D1%82%D0%BE/3d-%D0%B0%D0%B1%D1%81%D1%82%D1%80%D0%B0%D0%BA%D1%82%D0%BD%D1%8B%D0%B9-%D0%BA%D1%80%D0%B0%D1%81%D0%BE%D1%87%D0%BD%D1%8B%D0%B9-%D1%84%D0%BE%D0%BD-%D0%BF%D0%BE%D0%B4%D1%85%D0%BE%D0%B4%D0%B8%D1%82-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%B1%D0%BB%D0%BE%D0%B6%D0%B5%D0%BA-%D0%B6%D1%83%D1%80%D0%BD%D0%B0%D0%BB%D0%BE%D0%B2-%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%BE%D0%B2-%D0%B8-%D0%B1%D1%80%D0%BE%D1%88%D1%8E%D1%80-3d-%D1%80%D0%B5%D0%BD%D0%B4%D0%B5%D1%80.jpg?s=612x612&w=0&k=20&c=DzdlgLZPRsupF4OkcZykxaTAE318mDWQIGt1IN9Vqog=',
		title: 'Test title',
		text: 'test text',
	},
	{
		id: 5,
		linkImg: 'https://media.istockphoto.com/id/1411682102/ru/%D1%84%D0%BE%D1%82%D0%BE/3d-%D0%B0%D0%B1%D1%81%D1%82%D1%80%D0%B0%D0%BA%D1%82%D0%BD%D1%8B%D0%B9-%D0%BA%D1%80%D0%B0%D1%81%D0%BE%D1%87%D0%BD%D1%8B%D0%B9-%D1%84%D0%BE%D0%BD-%D0%BF%D0%BE%D0%B4%D1%85%D0%BE%D0%B4%D0%B8%D1%82-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%B1%D0%BB%D0%BE%D0%B6%D0%B5%D0%BA-%D0%B6%D1%83%D1%80%D0%BD%D0%B0%D0%BB%D0%BE%D0%B2-%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%BE%D0%B2-%D0%B8-%D0%B1%D1%80%D0%BE%D1%88%D1%8E%D1%80-3d-%D1%80%D0%B5%D0%BD%D0%B4%D0%B5%D1%80.jpg?s=612x612&w=0&k=20&c=DzdlgLZPRsupF4OkcZykxaTAE318mDWQIGt1IN9Vqog=',
		title: 'Test title',
		text: 'test text',
	},
	{
		id: 6,
		linkImg: 'https://media.istockphoto.com/id/1411682102/ru/%D1%84%D0%BE%D1%82%D0%BE/3d-%D0%B0%D0%B1%D1%81%D1%82%D1%80%D0%B0%D0%BA%D1%82%D0%BD%D1%8B%D0%B9-%D0%BA%D1%80%D0%B0%D1%81%D0%BE%D1%87%D0%BD%D1%8B%D0%B9-%D1%84%D0%BE%D0%BD-%D0%BF%D0%BE%D0%B4%D1%85%D0%BE%D0%B4%D0%B8%D1%82-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%B1%D0%BB%D0%BE%D0%B6%D0%B5%D0%BA-%D0%B6%D1%83%D1%80%D0%BD%D0%B0%D0%BB%D0%BE%D0%B2-%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%BE%D0%B2-%D0%B8-%D0%B1%D1%80%D0%BE%D1%88%D1%8E%D1%80-3d-%D1%80%D0%B5%D0%BD%D0%B4%D0%B5%D1%80.jpg?s=612x612&w=0&k=20&c=DzdlgLZPRsupF4OkcZykxaTAE318mDWQIGt1IN9Vqog=',
		title: 'Test title',
		text: 'test text',
	},
	{
		id: 7,
		linkImg: 'https://media.istockphoto.com/id/1411682102/ru/%D1%84%D0%BE%D1%82%D0%BE/3d-%D0%B0%D0%B1%D1%81%D1%82%D1%80%D0%B0%D0%BA%D1%82%D0%BD%D1%8B%D0%B9-%D0%BA%D1%80%D0%B0%D1%81%D0%BE%D1%87%D0%BD%D1%8B%D0%B9-%D1%84%D0%BE%D0%BD-%D0%BF%D0%BE%D0%B4%D1%85%D0%BE%D0%B4%D0%B8%D1%82-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%B1%D0%BB%D0%BE%D0%B6%D0%B5%D0%BA-%D0%B6%D1%83%D1%80%D0%BD%D0%B0%D0%BB%D0%BE%D0%B2-%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%BE%D0%B2-%D0%B8-%D0%B1%D1%80%D0%BE%D1%88%D1%8E%D1%80-3d-%D1%80%D0%B5%D0%BD%D0%B4%D0%B5%D1%80.jpg?s=612x612&w=0&k=20&c=DzdlgLZPRsupF4OkcZykxaTAE318mDWQIGt1IN9Vqog=',
		title: 'Test title',
		text: 'test text',
	},
]

export const SidebarProject: FC<SidebarProjectProps> = ({isOpened, onClose, theme}) => {
	return (
		<Sidebar isOpen={isOpened} onClose={onClose}>
			{/*{blocksProj.map((item) => {*/}
			{/*	return (*/}
			{/*		<BlockProject key={item.id} linkImg={item.linkImg} title={item.title} text={item.text} theme={theme}/>*/}
			{/*	)*/}
			{/*})}*/}
			<TelegramContact/>
		</Sidebar>
	);
};
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import { useState, useEffect, SyntheticEvent, useRef } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleStateHandler: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const ref = useRef<HTMLFormElement | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState<OptionType>(
		props.articleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		props.articleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		props.articleState.fontColor
	);
	const [bgColor, setBgColor] = useState<OptionType>(
		props.articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		props.articleState.contentWidth
	);

	const resetHandler = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	const submitHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		props.setArticleStateHandler({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: contentWidth,
		});
	};

	useEffect(() => {
		const onClickHandler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		if (!isMenuOpen) return;

		document.addEventListener('mousedown', onClickHandler);

		return () => {
			document.removeEventListener('mousedown', onClickHandler);
		};
	}, [isMenuOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onReset={resetHandler}
					onSubmit={submitHandler}
					ref={ref}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						onChange={setFontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={fontSize}
						onChange={setFontSize}
						options={fontSizeOptions}
						title='Размер шрифта'
						name={'radio'}
					/>
					<Select
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={bgColor}
						onChange={setBgColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

import { useEffect, useState } from 'react';

export function useSwitchTheme() {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	useEffect(() => {
		// Читаем тему из localStorage или по умолчанию
		const storedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const initialTheme = storedTheme === 'dark' || (!storedTheme && prefersDark);

		setIsDarkTheme(initialTheme);
		updateHtmlClass(initialTheme);
	}, []);

	const toggleTheme = () => {
		const newTheme = !isDarkTheme;
		setIsDarkTheme(newTheme);
		updateHtmlClass(newTheme);
		localStorage.setItem('theme', newTheme ? 'dark' : 'light');
	};

	const updateHtmlClass = (dark: boolean) => {
		if (dark) {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		} else {
			document.documentElement.classList.add('light');
			document.documentElement.classList.remove('dark');
		}
	};

	return {
		isDarkTheme,
		toggleTheme,
	};
}

import {useEffect, useState} from "react";

export default function TelegramContact() {
	const [widgetLoaded, setWidgetLoaded] = useState(false);

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://telegram.org/js/telegram-widget.js?7";
		script.setAttribute("data-telegram-login", "dakwol_contact_bot");
		script.setAttribute("data-size", "large");
		script.setAttribute("data-onauth", "onTelegramAuth(user)");
		script.setAttribute("data-request-access", "write");
		script.async = true;

		script.onload = () => {
			setWidgetLoaded(true);
		};
		script.onerror = () => {
			setWidgetLoaded(false);
		};

		document.getElementById("telegram-widget")?.appendChild(script);
	}, []);

	return (
		<div>
			<h2>Связаться со мной в Telegram</h2>
			<div id="telegram-widget"/>
			{!widgetLoaded && (
				<a
					href="https://t.me/Dakwol"
					target="_blank"
					rel="noopener noreferrer"
				>
					Перейти в Telegram
				</a>
			)}
		</div>
	);
}

"use client";

export default function RetryButton() {
	return (
		<button
			onClick={() => {
				window.location.reload();
			}}
		>
			Retry...
		</button>
	);
}

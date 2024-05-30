import { useState } from "react";

function RegisterAlert() {
	const [hide, setHide] = useState(false);

	const handleClick = (e) => {
		e.preventDefault();
		setHide(true);
	};
	return (
		<div
			className={`${
				hide ? "hidden" : "block"
			} w-full max-w-7xl mx-auto py-4`}
		>
			<div
				id="alert-border-1"
				className="flex items-center p-3 text-white border-t-4 border-blue-600 bg-blue-600 transition-all ease-out duration-500"
				role="alert"
			>
				<svg
					className="flex-shrink-0 w-5 h-5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
				</svg>
				<div className="ms-3 font-bold text-xl">
					Register as a vendor
				</div>
				<button
					onClick={handleClick}
					type="button"
					className="ms-auto -mx-1.5 -my-1.5 focus:ring-2 focus:ring-blue-400 p-1.5 inline-flex items-center justify-center h-10 w-10"
					data-dismiss-target="#alert-border-1"
					aria-label="Close"
				>
					<span className="sr-only">Dismiss</span>
					<svg
						className="w-4 h-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 14"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}

export default RegisterAlert;

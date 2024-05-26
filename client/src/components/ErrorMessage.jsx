function ErrorMessage(props) {
	return (
		<p className="mb-3 p-2 bg-red-800 text-white text-sm opacity-75 rounded-lg">
			{props.errorMessage}
		</p>
	);
}

export default ErrorMessage;

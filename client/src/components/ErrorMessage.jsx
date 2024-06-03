/* eslint-disable react/prop-types */
function ErrorMessage(props) {
	return (
		<p className="mb-3 p-2 bg-red-700 text-white text-sm opacity-75 rounded-lg">
			{props.errorMessage}
		</p>
	);
}

export default ErrorMessage;

import {RotatingLines} from "react-loader-spinner";

function Spinner() {
	return (
		<div className="mt-4">
			<RotatingLines
				visible={true}
				height="32"
				width="32"
				color="#0000FF"
				strokeWidth="5"
				animationDuration="0.75"
				ariaLabel="rotating-lines-loading"
				wrapperStyle={{}}
				wrapperClass=""
			/>
		</div>
	);
}

export default Spinner;

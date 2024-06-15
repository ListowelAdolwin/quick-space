import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CautionNotification = () => {
	useEffect(() => {
		const timer = setTimeout(() => {
			toast.info(
				"Please meet vendors only in open areas and be aware of scams.",
				{
					position: "top-center",
					autoClose: false,
					closeOnClick: true,
					draggable: true,
          theme: "colored"
				}
			);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	return <ToastContainer />;
};

export default CautionNotification;

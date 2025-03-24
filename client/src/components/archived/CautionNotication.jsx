import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateCautionAlert } from "../../redux/features/user/userSlice";
import { differenceInDays } from "date-fns";

const CautionNotification = () => {
	const user = useSelector((state) => state.user);
	let cautionAlert
	const dispatch = useDispatch();

	useEffect(() => {
		const timer = setTimeout(() => {
			const now = new Date();
			const lastDisplayedDate = cautionAlert?.lastDisplayed
				? new Date(cautionAlert.lastDisplayed)
				: null;

			if (
				!cautionAlert.hasBeenDisplayed ||
				(lastDisplayedDate &&
					differenceInDays(now, lastDisplayedDate) >= 2)
			) {
				toast.info(
					"Please meet vendors only in open areas and be aware of scams.",
					{
						position: "top-center",
						autoClose: false,
						closeOnClick: true,
						draggable: true,
						theme: "colored",
					}
				);
				dispatch(
					updateCautionAlert({
						hasBeenDisplayed: true,
						lastDisplayed: now.toISOString(),
					})
				);
			}
		}, 3000);

		return () => clearTimeout(timer);
	}, [cautionAlert, dispatch]);

	return <ToastContainer />;
};

export default CautionNotification;

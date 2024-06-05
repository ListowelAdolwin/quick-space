/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const { currentUser } = useSelector((state) => state.user);

	return currentUser ? children || <Outlet /> : <Navigate to="/login" state="Please login to access this page" />;
};

export default PrivateRoute;

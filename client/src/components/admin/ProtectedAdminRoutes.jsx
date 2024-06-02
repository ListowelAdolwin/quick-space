/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoutes = ({ children }) => {
	const { currentUser } = useSelector((state) => state.user);

	return currentUser?.role == "admin" ? (
		children || <Outlet />
	) : (
		<Navigate to="/login" />
	);
};

export default ProtectedAdminRoutes;

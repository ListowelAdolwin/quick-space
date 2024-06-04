/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedVendorRoute = ({ children }) => {
	const { currentUser } = useSelector((state) => state.user);

	return (currentUser?.role === "vendor" || currentUser?.role === "admin") ? children || <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedVendorRoute;

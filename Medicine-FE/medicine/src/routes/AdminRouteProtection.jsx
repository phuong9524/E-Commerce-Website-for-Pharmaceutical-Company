import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
const AdminRouteProtection = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (user.role !== "") {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default AdminRouteProtection;

AdminRouteProtection.propTypes = {
  children: PropTypes.any,
};

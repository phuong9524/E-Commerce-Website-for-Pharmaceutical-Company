import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { adminRoute } from "./routes";
const UserRouteProtection = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (!user.role?.length) {
    return <>{children}</>;
  } else {
    return <Navigate to={adminRoute.home} />;
  }
};

export default UserRouteProtection;

UserRouteProtection.propTypes = {
  children: PropTypes.any,
};

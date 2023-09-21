import { Link, useLocation, useMatches } from "react-router-dom";
import { adminRoute } from "../routes/routes";
import { breadcrumbNameMap } from "./breadcrumbNameMap";
import { Box, Container } from "@mui/material";

function Breadcrumbs() {
  const location = useLocation();

  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <div className="crumb" key={crumb}>
          <Link to={currentLink}>{breadcrumbNameMap[crumb]}</Link>
        </div>
      );
    });

  return (
    <Container maxWidth="lx">
      <Box
        textAlign={"left"}
        sx={{
          background: (251, 251, 251),
          color: (74, 74, 74, 0.8),
        }}
      >
        <div className="breadcrumbs">{crumbs}</div>
      </Box>
    </Container>
  );
}

export default Breadcrumbs;

import { Card, Stack } from "@mui/material";

import { COLORS } from "../../utils/Constants";
import { useState } from "react";

const SideBar = () => {
  const [data, setData] = useState("login");

  const changeFromSidebar = (changeData) => {
    setData(changeData);
  };

  return (
    <Card
      sx={{
        backgroundColor: COLORS.background,
        fill: COLORS.text,
        color: COLORS.text,
        height: "100%",
        borderRadius: 0,
        width: 500,
        padding: 1,
      }}
    >
      {/* <Stack spacing={1}>
        {data === "login" ? (
          <Login changeFromSidebar={changeFromSidebar} />
        ) : (
          <Register changeFromSidebar={changeFromSidebar} />
        )}
      </Stack> */}
    </Card>
  );
};

export default SideBar;

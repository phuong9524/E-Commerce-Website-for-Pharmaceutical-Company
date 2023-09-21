import { SvgIcon } from "@mui/material";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import StarIcon from "@heroicons/react/24/solid/StarIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import ShoppingCartIcon from "@heroicons/react/24/solid/ShoppingCartIcon";
import UserGroupIcon from "@heroicons/react/24/solid/UserGroupIcon";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import NewspaperIcon from "@heroicons/react/24/solid/NewspaperIcon";

import { adminRoute } from "../../routes/routes";

export const Items = [
  {
    roles: [
      "ProductManager",
      "Admin",
      "OrderManager",
      "Employee",
      "Accountant",
      "UserManager",
    ],
    title: "Tống Quan",
    path: "/admin",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    roles: ["Admin", "UserManager"],
    title: "Khách Hàng",
    path: `/admin/${adminRoute.customers}`,
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    roles: ["ProductManager", "Admin"],
    title: "Sản Phẩm",
    path: `/admin/${adminRoute.productManagement}`,
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
  {
    roles: ["Admin", "OrderManager", "Accountant"],
    title: "Đơn Hàng",
    path: `/admin/${adminRoute.orderManagement}`,
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingCartIcon />
      </SvgIcon>
    ),
  },
  {
    roles: ["Admin"],
    title: "Nhân Viên",
    path: `/admin/${adminRoute.employeeManagement}`,
    icon: (
      <SvgIcon fontSize="small">
        <UserGroupIcon />
      </SvgIcon>
    ),
  },
  {
    roles: ["Admin", "UserManager"],
    title: "Đánh Giá",
    path: `/admin/${adminRoute.reviewManagement}`,
    icon: (
      <SvgIcon fontSize="small">
        <StarIcon />
      </SvgIcon>
    ),
  },
  {
    roles: ["Admin"],
    title: "Tin tức",
    path: `/admin/${adminRoute.newsManagement}`,
    icon: (
      <SvgIcon fontSize="small">
        <NewspaperIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: "Tài khoản",
  //   path: "/account",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Settings",
  //   path: "/settings",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   ),
  // },
];

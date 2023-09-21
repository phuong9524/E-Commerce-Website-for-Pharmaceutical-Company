import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Home from "./pages/user/Home";
import "./App.scss";
import { adminRoute, auth, userRoute } from "./routes/routes";
import AdminRoute from "./routes/AdminRouteProtection";

import Introduction from "./pages/user/introduction";
import Product from "./pages/user/Product";
import Store from "./pages/user/Store";
import News from "./pages/user/News";
import User from "./layouts/user/User";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/user/ProductDetails";
import ScrollToTop from "./utils/ScrollToTop";
import { Admin } from "./layouts/admin/Admin";

import ProductManagement from "./pages/admin/ProductManagement";
import Dashboard from "./pages/admin/Dashboard";
import { OrderManagement } from "./pages/admin/OrderManagement";
import { FinancialReport } from "./pages/admin/FinancialReport";

import Customers from "./pages/admin/Customers";
import { ReviewManagement } from "./pages/admin/ReviewManagement";
import { ProductCreation } from "./pages/admin/ProductCreation";
import { ProductEditing } from "./pages/admin/ProductEditing";
import { CustomerDetails } from "./pages/admin/CustomerDetails";
import { CustomerCreation } from "./pages/admin/CustomerCreation";
import { OrderManagementDetails } from "./pages/admin/OrderManagementDetails";
import { Cart } from "./pages/user/Cart";
import { Checkout } from "./pages/user/Checkout";
import { EmployeeManagement } from "./pages/admin/EmployeeManagement";
import { EmployeeDetails } from "./pages/admin/EmployeeDetails";
import { EmployeeCreation } from "./pages/admin/EmployeeCreation";
import { NewsManagement } from "./pages/admin/NewsManagement";
import { NewsCreation } from "./pages/admin/NewsCreation";
import { NewsDetails } from "./pages/user/NewsDetails";
import { NewsEditing } from "./pages/admin/NewsEditing";
import { PersonalInfoEmployee } from "./pages/admin/PersonalInfoEmployee";
import { OrderSuccess } from "./pages/user/OrderSuccess";
import { HistoryOrder } from "./pages/user/HistoryOrders";
import { OrderDetails } from "./pages/user/OrderDetails";
import { PersonalInfoCustomer } from "./pages/user/PersonalInfoCustomer";
import UserRouteProtection from "./routes/UserRouteProtection";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={"auth"}>
          <Route index element={<Login />} />
          <Route path={auth.register} element={<Register />} />
        </Route>
        <Route
          path={adminRoute.home}
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path={adminRoute.customers} element={<Customers />} />
          <Route
            path={`${adminRoute.customers}/${adminRoute.customersDetails}`}
            element={<CustomerDetails />}
          />
          <Route
            path={`${adminRoute.customers}/${adminRoute.customerCreation}`}
            element={<CustomerCreation />}
          />

          <Route
            path={adminRoute.productManagement}
            element={<ProductManagement />}
          />
          <Route
            path={`${adminRoute.productManagement}/${adminRoute.productEditing}`}
            element={<ProductEditing />}
          />
          <Route
            path={`${adminRoute.productManagement}/${adminRoute.productCreation}`}
            element={<ProductCreation />}
          />

          <Route
            path={adminRoute.orderManagement}
            element={<OrderManagement />}
          />
          <Route
            path={`${adminRoute.orderManagement}/${adminRoute.orderManagementDetails}`}
            element={<OrderManagementDetails />}
          />

          <Route
            path={adminRoute.financialReport}
            element={<FinancialReport />}
          />
          <Route
            path={adminRoute.employeeManagement}
            element={<EmployeeManagement />}
          />
          <Route
            path={`${adminRoute.employeeManagement}/${adminRoute.employeeDetails}`}
            element={<EmployeeDetails />}
          />
          <Route
            path={`${adminRoute.employeeManagement}/${adminRoute.employeeCreation}`}
            element={<EmployeeCreation />}
          />

          <Route
            path={adminRoute.reviewManagement}
            element={<ReviewManagement />}
          />

          <Route
            path={adminRoute.newsManagement}
            element={<NewsManagement />}
          />
          <Route
            path={`${adminRoute.newsManagement}/${adminRoute.newsCreation}`}
            element={<NewsCreation />}
          />
          <Route
            path={`${adminRoute.newsManagement}/${adminRoute.newsEditing}`}
            element={<NewsEditing />}
          />
          <Route path={`${auth.account}`} element={<PersonalInfoEmployee />} />
        </Route>
        <Route
          path="/"
          element={
            <UserRouteProtection>
              <User />{" "}
            </UserRouteProtection>
          }
        >
          <Route index element={<Home />} />

          <Route path={userRoute.introduction} element={<Introduction />} />
          <Route path={userRoute.product} element={<Product />} />
          <Route path={userRoute.productDetails} element={<ProductDetails />} />
          <Route path={userRoute.store} element={<Store />} />
          <Route path={userRoute.news} element={<News />} />
          <Route
            path={`${userRoute.news}/${userRoute.newsDetails}`}
            element={<NewsDetails />}
          />
          <Route path={userRoute.cart} element={<Cart />} />
          <Route path={userRoute.checkout} element={<Checkout />} />
          <Route path={userRoute.orderSuccess} element={<OrderSuccess />} />
          <Route path={userRoute.historyOrder} element={<HistoryOrder />} />
          <Route path={userRoute.orderDetails} element={<OrderDetails />} />
          <Route path={`${auth.account}`} element={<PersonalInfoCustomer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

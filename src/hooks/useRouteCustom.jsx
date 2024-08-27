import React, { Suspense } from "react";
import UserTemplate from "../templates/UserTemplate/UserTemplate";
import { useRoutes } from "react-router-dom";
import { pathDefault } from "../common/path";
import RegisterPage from "../pages/Register/RegisterPage";
import LoginPage from "../pages/Login/LoginPage";
import ListJobPage from "../pages/ListJobPage/ListJobPage";
import AdminTemplate from "../templates/AdminTemplate/AdminTemplate";
import AdminLogin from "../components/AdminLogin/AdminLogin";
import ManageUser from "../pages/ManageUser/ManageUser";
import CreateUser from "../pages/CreateUser/CreateUser";
import { Divider, Skeleton } from "antd";

// const ManageUser = React.lazy(() => import("../pages/ManageUser/ManageUser"));

const useRouteCustom = () => {
  const routes = useRoutes([
    {
      path: pathDefault.homePage,
      element: <UserTemplate />,
      children: [
        {
          path: pathDefault.listJob,
          element: <ListJobPage />,
        },
      ],
    },
    {
      path: pathDefault.register,
      element: <RegisterPage />,
    },
    {
      path: pathDefault.login,
      element: <LoginPage />,
    },
    {
      path: pathDefault.admin,
      element: <AdminTemplate />,
      children: [
        // {
        //   // path: pathDefault.manageUser,
        //   index: true,
        //   element: <ManageUser />,
        // },
        {
          path: pathDefault.manageUser,
          // index: true,
          element: (
            <Suspense fallback={<Skeleton />}>
              <ManageUser />
            </Suspense>
          ),
        },
        {
          path: pathDefault.createUser,
          // index: true,
          element: <CreateUser />,
        },
      ],
    },
    {
      path: pathDefault.adminLogin,
      element: <AdminLogin />,
    },
  ]);
  return routes;
};

export default useRouteCustom;

import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AllCategories from "./Pages/Categories/AllCategories";
import AllProducts from "./Pages/Products/AllProducts";
import MainLayout from "./components/MainLayout/MainLayout.jsx";
import PageContent from "./components/PageContent/index.js";
import Main from "./components/Main/Main.jsx";
import Login from "./Pages/Login/index.js";
import Orders from "./Pages/Orders/index.js";

const AppRoutes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <PageContent />,
      children: [
        { index: true, element: <Main /> },
        { path: "/dashboard", element: <Main /> },
        { path: "/categories", element: <AllCategories /> },
        { path: "/allproducts", element: <AllProducts /> },
        { path: "/orders", element: <Orders /> },
        { path: "/login", element: <Login /> },
      ],
    },
  ]);
  return (
    <RouterProvider router={routes} />
  );
};
export default AppRoutes;

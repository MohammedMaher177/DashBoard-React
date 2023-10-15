import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AllCategories from "./Pages/Categories/AllCategories";
import AllProducts from "./Pages/Products/AllProducts";
import PageContent from "./components/PageContent/index.js";
import Main from "./components/Main/Main.jsx";
import Login from "./Pages/Login/index.js";
import Orders from "./Pages/Orders/index.js";
import CalendarComp from "./Pages/Calendar/CalindarComp.jsx";
import LineChart from "./components/Charts/LineChart.jsx";
import Pie from "./Pages/Pie/Pie.jsx";
import Stacked from "./Pages/Stacked/Stacked.jsx";
// import Stacked from "./Pages/Stacked.jsx";
// import Calendar from "./Pages/Calendar/Calendar.jsx";

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
        { path: "/calendar", element: <CalendarComp /> },
        { path: "/LineChart", element: <LineChart /> },
        { path: "/pie", element: <Pie /> },
        { path: "/stacked", element: <Stacked /> },
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

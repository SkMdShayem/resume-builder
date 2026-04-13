import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import ResumeBuilder from "./pages/ResumeBuilder";
import Home from "./pages/Home";

const AppRoutes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/templates",
      element: <Templates />,
    },
    {
      path: "/builder",
      element: <ResumeBuilder/>,
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default AppRoutes;

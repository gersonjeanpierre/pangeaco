// import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import DashboardLayout from "./components/Dashboard";

const App = () => {
  return (
    <>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </>
  );
};

export default App;

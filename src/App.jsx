import React from "react";
import useRouteCustom from "./hooks/useRouteCustom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationContext = React.createContext();

function App() {
  const handleNoti = (content, type) => {
    return toast[type](content, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };
  const routes = useRouteCustom();
  return (
    <NotificationContext.Provider value={{ handleNoti }}>
      {routes}
      <ToastContainer />
    </NotificationContext.Provider>
  );
}

export default App;

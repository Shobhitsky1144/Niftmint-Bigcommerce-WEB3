import React from "react";
import Sidebar from "../components/drawer/Sidebar";

const Layout = (prop) => {
  return (
    <>
      <div>
        <Sidebar />
      </div>
      <div>{prop.children}</div>
    </>
  );
};
export default Layout;

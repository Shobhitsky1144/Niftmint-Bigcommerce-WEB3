import React, { useEffect } from "react";
import Sidebar from "../../../../../components/drawer/Sidebar";
import BigCommerce from "./BigCommerce";

const AppTabs = () => {
  return (
    <div>
      <Sidebar />
      <div
        className=" toggle-container container admin-container"
        style={{ padding: "unset" }}
      >
        <ul className="nav nav-pills " id="pills-tab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link tab-link active"
              id="pills-home-tab"
              data-toggle="pill"
              href="#pills-home"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              My Apps
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link tab-link"
              id="pills-profile-tab"
              data-toggle="pill"
              href="#pills-profile"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Store
            </a>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <BigCommerce />
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            {/* <AdminItems /> */}
            {/* <CreatorDashboard /> */}
            <p className="nft-desc my-5 py-5 text-center">No Store Found</p>
          </div>
          {/* <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            {" "}
            <ConnectBigcom />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AppTabs;

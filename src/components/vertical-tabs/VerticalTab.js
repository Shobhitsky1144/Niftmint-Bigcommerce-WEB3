import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Sidebar from "../drawer/Sidebar";
import "../../styles/admin/VerticalTab.css";

const VerticalTab = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Sidebar />
      <div className="vertical-link">
        <ul>
          <li>
            <NavLink to="/collections-list" className="navss-link">
              Collections
            </NavLink>
          </li>
          <li>
            <NavLink to="/nfts-list" className="navss-link">
              NFTs
            </NavLink>
          </li>

          <li>
            <NavLink to="/FAQs" className="navss-link">
              FAQs
            </NavLink>
          </li>

          <li>
            <NavLink to="/page-builder" className="navss-link">
              Page Builder
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default VerticalTab;

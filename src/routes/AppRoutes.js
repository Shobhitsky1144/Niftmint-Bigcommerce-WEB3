import React, { createContext, useState, useRef, useEffect } from "react";
import Footer from "../components/footer/Footer";
import GoToTop from "../components/GoToTop";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "../styles/common css/commonstyle.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./ProtectedRoutes";

import TermsCondition from "../components/footer/TermsCondition";
import PrivacyPolicy from "../components/footer/PrivacyPolicy";
import Layout from "../layout/Layout";

//admin

import AdminLogin from "../pages/admin/admin-auth/AdminLogin";
import AdminAbout from "../pages/admin/admin-auth/AdminAbout";
import AdminLogo from "../pages/admin/admin-auth/AdminLogo";

import CreateCollection from "../pages/admin/dashboard/dashboard-product/collections/CreateCollection";

import AdminVerifyOtp from "../pages/admin/admin-auth/AdminVerifyOtp";
import AppTabs from "../pages/admin/dashboard/dashboard-app/Apps-tab/AppTabs";
import ConnectBigcom from "../pages/admin/dashboard/dashboard-app/Apps-tab/ConnectBigcom";
import VerticalTabs from "../components/vertical-tabs/VerticalTab";
import NftList from "../pages/admin/dashboard/dashboard-product/NFTs/NftList";
import CollectionList from "../pages/admin/dashboard/dashboard-product/collections/CollectionList";
import CreateNft from "../pages/admin/dashboard/dashboard-product/NFTs/CreateNft";
import EditCollection from "../pages/admin/dashboard/dashboard-product/collections/EditCollection";
import EditNft from "../pages/admin/dashboard/dashboard-product/NFTs/EditNft";
import NftInfo from "../pages/admin/dashboard/dashboard-product/NFTs/NftInfo";
import CollectionInfo from "../pages/admin/dashboard/dashboard-product/collections/CollectionInfo";
import ForgetFirstScreen from "../pages/admin/admin-auth/forget password/ForgetFirstScreen";
import ForgetSecondScreen from "../pages/admin/admin-auth/forget password/ForgetSecondScreen";
import ForgetThirdScreen from "../pages/admin/admin-auth/forget password/ForgetThirdScreen";
import Public from "./Public";
import WelcomeBigco from "../pages/admin/admin-auth/bigcommerce/WelcomeBigco";
import BigcoRegister from "../pages/admin/admin-auth/bigcommerce/BigcoRegister";
import Faq from "../pages/admin/dashboard/dashboard-product/FAQ/Faq";
import PageBuilder from "../pages/admin/dashboard/dashboard-product/page-builder/PageBuilder";
import CustomRoot from "./CustomRoot";

import "../styles/Tabs/Tab.css";

import "../styles/admin/adminItem.css";
import "../styles/common css/commonstyle.css";

const AppRoutes = () => {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <ToastContainer />
        <GoToTop />

        <Routes>
          <Route
            path="/bigcowelcome/:email/:context"
            element={
              <Public>
                <WelcomeBigco />
              </Public>
            }
          ></Route>
          <Route
            path="/bigco-register/:email/:context"
            element={
              <Public>
                <BigcoRegister />
              </Public>
            }
          ></Route>

          <Route
            path="/admin-login/:email/:context"
            element={
              <Public>
                <AdminLogin />
              </Public>
            }
          ></Route>
          {/* <Route
            path="/forget-password-verifyemail"
            element={
              <Public>
                <ForgetFirstScreen />
              </Public>
            }
          ></Route>
          <Route
            path="/forget-password-verifyotp"
            element={
              <Public>
                <ForgetSecondScreen />
              </Public>
            }
          ></Route>
          <Route
            path="/forget-password-createpassword"
            element={
              <Public>
                <ForgetThirdScreen />
              </Public>
            }
          ></Route> */}

          <Route
            path="/admin-verify"
            element={
              <CustomRoot>
                <AdminVerifyOtp />
              </CustomRoot>
            }
          ></Route>
          <Route
            path="/admin-about"
            element={
              <ProtectedRoutes>
                <AdminAbout />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/upload-logo"
            element={
              <ProtectedRoutes>
                <AdminLogo />
              </ProtectedRoutes>
            }
          ></Route>

          <Route
            path="/product"
            element={
              <ProtectedRoutes>
                <VerticalTabs />
              </ProtectedRoutes>
            }
          ></Route>
          {/* 
          <Route
            path="/connect-bigcommerce"
            element={
              <ProtectedRoutes>
                <ConnectBigcom />
              </ProtectedRoutes>
            }
          ></Route> */}

          <Route path="/terms-condition" element={<TermsCondition />}></Route>
          <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>

          <Route
            path="/nfts-list"
            element={
              <ProtectedRoutes>
                <Layout children={<NftList />} />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/create-nft/:nftLength"
            element={
              <ProtectedRoutes>
                <Layout children={<CreateNft />} />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/edit-nft/:id"
            element={
              <ProtectedRoutes>
                <Layout children={<EditNft />} />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/nft-info/:id"
            element={
              <ProtectedRoutes>
                <Layout children={<NftInfo />} />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/create-collection"
            element={
              <ProtectedRoutes>
                <Layout children={<CreateCollection />} />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/edit-collection/:id"
            element={
              <ProtectedRoutes>
                <Layout children={<EditCollection />} />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/collection-info/:id"
            element={
              <ProtectedRoutes>
                <Layout children={<CollectionInfo />} />
              </ProtectedRoutes>
            }
          ></Route>

          <Route
            path="/collections-list"
            element={
              <ProtectedRoutes>
                <Layout children={<CollectionList />} />
              </ProtectedRoutes>
            }
          ></Route>

          <Route
            path="/FAQs"
            element={
              <ProtectedRoutes>
                <Layout children={<Faq />} />
              </ProtectedRoutes>
            }
          ></Route>

          <Route
            path="/page-builder"
            element={
              <ProtectedRoutes>
                <Layout children={<PageBuilder />} />
              </ProtectedRoutes>
            }
          ></Route>

          <Route
            path="*"
            element={<Navigate to="/collections-list" replace />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AppRoutes;

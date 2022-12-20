import React from "react";
import "../../styles/header footer styles/footer.css";
import { GrLinkedin, GrTwitter, GrYoutube } from "react-icons/gr";

const Footer = () => {
  return (
    <>
      <div className=" parent">
        <div className="container">
          <div className="row parent-sections ">
            <div className=" col-12 col-sm-12 col-md-4 col-lg-6 first-section ">
              <h1 className="text-white footer-content foot">
                Create, Explore & Collect <br />
                Digital Art NFTs
              </h1>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-6 second-section">
              <div className="upper-section d-flex  justify-content-end text-white">
                <div className="common-div ">
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    className="footer-link text-white"
                  >
                    PRIVACY POLICY
                  </a>{" "}
                </div>
                <div className="term">
                  {" "}
                  <a
                    href="/terms-condition"
                    target="_blank"
                    className="footer-link text-white"
                  >
                    TERMS & CONDITIONS
                  </a>{" "}
                </div>
                <div className="term pl-3">
                  {" "}
                  <a
                    href="https://www.niftmint.com/support"
                    target="_blank"
                    className="footer-link text-white"
                  >
                    CONTACT SUPPORT
                  </a>{" "}
                </div>

                <div className="pl-3 ">
                  <a className="footer-link text-white">ABOUT US</a>{" "}
                </div>
                <div className="pl-3 ">
                  <a className="footer-link text-white">FAQ</a>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12 mb-1">
              <div className="d-flex justify-content-end social-container">
                <div className="mb-3  social-row">
                  <span className="social-img">
                    <GrLinkedin
                      className="mr-4"
                      size={22}
                      style={{ cursor: "pointer", color: "#fff" }}
                    />
                  </span>
                  <span className="social-img">
                    <GrYoutube
                      className="mr-4"
                      size={25}
                      style={{
                        cursor: "pointer",
                        color: "#fff",
                      }}
                    />
                  </span>
                  <span className="social-img">
                    <GrTwitter
                      size={25}
                      style={{ cursor: "pointer", color: "#fff" }}
                    />
                  </span>
                </div>
              </div>

              <div className=" text-white bottom-text">
                <span>© 2022 Niftmint Inc. All Rights Reserved. </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

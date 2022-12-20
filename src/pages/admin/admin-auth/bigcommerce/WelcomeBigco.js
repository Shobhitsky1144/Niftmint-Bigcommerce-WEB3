import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const WelcomeBigco = () => {
  const [email, setEmail] = useState("");
  const [context, setContext] = useState("");
  const params = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    // sessionStorage.setItem("brand_email", params.email);
    // sessionStorage.setItem("brand_hash", params.context);
    setEmail(params.email);
    setContext(params.context);
  }, [params]);
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center my-3">
        <div className="row">
          <div className="col-lg-12">
            <div className="bigco-wrapper text-center">
              <div className="img-container ">
                <img src="/assets/images/NiftmintLogo.png" alt="logo" />
              </div>
              <div className="bigco-content">
                <h1 className="font-weight-bold">Welcome to Niftmint</h1>
                <h4 className="py-3">
                  Create, Sell and Custody NFTs <br /> directly on your
                  BigCommerce Store
                </h4>
              </div>
              <div className="bigcobtn-wrapper py-4">
                <span
                  onClick={() =>
                    navigate(`/bigco-register/${email}/${context}`)
                  }
                >
                  {" "}
                  <button className="bigco-btn ">Get Started</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeBigco;

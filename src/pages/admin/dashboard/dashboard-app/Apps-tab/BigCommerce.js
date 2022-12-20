import React from "react";
import { Link } from "react-router-dom";

const BigCommerce = () => {
  return (
    <div className="container mt-3 mb-5 ">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-8 col-lg-5">
          <div className="">
            <div>
              <img src="/assets/images/BigCommerce.png" className="w-100" />
            </div>
            <div className=" bigco-parent">
              <div className=" bigco-child">
                <Link to="/connect-bigcommerce">
                  <button className="bigco-btn  text-right">
                    Link Account
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigCommerce;

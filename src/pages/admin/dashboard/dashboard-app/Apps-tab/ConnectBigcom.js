import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../../../components/drawer/Sidebar";
import { toast } from "react-toastify";
import Axios from "axios";
import { API_BASE_URL, API_ROUTES } from "../../../../../constants/ApiBaseUrl";
import { useDispatch, useSelector } from "react-redux";

const ConnectBigcom = () => {
  const [context, setContext] = useState("");
  const [hashId, setHashId] = useState("");

  const navigate = useNavigate();

  const { id } = useSelector((state) => state.BrandReducer.currentUser);
  const handleSubmit = async () => {
    if (context && hashId) {
      try {
        const res = await Axios.post(
          `${API_BASE_URL}${API_ROUTES.BIGCOMMERCE.LINKACCOUNT}`,
          {
            id: id,
            hashid: hashId,
            context,
          }
        );
        toast.success(res.data.message);
        window.location.href = "/product";
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("please fill all the fields.");
    }
  };
  return (
    <>
      <Sidebar />
      <div className="container admin-container">
        <div className="row mb-5">
          <span>
            {" "}
            <Link to="/dashboard">
              <img
                src="/assets/images/Arrow.png"
                alt=""
                className="pl-2"
                style={{ cursor: "pointer" }}
              />
              <span className="forms-labels text-dark pl-2"> My Apps</span>
            </Link>
          </span>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-8 col-lg-5">
            <h5 className="Link-title">Link Your Account</h5>
            <div className="form pt-3">
              <div>
                <div className="form-group pt-3">
                  <label className="forms-labels text-dark mb-3">
                    BigCommerce Context
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control admin-input"
                    placeholder="Ex : stores/qnio3cqqgy"
                    style={{ border: "1px solid #ADADAD" }}
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                  />
                </div>
                <div className="form-group pt-3">
                  <label className="forms-labels text-dark mb-3">Hash ID</label>
                  <input
                    type="text"
                    required
                    className="form-control admin-input"
                    placeholder="Ex: +H9/iUxT6L1As4N+nup+BuUM4W1mEDybqqtikENeQWI="
                    style={{ border: "1px solid #ADADAD" }}
                    value={hashId}
                    onChange={(e) => setHashId(e.target.value)}
                  />
                </div>
                <div className="text-right pt-3">
                  <button
                    className="bigco-btn  text-right"
                    onClick={handleSubmit}
                  >
                    Link Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectBigcom;

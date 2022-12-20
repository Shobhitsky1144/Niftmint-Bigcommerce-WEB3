import React, { useState } from "react";
import "../../../../styles/admin/adminauth.css";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, API_ROUTES } from "../../../../constants/ApiBaseUrl";
import { toast } from "react-toastify";
import Axios from "axios";

const ForgetThirdScreen = () => {
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");

  const navigate = useNavigate();

  const validateForm = (e) => {
    e.preventDefault();

    if (!password || !confirm_password) {
      toast.error("Please fill all the fields.");
      return false;
    } else if (password.length < 6) {
      toast.error("Password length must be greater than 6 characters.");
      return false;
    } else if (password !== confirm_password) {
      toast.error("Passwords do not match.");
      return false;
    } else {
      // handleSubmit();
    }
  };
  const { email } = JSON.parse(localStorage.getItem("signup_id"));
  const handleSubmit = async () => {
    const { id } = JSON.parse(localStorage.getItem("signup_id"));
    // const id = JSON.parse(localStorage.getItem("signup_id"));
    try {
      const res = await Axios.post(
        `${API_BASE_URL}${API_ROUTES.AUTH_USER.FORGET_PASSWORD_STEP3}`,
        {
          id,
          password,
        }
      );

      // //console.log("forget second screen", res);

      if (res.status === 200) {
        toast.success(res.data.message);
        setPassword("");
        setConfirm_Password("");
        // localStorage.setItem("auth_user", JSON.stringify(res.data));
        localStorage.clear();
        navigate("/bc-login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="container ">
        <div className="row d-flex justify-content-center align-items-center mt-5 mb-5 common-forget-row">
          <div className="col-12 col-sm-12 col-md-8 col-lg-6 py-5 forget-common-parent px-5">
            <div className="text-left">
              <h4 className="title">
                Reset Password
                {/* Enter a new password for account: email@address.com */}
              </h4>
              <p className="forgot-desc">
                {" "}
                {/* Enter a new password for account: email@address.com. */}
                Enter a new password for account: {email}.
              </p>
            </div>
            <form className=" py-2" onSubmit={validateForm}>
              <div className="form-group">
                <label className="forms-labels">New password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="forms-labels">Confirm new password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={confirm_password}
                  onChange={(e) => setConfirm_Password(e.target.value)}
                />
              </div>
              <div className="text-right w-10 button-grp login-btn-section auth-btns">
                <button type="submit" className="btn btn-primary common-btn">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetThirdScreen;

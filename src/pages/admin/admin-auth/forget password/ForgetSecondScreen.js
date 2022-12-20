import React, { useState } from "react";
import "../../../../styles/admin/adminauth.css";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, API_ROUTES } from "../../../../constants/ApiBaseUrl";
import { toast } from "react-toastify";
import Axios from "axios";

const ForgetSecondScreen = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const validateForm = (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please fill all the fields.");
      return false;
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const { id } = JSON.parse(localStorage.getItem("signup_id"));
    try {
      const res = await Axios.post(
        `${API_BASE_URL}${API_ROUTES.AUTH_USER.FORGET_PASSWORD_STEP2}`,
        {
          id,
          otp,
        }
      );

      // //console.log("forget second screen", res.data);

      if (res.status === 200) {
        toast.success(res.data.message);
        // localStorage.setItem("auth_user", JSON.stringify(res.data));
        setOtp("");

        navigate("/forget-password-createpassword");
      }
    } catch (error) {
      toast.error("otp verified unsuccessfully");
    }
  };
  return (
    <>
      <div className="container ">
        <div className="row d-flex justify-content-center align-items-center mt-5 mb-5 common-forget-row">
          <div className="col-12 col-sm-12 col-md-8 col-lg-6 py-5 forget-common-parent px-5">
            <div className="text-left">
              <h2 className="title ">One Time Password</h2>
              <p className="forgot-desc">
                {" "}
                A One-Time-Password has been sent to your email.
              </p>
            </div>
            <form className="py-2" onSubmit={validateForm}>
              <div className="form-group">
                <label className="forms-labels">Confirm OTP</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="One Time Password"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="text-right w-10 button-grp login-btn-section auth-btns">
                <button type="submit" className="btn btn-primary common-btn  ">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetSecondScreen;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/admin/adminauth.css";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { API_BASE_URL, API_ROUTES } from "../../../constants/ApiBaseUrl";
import OtpInput from "react-otp-input";

import { toast } from "react-toastify";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginBrand } from "../../../redux/actions/BrandAction";
import Spinner from "../../../components/spinner/Spinner";

const AdminVerifyOtp = () => {
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [OTP, setOTP] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const validateForm = (e) => {
    e.preventDefault();

    if (!OTP) {
      toast.error("Please fill all the fields.");
      return false;
    } else {
      handleSubmit();
    }
  };

  const id = localStorage.getItem("signup_id");
  var email = localStorage.getItem("email");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await Axios.post(
        `${API_BASE_URL}${API_ROUTES.AUTH_USER.VERIFY_OTP}`,
        {
          id,
          otp: OTP,
        }
      );

      if (res.status === 200) {
        // localStorage.setItem("auth_user", JSON.stringify(res.data));
        // var date = new Date();
        // date.setTime(date.getTime() + 14400000 * 1000);
        // Cookies.set("brand_token", res.data.accessToken, { expires: date });

        dispatch(loginBrand(res.data));
        setLoading(false);
        toast.success("Verified successfully.");
        setOTP("");
        navigate("/admin-about");
      }
    } catch (error) {
      toast.error("otp verified unsuccessfully");
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      const res = await Axios.post(
        `${API_BASE_URL}${API_ROUTES.AUTH_USER.RESEND_OTP}`,
        {
          id,
        }
      );
      setLoading(false);
      if (res.status === 200) {
        toast.success("OTP sent.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (OTP) => {
    setOTP(OTP);
  };

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="container d-flex justify-content-center align-items-center mt-3 mb-3 complete-container ">
          <div className="row justify-content-center  pt-3">
            <div className="col-11 col-sm-12  col-md-12 col-lg-12 complete-account-section p-5 complete-account-row">
              <div className="header">
                <h2 className="title font-weight-bold text-dark">
                  Check your email
                </h2>
                <p className="text pt-2">
                  We’ve sent a 6 digit code to{" "}
                  <b>{email ? email : "username@gmail.com"}</b>. Please enter it
                  below.
                </p>
                <div className="d-flex  my-3">
                  <span className="slidez about-slidex"></span>
                  <span className="slidez about-slidey"></span>
                  <span className="slidey about-slidey"></span>
                </div>
                <div className="">
                  <form className="pt-2" onSubmit={validateForm}>
                    <div class="input-groups mt-4 d-flex justify-content-center ">
                      <OtpInput
                        className="otp-field"
                        value={OTP}
                        onChange={handleChange}
                        numInputs={6}
                        separator={<span>-</span>}
                        inputStyle={{
                          width: "3rem",
                          border: "1px solid #565656",
                          fontSize: "1.2rem",
                          // margin: "0.3rem",
                        }}
                      />
                    </div>
                    <div className="pt-3 text-center">
                      <p>
                        {" "}
                        <a
                          className="anchor terms-text"
                          onClick={resendOtp}
                          style={{ cursor: "pointer" }}
                        >
                          {" "}
                          Click to send a new code.
                        </a>
                      </p>
                      <p className="otp-request">
                        Cant find it? Check your spam folder.
                        {/* <a className="anchor terms-text"> Click to resend.</a> */}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between mt-5 divide-row">
                      <div className=" complete-account-section">
                        {/* <Link
                        to="/bigco-register"
                        style={{ visibility: "hidden" }}
                      > */}
                        <button
                          type="submit"
                          className="complete-account-btn  text-white mb-4"
                          style={{
                            background: "#999999",
                            borderRadius: "5px",
                            cursor: "pointer",
                            visibility: "hidden",
                          }}
                        >
                          Cancel
                        </button>
                        {/* </Link> */}
                      </div>

                      <div className="w-10 button-grp login-btn-section">
                        <button type="submit" className="bigco-btn">
                          {" "}
                          Verify Code
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminVerifyOtp;

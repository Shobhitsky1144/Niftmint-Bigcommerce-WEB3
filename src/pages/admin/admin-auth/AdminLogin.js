import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import "../../../styles/admin/adminauth.css";
import { API_BASE_URL, API_ROUTES } from "../../../constants/ApiBaseUrl";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import Axios from "../../../axios";
import { loginBrand } from "../../../redux/actions/BrandAction";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.clear();
    // sessionStorage.setItem("brand_email", params.email);
    // sessionStorage.setItem("brand_hash", params.context);
    verifyBigco();
  }, [params]);
  //  sessionStorage.setItem("brand_email");
  //  sessionStorage.setItem("brand_hash");
  const verifyBigco = async () => {
    // setLoading(false);
    try {
      const res = await Axios.post(`${API_ROUTES.BIGCOMMERCE.BIGCO_SIGNIN}`, {
        email: params.email,
        context: params.context,
      });
      // var date = new Date();
      // date.setTime(date.getTime() + 5 * 60 * 1000);
      // Cookies.set("brand_token", res.data.accessToken, { expires: date });
      // console.warn("dddddd", res.status);
      // setLoading(false);
      // window.location.href = "/collections-list";

      navigate("/collections-list");
      dispatch(loginBrand(res.data));
    } catch (error) {
      // toast.error(error.response.data.message);
      if (error.response.data.verified === false) {
        // console.log(error.response.data.verified === false);
        localStorage.setItem("signup_id", error.response.data.id);
        localStorage.setItem("email", error.response.data.email);
        navigate("/admin-verify");
      }
    }
  };

  // const validateForm = (e) => {
  //   e.preventDefault();

  //   if (!email || !password) {
  //     toast.error("Please fill all the fields.");
  //     return false;
  //   } else {
  //     handleSubmit();
  //   }
  // };

  // const handleSubmit = async () => {
  //   try {
  //     const res = await Axios.post(`${API_ROUTES.AUTH_USER.LOGIN}`, {
  //       email,
  //       password,
  //     });
  //     var date = new Date();
  //     date.setTime(date.getTime() + 12 * 1000);
  //     Cookies.set("brand_token", res.data.accessToken, { expires: date });
  //     window.location.href = "/collections-list";
  //     dispatch(loginBrand(res.data));
  //     // for (let entry of res.headers.entries()) {
  //     //   console.log("header", entry);
  //     // }
  //     // console.log(res.headers);
  //     // console.log()
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };

  return (
    <>
      {/* {loading ? (
        <Spinner loading={loading} />
      ) : ( */}

      {/* <RegisterBtnHeader /> */}

      <div className="container ">
        <div className="row  mt-3 mb-3 common-row ">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <div
              className="m-auto mt-5 text-center"
              // style={{ height: "100vh" }}
            >
              <h2 className=" font-weight-bold mt-5">Go Back to Home Page</h2>
              <button
                className="bigco-btn mt-3 "
                onClick={() =>
                  navigate(`/bc-signup/${params.email}/${params.context}`)
                }
              >
                Home
              </button>
            </div>
          </div>
          {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <img
              src="/assets/images/bc-login-img.png"
              className="w-100 gif auth-img"
              alt=""
            />

            <img
              src="/assets/images/box.png"
              className="w-100 box-img"
              alt=""
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-6 login-section-second pt-5 ">
            <div className="header ">
              <h2 className="title">Welcome back to Niftmint</h2>
              <div className="w-90 d-flex align-items-center">
                <p>
                  Don't have an account?
                 
                  <span className="terms-text"> Register</span>
                
                </p>
              </div>
            </div>
            <div className="form pt-3">
              <form>
                <div className="form-group pt-3">
                  
                  <input
                    type="email"
                    className="form-control admin-input"
                    placeholder="Email Address"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group pt-3">
                
                  <input
                    type="Password"
                    className="form-control admin-input"
                    placeholder="Password"
                    id="pwd"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="text-right">
                  <div className="">
                    {" "}
                 
                    <span className="terms-text"> Forgot Password?</span>
                   
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-cente mt-4  divide-row">
                  <div
                    className="w-90 d-flex align-items-center"
                    style={{ visibility: "hidden" }}
                  >
                    <input
                      type="checkbox"
                      id="Remember me"
                      name="Remember me"
                   
                    />
                    <label
                      for="Remember me"
                      className="pl-2 "
                      style={{ marginBottom: "0px" }}
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="w-10 button-grp login-btn-section auth-btns">
                    <button
                      type="submit"
                      className="btn btn-primary  bc-login-btn"
                    
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div> */}
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default AdminLogin;

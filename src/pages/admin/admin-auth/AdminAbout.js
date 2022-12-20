import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { API_BASE_URL, API_ROUTES } from "../../../constants/ApiBaseUrl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import Axios from "axios";
import "../../../styles/admin/adminauth.css";
import Spinner from "../../../components/spinner/Spinner";

const AdminAbout = () => {
  const [mechType, setMechType] = useState("");
  const [website, setWebsite] = useState("");
  const [saleType, setSaleType] = useState("");
  const [isWebsite, setIsWebsite] = useState("");
  const [loading, setLoading] = useState(false);

  // const [saleType, setsaleType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("signup_id");
  }, []);

  const { id } = useSelector((state) => state.BrandReducer.currentUser);

  const validateForm = (e) => {
    e.preventDefault();

    if (!mechType || !saleType) {
      toast.error("Please fill all the fields.");
      return false;
    } else {
      handleSubmit();
    }
  };
  const handleChange = (e) => {
    setSaleType(e.target.value);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await Axios.post(
        `${API_BASE_URL}${API_ROUTES.AUTH_USER.ABOUT_BUSINESS}`,
        {
          id,
          saleType,
          merchandiseType: mechType,
          // website,
        }
      );

      // localStorage.setItem("signup_id", JSON.stringify(res.data.id));
      setLoading(false);
      toast.success("About Submitted Successfully");
      // navigate("/dashboard");
      navigate("/upload-logo");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="container d-flex justify-content-center align-items-center my-5 complete-container">
          <div className="row justify-content-center background-light pt-3">
            <div className="col-11 col-sm-11  col-md-12 col-lg-12 complete-account-section p-5 complete-account-row">
              <div className="header">
                <h2 className="title font-weight-bold text-dark logo-about-title">
                  Tell us about your business?
                </h2>
                <p className="text pt-3">
                  This helps us build a dashboard that best meets your needs.{" "}
                </p>
                <div className="d-flex  my-3">
                  <span className="slidez about-slidex"></span>
                  <span className="slidez about-slidex"></span>
                  <span className="slidey about-slidey"></span>
                </div>
              </div>
              <div className="form">
                <form onSubmit={validateForm}>
                  {/* <div className="py-3"> */}
                  <FormControl className="py-3 w-100 admin-border">
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={saleType}
                      onChange={handleChange}
                    >
                      <div className="d-flex radio-style ">
                        <div
                          className="mr-2 radio-about first-radio "
                          style={{
                            background: `${
                              saleType === "online" ? "#3DC67E" : `#ffffff`
                            }`,
                            color: `${
                              saleType === "online" ? "#ffffff" : `#999999`
                            }`,
                          }}
                        >
                          <FormControlLabel
                            value="online"
                            control={
                              <Radio
                                style={{
                                  color: `${
                                    saleType != "online" ? "#3bb777" : `#ffffff`
                                  }`,
                                }}
                              />
                            }
                            label="We Mostly Sell Online"
                          />
                        </div>
                        <div
                          className="radio-about second-radio mr-2"
                          style={{
                            background: `${
                              saleType === "offline" ? "#3DC67E" : `#ffffff`
                            }`,
                            color: `${
                              saleType === "offline" ? "#ffffff" : `#999999`
                            }`,
                          }}
                        >
                          <FormControlLabel
                            value="offline"
                            control={
                              <Radio
                                style={{
                                  color: `${
                                    saleType != "offline"
                                      ? "#3bb777"
                                      : `#ffffff`
                                  }`,
                                }}
                              />
                            }
                            label="We Mostly Sell In Person"
                          />
                        </div>
                        <div
                          className="radio-about"
                          style={{
                            background: `${
                              saleType === "both" ? "#3DC67E" : `#ffffff`
                            }`,
                            color: `${
                              saleType === "both" ? "#ffffff" : `#999999`
                            }`,
                          }}
                        >
                          <FormControlLabel
                            value="both"
                            control={
                              <Radio
                                style={{
                                  color: `${
                                    saleType != "both" ? "#3bb777" : `#ffffff`
                                  }`,
                                }}
                              />
                            }
                            label="We Do Both"
                          />
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  {/* </div> */}
                  <div className="form-group pt-3">
                    <select
                      name=""
                      className="select-logo  form-control"
                      value={mechType}
                      onChange={(e) => setMechType(e.target.value)}
                      style={{
                        color: `${mechType ? "#000000" : `#000000`}`,
                      }}
                    >
                      <option value="" selected disabled hidden>
                        What type of merchandise do you sell?
                      </option>

                      <option value="Apparel & Accessories">
                        {" "}
                        Apparel & Accessories
                      </option>
                      <option value="Digital Goods & Software ">
                        {" "}
                        Digital Goods & Software{" "}
                      </option>
                      <option value="Electronics"> Electronics </option>
                      <option value="Food & Beverage"> Food & Beverage</option>

                      <option value="Luggage & Bags"> Luggage & Bags </option>
                      <option value="Novelty"> Novelty</option>
                      <option value="Sportings Goods"> Sportings Goods</option>
                      <option value="Toys & Games"> Toys & Games</option>
                      <option value=" Travel, Recreations, & Leisure">
                        {" "}
                        Travel, Recreations, & Leisure{" "}
                      </option>
                      <option value="Health & Beauty Arts">
                        {" "}
                        Health & Beauty Arts
                      </option>
                      <option value="Entertainments & Media">
                        {" "}
                        Entertainment & Media
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {/* <div className="form-group pt-3">
                  <select
                    name=""
                    className="select-logo  form-control admin-border"
                    value={isWebsite}
                    onChange={(e) => setIsWebsite(e.target.value)}
                    style={{
                      color: `${isWebsite ? "#000000" : `#999999`}`,
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Do you have a website?
                    </option>

                    <option value="Yes">Yes</option>
                    <option value="No"> No </option>
                  </select>
                </div>
                {isWebsite === "Yes" ? (
                  <>
                    {" "}
                    <div className="form-group pt-3">
                      <input
                        type="text"
                        className="form-control admin-border"
                        placeholder="URL?"
                        defaultValue={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  ""
                )} */}

                  <div className="d-flex justify-content-between mt-5 divide-row btnsgrp pt-2">
                    <div className=" complete-account-section">
                      {/* <Link to="/admin-logo"> */}
                      <Link to="/upload-logo">
                        <button
                          // type="submit"
                          className="complete-account-btn  text-white mb-4"
                          style={{
                            background: "#999999",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Skip
                        </button>
                      </Link>
                    </div>
                    {/* <div className=" complete-account-section"> */}
                    <div className="w-10 button-grp login-btn-section">
                      <button
                        type="submit"
                        className="bc-login-btn text-white mb-2"
                        style={{ borderRadius: "5px", cursor: "pointer" }}
                      >
                        {" "}
                        Next
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAbout;

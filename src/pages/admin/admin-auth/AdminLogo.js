import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/admin/adminauth.css";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { API_BASE_URL, API_ROUTES } from "../../../constants/ApiBaseUrl";

import { toast } from "react-toastify";
import Axios from "axios";
import { AirlineSeatLegroomExtra } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/spinner/Spinner";

const AdminLogo = () => {
  const [about, setAbout] = useState("");
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState("");
  const [img, setImg] = useState("");
  const [pic, setPic] = useState("");
  const navigate = useNavigate();

  const { id } = useSelector((state) => state.BrandReducer.currentUser);

  const validateForm = (e) => {
    e.preventDefault();

    if (!logo || !img || !about) {
      toast.error("Please fill all the fields.");
      return false;
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    var data = new FormData();

    data.append("about", about);
    data.append("logo", logo);
    data.append("homeImage", pic);
    data.append("id", id);
    try {
      setLoading(true);
      const res = await Axios.post(
        `${API_BASE_URL}${API_ROUTES.USER.brandIdentity}`,
        data,
        {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        }
      );
      setLoading(false);
      toast.success(res.data.message);
      navigate("/collections-list");
      // window.location.href = "/collections-list";
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const uploadImage = () => {
    document.getElementById("userimg").click();
  };
  const uploadLogo = () => {
    document.getElementById("brandimg").click();
  };

  function handleSkip(e) {
    e.preventDefault();
    navigate("/collections-list");
    // window.location.href = "/collections-list";
  }

  const imageHandler = (e) => {
    setLogo(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const logoHandler = (e) => {
    // const reader = new FileReader();
    // reader.onload = () => {
    // if (reader.readyState === 2) {
    // setImg(reader.result);
    setPic(e.target.files[0]);
    setImg(e.target.files[0].name);
    // }
    // };
    // reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="container d-flex justify-content-center align-items-center my-5 complete-container">
          <div className="row justify-content-center background-light pt-3">
            <div className="col-11 col-sm-12  col-md-12 col-lg-12 complete-account-section p-5 complete-account-row">
              <div className="header">
                <h2 className="title font-weight-bold text-dark logo-about-title">
                  Create your brand identity.
                </h2>
                <p className="text pt-2">
                  These attributes help customers identify your brand.
                </p>
                <div className="d-flex  my-3">
                  <span className="slidez about-slidex"></span>
                  <span className="slidez about-slidex"></span>
                  <span className="slidey about-slidex"></span>
                </div>
              </div>
              <div className="form">
                <form onSubmit={validateForm}>
                  <div>
                    <div className="d-flex align-items-center pt-3 handle-section">
                      <div className="handle-firstlogo " onClick={uploadImage}>
                        {image ? (
                          <img
                            src={image}
                            // alt="user-profile"
                            className="brand-logo"
                            // name="logo"
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <img
                            src="/assets/images/demo.png"
                            alt="user-profile"
                            className=""
                            onClick={uploadImage}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                        <input
                          type="file"
                          style={{ display: "none" }}
                          name=""
                          id="userimg"
                          accept="image/*"
                          // value={image}
                          onChange={imageHandler}
                        />
                      </div>
                      <div className="pl-4 logo-text">
                        <h6 className="font-weight-bold">Logo Image</h6>
                        <p className="desc-light">
                          This image will also be used for navigation.
                          <br /> 350 x 350 recommended.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="pt-4">
                        <h6 className="font-weight-bold">Home Image</h6>
                        <p className="desc-light">
                          This image will appear at the top of your collection
                          page. 1400 x 350 recommended.
                        </p>
                        <div className="">
                          <div
                            className="handle-adminlogo"
                            onClick={uploadLogo}
                          >
                            <div>
                              {" "}
                              <p
                                style={{ color: "#3bb777" }}
                                className="text-center font-weight-bold"
                              >
                                {img}
                              </p>
                            </div>
                            <div>
                              <img src="/assets/images/demo.png" alt="" />
                            </div>
                          </div>
                          <input
                            type="file"
                            style={{ display: "none" }}
                            // name="homeImage"
                            id="brandimg"
                            accept="image/*"
                            // value={image}
                            onChange={logoHandler}
                          />
                        </div>
                      </div>
                      <div className="form-group pt-4">
                        <input
                          type="text"
                          className="form-control admin-border"
                          placeholder="Tell us about your brand."
                          value={about}
                          // name="about"
                          onChange={(e) => setAbout(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-5 divide-row pt-2">
                    <div className=" complete-account-section">
                      <Link to="/collections-list">
                        <button
                          // onClick={handleSkip}
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
                        Finish
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

export default AdminLogo;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Axios from "../../../../axios";
import { API_ROUTES } from "../../../../constants/ApiBaseUrl";
import Spinner from "../../../../components/spinner/Spinner";

const BigcoRegister = () => {
  const [email, setEmail] = useState("");
  const [context, setContext] = useState("");
  const [brand, setBrand] = useState("");
  const [isCheck, setIsCheck] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    setEmail(params.email);
    setContext(params.context);
  }, [params]);

  const validateForm = (e) => {
    e.preventDefault();

    if (!email || !brand || email === ":email") {
      toast.error("Please fill all the fields.");
      return false;
    }
    {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await Axios.post(`${API_ROUTES.BIGCOMMERCE.BIGCO_SIGNUP}`, {
        brandName: brand,
        email: params.email,
        context: params.context,
      });

      localStorage.setItem("signup_id", res.data.id);
      localStorage.setItem("email", res.data.email);
      setLoading(false);
      toast.success("Registered successfully. Please check your e-mail.");
      navigate("/admin-verify");
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
        <div className="container d-flex justify-content-center align-items-center my-3">
          <div className="row">
            <div className="col-lg-12">
              <div className="bigco-wrapper text-center">
                <div className="img-container ">
                  <img src="/assets/images/NiftmintLogo.png" alt="logo" />
                </div>
                <div className="bigco-content">
                  <h1 className="font-weight-bold">Validate your Account</h1>
                  <div className="bigco-register-form">
                    <div className="py-3">
                      <input
                        type="text"
                        className="form-control admin-input"
                        placeholder="Brand Name"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </div>
                    <div className="py-3">
                      <input
                        type="email"
                        className="form-control admin-input"
                        placeholder="BigCommerce Admin Email Address"
                        value={email}
                        disabled={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="d-flex  justify-content-center align-items-center">
                      <input
                        type="checkbox"
                        id="Remember me"
                        name="Remember me"
                        className="cursor-pointer"
                        value={isCheck}
                        onChange={(e) => setIsCheck(e.target.checked)}
                        // checked
                      />

                      <span for="Remember me" className="pl-2 ">
                        I agree to all
                        <Link to="/terms-condition">
                          <span className="terms-text font-weight-bold">
                            {" "}
                            Terms & Conditions
                          </span>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bigcobtn-wrapper py-4">
                  <button
                    className="bigco-btn "
                    onClick={validateForm}
                    disabled={!isCheck}
                  >
                    Verify Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BigcoRegister;

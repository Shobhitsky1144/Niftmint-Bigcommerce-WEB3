import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import WelcomeDialog from "../../../../../components/dialog modal/bigcommerce-dialog/WelcomeDialog";
import VerticalTab from "../../../../../components/vertical-tabs/VerticalTab";
import { API_BASE_URL, API_ROUTES } from "../../../../../constants/ApiBaseUrl";
import { useSelector } from "react-redux";

const PageBuilder = () => {
  const { id } = useSelector((state) => state.BrandReducer.currentUser);
  const [builderPopup, setBuilderPopup] = useState(true);
  const [context, setContext] = useState("");
  const params = useParams();

  useEffect(() => {
    const getContext = async () => {
      try {
        const res = await Axios.get(
          `${API_BASE_URL}${API_ROUTES.BIGCOMMERCE.GET_CONTEXT}${id}`
        );

        setContext(res?.data?.slice(7));
      } catch (error) {
        console.log(error);
      }
    };

    getContext();
  }, []);

  return (
    <>
      <WelcomeDialog
        builderPopup={builderPopup}
        setBuilderPopup={setBuilderPopup}
        context={context}
      />
      <div className="container admin-container">
        <div className="row">
          <div className="col-md-2 col-lg-2">
            <div className="">
              <VerticalTab />
            </div>
          </div>
          <div className="col-md-10 col-lg-10">
            <div className=" toggle-container pt-2  ">
              <div className="d-flex justify-content-between handle-collection-table">
                <div className="d-flex w-100">
                  <div className="input-group  border product-parent ">
                    <input
                      className="form-control py-2 product-input "
                      type="text"
                      placeholder="Search "
                      style={{ border: "none" }}
                      // value={searchNft}
                      // onChange={(e) => setSearchNft(e.target.value)}
                    />

                    <span className="input-group-append">
                      <button
                        className="btn  search-product-btn"
                        type="button"
                        style={{ border: "none" }}
                        //   onClick={handleSearch}
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    </span>
                  </div>
                  <div className=" d-flex align-items-center px-3">
                    <img
                      src="/assets/images/filter-edit.png"
                      alt="fiter-img"
                      height={25}
                      width={25}
                    />
                    <h6 className="font-weight-bold px-2">Filter</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageBuilder;

import React from "react";
import VerticalTab from "../../../../../components/vertical-tabs/VerticalTab";

const Faq = () => {
  return (
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
                    placeholder="Search FAQs"
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
            <ul className="nav nav-pills py-4" id="pills-tab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link tab-link active"
                  id="pills-faq-tab"
                  data-toggle="pill"
                  href="#pills-faq"
                  role="tab"
                  aria-controls="pills-faq"
                  aria-selected="true"
                >
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-faq"
                role="tabpanel"
                aria-labelledby="pills-faq-tab"
              >
                <div className="d-flex justify-content-center align-items-center py-5">
                  <h3 className="font-weight-bold text-secondary">
                    <i>Coming Soon!</i>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductTable from "../../../../../components/tables/ProductTable";
import { FaEdit } from "react-icons/fa";
import Axios from "axios";
import { API_BASE_URL, API_ROUTES } from "../../../../../constants/ApiBaseUrl";
import { toast } from "react-toastify";
import "../../../../../styles/admin/adminItem.css";
import { useDispatch, useSelector } from "react-redux";
import VerticalTab from "../../../../../components/vertical-tabs/VerticalTab";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../../components/spinner/Spinner";
import WelcomeDialog from "../../../../../components/dialog modal/bigcommerce-dialog/WelcomeDialog";

const NftList = () => {
  const [loading, setLoading] = React.useState(false);

  const [show, setShow] = useState(false);
  const [collectionDropdown, setCollectionDropdown] = useState(true);
  const [getNft, setGetNft] = useState("");
  const [editNft, setEditNft] = useState(false);
  const [deleteState, setDeleteState] = useState("");

  const [lengthOfNft, setLengthOfNft] = useState(false);
  const [checkLength, setCheckLength] = useState(false);

  const [searchNft, setSearchNft] = useState("");
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [nftLength, setNftLength] = useState("");
  const [collectionName, setCollectionName] = useState([]);

  const { id, visited } = useSelector(
    (state) => state.BrandReducer.currentUser
  );

  const labels = ["Name", "Qty", "Price", "Collection", "Mint Status", ""];

  useEffect(() => {
    if ((!show && !editNft) || deleteState || !searchNft) {
      handleSubmit();
    }
  }, [show, editNft, deleteState, searchNft]);

  useEffect(() => {
    var lengthNft = localStorage.getItem("firstNft");
    setLengthOfNft(lengthNft);
    setCheckLength(true);
  }, [lengthOfNft, checkLength]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await Axios.get(
        `${API_BASE_URL}${API_ROUTES.NFT.GET_ALL_NFT}${id}`
      );

      setRows(res.data);
      // console.log("s", res.data.length);
      setNftLength(res.data.length);
      // setTimeout(function () {
      setLoading(false);
      // }, 1000);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(true);
    }
  };

  const handleSearch = () => {
    // let filteredNft = rows.filter((nft) =>
    //   nft.name.toLowerCase().includes(searchNft)
    // );
    // setRows(filteredNft);
  };

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          {!visited && lengthOfNft == 0 ? (
            <WelcomeDialog
              checkLength={checkLength}
              setCheckLength={setCheckLength}
            />
          ) : (
            ""
          )}
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
                          placeholder="Search NFTs"
                          style={{ border: "none" }}
                          value={searchNft}
                          onChange={(e) => setSearchNft(e.target.value)}
                        />

                        <span className="input-group-append">
                          <button
                            className="btn  search-product-btn"
                            type="button"
                            style={{ border: "none" }}
                            onClick={handleSearch}
                          >
                            <i className="fa fa-search"></i>
                          </button>
                        </span>
                      </div>
                      <div className=" d-flex align-items-center px-3">
                        <img
                          src="/assets/images/filter-edit.png"
                          alt=""
                          height={25}
                          width={25}
                        />
                        <h6 className="font-weight-bold px-2">Filter</h6>
                      </div>
                    </div>
                    <div
                      className=" d-flex align-items-center create-collection-btn"
                      id="mint-btn"
                    >
                      <button
                        className="header-btn admin-btn"
                        onClick={() => navigate(`/create-nft/${nftLength}`)}
                      >
                        Create NFT
                      </button>
                    </div>
                  </div>
                  <ul
                    className="nav nav-pills py-4"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link tab-link active"
                        id="pills-all-tab"
                        data-toggle="pill"
                        href="#pills-all"
                        role="tab"
                        aria-controls="pills-all"
                        aria-selected="true"
                      >
                        All
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link tab-link"
                        id="pills-feature-tab"
                        data-toggle="pill"
                        href="#pills-feature"
                        role="tab"
                        aria-controls="pills-feature"
                        aria-selected="false"
                      >
                        Featured
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-all"
                      role="tabpanel"
                      aria-labelledby="pills-all-tab"
                    >
                      <div className="">
                        <ProductTable
                          labels={labels}
                          rows={rows}
                          setEditNft={setEditNft}
                          setShow={setShow}
                          FaEdit={FaEdit}
                          setGetNft={setGetNft}
                          setCollectionName={setCollectionName}
                          setDeleteState={setDeleteState}
                        />
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-feature"
                      role="tabpanel"
                      aria-labelledby="pills-feature-tab"
                    >
                      {" "}
                      <p className="nft-desc my-5 py-5 text-center">
                        No Features Found
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NftList;

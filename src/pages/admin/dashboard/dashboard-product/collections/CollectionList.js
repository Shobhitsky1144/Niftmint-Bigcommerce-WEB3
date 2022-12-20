import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductTable from "../../../../../components/tables/ProductTable";
import { FaEdit } from "react-icons/fa";
import Axios from "axios";
import { API_BASE_URL, API_ROUTES } from "../../../../../constants/ApiBaseUrl";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  allCollectionData,
  searchCollection,
  showCollectionData,
} from "../../../../../redux/actions/collectionAction";
import VerticalTab from "../../../../../components/vertical-tabs/VerticalTab";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../../components/spinner/Spinner";
import WelcomeDialog from "../../../../../components/dialog modal/bigcommerce-dialog/WelcomeDialog";


const CollectionList = () => {
  const dispatch = useDispatch();

  const { collection, loading } = useSelector(
    (state) => state.CollectionReducer
  );
  const { id, visited } = useSelector(
    (state) => state.BrandReducer.currentUser
  );
  const firstVisit = localStorage.getItem("firstVisited");
  const secondVisit = localStorage.getItem("secondVisited");

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [kite, setKite] = useState("");
  const [getCollection, setGetCollection] = useState("");
  const [editCollection, setEditCollection] = useState(false);
  const labels = ["Name", "Category", "Blockchain", "Visibility", ""];
  const [rows, setRows] = useState([]);

  const [deleteCollection, setDeleteCollection] = useState("");
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    dispatch(allCollectionData(id));
    // document.title = "sky kkc";
  }, []);

  useEffect(() => {
    setRows(collection);
  }, [rows, collection, loading]);

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          {/* {console.log(visited)} */}
          {!visited && (!firstVisit || !secondVisit) ? <WelcomeDialog /> : ""}
   
          <div className="container admin-container">
            <div className="row">
              <div className="col-lg-2">
                <div className="">
                  <VerticalTab />
                </div>
              </div>
              <div className="col-md-12 col-lg-10">
                <div className="d-flex justify-content-between handle-collection-table">
                  <div
                    className="input-group  border product-parent "
                    style={{ width: "80%" }}
                  >
                    <input
                      className="form-control py-2 product-input "
                      type="text"
                      placeholder="Search Collection"
                      style={{ border: "none" }}
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                    />
                    <span className="input-group-append">
                      <button
                        className="btn  search-product-btn"
                        type="button"
                        style={{ border: "none" }}
                        // onClick={() => {
                        //   dispatch(searchCollection(searchKey, id));
                        // }}
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    </span>
                  </div>

                  <div className=" d-flex align-items-center create-collection-btn">
                    <button
                      className="header-btn admin-btn"
                      onClick={() => navigate("/create-collection")}
                    >
                      Create Collection
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
                <div className="pt-4 pb-5">
                  <ProductTable
                    labels={labels}
                    rows={rows}
                    FaEdit={FaEdit}
                    setGetCollection={setGetCollection}
                    collectionTable={true}
                    setDeleteCollection={setDeleteCollection}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CollectionList;

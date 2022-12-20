import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import "../../../../../styles/admin/createcollection.css";
import CustomizedSwitches from "../../../../../components/toggle-switch/Switch";
import { ImUpload } from "react-icons/im";
import { GiDiamonds } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import VerticalTab from "../../../../../components/vertical-tabs/VerticalTab";
import { API_BASE_URL, API_ROUTES } from "../../../../../constants/ApiBaseUrl";
import { FaRegEdit } from "react-icons/fa";
import Spinner from "../../../../../components/spinner/Spinner";
import Skeleton from "@mui/material/Skeleton";

const CollectionInfo = () => {
  const [loading, setLoading] = React.useState(false);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [names, setNames] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [blockchain, setBlockchain] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [mintType, setMintType] = useState("");
  const [smartContract, setSmartContract] = useState("");
  const [payment, setPayment] = useState("");
  const [contractAddr, setContractAddr] = useState("");
  const [con, setCon] = useState("");
  const [pic, setPic] = useState("");
  const [popup, setPopup] = useState(false);

  const [checkToken, setCheckToken] = useState(false);

  const [showCategory, setShowCategory] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [showMarket, setShowMarket] = useState(false);
  const [check, setCheck] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    getCollectionById();
  }, [params]);

  const getCollectionById = async () => {
    setLoading(true);
    try {
      const { data } = await Axios.get(
        `${API_BASE_URL}${API_ROUTES.COLLECTION.GET_COLLECTION}${params.id}`
      );

      const {
        image_url,
        name,
        description,
        categories,
        token_gated,
        platform,
        blockchain,
        categoryID,
        contract_address,
        // payment_options,
        mint_type,
        smart_contract,
        list_marketplace,
        is_visible,
      } = data;
      setName(name);
      setPic(image_url);
      setDesc(description);
      // setCat(categories);
      setCategory(categories[0]);
      setAddCategory(categories[1]);
      setCon(contract_address);
      setContractAddr(contract_address.substring(32));
      setShowToken(token_gated);
      setPlatform(platform);
      setMintType(mint_type);
      setSmartContract(smart_contract);
      setBlockchain(blockchain);
      // setPayment(payment_options);

      setShowToken(token_gated);
      setShowMarket(is_visible);
      setCategoryID(categoryID);
      setCheckToken(token_gated);
      setTimeout(function () {
        setLoading(false);
      }, 2000);
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
        <div className="container admin-container">
          <div className="row ">
            <div className="col-lg-2">
              <VerticalTab />
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-7 ">
              <div className="pr-lg-5 ">
                <div className="mb-5 mt-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <img
                        src="/assets/images/Arrow.png"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/collections-list")}
                      />

                      <span
                        className="forms-labels text-dark pl-2"
                        style={{ fontSize: "20px" }}
                      >
                        Collections
                      </span>
                    </div>
                    <div>
                      {/* <FaRegEdit
                        size={25}
                        className="cursor-pointer"
                        title="Edit Collection"
                        color="#3bb777"
                        onClick={() =>
                          navigate(`/edit-collection/${params.id}`)
                        }
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="heading ">
                  <h1 className="font-weight-bold nft-titles">
                    Collection Detail !
                  </h1>
                </div>
                <div className="nft-pic  ">
                  <div className="d-flex justify-content-between pt-3 pb-2 ">
                    <div className="">
                      <span>
                        <h5 className="font-weight-bold">Collection Image </h5>

                        <p className="create-nft-text">
                          This image will be used to feature your collection on
                          your dashboard, category pages, and the Niftmint
                          marketplace.
                        </p>
                      </span>
                    </div>
                  </div>

                  <div className="">
                    <img src={pic} className="w-100 border-radius-20" />
                  </div>
                </div>
                <div className="details-section pt-5 ">
                  <div className="">
                    <h4 className="font-weight-bold">Collection Information</h4>

                    <div className="form mt-4">
                      <div className="form-group">
                        <label for="pwd" className="forms-labelss">
                          Name
                        </label>
                        <div className="home-data nft-desc">
                          <p className="desc-text">{name}</p>
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="pwd" className="forms-labelss">
                          Description
                        </label>
                        <div className="home-data nft-desc">
                          <p className="desc-text">{desc ? desc : "null"}</p>
                        </div>
                      </div>
                      <div className="home-data nft-desc select-parent ">
                        <label className="forms-labelss">Category</label>

                        <p className="desc-text">
                          {category || addCategory
                            ? `${category} ,  ${addCategory ? addCategory : ""}`
                            : "null"}
                        </p>
                      </div>
                      {/* <div className="form-group mt-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <label className="forms-labelss">
                              Token Gated Community
                            </label>
                          </div>

                          <div>
                            <CustomizedSwitches
                              handleToken={true}
                              setShowToken={setShowToken}
                              showToken={showToken}
                              collectionInfo={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="home-data nft-desc select-parent w-50">
                        <label className="forms-labelss">Platform</label>
                        <p>{platform ? platform : "null"}</p>
                      </div> */}
                      <div className="home-data nft-desc select-parent mt-4">
                        <label className="forms-labelss">Blockchain</label>

                        <p className="desc-text">{blockchain}</p>
                      </div>
                      {smartContract && (
                        <>
                          <div className="home-data nft-desc select-parent mt-4">
                            <label className="forms-labelss">
                              Smart Contract
                            </label>

                            <p className="desc-text">{smartContract}</p>
                          </div>
                        </>
                      )}
                      {mintType && (
                        <>
                          <div className="home-data nft-desc select-parent mt-4">
                            <label className="forms-labelss">Minting</label>

                            <p className="desc-text">{mintType}</p>
                          </div>
                        </>
                      )}
                      {/* <div className="form-group mt-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <label className="forms-labelss">
                              List Collection on Brand Storefront
                            </label>
                          </div>

                          <div>
                            <CustomizedSwitches
                              setShowMarket={setShowMarket}
                              showMarket={showMarket}
                              collectionInfo={true}
                            />
                          </div>
                        </div>
                      </div> */}

                      {contractAddr && (
                        <>
                          {" "}
                          <div className="home-data nft-desc select-parent mt-4">
                            <label className="forms-labelss">
                              Contract Address{" "}
                            </label>

                            <p className="desc-text">
                              {contractAddr ? (
                                <a
                                  href={`https://polygonscan.com/address/${contractAddr}`}
                                  target="_blank"
                                  className="word-break "
                                >
                                  {con}
                                </a>
                              ) : (
                                "null"
                              )}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionInfo;

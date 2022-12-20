import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import "../../../../../styles/admin/adminItem.css";
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

const NftInfo = () => {
  const collectionData = useSelector(
    (state) => state.CollectionReducer.collection
  );
  const { brandName, id } = useSelector(
    (state) => state.BrandReducer.currentUser
  );
  const [loading, setLoading] = React.useState(false);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [supply, setSupply] = useState("");
  const [claimMethod, setClaimMethod] = useState("");
  const [collection, setCollection] = useState("");
  const [collectionID, setCollectionID] = useState("");
  const [blockchain, setBlockchain] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [pic, setPic] = useState("");
  const navigate = useNavigate();

  const [min, setMin] = useState();

  const [popup, setPopup] = useState(false);
  const [edit, setEdit] = useState(false);

  const [fop, setFop] = useState("");
  const [check, setCheck] = useState("");
  const [rows, setRows] = useState([]);
  const params = useParams();

  useEffect(() => {
    getNftById();
  }, [params]);

  const getNftById = async () => {
    const favicon = document.getElementById("favicon");
    try {
      setLoading(true);
      const { data } = await Axios.get(
        `${API_BASE_URL}${API_ROUTES.NFT.GET_NFT}${params.id}`
      );

      const {
        name,
        image_url,
        description,
        supply,
        claimMethod,
        // blockchain,
        collectionName: collection,
        collectionID,
        auctionItem,
        price,

        list_marketplace,
      } = data;
      // favicon.setAttribute =
      //   ("href",
      //   "https://niftmint-nfts.s3.amazonaws.com/Big%20Mint%20T-Shirt%20White.png");
      // console.log(image_url);
      setName(name);
      setPic(image_url);

      setDescription(description);
      setSupply(supply);
      setClaimMethod(claimMethod);
      setBlockchain(blockchain);
      setCollection(collection);
      setCollectionID(collectionID);
      // setMin(minted);
      setSalePrice(price);
      setShowToken(list_marketplace);

      setTimeout(function () {
        setLoading(false);
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (collectionData) {
      setRows(collectionData);
    }
  }, [collectionData]);

  return (
    <>
      {" "}
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="container admin-container">
          <div className="row ">
            <div className="col-12 admin-box-wrappercol-sm-12 col-md-12 col-lg-2">
              <VerticalTab />
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-7  ">
              <div className="pr-lg-5  ">
                <div className="mb-5 mt-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <img
                        src="/assets/images/Arrow.png"
                        alt=""
                        className=" "
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/nfts-list")}
                      />

                      <span
                        className="forms-labels text-dark pl-2"
                        style={{ fontSize: "20px" }}
                      >
                        NFTs
                      </span>
                    </div>
                    <div>
                      {/* <FaRegEdit
                        size={25}
                        className="cursor-pointer"
                        title="Edit NFT"
                        color="#3bb777"
                        onClick={() => navigate(`/edit-nft/${params.id}`)}
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="heading ">
                  <h1 className="font-weight-bold nft-titles item-title">
                    NFT Detail !
                  </h1>
                </div>
                <div className="nft-pic  ">
                  <div className="d-flex justify-content-between pt-3 pb-2 ">
                    <div className="">
                      <span>
                        <h5 className="font-weight-bold">NFT Image</h5>

                        <p className="create-nft-text">
                          This image will be used to feature your NFT in your
                          collections, dashboard, and the Niftmint marketplace.
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
                    <h4 className="font-weight-bold">NFT Information</h4>

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
                          <p className="desc-text">{description}</p>
                        </div>
                      </div>
                      <div className="form-group  ">
                        <div className="d-flex justify-content-between handle-items">
                          <div className="home-data nft-desc mr-2">
                            <label for="pwd" className="forms-labelss">
                              Supply
                            </label>
                            <p className="desc-text">{supply}</p>
                          </div>

                          <div className="home-data nft-desc select-parent mr-2 dropdown-child">
                            <label for="pwd" className="forms-labelss">
                              Claim Method{" "}
                            </label>
                            <p className="desc-text">{claimMethod}</p>
                          </div>

                          <div className="home-data nft-desc select-parent dropdown-child">
                            <label for="pwd" className="forms-labelss">
                              Collection
                            </label>
                            <p className="desc-text">{collection}</p>
                          </div>
                        </div>
                      </div>
                      {/* 
                      <div className="home-data nft-desc select-parent mt-4">
                        <label for="pwd" className="forms-labelss">
                          Blockchain
                        </label>

                        <p className="desc-text">{blockchain}</p>
                      </div> */}

                      {/* <div className="form-group mt-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <label for="pwd" className="forms-labelss">
                          Auction Item
                        </label>
                      </div>

                      <div>
                        <CustomizedSwitches />
                      </div>
                    </div>
                    <div className="home-data nft-desc">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="You’ll receive bids on this item
"
                      />
                    </div>
                  </div> */}
                      <div className="form-group mt-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <label for="pwd" className="forms-labelss">
                              List for sale
                            </label>
                          </div>

                          <div>
                            <CustomizedSwitches
                              showToken={showToken}
                              setShowToken={setShowToken}
                              handleToken={true}
                              editNft={true}
                            />
                          </div>
                        </div>
                        <div className="home-data nft-desc">
                          {/* <p className="create-nft-text">
                        NFT will become available to purchase.
                      </p> */}
                        </div>
                      </div>

                      <div className="form-group mt-4">
                        <label for="pwd" className="forms-labelss">
                          Sale price
                        </label>
                        <div className="home-data nft-desc">
                          <p className="desc-text">{salePrice}</p>
                        </div>
                      </div>
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

export default NftInfo;

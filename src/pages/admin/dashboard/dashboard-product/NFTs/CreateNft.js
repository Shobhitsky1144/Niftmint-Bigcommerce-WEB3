import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import "../../../../../styles/admin/adminItem.css";
import { ImUpload } from "react-icons/im";
import { GiDiamonds } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import VerticalTab from "../../../../../components/vertical-tabs/VerticalTab";
import { API_BASE_URL, API_ROUTES } from "../../../../../constants/ApiBaseUrl";
import NFTDialog from "../../../../../components/dialog modal/bigcommerce-dialog/NFTDialog";
import CustomizedSwitches from "../../../../../components/toggle-switch/Switch";
import { allCollectionData } from "../../../../../redux/actions/collectionAction";
import Spinner from "../../../../../components/spinner/Spinner";
import WelcomeDialog from "../../../../../components/dialog modal/bigcommerce-dialog/WelcomeDialog";

const CreateNft = () => {
  const collections = useSelector(
    (state) => state.CollectionReducer.collection
  );
  const { id, brandName } = useSelector(
    (state) => state.BrandReducer.currentUser
  );

  const params = useParams();
  const [loading, setLoading] = React.useState(false);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [supply, setSupply] = useState("");
  const [claimMethod, setClaimMethod] = useState("purchase");
  const [collection, setCollection] = useState("");
  const [collectionID, setCollectionID] = useState("");
  const [blockchain, setBlockchain] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [showToken, setShowToken] = useState(true);
  const [ui, setUi] = useState(false);
  const [pic, setPic] = useState("");
  const [mint, setMint] = useState(false);

  const [sellingLimit, setSellingLimit] = useState("");

  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  const [popup, setPopup] = useState(false);

  const [fop, setFop] = useState("");
  const [check, setCheck] = useState("");
  const [types, setTypes] = React.useState(false);
  const [nftPopup, setNftPopup] = React.useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCollectionData(id));
  }, []);

  useEffect(() => {
    setRows(collections);
  }, [collections]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setPic(acceptedFiles[0]);
      setImage(acceptedFiles[0].name);
      setCheck(acceptedFiles[0].type);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFop(reader.result);
        }
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
    [fop, pic]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const validateForm = () => {
    if (
      !image ||
      !name ||
      !description ||
      !supply ||
      !claimMethod ||
      // !blockchain ||
      !salePrice ||
      !collection
    ) {
      toast.error("Please fill all the required fields.");
      return false;
    } else {
      setPopup(!popup);
      // handleSubmit(props);
    }
  };

  const handleSubmit = async (props) => {
    var data = {
      brandID: id,

      name,
      description,
      supply,
      claimMethod,
      // blockchain,
      collectionName: collection,
      collectionID,
      auctionItem: false,
      price: salePrice,
      list_marketplace: showToken,
      nftMinted: props,
    };
    var ops = { data: JSON.stringify(data), image_url: pic };
    const ads = new FormData();
    Object.keys(ops).forEach((key) => ads.append(key, ops[key]));

    try {
      // setPopup(false);
      setLoading(true);
      const res = await Axios.post(
        `${API_BASE_URL}${API_ROUTES.NFT.CREATE_NFT}`,
        ads
      );
      // if (params.nftLength === 0) {
      localStorage.setItem("firstNft", params.nftLength);
      // }
      setName("");
      setPic("");
      setImage("");
      setFop("");
      setDescription("");
      setSupply("");
      setClaimMethod("");
      setBlockchain("");
      setCollection("");
      setCollectionID("");
      // setMin(minted);
      setSalePrice("");
      setShowToken(false);

      setLoading(false);
      setTypes(props);
      setPopup(false);

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleAllCollections = (e) => {
    if (e.target.value == "create-collection") {
      if (
        window.confirm(
          "Are You sure? You are going to create collection page.Remember you will lose the data of this form."
        ) === true
      ) {
        navigate("/create-collection");
      } else {
        setCollection("");
        setCollectionID("");
      }
    } else if (e.target.value == "NFTs") {
      const index = e.target.selectedIndex;
      const el = e.target.childNodes[index];
      const option = el.getAttribute("id");
      setCollection(e.target.value);
      setCollectionID(option);
    } else {
      const index = e.target.selectedIndex;
      const el = e.target.childNodes[index];
      const option = el.getAttribute("id");

      setCollection(e.target.value);
      setCollectionID(option);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          {/* {console.log(params.nftLength)} */}
          {/* <WelcomeDialog nftPopup={nftPopup} setNftPopup={setNftPopup} /> */}
          <div className="container admin-container">
            <NFTDialog
              popup={popup}
              setPopup={setPopup}
              handleSubmit={handleSubmit}
              types={types}
            />

            <div className="row ">
              <div className="col-12 admin-box-wrappercol-sm-12 col-md-12 col-lg-2">
                <VerticalTab />
              </div>
              {/* <div className="d-flex flex-column"> */}
              <div className="col-12 col-sm-12 col-md-12 col-lg-8 ">
                <div className="pr-lg-5  ">
                  <div className="mb-5 mt-2">
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

                  <div className="heading ">
                    <h1 className="font-weight-bold nft-titles item-title">
                      Create An NFT!
                    </h1>
                    <p className="create-nft-text">
                      Create NFTs and add them to your products for sale.
                    </p>
                  </div>
                  <div className="nft-pic  ">
                    <div className="d-flex justify-content-between pt-3 pb-2 ">
                      <div className="">
                        <span>
                          <p>
                            {" "}
                            <span className="require-icon">*</span>Required
                            fields
                          </p>
                        </span>
                        <span>
                          <h5 className="font-weight-bold">
                            NFT Image <span className="require-icon">*</span>
                          </h5>

                          <p className="create-nft-text">
                            This will be the image for your NFT, and will be
                            shown on your products page and on the Blockchain.
                          </p>
                        </span>
                      </div>
                    </div>

                    <div
                      {...getRootProps()}
                      className="drag-parent form-control d-flex justify-content-center align-items-center"
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <div>
                          <p
                            style={{ color: "#3bb777" }}
                            className="text-center break-word  font-weight-bold"
                          >
                            {image}
                          </p>
                          <div className="d-flex justify-content-center">
                            <ImUpload size={30} />
                          </div>
                          <div className="pt-3 text-center">
                            <p style={{ color: "#999999" }}>
                              PNG, GIF, WEBP or JPG
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="details-section pt-5 ">
                    <div className="">
                      <h4 className="font-weight-bold">NFT Information</h4>

                      <div className="form mt-4">
                        <div className="form-group">
                          <label for="pwd" className="forms-labelss">
                            Name <span className="require-icon">*</span>
                          </label>
                          <div className="home-data nft-desc">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Ex: Brand Spring Collection –NFT Name #1"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label for="pwd" className="forms-labelss">
                            Description <span className="require-icon">*</span>
                          </label>
                          <div className="home-data nft-desc">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Ex: Brand’s NFT Name #1 for the Brand Spring Collection 2023."
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group  ">
                          <div className="d-flex justify-content-between handle-items">
                            <div className="home-data nft-desc mr-2">
                              <label for="pwd" className="forms-labelss">
                                Max Supply{" "}
                                <span className="require-icon">*</span>
                              </label>
                              <input
                                className="form-control"
                                type="number"
                                placeholder="Ex : 1000"
                                value={supply}
                                onChange={(e) => setSupply(e.target.value)}
                              />
                            </div>

                            <div className="home-data nft-desc select-parent mr-2 dropdown-child">
                              <label for="pwd" className="forms-labelss">
                                Claim Method{" "}
                                <span className="require-icon">*</span>
                              </label>
                              <select
                                name=""
                                className="create-nft-select-tag"
                                value={claimMethod}
                                onChange={(e) => setClaimMethod(e.target.value)}
                              >
                                <option value="purchase"> With Purchase</option>
                              </select>
                            </div>

                            <div className="home-data nft-desc select-parent dropdown-child">
                              <label for="pwd" className="forms-labelss">
                                Collection{" "}
                                <span className="require-icon">*</span>
                              </label>
                              <select
                                name=""
                                className="create-nft-select-tag"
                                value={collection}
                                onChange={handleAllCollections}
                              >
                                <option value="" selected disabled hidden>
                                  Select
                                </option>
                                <option
                                  value="create-collection"
                                  style={{ visibility: "hidden" }}
                                >
                                  Create Collection
                                </option>
                                {/* <option value="NFTs" id="0">
                                  NFTs
                                </option> */}

                                {rows?.map((row) => (
                                  <option value={row.name} id={row.id}>
                                    {row.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        {/* 
                        <div className="home-data nft-desc select-parent mt-4">
                          <label for="pwd" className="forms-labelss">
                            Blockchain <span className="require-icon">*</span>
                          </label>
                          <p className="create-nft-text">
                            Select the default blockchain where you would like
                            NFTs from this collection to be added
                          </p>
                          <select
                            name=""
                            className="create-nft-select-tag w-50"
                            value={blockchain}
                            onChange={(e) => setBlockchain(e.target.value)}
                          >
                            <option value="" selected disabled hidden>
                              Select
                            </option>

                            <option value="polygon">Polygon</option>
                          
                          </select>
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
                              />
                            </div>
                          </div>
                          <div className="home-data nft-desc">
                            <p className="create-nft-text">
                              NFT will be available for purchase once you add
                              the NFT product widget to your brand storefront.
                            </p>
                          </div>
                        </div>

                        <div className="form-group mt-4">
                          <label for="pwd" className="forms-labelss">
                            Sale price <span className="require-icon">*</span>
                          </label>
                          <div className="home-data nft-desc">
                            <input
                              className="form-control"
                              type="number"
                              placeholder="19.99"
                              value={salePrice}
                              onChange={(e) => setSalePrice(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* <div className="form-group mt-4">
                        <label for="pwd" className="forms-labelss">
                          Selling Limit <span className="require-icon">*</span>
                        </label>
                        <div className="home-data nft-desc">
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Ex : 10"
                            value={sellingLimit}
                            onChange={(e) => setSellingLimit(e.target.value)}
                          />
                        </div>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* second section  */}
              <div className="col-10 col-sm-8 col-md-6 col-lg-4 ml-lg-10">
                <div className="pt-5 mt-1">
                  <div className="d-flex justify-content-between align-items-center my-1">
                    <div className="">
                      <h6 className="font-weight-bold pb-2 m-auto">
                        PREVIEW NFT
                      </h6>
                    </div>
                    {/* <div>
                    {fop ? (
                      <RiDeleteBin6Line
                        size={22}
                        onClick={() => setFop("")}
                        className="delete-icon"
                      />
                    ) : (
                      ""
                    )}
                  </div> */}
                  </div>
                  <div className="">
                    {/* {fop ? (
                <>
                  {fop && check === "video/mp4" ? (
                    <video
                      className="w-100"
                      controls="controls"
                      style={{ cursor: "pointer" }}
                    >
                      <source src={fop} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={fop}
                      className="w-100"
                      style={{ borderRadius: "20px" }}
                    />
                  )}
                </>
              ) : (
                <img
                  src="/assets/images/wave-v.png"
                  className="w-100"
                  style={{ borderRadius: "20px" }}
                />
              )} */}
                    {fop ? (
                      <img
                        src={fop ? fop : pic}
                        className="w-100"
                        style={{ borderRadius: "20px" }}
                      />
                    ) : (
                      <img
                        src="/assets/images/wave-v.png"
                        className="w-100"
                        style={{ borderRadius: "20px" }}
                      />
                    )}
                  </div>

                  {/* box  */}

                  <div
                    className="box  buy-now-box p-3 "
                    style={{ top: "-2rem" }}
                  >
                    <div className="d-flex justify-content-between ">
                      <span>
                        <h5 className="font-weight-bold">
                          {/* Niftmint 22’ Austin Tx Conference NFT */}
                          {name ? name : "NFT Name"}
                        </h5>
                      </span>
                      <span className="font-weight-bold">
                        <AiOutlineHeart size={30} />
                      </span>
                    </div>
                    <div className="d-flex pt-1 pb-1 ">
                      <div className="d-flex flex-column  mr-4">
                        <span className="nft-head "> Price</span>
                        <span className="font-weight-bold pt-1 d-flex align-items-center">
                          {/* <GiDiamonds />  */}
                          <img src="/assets/images/createItemImage.png" />
                          <span className="pl-1">
                            {salePrice ? salePrice : "0"}
                          </span>
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="nft-head">Likes</span>
                        <span className="font-weight-bold pt-1 d-flex align-items-center">
                          <AiTwotoneHeart className="mr-2" /> 0
                        </span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between pt-3 pb-1">
                      <div className="d-flex">
                        <div className="pr-1">
                          <img
                            //   src="/assets/images/favicon.png"
                            src="/assets/images/rock.jpg"
                            alt=""
                            className="buy-user-img"
                            style={{
                              borderRadius: "50%",
                              objectFit: "cover",
                              height: "40px",
                              width: "40px",
                            }}
                          />
                          {/* <img
                      src="/assets/images/rock.jpg"
                      alt="user-profile"
                      className="bio-img"
                    /> */}
                        </div>
                        <div className="d-flex align-items-center">
                          <h6 style={{ margin: "auto" }}>
                            {" "}
                            @{brandName ? brandName : "brand"}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="w-100"
                    style={{ marginTop: "-1rem", marginBottom: "47px" }}
                  >
                    <button onClick={validateForm} className="w-100 bigco-btn">
                      Mint
                    </button>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateNft;

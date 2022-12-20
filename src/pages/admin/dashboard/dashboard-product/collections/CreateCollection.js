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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import VerticalTab from "../../../../../components/vertical-tabs/VerticalTab";
import { API_BASE_URL, API_ROUTES } from "../../../../../constants/ApiBaseUrl";
import CollectionDialog from "../../../../../components/dialog modal/bigcommerce-dialog/CollectionDialog";
import Spinner from "../../../../../components/spinner/Spinner";
import WelcomeBigco from "../../../admin-auth/bigcommerce/WelcomeBigco";
import WelcomeDialog from "../../../../../components/dialog modal/bigcommerce-dialog/WelcomeDialog";

const CreateCollection = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [fop, setFop] = useState("");

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("collectible");
  const [addCategory, setAddCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [blockchain, setBlockchain] = useState("Polygon");
  const [mintType, setMintType] = useState("Ondemand");
  const [smartContract, setSmartContract] = useState("ERC-721");
  const [payment, setPayment] = useState("");
  const [pic, setPic] = useState("");
  const [popup, setPopup] = useState(false);
  const [op, setOp] = React.useState(false);

  const [collect, setCollect] = useState(true);

  const [showCategory, setShowCategory] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [showMarket, setShowMarket] = useState(false);
  const [check, setCheck] = useState("");
  const [collectionPopup, setCollectionPopup] = React.useState(true);
  const [nftPopup, setNftPopup] = React.useState(false);

  const navigate = useNavigate();

  const onDrop = useCallback(
    (acceptedFiles) => {
      setPic(acceptedFiles[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFop(reader.result);
        }
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
    [pic, fop]
  );

  const { id, visited } = useSelector(
    (state) => state.BrandReducer.currentUser
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const validateForm = () => {
    if (!pic || !name) {
      toast.error("Please fill all the required fields.");
      return false;
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // var cat;
    // if (!addCategory) {
    //   cat = [category];
    // } else if (!category) {
    //   cat = [addCategory];
    // } else if (addCategory && category) {
    //   cat = [category, addCategory];
    // }

    var data = {
      brandID: id,

      name: name,
      description: desc,
      categories: [category],
      // token_gated: showToken,
      // platform: platform,
      blockchain,
      mintType,
      smartContract,
      // is_visible: showMarket,
    };
    var collectionInfo = { data: JSON.stringify(data), image_url: pic };
    const collectionData = new FormData();
    Object.keys(collectionInfo).forEach((key) =>
      collectionData.append(key, collectionInfo[key])
    );

    try {
      setLoading(true);
      const res = await Axios.post(
        `${API_BASE_URL}${API_ROUTES.COLLECTION.CREATE_COLLECTION}`,
        collectionData,

        {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        }
      );

      setTimeout(function () {
        setLoading(false);
      }, 1000);
      setName("");
      setPic("");
      setImage("");
      setDesc("");
      setCategory("");
      setAddCategory("");
      setShowToken("");
      setPlatform("");
      setMintType("");
      setSmartContract("");
      setBlockchain("");
      setPayment("");
      setShowMarket("");

      setPopup(true);

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.details);
      setLoading(false);
    }
  };
  const thirdVisit = localStorage.getItem("thirdVisited");
  const fourVisit = localStorage.getItem("fourVisited");

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          {!visited && (!thirdVisit || (!fourVisit && nftPopup)) ? (
            <WelcomeDialog
              collectionPopup={collectionPopup}
              setCollectionPopup={setCollectionPopup}
              setNftPopup={setNftPopup}
              nftPopup={nftPopup}
            />
          ) : (
            ""
          )}
          <div className="container admin-container">
            <CollectionDialog
              popup={popup}
              setPopup={setPopup}
              handleSubmit={handleSubmit}
              op={op}
              fourVisit={fourVisit}
              setNftPopup={setNftPopup}
            />

            <div className="row ">
              <div className="col-12 admin-box-wrappercol-sm-12 col-md-12 col-lg-2">
                <VerticalTab />
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-8 ">
                <div className="pr-lg-5 ">
                  <div className="mb-5 mt-2">
                    <img
                      src="/assets/images/Arrow.png"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/collections-list")}
                      // onClick={() => dispatch(showCollectionData(false))}
                    />

                    <span
                      className="forms-labels text-dark pl-2"
                      style={{ fontSize: "20px" }}
                    >
                      Collections
                    </span>
                  </div>
                  <div className="heading ">
                    <h1 className="font-weight-bold nft-titles">
                      Create A Collection!
                    </h1>
                    <p className="create-nft-text">
                      In just a few steps, create and customize a collection
                      <br />
                      that best meets the needs of your brand.
                    </p>
                  </div>
                  <div className="nft-pic  ">
                    <div className="d-flex justify-content-between pt-3 pb-2 ">
                      <div className="">
                        <span>
                          <p>
                            <span className="require-icon">*</span>
                            Required fields
                          </p>
                        </span>
                        <span>
                          <h5 className="font-weight-bold">
                            Collection Image{" "}
                            <span className="require-icon">*</span>
                          </h5>

                          <p className="create-nft-text">
                            This image will be used to feature your collection
                            on your dashboard and category pages.
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
                            className="text-center font-weight-bold break-word"
                          >
                            {pic.name ? pic.name : pic}
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
                      <h4 className="font-weight-bold">
                        Collection Information
                      </h4>

                      <div className="form mt-4">
                        <div className="form-group">
                          <label for="pwd" className="forms-labelss">
                            Name <span className="require-icon">*</span>
                          </label>
                          <div className="home-data nft-desc">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Ex: Brand Spring Collection 2023"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label for="pwd" className="forms-labelss">
                            Description
                          </label>
                          <div className="home-data nft-desc">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Ex: Brand’s Limited NFT Release Celebrating Brand’s Spring Collection 2023"
                              value={desc}
                              onChange={(e) => setDesc(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="home-data nft-desc select-parent ">
                          {" "}
                          <label for="pwd" className="forms-labelss">
                            Category
                          </label>
                          <p className="create-nft-text">
                            Adding a catagory will make it easier for customers
                            to discover your product.
                          </p>
                          <select
                            name=""
                            className="create-nft-select-tag w-50"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="" selected disabled hidden>
                              Select
                            </option>

                            <option value="collectible"> Collectible</option>
                            <option
                              value="giveaway"
                              selected="true"
                              disabled="disabled"
                              className="text-muted"
                            >
                              {" "}
                              Giveaway (coming soon)
                            </option>
                            <option
                              value="promotion"
                              selected="true"
                              disabled="disabled"
                              className="text-muted "
                            >
                              {" "}
                              Promotion (coming soon)
                            </option>
                            <option
                              value="exclusive"
                              selected="true"
                              disabled="disabled"
                              className="text-muted "
                            >
                              {" "}
                              Exclusive (coming soon)
                            </option>
                          </select>
                          <br />
                          {/* {showCategory ? (
                            <div className="home-data nft-desc mt-4">
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Add Category"
                                value={addCategory}
                                onChange={(e) => setAddCategory(e.target.value)}
                              />
                            </div>
                          ) : (
                            ""
                          )} */}
                          {/* <div className="pt-4">
                            <button
                              className="dialog-btn"
                              onClick={() => setShowCategory(!showCategory)}
                            >
                              Add category
                            </button>
                          </div> */}
                        </div>
                        {/* <div className="form-group mt-4">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <label for="pwd" className="forms-labelss">
                                Token Gated Community
                              </label>
                            </div>

                            <div>
                              <CustomizedSwitches
                                handleToken={true}
                                setShowToken={setShowToken}
                                showToken={showToken}
                              />
                            </div>
                          </div>
                          <div className="home-data nft-desc">
                            <p className="create-nft-text">
                              Access will be granted after successful
                              transaction
                            </p>
                          </div>
                        </div> */}
                        {/* <div className="home-data nft-desc select-parent w-50">
                          <label for="pwd" className="forms-labelss">
                            Platform
                          </label>
                          <select
                            name=""
                            className="create-nft-select-tag "
                            disabled={!showToken}
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                          >
                            <option value="" selected disabled hidden>
                              Select
                            </option>
                            <option value="Telegram">Telegram</option>
                          
                          </select>
                        </div> */}
                        <div className="home-data nft-desc select-parent mt-4">
                          <label for="pwd" className="forms-labelss">
                            Blockchain <span className="require-icon">*</span>
                          </label>
                          <p className="create-nft-text">
                            Select the default blockchain where you would like
                            NFTs from this collection to be created.
                          </p>
                          <select
                            name=""
                            className="create-nft-select-tag w-50"
                            value={blockchain}
                            onChange={(e) => setBlockchain(e.target.value)}
                          >
                            {/* <option value="" selected disabled hidden>
                              Select
                            </option> */}
                            <option value="Polygon">Polygon</option>

                            <option
                              selected="true"
                              disabled="disabled"
                              className="text-muted "
                            >
                              Harmony (coming soon)
                            </option>
                            <option
                              selected="true"
                              disabled="disabled"
                              className="text-muted "
                            >
                              Stacks (coming soon)
                            </option>
                          </select>
                        </div>
                        <div className="home-data nft-desc select-parent mt-4">
                          <label for="pwd" className="forms-labelss">
                            Smart Contract{" "}
                            <span className="require-icon">*</span>
                          </label>
                          <p className="create-nft-text">
                            Select the default token for your collection.
                          </p>
                          <select
                            name=""
                            className="create-nft-select-tag w-50"
                            value={smartContract}
                            onChange={(e) => setSmartContract(e.target.value)}
                          >
                            <option value="ERC-721">ERC-721</option>
                            <option
                              selected="true"
                              disabled="disabled"
                              className="text-muted "
                            >
                              ERC-1155 (coming soon)
                            </option>
                          </select>
                        </div>{" "}
                        <div className="home-data nft-desc select-parent mt-4">
                          <label for="pwd" className="forms-labelss">
                            Minting <span className="require-icon">*</span>
                          </label>
                          <p className="create-nft-text">
                            How would you like to mint NFTs in your collection?
                          </p>
                          <select
                            name=""
                            className="create-nft-select-tag w-50"
                            value={mintType}
                            onChange={(e) => setMintType(e.target.value)}
                          >
                            {/* <option value="" selected disabled hidden>
                              Select
                            </option> */}
                            {/* <option value="preminted">Pre-mint</option>
                            <option value="postminted">Post-mint</option> */}
                            <option value="Ondemand">Mint On demand</option>
                            <option
                              selected="true"
                              disabled="disabled"
                              className="text-muted "
                            >
                              Pre-mint (coming soon)
                            </option>
                            <option
                              selected="true"
                              disabled="disabled"
                              className="text-muted "
                            >
                              Post-mint (coming soon)
                            </option>
                          </select>
                        </div>
                        {/* <div className="form-group mt-4">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <label for="pwd" className="forms-labelss">
                                List Collection on Brand Storefront
                              </label>
                            </div>

                            <div>
                              <CustomizedSwitches
                                setShowMarket={setShowMarket}
                                showMarket={showMarket}
                              />
                            </div>
                          </div>
                          <div className="home-data nft-desc">
                            <p className="create-nft-text">
                              Your collection will be available to purchase on
                              your brands storefront
                            </p>
                          </div>
                        </div> */}
                        {/* {showMarket ? (
                        <div className="home-data nft-desc select-parent mt-4 mb-3">
                          <label for="pwd" className="forms-labelss">
                            Payment Options
                          </label>
                          <p className="create-nft-text">
                            Select the default method of payment for NFTs in
                            this collection.
                          </p>
                          <select
                            name=""
                            className="create-nft-select-tag w-50"
                            value={payment}
                            onChange={(e) => setPayment(e.target.value)}
                          >
                            <option value="" selected disabled hidden>
                              Select
                            </option>
                            <option value="credit/debit">Credit/Debit</option>
                          </select>
                        </div>
                      ) : (
                        ""
                      )} */}
                        {/* <br /> */}
                        {/* <div className="mt-4">
                        <button className="bigco-btn mr-4">
                            Save as Draft
                          </button>
                          <button className="bigco-btn " onClick={validateForm}>
                            Create Collection
                          </button>
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
                        PREVIEW COLLECTION
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
                  ) : ( */}
                    {fop || pic ? (
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
                  <div className="mt-4">
                    <button className="bigco-btn w-100" onClick={validateForm}>
                      Create Collection
                    </button>
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

export default CreateCollection;

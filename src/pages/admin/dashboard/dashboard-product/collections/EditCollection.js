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
import Spinner from "../../../../../components/spinner/Spinner";

const EditCollection = () => {
  const [loading, setLoading] = React.useState(false);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [names, setNames] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [blockchain, setBlockchain] = useState("Polygon");
  const [categoryID, setCategoryID] = useState("");
  const [op, setOp] = useState(false);
  const [edit, setEdit] = useState(false);

  const [mintType, setMintType] = useState("Ondemand");
  const [smartContract, setSmartContract] = useState("ERC-721");

  const [payment, setPayment] = useState("");
  const [pic, setPic] = useState("");
  const [popup, setPopup] = useState(false);

  const [checkToken, setCheckToken] = useState(false);

  const [showCategory, setShowCategory] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [showMarket, setShowMarket] = useState(false);
  const [check, setCheck] = useState("");

  const [fop, setFop] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    getCollectionById();
  }, [params]);

  var catID;
  const getCollectionById = async () => {
    try {
      setLoading(true);
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
        // payment_options,
        mintType,
        smartContract,
        list_marketplace,
      } = data;
      setName(name);
      setPic(image_url);
      setDesc(description);
      // setCat(categories);
      setCategory(categories[0]);
      setAddCategory(categories[1]);

      setShowToken(token_gated);
      setPlatform(platform);
      setMintType(mintType);
      setSmartContract(smartContract);
      setBlockchain(blockchain);
      // setPayment(payment_options);

      setShowToken(token_gated);
      setShowMarket(list_marketplace);
      setCategoryID(categoryID);
      setCheckToken(token_gated);
      setTimeout(function () {
        setLoading(false);
      }, 2000);
      // if(categories.length==1){
      //  setAddCategory(categories[1]);
      //  setCategory(categories[0]);
      // }else if(categories.length==1){

      // }
      // else{

      // }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setPic(acceptedFiles[0]);
      // setImage(acceptedFiles[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFop(reader.result);
        }
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
    [pic, check, fop]
  );

  const { id } = useSelector((state) => state.BrandReducer.currentUser);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const validateForm = () => {
    // if (!pic || !name || !blockchain) {
    if (!pic || !name) {
      toast.error("Please fill all the required fields.");
      return false;
    } else {
      // setPopup(!popup);
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    var cat;
    if (!addCategory) {
      cat = [category];
    } else if (!category) {
      cat = [addCategory];
    } else if (addCategory && category) {
      cat = [category, addCategory];
    }

    var data = {
      brandID: id,

      name: name,
      description: desc,
      categories: cat,
      // token_gated: showToken,
      // platform: platform,
      blockchain: blockchain,
      mintType: mintType,
      // payment_options: payment,
      smartContract: smartContract,
      // list_marketplace: showMarket,
    };
    var ops = { data: JSON.stringify({ ...data }), image_url: pic };
    const ads = new FormData();
    Object.keys(ops).forEach((key) => ads.append(key, ops[key]));

    try {
      // setLoading(true);
      const res = await Axios.put(
        `${API_BASE_URL}${API_ROUTES.COLLECTION.UPDATE_COLLECTION}${params.id}`,
        ads,

        {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        }
      );
      // setLoading(false);
      toast("Collection Updated Successfully ");
      navigate("/collections-list");
    } catch (error) {
      toast.error(error.response.data.message);
      // setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="container admin-container">
          <div className="row ">
            <div className="col-12 admin-box-wrappercol-sm-12 col-md-12 col-lg-2">
              <VerticalTab />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-8  ">
              <div className="pr-lg-5 ">
                <div className="mb-5 mt-2">
                  <img
                    src="/assets/images/Arrow.png"
                    alt=""
                    className=" "
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/collections-list")}
                    // onClick={() => dispatch(editCollectionData(false))}
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
                    Edit Collection!
                  </h1>
                  <p className="create-nft-text">
                    In just a few steps, create and customize a collection
                    <br />
                    that best meet the needs of your brand.
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
                          This image will be used to feature your collection on
                          your dashboard, category pages, and the Niftmint
                          marketplace.
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
                    <h4 className="font-weight-bold">Collection Information</h4>

                    <div className="form mt-4">
                      <div className="form-group">
                        <label for="pwd" className="forms-labelss">
                          Name <span className="require-icon">*</span>
                        </label>
                        <div className="home-data nft-desc">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Ex : Niftmint 22’ Austin Tx"
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
                            placeholder="Ex : TF Labs Collectible NFT for Austin Web3 Week, featuring Dcentral Austin from June 7th to 8th, and Consensus from June 9th to 12th"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="home-data nft-desc select-parent ">
                        <label for="pwd" className="forms-labelss">
                          Category
                        </label>
                        <p className="create-nft-text">
                          Adding a catagory will make it easier for customers to
                          discover your product.
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

                          <option value="giveaway"> Giveaway</option>
                          <option value="promotion"> Promotion </option>
                          <option value="collectible"> Collectible</option>
                          <option value="exclusive"> Exclusive</option>
                        </select>
                        <br />

                        {showCategory || addCategory ? (
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
                        )}
                        <div className="pt-4">
                          <button
                            className="dialog-btn"
                            onClick={() => setShowCategory(!showCategory)}
                          >
                            Add category
                          </button>
                        </div>
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
                            Access will be granted after successful transaction
                          </p>
                         
                        </div>
                      </div>
                      <div className="home-data nft-desc select-parent w-50">
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
                          NFTs from this collection to be added.
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
                          {/* <option defaultValue="Desc">High To Low</option> */}
                        </select>
                      </div>
                      <div className="home-data nft-desc select-parent mt-4">
                        <label for="pwd" className="forms-labelss">
                          Smart Contract <span className="require-icon">*</span>
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
                          {/* <option value="" selected disabled hidden>
                            Select
                          </option> */}
                          <option value="ERC-721">ERC-721</option>
                          {/* <option defaultValue="ERC-720">ERC-720</option> */}
                        </select>
                      </div>
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
                          {/* {!mintType ? ( */}
                          {/* <option value="" selected disabled hidden>
                            Select
                          </option> */}
                          {/* ) : (
                        ""
                      )}  */}
                          {/* <option value="Pre-mint">Pre-mint</option>
                          <option value="Post-mint">Post-mint</option> */}
                          <option value="On demand">Mint On demand</option>
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
                            {/* <option defaultValue="Desc">High To Low</option> */}
                      {/* </select>
                        </div>
                      ) : (
                        ""
                      )}  */}
                      {/* <br /> */}
                      {/* <div className="mt-3">
                        <button
                          className="bigco-btn"
                          onClick={validateForm}
                        
                        >
                          Save
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
                <div className="mt-3">
                  <button className="w-100 bigco-btn" onClick={validateForm}>
                    Save
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

export default EditCollection;

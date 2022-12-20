import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { HiDotsHorizontal } from "react-icons/hi";
import Axios from "axios";
import { API_BASE_URL, API_ROUTES } from "../../../constants/ApiBaseUrl";
import { toast } from "react-toastify";
import { allCollectionData } from "../../../redux/actions/collectionAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function DashboardPopup({
  collectionTable,
  id,
  nftid,
  setDeleteState,
  nftMinted,
  is_visible,
}) {
  const dispatch = useDispatch();
  const brandId = useSelector((state) => state.BrandReducer.currentUser.id);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShow = () => {
    if (collectionTable) {
      navigate(`/edit-collection/${id}`);
    } else {
      navigate(`/edit-nft/${nftid}`);
    }
  };

  const handleDeleteNft = async () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this NFT ? This action cannot be undone.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      buttons: ["Go Back", "Yes"],
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await Axios.delete(
            `${API_BASE_URL}${API_ROUTES.NFT.DELETE_NFT}${nftid}`
          );

          setDeleteState(nftid);
          setAnchorEl(null);
          toast(res.data.message);
        } catch (error) {
          toast.error(error.response.data.message);
        }
        swal("Your NFT has been deleted!", {
          icon: "success",
        });
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
  };

  const handleDeleteCollection = async () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Collection ? This action cannot be undone.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      buttons: ["Go Back", "Yes"],
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await Axios.delete(
            `${API_BASE_URL}${API_ROUTES.COLLECTION.DELETE_COLLECTION}${id}`
          );

          toast(res.data.message);
          setAnchorEl(null);
          dispatch(allCollectionData(brandId));
          swal("Your Collection has been deleted!", {
            icon: "success",
          });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
  };

  const duplicateNft = async () => {
    try {
      const res = await Axios.post(
        `${API_BASE_URL}${API_ROUTES.NFT.DUPLICATE_NFT}`,
        {
          id: nftid,
          brandID: brandId,
        }
      );
      setDeleteState(nftid);
      toast(res.data.message);
      setAnchorEl(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const changeMintType = async () => {
    try {
      const res = await Axios.post(
        `${API_BASE_URL}${API_ROUTES.NFT.CHANGE_NFT_TYPE}`,
        {
          id: nftid,
          brandID: brandId,
        }
      );
      setDeleteState(nftid);
      toast(res.data.message);
      setAnchorEl(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <HiDotsHorizontal size={23} className="text-dark" />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {collectionTable ? (
            <div>
              <MenuItem onClick={handleShow} disabled>
                Edit
              </MenuItem>
              {/* <MenuItem onClick={changeVisibility}>
                Visibility {!is_visible ? "Enabled" : "Disabled"}
              </MenuItem> */}
              {/* <MenuItem onClick={handleClose}>Make Featured</MenuItem> */}
              {/* <MenuItem onClick={handleClose}>Duplicate</MenuItem> */}
              <MenuItem onClick={handleDeleteCollection} disabled>
                Delete
              </MenuItem>
            </div>
          ) : (
            <div>
              <MenuItem onClick={handleShow} disabled>
                Edit
              </MenuItem>
              {/* {!nftMinted && (
                <MenuItem onClick={changeMintType}>Mint </MenuItem>
              )} */}
              {/* <MenuItem onClick={handleClose}>Make Featured</MenuItem> */}
              {/* <MenuItem onClick={duplicateNft}>Duplicate</MenuItem> */}
              {nftMinted ? (
                <MenuItem onClick={handleDeleteNft}>Delete</MenuItem>
              ) : (
                ""
              )}
            </div>
          )}
        </Menu>
      </div>
    </>
  );
}

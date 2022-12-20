import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiUserShared2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
// import { logoutBrand } from "../../../redux/actions/BrandAction";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon
            style={{
              backgroundColor: "#101010",
              color: "white",
              borderRadius: "25px",
              padding: "4px 4px",
            }}
          />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AdminPopup() {
  const dispatch = useDispatch();
  const { brandName } = useSelector((state) => state.BrandReducer.currentUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [style, setStyle] = useState({ display: "none" });
  const [user, setUser] = useState("");
  const [items, setItems] = useState("");

  const [newPopup, setNewPopup] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setNewPopup(false);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <img
          src="/assets/images/nav-admin-logo.png"
          alt=""
          className="admin-nav-img"
        />
        <span className="">
          <span
            className="font-weight-bold pl-1 popup-username"
            style={{
              textTransform: "none",
              color: "#3bb777",
              fontSize: "17px",
            }}
          >
            @{brandName ? brandName : "brand"}
          </span>
        </span>
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
        {/* <MenuItem
          onClick={() => dispatch(logoutBrand())}
          className="menu-text px-4 py-2 "
        >
          Logout
        </MenuItem> */}
      </Menu>
    </div>
  );
}

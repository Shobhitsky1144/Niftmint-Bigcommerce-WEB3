import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Navigate, useNavigate, Link } from "react-router-dom";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ItemnDialog({
  popup,
  setPopup,

  handleSubmit,
  types,
}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (popup) {
      handleClickOpen();
    }
  }, [popup]);

  const handleClickOpen = () => {
    setOpen(true);
    // setPopup(false);
  };
  const handleClose = () => {
    setPopup(false);
    setOpen(false);
  };

  const handleMint = () => {
    let type = true;

    handleSubmit(type);
  };
  const handleSoftmint = () => {
    let type = false;

    handleSubmit(type);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="p-5"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <img src="/assets/images/newlogo.png" alt="" />
        </DialogTitle>

        <DialogContent dividers>
          <h4 className="font-weight-bold pt-2">
            {
              popup
                ? "Are You Sure?"
                : // : types
                  "NFTs Successfully Minted!"
              // : "NFTs Successfully Soft Minted!"
            }
          </h4>
          <Typography
            gutterBottom
            style={{ fontSize: "16px" }}
            className="pt-2"
          >
            {
              popup
                ? "if you are unsure, select Go Back to continue editing. Otherwise, press Mint to create your NFTs."
                : // : types
                  "Your NFTs have been minted and are now reflected in your NFTs page."
              // : "Your NFTs have been soft minted and are reflected in your Nfts page."
            }
          </Typography>
        </DialogContent>
        <DialogActions className="mt-4">
          <div className=" d-flex">
            <div className="">
              {popup ? (
                <button
                  className=" mr-4 bigco-btn"
                  onClick={() => navigate("/nfts-list")}
                >
                  Go Back
                </button>
              ) : (
                <button
                  className="bigco-btn"
                  onClick={() => {
                    setOpen(false);
                    navigate("/nfts-list");
                  }}
                >
                  Done
                </button>
              )}
            </div>
            <div className="">
              {popup ? (
                <button className="bigco-btn" onClick={handleMint}>
                  {" "}
                  Mint
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

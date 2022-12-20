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
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  showCollectionData,
  editCollectionData,
} from "../../../redux/actions/collectionAction";

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

export default function CollectionDialog({
  popup,
  setPopup,
  setShow,
  handleSubmit,
  fourVisit,
  setNftPopup,
}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (popup === true) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [popup]);

  const handleClose = () => {
    setPopup(false);
    setOpen(false);
  };

  const handleCollection = () => {
    if (!fourVisit) {
      setOpen(false);
      setNftPopup(true);
    } else {
      navigate("/collections-list");
    }
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="p-5"
      >
        <>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <img src="/assets/images/newlogo.png" alt="" />
          </DialogTitle>

          <DialogContent dividers>
            <h4 className="font-weight-bold pt-2">
              Collection Successfuly Created!
            </h4>
            <Typography
              gutterBottom
              style={{ fontSize: "16px" }}
              className="pt-2"
            >
              Your collection has been created and the Smart Contracts have been
              successfully deployed. These are now reflected in your
              Collections.
            </Typography>
          </DialogContent>

          <DialogActions className="mt-4">
            <>
              <div className=" ">
                <div className="">
                  <button
                    className="bigco-btn"
                    // onClick={handleCollection}
                    onClick={() => navigate("/collections-list")}
                  >
                    Done
                  </button>
                </div>
              </div>
            </>
          </DialogActions>
        </>
      </Dialog>
    </>
  );
}

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
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
export default function WelcomeDialog({
  collectionPopup,
  setCollectionPopup,
  nftPopup,
  context,
  setNftPopup,
  builderPopup,
  setBuilderPopup,
  setCheckLength,
  checkLength,
}) {
  const [open, setOpen] = React.useState(true);
  const [isNext, setIsNext] = React.useState(false);
  const isVisited = useSelector(
    (state) => state.BrandReducer.currentUser.visited
  );

  const firstVisit = localStorage.getItem("firstVisited");
  const secondVisit = localStorage.getItem("secondVisited");
  const thirdVisit = localStorage.getItem("thirdVisited");
  const fourVisit = localStorage.getItem("fourVisited");
  const nftVisit = localStorage.getItem("firstNft");

  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      !isVisited &&
      (open || collectionPopup || nftPopup || builderPopup || checkLength)
    ) {
      handleClickOpen();
    }
  }, [open, collectionPopup, nftPopup, builderPopup, checkLength]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (collectionPopup) {
      setOpen(false);
      setCollectionPopup(false);
      localStorage.setItem("thirdVisited", true);
    } else if (!isNext && firstVisit == null) {
      setIsNext(true);
      localStorage.setItem("firstVisited", true);
    } else if (secondVisit == null) {
      setOpen(false);
      localStorage.setItem("secondVisited", true);
      // navigate("/create-collection");
    } else if (nftPopup) {
      setOpen(false);
      setNftPopup(false);
      localStorage.setItem("fourVisited", true);
    } else if (builderPopup) {
      setOpen(false);
      setBuilderPopup(false);
    } else if (checkLength) {
      localStorage.removeItem("firstNft");
      setCheckLength(false);
    } else {
      setOpen(false);
    }
  };

  const handleNft = () => {
    localStorage.removeItem("firstNft");
    setCheckLength(false);
    navigate("/create-nft/1");
  };

  const handleModal = () => {
    localStorage.setItem("secondVisited", true);
    navigate("/create-collection");
  };

  const handleFirst = () => {
    setIsNext(true);
    localStorage.setItem("firstVisited", true);
  };
  const handleCreateNft = () => {
    setOpen(false);
    setNftPopup(false);
    localStorage.setItem("fourVisited", true);
    nftVisit == null ? navigate("/create-nft/0") : navigate("/create-nft/1");
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {/* <img src="/assets/images/newlogo.png" alt="" /> */}
        </DialogTitle>
        <DialogContent dividers>
          {/* {console.log(firstVisit)} */}

          <div className="container d-flex justify-content-center align-items-center my-3">
            <div className="row">
              <div className="col-lg-12">
                <div className="bigco-wrapper text-center">
                  <div className="img-container ">
                    <img src="/assets/images/NiftmintLogo1.png" alt="logo" />
                  </div>
                  <div className="bigco-content">
                    <h3 className="font-weight-bold">
                      {collectionPopup && thirdVisit == null ? (
                        <>Create your Collection</>
                      ) : nftPopup && fourVisit == null ? (
                        "Create an NFT"
                      ) : builderPopup ? (
                        "Go to your Page Builder"
                      ) : checkLength ? (
                        <>
                          Congratulation on creating <br />
                          your first NFT!
                        </>
                      ) : !isNext && firstVisit == null ? (
                        <>
                          Welcome to your Niftmint <br /> Dashboard!
                        </>
                      ) : secondVisit == null ? (
                        <>
                          Create your first NFT <br />
                          Collection.
                        </>
                      ) : (
                        ""
                      )}
                    </h3>
                    <h5 className="py-3">
                      {collectionPopup && thirdVisit == null ? (
                        <>
                          {" "}
                          Your NFTs will be created from <br />
                          Collections, think of it as your NFT <br />
                          Factory. Add the details about your
                          <br /> collection.
                        </>
                      ) : nftPopup && fourVisit == null ? (
                        <>
                          Now that you have created your first <br />
                          collection its time to create your first NFT.
                          <br /> You can create as many NFTs as you’d like{" "}
                          <br />
                          in each collection.
                        </>
                      ) : builderPopup ? (
                        <>
                          Add your NFTs to your BigCommerce Store <br />
                          by going to the Page Builder and selecting
                          <br /> the various NFT Widgets.
                        </>
                      ) : checkLength ? (
                        <>
                          You can create more NFTs, create <br /> another
                          collection, or go to the Big
                          <br />
                          Commerce Page Builder to add
                          <br /> your NFT to your site.
                        </>
                      ) : !isNext && firstVisit == null ? (
                        <>Lets get started!.</>
                      ) : secondVisit == null ? (
                        <>
                          Collections are the first step in <br />
                          Making, Marketing, and Selling your <br /> NFTs.
                        </>
                      ) : (
                        ""
                      )}
                    </h5>
                  </div>
                  <div className="bigcobtn-wrapper py-4">
                    {collectionPopup && thirdVisit == null ? (
                      <>
                        <button className="bigco-btn " onClick={handleClose}>
                          Create Collection
                        </button>
                      </>
                    ) : nftPopup && fourVisit == null ? (
                      <button className="bigco-btn " onClick={handleCreateNft}>
                        Create Another
                      </button>
                    ) : builderPopup ? (
                      <a
                        href={`https://store-${context}.mybigcommerce.com/manage/page-builder?channelId=1`}
                        target="_blank"
                      >
                        <button className="bigco-btn ">Page Builder</button>
                      </a>
                    ) : checkLength ? (
                      <>
                        <button className="bigco-btn mr-3" onClick={handleNft}>
                          Create Another
                        </button>
                        <a
                          onClick={handleClose}
                          href={`https://store-${context}.mybigcommerce.com/manage/page-builder?channelId=1`}
                          target="_blank"
                        >
                          <button className="bigco-btn ">Page Builder</button>
                        </a>
                      </>
                    ) : !isNext && firstVisit == null ? (
                      <button className="bigco-btn " onClick={handleFirst}>
                        Next
                      </button>
                    ) : secondVisit == null ? (
                      <button className="bigco-btn " onClick={handleModal}>
                        Create Collection
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

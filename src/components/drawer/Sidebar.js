import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../../styles/drawer/drawer.css";
import { BiMenuAltLeft } from "react-icons/bi";

import marketIcon from "../../assets/icons/market-icon.png";
import collectionIcon from "../../assets/icons/collection-icon.png";
import dashboardIcon from "../../assets/icons/dashboard-icon.png";
import analyticIcon from "../../assets/icons/analytic-icon.png";
import walletIcon from "../../assets/icons/wallet-icon.png";
import customerIcon from "../../assets/icons/customers-icon.png";
import settingIcon from "../../assets/icons/setting-icon.png";
import supportIcon from "../../assets/icons/support-icon.png";
import logoutIcon from "../../assets/icons/logout-icon.png";
import BigcoHeader from "../headers/BigcoHeader";

import marketingIcon from "../../assets/icons/marketingIcon.png";
import accountIcon from "../../assets/icons/accountIcon.svg";
import appIcon from "../../assets/icons/appIcon.png";
import houseIcon from "../../assets/icons/house-icon.png";
import profileIcon from "../../assets/icons/profileIcon.png";
import "../../styles/admin/admindashboard.css";

import Badge from "@mui/material/Badge";
import { logoutBrand } from "../../redux/actions/BrandAction";
// import MailIcon from "@mui/icons-material/Mail";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    color: "#3bb777",
    cursor: "unset",
  },

  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(5),
  },
  active: {
    backgroundColor: "red",
  },
  // margin: {
  //   margin: theme.spacing.unit * 2,
  // },
  customBadge: {
    backgroundColor: "#3bb777",
    color: "white",
  },
}));

export default function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // const [active, setActive] = useState(second)
  const classes = useStyles();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = React.useState(false);

  const [domain, setDomain] = React.useState("");
  var params = useParams();

  // var domain;
  useEffect(() => {
    var path = window.location.pathname;

    if (
      path === "/create-collection" ||
      path === "/collections-list" ||
      path === `/create-nft/${params.nftLength}` ||
      path === "/nfts-list" ||
      path == `/edit-collection/${params.id}` ||
      path == `/collection-info/${params.id}` ||
      path == `/edit-nft/${params.id}` ||
      path == `/nft-info/${params.id}` ||
      path === "/FAQs" ||
      path === "/nfts-list" ||
      path === "/page-builder"
    ) {
      setDomain(path);
    }
    // domain = domain.replace("/", "");
    // const capitalized = domain.charAt(0).toUpperCase() + domain.slice(1);
  }, [domain]);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  return (
    <div className="">
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={{ backgroundColor: "white" }}
        >
          <Toolbar>
            <div className="container d-flex justify-content-between align-items-center w-100 pl-1 pr-3 handle-nav">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    // onClick={toggleDrawer}
                    // disabled
                    id="icon"
                    className={classes.menuButton}
                  >
                    {/* <MenuIcon /> */}
                    {/* <BiMenuAltLeft size={40} /> */}
                    <Typography
                      variant="h6"
                      noWrap
                      className="text-dark font-weight-bold pl-3"
                      style={{ fontSize: "23px", fontFamily: "Urbanist" }}
                    >
                      Dashboard
                    </Typography>
                  </IconButton>
                </div>
                <div>
                  {/* <Typography
                    variant="h6"
                    noWrap
                    className="text-dark font-weight-bold"
                    style={{ fontSize: "23px", fontFamily: "Urbanist" }}
                  >
                    Dashboard */}
                  {/* <div>
                {" "}
                <AdminPopup />
              </div>
            </div> */}
                  {/* </Typography> */}
                </div>
              </div>
              <div>
                <span className="d-flex justify-content-between align-items-center">
                  {/* <span className="pr-3">
                  <Badge
                    badgeContent={4}
                    classes={{ badge: classes.customBadge }}
                    className={classes.margin}
                  >
                    <img
                      src="/assets/images/notificationicon1.png"
                      className=" bell-icon"
                    />
                  </Badge>
                </span> */}
                  {/* <img
                    src="/assets/images/notificationicon1.png"
                    className="pr-3 bell-icon"
                  /> */}

                  {/* <AdminPopup /> */}
                </span>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          // variant={isMdUp ? "permanent" : "temporary"}
          variant={"temporary"}
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
          open={open}
          onClose={toggleDrawer}
        >
          {" "}
          <img
            src="/assets/images/newlogo.png"
            alt=""
            style={{ margin: "21px 24px", width: "170px" }}
          />
          {/* <div className={classes.toolbar} /> */}
          <Divider />
          <List>
            {[
              {
                title: "Home",
                image: houseIcon,
                // route: "dashboard",
                // route: "#",
              },
              {
                title: "Store",
                image: marketIcon,
                // route: "market-place",
                // route: "#",
              },
              {
                routes: "collections-list",
                opo: "create-collection",
                title: "Products",
                image: collectionIcon,
                route: "collections-list",

                // routes3: "edit-nft",
              },

              {
                title: "Customers",
                image: customerIcon,
                // route: "dd",
                // route: "#",
              },
              {
                title: "Wallet",
                image: walletIcon,
                // route: "dashboard",
                // route: "#",
              },
            ].map(({ title, image, route, routes, opo }, index) => (
              <>
                {route ? (
                  <Link exact to={`/${route}`} style={{ color: "black" }}>
                    <ListItem
                      button
                      key={index}
                      id={
                        window.location.pathname === `/${route}` ||
                        (title === "Products" &&
                          window.location.pathname === `${domain}`)
                          ? "active"
                          : ""
                      }
                      // style={{ background: "red" }}
                    >
                      {/* || `/${routes}` */}
                      <ListItemIcon>
                        <img src={image} />
                      </ListItemIcon>

                      <ListItemText primary={title} />
                    </ListItem>
                  </Link>
                ) : (
                  <ListItem
                    button
                    key={index}
                    id={
                      window.location.pathname === `/${route}` ? "active" : ""
                    }
                    // style={{ background: "red" }}
                  >
                    <ListItemIcon>
                      <img src={image} />
                    </ListItemIcon>
                    <ListItemText primary={title} />
                  </ListItem>
                )}
              </>
            ))}
            {/* [].map(({(title, image, route)}, index) => (
            <Link exact to={`/${route}`} style={{ color: "black" }}>
              <ListItem
                button
                key={index}
                id={window.location.pathname === `/${route}` ? "active" : ""}
                // style={{ background: "red" }}
              >
                <ListItemIcon>
                  <img src={image} />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            </Link> */}
          </List>
          <Divider />
          <List>
            {[
              {
                title: "Marketing",
                image: marketingIcon,
                // route: "create-collection",
                // route: "#",
              },
              {
                title: "Analytics",
                image: analyticIcon,
                // route: "create-item",
                // route: "#",
              },
              {
                title: "Apps",
                image: appIcon,
                // route: "apps",
                // route: "dashboard",
                // route: "connect-bigcommerce",
              },
            ].map(({ title, image, route }, index) => (
              <>
                {route ? (
                  <Link exact to={`/${route}`} style={{ color: "black" }}>
                    {" "}
                    <ListItem
                      button
                      key={index}
                      id={
                        window.location.pathname === `/${route}` ? "active" : ""
                      }
                    >
                      <ListItemIcon>
                        <img src={image} />
                      </ListItemIcon>
                      <ListItemText primary={title} />
                    </ListItem>
                  </Link>
                ) : (
                  <ListItem
                    button
                    key={index}
                    id={
                      window.location.pathname === `/${route}` ? "active" : ""
                    }
                  >
                    <ListItemIcon>
                      <img src={image} />
                    </ListItemIcon>
                    <ListItemText primary={title} />
                  </ListItem>
                )}
              </>
            ))}
          </List>
          <Divider />
          <List>
            {[
              {
                title: "Settings",
                image: settingIcon,
                // route: "dashboard",
                route: "#",
              },
              {
                title: "Account Settings",
                image: accountIcon,
                // route: "dashboard",
                route: "#",
              },
              {
                title: "My Profile",
                image: profileIcon,
                // route: "dashboard",
                route: "#",
              },
              {
                title: "Support",
                image: supportIcon,
                // route: "dashboard",
              },
              // {
              //   title: "Logout",
              //   image: logoutIcon,
              //   // route: "dashboard",
              // },
            ].map(({ title, image }, index) => (
              <ListItem button key={index}>
                <ListItemIcon>
                  <img src={image} />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            ))}
            {/* <ListItem
              onClick={() => dispatch(logoutBrand())}
              style={{ cursor: "pointer" }}
            >
              <ListItemIcon>
                {" "}
                <img src={logoutIcon} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem> */}
          </List>
        </Drawer>
      </div>
    </div>
  );
}

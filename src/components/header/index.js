import React, { useContext, useState } from "react";
import { header, headerText } from "../theme";
import { AppBar, Toolbar, Avatar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import clsx from "clsx";
// import { userProfilePhoto } from '../../config/apiConfig';
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import { Link } from "react-router-dom";
import "./header.css";
import Loader from "../loader";
import walmartLogo from "../../assets/images/walmart-logo.png";
import { ShoppingCart } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { UserContext } from "../context/UserContext";
import { LoaderContext } from "../context/LoaderContext";
import { SignInContext } from "../context/SignInContext";

const CartIcon = ({ cartCount }) => {
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit', // Inherit the color from the parent element
  };
  return (
    <Link to="/cart" style={linkStyle}>
    <Badge badgeContent={cartCount} color="secondary">
      <ShoppingCart />
    </Badge>
    </Link>
  );
};

const drawerWidth = 240;
const styles = (theme) => ({
  logo: {
    height: 80,
    width: 200,
  },
  color: {
    backgroundColor: header,
    color: headerText,
  },
  toolBar: {
    justifyContent: "space-between",
  },
  leftDiv: {
    justifyContent: "space-around",
    width: "35%",
    padding: "10px",
    alignItems: "center",
    margin: "10px",
    display: "flex",
    flexDirection: "row",
  },
  userName: {
    flexDirection: "column",
    display: "contents",
  },
  hide: {
    display: "none",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
    backgroundColor: header,
    color: headerText,
    height: "95px",
  },
  select: {
    color: headerText,
    backgroundColor: header,
  },
  icon: {
    fill: headerText,
  },
  authedContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const Header = ({ classes, cartCount }) => {
  const [open, setOpen] = useState(false);
  const { authedUser, handleAuthedUser } = useContext(UserContext);
  const { signOut } = useContext(SignInContext);
  const { isLoading, showLoader, hideLoader } = useContext(LoaderContext);

  const handleLogout = () => {
    //    to be implemented
    setOpen(false);
    signOut();
    handleAuthedUser(null);

  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (isLoading) return <Loader />;

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100 }}>
      <AppBar
        className={clsx([classes.appBar, classes.color], {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className="toolBar">
          <div>
            <Link to="/">
              <img className={classes.logo} src={walmartLogo} alt="walmart" />
            </Link>
          </div>
          <div className="leftDiv">
            {!authedUser && (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <ButtonGroup>
                  <Button
                    style={{
                      backgroundColor: header,
                      color: headerText,
                      border: `1px solid ${headerText}`,
                    }}
                  >
                    Log In
                  </Button>
                </ButtonGroup>
              </Link>
            )}

            {authedUser?.data ? (
              <div className={classes.authedContainer}>
                {authedUser.data.imageUrl ? (
                  <Avatar
                    alt="user"
                    src={"/df"}
                    style={{ backgroundColor: "#F5F4F2", color: headerText }}
                    className="margin15"
                  />
                ) : (
                  <AccountCircleIcon
                    className="margin15"
                    style={{ fontSize: "2.5em" }}
                  />
                )}
                <Typography className="margin15" variant="body1">
                  Hi {authedUser.data.userName.split(" ")[0]}
                </Typography>
                <CartIcon cartCount={cartCount} />
                <IconButton
                  style={{ margin: "0 30px" }}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={[clsx(open && classes.hide), "menuIcon"]}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              </div>
            ) : (
              <div className={classes.authedContainer}>
                <AccountCircleIcon
                  className="margin15"
                  style={{ fontSize: "2.5em" }}
                />
                <Typography className="margin15" variant="body1">
                  Hi Guest
                </Typography>
                <CartIcon cartCount={cartCount} />
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {authedUser?.data && (
        <Drawer
          className="drawer"
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: "drawerPaper",
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton
              onClick={handleDrawerClose}
              style={{ color: headerText }}
            >
              <ChevronRightIcon />
              <Typography variant="subtitle1" component="h5">{`Welcome ${
                authedUser.data.userName.split(" ")[0]
              }!`}</Typography>
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button key="profile" component={Link} to="/profile">
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem
              button
              key="orderHistory"
              component={Link}
              to="/my-orders"
            >
              <ListItemIcon>
                <ConfirmationNumberIcon />
              </ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItem>
            <ListItem
              button
              key="signout"
              onClick={handleLogout}
              style={{
                backgroundColor: header,
                color: headerText,
                textAlign: "center",
              }}
            >
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
        </Drawer>
      )}
    </header>
  );
};

export default withStyles(styles)(Header);

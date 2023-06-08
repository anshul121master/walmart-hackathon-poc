import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useNavigate, useLocation } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import compose from "recompose/compose";
import Loader from "../loader";
import { header } from "../theme";
import Header from "../header";
import { login } from "../../utils/api";
import { SignInContext } from "../context/SignInContext";
import { UserContext } from "../context/UserContext";

const styles = (theme) => ({
  textInput: {
    borderColor: "red",
  },
  paper: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "red",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: header,
    height: 45,
    borderRadius: 0,
  },
  errorColor: {
    color: "red",
  },
  infoMsg: {
    backgroundColor: "#BDE5F8",
    color: "#00529B",
    padding: 6,
    borderLeft: "5px solid blue",
    marginTop: 10,
  },
});

const SignIn = ({ classes }) => {
  const { isSignedIn, signIn } = useContext(SignInContext);
  const { authedUser, handleAuthedUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userCredentials = {
      email,
      password,
    };
    login(userCredentials).then((res) => {
      if (res.data) {
        signIn();
        handleAuthedUser(res);
      } else {
        handleAuthedUser(res);
        setShowErrorMessage(true);
      }
    });
  };

  if (isSignedIn) {
    const redirectedUrl = location.state?.from;
    return redirectedUrl ? navigate(redirectedUrl) : navigate("/");
  }

  return (
    <div>
      <Header />
      <Container
        style={{ backgroundColor: "white", marginTop: 30, marginBottom: 30 }}
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        {/* {loading && <Loader />} */}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              className={classes.textInput}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              value={email}
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />

            {authedUser && showErrorMessage && (
              <Typography className={classes.errorColor}>
                {authedUser.error.message}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default compose(withStyles(styles))(SignIn);

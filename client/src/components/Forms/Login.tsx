import { useState, SyntheticEvent, useContext } from "react";
import { History, LocationState } from "history";
import { AppContext, AppContextType } from "contexts/AppContext";
import { LOGIN_USER } from "services/graphql";
import { Link } from "react-router-dom";
import { handleAuth } from "services/auth";
import { Avatar, Button, TextField, Typography } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./Forms.scss";

interface Props {
  history: History<LocationState>;
}

const Login = ({ history }: Props) => {
  const { handleErrors } = useContext(AppContext) as AppContextType;
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const { email } = formValues;

  const [login] = useMutation(LOGIN_USER, {
    onCompleted: (data) => handleAuth({ ...data.login, email }, history),
    onError: (error) => handleErrors(error)
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    login({ variables: { ...formValues } });
  };

  return (
    <div className="login-container">
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField required variant="outlined" margin="normal" fullWidth label="email" autoComplete="Email" onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} />
        <TextField required variant="outlined" margin="normal" fullWidth label="password" autoComplete="Password" type="password" onChange={(e) => setFormValues({ ...formValues, password: e.target.value })} />
        <Link to="/register">Don't have an account yet?</Link>
        <Button type="submit" fullWidth variant="contained">Login</Button>
      </form>
    </div>
  );
};

export default Login;
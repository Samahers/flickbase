import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Loader, errorHelper } from "../../utils/tools";
import { registerUser, signInUser } from "../../store/actions/users";

import PreventSignIn from "../../hoc/preventSignin";

const Auth = () => {
  const [register, setRegister] = useState(false);
  let navigate = useNavigate();
  //redux logic
  const users = useSelector((state) => state.users);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "ymeilmail@gmail.com", password: "testing123" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry, cannot be empty")
        .email("Sorry, email is not valid"),
      password: Yup.string().required("Sorry, cannot be empty"),
    }),
    onSubmit: (values) => {
      DoHandleSubmit(values);
    },
  });

  const DoHandleSubmit = (values) => {
    if (register) {
      //dispatch register   (form here to thunk (action/users) to reducer (reducer/user))
      dispatch(registerUser(values));
    } else {
      //dispatch login
      dispatch(signInUser(values));
    }
  };

  useEffect(() => {
    if (notifications && notifications.global.success) {
      navigate("/dashboard");
    }
  }, [notifications]);

  return (
    <PreventSignIn users={users}>
      <div className="auth_container">
        <h1>Authenticate</h1>
        {users.loading ? (
          <Loader />
        ) : (
          <Box
            sx={{
              "& .MuiTextField-root": { width: "100%", marginTop: "20px" },
            }}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              name="email"
              label="enter your email"
              stvariant="outlined"
              {...formik.getFieldProps("email")}
              {...errorHelper(formik, "email")}
            />

            <TextField
              name="password"
              label="enter your password"
              stvariant="outlined"
              type="password"
              {...formik.getFieldProps("password")}
              {...errorHelper(formik, "password")}
            />

            <div className="mt-2">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
              >
                {register ? "Register" : "Login"}
              </Button>

              <Button
                className="mt-3"
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => setRegister(!register)}
              >
                Want to {!register ? "Register" : "Login"}
              </Button>
            </div>
          </Box>
        )}
      </div>
    </PreventSignIn>
  );
};

export default Auth;

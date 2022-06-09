import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Link, NavLink } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const loginInfos = {
  email: "",
  password: "",
};

export default function LoginForm({setVisible}) {

        //nagivation object
        const navigate = useNavigate();
        const dispatch = useDispatch();
  //use for api connection
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

    const [login, setLogin] = useState(loginInfos);
    const { email, password } = login;
    const loginValidation = Yup.object({
      email: Yup.string()
        .required("Email address is required")
        .email("Must be a valid email")
        .max(100),
      password: Yup.string().required("Pass is required"),
    });
  
    const handleLoginChange = (e) => {
      const { name, value } = e.target;
      setLogin({ ...login, [name]: value });
      console.log(login);
    };


    const loginSubmit = async () => {
        try {
            setLoading(true);
            const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,
            {
            
                email,
                password
            });
            dispatch({type: "LOGIN", payload: data});
            Cookies.set("user", JSON.stringify(data));
        }
        catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    }
  return (
    <div className="login_wrap">
    <div className="login_1">
      <img src="../../icons/facebook.svg" alt="" />
      <span>
        Facebook helps you connect and share with the people in your life
      </span>
    </div>
    <div className="login_2">
      <div className="login_2_wrap">
        <Formik
          enableReinitialize
          initialValues={{ email, password }}
          validationSchema={loginValidation}
          onSubmit={() => {
              loginSubmit();
          }}
        >
          {(formik) => (
            <Form>
              <LoginInput
                type="text"
                name="email"
                placeholder="Email address or phone number"
                onChange={handleLoginChange}
              />

              <LoginInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleLoginChange}
                bottom
              />

              <button type="submit" className="blue_btn">
                Log In
              </button>
            </Form>
          )}
        </Formik>
        <Link to={"/forgot"} className="forgot_password">
          Forgoten password?
        </Link>
        <div className="sign_splitter"></div>
        <button className="blue_btn open_signup" onClick={() => setVisible(true)}>Create Account</button>
      </div>
      <Link to={"/"} className="sign_extra">
        <b>Create a Page </b>
        for celebrity, business or brand
      </Link>
      {error && <div className="error_text">{error}</div>  }
    </div>
  </div>  )
}

import { Form, Formik } from "formik";
import React, { useState } from "react";
import RegisterInput from "../inputs/registerInput";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export default function RegisterForm({setVisible}) {

    //nagivation object
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };

  const [user, setUser] = useState(userInfos);

  const yearTemp = new Date().getFullYear();
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;

  //auto generate the years, months
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);

  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");

  //use for api connection
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const registerSubmit = async () => 
  {

    try{
        const {data} = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/register`, 
            {
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
        });

        setError("");
        setSuccess(data.message);
        //rest is the remaining data, which includes user info and such
       
        const {messasge, ...rest} = data;

        //dispatch the login action after waiting 2 seconds
        //use cookies to save user info


        setTimeout(() => {
            dispatch({type: "LOGIN", payload: rest});
            Cookies.set('user', JSON.stringify(rest));
            //go to home page
            navigate('/');
        }, 2000);
    }
    catch(error) {
        setLoading(false);
        setSuccess("");
        setError(error.response.data.message);
    }
  }
  //get the number of day in year and month
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };

  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("First Name is Required")
      .min(2, "First name is too short")
      .max(16, "First name is too long")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and special characters are not allowed"
      ),
    last_name: Yup.string()
      .required("last Name is Required")
      .min(2, "last name is too short")
      .max(16, "last name is too long")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and special characters are not allowed"
      ),
    email: Yup.string()
      .required("email is Required")
      .email("Enter a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Pass too short")
      .max(36, "Pass too long"),
  });
  return (
    <div className="blur">
      <div class="register">
        <div class="register_header">
          <i className="exit_icon" onClick={() => {setVisible(false)}}></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
        enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (current_date - picked_date < atleast14) {
              setDateError(
                "it looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth."
              );
            } else if (current_date - picked_date > noMoreThan70) {
              setDateError(
                "it looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth."
              );
            } else if (gender === "") {
              setDateError("");
              setGenderError(
                "Please choose a gender. You can change who can see this later."
              );
            } else {
              setDateError("");
              setGenderError("");
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div class="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Last name"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div class="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile Number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div class="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New Password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div class="reg_col">
                <div class="reg_line_header">
                  Date of birth
                  <i className="info_icon"> </i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              <div class="reg_col">
                <div class="reg_line_header">
                  Gender
                  <i className="info_icon"> </i>
                </div>
                <GenderSelect 
                handleRegisterChange={handleRegisterChange}
                genderError={genderError} />
              </div>

              <div class="reg_infos">
                By Clicking Sign Up, you agree to our teerms, Data Policy and
                Cookie Policy.
              </div>

              <div class="reg_btn_wrapper">
                <button class="blue_btn open_signup"> Sign Up</button>
              </div>
              <DotLoader color="#1876f2" loading={loading}  size={30} />

              {error  && <div className="error_text">{error}</div>}
              {success  && <div className="success_text">{success}</div>}

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

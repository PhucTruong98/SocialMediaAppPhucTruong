import { ErrorMessage, useField } from "formik";
import React from "react";
import "./styles.css";
import {useMediaQuery} from 'react-responsive';
export default function LoginInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);

  //return true if the screen width is at least 850 px
  const desktopView = useMediaQuery({
      query: "(min-with: 850px)",
  });
  console.log(desktopView);
  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div className={desktopView? "input_error input_error_desktop" : "input_error"}>
          {<ErrorMessage name={field.name} />}

          <div className="error_arrow_top"> </div>
        </div>
      )}

      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        placeholder={placeholder}
        name={field.name}
        {...field}
        {...props}
      ></input>
      {meta.touched && meta.error && bottom && (
        <div className={desktopView? "input_error input_error_desktop" : "input_error"}>
          <div className="error_arrow_bottom"> </div>

          {<ErrorMessage name={field.name} />}
        </div>
      )}
    </div>
  );
}

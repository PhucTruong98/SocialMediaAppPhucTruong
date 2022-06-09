import { ErrorMessage, useField } from "formik";
import React from "react";
import "./style.css";
import {useMediaQuery} from 'react-responsive';



export default function RegisterInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);


  const view1 = useMediaQuery({
      query: "(min-width:539px)",
  })

  const view2 = useMediaQuery({
    query: "(min-width:850px)",
})
const view3 = useMediaQuery({
    query: "(min-width:1170px)",
})

  //return true if the screen width is at least 850 px
  const desktopView = useMediaQuery({
      query: "(min-with: 850px)",
  });
  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div className={view2? "input_error input_error_desktop" : "input_error"}>
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
        <div className={view2 ? "input_error input_error_desktop" : "input_error"}>
          <div className="error_arrow_bottom"> </div>

          {<ErrorMessage name={field.name} />}
        </div>
      )}
    </div>
  );
}

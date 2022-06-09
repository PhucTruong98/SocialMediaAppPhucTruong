import React from 'react'

export default function GenderSelect({
    handleRegisterChange,
    genderError

}) {
  return (
    <div class="reg_grid">
    <label htmlFor="male">
      Male
      <input
        type="radio"
        name="gender"
        id="male"
        value="male"
        onChange={handleRegisterChange}
      ></input>
    </label>
    <label htmlFor="female">
      Female
      <input
        type="radio"
        name="gender"
        id="female"
        value="female"
        onChange={handleRegisterChange}
      ></input>
    </label>
    <label htmlFor="custom">
      Custom
      <input
        type="radio"
        name="gender"
        id="custom"
        value="custom"
        onChange={handleRegisterChange}
      ></input>
    </label>
    {genderError && <div className='input_error'>{genderError}</div>}
  </div>  )
}

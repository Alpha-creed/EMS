import React from 'react'
import { css } from "@emotion/core";
// First way to import
import Logo from "./img/security.jpg";

import { ScaleLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const Login = (props) => {
    const {onSubmit,pass,loading} = props
  return (
    <div>
        <div className="container">
          <div id="main-outer-div">
            <div id="logo-div">
               
              <img id="logo-img" src={Logo} alt="" />
            </div>
            <div id="title-div">
               
              <h4 className="title">Sign in</h4>
            </div>

            <div id="outer-login-form-div">
              <form action="" method="" onSubmit={onSubmit}>
                {/* <div className="form-group"> */}
                  <input className="login-form-input"
                    type="text"
                    // className="form-control"
                    placeholder="Email"
                    required="required"
                    name="Username"
                  />
                {/* </div> */}
                {/* <div className="form-group"> */}
                  <input className="login-form-input"
                    type="password"
                    // className="form-control"
                    placeholder="Password"
                    required="required"
                  />
                {/* </div> */}
                {/* <div className="form-group"> */}
                  <input className="login-form-input"
                    type="submit"
                    // className="btn btn-primary btn-block btn-lg btn-mystyle"
                    value="Sign in"
                    id="submitBtn"
                  />
                {/* </div> */}
                {!pass ? (
                  <p className="alert">Invalid UserName or Password</p>
                ) : (
                  ""
                )}
              </form>
            </div>

            <div className="loading">
              <ScaleLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={"#123abc"}
                loading={loading}
              />
            </div>
          </div>
        </div>
      
    </div>
  )
}

export default Login

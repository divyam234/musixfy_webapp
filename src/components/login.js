import React from 'react';
const login=()=>{
    return(
    <div id="login-page" className="row">
      <div className="col s12 z-depth-4 card-panel login">
        <div className="row">
            <div className="input-field col s12 center">
              <h4 className="login-form-text center">Login</h4>
            </div>
          </div>
        <form className="login-form">
          <div className="row margin">
            <div className="input-field col s12">
              <i className="material-icons prefix">person_outline</i>
              <input id="username" type="text"></input>
              <label htmlFor="username" className="center-align">Username</label>
            </div>
          </div>
          <div className="row margin">
            <div className="input-field col s12" id="user">
              <i className="material-icons prefix">lock_outline</i>
              <input id="password" type="password"></input>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row margin">
            <div className="col s12 m12 l12 ml-2 mt-3">
            <label>
            <input type="checkbox"></input>
            <span>Remember Me</span>
            </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12" id="butt">
              <a className="btn waves-effect waves-light col s12">Login</a>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6 m6 l6">
              <p className="margin medium-small signupbt"><a>Register</a></p>
            </div>
            <div className="input-field col s6 m6 l6">
              <p className="margin right-align medium-small forgotbt"><a>Forgot password ?</a></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default login;
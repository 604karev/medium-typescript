import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthenticationStore } from ".";

function Component() {
  const { email, phone, username, password, handleSubmit } =
    useAuthenticationStore();

  const isLogin = false;
  const urlApi = isLogin ? "/users/login" : "/users";
  const pageTitle = isLogin ? "Sign In" : "Sign Up";
  const descriptionLink = isLogin ? "/register" : "/login";
  const descriptionText = isLogin ? "Need an account?" : "Have an account?";

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-sm-center">{pageTitle}</h1>
            <p className="text-sm-center">
              <Link className="register" to={"/"}>
                {descriptionText}
              </Link>
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="username"
                      placeholder="Username"
                      value={username}
                      onChange={() => {}}
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={() => {}}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    autoComplete="on"
                    onChange={() => {}}
                  />
                </fieldset>
                <button className="btn btn-primary btn-lg pull-xs-right offset-lg-4">
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Component;

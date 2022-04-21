import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const Navbar = () => {
  const {store, actions}=useContext(Context)
  const history = useHistory()

  const logout = () =>{
    actions.logout(history)
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand text-warning" to="/">
          AUTENTICACIóN   🔐  JWT
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {store.authorized ?
              <>
              <li className="nav-item">
                <Link className="nav-link" onClick={logout} to="/">
                  Logout
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              </>
              :
              <>
              <li className="nav-item" >
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              </>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

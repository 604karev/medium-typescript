import { NavLink, Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className={`navbar navbar-light `}>
      <div className="container">
        <div className="nav-item">
          <Link className={`navbar-brand`} to={`/`}>
            Medium
          </Link>
        </div>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className={`nav-link`} to={`/`}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={`nav-link`} to={`/login`}>
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={`nav-link`} to={`/register`}>
              Sign Up
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={`nav-link`} to={"/article/new"}>
              <i className="ion-compose" /> &nbsp; New Post
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={`nav-link`} to={"/settings"}>
              <i className="ion-gear-a" /> &nbsp; Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default NavBar;

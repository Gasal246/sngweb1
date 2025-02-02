import React, { useEffect } from "react";
import { Dropdown, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { ROLES_NAME } from "../../constants/strings";

export function Header() {

  const _USER = useSelector(e => e?.common);

 

  useEffect(() => {
    Darkmode()
  }, []);
  const Darkmode = () => {
    document.querySelector(".app").classList.toggle("dark-mode");
  };
  //leftsidemenu
  const openCloseSidebar = () => {
    document.querySelector(".app").classList.toggle("sidenav-toggled");
  };

  const logOut = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user_role")
    window.location.href = "/login/super-admin"
  }

  return (
    <Navbar expand="md" className="app-header header sticky">
      <Container fluid className="main-container">
        <div className="d-flex align-items-center">
          <Link
            aria-label="Hide Sidebar"
            className="app-sidebar__toggle"
            to="#"
            onClick={() => openCloseSidebar()}
          ></Link>
          <div className="responsive-logo">
            <Link
              to={`${process.env.PUBLIC_URL}/dashboard/`}
              className="header-logo"
            >
              <img
                src={require("../../assets/images/brand/logo-3.png")}
                className="mobile-logo logo-1"
                alt="logo"
              />
              <img
                src={require("../../assets/images/brand/logo.png")}
                className="mobile-logo dark-logo-1"
                alt="logo"
              />
            </Link>
          </div>
          <Link
            className="logo-horizontal "
            to={`${process.env.PUBLIC_URL}/dashboard/`}
          >
            <img
              src={require("../../assets/images/brand/logo.png")}
              className="header-brand-img desktop-logo"
              alt="logo"
            />
            <img
              src={require("../../assets/images/brand/logo-3.png")}
              className="header-brand-img light-logo1"
              alt="logo"
            />
          </Link>

          <div className="d-flex order-lg-2 ms-auto header-right-icons">
            <Navbar.Toggle
              aria-controls="navbarScroll"
              className="navresponsive-toggler d-lg-none ms-auto"
              type="button"
            >
              <span className="navbar-toggler-icon fe fe-more-vertical text-dark"></span>
            </Navbar.Toggle>

            <div className="dropdown d-md-flex">
              <Link
                to="#"
                className="nav-link icon theme-layout nav-link-bg layout-setting"
                onClick={() => Darkmode()}
              >
                <span className="dark-layout">
                  <i className={`fe ${"fe-moon"}`}></i>
                </span>
                <span className="light-layout">
                  <i className={`fe ${"fe-sun"}`}></i>
                </span>
              </Link>
            </div>

            <div className="navbar navbar-collapse responsive-navbar p-0">
              <Navbar.Collapse
                className="navbar-collapse"
                id="navbarSupportedContent-4"
              >
                <div className="d-flex order-lg-2">
                  <Dropdown className=" d-md-flex profile-1">
                    <Dropdown.Toggle
                      className="nav-link profile leading-none d-flex px-1"
                      variant=""
                    >
                      <span>
                        <img
                          src={require("../../assets/images/users/8.jpg")}
                          alt="profile-user"
                          className="avatar  profile-user brround cover-image"
                        />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="dropdown-menu-end dropdown-menu-arrow"
                      style={{ margin: 0 }}
                    >
                      <div className="drop-heading">
                        <div className="text-center">
                          <h5 className="text-dark mb-0">{_USER?.fullName}</h5>
                          <small className="text-muted">{ROLES_NAME[_USER?.role]}</small>
                        </div>
                      </div>
                      <div className="dropdown-divider m-0"></div>
                      <Dropdown.Item
                        href={`${process.env.PUBLIC_URL}/profile`}
                      >
                        <i className="dropdown-icon fe fe-user"></i> Profile
                      </Dropdown.Item>
                      <Dropdown.Item
                        // href={`/login/super-admin`}
                        onClick={() => logOut()}
                      >
                        <i className="dropdown-icon fe fe-alert-circle"></i>
                        Sign out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                </div>
              </Navbar.Collapse>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;

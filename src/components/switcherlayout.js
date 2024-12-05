import React, { Fragment } from "react";
import Sidebar from "../layouts/SideBar/SideBar";
import Footer from "../layouts/Footer/Footer";
import RightSidebar from "../layouts/RightSidebar/RightSidebar";
import TabToTop from "../layouts/TabToTop/TabToTop";

export default function Switcherlayout() {
  return (
    <Fragment>
      <div className="horizontalMenucontainer">
        <TabToTop />
        <div className="page">
          <div className="page-main">
            <Sidebar />
            <div className="main-content app-content ">
              <div className="side-app">
                <div
                  className="main-container container-fluid"
                >
                </div>
              </div>
            </div>
          </div>
          <RightSidebar />
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}

import React, { Fragment } from 'react';
// import Loader from "../layouts/Loader/Loader";
import { Outlet } from 'react-router-dom'


export default function Custompages() {

  return (
    <Fragment>
      {/* <Loader /> */}
      <Outlet />
    </Fragment>
  );
}

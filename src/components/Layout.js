import React, { Fragment, useEffect } from "react";
import Header from "../layouts/Header/Header";
import Sidebar from "../layouts/SideBar/SideBar";
import Footer from "../layouts/Footer/Footer";
import RightSidebar from "../layouts/RightSidebar/RightSidebar";
import { Outlet } from "react-router-dom";
import TabToTop from "../layouts/TabToTop/TabToTop";
import useApi from "../hooks/useApi";
import { useDispatch } from "react-redux";
import { baseUrl, SUPERADMIN_ADD_CLIENT_ADMIN_API } from "../constants/endpoints";
import { toast } from "react-toastify";
import { ROLES_SLUG } from "../constants/strings";

export default function Layout() {

  const api = useApi();
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken")
  const userRole = localStorage.getItem("user_role")

  useEffect(() => {
    if (userRole === "ROLE_SUPER_ADMIN") {
      fetchDetailData();
    }
    else {
      fetchProfileData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])

  async function fetchDetailData() {
    if (token?.length !== 0) {
      const { data } = await api.get(`${baseUrl}/api/${ROLES_SLUG[userRole]}/details`, { Authorization: localStorage.getItem("accessToken") });
      dispatch({ type: 'AUTHENTICATE', payload: data?.data });
      const { ProfileData } = await api.get(`${baseUrl}/api/${ROLES_SLUG[userRole]}/profile`, { Authorization: localStorage.getItem("accessToken") });
      dispatch({ type: 'AUTHENTICATE', payload: ProfileData?.data });
      if (data?.data?.user_data?.slug === "ROLE_SUPER_ADMIN") {
        const { data, error } = await api.get(SUPERADMIN_ADD_CLIENT_ADMIN_API);
        if (data) {
          let optionList = []
          for (let index = 0; index < data?.data?.list.length; index++) {
            let obj = { value: data?.data?.list[index].id, label: data?.data?.list[index].full_name }
            optionList.push(obj);
          }
          dispatch({ type: 'CLIENTLIST', payload: optionList });
        }
        else {
          toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            autoClose: 2000,
            theme: "colored",
          });
        }
        getStoreList()
      }
      else {

      }
    }
  }


  const getStoreList = async () => {
    const { data, error } = await api.get(`${baseUrl}/super-admin/api/store-manager`);
    if (data) {
      let optionList = []
      for (let index = 0; index < data?.data?.list.length; index++) {
        let obj = { value: data?.data?.list[index].id, label: data?.data?.list[index]?.full_name }
        optionList.push(obj);
      }
      dispatch({ type: 'STORELIST', payload: optionList });
    }
    else {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgrefalser: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }

  async function fetchProfileData() {
    if (token?.length !== 0) {
      const { data } = await api.get(`${baseUrl}/api/${ROLES_SLUG[userRole]}/profile`, { Authorization: localStorage.getItem("accessToken") });
      dispatch({ type: 'AUTHENTICATE', payload: data?.data });

      if (data?.data?.user_data?.slug === "ROLE_SUPER_ADMIN") {

        const { data, error } = await api.get(SUPERADMIN_ADD_CLIENT_ADMIN_API);
        if (data) {
          let optionList = []
          for (let index = 0; index < data?.data?.list.length; index++) {
            let obj = { value: data?.data?.list[index].id, label: data?.data?.list[index].full_name }
            optionList.push(obj);
          }
          dispatch({ type: 'CLIENTLIST', payload: optionList });
        }
        else {
          toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            autoClose: 2000,
            theme: "colored",
          });
        }
        getStoreList();
      }
      else if
        (data?.data?.user_data?.slug === "ROLE_CLIENT_ADMIN") {
        const { data, error } = await api.get(`${baseUrl}/api/client-admin/camps`);
        if (data) {
          let optionList = []
          for (let index = 0; index < data?.data?.list?.length; index++) {
            let obj = { value: data?.data?.list[index]?.id, label: data?.data?.list[index]?.camp_name }
            optionList.push(obj);
          }
          dispatch({ type: 'CAMPSLIST', payload: optionList });
        }
        else {
          toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
            hideProgrefalser: false,
            autoClose: 2000,
            theme: "colored",
          });
        }
        const { data:data2 , error:error2 } = await api.get(`${baseUrl}/api/client-admin/pos`);
        if (data2) {
          let optionList = []
          for (let index = 0; index < data2?.data?.list?.length; index++) {
            let obj = { value: data2?.data?.list[index]?.id, label: data2?.data?.list[index]?.full_name }
            optionList.push(obj);
          }
          dispatch({ type: 'POSLIST', payload: optionList });
        }
        else {
          toast.error(error2, {
            position: toast.POSITION.TOP_RIGHT,
            hideProgrefalser: false,
            autoClose: 2000,
            theme: "colored",
          });
        }
        const { data:data3 , error:error3 } = await api.get(`${baseUrl}/api/client-admin/pos-device-code`);
        if (data3) {
          let PosDeviceCode = []
          for (let index = 0; index < data3?.data?.list?.length; index++) {
            let obj = { value: data3?.data?.list[index]?.id, label: data3?.data?.list[index]?.pos_device_code }
            PosDeviceCode.push(obj);
          }
          dispatch({ type: 'POSDEVICECODE', payload: PosDeviceCode });
        }
        else {
          toast.error(error3, {
            position: toast.POSITION.TOP_RIGHT,
            hideProgrefalser: false,
            autoClose: 2000,
            theme: "colored",
          });
        }


      }
    }
  }

  return (
    <Fragment>
      <div className="horizontalMenucontainer">
        <TabToTop />
        <div className="page">
          <div className="page-main">
            <Header />
            <Sidebar />
            <div className="main-content app-content ">
              <div className="side-app">
                <div className="main-container container-fluid" >
                  <Outlet />
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

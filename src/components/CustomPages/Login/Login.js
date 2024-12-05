import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { ACCOUNTANT_LOGIN_API, CLIENTADMIN_LOGIN_API, COORDINATOR_LOGIN_API, INVESTOR_LOGIN_API, KITCHEN_MANAGER_LOGIN_API, PLANT_MANAGER_LOGIN_API, STORE_MANAGER_LOGIN_API, SUPERADMIN_LOGIN_API, POS_LOGIN_API } from "../../../constants/endpoints";
import useApi from "../../../hooks/useApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [camp_id, setcamp_id] = useState('');
  const [device_mac_address, setdevice_mac_address] = useState('');

  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      window.location.reload();
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleRoleAPI = () => {
    if (window.location.pathname.split('/')[2] === 'super-admin') {
      return SUPERADMIN_LOGIN_API
    }
    else if (window.location.pathname.split('/')[2] === 'administrator') {
      return CLIENTADMIN_LOGIN_API
    }
    else if (window.location.pathname.split('/')[2] === 'coordinator') {
      return COORDINATOR_LOGIN_API
    }
    else if (window.location.pathname.split('/')[2] === 'accountant') {
      return ACCOUNTANT_LOGIN_API
    }
    else if (window.location.pathname.split('/')[2] === 'investor') {
      return INVESTOR_LOGIN_API
    }
    else if (window.location.pathname.split('/')[2] === 'kitchen-manager') {
      return KITCHEN_MANAGER_LOGIN_API
    }
    else if (window.location.pathname.split('/')[2] === 'store-manager') {
      return STORE_MANAGER_LOGIN_API
    }
    else if (window.location.pathname.split('/')[2] === 'plant-manager') {
      return PLANT_MANAGER_LOGIN_API
    }
    else if (window.location.pathname.split('/')[2] === 'pos') {
      return POS_LOGIN_API
    }
  }

  const handleLogin = async () => {
    alert('hello')

    let obj = { email: email, password: password };
   
    if (window.location.pathname.split('/')[2] === 'pos') {
      obj = { email: email, password: password, camp_id: camp_id, device_mac_address: device_mac_address }
    }

    const { data } = await api.post(handleRoleAPI(), obj);
    if (data) {
      alert(data)
      const accessToken = data?.data?.token;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user_role", data?.data?.user_data?.slug);
      localStorage.setItem("camp_id", data?.data?.user_data?.camp?.camp_id);
      dispatch({ type: 'AUTHENTICATE', payload: data?.data });
      navigate("/dashboard");
      setEmail("");
      setPassword("");
    }
  }
  return (
    <div className="login-img">
      <div className="page">
        <div className="" >
          <div className="col col-login mx-auto">
            <div className="text-center">
              <img
                src={require("../../../assets/images/brand/logo.png")}
                className="header-brand-img"
                alt=""
              />
            </div>
          </div>
          <div className="container-login100">
            <div className="wrap-login100 p-0">
              <Card.Body>
                <form className="login100-form validate-form m-auto">
                  <span className="login100-form-title">Login</span>
                  <div className="wrap-input100 validate-input">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      className="input100"
                      type="text"
                      name="email"
                      placeholder="Email"
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-email" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input">
                    <input
                      className="input100"
                      type="password"
                      name="pass"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                  {window.location.pathname.split('/')[2] === 'pos' && <>
                    <div className="wrap-input100 validate-input">
                      <input
                        className="input100"
                        onChange={(e) => setcamp_id(e.target.value)}
                        placeholder="Camp Id"
                      />
                      <span className="focus-input100"></span>
                      <span className="symbol-input100">
                        <i className="zmdi zmdi-pin" aria-hidden="true"></i>
                      </span>
                    </div>
                    <div className="wrap-input100 validate-input">
                      <input
                        className="input100"
                        onChange={(e) => setdevice_mac_address(e.target.value)}
                        placeholder="Device mac address"
                      />
                      <span className="focus-input100"></span>
                      <span className="symbol-input100">
                        <i className="zmdi zmdi-pin" aria-hidden="true"></i>
                      </span>
                    </div></>}
                  <div className="text-end pt-1">
                    <p className="mb-0">
                      <Link
                        to={`/forgotPassword`}
                        className="text-primary ms-1"
                      >
                        Forgot Password?
                      </Link>
                    </p>
                  </div>
                  <div className="container-login100-form-btn">
                    <Link
                      onClick={() => handleLogin()}
                      className="login100-form-btn btn-primary"
                    >
                      Login
                    </Link>
                  </div>
                </form>
              </Card.Body>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

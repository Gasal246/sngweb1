import React, {useEffect, useState} from "react";
import {Button, Card, Col, Modal, Row, Tab, Table, Tabs,} from "react-bootstrap";
import useApi from "../../hooks/useApi";
import {baseUrl} from "../../constants/endpoints";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {ROLES_SLUG} from "../../constants/strings";
import {useForm} from "react-hook-form";
import PackageList from "./PackageList";
import moment from 'moment';

export default function PosFindUser() {
  const [datalist, setDataList] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const _USER = useSelector((e) => e?.common);
  const api = useApi();
  const [openModal, setOpenModal] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [rechargeModal, setRechargeModal] = useState(false);
  const [rechargeModalData, setRechargeModalData] = useState([]);
  const [defaultProfileCampId, setDefaultProfileCampId] = useState("");
  const [defaultUserId, setDefaultUserId] = useState("");
  const [activeInternetPackageList, setActiveInternetPackageList] = useState([]);
  const [expiredInternetPackageList, setExpiredInternetPackageList] = useState([]);
  const [upcomingInternetPackageList, setUpcomingInternetPackageList] = useState([]);

  useEffect(() => {
    if (packageList.length > 0) {
      setDefaultProfileCampId(packageList[0].camp_name);
    }
    if (datalist.length > 0) {
      setDefaultUserId(datalist[0].name);
    }
  }, [packageList, datalist]);

  useEffect(() => {
    if (_USER?.role?.length) {
      getList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_USER?.role]);

  const { handleSubmit, reset } = useForm({
    defaultValues: {},
    shouldUnregister: true,
    mode: "onChange",
  });

  const getList = async () => {
    const campId = localStorage.getItem("camp_id");

    const { data, error } = await api.get(
        `${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/camps/packages/internet?profile_camp_id=${campId}`
    );
    if (data) {
      setPackageList(data?.data?.list);
    } else {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  const getActiveInternetPackageList = async () => {
    const userId = localStorage.getItem("search_user_id");

    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/order-by-user?user_id=${userId}&order_status=1`);

    if (data) {
      setActiveInternetPackageList(data?.data?.list)
    } else {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }

  const getExpiredInternetPackageList = async () => {
    const userId = localStorage.getItem("search_user_id");

    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/order-by-user?user_id=${userId}&order_status=2`);
    if (data) {
      setExpiredInternetPackageList(data?.data?.list)
    } else {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }

  const getUpcomingInternetPackageList = async () => {
    const userId = localStorage.getItem("search_user_id");

    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/order-by-user?user_id=${userId}&order_status=3`);

    if (data) {
      setUpcomingInternetPackageList(data?.data?.list)
    } else {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }

  const dateFormatter = (date, dateFormat = 'MMM DD, YYYY') => {
    return date ? moment(date).format(dateFormat) : '';
  };

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setOpenModal(false);
    setRechargeModal(false);
  };

  const submitHandler = async () => {

    const { data } = await api.get(
        `${baseUrl}/api/${
            ROLES_SLUG[_USER?.role]
        }/user/search?keyword=${encodeURIComponent(keyword)}`
    );

    if (data) {
      const userId = data?.data?.list[0]?.id;
      localStorage.setItem("search_user_id", userId);
      await getActiveInternetPackageList();
      await getExpiredInternetPackageList();
      await getUpcomingInternetPackageList();
      toast.success(data.message ? data.message : data.messages, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
      setOpenModal(false);
      setDataList(data?.data?.list);
    }else{
      setOpenModal(false);
    }
  };
  const handleSearchClick = () => {
    dispatch({ type: "SEARCHUSER", payload: false });
    setOpenModal(true);
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };
  const submitRechargeManual = async () => {
    const userId = localStorage.getItem("search_user_id");
    const campId = localStorage.getItem("camp_id");

    let new_rechargeData = {
      ...rechargeModalData,
      user_id: userId,
      profile_camp_id: campId,
    };

    const { data } = await api.post(
      `${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/recharge/recharge-manual`,
      new_rechargeData
    );

    if (data) {
      toast.success(data.message ? data.message : data.messages, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
      setRechargeModal(false);
      setRechargeModalData([]);
    }
  };
  const handleRechargeChange = (name, value) => {
    setRechargeModalData({ ...rechargeModalData, [name]: value.value });
  };

  const onRechargeClick = async (packageId) => {
    try {
      const selectedPackage = packageList.find(
        (item) => item.package_id === packageId
      );
      const profileCampId = selectedPackage.camp_id;
      const userId = localStorage.getItem("search_user_id");

      const requestData = {
        user_id: userId,
        package_id: packageId,
        profile_camp_id: profileCampId,
      };

      const { data } = await api.post(
        `${baseUrl}/api/${
          ROLES_SLUG[_USER?.role]
        }/internet-package/place-order`,
        requestData
      );

      if (data) {
        toast.success(data.message ? data.message : data.messages, {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: false,
          autoClose: 2000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleOpenWalletRechargeModal = () => {
    setRechargeModal(true);
  };

  const handleTabSelect = (eventKey) => {

  };

  return (
    <div>
      <Row>
        <Col sm={12} className="col-12">
          <Card className="mt-5">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <div>
                {datalist.length > 0 ? (
                  datalist.map((user) => (
                    <span key={user.id}>
                      <h3 className="card-title mb-0">User : {user.name}</h3>
                      <h3 className="card-title mt-3">UUID : {user.uuid}</h3>
                    </span>
                  ))
                ) : (
                  <span>
                    <h3 className="card-title mb-0">Find User</h3>
                  </span>
                )}
              </div>
            </Card.Header>
            <Card.Body>
              <div className="border-top">
                <div className="wideget-user-tab">
                  <div className="tab-menu-heading">
                    <div className="tabs-menu1 profiletabs">
                      <Tabs
                        variant="Tabs"
                        defaultActiveKey="Profile"
                        id="tab-51"
                        className="tab-content tabesbody"
                        onSelect={handleTabSelect}
                      >
                        {/*Profile Tab*/}
                        <Tab eventKey="Profile" title="User Profile">
                          <div className="tab-pane profiletab show">
                            <div id="profile-log-switch">
                              {datalist.length > 0 &&
                               datalist.map((user) => (
                                  <span key={user.id}>
                                    <Card className="mt-4">
                                      <Card.Body className="bg-white">
                                        <Row>
                                          <Col lg={12} md={9} xl={9}>
                                            {/*Personal Information*/}
                                            <div className="media-heading">
                                              <h4>
                                                <strong>
                                                  Personal Information
                                                </strong>
                                              </h4>
                                            </div>
                                            <div className="table-responsive p-1">
                                              <Table className="table row table-borderless">
                                                <tbody className="col-lg-12 col-xl-6 p-0">
                                                  <tr>
                                                    <td>
                                                      <strong> Name :</strong>
                                                      <span className="mx-1">
                                                        {user.name}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        Home Address :
                                                      </strong>
                                                      <span className="mx-1">
                                                        {user.home_address}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>Gender :</strong>
                                                      <span className="mx-1">
                                                        {user.gender}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        Job Title :
                                                      </strong>
                                                      <span className="mx-1">
                                                        {user.job_title}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        Passport No :
                                                      </strong>
                                                      <span className="mx-1">
                                                        {user.passport_no}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>UUID ID :</strong>
                                                      <span className="mx-1">
                                                        {user.uuid}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>Room No :</strong>
                                                      <span className="mx-1">
                                                        {user.room_no}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        Visa Number :
                                                      </strong>
                                                      <span className="mx-1">
                                                        {user.visa_number}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        National Id :
                                                      </strong>
                                                      <span className="mx-1">
                                                        {user.national_id}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>Block :</strong>
                                                      <span className="mx-1">
                                                        {user.block}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        Block Building:
                                                      </strong>
                                                      <span className="mx-1">
                                                        {user.block_building}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                                <tbody className="col-lg-12 col-xl-6 p-0">
                                                  <tr>
                                                    <td>
                                                      <strong>Email :</strong>
                                                      <span className="mx-1">
                                                        {user.email}
                                                      </span>
                                                    </td>
                                                  </tr>

                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        Company Name :
                                                      </strong>
                                                      <span className="mx-1">
                                                        {user.company_name}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        Blood Group :
                                                      </strong>
                                                      <span className="mx-1">
                                                        {user.blood_group}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>Age :</strong>
                                                      <span className="mx-1">
                                                        {user.age}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        Phone Number :
                                                      </strong>
                                                      <span className="mx-1">
                                                        {user.phone}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        Block Building:
                                                      </strong>
                                                      <span className="mx-1">
                                                        {user.block_building}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>Floor No:</strong>
                                                      <span className="mx-1">
                                                        {user.floor_no}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        Driver Licence no :
                                                      </strong>
                                                      <span className="mx-1">
                                                        {user.driver_licence_no}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        Passport Image :
                                                      </strong>
                                                      <span className="mx-1">
                                                        {user.passport_image}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        Building No :
                                                      </strong>
                                                      <span className="mx-1">
                                                        {user.building_no}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        Joining Date :
                                                      </strong>
                                                      <span className="mx-1">
                                                        {user.createdAt}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </Table>
                                            </div>

                                            {/*Camp Information */}
                                            <div className="media-heading">
                                              <h4>
                                                <strong>
                                                  Camps Information
                                                </strong>
                                              </h4>
                                            </div>
                                            <div className="table-responsive p-1">
                                              <Table className="table row table-borderless">
                                                <tbody className="col-lg-12 col-xl-6 p-0">
                                                  <tr>
                                                    <td>
                                                      <strong> Name :</strong>
                                                      <span className="mx-1">
                                                        {
                                                          user.camp_assign
                                                              .camp_details
                                                              .camp_name
                                                        }
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        Camp City :
                                                      </strong>
                                                      <span className="mx-1">
                                                        {
                                                          user.camp_assign
                                                              .camp_details
                                                              .camp_city
                                                        }
                                                      </span>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                                <tbody className="col-lg-12 col-xl-6 p-0">
                                                  <tr>
                                                    <td>
                                                      <strong>
                                                        {" "}
                                                        Camp Address :
                                                      </strong>
                                                      <span className="mx-1">
                                                        {
                                                          user.camp_assign
                                                              .camp_details
                                                              .camp_address
                                                        }
                                                      </span>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </Table>
                                            </div>
                                          </Col>
                                          <Col lg={12} md={3} xl={3}>
                                            <div className="wideget-user-desc d-sm-flex justify-content-end">
                                              <div className="wideget-user-img">
                                                <img
                                                    className="border"
                                                    src={user.user_image}
                                                    alt="img"
                                                    style={{
                                                      height: "100px",
                                                      width: "100px",
                                                    }}
                                                />
                                              </div>
                                            </div>
                                          </Col>
                                        </Row>
                                      </Card.Body>
                                    </Card>
                                  </span>
                              ))}
                            </div>
                          </div>
                        </Tab>

                        {/*Package Recharge Tab*/}
                        <Tab
                          eventKey="Package Recharge"
                          title="Package Recharge "
                        >
                          <div className="tab-pane profiletab show">
                            <div id="profile-log-switch">
                              {datalist.length > 0 &&
                               datalist.map((user) => (
                                  <span key={user.id}>
                                    <Card className="mt-4">
                                      <Card.Body className="bg-white">
                                        <div className="media-heading">
                                          <div className="media-heading border-bottom">
                                            <h5>
                                              <strong> Package Recharge</strong>
                                            </h5>
                                          </div>
                                          <PackageList
                                            data={packageList}
                                            onRechargeClick={onRechargeClick}
                                          />
                                        </div>
                                      </Card.Body>
                                    </Card>
                                  </span>
                                ))}
                            </div>
                          </div>
                        </Tab>

                        {/*My Packages Tab*/}
                        <Tab eventKey="My Packages" title="My Packages ">
                          <div className="tab-pane profiletab show">
                            <div id="profile-log-switch">
                              {datalist.length > 0 &&
                                  <span key={'my-packages'}>
                                    <Card className="mt-4">
                                      <Card.Body className="bg-white">
                                        <div className="media-heading border-bottom">
                                          <h5>
                                            <strong>My Packages</strong>
                                          </h5>
                                        </div>

                                        <div className="tabs-menu1 tabstyle2">
                                          <Tabs
                                            className="panel-tabs "
                                            variant="pills"
                                            defaultActiveKey="ActivePackageList"
                                          >
                                            {/*Active Package Show*/}
                                            <Tab
                                              eventKey="ActivePackageList"
                                              className="me-1 "
                                              title="Active Package List"
                                            >
                                              <div className="salesdatatable">
                                                  <Row className="mt-3 card-contact">
                                                    {activeInternetPackageList && activeInternetPackageList.length > 0 &&
                                                        activeInternetPackageList.map((activeInternetPackage) => (
                                                            <Col
                                                                xs={12}
                                                                md={6}
                                                                lg={6}
                                                                xl={3}
                                                                className="mb-3 "
                                                            >
                                                              <Card
                                                                  className="w-100"
                                                                  style={{
                                                                    backgroundColor:
                                                                        "#ffff",
                                                                  }}
                                                              >
                                                                <Card.Body className="text-black">
                                                                  <Row>
                                                                    <Col
                                                                        xs={12}
                                                                        md={6}
                                                                        lg={6}
                                                                        xl={6}
                                                                        xxl={4}
                                                                        className="mb-3 "
                                                                    >
                                                                      <div
                                                                          className="bg-green p-1 border-radius-12 text-center w-100 w-md-25"
                                                                          style={{
                                                                            borderRadius:
                                                                                "5px",
                                                                            fontSize:
                                                                                "12px",
                                                                          }}
                                                                      >
                                                                        Active
                                                                      </div>
                                                                    </Col>
                                                                  </Row>

                                                                  <div
                                                                      className="d-flex flex-wrap  justify-content-between">
                                                                    <div>
                                                                      <strong>
                                                                        Recharge date
                                                                      </strong>
                                                                    </div>
                                                                    <div>
                                                                      {dateFormatter(activeInternetPackage.purchase_date)}
                                                                    </div>
                                                                  </div>
                                                                  <div className="mt-1">
                                                              <span className="card-name-text">
                                                                {activeInternetPackage.package_name}
                                                              </span>
                                                                  </div>
                                                                  <div className="mt-1 mb-1">
                                                                    <strong className="card-validity-text">
                                                                      Validity {(activeInternetPackage.duration / 1440)} Days
                                                                    </strong>
                                                                  </div>
                                                                  <strong>
                                                                    Recharged form :
                                                                  </strong>
                                                                  <div className="card-name-text">
                                                                    {activeInternetPackage?.order_from_camp_detail?.camp_name}
                                                                  </div>
                                                                  <div className="card-border-top mt-1">
                                                                    <div
                                                                        className="d-flex flex-wrap mt-2 justify-content-between">
                                                                      <div>
                                                                        <strong>
                                                                          Payment Mode
                                                                        </strong>
                                                                      </div>
                                                                      <strong className="card-validity-text">
                                                                        {activeInternetPackage.created_by_type}
                                                                      </strong>
                                                                    </div>
                                                                    <div
                                                                        className="d-flex flex-wrap mt-2 justify-content-between">
                                                                      <div className="flex-grow-1 mb-2 mb-md-0">
                                                                        <strong>
                                                                          Ref. number
                                                                        </strong>
                                                                      </div>
                                                                      <div className="mb-2 mb-md-0">
                                                                        <strong>
                                                                          #{activeInternetPackage.order_number}
                                                                        </strong>
                                                                      </div>
                                                                    </div>
                                                                    <div
                                                                        className="d-flex flex-wrap mt-2 justify-content-between">
                                                                      <div>
                                                                        <strong>
                                                                          Plan start date
                                                                        </strong>
                                                                      </div>
                                                                      <strong>
                                                                        {dateFormatter(activeInternetPackage.package_start_date)}
                                                                      </strong>
                                                                    </div>
                                                                    <div
                                                                        className="d-flex flex-wrap mt-2 justify-content-between">
                                                                      <div>
                                                                        <strong>
                                                                          Plan end date
                                                                        </strong>
                                                                      </div>
                                                                      <strong>
                                                                        {dateFormatter(activeInternetPackage.package_expiry_date)}
                                                                      </strong>
                                                                    </div>
                                                                    <div
                                                                        className="d-flex flex-wrap mt-5 justify-content-between">
                                                                      <div className="flex-grow-1 mb-2 mb-md-0">
                                                                        <strong
                                                                            className="card-validity-text"
                                                                            style={{
                                                                              fontSize:
                                                                                  "20px",
                                                                            }}
                                                                        >
                                                                          AED {activeInternetPackage.package_amount}
                                                                        </strong>
                                                                      </div>
                                                                      <div>
                                                                        <button className="btn btn-blue ">
                                                                          Download Invoice
                                                                        </button>
                                                                      </div>
                                                                    </div>
                                                                    <div className="card-border-top mt-1">
                                                                      <div
                                                                          className="d-flex flex-column gap-2 flex-md-row justify-content-between align-items-center mt-3">
                                                                        <div
                                                                            className="d-flex flex-row align-items-center">
                                                                          <img
                                                                              src={require("../../assets/images/pngs/speed.png")}
                                                                              className="w-20 h-20 img-fluid"
                                                                              alt="logo"
                                                                              style={{
                                                                                borderRadius:
                                                                                    "50%",
                                                                                border:
                                                                                    "1px solid gray",
                                                                                padding:
                                                                                    "3px",
                                                                                marginRight:
                                                                                    "5px",
                                                                              }}
                                                                          />
                                                                          <div className="d-flex flex-column">
                                                                            <span>
                                                                              Data Speed
                                                                            </span>
                                                                            <h4 className="mb-0 card-validity-text">
                                                                              {activeInternetPackage.package_speed}
                                                                            </h4>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </Card.Body>
                                                              </Card>
                                                            </Col>
                                                        ))}
                                                </Row>
                                              </div>
                                            </Tab>
                                            {/*Upcoming Package Show*/}
                                            <Tab
                                                eventKey="UpComingPackageList"
                                                className="me-1 "
                                                title="Upcoming Package List"
                                            >
                                              <div className="salesdatatable">
                                                  <Row className="mt-3 card-contact">
                                                      {upcomingInternetPackageList && upcomingInternetPackageList.length > 0 &&
                                                          upcomingInternetPackageList.map((upcomingInternetPackage) => (
                                                              <Col
                                                                  xs={12}
                                                                  md={6}
                                                                  lg={6}
                                                                  xl={3}
                                                                  className="mb-3 "
                                                              >
                                                                <Card
                                                                    className="w-100"
                                                                    style={{
                                                                      backgroundColor:
                                                                          "#ffff",
                                                                    }}
                                                                >
                                                                  <Card.Body className="text-black">
                                                                    <div
                                                                        className="d-flex flex-wrap  justify-content-between align-items-center">
                                                                      <div>
                                                                        <div
                                                                            className="px-4 p-1 border-radius-12 text-center w-100"
                                                                            style={{
                                                                              borderRadius:
                                                                              "5px",
                                                                          fontSize:
                                                                              "12px",
                                                                          backgroundColor:
                                                                              "#0074D9",
                                                                          color: "white",
                                                                        }}
                                                                    >
                                                                      Upcoming
                                                                    </div>
                                                                  </div>
                                                                  <strong className="card-validity-text ">
                                                                    AED {upcomingInternetPackage.package_amount}
                                                                  </strong>
                                                                </div>
                                                                <div className='mt-2'>
                                                                  <span className="card-name-text ">
                                                                    {upcomingInternetPackage.package_name}
                                                                  </span>
                                                                </div>
                                                                <div className="mt-1 mb-1">
                                                                  <strong className="card-validity-text">
                                                                    Validity {(upcomingInternetPackage.duration / 1440)} Days
                                                                  </strong>
                                                                </div>
                                                                <strong>
                                                                  Purchased on {dateFormatter(upcomingInternetPackage.purchase_date, 'MMM DD, YYYY h:mmA')}
                                                                </strong>
                                                                <div className="card-border-top mt-1">
                                                                  <div className="d-flex flex-column gap-2 flex-md-row justify-content-between align-items-center mt-3">
                                                                    <div className="d-flex flex-row align-items-center">
                                                                      <img
                                                                          src={require("../../assets/images/pngs/speed.png")}
                                                                          className="w-20 h-20 img-fluid"
                                                                          alt="logo"
                                                                          style={{
                                                                            borderRadius:
                                                                                "50%",
                                                                            border:
                                                                                "1px solid gray",
                                                                            padding:
                                                                                "3px",
                                                                            marginRight:
                                                                                "5px",
                                                                          }}
                                                                      />
                                                                      <div className="d-flex flex-column">
                                                                      <span>
                                                                        Data Speed
                                                                      </span>
                                                                        <h4 className="mb-0 card-validity-text">
                                                                          {upcomingInternetPackage.package_speed}
                                                                        </h4>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </Card.Body>
                                                            </Card>
                                                          </Col>
                                                      ))}
                                                  </Row>
                                              </div>
                                            </Tab>
                                            {/*Expired Package Show*/}
                                            <Tab
                                                eventKey="ExpiredPackageList"
                                                className="me-1 "
                                                title="Expired Package List"
                                            >
                                              <div className="salesdatatable">
                                                  <Row className="mt-3 card-contact">
                                                    {expiredInternetPackageList && expiredInternetPackageList.length > 0 &&
                                                        expiredInternetPackageList.map((expiredInternetPackage) => (
                                                            <Col
                                                                xs={12}
                                                                md={6}
                                                                lg={6}
                                                                xl={3}
                                                                className="mb-3 "
                                                            >
                                                              <Card
                                                                  className="w-100"
                                                                  style={{
                                                                    backgroundColor:
                                                                        "#ffff",
                                                                  }}
                                                              >
                                                                <Card.Body className="text-black">
                                                                  <Row>
                                                                    <Col
                                                                        xs={12}
                                                                        md={6}
                                                                        lg={6}
                                                                        xl={6}
                                                                        xxl={4}
                                                                        className="mb-3 "
                                                                    >
                                                                      <div
                                                                          className="bg-red p-1 border-radius-12 text-center w-100 w-md-25"
                                                                          style={{
                                                                            borderRadius:
                                                                                "5px",
                                                                            fontSize:
                                                                                "12px",
                                                                          }}
                                                                      >
                                                                        Expired
                                                                      </div>
                                                                    </Col>
                                                                  </Row>

                                                                  <div
                                                                      className="d-flex flex-wrap  justify-content-between">
                                                                    <div>
                                                                      <strong>
                                                                        Recharge date
                                                                      </strong>
                                                                    </div>
                                                                    <div>
                                                                      {dateFormatter(expiredInternetPackage.purchase_date)}
                                                                    </div>
                                                                  </div>
                                                                  <div className="mt-1">
                                                                    <span className="card-name-text">
                                                                      {expiredInternetPackage.package_name}
                                                                    </span>
                                                                  </div>
                                                                  <div className="mt-1 mb-1">
                                                                    <strong className="card-validity-text">
                                                                      Validity {(expiredInternetPackage.duration / 1440)} Days
                                                                    </strong>
                                                                  </div>
                                                                  <strong>
                                                                    Recharged form :
                                                                  </strong>
                                                                  <div className="card-name-text">
                                                                    {expiredInternetPackage?.order_from_camp_detail?.camp_name}
                                                                  </div>
                                                                  <div className="card-border-top mt-1 ">
                                                                    <div
                                                                        className="d-flex flex-wrap mt-2 justify-content-between">
                                                                      <div>
                                                                        <strong>
                                                                          Payment Mode
                                                                        </strong>
                                                                      </div>
                                                                      <strong className="card-validity-text">
                                                                        {expiredInternetPackage.created_by_type}
                                                                      </strong>
                                                                    </div>
                                                                    <div
                                                                        className="d-flex flex-wrap mt-2 justify-content-between">
                                                                      <div className="flex-grow-1 mb-2 mb-md-0">
                                                                        <strong>
                                                                          Ref. number
                                                                        </strong>
                                                                      </div>
                                                                      <div className=" mb-2 mb-md-0">
                                                                        <strong>
                                                                          #{expiredInternetPackage.order_number}
                                                                        </strong>
                                                                      </div>
                                                                    </div>
                                                                    <div
                                                                        className="d-flex flex-wrap mt-2 justify-content-between">
                                                                      <div>
                                                                        <strong>
                                                                          Plan start date
                                                                        </strong>
                                                                      </div>
                                                                      <strong>
                                                                        {dateFormatter(expiredInternetPackage.package_start_date)}
                                                                      </strong>
                                                                    </div>
                                                                    <div
                                                                        className="d-flex flex-wrap mt-2 justify-content-between">
                                                                      <div>
                                                                        <strong>
                                                                          Plan end date
                                                                        </strong>
                                                                      </div>
                                                                      <strong>
                                                                        {dateFormatter(expiredInternetPackage.package_expiry_date)}
                                                                      </strong>
                                                                    </div>
                                                                    <div
                                                                        className="d-flex flex-wrap mt-5 justify-content-between">
                                                                      <div className="flex-grow-1 mb-2 mb-md-0">
                                                                        <strong
                                                                            className="card-validity-text"
                                                                            style={{
                                                                              fontSize:
                                                                                  "20px",
                                                                            }}
                                                                        >
                                                                          AED {expiredInternetPackage.package_amount}
                                                                        </strong>
                                                                      </div>
                                                                      <div>
                                                                        <button className="btn btn-blue ">
                                                                          Download Invoice
                                                                        </button>
                                                                      </div>
                                                                    </div>
                                                                    <div className="card-border-top mt-1">
                                                                      <div
                                                                          className="d-flex flex-column gap-2 flex-md-row justify-content-between align-items-center mt-3">
                                                                        <div
                                                                            className="d-flex flex-row align-items-center">
                                                                          <img
                                                                              src={require("../../assets/images/pngs/speed.png")}
                                                                              className="w-20 h-20 img-fluid"
                                                                              alt="logo"
                                                                              style={{
                                                                                borderRadius:
                                                                                    "50%",
                                                                                border:
                                                                                    "1px solid gray",
                                                                                padding:
                                                                                    "3px",
                                                                                marginRight:
                                                                                    "5px",
                                                                              }}
                                                                          />
                                                                          <div className="d-flex flex-column">
                                                                            <span>
                                                                              Data Speed
                                                                            </span>
                                                                            <h4 className="mb-0 card-validity-text">
                                                                              {expiredInternetPackage.package_speed}
                                                                            </h4>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </Card.Body>
                                                              </Card>
                                                            </Col>
                                                        ))}
                                                  </Row>
                                              </div>
                                            </Tab>
                                          </Tabs>
                                        </div>
                                      </Card.Body>
                                    </Card>
                                  </span>
                              }
                            </div>
                          </div>
                        </Tab>

                        {/*Wallet Recharge Tab*/}
                        <Tab eventKey="Wallet Recharge" title="Wallet Recharge">
                          <div className="tab-pane profiletab show">
                            <div id="profile-log-switch">
                              {datalist.length > 0 &&
                                datalist.map((user) => (
                                    <span key={user.id}>
                                  <Card className="mt-4">
                                    <Card.Body className="bg-white">
                                      <Row>
                                        <Col lg={12} md={9} xl={9}>
                                        <div className="media-heading border-bottom">
                                          <h5>
                                            <strong>Wallet Recharge</strong>
                                          </h5>
                                        </div>
                                          <Row className="mt-3">
                                              <Col key={'waller-recharge'} xs={12} md={6} lg={6} xl={3}
                                                   className="mb-3">
                                                    <Card className="w-100">
                                                      <Card.Body className="text-black">
                                                        <div>
                                                          <span className="card-validity-text">Total Balance</span>
                                                        </div>
                                                        <div className="mb-1">
                                                          <strong
                                                              className="card-validity-text">AED {user?.user_wallet?.wallet_amount}</strong>
                                                        </div>
                                                        <div className="mt-5">
                                                          <div
                                                              className="d-flex flex-wrap mt-3 justify-content-between">
                                                            <div className='flex-grow-1'>
                                                              <div>
                                                                <span className="card-validity-text"
                                                                      style={{fontSize: '16px'}}>UUID</span>
                                                              </div>
                                                              <div className="mb-1">
                                                                <strong className="card-validity-text"
                                                                        style={{fontSize: '16px'}}>{user.uuid}</strong>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </Card.Body>
                                                    </Card>
                                                  </Col>
                                          </Row>
                                          <div className="p-1">
                                            <Button
                                                type="button"
                                                onClick={handleOpenWalletRechargeModal}
                                                variant="primary"
                                            >
                                              Recharge
                                            </Button>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Card.Body>
                                  </Card>
                                </span>
                                ))}

                              <Modal show={rechargeModal} size="xl" centered>
                                <form
                                    id="form"
                                    onSubmit={handleSubmit(submitRechargeManual)}
                                    validated="true"
                                >
                                  <Modal.Header>
                                    <div className="modal-title h4 mb-0">
                                      Wallet Recharge
                                    </div>
                                    <Button
                                        onClick={handleCloseModal}
                                        className="btn-close"
                                        variant=""
                                    >
                                      <i className="fa fa-times fs-6"></i>
                                    </Button>
                                  </Modal.Header>
                                  <Modal.Body className="p-5">
                                    <div className="mb-6">
                                      <Row className="mb-2">
                                        <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                          <label
                                              htmlFor="user_name"
                                              className="form-label"
                                          >
                                            User Name
                                          </label>
                                          <input
                                              className="form-control"
                                              type="text"
                                              id="user_name"
                                              placeholder="Enter User name"
                                              name="user_name"
                                              value={defaultUserId}
                                              readOnly={true}
                                          />
                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                          <label
                                              htmlFor="camp_name"
                                              className="form-label"
                                          >
                                            Camp Name
                                          </label>
                                          <input
                                              className="form-control"
                                              type="text"
                                              id="camp_name"
                                              placeholder="Enter Profile Camp Name"
                                              value={defaultProfileCampId}
                                              readOnly={true}
                                          />
                                        </div>
                                      </Row>
                                      <Row className="mb-2">
                                        <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                          <label
                                              htmlFor="recharge_amount"
                                              className="form-label"
                                          >
                                            Recharge Amount
                                          </label>
                                          <input
                                              className="form-control"
                                              type="text"
                                              id="recharge_amount"
                                              placeholder="Enter Recharge Amount "
                                              name="recharge_amount"
                                              required={true}
                                              onChange={(e) =>
                                                  handleRechargeChange(
                                                      "recharge_amount",
                                                      e.target
                                                  )
                                              }
                                          />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                          <label
                                              htmlFor="service_amount"
                                              className="form-label"
                                          >
                                            Service Amount
                                          </label>
                                          <input
                                              className="form-control"
                                              type="text"
                                              id="service_amount"
                                              placeholder="Enter Service Amount"
                                              name="service_amount"
                                              required={true}
                                              onChange={(e) =>
                                                  handleRechargeChange(
                                                      "service_amount",
                                                      e.target
                                                  )
                                              }
                                          />
                                        </div>
                                      </Row>
                                    </div>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={handleCloseModal}
                                    >
                                      Close
                                    </Button>
                                    <Button type="submit" variant="primary">
                                      Recharge Now
                                    </Button>
                                  </Modal.Footer>
                                </form>
                              </Modal>
                            </div>
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {_USER.RechargeModal && (
          <Modal show={_USER.RechargeModal} centered>
            <Modal.Header>
              <div className="modal-title h4 mb-0">User Search</div>
              <Button
                  onClick={() => {
                    dispatch({type: "SEARCHUSER", payload: false});
                  }}
                  className="btn-close"
                  variant=""
              >
                <i className="fa fa-times fs-6"></i>
              </Button>
            </Modal.Header>
            <Modal.Body className="p-5">
              <div>
                <Row className="mt-3 card-contact">
                  <Col xs={12} md={6} lg={6} xl={6} className="custom-col">
                    <Card
                        className="text-dark text-center"
                        style={{minHeight: "140px"}}
                    >
                      <Card>
                        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                          <div>
                            <img
                                src={require("../../assets/images/pngs/scannerCode.png")}
                                className="w-70 h-70"
                                alt="logo"
                                style={{
                                  borderRadius: "50%",
                                  border: "1px solid gray",
                                  padding: "10px",
                                }}
                            />
                          </div>
                          <Button className="mt-5" variant="secondary">
                            Scan QR Code
                          </Button>
                        </Card.Body>
                      </Card>
                    </Card>
                  </Col>
                  <Col xs={12} md={6} lg={6} xl={6} className="custom-col">
                    <Card
                        className="text-dark text-center"
                        style={{minHeight: "140px"}}
                    >
                      <Card>
                        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                          <div>
                            <img
                                src={require("../../assets/images/pngs/Usersearch.png")}
                                className="w-70 h-70"
                                alt="logo"
                                style={{
                                  borderRadius: "50%",
                                  border: "1px solid gray",
                                  padding: "10px",
                                }}
                            />
                          </div>
                          <Button
                              className="mt-5"
                              variant="secondary"
                              onClick={handleSearchClick}
                          >
                            Search By UUID
                          </Button>
                        </Card.Body>
                      </Card>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Modal.Body>
          </Modal>
      )}

      {openModal && (
          <Modal show={openModal} centered>
            <form
                id="form"
                onSubmit={handleSubmit(submitHandler)}
                validated="true"
            >
              <Modal.Header>
                <div className="modal-title h4 mb-0">Search By UUID</div>
                <Button
                    onClick={handleCloseModal}
                    className="btn-close"
                    variant=""
                >
                  <i className="fa fa-times fs-6"></i>
                </Button>
              </Modal.Header>
              <Modal.Body className="p-5">
                <div>
                  <Row className="mb-2">
                    <div className=" form-group">
                      <input
                          className="form-control"
                          type="text"
                          id="keyword"
                          placeholder="Enter UUID"
                          name="keyword"
                          required={true}
                          onChange={handleChange}
                      />
                    </div>
                  </Row>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCloseModal}
                >
                  Close
                </Button>
                <Button type="submit" variant="primary">
                  Search
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
      )}
    </div>
  );
}

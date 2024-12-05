import React from "react";
import user8 from "../../../assets/images/users/8.jpg";
import { Tabs, Tab, Card, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLES_NAME } from "../../../constants/strings";
export default function Profile() {
  const _USER = useSelector(e => e?.common);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Profile</h1>
        </div>
      </div>

      <Row id="user-profile">
        <Col lg={12}>
          <Card className=" bg-transparent shadow-none border-0"> 
            <Card.Body className=" bg-white">
              <div className="wideget-user">
                <Row>
                  <Col lg={12} md={12} xl={6}>
                    <div className="wideget-user-desc d-sm-flex">
                      <div className="wideget-user-img">
                        <img className="" src={user8} alt="img" />
                      </div>
                      <div className="user-wrap">
                        <h4>{_USER.fullName}</h4>
                      </div>
                    </div>
                  </Col>
                  <Col lg={12} md={12} xl={6}>
                    <div className="text-xl-right mt-4 mt-xl-0">
                      <Link
                        to={`${process.env.PUBLIC_URL}/editProfile`}
                        className="btn btn-primary me-1"
                      >
                        Edit Profile
                      </Link>
                    </div>
                    <div className="mt-5">
                      {/* <div className="main-profile-contact-list float-md-end d-md-flex">
                        <div className="me-5">
                          <div className="media">
                            <div className="media-icon bg-primary  me-3 mt-1">
                              <i className="fe fe-file-plus fs-20 text-white"></i>
                            </div>
                            <div className="media-body">
                              <span className="text-muted">Posts</span>
                              <div className="fw-semibold fs-25">328</div>
                            </div>
                          </div>
                        </div>
                        <div className="me-5 mt-5 mt-md-0">
                          <div className="media">
                            <div className="media-icon bg-success me-3 mt-1">
                              <i className="fe fe-users  fs-20 text-white"></i>
                            </div>
                            <div className="media-body">
                              <span className="text-muted">Followers</span>
                              <div className="fw-semibold fs-25">937k</div>
                            </div>
                          </div>
                        </div>
                        <div className="me-0 mt-5 mt-md-0">
                          <div className="media">
                            <div className="media-icon bg-orange me-3 mt-1">
                              <i className="fe fe-wifi fs-20 text-white"></i>
                            </div>
                            <div className="media-body">
                              <span className="text-muted">Following</span>
                              <div className="fw-semibold fs-25">2,876</div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
            <div className="border-top ">
              <div className="wideget-user-tab">
                <div className="tab-menu-heading">
                  <div className="tabs-menu1 profiletabs">
                    <Tabs
                      variant="Tabs"
                      defaultActiveKey="Profile"
                      id=" tab-51"
                      className="tab-content tabesbody "
                    >
                      <Tab eventKey="Profile" title="Profile">
                        <div className="tab-pane profiletab show">
                          <div id="profile-log-switch">
                            <Card>
                              <Card.Body className="bg-white">
                                <div className="media-heading">
                                  <h5>
                                    <strong>Personal Information</strong>
                                  </h5>
                                </div>
                                <div className="table-responsive p-1">
                                  <Table className="table row table-borderless">
                                    <tbody className="col-lg-12 col-xl-6 p-0">
                                      <tr>
                                        <td>
                                          <strong style={{color :"#dedefd !important"}}>Role :</strong> {ROLES_NAME[_USER.role]}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <strong>Full Name :</strong> {_USER?.fullName}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <strong>Country :</strong> {_USER?.user_data?.country}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <strong>City :</strong> {_USER?.user_data?.city}
                                        </td>
                                      </tr>
                                    </tbody>
                                    <tbody className="col-lg-12 col-xl-6 p-0">
                                      <tr>
                                        <td>
                                          <strong>Email :</strong> {_USER?.user_data?.email}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <strong>Phone :</strong> {_USER?.user_data?.phone}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                              </Card.Body>
                            </Card>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

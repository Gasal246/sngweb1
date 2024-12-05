import React, { useEffect, useState } from "react";
import { Col, Row, Card, Tabs, Tab } from "react-bootstrap";
import useApi from "../../hooks/useApi";
import { baseUrl } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ROLES_SLUG } from "../../constants/strings";
import ActiveList from "./ActiveList";
import ViewModal from "./ViewModal";
import CampsClientWiseList from "./CampsClientWiseList";
import CampsClientViewModal from "./CampsClientViewModal";

export default function PosCamp() {
  const [datalist, setDataList] = useState([]);
  const [campWiseDatalist, setCampWiseDatalist] = useState([]);
  const _USER = useSelector((e) => e?.common);
  const api = useApi();
  const [infoModalData, setInfoModalData] = useState([]);
  const [infoModal, setInfoModal] = useState(false);
  const [clientInfoModal, setClientInfoModal] = useState(false);
  const [clientInfoModalData, setClientInfoModalData] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openClientModal, setOpenClientModal] = useState(false);

  useEffect(() => {
    if (_USER?.role?.length) {
      getList();
      getCampClientList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_USER?.role]);

  const getList = async () => {
    const { data, error } = await api.get(
      `${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/getCamps`
    );
    if (data) {
      setDataList(data?.data?.camp_details);
    } else {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  };
  const getCampClientList = async () => {
    const { data, error } = await api.get(
      `${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/getCamps-client-wise`
    );
    if (data) {
      setCampWiseDatalist(data?.data?.camp_details);
    } else {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setInfoModal(false);
    setOpenClientModal(false);
    setClientInfoModal(false);
  };

  const getInfoData = async (row) => {
    setInfoModalData(row?.camp);
    setInfoModal(true);
  };

  const handleView = async (row) => {
    getInfoData(row);
  };

  const getClientInfoData = async (row) => {
    setClientInfoModalData(row);
    setClientInfoModal(true);
  };

  const handleClientView = async (row) => {
    getClientInfoData(row);
  };

  return (
    <div>
      <Row>
        <Col sm={12} className="col-12">
          <Card className="mt-5">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <h3 className="card-title mb-0">Camps</h3>
            </Card.Header>
            <Card.Body>
              <Card.Header className="d-flex align-items-center justify-content-between">
                <h3 className="card-title mb-0">Onsite Site</h3>
              </Card.Header>
              {datalist.some((camp) => camp.camp_category === 1) && (
                <Row className="mt-3 card-contact">
                  {datalist.map((camp, index) => {
                    if (camp.camp_category === 1) {
                      return (
                        <Col
                          key={camp.camp_id}
                          xs={12}
                          md={8}
                          lg={3}
                          xl={1}
                          className="custom-col"
                        >
                          <Card
                            className=" text-dark  text-center "
                            style={{ minHeight: "140px" }}
                          >
                            <Card.Body className="d-flex align-items-center justify-content-center ">
                              <p className="text-black">
                                {camp.camp.camp_name}
                              </p>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    }
                    return null;
                  })}
                </Row>
              )}

              <Card.Header className="d-flex align-items-center justify-content-between">
                <h3 className="card-title mb-0">Offsite Site</h3>
              </Card.Header>
              {datalist.some((camp) => camp.camp_category === 2) && (
                <Row className="mt-3 card-contact">
                  {datalist.map((camp, index) => {
                    if (camp.camp_category === 2) {
                      return (
                        <Col
                          key={camp.camp_id}
                          xs={12}
                          md={8}
                          lg={3}
                          xl={1}
                          className="custom-col"
                        >
                          <Card
                            className=" text-dark  text-center "
                            style={{ minHeight: "140px" }}
                          >
                            <Card.Body className="d-flex align-items-center justify-content-center ">
                              <p className="text-black">
                                {camp.camp.camp_name}
                              </p>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    }
                    return null;
                  })}
                </Row>
              )}
              {/*<div className="panel panel-primary">*/}
              {/*    <div className=" tab-menu-heading border">*/}
              {/*<div className="tabs-menu1 tabstyle2">*/}
              {/*<Tabs*/}
              {/*    className=" panel-tabs "*/}
              {/*    variant="pills"*/}
              {/*    defaultActiveKey="ActivePosDeviceList"*/}
              {/*>*/}
              {/*<Tab eventKey="ActivePosDeviceList" className="me-1 "*/}
              {/*     title="Active Camp List">*/}
              {/*    <div className="salesdatatable">*/}
              {/*        <div className="table-responsive">*/}
              {/*            <ActiveList*/}
              {/*                data={datalist}*/}
              {/*                handleView={handleView}*/}
              {/*            />*/}
              {/*        </div>*/}
              {/*    </div>*/}
              {/*</Tab>*/}

              {/*<Tab eventKey="ActivePosDeviceList" className="me-1 "*/}
              {/*     title=" Client Wise Camps List">*/}
              {/*    <div className="salesdatatable">*/}
              {/*        <div className="table-responsive">*/}
              {/*            <CampsClientWiseList*/}
              {/*                data={campWiseDatalist}*/}
              {/*                handleView={handleClientView}*/}
              {/*            />*/}
              {/*        </div>*/}
              {/*    </div>*/}
              {/*</Tab>*/}

              {/*</Tabs>*/}
              {/*</div>*/}
              {/*    </div>*/}
              {/*</div>*/}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {infoModal && (
        <ViewModal
          show={infoModal}
          data={infoModalData}
          handleCloseModal={() => handleCloseModal()}
        />
      )}

      {clientInfoModal && (
        <CampsClientViewModal
          show={clientInfoModal}
          data={clientInfoModalData}
          handleCloseModal={() => handleCloseModal()}
        />
      )}
    </div>
  );
}

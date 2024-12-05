import React, { useEffect, useState } from "react";
import { Col, Row, Card, Tabs, Tab } from "react-bootstrap";
import useApi from "../../../hooks/useApi";
import { baseUrl } from "../../../constants/endpoints";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ROLES_SLUG } from "../../../constants/strings";
import ExpiredList from "./Expired";
import ActiveList from "./ActiveList";
import PendingList from "./PendingList";

export default function ClientReport() {
  const [datalist, setDataList] = useState([]);
  const [Pendinglists, setPendinglist] = useState([]);
  const [Expiredlists, setExpiredlists] = useState([]);

  const _USER = useSelector(e => e?.common);
  const api = useApi();

  useEffect(() => {
    if (_USER?.role?.length) {
      getList()
      getPendingList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_USER?.role])

  const getList = async () => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/order?order_status=2`);
    if (data) {
      setDataList(data.data.list)
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

  const getPendingList = async () => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/order?order_status=1`);
    if (data) {
      setPendinglist(data?.data?.list)
    }
    else {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }
  const getExpiredList = async () => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/order?order_status=3`);
    if (data) {
      setExpiredlists(data?.data?.list)
    }
    else {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }

  const tabchange = (e) => {
    if (e.target.dataset.rrUiEventKey === "ActiveInvestorsList") {
      getList()
    }
    else if (e.target.dataset.rrUiEventKey === "PendingList") {
      getPendingList()
    }
    else if (e.target.dataset.rrUiEventKey === "ExpiredList") {
      getExpiredList()
    }
  }


  return (
    <div>
      <Row>
        <Col sm={12} className="col-12">
          <Card className="mt-5">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <h3 className="card-title mb-0">Reports</h3>

            </Card.Header>
            <Card.Body>

              <div className="panel panel-primary">
                <div className=" tab-menu-heading border">
                  <div className="tabs-menu1 tabstyle2">
                    <Tabs
                      className=" panel-tabs "
                      variant="pills"
                      defaultActiveKey="ActiveInvestorsList"
                      onClick={(e) => tabchange(e)}
                    >
                      <Tab eventKey="ActiveInvestorsList" className="me-1 " title="Active Report List">
                        <div className="salesdatatable">
                          <div className="table-responsive">
                            <ActiveList
                              data={datalist}

                            />
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="PendingList" className="me-1 " title="Pending Report List">
                        <div className="salesdatatable">
                          <div className="table-responsive">
                            <PendingList
                              data={Pendinglists}
                            />
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="ExpiredList" className="me-1 " title="Expired Report List">
                        <div className="salesdatatable">
                          <div className="table-responsive">
                            <ExpiredList
                              data={Expiredlists}
                            />
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
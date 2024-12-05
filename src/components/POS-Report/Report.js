
import React, { useEffect, useState } from "react";
import { Col, Row, Card, Tabs, Tab } from "react-bootstrap";
import useApi from "../../hooks/useApi";
import { baseUrl } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ROLES_SLUG } from "../../constants/strings";
import CampWiseOrderList from "./CampWiseOrderList";
import UserWiseOrderList from "./UserWiseOrderList";
import CampWiseModal from "./CampWiseModal";
import UserWiseModal from "./UserWiseModal";

export default function PosRepost() {
    const [datalist, setDataList] = useState([]);
    const [userDatalist, setUserDatalist] = useState([]);
    const _USER = useSelector(e => e?.common);
    const api = useApi();
    const [campModalData, setCampModalData] = useState([]);
    const [campModal, setCampModal] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const [userModalData, setUserModalData] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openClientModal, setOpenClientModal] = useState(false);


    useEffect(() => {
        if (_USER?.role?.length) {
            getCampWiseOrderList()
            getUserWiseOrderList()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_USER?.role])

    const getCampWiseOrderList = async () => {
        const campId = localStorage.getItem("camp_id");

        const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/order?profile_camp_id=${campId}&order_status=1`);
        if (data) {
            setDataList(data?.data?.list)
        } else {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,
                theme: "colored",
            });
        }
    }

    const getUserWiseOrderList = async () => {
        const userId = localStorage.getItem("search_user_id");

        const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/order-by-user?user_id=${userId}&order_status=1`);
        if (data) {
            setUserDatalist(data?.data?.list)
        } else {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,
                theme: "colored",
            });
        }
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setCampModal(false)
        setOpenClientModal(false);
        setUserModal(false)
    };

    const getInfoData = async (row) => {
        setCampModalData(row);
        setCampModal(true);
    }

    const handleView = async (row) => {
        getInfoData(row)
    }

    const getClientInfoData = async (row) => {
        setUserModalData(row)
        setUserModal(true)
    }

    const handleClientView = async (row) => {
        getClientInfoData(row)
    }

    return (
        <div>
            <Row>
                <Col sm={12} className="col-12">
                    <Card className="mt-5">
                        <Card.Header className="d-flex align-items-center justify-content-between">
                            <h3 className="card-title mb-0">Report</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="panel panel-primary">
                                <div className=" tab-menu-heading border">
                                    <div className="tabs-menu1 tabstyle2">
                                        <Tabs
                                            className=" panel-tabs "
                                            variant="pills"
                                            defaultActiveKey="CampWiseOrderList"
                                        >
                                            <Tab eventKey="CampWiseOrderList" className="me-1 " title="Camp Wise Order List">
                                                <div className="salesdatatable">
                                                    <div className="table-responsive">
                                                        <CampWiseOrderList
                                                            data={datalist}
                                                            handleView={handleView}
                                                        />
                                                    </div>
                                                </div>
                                            </Tab>

                                            <Tab eventKey="UserWiseOrderList" className="me-1 " title="User Wise Order List">
                                                <div className="salesdatatable">
                                                    <div className="table-responsive">
                                                        <UserWiseOrderList
                                                            data={userDatalist}
                                                            handleView={handleClientView}
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
            {campModal && <CampWiseModal show={campModal} data={campModalData} handleCloseModal={() => handleCloseModal()} />}

            {userModal && <UserWiseModal show={userModal} data={userModalData} handleCloseModal={() => handleCloseModal()} />}</div>
    );
}
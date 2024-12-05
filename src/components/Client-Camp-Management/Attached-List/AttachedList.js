import React, { useState } from "react";
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tabs, Tab } from "react-bootstrap";
import useApi from "../../../hooks/useApi";
import { baseUrl } from "../../../constants/endpoints";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ROLES_SLUG } from "../../../constants/strings";
import Select from 'react-select';
import AttchedCoordinatorList from './AttchedCoordinatorList';
import AttchedAccountantList from './AttchedAccountantList';
import AttchedPOS from './AttchedPOS';
import AttchedPOSDeviceCodeList from './AttchedPOSDeviceCodeList';


export default function AttachedList() {
    const [campBaseId, setCampBaseId] = useState("");
    const [coordinatorList, setCoordinatorList] = useState([]);
    const [accountantList, setAccountantList] = useState([]);
    const [POSDeviceCodeList, setPOSDeviceCodeList] = useState([]);
    const [POSList, setPOSList] = useState([]);

    const _USER = useSelector(e => e?.common);
    const api = useApi();

    const handleStatus = async (row) => {
        const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/camps/unassign-coordinator-from-camp`, { assign_id: row.assigned_id });
        if (data) {
            toast.success(data.message ? data.message : data.messages, {
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,
                theme: "colored",
            });
            getAttchedCoordinatorList();
        }
    }

    const handleStatusAccountant = async (row, value) => {
        const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/camps/unassign-accountant-from-camp`, { assign_id: row.assigned_id });
        if (data) {
            toast.success(data.message ? data.message : data.messages, {
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,
                theme: "colored",
            });
            getAttchedAccountantList();
        }
    }
    const handleStatusPosFromCamp = async (row, value) => {
        const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/camps/unassign-pos-from-camp`, { assign_id: row.assigned_id });
        if (data) {
            toast.success(data.message ? data.message : data.messages, {
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,
                theme: "colored",
            });
            getAttchedPosList();
        }
    }
    const handleStatusDeviceToCamp = async (row, value) => {
        const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/camps/unassign-device-from-camp`, { assign_id: row.assigned_id });
        if (data) {
            toast.success(data.message ? data.message : data.messages, {
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,
                theme: "colored",
            });
            getAttchedPOSDeviceCodeList();
        }
    }
    const handlebaseCamp = (val) => {
        setCampBaseId(val.value)
    }

    const getAttchedList = async () => {
        if (campBaseId) {
            getAttchedCoordinatorList();
            getAttchedAccountantList();
            getAttchedPOSDeviceCodeList();
            getAttchedPosList();
        }
    }

    const getAttchedCoordinatorList = async () => {
        const { data, error } = await api.get(`${baseUrl}/api/client-admin/camps/assigned-coordinators-by-camp?status=1&camp_id=${campBaseId}`);
        if (data) {
            setCoordinatorList(data?.data?.list);
        }
        else {
            setCoordinatorList([])
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                hideProgrefalser: false,
                autoClose: 2000,
                theme: "colored",
            });
        }
    }
    const getAttchedAccountantList = async () => {
        const { data, error } = await api.get(`${baseUrl}/api/client-admin/camps/assigned-accountants-by-camp?status=1&camp_id=${campBaseId}`);
        if (data) {
            setAccountantList(data?.data?.list);
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

    const getAttchedPOSDeviceCodeList = async () => {
        const { data, error } = await api.get(`${baseUrl}/api/client-admin/camps/assigned-pos-device-code?status=1&camp_id=${campBaseId}`);
        let POSDeviceCode = [];
        data?.data?.list.map((val) => {
            POSDeviceCode = val.camp_assign_pos_device
        })
        if (data) {
            setPOSDeviceCodeList(POSDeviceCode);
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

    const getAttchedPosList = async () => {
        const { data, error } = await api.get(`${baseUrl}/api/client-admin/camps/assigned-pos-by-camp?status=1&camp_id=${campBaseId}`);
        if (data) {
            setPOSList(data?.data?.list);
        }
        else {
            setPOSList([])
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                hideProgrefalser: false,
                autoClose: 2000,
                theme: "colored",
            });
        }
    }

    return (
        <div>
            <Row>
                <Col sm={12} className="col-12">
                    <Card className="mt-5">
                        <Card.Header className="d-flex align-items-center justify-content-between">
                            <h3 className="card-title mb-0">Attched List</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="panel panel-primary">
                                <div className=" tab-menu-heading border">
                                    <div className="tabs-menu1 tabstyle2">
                                        <div className="salesdatatable">
                                            <div className="form-group" style={{ minWidth: "200px", maxWidth: "500px" }}>
                                                <label className="form-label">Select Camp </label>
                                                <div className="form-group d-flex px-0 align-items-start" style={{ minWidth: "200px" }}>
                                                    <Select
                                                        id="client_ids"
                                                        className="w-65"
                                                        placeholder="select camps to get list"
                                                        onChange={handlebaseCamp}
                                                        singleSelect="true"
                                                        options={_USER?.campsList}
                                                        isMulti={false}
                                                        required={true}
                                                    />
                                                    <Button className="btn btn-gray-dark ms-3" variant="default" onClick={() => { getAttchedList() }}>Get List </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <Tabs
                                            className="panel-tabs"
                                            variant="pills"
                                            defaultActiveKey="AttchedCoordinatorList"
                                        >
                                            <Tab eventKey="AttchedCoordinatorList" className="me-1 " title="Attched Coordinator List">
                                                <div className="salesdatatable">
                                                    <div className="table-responsive">
                                                        <AttchedCoordinatorList
                                                            data={coordinatorList}
                                                            handleStatus={(row) => handleStatus(row)}
                                                        />
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="AttchedAccountantList" className="me-1 " title="Attched Accountant List">
                                                <div className="salesdatatable">
                                                    <div className="table-responsive">
                                                        <AttchedAccountantList
                                                            data={accountantList}
                                                            handleStatusAccountant={(row) => handleStatusAccountant(row)}
                                                        />
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="AttchedPOS" className="me-1 " title="Attched POS">
                                                <div className="salesdatatable">
                                                    <div className="table-responsive">
                                                        <AttchedPOS
                                                            data={POSList}
                                                            handleStatusPosFromCamp={(row) => handleStatusPosFromCamp(row)}
                                                        />
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="AttchedPOSDeviceCodeList" className="me-1 " title="Attched POS Device Code List">
                                                <div className="salesdatatable">
                                                    <div className="table-responsive">
                                                        <AttchedPOSDeviceCodeList
                                                            data={POSDeviceCodeList}
                                                            handleStatusDeviceToCamp={(row) => handleStatusDeviceToCamp(row)}
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
        </div >
    );
}
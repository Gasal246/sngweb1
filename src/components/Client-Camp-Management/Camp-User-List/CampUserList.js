import React, { useState } from "react";
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tabs, Tab } from "react-bootstrap";
import useApi from "../../../hooks/useApi";
import { baseUrl } from "../../../constants/endpoints";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from 'react-select';
import AttachedCampUserList from "./AttachedCampUserList";

export default function CampUserList() {
    const [campBaseId, setCampBaseId] = useState("");
    const [campUserList, setCampUserList] = useState([]);
    const _USER = useSelector(e => e?.common);
    const api = useApi();


    const handlebaseCamp = (val) => {
        setCampBaseId(val.value)
    }

    const getAttchedList = async () => {
        if (campBaseId) {
            getAttchedCampUserList();
        }
    }


    const getAttchedCampUserList = async () => {
        const { data, error } = await api.get(`${baseUrl}/api/client-admin/camps/base-camp-users?camp_id=${campBaseId}`);
        let campUser = [];
        data?.data?.list.map((val) => {
            campUser = val.user_camp
        })
        if (data) {
            setCampUserList(campUser);
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


    return (
        <div>
            <Row>
                <Col sm={12} className="col-12">
                    <Card className="mt-5">
                        <Card.Header className="d-flex align-items-center justify-content-between">
                            <h3 className="card-title mb-0">Camp User List</h3>
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
                                            defaultActiveKey="AttchedCampUserList"
                                        >

                                            <Tab eventKey="AttchedCampUserList" className="me-1 " title="Attched Camp User List">
                                                <div className="salesdatatable">
                                                    <div className="table-responsive">
                                                        <AttachedCampUserList
                                                            data={campUserList}
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
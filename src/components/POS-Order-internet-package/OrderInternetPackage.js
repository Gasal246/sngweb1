import React, {useEffect, useState} from "react";
import {Col, Row, Card, Tabs, Tab, OverlayTrigger, Tooltip, Modal, Button} from "react-bootstrap";
import useApi from "../../hooks/useApi";
import {baseUrl} from "../../constants/endpoints";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {ROLES_SLUG} from "../../constants/strings";
import CampInternetPackageList from "./CampInternetPackageList";
import ViewModal from "./ViewModal";
import {Link} from "react-router-dom";
import Select from "react-select";
import {useForm} from "react-hook-form";

export default function PosOrderInternetPackage() {
    const [datalist, setDataList] = useState([]);
    const _USER = useSelector(e => e?.common);
    const api = useApi();
    const [infoModalData, setInfoModalData] = useState([]);
    const [infoModal, setInfoModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState([]);

    const {
        // register,
        handleSubmit,
        // control,
        // getValues,
        reset
    } = useForm({
        defaultValues: {},
        shouldUnregister: true,
        mode: 'onChange',
    });

    useEffect(() => {
        if (_USER?.role?.length) {
            getList()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_USER?.role])

    const getList = async () => {
        const {
            data,
            error
        } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/camps/packages/internet?profile_camp_id=64a7dbbb99a4dc9e7f1dd72a`);
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

    const handleCloseModal = () => {
        setOpenModal(false);
        setInfoModal(false)
    };

    const getInfoData = async (row) => {
        setInfoModalData(row)
        setInfoModal(true)
    }

    const handleView = async (row) => {
        getInfoData(row)
    }

    const handleEditClick = (data) => {
        setModalData(data)
        if (data) {
            reset(data);
        }
        setOpenModal(true);
    };
    const submitHandler = async () => {
        let new_formData = {
            ...modalData,
            // created_at: new Date()
        }

        const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/place-order`, new_formData);
        if (data) {
            toast.success(data.message ? data.message : data.messages, {
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,
                theme: "colored",
            });
            setOpenModal(false)
            setModalData([])
            getList()
        }
    }
    const handleChange = (name, value) => {
        setModalData({ ...modalData, [name]: value.value })
    }
    return (
        <div>
            <Row>
                <Col sm={12} className="col-12">
                    <Card className="mt-5">

                        <Card.Header className="d-flex align-items-center justify-content-between">
                            <h3 className="card-title mb-0">Order Internet Package</h3>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Add</Tooltip>}>
                                <Link onClick={() => handleEditClick()} to="#"
                                      className="btn btn-primary btn-icon text-white me-3">
                                      <span>
                                        <i className="fe fe-plus"></i>&nbsp;
                                      </span>
                                    Place Order
                                </Link>
                            </OverlayTrigger>
                        </Card.Header>
                        <Card.Body>
                            <div className="panel panel-primary">
                                <div className=" tab-menu-heading border">
                                    <div className="tabs-menu1 tabstyle2">
                                        <Tabs
                                            className=" panel-tabs "
                                            variant="pills"
                                            defaultActiveKey="ActivePosDeviceList"
                                        >
                                            <Tab eventKey="ActivePosDeviceList" className="me-1 "
                                                 title="Camp Internet Package List">
                                                <div className="salesdatatable">
                                                    <div className="table-responsive">
                                                        <CampInternetPackageList
                                                            data={datalist}
                                                            handleView={handleView}
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

            {openModal && (
                <Modal size="xl" show={openModal}>
                    <form id="form" onSubmit={handleSubmit(submitHandler)} validated={true}>
                        <Modal.Header>
                            <div className="modal-title h4 mb-0">Place Order</div>
                            <Button onClick={handleCloseModal} className="btn-close" variant="">
                                <i className="fa fa-times fs-6"></i>
                            </Button>
                        </Modal.Header>
                        <Modal.Body className="p-5">
                            <div className="mb-6">
                                <Row className="mb-2">
                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="user_id" className="form-label">User ID</label>
                                        <input className="form-control" type="text"
                                               id="user_id"
                                               placeholder="Enter User ID"
                                               name="user_id"
                                               onChange={(e) => handleChange('user_id', e.target)}
                                        />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="package_id" className="form-label">Package ID</label>
                                        <input className="form-control" type="text"
                                               id="package_id"
                                               placeholder="Enter No of codes"
                                               name="package_id"
                                               onChange={(e) => handleChange('package_id', e.target)}
                                        />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="profile_camp_id" className="form-label"> Profile Camp ID</label>
                                        <input className="form-control" type="text"
                                               id="profile_camp_id"
                                               placeholder="Enter Profile Camp ID"
                                               name="profile_camp_id"
                                               onChange={(e) => handleChange('profile_camp_id', e.target)}
                                        />
                                    </div>
                                </Row>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" variant="secondary" onClick={handleCloseModal}>Close</Button>
                            <Button type="submit" variant="primary" >Save</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            )}

            {infoModal &&
            <ViewModal show={infoModal} data={infoModalData} handleCloseModal={() => handleCloseModal()}/>}
        </div>
    );
}
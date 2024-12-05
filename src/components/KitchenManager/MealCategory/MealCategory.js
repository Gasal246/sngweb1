import React, { useEffect, useState } from "react";
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApi from "../../../hooks/useApi";
import { ADD_GET_MEALCATEGORY_API, baseUrl } from "../../../constants/endpoints";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { statusCheck } from "../../../constants/functions";
import DeleteModal from "../../common/DeleteModal";
import ActiveList from "./ActiveList";
import DeletedList from "./DeleteList";
import ViewModal from "./ViewModal";

export default function MealCategory() {
    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [datalist, setDataList] = useState([]);
    const [updateID, setUpdateID] = useState('');
    const [modalData, setModalData] = useState([]);
    const [deleteModal, setdeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [Deletedatalist, setDeleteDataList] = useState([]);
    const [infoModalData, setInfoModalData] = useState([]);
    const [infoModal, setInfoModal] = useState(false);

    const _USER = useSelector(e => e?.common);


    const api = useApi();

    const {
        handleSubmit,
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
        const { data, error } = await api.get(ADD_GET_MEALCATEGORY_API);
        if (data) {
            setDataList(data?.data?.list)
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

    const getDeletedList = async () => {
        const { data, error } = await api.get(`${baseUrl}/mess-manage/api/category?status=0`);
        if (data) {
            setDeleteDataList(data?.data?.list)
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


    const handleEditClick = (data) => {
        setModalData(data)
        if (data) {
            setUpdateID(data?.id)
            reset(data);
            setIsEdit(true);
        } else setIsEdit(false);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setdeleteModal(false);
        setDeleteId('');
        setInfoModalData([])
        setInfoModal(false)
    };

    const submitHandler = async () => {
        let new_formData = {
            ...modalData,
            created_at: new Date()
        }
        const { data } = await api.post(ADD_GET_MEALCATEGORY_API, new_formData);

        if (data) {
            toast.success(data?.message ? data?.message : data?.messages, {
                position: toast.POSITION.TOP_RIGHT,
                hideProgrefalser: false,
                autoClose: 2000,
                theme: "colored",
            });
            setOpenModal(false)
            setModalData([])
            getList()
        }
    }


    const updateData = async () => {

        let new_formData = {
            ...modalData,
            updated_at: new Date()
        }

        const { data } = await api.put(ADD_GET_MEALCATEGORY_API + "/" + updateID, new_formData);

        if (data) {
            toast.success(data?.message ? data?.message : data?.messages, {
                position: toast.POSITION.TOP_RIGHT,
                hideProgrefalser: false,
                autoClose: 2000,
                theme: "colored",
            });
            setOpenModal(false)
            setModalData([])
            getList()
        }
    }

    //delete functionality 
    const handleDelete = (row) => {
        setDeleteId(row.id)
        setdeleteModal(true)
    }

    const confirmDelete = async (deleteId) => {
        const { data } = await api.del(ADD_GET_MEALCATEGORY_API + "/" + deleteId);
        if (data) {
            toast.success(data?.message ? data?.message : data?.messages, {
                position: toast.POSITION.TOP_RIGHT,
                hideProgrefalser: false,
                autoClose: 2000,
                theme: "colored",
            });
            setdeleteModal(false)
            setDeleteId('')
            getList()
        }
    }

    const handleChange = (name, value) => {
        setModalData({ ...modalData, [name]: value })
    }



    //reactive data 

    const tabchange = (e) => {
        if (e.target.dataset.rrUiEventKey === "ActiveCategoryList") {
            getList()
        }
        else if (e.target.dataset.rrUiEventKey === "DeleteCategoryList") {
            getDeletedList()
        }
    }

    const reActiveDeleted = async (row, value) => {
        const { data } = await api.post(ADD_GET_MEALCATEGORY_API + "/" + row.id, { status: value === false ? 2 : 1, updated_at: new Date() });
        if (data) {
            toast.success(data?.message ? data?.message : data?.messages, {
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,
                theme: "colored",
            });
            getDeletedList()
        }
    }

    // view modal

    const getInfoData = async (id) => {
        const { data, error } = await api.get(ADD_GET_MEALCATEGORY_API + "/" + id);
        if (data) {
            setInfoModalData(data?.data?.list)
            setInfoModal(true);
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

    const handleView = async (row) => {
        getInfoData(row?.id)
    }

    return (
        <div>
            <Row>
                <Col sm={12} className="col-12">
                    <Card className="mt-5">
                        <Card.Header className="d-flex align-items-center justify-content-between">
                            <h3 className="card-title mb-0">Investors</h3>
                            <OverlayTrigger placement="top" overlay={<Tooltip >Add</Tooltip>}>
                                <Link onClick={() => handleEditClick()} to="#" className="btn btn-primary btn-icon text-white me-3">
                                    <span>
                                        <i className="fe fe-plus"></i>&nbsp;
                                    </span>
                                    Add Account
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
                                            defaultActiveKey="ActiveCategoryList"
                                            onClick={(e) => tabchange(e)}
                                        >
                                            <Tab eventKey="ActiveCategoryList" className="me-1 " title="Active Category List">
                                                <div className="salesdatatable">
                                                    <div className="table-responsive">
                                                        <ActiveList
                                                            data={datalist}
                                                            handleEditClick={(row) => handleEditClick(row, 'edit')}
                                                            handleDelete={(row) => handleDelete(row)}
                                                            handleView={(row) => handleView(row)}
                                                        />
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="DeleteCategoryList" className="me-1 " title="Deleted Category List">
                                                <div className="salesdatatable">
                                                    <div className="table-responsive">
                                                        <DeletedList
                                                            data={Deletedatalist}
                                                            reActiveDeleted={(row, value) => reActiveDeleted(row, value)}
                                                            handleView={(row) => handleView(row)}
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
                    <form id="form" onSubmit={isEdit ? handleSubmit(updateData) : handleSubmit(submitHandler)} validate>
                        <Modal.Header>
                            <div className="modal-title h4 mb-0">{`${isEdit ? 'Edit' : 'Add'} Item`}</div>
                            <Button onClick={handleCloseModal} className="btn-close" variant="">
                                <i className="fa fa-times fs-6"></i>
                            </Button>
                        </Modal.Header>
                        <Modal.Body className="p-5">
                            <div className="mb-6">
                                <Row className="mb-2">
                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="category_name" className="form-label">Category name</label>
                                        <input className="form-control" type="text"
                                            id="category_name"
                                            placeholder="Enter full name"
                                            name="category_name"
                                            value={modalData?.category_name}
                                            onChange={(e) => handleChange('category_name', e.target.value)}
                                            required
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

            {deleteModal && <DeleteModal show={deleteModal} confirmDelete={() => confirmDelete(deleteId)} handleCloseModal={() => handleCloseModal()} />}
            {infoModal && <ViewModal show={infoModal} data={infoModalData} handleCloseModal={() => handleCloseModal()} _USER={_USER} />}


        </div>
    );
}
import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApi from "../../../hooks/useApi";
import { ADD_GET_MEALCATEGORY_API, ADD_GET_MEALPACKAGE_API, GET_DELETED_MEALPACKAGE_API, UPDATE_MEALPACKAGE_API } from "../../../constants/endpoints";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getKeyName } from "../../../constants/functions";
import { MealType } from "../../../constants/strings";
import DeleteModal from "../../common/DeleteModal";
import ActiveList from "./ActiveList";
import DeletedList from "./DeleteList";
import ViewModal from "./ViewModal";

export default function MealPackage() {
    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [datalist, setDataList] = useState([]);
    const [updateID, setUpdateID] = useState('');
    const [modalData, setModalData] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [ids, setIDS] = useState('');
    const [infoModalData, setInfoModalData] = useState([]);
    const [infoModal, setInfoModal] = useState(false);
    const [deleteModal, setdeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [Deletedatalist, setDeleteDataList] = useState([]);


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
            getCategoryList()
            getDeletedList()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_USER?.role])

    const getList = async () => {
        const { data, error } = await api.get(ADD_GET_MEALPACKAGE_API);
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

    const getCategoryList = async () => {
        const { data, error } = await api.get(ADD_GET_MEALCATEGORY_API);
        if (data) {
            let optionList = []
            for (let index = 0; index < data?.data?.list.length; index++) {
                let obj = { value: data?.data?.list[index].id, label: data?.data?.list[index].category_name }
                optionList.push(obj);
            }
            setCategoryList(optionList)
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
        const { data, error } = await api.get(GET_DELETED_MEALPACKAGE_API);
        if (data) {
            setDeleteDataList(data?.data?.list)
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



    const handleEditClick = (data) => {
        if (data) {
            setModalData(data)
            setIDS(data?.meal_category_ids)
            setUpdateID(data?.id)
            reset(data);
            setIsEdit(true);
        } else setIsEdit(false);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setIDS('');
        setModalData([]);
        setInfoModal(false);
        setInfoModalData([]);
        setdeleteModal(false);
        setDeleteId('');
        setdeleteModal(false);
        setDeleteId('');
    };

    const submitHandler = async () => {
        let new_formData = {
            ...modalData,
            meal_category_ids: ids,
            created_at: new Date()
        }

        const { data } = await api.post(ADD_GET_MEALPACKAGE_API, new_formData);

        if (data) {
            toast.success(data?.message ? data?.message : data?.messages, {
                position: toast.POSITION.TOP_RIGHT,
                hideProgrefalser: false,
                autoClose: 2000,
                theme: "colored",
            });
            setOpenModal(false)
            handleCloseModal()
            getList()
        }
    }

    const updateData = async () => {

        let new_formData = {
            ...modalData,
            meal_category_ids: ids,
            created_at: new Date()
        }

        const { data } = await api.put(ADD_GET_MEALPACKAGE_API + "/" + updateID, new_formData);

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

    // deleted functionality

    const handleDelete = (row) => {
        setDeleteId(row.id)
        setdeleteModal(true)
    }

    const confirmDelete = async (deleteId) => {
        const { data } = await api.put(UPDATE_MEALPACKAGE_API + "/" + deleteId, { status: 0, deleted_at: new Date() });

        if (data) {
            toast.success(data?.message ? data?.message : data?.messages, {
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,
                theme: "colored",
            });
            setdeleteModal(false)
            setDeleteId('')
            getList()
        }
    }

    const handleStatus = async (row, value) => {
        const { data } = await api.put(UPDATE_MEALPACKAGE_API + "/" + row.id, { status: value === false ? "2" : "1", updated_at: new Date() });
        if (data) {
            toast.success(data?.message ? data?.message : data?.messages, {
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
        setModalData({ ...modalData, [name]: value })
    }


    // Assign functionality


    const handleChangeAssignData = (name, value) => {
        if (name === 'category') {
            if (value.length >= 1) {
                let ids = value.map(item => item.value).join(',');
                setIDS(ids)
            }
            else if (value.length === 0) {
                setIDS('')
            }
            else {
                setIDS(value.value)
            }
        }
        else {
            setModalData({ ...modalData, [name]: value.value })
        }
    }


    const handleView = async (row) => {
        setInfoModalData(row)
        setInfoModal(true)
    }

    const handleCombo = async (row) => {
        window.location.href = `/meal-package/${+row.id}/comboitem`
    }


    //reactive data 

    const tabchange = (e) => {
        if (e.target.dataset.rrUiEventKey === "ActiveMealList") {
            getList()
        }
        else if (e.target.dataset.rrUiEventKey === "DeleteMealList") {
            getDeletedList()
        }
    }

    const reActiveDeleted = async (row, value) => {
        const { data } = await api.put(UPDATE_MEALPACKAGE_API + "/" + row.id, { status: value === false ? 2 : 1, updated_at: new Date() });
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



    return (
        <div>
            <Row>
                <Col sm={12} className="col-12">
                    <Card className="mt-5">
                        <Card.Header className="d-flex align-items-center justify-content-between">
                            <h3 className="card-title mb-0">Meal Package</h3>
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
                                            defaultActiveKey="ActiveMealList"
                                            onClick={(e) => tabchange(e)}
                                        >
                                            <Tab eventKey="ActiveMealList" className="me-1 " title="Active Meal Package List">
                                                <div className="salesdatatable">
                                                    <div className="table-responsive">
                                                        <ActiveList
                                                            data={datalist}
                                                            handleEditClick={(row) => handleEditClick(row, 'edit')}
                                                            handleDelete={(row) => handleDelete(row)}
                                                            handleView={(row) => handleView(row)}
                                                            handleCombo={(row) => handleCombo(row)}
                                                            handleStatus={(row, value) => handleStatus(row, value)}
                                                        />
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="DeleteMealList" className="me-1 " title="Deleted Meal Package List">
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
                    <form id="form" onSubmit={isEdit ? handleSubmit(updateData) : handleSubmit(submitHandler)} validate="true">
                        <Modal.Header>
                            <div className="modal-title h4 mb-0">{`${isEdit ? 'Edit' : 'Add'} Meal Package`}</div>
                            <Button onClick={handleCloseModal} className="btn-close" variant="">
                                <i className="fa fa-times fs-6"></i>
                            </Button>
                        </Modal.Header>
                        <Modal.Body className="p-5">
                            <div className="mb-6">
                                <Row>
                                    <div className=" col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="package_name" className="form-label">Name</label>
                                        <input className="form-control" type="text"
                                            id="package_name"
                                            placeholder="Enter full name"
                                            name="package_name"
                                            value={modalData?.package_name}
                                            onChange={(e) => handleChange('package_name', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className=" col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="package_validity" className="form-label">Validity (In Days)</label>
                                        <input className="form-control" type="text"
                                            id="package_validity"
                                            placeholder="Enter full name"
                                            name="package_validity"
                                            value={modalData?.package_validity}
                                            onChange={(e) => handleChange('package_validity', e.target.value)}
                                            required
                                        />
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label className="form-label"> Meal Category </label>
                                     
                                        <Select
                                            id="type"
                                            placeholder="Select Meal Category"
                                            value={getKeyName(categoryList, ids)}
                                            onChange={(e) => handleChangeAssignData('category', e)}
                                            singleSelect="true"
                                            options={categoryList}
                                            isMulti={true}
                                            required={true}
                                        />
                                    </div>

                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label className="form-label">  Type  </label>
                                        <Select
                                            id="package_type"
                                            placeholder="Select Package Type"
                                            value={getKeyName(MealType, modalData?.package_type)}
                                            onChange={(e) => handleChangeAssignData('package_type', e)}
                                            singleSelect="true"
                                            options={MealType}
                                            required={true}
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
                </Modal >
            )}

            {deleteModal && <DeleteModal show={deleteModal} confirmDelete={() => confirmDelete(deleteId)} handleCloseModal={() => handleCloseModal()} />}

            {infoModal && <ViewModal show={infoModal} data={infoModalData} handleCloseModal={() => handleCloseModal()} _USER={_USER} />}

        </div >
    );
}

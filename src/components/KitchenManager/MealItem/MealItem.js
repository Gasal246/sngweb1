import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApi from "../../../hooks/useApi";
import { ADD_GET_MEALCATEGORY_API, ADD_GET_MEALITEM_API, baseUrl } from "../../../constants/endpoints";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getKeyName } from "../../../constants/functions";
import { MealType } from "../../../constants/strings";
import DeleteModal from "../../common/DeleteModal";
import DeletedList from "./DeleteList";
import ActiveList from "./ActiveList";
import ViewModal from "./ViewModal";

export default function MealItem() {
    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [datalist, setDataList] = useState([]);
    const [updateID, setUpdateID] = useState('');
    const [modalData, setModalData] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');
    const [ids, setIDS] = useState('');
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
            getCategoryList()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_USER?.role])

    const getList = async () => {
        const { data, error } = await api.get(ADD_GET_MEALITEM_API);
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
        const { data, error } = await api.get(`${baseUrl}/mess-manage/api/item?status=0`);
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


    const handleEditClick = (data) => {
        if (data) {
            setModalData(data)
            setIDS(data?.meal_category_id)
            setUpdateID(data?.id)
            reset(data);
            setIsEdit(true);
        } else setIsEdit(false);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setIDS('');
        setFile('');
        setFileName('');
        setModalData([]);
        setdeleteModal(false);
        setDeleteId('');
        setInfoModalData([])
        setInfoModal(false)
    };

    const submitHandler = async () => {
        let formData = new FormData();
        formData.append('item_description', modalData.item_description)
        formData.append('item_name', modalData.item_name)
        formData.append('meal_status', `${(modalData?.meal_status === true || modalData?.meal_status === "1") ? "1" : "0"}`)
        formData.append('item_image', fileName)
        formData.append('meal_category_id', ids)
        formData.append('type', modalData.type)

        // let new_formData = {
        //     ...modalData,
        //     created_at: new Date(),
        //     item_image: file,
        //     meal_status: `${(modalData?.meal_status === true || modalData?.meal_status === "1") ? "1" : "0"}`,
        // }

        const { data } = await api.post(ADD_GET_MEALITEM_API, formData);

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


        let formData = new FormData();
        formData.append('item_description', modalData.item_description)
        formData.append('item_name', modalData.item_name)
        formData.append('meal_status', `${(modalData?.meal_status === true || modalData?.meal_status === "1") ? "1" : "0"}`)
        formData.append('item_image', fileName)
        formData.append('meal_category_id', ids)
        formData.append('type', modalData.type)


        const { data } = await api.post(ADD_GET_MEALITEM_API + "/" + updateID, formData);

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

    const handleDelete = (row) => {
        setDeleteId(row.id)
        setdeleteModal(true)
    }

    const confirmDelete = async (deleteId) => {
        const { data } = await api.del(ADD_GET_MEALITEM_API + "/" + deleteId);

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


    const isValidFileUploaded = (e) => {
        const validExtensions = ['png', 'jpeg', 'jpg']
        const fileExtension = e.target.files[0].type.split('/')[1]
        return validExtensions.includes(fileExtension)
    }

    const handleUpload = (e) => {
        if (e?.target?.files) {

            if (isValidFileUploaded(e)) {
                readURI(e)
                setFileName(e.target.files[0])
            } else {
                toast.error('only png and jpg file accepted', {
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgrefalser: false,
                    autoClose: 2000,
                    theme: "colored",
                });
            }
        }
    }

    const readURI = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = function (ev) {
                setFile(ev.target.result)
            }.bind(this);
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const removeUpload = (e) => {
        setFile('')
        setFileName('')
        e.stopPropagation()
    }


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


    //reactive data 

    const tabchange = (e) => {
        if (e.target.dataset.rrUiEventKey === "ActiveMealItemList") {
            getList()
        }
        else if (e.target.dataset.rrUiEventKey === "DeleteMealItemList") {
            getDeletedList()
        }
    }

    const reActiveDeleted = async (row, value) => {
        const { data } = await api.post(ADD_GET_MEALITEM_API + "/" + row.id, { status: value === false ? 2 : 1, updated_at: new Date() });
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
        const { data, error } = await api.get(ADD_GET_MEALITEM_API + "/" + id);
        if (data) {
            setInfoModalData(data?.data?.list)
            setInfoModal(true)
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
                            <h3 className="card-title mb-0">Meal Item</h3>
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
                                            defaultActiveKey="ActiveMealItemList"
                                            onClick={(e) => tabchange(e)}
                                        >
                                            <Tab eventKey="ActiveMealItemList" className="me-1 " title="Active Item List">
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
                                            <Tab eventKey="DeleteMealItemList" className="me-1 " title="Deleted Item List">
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
                            <div className="modal-title h4 mb-0">{`${isEdit ? 'Edit' : 'Add'} Meal Item`}</div>
                            <Button onClick={handleCloseModal} className="btn-close" variant="">
                                <i className="fa fa-times fs-6"></i>
                            </Button>
                        </Modal.Header>
                        <Modal.Body className="p-5">
                            <div className="mb-6">
                                <Row>
                                    <div className="col-lg-9 col-md-6 col-sm-12">
                                        <Row>
                                            <div className=" form-group">
                                                <label htmlFor="item_name" className="form-label">Meal name</label>
                                                <input className="form-control" type="text"
                                                    id="item_name"
                                                    placeholder="Enter full name"
                                                    name="item_name"
                                                    value={modalData?.item_name}
                                                    onChange={(e) => handleChange('item_name', e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className=" form-group">
                                                <label htmlFor="item_description" className="form-label">Meal Description</label>
                                                <input className="form-control" type="text"
                                                    id="item_description"
                                                    placeholder="Enter full name"
                                                    name="item_description"
                                                    value={modalData?.item_description}
                                                    onChange={(e) => handleChange('item_description', e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="col-lg-6 col-md-12 col-sm-12 form-group">
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

                                            <div className="col-lg-6 col-md-12 col-sm-12 form-group">
                                                <label className="form-label"> Meal Type  </label>
                                                <Select
                                                    id="type"
                                                    placeholder="Select Meal Type"
                                                    value={getKeyName(MealType, modalData?.type)}
                                                    onChange={(e) => handleChangeAssignData('type', e)}
                                                    singleSelect="true"
                                                    options={MealType}
                                                    required={true}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="custom-switch">
                                                    <label htmlFor="meal_status" className="form-label me-5"> Meal Status </label>
                                                    <input type="checkbox" className="custom-switch-input" id="meal_status"
                                                        checked={modalData?.meal_status ? Number(modalData?.meal_status) : ""}
                                                        onChange={(e) => handleChange('meal_status', e.target.checked)}
                                                    />
                                                    <span className="custom-switch-indicator"></span>
                                                </label>
                                            </div>
                                        </Row>

                                    </div>

                                    <div className="col-lg-3 col-md-6 col-sm-12 ">

                                        
                                        <div className="fileupload">
                                            {file && <button type="button" className="btn-close btn" onClick={(e) => removeUpload(e)}><i className="fa fa-times fs-6"></i></button>}
                                            <label htmlFor="mealImage" className="drop ">
                                                {file || modalData?.item_image_url ?
                                                    <>
                                                        <img style={{ minWidth: "100px", minHeight: "100px", objectFit: "contain" }} src={file?.length ? file : modalData?.item_image_url} alt="mealImage"></img>
                                                    </>
                                                    :
                                                    <button type="button" className="btn btn-dark btn btn-dark" ><i className="fe fe-upload me-2"></i>Upload Images</button>
                                                }
                                                <input className="form-control" type="file" id="mealImage" onChange={(e) => handleUpload(e)}

                                                />
                                            </label>
                                            {fileName && <span> {fileName?.name} </span>}
                                        </div>
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


            {infoModal && <ViewModal show={infoModal} data={infoModalData} handleCloseModal={() => handleCloseModal()} categoryList={categoryList} />}
        </div >
    );
}


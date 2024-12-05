import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import { baseUrl, SUPERADMIN_GET_MEALPACKAGE_API, SUPERADMIN_UPDATE_MEALPACKAGE_API } from "../../constants/endpoints";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ROLES_SLUG } from "../../constants/strings";
import { statusCheck } from "../../constants/functions";


export default function StoreManager() {
    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [datalist, setDataList] = useState([]);
    const [updateID, setUpdateID] = useState('');
    const [modalData, setModalData] = useState([]);
    const [packageCost, setPackageCost] = useState('');
    const _USER = useSelector(e => e?.common);
    const [assignModal, setAssignModal] = useState(false);
    const [packageData, setpackageData] = useState([]);
    const [campsList, setCampsList] = useState([]);
    const [ids, setIDS] = useState('');



    const api = useApi();

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

    let packID = +window.location.pathname.split('/')[2]

    const getList = async () => {
        const { data, error } = await api.get(SUPERADMIN_GET_MEALPACKAGE_API + "/" + packID);
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


    const handleEditClick = (data) => {
        setModalData(data)
        setPackageCost(data.package_cost)
        if (data) {
            setUpdateID(data.id)
            reset(data);
            setIsEdit(true);
        } else setIsEdit(false);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false)
        setAssignModal(false)
        setpackageData([])
        setCampsList([])
        setIDS('')

    };

    const submitHandler = async () => { }


    const updateData = async () => {
        let new_formData = {
            package_id: +modalData.id,
            cost: +packageCost,
        }
      

        const { data } = await api.post(SUPERADMIN_UPDATE_MEALPACKAGE_API, new_formData);

        if (data) {
            toast.success(data.message ? data.message : data.messages, {
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

    const handleChange = (name, value) => {
        if (name === "package_cost") {
            setModalData({ ...modalData, [name]: value.value })
            setPackageCost(value)
        }
        else if (name === "client_id") {
            if (value.length >= 1) {
                let ids = value.map(item => item.value).join(',');
                getCampsList(ids)
                setModalData({ ...modalData, [name]: value.value })
            }
            else {

                getCampsList(value?.value)
                setModalData({ ...modalData, [name]: value.value })
            }
        }
        else {
            setModalData({ ...modalData, [name]: value })
        }
    }


    /** Assign  */
    const handleAssign = (row, name) => {
        setAssignModal(true)
        setpackageData(row)
    }

    const handleChangeAssignData = (value) => {
        if (value.length >= 1) {
            let ids = value.map(item => item.value).join(',');
            setIDS(ids)
        }
        else {
            setIDS(value.value)
        }
    }

    const getCampsList = async (client_id) => {
        const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/client-admin/camps?client_ids=${client_id}`);
        if (data) {
            let optionList = []
            for (let index = 0; index < data?.data?.list?.length; index++) {
                let obj = { value: data?.data?.list[index]?.id, label: data?.data?.list[index]?.camp_name }
                optionList.push(obj);
            }
            setCampsList(optionList)
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



    const assignHandle = async () => {
        if (ids?.length) {
            let new_formData = {
                camp_ids: ids,
                package_id: packageData.id
            }
            const { data, error } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/meal-package/assign-camps`, new_formData);
            if (data) {
                handleCloseModal()
                toast.success(data.message ? data.message : data.messages, {
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgrefalser: false,
                    autoClose: 2000,
                    theme: "colored",
                });
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
        else {
            toast.error('please select camps', {
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
                        <Card.Header className="d-flex align-items-center justify-content-between flex-wrap">
                            <h3 className="card-title mb-0 w-100">Packages</h3>
                            <Breadcrumb className="breadcrumb1">
                                <Breadcrumb.Item className="breadcrumb-item1 active" href="/admin-kitchen-manger">
                                    kitchen Manger
                                </Breadcrumb.Item>
                                <Breadcrumb.Item className="breadcrumb-item1 text-muted">
                                    Packages
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </Card.Header>
                        <Card.Body>
                            <div className="salesdatatable">
                                <div className="table-responsive">
                                    <Productsales
                                        data={datalist}
                                        handleEditClick={(row) => handleEditClick(row, 'edit')}
                                        handleAssignCamp={(row) => handleAssign(row, 'store')}
                                    />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>



            {assignModal && (
                <Modal size="xl" show={assignModal}>
                    <form id="form" onSubmit={handleSubmit(assignHandle)} validate="true">
                        <Modal.Header>
                            <Modal.Title>
                                Assign Camps
                            </Modal.Title>
                            <Button onClick={handleCloseModal} className="btn-close" variant="">
                                <i className="fa fa-times fs-6"></i>
                            </Button>
                        </Modal.Header>
                        <Modal.Body className="p-5">
                            <div className="mb-6">
                                <Row className="mb-2">
                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label className="form-label"> Client </label>
                                        <Select
                                            id="country"
                                            placeholder="select Client"
                                            onChange={(e) => handleChange('client_id', e)}
                                            singleSelect="true"
                                            options={_USER?.clientAdministrator}
                                            isMulti={true}
                                            required={true}
                                        />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label className="form-label"> Camps </label>
                                        <Select
                                            id="client_ids"
                                            placeholder="Select Camps"
                                            onChange={(e) => handleChangeAssignData(e)}
                                            singleSelect="true"
                                            options={campsList}
                                            isMulti={true}
                                            required={true}
                                        />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                     
                                        <label htmlFor="Store_Manager" className="form-label">Package Name</label>
                                        <input className="form-control fc-not-allowed" type="text"
                                            id="Store_Manager"
                                            placeholder="SStore Manager Name"
                                            name="Store_Manager"
                                            value={packageData?.package_name}
                                            disabled
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


            {openModal && (
                <Modal size="xl" show={openModal}>
                    <form id="form" onSubmit={isEdit ? handleSubmit(updateData) : handleSubmit(submitHandler)} validate="true">
                        <Modal.Header>
                            <div className="modal-title h4 mb-0">Assign Package Cost</div>
                            <Button onClick={handleCloseModal} className="btn-close" variant="">
                                <i className="fa fa-times fs-6"></i>
                            </Button>
                        </Modal.Header>
                        <Modal.Body className="p-5">
                            <div className="mb-6">
                                <Row className="mb-2">
                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="cost" className="form-label">Cost</label>
                                        <input className="form-control" type="number"
                                            id="cost"
                                            placeholder="Enter full name"
                                            name="cost"
                                            value={modalData?.package_cost}
                                            onChange={(e) => handleChange('package_cost', e.target.value)}
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
        </div>
    );
}


export const Productsales = ({ handleEditClick, data, handleAssignCamp }) => {
    const columns = [
        {
            name: "PACKAGE NAME",
            selector: row => [row.package_name],
            sortable: true,
            cell: row => <h6 className="mb-0 fs-14 fw-semibold">{row.package_name}</h6>
        },
        {
            name: "VALIDITY",
            selector: row => [row.package_validity],
            sortable: true,
            cell: row => <h6 className="text-muted mb-0 fs-14 fw-semibold">{row.package_validity} Days</h6>
        },
        {
            name: "TYPE",
            selector: row => [row.package_type],
            sortable: true,
            cell: row => <span className={`text-${row.package_type === "Veg" ? "green" : "red"} fs-15 fw-semibold`}>{row.package_type}</span>
        },
        {
            name: "PRICE",
            selector: row => [row.package_cost],
            sortable: true,
            cell: row => <h6 className="text-muted mb-0 fs-14 fw-semibold">{row.package_cost}</h6>
        },
        {
            name: "COMMISSION",
            selector: row => [row.commission_pct],
            sortable: true,
            cell: row => <h6 className="text-muted mb-0 fs-14 fw-semibold">{row.commission_pct}%</h6>
        },
        {
            name: "FINAL COST",
            selector: row => [row.final_package_cost],
            sortable: true,
            cell: row => <h6 className="text-muted mb-0 fs-14 fw-semibold">{row.final_package_cost}</h6>
        },
        {
            name: "TOTAL COST",
            selector: row => [row.total_package_cost],
            sortable: true,
            cell: row => <h6 className="text-muted mb-0 fs-14 fw-semibold">{row.total_package_cost}</h6>
        },
        {
            name: "STATUS",
            selector: row => [row.package_status],
            sortable: true,
            cell: row => {
                if (row.package_status === "0") {
                    return (<span className={`text-red fs-15 fw-semibold`}>Deleted</span>)
                }
                else {
                    return (<span className={`text-${row.package_status === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(row.package_status)}</span>)
                }
            }
        },
        {
            name: "ACTION",
            selector: row => [row.action],
            sortable: true,
            cell: row => <span className="">
                <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
                    <Link onClick={() => handleEditClick(row)} to="#" className="btn btn-primary btn-sm rounded-11 me-2" ><i><svg className="table-edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" /></svg></i></Link>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip >Assign Camps</Tooltip>}>
                    <Link to="#" onClick={() => handleAssignCamp(row)} className="btn btn-dark btn-sm rounded-11">
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        </i>
                    </Link>
                </OverlayTrigger>
            </span>
        },
    ]
    const tableDatas = {
        columns,
        data,
    };
    return (
        <DataTableExtensions {...tableDatas} >
            <DataTable
                columns={columns}
                data={data}
                noHeader
                defaultSortField="id"
                defaultSortAsc={false}
                striped={true}
                center={true}
                persistTableHead
                pagination
                highlightOnHover />
        </DataTableExtensions>
    )
}
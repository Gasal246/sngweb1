import React, { useEffect, useState } from "react";
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApi from "../../../hooks/useApi";
import { baseUrl } from "../../../constants/endpoints";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ROLES_SLUG } from "../../../constants/strings";
import Select from 'react-select';
import ActiveList from "./ActiveList";
import ViewModal from "./ViewModal";
import CampList from '../../Camps/CampList';


export default function Camps() {
    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [datalist, setDataList] = useState([]);
    const [updateID, setUpdateID] = useState('');
    const [AssignID, setAssignID] = useState('');
    const [modalData, setModalData] = useState([]);
    const [assignModal, setAssignModal] = useState(false);
    const [assignData, setAssignData] = useState([]);
    const [assignType, setAssignType] = useState('');
    const [modalSize, setModalSize] = useState('');
    const [ids, setIDS] = useState('');
    const [posId, setPosID] = useState('');
    const [posDeviceCodeId, setPosDeviceCodeID] = useState('');
    const [posDeviceCodeCampId, setPosDeviceCodeCampID] = useState('');
    const [campidsList, setCampIDList] = useState([]);
    const [coordinatorList, setCoordinatorList] = useState([]);
    const [accountList, setAccountList] = useState([]);
    const [investorList, setInvestorList] = useState([]);
    const [posList, setPosList] = useState([]);
    const [infoModalData, setInfoModalData] = useState([]);
    const [infoModal, setInfoModal] = useState(false);
    const [campBaseId, setCampBaseId] = useState("");
    const [baseCamplist, setBaseCamplist] = useState([]);
    const [coID, setcoid] = useState([])
    const _USER = useSelector(e => e?.common);
    const api = useApi();
    const [campId, setCampId] = useState("")
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
            getcoordinatorList()
            getaccountList()
            getInvestorList()
            getposList()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_USER?.role])

    const getList = async () => {
        const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/camps?status=1`);
        if (data) {
            setDataList(data?.data?.list)
            let optionList = []
            for (let index = 0; index < data.data.list.length; index++) {
                let obj = { value: data.data.list[index].id, label: data.data.list[index].camp_name }
                optionList.push(obj);
            }
            setCampIDList(optionList)
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

    const getcoordinatorList = async () => {
        const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/coordinator`);
        if (data) {
            let optionList = []
            for (let index = 0; index < data?.data?.list.length; index++) {
                let obj = { value: data.data.list[index].id, label: data.data.list[index].full_name }
                optionList.push(obj);
            }
            setCoordinatorList(optionList)
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

    const getaccountList = async () => {
        const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/accountant`);
        if (data) {
            let optionList = []
            for (let index = 0; index < data?.data?.list.length; index++) {
                let obj = { value: data.data.list[index].id, label: data.data.list[index].full_name }
                optionList.push(obj);
            }
            setAccountList(optionList)
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
    const getInvestorList = async () => {
        const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/investors`);
        if (data) {
            let optionList = []
            for (let index = 0; index < data?.data?.list.length; index++) {
                let obj = { value: data.data.list[index].id, label: data.data.list[index].full_name }
                optionList.push(obj);
            }
            setInvestorList(optionList)
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

    const getposList = async () => {
        const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/pos`);
        if (data) {
            let optionList = []
            for (let index = 0; index < data?.data?.list.length; index++) {
                let obj = { value: data.data.list[index].id, label: data.data.list[index].full_name }
                optionList.push(obj);
            }
            setPosList(optionList)
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
        if (data) {
            setUpdateID(data.id)
            reset(data);
            setIsEdit(true);
        } else setIsEdit(false);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setAssignModal(false)
        setIDS('')
        setAssignType('')
        setModalSize('')
        setAssignData('')
        setModalData('')
        setAssignID('')
        setInfoModal(false)
        setInfoModalData([])
    };

    const submitHandler = async () => {

        let new_formData = {
            ...modalData,
            is_allowed_package_meal: `${(modalData?.is_allowed_package_meal === true || modalData?.is_allowed_package_meal === "1") ? "1" : "0"}`,
            is_allowed_package_water: `${(modalData?.is_allowed_package_water === true || modalData?.is_allowed_package_water === "1") ? "1" : "0"}`,
            is_allowed_package_internet: `${(modalData?.is_allowed_package_internet === true || modalData?.is_allowed_package_internet === "1") ? "1" : "0"}`,
        }



        const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/camps`, new_formData);

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

    const updateData = async () => {
        let { camps_uuid, camp_uuid, client_id, status, id, createdAt, updated_at, updatedAt, ...removeExtraData } = modalData;
        let new_formData = {
            ...removeExtraData,
            is_allowed_package_meal: `${(modalData?.is_allowed_package_meal === true || modalData?.is_allowed_package_meal === "1") ? "1" : "0"}`,
            is_allowed_package_water: `${(modalData?.is_allowed_package_water === true || modalData?.is_allowed_package_water === "1") ? "1" : "0"}`,
            is_allowed_package_internet: `${(modalData?.is_allowed_package_internet === true || modalData?.is_allowed_package_internet === "1") ? "1" : "0"}`,
        }

        const { data } = await api.put(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/camps/${updateID}`, new_formData);

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

    const handleStatus = async (row, value) => {
        const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/camps/status-update/${row.id}`, { status: value === false ? "2" : "1" });
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


    //reactive data 
    const tabchange = (e) => {
        if (e.target.dataset.rrUiEventKey === "ActivePOSList") {
            getList()
        }
    }

    const handleChange = (name, value) => {

        setModalData({ ...modalData, [name]: value });

    }

    const handleSiteChange = (name, isChecked) => {
        setModalData({ ...modalData, site: isChecked ? name : '' });
    }

    //Assign functionality
    const handleAssign = async (row, name, size) => {
        setCampId(row.id)
        setAssignModal(true)
        setAssignType(name)
        setModalSize(size)
        setAssignID(row.id)

        const { data, error } = await api.get(`${baseUrl}/api/client-admin/camps/assigned-pos-device-code/${row.id}`);
        if (data) {
            setAssignData(data?.data)
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


    const handleAssignPOSDeviceData = (value) => {
        setPosDeviceCodeID(value.label)
    }

    const handleAssignPOSDeviceCampData = (value) => {
        setPosDeviceCodeCampID(value.value)
    }

    const handleAssignData = (value) => {


        if (value.length >= 1) {
            let ids = value.map(item => item.value).join(',');
            setIDS(ids)
        }
        else {
            setPosID(value.value)
            setcoid(value.value)
        }
    }

    const assignHandle = async () => {
        let req = {}
        let route = '';
        if (assignType === 'coordinator') {
            req.coordinator_id = coID
            req.camp_ids = campId
            route = 'camps/assign-camps-to-coordinator'
        }

        if (assignType === 'accountant') {
            req.accountants = ids
            req.camp_id = AssignID
            route = 'camps/assign/accountant'
        }
        if (assignType === 'investors') {
            req.camp_id = AssignID
            req.investor_id = ids
            route = `camps/assign/${assignType}`
        }

        if (assignType === 'pos') {
            req.camp_ids = ids
            req.pos = posId
            req.camp_categories = "2"
            route = `camps/assign/${assignType}`
        }


        if (assignType === 'pos-device') {
            req.pos_device_code = posDeviceCodeId
            req.camp_ids = posDeviceCodeCampId
            route = `pos-device-code/assign-camps`
        }

        const { data, error } = await api.post(`${baseUrl}/api/client-admin/${route}`, req);

        if (data) {

            setAssignData(data.data)
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

    console.log(_USER, '_user')
    // view data
    const handleView = async (row) => {
        const { data, error } = await api.get(`${baseUrl}/api/client-admin/camps/${row?.id}`);
        if (data) {
            setInfoModalData(data?.data?.list)
            setInfoModal(true)
        }


    }

    const handlebaseCamp = (val) => {
        setCampBaseId(val.value)
    }
    const getAssignCampBaseList = async () => {

        const { data, error } = await api.get(`${baseUrl}/api/client-admin/camps/base-camp-users?camp_id=${campBaseId}`);

        let a1 = [];
        data?.data?.list.map((val) => {

            a1 = val.user_camp

        })
        setBaseCamplist(a1);

    }


    return (
        <div>
            <Row>
                <Col sm={12} className="col-12">
                    <Card className="mt-5">
                        <Card.Header className="d-flex align-items-center justify-content-between">
                            <h3 className="card-title mb-0">Attach Management</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="panel panel-primary">
                                <div className=" tab-menu-heading border">
                                    <div className="tabs-menu1 tabstyle2">
                                        <Tabs
                                            className="panel-tabs"
                                            variant="pills"
                                            defaultActiveKey="ActiveCampList"
                                            onClick={(e) => tabchange(e)}
                                        >
                                            <Tab eventKey="ActiveCampList" className="me-1 " title="Active Camp List">
                                                <div className="salesdatatable">
                                                    <div className="table-responsive">
                                                        <ActiveList
                                                            data={datalist}
                                                            //   handleEditClick={(row) => handleEditClick(row, 'edit')}
                                                            //   handleStatus={(row, value) => handleStatus(row, value)}
                                                            handleAssignCoordinator={(row) => handleAssign(row, 'coordinator', 'md')}
                                                            handleAssignAccountant={(row) => handleAssign(row, 'accountant', 'md')}
                                                            handleAssignPOS={(row) => handleAssign(row, 'pos', 'xl')}
                                                            handleAssignInvestor={(row) => handleAssign(row, 'investors', 'md')}
                                                            handleAssignDevice={(row) => handleAssign(row, 'pos-device', 'xl')}
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
                            <Modal.Title>{`${isEdit ? 'Edit' : 'Add'} Camps`}</Modal.Title>
                            <Button onClick={handleCloseModal} className="btn-close" variant="">
                                <i className="fa fa-times fs-6"></i>
                            </Button>
                        </Modal.Header>
                        <Modal.Body className="p-5">
                            <h4 className="d-flex">Camps Information</h4>
                            <div className="mb-6">
                                <Row className="mb-6">
                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="camp_name" className="form-label">Camp name</label>
                                        <input className="form-control" type="text"
                                            id="camp_name"
                                            placeholder="Enter Camp name"
                                            name="camp_name"
                                            value={modalData?.camp_name}
                                            onChange={(e) => handleChange('camp_name', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="camp_address" className="form-label">Camp Address</label>
                                        <input className="form-control" type="text"
                                            id="camp_address"
                                            placeholder="Enter Camp Address"
                                            name="camp_address"
                                            value={modalData?.camp_address}
                                            onChange={(e) => handleChange('camp_address', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="camp_city" className="form-label">Camp City</label>
                                        <input className="form-control" type="text"
                                            id="camp_city"
                                            placeholder="Enter Camp City"
                                            name="camp_city"
                                            value={modalData?.camp_city}
                                            onChange={(e) => handleChange('camp_city', e.target.value)}
                                            required
                                        />
                                    </div>
                                </Row>

                                <h4 className="d-flex">User Management</h4>

                                <Row className="mb-6">
                                    <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="no_of_allowed_user" className="form-label">No of User</label>
                                        <input className="form-control" type="number" id="no_of_allowed_user" placeholder="Enter no of User" name="no_of_allowed_user"
                                            value={modalData?.no_of_allowed_user}
                                            onChange={(e) => handleChange('no_of_allowed_user', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="no_of_allowed_kiosk" className="form-label">No of Kiosk</label>
                                        <input className="form-control" type="number" id="no_of_allowed_kiosk" placeholder="Enter no of Kiosk" name="no_of_allowed_kiosk"
                                            value={modalData?.no_of_allowed_kiosk}
                                            onChange={(e) => handleChange('no_of_allowed_kiosk', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="no_of_allowed_account" className="form-label">No of Account</label>
                                        <input className="form-control" type="number" id="no_of_allowed_account" placeholder="Enter no of Account" name="no_of_allowed_account"
                                            value={modalData?.no_of_allowed_account}
                                            onChange={(e) => handleChange('no_of_allowed_account', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="no_of_allowed_coordinators" className="form-label">No of Cordinator</label>
                                        <input className="form-control" type="number" id="no_of_allowed_coordinators" placeholder="Enter no of Cordinator" name="no_of_allowed_coordinators"
                                            value={modalData?.no_of_allowed_coordinators}
                                            onChange={(e) => handleChange('no_of_allowed_coordinators', e.target.value)}
                                            required
                                        />
                                    </div>
                                </Row>

                                <h4 className="d-flex">Router Setup</h4>

                                <Row className="mb-6">
                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="router_ssid" className="form-label">Router SSID</label>
                                        <input className="form-control" type="text"
                                            id="router_ssid"
                                            placeholder="Enter Router SSID"
                                            name="router_ssid"
                                            value={modalData?.router_ssid}
                                            onChange={(e) => handleChange('router_ssid', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="router_primary_ip" className="form-label">Router Primary IP</label>
                                        <input className="form-control" type="text"
                                            id="router_primary_ip"
                                            placeholder="00.00.00.00"
                                            name="router_primary_ip"
                                            value={modalData?.router_primary_ip}
                                            onChange={(e) => handleChange('router_primary_ip', e.target.value)}
                                            pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="router_secondary_ip" className="form-label">Router Secondary IP</label>
                                        <input className="form-control" type="text"
                                            id="router_secondary_ip"
                                            placeholder="00.00.00.00"
                                            name="router_secondary_ip"
                                            value={modalData?.router_secondary_ip}
                                            onChange={(e) => handleChange('router_secondary_ip', e.target.value)}
                                            pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="router_mac_address" className="form-label">Router Mac Address</label>
                                        <input className="form-control" type="text"
                                            id="router_mac_address"
                                            placeholder="00:00:00:00"
                                            name="router_mac_address"
                                            value={modalData?.router_mac_address}
                                            onChange={(e) => handleChange('router_mac_address', e.target.value)}
                                            pattern="([0-9a-fA-F]{2}[:]){5}([0-9a-fA-F]{2})"
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="router_pass" className="form-label">Router Password</label>
                                        <input className="form-control" type="password"
                                            id="router_pass"
                                            placeholder="Enter Router Password"
                                            name="router_pass"
                                            value={modalData?.router_pass}
                                            onChange={(e) => handleChange('router_pass', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="router_secret" className="form-label">Router Secret</label>
                                        <input className="form-control" type="text"
                                            id="router_secret"
                                            placeholder="Enter Router Secret"
                                            name="router_secret"
                                            value={modalData?.router_secret}
                                            onChange={(e) => handleChange('router_secret', e.target.value)}
                                            required
                                        />
                                    </div>


                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="router_alias" className="form-label">Router Alias</label>
                                        <input className="form-control" type="text"
                                            id="router_alias"
                                            placeholder="Enter Router Alias"
                                            name="router_alias"
                                            value={modalData?.router_alias}
                                            onChange={(e) => handleChange('router_alias', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                        <label htmlFor="router_hostname" className="form-label">Router Hostname</label>
                                        <input className="form-control" type="text"
                                            id="router_hostname"
                                            placeholder="Enter Router Hostname"
                                            name="router_hostname"
                                            value={modalData?.router_hostname}
                                            onChange={(e) => handleChange('router_hostname', e.target.value)}
                                            required
                                        />
                                    </div>
                                </Row>

                                <h4 className="d-flex">Package Management</h4>

                                <Row className="mb-2">
                                    <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                                        <label className="custom-switch">
                                            <label htmlFor="is_allowed_package_meal" className="form-label me-5"> Meal Package </label>
                                            <input type="checkbox" className="custom-switch-input" id="is_allowed_package_meal"
                                                checked={Number(modalData?.is_allowed_package_meal)}
                                                onChange={(e) => handleChange('is_allowed_package_meal', e.target.checked)}
                                            />
                                            <span className="custom-switch-indicator"></span>
                                        </label>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                                        <label className="custom-switch">
                                            <label htmlFor="is_allowed_package_water" className="form-label me-5"> Water Package</label>
                                            <input type="checkbox" className="custom-switch-input" id="is_allowed_package_water"
                                                checked={Number(modalData?.is_allowed_package_water)}
                                                onChange={(e) => handleChange('is_allowed_package_water', e.target.checked)}
                                            />
                                            <span className="custom-switch-indicator"></span>
                                        </label>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                                        <label className="custom-switch">
                                            <label htmlFor="is_allowed_package_internet" className="form-label me-5"> Internet Package</label>
                                            <input type="checkbox" className="custom-switch-input" id="is_allowed_package_internet"
                                                checked={Number(modalData?.is_allowed_package_internet)}
                                                onChange={(e) => handleChange('is_allowed_package_internet', e.target.checked)}
                                            />
                                            <span className="custom-switch-indicator"></span>
                                        </label>
                                    </div>
                                </Row>
                                <h4 className="d-flex">Camp selection</h4>

                                <Row className="mb-2">
                                    <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                                        <label className="custom-switch">
                                            <label htmlFor="local" className="form-label me-5"> Local </label>
                                            <input type="checkbox" className="custom-switch-input" id="local"
                                                checked={modalData?.site === 'local'}
                                                onChange={(e) => handleSiteChange('local', e.target.checked)}
                                            />
                                            <span className="custom-switch-indicator"></span>
                                        </label>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                                        <label className="custom-switch">
                                            <label htmlFor="lobal" className="form-label me-5"> Global</label>
                                            <input type="checkbox" className="custom-switch-input" id="global"
                                                checked={modalData?.site === 'global'}
                                                onChange={(e) => handleSiteChange('global', e.target.checked)}
                                            />
                                            <span className="custom-switch-indicator"></span>
                                        </label>
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

            {assignModal && (
                <Modal size={modalSize ? modalSize : 'xl'} show={assignModal} centered={modalSize === 'md' ? 'modal-dialog-centered' : ''}>
                    <form id="form" onSubmit={handleSubmit(assignHandle)} validate="true">
                        <Modal.Header>
                            <Modal.Title>
                                {assignType === 'coordinator' && 'Assign Coordinator'}
                                {assignType === 'accountant' && 'Assign Accountant'}
                                {assignType === 'pos' && 'Assign POS'}
                                {assignType === 'investors' && 'Assign Investor'}
                                {assignType === 'pos-device' && 'Assign POS Device'}
                            </Modal.Title>
                            <Button onClick={handleCloseModal} className="btn-close" variant="">
                                <i className="fa fa-times fs-6"></i>
                            </Button>
                        </Modal.Header>
                        <Modal.Body className="p-5">
                            <div className="mb-6">
                                <Row className="mb-2">
                                    {(assignType === 'coordinator' && 'Coordinator') &&
                                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                            <label className="form-label">
                                                {assignType === 'coordinator' && 'Coordinator'}
                                                {assignType === 'pos' && 'POS'}
                                            </label>
                                            {assignType === 'coordinator' &&

                                                < Select
                                                    id="coordinatorList"
                                                    placeholder="Select Coordinator"
                                                    // value={getKeyName(countryData, assignData?.country)}
                                                    onChange={(e) => handleAssignData(e)}
                                                    singleSelect="true"
                                                    options={coordinatorList}
                                                    isMulti={false}
                                                    required={true}
                                                />}
                                        </div>}

                                    {(assignType === 'pos' && 'POS') &&
                                        <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                            <label className="form-label">
                                                {assignType === 'pos' && 'POS'}
                                            </label>
                                            {assignType === 'pos' &&
                                                <Select
                                                    id="accountList"
                                                    placeholder="Select POS"
                                                    // value={getKeyName(countryData, assignData?.country)}
                                                    onChange={(e) => handleAssignData(e)}
                                                    singleSelect="true"
                                                    options={posList}
                                                    required={true}
                                                />
                                            }
                                        </div>
                                    }

                                    {(assignType === 'accountant' && 'Accountant') &&
                                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                            <label className="form-label">
                                                {assignType === 'accountant' && 'Accountant'}
                                            </label>

                                            {assignType === 'accountant' &&
                                                <Select
                                                    id="accountList"
                                                    placeholder="Select  Accountant"
                                                    // value={getKeyName(countryData, assignData?.country)}
                                                    onChange={(e) => handleAssignData(e)}
                                                    singleSelect="true"
                                                    options={accountList}
                                                    isMulti={true}
                                                    required={true}
                                                />
                                            }
                                        </div>
                                    }

                                    {(assignType === 'investors' && 'Investors') &&
                                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                            <label className="form-label">
                                                {assignType === 'investors' && 'Investors'}
                                            </label>
                                            {assignType === 'investors' &&
                                                <Select
                                                    id="investorList"
                                                    placeholder="Select investors"
                                                    // value={getKeyName(countryData, assignData?.country)}
                                                    onChange={(e) => handleAssignData(e)}
                                                    singleSelect="true"
                                                    options={investorList}
                                                    isMulti={true}
                                                    required={true}
                                                />
                                            }
                                        </div>
                                    }

                                    {assignType === 'pos' &&
                                        <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                            <label className="form-label">
                                                Camp
                                            </label>
                                            <Select
                                                id="campidsList"
                                                placeholder="Select Camp"
                                                // value={getKeyName(countryData, assignData?.country)}
                                                onChange={(e) => handleAssignData(e)}
                                                singleSelect="true"
                                                options={campidsList}
                                                isMulti={true}
                                                required={true}
                                            />
                                        </div>
                                    }
                                    {/* {assignType === 'coordinator' &&
                                        <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                            <label className="form-label">
                                                Camp
                                            </label>
                                            <Select
                                                id="campidsList"
                                                placeholder="Select Camp"
                                                // value={getKeyName(countryData, assignData?.country)}
                                                onChange={(e) => handleAssignData(e)}
                                                singleSelect="true"
                                                options={campidsList}
                                                isMulti={true}
                                                required={true}
                                            />
                                        </div>
                                    } */}
                                    {assignType === 'pos-device' &&
                                        <>
                                            <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                                <label className="form-label">
                                                    POS Device Code
                                                </label>
                                                <Select
                                                    id="accountList"
                                                    placeholder="Select POS Device Code"
                                                    // value={getKeyName(countryData, assignData?.country)}
                                                    onChange={(e) => handleAssignPOSDeviceData(e)}
                                                    singleSelect="true"
                                                    options={_USER.PosDeviceCode}
                                                    required={true}
                                                />
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                                                <label className="form-label">
                                                    Camp
                                                </label>
                                                <Select
                                                    id="campidsList"
                                                    placeholder="Select Camp"
                                                    // value={getKeyName(countryData, assignData?.country)}
                                                    onChange={(e) => handleAssignPOSDeviceCampData(e)}
                                                    singleSelect="true"
                                                    options={campidsList}
                                                    isMulti={false}
                                                    required={true}
                                                />
                                            </div>
                                        </>
                                    }
                                </Row>
                            </div>

                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-start">
                            <Button type="button" className="mx-3" variant="secondary" onClick={handleCloseModal}>Close</Button>
                            <Button type="submit" variant="primary" >Attach</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            )}

            {infoModal && <ViewModal show={infoModal} data={infoModalData} handleCloseModal={() => handleCloseModal()} />}
        </div >
    );
}
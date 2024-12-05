import React, { useEffect, useState } from "react";
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tab, Tabs } from "react-bootstrap";
import Select from 'react-select';
import { Link } from "react-router-dom";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { useForm } from "react-hook-form";
import useApi from "../../../hooks/useApi";
import { baseUrl } from "../../../constants/endpoints";
import { toast } from "react-toastify";
import { ROLES_SLUG } from "../../../constants/strings";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../../common/DeleteModal";
import ActiveList from "./ActiveList";
import ViewModal from "./ViewModal";
import DeletedList from "./DeleteList";
import { getKeyName } from "../../../constants/functions";
import Loader from "../../common/Loader";
import ActiveCampList from "./CampWise/ActiveCampList";
import DeactiveCampList from "./CampWise/DeactiveCampList";
import ActiveCoordinatorList from "./CoordinatorWise/ActiveCoordinatorList";
import DeactiveCoordinatorList from "./CoordinatorWise/DeactiveCoordinatorList";
import CoordinatorViewModal from "../ClientCoordinator/CoordinatorWise/ViewModal";
import ActiveCampWiseCoordinatorViewModal from "../ClientCoordinator/CampWise/ViewModal";

export default function ClientCoordinator() {
  const [preloader, setPreloader] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [datalist, setDataList] = useState([]);
  const [updateID, setUpdateID] = useState('');
  const [modalData, setModalData] = useState([]);

  //delete modal
  const [deleteModal, setdeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [Deletedatalist, setDeleteDataList] = useState([]);

  //info modal
  const [infoModalData, setInfoModalData] = useState([]);
  const [infoModal, setInfoModal] = useState(false);


  //campwise data
  const [campIds, setCampIDS] = useState('');
  const [ActiveCampwiseData, setActiveCampwiseData] = useState([]);
  const [DeactiveCampwiseData, setDeactiveCampwiseData] = useState([]);

  //assignInfomodal
  const [campWiseAssignCoordinatorViewModal, setCampWiseAssignCoordinatorViewModal] = useState(false);
  const [campWiseAssignCoordinatorViewModalData, setCampWiseAssignCoordinatorViewModalData] = useState([]);

  const [assignViewModal, setAssignViewModal] = useState(false);
  const [assignViewModalData, setAssignViewModalData] = useState([]);
  const [assignCoordinatorViewModal, setAssignCoordinatorViewModal] = useState(false);
  const [assignCoordinatorViewModalData, setAssignCoordinatorViewModalData] = useState([]);

  //Coordinator wise data
  const [coordinatorID, setCoordinatorID] = useState('');
  const [ActiveCoordinatorWiseData, setActiveCoordinatorWiseData] = useState([]);
  const [DeactiveCoordinatorWiseData, setDeactiveCoordinatorWiseData] = useState([]);

  //assign modal
  const [AssignID, setAssignID] = useState('');
  const [assignModal, setAssignModal] = useState(false);
  const [ids, setIDS] = useState('');

  const _USER = useSelector(e => e?.common);

  const api = useApi();
  const dispatch = useDispatch();


  const {
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {},
    shouldUnregister: true,
    mode: 'onChange',
  });


  useEffect(() => {
    if (_USER?.role?.length) {
      getList()
      getDeletedList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_USER?.role])


  const getList = async () => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/coordinator`);
    if (data) {
      setDataList(data?.data?.list)
      let optionList = []
      for (let index = 0; index < data?.data?.list?.length; index++) {
        let obj = { value: data?.data?.list[index]?.id, label: data?.data?.list[index]?.full_name }
        optionList.push(obj);
      }
      dispatch({ type: 'COORDINATORLIST', payload: optionList });
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

  const getDeletedList = async () => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/coordinator?status=0`);
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
    setAssignViewModalData([])
    setAssignViewModal(false)
    setCampWiseAssignCoordinatorViewModalData([])
    setCampWiseAssignCoordinatorViewModal(false)
    setAssignCoordinatorViewModal(false)
    setAssignCoordinatorViewModalData([])
    setAssignModal(false)
  };

  const submitHandler = async () => {
    let new_formData = {
      ...modalData,
      is_internet_management: `${(modalData?.is_internet_management === true || modalData?.is_internet_management === "1") ? "1" : "0"}`,
      is_mess_management: `${(modalData?.is_mess_management === true || modalData?.is_mess_management === "1") ? "1" : "0"}`,
      is_water_management: `${(modalData?.is_water_management === true || modalData?.is_water_management === "1") ? "1" : "0"}`,

    }
    const { data, error } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/coordinator`, new_formData);

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

    } else if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }


  const updateData = async () => {
    const { client_id, role_id, status, createdAt, updatedAt, id, ...removeData } = modalData;
    let new_formData = {
      ...removeData,
      is_internet_management: `${(modalData?.is_internet_management === true || modalData?.is_internet_management === "1") ? "1" : "0"}`,
      is_mess_management: `${(modalData?.is_mess_management === true || modalData?.is_mess_management === "1") ? "1" : "0"}`,
      is_water_management: `${(modalData?.is_water_management === true || modalData?.is_water_management === "1") ? "1" : "0"}`,
    }

    const { data, error } = await api.put(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/coordinator/${updateID}`, new_formData);
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
    } else if (error) {
      toast.success(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }

  const handleStatus = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/coordinator/status-update/${row.id}`, { status: value === false ? "2" : "1" });

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

  //reactive data 


  const clearData = () => {
    setCampIDS('')
    setCoordinatorID('')
    setActiveCampwiseData([])
    setDeactiveCampwiseData([])
    setActiveCoordinatorWiseData([])
    setDeactiveCoordinatorWiseData([])
  }


  const tabchange = (e) => {
    if (e.target.dataset.rrUiEventKey === "ActiveCoordinatorList") {
      getList()
      clearData()
    }
    else if (e.target.dataset.rrUiEventKey === "DeleteCoordinatorList") {
      getDeletedList()
      clearData()
    }
    else if (e.target.dataset.rrUiEventKey === "CampWiseList" || e.target.dataset.rrUiEventKey === "CampWiseList") {
      clearData()
    }
  }

  const reActiveDeleted = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/coordinator/status-update/${row.id}`, { status: value === false ? "2" : "1"});

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


  //Delete Funtionality
  const handleDelete = (row) => {
    setDeleteId(row.id)
    setdeleteModal(true)
  }

  const confirmDelete = async (deleteId) => {
    const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/coordinator/status-update/${deleteId}`, { status: 0});

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

  const handleChange = (name, value) => {
    setModalData({ ...modalData, [name]: value })
  }


  // view modal
  const getInfoData = async (id) => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/coordinator/${id}`);
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



  // Get Assign Package By Camps
  const getActiveAssignPackagebyCamps = async (campIds) => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/camps/assigned-coordinators-by-camp?camp_id=${campIds}&status=1`);
    if (data) {
      setActiveCampwiseData(data?.data?.list)
      setPreloader(false)
    }
    else {
      setPreloader(false)
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgrefalser: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }

  const getDeactiveAssignPackagebyCamps = async (campIds) => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/camps/assigned-coordinators-by-camp?camp_id=${campIds}&status=2`);
    if (data) {
      setDeactiveCampwiseData(data?.data?.list)
      setPreloader(false)
    }
    else {
      setPreloader(false)
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgrefalser: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }

  const GetCampsAssignData = (value) => {
    if (value) {
      setCampIDS(value.value)
    }
    else {
      setActiveCampwiseData([])
      setDeactiveCampwiseData([])
    }
  }

  const getAssignPackagebyCampsList = () => {
    if (campIds.length) {
      setPreloader(true)
      getActiveAssignPackagebyCamps(campIds)
      getDeactiveAssignPackagebyCamps(campIds)
    }
    else {
      toast.error('Please Select Camps', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }







  // Get Assign Camps By Coordinator
  const getActiveAssignCampsByCoordinator = async (coordinatorID) => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/coordinator/assigned-camps-by-coordinator?coordinator_id=${coordinatorID}&status=1`);
    if (data) {
      setActiveCoordinatorWiseData(data?.data?.list)
      setPreloader(false)
    }
    else {
      setPreloader(false)
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgrefalser: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }
  const getDeactiveAssignCampsByCoordinator = async (coordinatorID) => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/coordinator/assigned-camps-by-coordinator?coordinator_id=${coordinatorID}&status=2`);
    if (data) {
      setDeactiveCoordinatorWiseData(data?.data?.list)
      setPreloader(false)
    }
    else {
      setPreloader(false)
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgrefalser: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }

  const GetCoordinatorAssignData = (value) => {
    if (value) {
      setCoordinatorID(value.value)
    }
    else {
      setActiveCoordinatorWiseData([])
      setDeactiveCoordinatorWiseData([])
    }
  }

  const getAssignCampsByCoordinatorList = () => {
    // setCoordinatorWiseData([])
    if (coordinatorID.length) {
      setPreloader(true)
      getActiveAssignCampsByCoordinator(coordinatorID)
      getDeactiveAssignCampsByCoordinator(coordinatorID)
    }
    else {
      toast.error('Please Select Coordinator', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgrefalser: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }



  //assign camp  details/view modal 
  const handleAssignView = (row) => {
    setAssignViewModalData(row)
    setAssignViewModal(true)

  }

  const handleCampWiseAssignView = (row) => {
    setCampWiseAssignCoordinatorViewModalData(row)
    setCampWiseAssignCoordinatorViewModal(true)
  }

  //assign details/view modal 
  const handleCoordintorAssignView = (row) => {
    setAssignCoordinatorViewModalData(row)
    setAssignCoordinatorViewModal(true)
  }


  //Assign Camps functionality
  const handleAssignCamps = async (row) => {
    setAssignModal(true)
    setAssignID(row.id)
  }

  const handleAssignData = (value) => {
    if (value.length >= 1) {
      let ids = value.map(item => item.value).join(',');
      setIDS(ids)
    }
    else {
      setIDS(value.value)
    }
  }

  const assignHandle = async () => {
    let req = {}
    req.camp_ids = ids
    req.coordinator_id = AssignID

    const { data, error } = await api.post(`${baseUrl}/api/client-admin/camps/assign-camps-to-coordinator`, req);
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



  return (
    <div>
      {preloader && <Loader />}
      <Row>
        <Col sm={12} className="col-12">
          <Card className="mt-5">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <h3 className="card-title mb-0">Coordinator</h3>
              <OverlayTrigger placement="top" overlay={<Tooltip >Add</Tooltip>}>
                <Link onClick={() => handleEditClick()} to="#" className="btn btn-primary btn-icon text-white me-3">
                  <span>
                    <i className="fe fe-plus"></i>&nbsp;
                  </span>
                  Add Coordinator
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
                      defaultActiveKey="ActiveCoordinatorList"
                      onClick={(e) => tabchange(e)}
                    >
                      <Tab eventKey="ActiveCoordinatorList" className="me-1 " title="Active Coordinator List">
                        <div className="salesdatatable">
                          <div className="table-responsive">
                            <ActiveList
                              data={datalist}
                              handleEditClick={(row) => handleEditClick(row, 'edit')}
                              handleStatus={(row, value) => handleStatus(row, value)}
                              handleDelete={(row) => handleDelete(row)}
                              handleView={(row) => handleView(row)}
                              handleAssignCamps={(row) => handleAssignCamps(row)}
                            />
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="DeleteCoordinatorList" className="me-1 " title="Deleted Coordinator List">
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

                      <Tab eventKey="CampWiseList" className="me-1 " title="Camp Wise List">
                        <hr />
                        <div className="salesdatatable">
                          <Row className="mb-2">
                            <div className="form-group" style={{ minWidth: "200px", maxWidth: "500px" }}>
                              <label className="form-label">Select Camps </label>
                              <div className="form-group d-flex px-0 align-items-start" style={{ minWidth: "200px" }}>
                                <Select
                                  id="camps_id"
                                  className="w-65"
                                  placeholder="Select Camps"
                                  onChange={(e) => GetCampsAssignData(e)}
                                  singleSelect="true"
                                  options={_USER?.campsList}
                                  required={true}
                                  classNamePrefix="select select-custom"
                                  value={getKeyName(_USER?.campsList, campIds)}

                                />
                                <Button className="btn btn-gray-dark ms-3" variant="default" onClick={() => getAssignPackagebyCampsList()}>Get List </Button>
                              </div>
                            </div>
                            <div className="tabs-menu1 tabstyle2">
                              <Tabs
                                className=" panel-tabs "
                                variant="pills"
                                defaultActiveKey="ActiveCampWiseList"
                                onClick={(e) => tabchange(e)}
                              >
                                <Tab eventKey="ActiveCampWiseList" className="me-1 " title="Active List">
                                  <div className="table-responsive">
                                    <ActiveCampList
                                      data={ActiveCampwiseData}
                                      _USER={_USER}
                                      handleCampWiseAssignView={(row) => handleCampWiseAssignView(row)}
                                    />
                                  </div>
                                </Tab>
                                <Tab eventKey="DeativeCampWiseList" className="me-1 " title="Deactivated List">
                                  <div className="table-responsive">
                                    <DeactiveCampList
                                      data={DeactiveCampwiseData}
                                      _USER={_USER}
                                      handleCampWiseAssignView={(row) => handleCampWiseAssignView(row)}
                                    />
                                  </div>
                                </Tab>
                              </Tabs>
                            </div>
                          </Row>
                        </div>
                      </Tab>

                      <Tab eventKey="CoordinatorWiseList" className="me-1 " title="Coordinator Wise List">
                        <hr />
                        <div className="salesdatatable">
                          <Row className="mb-2">
                            <div className="form-group" style={{ minWidth: "200px", maxWidth: "500px" }}>
                              <label className="form-label">Select Coordinator </label>
                              <div className="form-group d-flex px-0 align-items-start" style={{ minWidth: "200px" }}>
                                <Select
                                  id="package_id"
                                  className="w-65"
                                  placeholder="Select Coordinator"
                                  onChange={(e) => GetCoordinatorAssignData(e)}
                                  singleSelect="true"
                                  options={_USER?.coordinatorList}
    
                                  required={true}
                                  value={getKeyName(_USER?.coordinatorList, coordinatorID)}
                                />
                                <Button className="btn btn-gray-dark ms-3" variant="default" onClick={() => getAssignCampsByCoordinatorList()}>Get List </Button>
                              </div>
                            </div>
                            <div className="tabs-menu1 tabstyle2">
                              <Tabs
                                className=" panel-tabs "
                                variant="pills"
                                defaultActiveKey="ActiveCoordinatorWiseList"
                                onClick={(e) => tabchange(e)}
                              >
                                <Tab eventKey="ActiveCoordinatorWiseList" className="me-1 " title="Active List">
                                  <div className="table-responsive">
                                    <ActiveCoordinatorList
                                      data={ActiveCoordinatorWiseData}
                                      _USER={_USER}
                                      handleAssignView={(row) => handleCoordintorAssignView(row)}
                                    />
                                  </div>
                                </Tab>
                                <Tab eventKey="DeativeCoordinatorWiseList" className="me-1 " title="Deactivated List">
                                  <div className="table-responsive">
                                    <DeactiveCoordinatorList
                                      data={DeactiveCoordinatorWiseData}
                                      handleAssignView={(row) => handleCoordintorAssignView(row)}
                                      _USER={_USER}
                                    />
                                  </div>
                                </Tab>
                              </Tabs>
                            </div>
                          </Row>
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
          <form id="form" onSubmit={isEdit ? handleSubmit(updateData) : handleSubmit(submitHandler)}>
            <Modal.Header>
              <div className="modal-title h4 mb-0">{`${isEdit ? 'Edit' : 'Add'} Client Coordinator`}</div>
              <Button onClick={handleCloseModal} className="btn-close" variant="">
                <i className="fa fa-times fs-6"></i>
              </Button>
            </Modal.Header>
            <Modal.Body className="p-5">
              <h4 className="d-flex">Coordinator Information</h4>
              <div className="mb-6">
                <Row className="mb-2">
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="full_name" className="form-label">Full name</label>
                    <input className="form-control" type="text"
                      id="full_name"
                      placeholder="Enter full name"
                      name="full_name"
                      value={modalData?.full_name}
                      onChange={(e) => handleChange('full_name', e.target.value)}
                      required
                    />
                    {/* <CFormFeedback invalid>Full name is required</CFormFeedback> */}
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input className="form-control" type="email" id="email" placeholder="Enter email address" name="email"
                      value={modalData?.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                    />
                    {errors["business_name"] && <small className="form-text fs-12 text-red">Business name is required.</small>}
                  </div>
                 
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input className="form-control" type="password" id="password" placeholder="Enter password" name="password"
                      value={modalData?.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      required
                    />
                    {errors["business_name"] && <small className="form-text fs-12 text-red">Business name is required.</small>}
                  </div>
                </Row>

                <Row className="mb-2">
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className="custom-switch">
                      <label htmlFor="is_mess_management" className="form-label me-5"> Mess management </label>
                      <input type="checkbox" className="custom-switch-input" id="is_mess_management"
                        checked={Number(modalData?.is_mess_management)}
                        onChange={(e) => handleChange('is_mess_management', e.target.checked)}
                      />
                      <span className="custom-switch-indicator"></span>
                    </label>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className="custom-switch">
                      <label htmlFor="is_internet_management" className="form-label me-5"> Internet management </label>
                      <input type="checkbox" className="custom-switch-input" id="is_internet_management"
                        checked={Number(modalData?.is_internet_management)}
                        onChange={(e) => handleChange('is_internet_management', e.target.checked)}
                      />
                      <span className="custom-switch-indicator"></span>
                    </label>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className="custom-switch">
                      <label htmlFor="is_water_management" className="form-label me-5"> Water management </label>
                      <input type="checkbox" className="custom-switch-input" id="is_water_management"
                        checked={Number(modalData?.is_water_management)}
                        onChange={(e) => handleChange('is_water_management', e.target.checked)}
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
        <Modal size="md" show={assignModal} centered="modal-dialog-centered">
          <form id="form" onSubmit={handleSubmit(assignHandle)} validate="true">
            <Modal.Header>
              <Modal.Title>Assign Camps </Modal.Title>
              <Button onClick={handleCloseModal} className="btn-close" variant="">
                <i className="fa fa-times fs-6"></i>
              </Button>
            </Modal.Header>
            <Modal.Body className="p-5">
              <div className="mb-6">
                <Row className="mb-2">
                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <label className="form-label">camps </label>
                    < Select
                      id="coordinatorList"
                      placeholder="Select Camps"
                      // value={getKeyName(countryData, assignData?.country)}
                      onChange={(e) => handleAssignData(e)}
                      singleSelect="true"
                      options={_USER?.campsList}
                      isMulti={true}
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
        </Modal>
      )}

      {deleteModal && <DeleteModal show={deleteModal} confirmDelete={() => confirmDelete(deleteId)} handleCloseModal={() => handleCloseModal()} />}

      {infoModal && <ViewModal show={infoModal} data={infoModalData} handleCloseModal={() => handleCloseModal()} />}

      {assignViewModal && <ViewModal show={assignViewModal} data={assignViewModalData} handleCloseModal={() => handleCloseModal()} campsList={_USER?.campsList} />}

      {campWiseAssignCoordinatorViewModal && <ActiveCampWiseCoordinatorViewModal show={campWiseAssignCoordinatorViewModal} data={campWiseAssignCoordinatorViewModalData} handleCloseModal={() => handleCloseModal()} campsList={_USER?.campsList} />}

      {assignCoordinatorViewModal && <CoordinatorViewModal show={assignCoordinatorViewModal} data={assignCoordinatorViewModalData} handleCloseModal={() => handleCloseModal()} coordinatorList={_USER?.coordinatorList} />}
    </div>
  );
}
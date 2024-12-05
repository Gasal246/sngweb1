import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import { baseUrl } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ROLES_SLUG } from "../../constants/strings";
import DeleteModal from "../common/DeleteModal";
import ActiveList from "./ActiveList";
import ViewModal from "./ViewModal";
import DeletedList from "./DeleteList";
import { getKeyName } from "../../constants/functions";
import ActiveCampWise from "./CampWise/ActiveCampWise";
import DeactiveCampWise from "./CampWise/DeactiveCampWise";
import DeactiveStoreWise from "./StoreWise/DeactiveStoreWise";
import ActiveStoreWise from "./StoreWise/ActiveStoreWise";
import AssignViewModal from "./AssignViewModal";
import Loader from "../common/Loader";


export default function StoreManager() {
  const [preloader, setPreloader] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [datalist, setDataList] = useState([]);
  const [updateID, setUpdateID] = useState('');
  const [modalData, setModalData] = useState([]);
  const [assignModal, setAssignModal] = useState(false);
  const [storeData, setStoreData] = useState([]);
  const [campsList, setCampsList] = useState([]);
  const [ids, setIDS] = useState('');

  //delete
  const [deleteModal, setdeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [Deletedatalist, setDeleteDataList] = useState([]);

  //info modal
  const [infoModalData, setInfoModalData] = useState([]);
  const [infoModal, setInfoModal] = useState(false);

  // camps wise list
  const [clientId, setClientId] = useState('');
  const [campIds, setCampIDS] = useState('');
  const [ActiveCampwiseData, setActiveCampwiseData] = useState([]);
  const [DeactiveCampwiseData, setDeactiveCampwiseData] = useState([]);

  // package wise list
  const [packageId, setStoreID] = useState('');
  const [ActiveStoreWiseData, setActiveStoreWiseData] = useState([]);
  const [DeactiveStoreWiseData, setDeactiveStoreWiseData] = useState([]);


  //assignInfomodal
  const [assignViewModal, setAssignViewModal] = useState(false);
  const [assignViewModalData, setAssignViewModalData] = useState([]);



  const _USER = useSelector(e => e?.common);
  const dispatch = useDispatch();


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
      getDeletedList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_USER?.role])

  const getList = async () => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/store-manager`);
    if (data) {
      setDataList(data.data.list)
      let optionList = []

      for (let index = 0; index < data?.data?.list?.length; index++) {
        let obj = { value: data?.data?.list[index]?.id, label: data?.data?.list[index]?.full_name }
        optionList.push(obj);
      }
      dispatch({ type: 'STORELIST', payload: optionList });
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
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/store-manager?status=0`);
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
      setUpdateID(data.id)
      reset(data);
      setIsEdit(true);
    } else setIsEdit(false);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false)
    setAssignModal(false)
    setIDS('')
    setDeleteId('');
    setStoreData([])
    setCampsList([])
    setInfoModalData([])
    setInfoModal(false)
    setAssignViewModalData([])
    setAssignViewModal(false)
  };

  const submitHandler = async () => {
    let new_formData = {
      ...modalData,
      is_mess_management: `${(modalData?.is_mess_management === true || modalData?.is_mess_management === "1") ? "1" : "0"}`,
      is_water_management: `${(modalData?.is_water_management === true || modalData?.is_water_management === "1") ? "1" : "0"}`,
      created_at: new Date()
    }

    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/store-manager`, new_formData);

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
    let new_formData = {
      ...modalData,
      is_mess_management: `${(modalData?.is_mess_management === true || modalData?.is_mess_management === "1") ? "1" : "0"}`,
      is_water_management: `${(modalData?.is_water_management === true || modalData?.is_water_management === "1") ? "1" : "0"}`,
      updated_at: new Date()
    }

    const { data } = await api.put(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/store-manager/${updateID}`, new_formData);

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
    if (name === "client_id") {
      setCampIDS('')
      setClientId(value?.value)
      getCampsList(value?.value)
      setModalData({ ...modalData, [name]: value.value })
    }
    else {
      setClientId(value?.value)
      setModalData({ ...modalData, [name]: value })
    }
  }


  /** Assign  */
  const handleAssign = (row, name) => {
    setAssignModal(true)
    setStoreData(row)
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
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/client-admin/camp/${client_id}`);
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
        ...modalData,
        camp_ids: ids,
        store_manager_id: storeData.id
      }
      const { data, error } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/store-manager/assign-camps`, new_formData);
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


  //reactive data 

  const clearData = () => {

    setStoreID('')
    setCampIDS('')
    setClientId('')
    setCampsList([])
    setActiveCampwiseData([])
    setDeactiveCampwiseData([])
    setActiveStoreWiseData([])
    setDeactiveStoreWiseData([])
  }

  const tabchange = (e) => {
    if (e.target.dataset.rrUiEventKey === "ActiveStoreList") {
      getList()
      clearData()
    }
    else if (e.target.dataset.rrUiEventKey === "DeleteStoreList") {
      getDeletedList()
      clearData()
    }
    else if (e.target.dataset.rrUiEventKey === "CampWiseList" || e.target.dataset.rrUiEventKey === "StoreWiseList") {
      clearData()
    }
  }

  const reActiveDeleted = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/store-manager/status-update/${row.id}`, { status: value === false ? "2" : "1", updated_at: new Date() });

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



  // handleStatus
  const handleStatus = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/store-manager/status-update/${row.id}`, { status: value === false ? "2" : "1", updated_at: new Date() });

    if (data) {
      toast.success(data.message ? data.message : data.messages, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
      getList()
    }
  }


  //delete functionality 

  const handleDelete = (row) => {
    setDeleteId(row.id)
    setdeleteModal(true)
  }

  const confirmDelete = async (deleteId) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/store-manager/status-update/${deleteId}`, { status: 0, deleted_at: new Date() });

    if (data) {
      toast.success(data.message ? data.message : data.messages, {
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


  // view modal
  const getInfoData = async (id) => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/store-manager/${id}`);
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

  // Get Assign Store By Camps
  const getActiveAssignStorebyCamps = async (campIds) => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/store-manager/assigned-stores-by-camp?camp_id=${campIds}&status=1`);
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
  const getDeactiveAssignStorebyCamps = async (campIds) => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/store-manager/assigned-stores-by-camp?camp_id=${campIds}&status=0`);
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

  const GetCampsAssignData = (value) => {
    if (value) {
      setCampIDS(value.value)
    }
    else {
      setActiveCampwiseData([])
    }
  }

  const getAssignStorebyCampsList = () => {
    if (campIds.length) {
      setPreloader(true)
      getActiveAssignStorebyCamps(campIds)
      getDeactiveAssignStorebyCamps(campIds)
    }
    else {
      toast.error('Please Select Client And Camps', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }


  // Get Assign Camps By Store

  const getActiveAssignCampsByStore = async (packageId) => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/store-manager/assigned-camps?store_manager_id=${packageId}&status=1`);
    if (data) {
      setActiveStoreWiseData(data?.data?.list)
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
  const getDeactiveAssignCampsByStore = async (packageId) => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/store-manager/assigned-camps?store_manager_id=${packageId}&status=0`);
    if (data) {
      setDeactiveStoreWiseData(data?.data?.list)
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

  const GetStoreAssignData = (value) => {
    if (value) {
      setStoreID(value.value)
    }
    else {
      setActiveStoreWiseData([])
      setDeactiveStoreWiseData([])
    }
  }

  const getAssignCampsByStoreList = () => {
    if (packageId.length) {
      setPreloader(true)
      getActiveAssignCampsByStore(packageId)
      getDeactiveAssignCampsByStore(packageId)
    }
    else {
      toast.error('Please Select Manager', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgrefalser: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }



  //assign details/view modal 
  const handleAssignView = (row) => {
    setAssignViewModalData(row)
    setAssignViewModal(true)
  }


  return (
    <div>
      {preloader && <Loader />}
      <Row>
        <Col sm={12} className="col-12">
          <Card className="mt-5">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <h3 className="card-title mb-0">Store Manager</h3>
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
                      defaultActiveKey="ActiveStoreList"
                      onClick={(e) => tabchange(e)}
                    >
                      <Tab eventKey="ActiveStoreList" className="me-1 " title="Active Store Manager List">
                        <div className="salesdatatable">
                          <div className="table-responsive">
                            <ActiveList
                              data={datalist}
                              handleEditClick={(row) => handleEditClick(row, 'edit')}
                              handleAssignStore={(row) => handleAssign(row, 'store')}
                              handleStatus={(row, value) => handleStatus(row, value)}
                              handleDelete={(row) => handleDelete(row)}
                              handleView={(row) => handleView(row)}
                            />
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="DeleteStoreList" className="me-1 " title="Deleted Store Manager List">
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

                      <Tab eventKey="CampWiseList" className="me-1 " title="Camps Wise List">
                        <hr />
                        <div className="salesdatatable">
                          <Row className="mb-2">
                            <div className=" form-group" style={{ minWidth: "200px", maxWidth: "333px" }}>
                              <label className="form-label"> Select Client </label>
                              <Select
                                id="country"
                                placeholder="select Client"
                                onChange={(e) => handleChange('client_id', e)}
                                singleSelect="true"
                                options={_USER?.clientAdministrator}
                                required={true}
                                value={getKeyName(_USER?.clientAdministrator, clientId)}
                              />
                            </div>
                            <div className="form-group" style={{ minWidth: "200px", maxWidth: "500px" }}>
                              <label className="form-label">Select Camps </label>
                              <div className="form-group d-flex px-0 align-items-start" style={{ minWidth: "200px" }}>
                                <Select
                                  id="camps_id"
                                  className="w-65"
                                  placeholder="select camps"
                                  onChange={(e) => GetCampsAssignData(e)}
                                  singleSelect="true"
                                  options={campsList}
                                  required={true}
                                  value={getKeyName(campsList, campIds)}
                                />
                                <Button className="btn btn-gray-dark ms-3" variant="default" onClick={() => getAssignStorebyCampsList()}>Get List </Button>
                              </div>
                            </div>

                            <div className="tabs-menu1 tabstyle2">
                              <Tabs
                                className=" panel-tabs "
                                variant="pills"
                                defaultActiveKey="ActiveCampWiseList"
                                onClick={(e) => tabchange(e)}
                              >
                                <Tab eventKey="ActiveCampWiseList" className="me-1 " title="Active Camps Wise List">
                                  <div className="table-responsive">
                                    <ActiveCampWise
                                      data={ActiveCampwiseData}
                                      handleAssignView={(row) => handleAssignView(row)}
                                    />
                                  </div>
                                </Tab>
                                <Tab eventKey="DeativeCampWiseList" className="me-1 " title="Deative Camps Wise List">
                                  <div className="table-responsive">
                                    <DeactiveCampWise
                                      data={DeactiveCampwiseData}
                                      handleAssignView={(row) => handleAssignView(row)} />
                                  </div>
                                </Tab>
                              </Tabs>
                            </div>
                          </Row>
                        </div>
                      </Tab>


                      <Tab eventKey="StoreWiseList" className="me-1 " title="Store Wise List">
                        <hr />
                        <div className="salesdatatable">
                          <Row className="mb-2">
                            <div className="form-group" style={{ minWidth: "200px", maxWidth: "500px" }}>
                              <label className="form-label">Select Store Manager </label>
                              <div className="form-group d-flex px-0 align-items-start" style={{ minWidth: "200px" }}>
                                <Select
                                  id="package_id"
                                  className="w-65"
                                  placeholder="select Store Manager"
                                  onChange={(e) => GetStoreAssignData(e)}
                                  singleSelect="true"
                                  options={_USER?.AdminStoreList}
                                  required={true}
                                  value={getKeyName(_USER?.AdminStoreList, packageId)}
                                />
                                <Button className="btn btn-gray-dark ms-3" variant="default" onClick={() => getAssignCampsByStoreList()}>Get List </Button>
                              </div>
                            </div>
                            <div className="tabs-menu1 tabstyle2">
                              <Tabs
                                className=" panel-tabs "
                                variant="pills"
                                defaultActiveKey="ActiveStoreWiseList"
                                onClick={(e) => tabchange(e)}
                              >
                                <Tab eventKey="ActiveStoreWiseList" className="me-1 " title="Active Store Wise List">
                                  <div className="table-responsive">
                                    <ActiveStoreWise
                                      data={ActiveStoreWiseData}
                                      _USER={_USER}
                                      handleAssignView={(row) => handleAssignView(row)}
                                    />
                                  </div>
                                </Tab>
                                <Tab eventKey="DeactiveStoreWiseList" className="me-1 " title="Deactive Store Wise List">
                                  <div className="table-responsive">
                                    <DeactiveStoreWise
                                      data={DeactiveStoreWiseData}
                                      _USER={_USER}
                                      handleAssignView={(row) => handleAssignView(row)}
                                    />
                                  </div>
                                </Tab>
                              </Tabs>
                            </div>

                          </Row>
                        </div>
                      </Tab>
                    </Tabs>
                  </div> </div>
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
                    <label htmlFor="Store_Manager" className="form-label">Store Manager</label>
                    <input className="form-control fc-not-allowed" type="text"
                      id="Store_Manager"
                      placeholder="SStore Manager Name"
                      name="Store_Manager"
                      value={storeData?.full_name}
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
          <form id="form" onSubmit={isEdit ? handleSubmit(updateData) : handleSubmit(submitHandler)} validate>
            <Modal.Header>
              <div className="modal-title h4 mb-0">{`${isEdit ? 'Edit' : 'Add'} Store Manager`}</div>
              <Button onClick={handleCloseModal} className="btn-close" variant="">
                <i className="fa fa-times fs-6"></i>
              </Button>
            </Modal.Header>
            <Modal.Body className="p-5">
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
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input className="form-control" type="password" id="password" placeholder="Enter password" name="password"
                      value={modalData?.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      required
                    />
                  </div>
                </Row>

                <Row>
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input className="form-control" type="text" id="location" placeholder="Enter Location" name="location"
                      value={modalData?.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                    />
                  </div>
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

      {deleteModal && <DeleteModal show={deleteModal} confirmDelete={() => confirmDelete(deleteId)} handleCloseModal={() => handleCloseModal()} />}

      {infoModal && <ViewModal show={infoModal} data={infoModalData} handleCloseModal={() => handleCloseModal()} />}

      {assignViewModal && <AssignViewModal show={assignViewModal} data={assignViewModalData} handleCloseModal={() => handleCloseModal()} _USER={_USER} />}

    </div>
  );
}


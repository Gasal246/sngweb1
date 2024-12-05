import React, { useEffect, useState } from "react";
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { useForm } from "react-hook-form";
import useApi from "../../../hooks/useApi";
import { baseUrl } from "../../../constants/endpoints";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ROLES_SLUG } from "../../../constants/strings";
import DeleteModal from "../../common/DeleteModal";
import DeletedList from "./DeleteList";
import ActiveList from "./ActiveList";
import ViewModal from "./ViewModal";
import { getKeyName } from "../../../constants/functions";
import ActiveCampList from "./CampWise/ActiveCampList";
import DeactiveCampList from "./CampWise/DeactiveCampList";
import Loader from "../../common/Loader";
import DeactiveAccountantList from "./AccountantWise/DeactiveAccountantList";
import ActiveAccountantList from "./AccountantWise/ActiveAccountantList";
import AccountantViewModal from "../../Camps/ViewModal";

export default function ClientAccountant() {
  const [preloader, setPreloader] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [datalist, setDataList] = useState([]);
  const [updateID, setUpdateID] = useState('');
  const [modalData, setModalData] = useState([]);

  //delet modal
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
  const [assignViewModal, setAssignViewModal] = useState(false);
  const [assignViewModalData, setAssignViewModalData] = useState([]);
  const [assignAccountantViewModal, setAssignAccountantViewModal] = useState(false);
  const [assignAccountantViewModalData, setAssignAccountantViewModalData] = useState([]);


  //Accountant wise data
  const [accountantID, setAccountantID] = useState('');
  const [ActiveAccountantWiseData, setActiveAccountantWiseData] = useState([]);
  const [DeactiveAccountantWiseData, setDeactiveAccountantWiseData] = useState([]);

  //assign modal
  const [AssignID, setAssignID] = useState('');
  const [assignModal, setAssignModal] = useState(false);
  const [ids, setIDS] = useState('');


  const _USER = useSelector(e => e?.common);

  const api = useApi();
  const dispatch = useDispatch();


  const {
    // register,
    handleSubmit,
    formState: { errors },
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
      getDeletedList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_USER?.role])

  const getList = async () => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/accountant`);
    if (data) {
      setDataList(data?.data?.list)
      let optionList = []
      for (let index = 0; index < data?.data?.list?.length; index++) {
        let obj = { value: data?.data?.list[index]?.id, label: data?.data?.list[index]?.full_name }
        optionList.push(obj);
      }
      dispatch({ type: 'ACCOUNTANTLIST', payload: optionList });
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
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/accountant?status=0`);
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
    setAssignAccountantViewModalData([])
    setAssignAccountantViewModal(false)
    setAssignModal(false)
  };

  const submitHandler = async () => {
    let new_formData = {
      ...modalData,

    }

    const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/accountant`, new_formData);

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

  const updateData = async () => {
    const { client_id, role_id, status, createdAt, updatedAt, id, ...removeData } = modalData;
    let new_formData = {
      ...removeData,
    }
    const { data } = await api.put(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/accountant/${updateID}`, new_formData);
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

  const handleStatus = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/accountant/status-update/${row.id}`, { status: value === false ? "2" : "1" });
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
    setActiveCampwiseData([])
    setDeactiveCampwiseData([])
    setAccountantID('')
    setActiveAccountantWiseData([])
    setDeactiveAccountantWiseData([])
  }


  const tabchange = (e) => {
    if (e.target.dataset.rrUiEventKey === "ActiveAccountantList") {
      getList()
      clearData()
    }
    else if (e.target.dataset.rrUiEventKey === "DeleteAccountantList") {
      getDeletedList()
      clearData()
    }
    else if (e.target.dataset.rrUiEventKey === "CampWiseList" || e.target.dataset.rrUiEventKey === "AccountantWiseList") {
      clearData()
    }
  }

  const reActiveDeleted = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/accountant/status-update/${row.id}`, { status: value === false ? "2" : "1", updated_at: new Date() });

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


  //delete functionality 
  const handleDelete = (row) => {
    setDeleteId(row.id)
    setdeleteModal(true)
  }

  const confirmDelete = async (deleteId) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/accountant/status-update/${deleteId}`, { status: 0, deleted_at: new Date() });

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
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/accountant/${id}`);
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
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/camps/assigned-accountants-by-camp?camp_id=${campIds}&status=1`);
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
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/camps/assigned-accountants-by-camp?camp_id=${campIds}&status=0`);
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



  // Get Assign Camps By Accountant
  const getActiveAssignCampsByAccountant = async (accountantID) => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/accountant/assigned-camps-by-accountant?accountant_id=${accountantID}&status=1`);
    if (data) {
      setActiveAccountantWiseData(data?.data?.list)
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
  const getDeactiveAssignCampsByAccountant = async (accountantID) => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/accountant/assigned-camps-by-accountant?accountant_id=${accountantID}&status=0`);
    if (data) {
      setDeactiveAccountantWiseData(data?.data?.list)
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

  const GetAccountantAssignData = (value) => {
    if (value) {
      setAccountantID(value.value)
    }
    else {
      setActiveAccountantWiseData([])
      setDeactiveAccountantWiseData([])
    }
  }

  const getAssignCampsByAccountantList = () => {
    // setAccountantWiseData([])
    if (accountantID.length) {
      setPreloader(true)
      getActiveAssignCampsByAccountant(accountantID)
      getDeactiveAssignCampsByAccountant(accountantID)
    }
    else {
      toast.error('Please Select Accountant', {
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

  //assign details/view modal 
  const handleCoordintorAssignView = (row) => {
    setAssignAccountantViewModalData(row)
    setAssignAccountantViewModal(true)
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
    req.accountant_id = AssignID

    const { data, error } = await api.post(`${baseUrl}/client-admin/api/camps/assign-camps-to-accountant`, req);
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
              <h3 className="card-title mb-0">Accountant</h3>
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
                      defaultActiveKey="ActiveAccountantList"
                      onClick={(e) => tabchange(e)}
                    >
                      <Tab eventKey="ActiveAccountantList" className="me-1 " title="Active Accountant List">
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
                      <Tab eventKey="DeleteAccountantList" className="me-1 " title="Deleted Accountant List">
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
                                  placeholder="select camps"
                                  onChange={(e) => GetCampsAssignData(e)}
                                  singleSelect="true"
                                  options={_USER?.campsList}
                                  required={true}
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
                                <Tab eventKey="ActiveCampWiseList" className="me-1 " title="Active Camp Wise List">
                                  <div className="table-responsive">
                                    <ActiveCampList
                                      data={ActiveCampwiseData}
                                      _USER={_USER}
                                      handleAssignView={(row) => handleAssignView(row)}
                                    />
                                  </div>
                                </Tab>
                                <Tab eventKey="DeativeCampWiseList" className="me-1 " title="Deative Camp Wise List">
                                  <div className="table-responsive">
                                    <DeactiveCampList
                                      data={DeactiveCampwiseData}
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

                      <Tab eventKey="AccountantWiseList" className="me-1 " title="Accountant Wise List">
                        <hr />
                        <div className="salesdatatable">
                          <Row className="mb-2">
                            <div className="form-group" style={{ minWidth: "200px", maxWidth: "500px" }}>
                              <label className="form-label">Select Accountant </label>
                              <div className="form-group d-flex px-0 align-items-start" style={{ minWidth: "200px" }}>
                                <Select
                                  id="package_id"
                                  className="w-65"
                                  placeholder="select package"
                                  onChange={(e) => GetAccountantAssignData(e)}
                                  singleSelect="true"
                                  options={_USER?.accountantList}
                                  required={true}
                                  value={getKeyName(_USER?.accountantList, accountantID)}
                                />
                                <Button className="btn btn-gray-dark ms-3" variant="default" onClick={() => getAssignCampsByAccountantList()}>Get List </Button>
                              </div>
                            </div>
                            <div className="tabs-menu1 tabstyle2">
                              <Tabs
                                className=" panel-tabs "
                                variant="pills"
                                defaultActiveKey="ActiveAccountantWiseList"
                                onClick={(e) => tabchange(e)}
                              >
                                <Tab eventKey="ActiveAccountantWiseList" className="me-1 " title="Active Accountant Wise List">
                                  <div className="table-responsive">
                                    <ActiveAccountantList
                                      data={ActiveAccountantWiseData}
                                      _USER={_USER}
                                      handleAssignView={(row) => handleCoordintorAssignView(row)}
                                    />
                                  </div>
                                </Tab>
                                <Tab eventKey="DeativeAccountantWiseList" className="me-1 " title="Deative Accountant Wise List">
                                  <div className="table-responsive">
                                    <DeactiveAccountantList
                                      data={DeactiveAccountantWiseData}
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
          <form id="form" onSubmit={isEdit ? handleSubmit(updateData) : handleSubmit(submitHandler)} validated={true}>
            <Modal.Header>
              <div className="modal-title h4 mb-0">{`${isEdit ? 'Edit' : 'Add'} Accountant`}</div>
              <Button onClick={handleCloseModal} className="btn-close" variant="">
                <i className="fa fa-times fs-6"></i>
              </Button>
            </Modal.Header>
            <Modal.Body className="p-5">
              <h4 className="d-flex">Accountant Information</h4>
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
        <Modal size="xl" show={assignModal}>
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
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
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

      {assignViewModal && <ViewModal show={assignViewModal} data={assignViewModalData} handleCloseModal={() => handleCloseModal()} />}

      {assignAccountantViewModal && <AccountantViewModal show={assignAccountantViewModal} data={assignAccountantViewModalData} handleCloseModal={() => handleCloseModal()} accountantList={_USER?.accountantList} />}
    </div>
  );
}



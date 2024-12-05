import React, { useEffect, useState } from "react";
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tab, Tabs } from "react-bootstrap";
import Select from 'react-select';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import { baseUrl } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ROLES_SLUG } from "../../constants/strings";
import DeleteModal from "../common/DeleteModal";
import ActiveList from "./ActiveList";
import DeletedList from "./DeleteList";
import ViewModal from "./ViewModal";
import { getKeyName } from "../../constants/functions";
import ActiveCampList from "./CampWise/ActiveCampList";
import DeactiveCampList from "./CampWise/DeactiveCampList";
import Loader from "../common/Loader";
import ActivePOSList from "./POSWise/ActivePOSList";
import DeactivePOSList from "./POSWise/DeactivePOSList";
import POSViewModal from "../Camps/ViewModal";


export default function POS() {
  const [preloader, setPreloader] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [datalist, setDataList] = useState([]);
  const [updateID, setUpdateID] = useState('');
  const [modalData, setModalData] = useState([]);

  //delete Modal
  const [deleteModal, setdeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [Deletedatalist, setDeleteDataList] = useState([]);

  //info modal
  const [infoModalData, setInfoModalData] = useState([]);
  const [infoModal, setInfoModal] = useState(false);

  //campwise data
  const [campId, setCampId] = useState('');
  const [ActiveCampwiseData, setActiveCampwiseData] = useState([]);
  const [DeactiveCampwiseData, setDeactiveCampwiseData] = useState([]);

  //assignInfomodal
  const [assignViewModal, setAssignViewModal] = useState(false);
  const [assignViewModalData, setAssignViewModalData] = useState([]);
  const [assignPOSViewModal, setAssignPOSViewModal] = useState(false);
  const [assignPOSViewModalData, setAssignPOSViewModalData] = useState([]);

  //POS wise data
  const [posID, setPOSID] = useState('');
  const [ActivePOSWiseData, setActivePOSWiseData] = useState([]);
  const [DeactivePOSWiseData, setDeactivePOSWiseData] = useState([]);


  const _USER = useSelector(e => e?.common);

  const api = useApi();
  const dispatch = useDispatch();

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
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/pos`);
    if (data) {
      setDataList(data.data.list)
      let optionList = []
      for (let index = 0; index < data?.data?.list?.length; index++) {
        let obj = { value: data?.data?.list[index]?.id, label: data?.data?.list[index]?.full_name }
        optionList.push(obj);
      }
      dispatch({ type: 'POSLIST', payload: optionList });
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
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/pos?status=0`);
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
    setOpenModal(false);
    setdeleteModal(false);
    setDeleteId('');
    setInfoModalData([])
    setInfoModal(false)
    setAssignViewModalData([])
    setAssignViewModal(false)
    setAssignPOSViewModal(false)
    setAssignPOSViewModalData([])
  };

  const submitHandler = async () => {
    let new_formData = {
      ...modalData,
    }

    const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/pos`, new_formData);
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
      ...modalData
    }

    const { client_id, role_id, status, createdAt, updatedAt, id, ...removeData } = new_formData;

    const { data } = await api.put(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/pos/${updateID}`, removeData);

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
    const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/pos/status-update/${row.id}`, { status: value === false ? "2" : "1" });
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

  const clearData = () => {
    setCampId('')
    setPOSID('')
    setActiveCampwiseData([])
    setDeactiveCampwiseData([])
    setActivePOSWiseData([])
    setDeactivePOSWiseData([])
  }

  const tabchange = (e) => {
    if (e.target.dataset.rrUiEventKey === "ActivePOSList") {
      getList()
      clearData()
    }
    else if (e.target.dataset.rrUiEventKey === "DeletePOSList") {
      getDeletedList()
      clearData()
    }
    else if (e.target.dataset.rrUiEventKey === "CampWiseList" || e.target.dataset.rrUiEventKey === "POSWiseList") {
      clearData()
    }
  }

  const reActiveDeleted = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/pos/status-update/${row.id}`, { status: value === false ? "2" : "1", updated_at: new Date() });

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




  // delete functionality
  const handleDelete = (row) => {
    setDeleteId(row.id)
    setdeleteModal(true)
  }

  const confirmDelete = async (deleteId) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/pos/status-update/${deleteId}`, { status: 0, deleted_at: new Date() });

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

  const handleChange = (name, value) => {
    setModalData({ ...modalData, [name]: value })
  }

  // view modal
  const getInfoData = async (id) => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/pos/${id}`);
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
  const getActiveAssignPackagebyCamps = async (campId) => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/camps/assigned-pos-by-camp?camp_id=${campId}&status=1`);
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

  const getDeactiveAssignPackagebyCamps = async (campId) => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/camps/assigned-pos-by-camp?camp_id=${campId}&status=0`);
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
      setCampId(value.value)
    }
    else {
      setActiveCampwiseData([])
      setDeactiveCampwiseData([])
    }
  }

  const getAssignPackagebyCampsList = () => {
    if (campId.length) {
      setPreloader(true)
      getActiveAssignPackagebyCamps(campId)
      getDeactiveAssignPackagebyCamps(campId)
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

  // Get Assign Camps By POS
  const getActiveAssignCampsByPOS = async (posID) => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/pos/assigned-camps/${posID}`);
    if (data) {
      setActivePOSWiseData(data?.data?.list)
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

  const getDeactiveAssignCampsByPOS = async (posID) => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/pos/assigned-camps/${posID}`);
    if (data) {
      setDeactivePOSWiseData(data?.data?.list)
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

  const GetPOSAssignData = (value) => {
    if (value) {
      setPOSID(value.value)
    }
    else {
      setActivePOSWiseData([])
      setDeactivePOSWiseData([])
    }
  }

  const getAssignCampsByPOSList = () => {
    if (posID.length) {
      setPreloader(true)
      getActiveAssignCampsByPOS(posID)
      getDeactiveAssignCampsByPOS(posID)
    }
    else {
      toast.error('Please Select POS', {
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
    setAssignPOSViewModalData(row)
    setAssignPOSViewModal(true)
  }



  return (
    <div>
      {preloader && <Loader />}
      <Row>
        <Col sm={12} className="col-12">
          <Card className="mt-5">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <h3 className="card-title mb-0">POS</h3>
              <OverlayTrigger placement="top" overlay={<Tooltip >Add</Tooltip>}>
                <Link onClick={() => handleEditClick()} to="#" className="btn btn-primary btn-icon text-white me-3">
                  <span>
                    <i className="fe fe-plus"></i>&nbsp;
                  </span>
                  Add POS
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
                      defaultActiveKey="ActivePOSList"
                      onClick={(e) => tabchange(e)}
                    >
                      <Tab eventKey="ActivePOSList" className="me-1 " title="Active POS List">
                        <div className="salesdatatable">
                          <div className="table-responsive">
                            <ActiveList
                              data={datalist}
                              handleEditClick={(row) => handleEditClick(row, 'edit')}
                              handleStatus={(row, value) => handleStatus(row, value)}
                              handleDelete={(row) => handleDelete(row)}
                              handleView={(row) => handleView(row)}
                            />
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="DeletePOSList" className="me-1 " title="Deleted POS List">
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
                                  value={getKeyName(_USER?.campsList, campId)}

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


                      <Tab eventKey="POSWiseList" className="me-1 " title="POS Wise List">
                        <hr />
                        <div className="salesdatatable">
                          <Row className="mb-2">
                            <div className="form-group" style={{ minWidth: "200px", maxWidth: "500px" }}>
                              <label className="form-label">Select POS </label>
                              <div className="form-group d-flex px-0 align-items-start" style={{ minWidth: "200px" }}>
                                <Select
                                  id="package_id"
                                  className="w-65"
                                  placeholder="select package"
                                  onChange={(e) => GetPOSAssignData(e)}
                                  singleSelect="true"
                                  options={_USER?.posList}
                                  required={true}
                                  value={getKeyName(_USER?.posList, posID)}
                                />
                                <Button className="btn btn-gray-dark ms-3" variant="default" onClick={() => getAssignCampsByPOSList()}>Get List </Button>
                              </div>
                            </div>
                            <div className="tabs-menu1 tabstyle2">
                              <Tabs
                                className=" panel-tabs "
                                variant="pills"
                                defaultActiveKey="ActivePOSWiseList"
                                onClick={(e) => tabchange(e)}
                              >
                                <Tab eventKey="ActivePOSWiseList" className="me-1 " title="Active POS Wise List">
                                  <div className="table-responsive">
                                    <ActivePOSList
                                      data={ActivePOSWiseData}
                                      _USER={_USER}
                                      handleAssignView={(row) => handleCoordintorAssignView(row)}
                                    />
                                  </div>
                                </Tab>
                                <Tab eventKey="DeativePOSWiseList" className="me-1 " title="Deative POS Wise List">
                                  <div className="table-responsive">
                                    <DeactivePOSList
                                      data={DeactivePOSWiseData}
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
          <form id="form" onSubmit={isEdit ? handleSubmit(updateData) : handleSubmit(submitHandler)} validate>
            <Modal.Header>
              <Modal.Title>{`${isEdit ? 'Edit' : 'Add'} POS`}</Modal.Title>
              <Button onClick={handleCloseModal} className="btn-close" variant="">
                <i className="fa fa-times fs-6"></i>
              </Button>
            </Modal.Header>
            <Modal.Body className="p-5">

              <h4 className="d-flex">Business Information</h4>
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

                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="password" className="form-label">IP</label>
                    <input className="form-control" type="text" id="text"
                      placeholder="00:00:00:00"
                      name="ip_mac"
                      value={modalData?.ip_mac}
                      onChange={(e) => handleChange('ip_mac', e.target.value)}
                      pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
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

      {infoModal && <ViewModal show={infoModal} data={infoModalData} handleCloseModal={() => handleCloseModal()} />}

      {assignViewModal && <ViewModal show={assignViewModal} data={assignViewModalData} handleCloseModal={() => handleCloseModal()} />}

      {assignPOSViewModal && <POSViewModal show={assignPOSViewModal} data={assignPOSViewModalData} handleCloseModal={() => handleCloseModal()} posList={_USER?.posList} />}

    </div>
  );
}
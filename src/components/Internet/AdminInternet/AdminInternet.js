import React, { useEffect, useState } from "react";
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApi from "../../../hooks/useApi";
import { baseUrl } from "../../../constants/endpoints";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ROLES_SLUG } from "../../../constants/strings";
import Select from 'react-select';
import DeleteModal from "../../common/DeleteModal";
import ActiveList from "./ActiveList";
import ViewModal from "./ViewModal";
import DeletedList from "./DeleteList";
import { getKeyName } from "../../../constants/functions";
import ActiveClientWise from "./ClientWise/ActiveClientWise";
import DeactiveClientWise from "./ClientWise/DeactiveClientWise";
import DeactivePackageWise from "./PackageWise/DeactivePackageWise";
import ActivePackageWise from "./PackageWise/ActivePackageWise";
import Loader from "../../common/Loader";

export default function AdminInternet() {
  const [preloader, setPreloader] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [datalist, setDataList] = useState([]);
  const [updateID, setUpdateID] = useState('');
  const [modalData, setModalData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [assignModal, setAssignModal] = useState(false);
  const [packageData, setPackgeData] = useState([]);
  const [clientAdminList, setClientAdminList] = useState([]);
  const [ids, setIDS] = useState('');

  //delete
  const [deleteModal, setdeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [Deletedatalist, setDeleteDataList] = useState([]);

  //infor modal
  const [infoModalData, setInfoModalData] = useState([]);
  const [infoModal, setInfoModal] = useState(false);

  //client wise data
  const [clientId, setClientId] = useState('');
  const [ActiveCampwiseData, setActiveCampwiseData] = useState([]);
  const [DeactiveCampwiseData, setDeactiveCampwiseData] = useState([]);

  //package wise data
  const [packageId, setPackageID] = useState('');
  const [ActivePackageWiseData, setActivePackageWiseData] = useState([]);
  const [DeactivePackageWiseData, setDeactivePackageWiseData] = useState([]);

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
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package?status=1`);
    if (data) {
      setDataList(data?.data?.list)
      let optionList = []
      for (let index = 0; index < data?.data?.list?.length; index++) {
        let obj = { value: data?.data?.list[index]?.id, label: data?.data?.list[index]?.package_name }
        optionList.push(obj);
      }
      dispatch({ type: 'ADMININTENETLIST', payload: optionList });
    }
    else {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
    if (ROLES_SLUG[_USER?.role] === 'admin') {
      getClientAdminList()
    }
  }

  const getDeletedList = async () => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package?status=0`);
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

  const getClientAdminList = async () => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/client-admin`);
    if (data) {
      let optionList = []
   
      for (let index = 0; index < data.data.list.length; index++) {
        let obj = { value: data.data.list[index].id, label: data.data.list[index].full_name }
        optionList.push(obj);
      }
      setClientAdminList(optionList)
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
    setPrevData(data)
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
    setPackgeData([])
    setdeleteModal(false);
    setDeleteId('');
    setInfoModalData([])
    setInfoModal(false)
    setAssignViewModalData([])
    setAssignViewModal(false)
  };

  const submitHandler = async () => {
    let new_formData = {
      ...modalData
    }

    const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package`, new_formData);

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

  const updateData = async () => {
    let check = JSON.stringify(modalData) === JSON.stringify(prevData);

    if (check) {
      toast.warn('Data is Same', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
    else {
      const { package_code, package_status, createdAt, updatedAt, id,type,...removeKey } = modalData;
      let new_formData = {
        ...removeKey
      }
      const { data } = await api.put(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/${updateID}`, new_formData);
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
  }

  const handleStatus = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/status-update/${row.id}`, { status: value === false ? "2" : "1" });
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
    setModalData({ ...modalData, [name]: value })
  }

  const handleChangeAssignData = (value) => {
    if (value.length >= 1) {
      let ids = value.map(item => item.value).join(',');
      setIDS(ids)
      setClientId(ids)
    }
    else {
      setClientId(value?.value)
      setIDS(value.value)
    }
  }

  const handleAssign = (row, name) => {
    setAssignModal(true)
    setPackgeData(row)
  }

  const assignHandle = async () => {
    if (ids.length) {
      let req = {}
      req.client_ids = ids
      req.internet_package_id = packageData.id.toString()

      const { data, error } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/assign-client`, req);
      if (data) {
        toast.success(data?.message ? data?.message : data?.messages, {
          position: toast.POSITION.TOP_RIGHT,
          hideProgrefalser: false,
          autoClose: 2000,
          theme: "colored",
        });
        handleCloseModal()
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
      toast.error('please select ID', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgrefalser: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }


  //reactive data 
  const clearData = () => {
    setIDS('')
    setClientId('')
    setPackageID('')
    setActiveCampwiseData([])
    setDeactiveCampwiseData([])
    setActivePackageWiseData([])
    setDeactivePackageWiseData([])
  }

  const tabchange = (e) => {
    if (e.target.dataset.rrUiEventKey === "ActiveInternetList") {
      getList()
      clearData()
    }
    else if (e.target.dataset.rrUiEventKey === "DeleteInternetList") {
      getDeletedList()
      clearData()
    }
    else if (e.target.dataset.rrUiEventKey === "ClientWiseList" || e.target.dataset.rrUiEventKey === "PackageWiseList") {
      clearData()
    }
  }

  const reActiveDeleted = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package/status-update/${row.id}`, { status: value === false ? "2" : "1", updated_at: new Date() });
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
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package/status-update/${deleteId}`, { status: 0, deleted_at: new Date() });

    if (data) {
      toast.success(data.message ? data.message : data.messages, {
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
  // view modal
  const getInfoData = async (id) => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/${id}`);
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

  // Get Assign Package By Client
  const getActiveAssignPackagebyClient = async (ids) => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/assigned-packages-by-clients?client_id=${ids}&status=1`);
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

  const getDeactiveAssignPackagebyClient = async (ids) => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/assigned-packages-by-clients?client_id=${ids}&status=2`);
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

  const getAssignPackagebyClientList = () => {
    if (clientId.length) {
      setPreloader(true)
      getActiveAssignPackagebyClient(clientId)
      getDeactiveAssignPackagebyClient(clientId)
    }
    else {
      toast.error('Please Select Client', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }


  // Get Assign Client By Package
  const getActiveAssignClientbyPackage = async (ids) => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/assigned-clients-by-package?package_id=${ids}&status=1`);
    if (data) {
      setActivePackageWiseData(data?.data?.list)
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
  const getDeactiveAssignClientbyPackage = async (ids) => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package/assigned-clients-by-package?package_id=${ids}&status=2`);
    if (data) {
      setDeactivePackageWiseData(data?.data?.list)
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

  const GetPackageAssignData = (value) => {

    if (value) {
      setPackageID(value.value)
    }
    else {
      setActivePackageWiseData([])
    }
  }
  const getAssignClientbyPackageList = () => {
    if (packageId.length) {
      setPreloader(true)
      getActiveAssignClientbyPackage(packageId)
      getDeactiveAssignClientbyPackage(packageId)
    }
    else {
      toast.error('Please Select Package', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
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
              <h3 className="card-title mb-0">Internet Package</h3>
              <OverlayTrigger placement="top" overlay={<Tooltip >Internet Package</Tooltip>}>
                <Link onClick={() => handleEditClick()} to="#" className="btn btn-primary btn-icon text-white me-3">
                  <span>
                    <i className="fe fe-plus"></i>&nbsp;
                  </span>
                  Add Package
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
                      defaultActiveKey="ActiveInternetList"
                      onClick={(e) => tabchange(e)}
                    >
                      <Tab eventKey="ActiveInternetList" className="me-1 " title="Active Internet Package List">
                        <div className="salesdatatable">
                          <div className="table-responsive">
                            <ActiveList
                              data={datalist}
                              handleEditClick={(row) => handleEditClick(row, 'edit')}
                              handleStatus={(row, value) => handleStatus(row, value)}
                              handleDelete={(row) => handleDelete(row)}
                              handleAssignInternet={(row) => handleAssign(row, 'internet')}
                              handleView={(row) => handleView(row)}

                            />
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="DeleteInternetList" className="me-1 " title="Deleted Internet Package List">
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


                      <Tab eventKey="ClientWiseList" className="me-1" title="Client Wise List">
                        <hr />
                        <div className="salesdatatable">
                          <Row className="mb-2">
                            <div className="form-group" style={{ minWidth: "200px", maxWidth: "500px" }}>
                              <label className="form-label">Select Client </label>
                              <div className="form-group d-flex px-0 align-items-start" style={{ minWidth: "200px" }}>
                                <Select
                                  className="w-65"
                                  id="client_ids"
                                  placeholder="Select Client"
                                  onChange={(e) => handleChangeAssignData(e)}
                                  singleSelect="true"
                                  options={clientAdminList}
                                  required={true}
                                  value={getKeyName(clientAdminList, clientId)}
                                />
                                <Button className="btn btn-gray-dark ms-3" variant="default" onClick={() => getAssignPackagebyClientList()}>Get List </Button>
                              </div>
                            </div>

                            <div className="tabs-menu1 tabstyle2">
                              <Tabs
                                className=" panel-tabs "
                                variant="pills"
                                defaultActiveKey="ActiveClientWiseList"
                                onClick={(e) => tabchange(e)}
                              >
                                <Tab eventKey="ActiveClientWiseList" className="me-1 " title="Active Client Wise List">
                                  <div className="table-responsive">
                                    <ActiveClientWise
                                      data={ActiveCampwiseData}
                                      handleAssignView={(row) => handleAssignView(row)}
                                    />
                                  </div>
                                </Tab>
                                <Tab eventKey="DeactiveClientWiseList" className="me-1 " title="Deactive Client Wise List">
                                  <div className="table-responsive">
                                    <DeactiveClientWise
                                      data={DeactiveCampwiseData}
                                      handleAssignView={(row) => handleAssignView(row)}
                                    />
                                  </div>
                                </Tab>
                              </Tabs>
                            </div>
                          </Row>
                        </div>
                      </Tab>
                      <Tab eventKey="PackageWiseList" className="me-1" title="PackageWise List">
                        <hr />
                        <div className="salesdatatable">
                          <Row className="mb-2">
                            <div className="form-group" style={{ minWidth: "200px", maxWidth: "500px" }}>
                              <label className="form-label">Select Internet Package </label>
                              <div className="form-group d-flex px-0 align-items-start" style={{ minWidth: "200px" }}>
                                <Select
                                  className="w-65"
                                  id="client_ids"
                                  placeholder="Select Internet Package"
                                  onChange={(e) => GetPackageAssignData(e)}
                                  singleSelect="true"
                                  options={_USER?.AdminIntenetList}
                                  required={true}
                                  value={getKeyName(_USER?.AdminIntenetList, packageId)}
                                />
                                <Button className="btn btn-gray-dark ms-3" variant="default" onClick={() => getAssignClientbyPackageList()}>Get List </Button>
                              </div>
                            </div>
                            <div className="tabs-menu1 tabstyle2">
                              <Tabs
                                className=" panel-tabs "
                                variant="pills"
                                defaultActiveKey="ActivePackageWiseList"
                                onClick={(e) => tabchange(e)}
                              >
                                <Tab eventKey="ActivePackageWiseList" className="me-1 " title="Active Package Wise List">
                                  <div className="table-responsive">
                                    <ActivePackageWise
                                      handleAssignView={(row) => handleAssignView(row)}
                                      data={ActivePackageWiseData}
                                    />
                                  </div>
                                </Tab>
                                <Tab eventKey="DeactivePackageWiseList" className="me-1 " title="Deactive Package Wise List">
                                  <div className="table-responsive">
                                    <DeactivePackageWise
                                      data={DeactivePackageWiseData}
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
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {assignModal && (
        <Modal size="xl" show={assignModal}>
          <form id="form" onSubmit={handleSubmit(assignHandle)} validate>
            <Modal.Header>
              <Modal.Title>
                Assign Administrator
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
                    < Select
                      id="client_ids"
                      placeholder="Select Client"
                      onChange={(e) => handleChangeAssignData(e)}
                      singleSelect="true"
                      options={clientAdminList}
                      isMulti={true}
                      required={true}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="package_name" className="form-label">Internet Package</label>
                    <input className="form-control fc-not-allowed" type="text"
                      id="package_name"
                      placeholder="Package Name"
                      name="package_name"
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
          <form id="form" onSubmit={isEdit ? handleSubmit(updateData) : handleSubmit(submitHandler)} validated={true}>
            <Modal.Header>
              <div className="modal-title h4 mb-0">{`${isEdit ? 'Edit' : 'Add'} Internet Package`}</div>
              <Button onClick={handleCloseModal} className="btn-close" variant="">
                <i className="fa fa-times fs-6"></i>
              </Button>
            </Modal.Header>
            <Modal.Body className="p-5">
              <h4 className="d-flex">Package Information</h4>
              <div className="mb-6">
                <Row className="mb-2">
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="package_name" className="form-label">Package name</label>
                    <input className="form-control" type="text"
                      id="package_name"
                      placeholder="Enter Package name"
                      name="package_name"
                      value={modalData?.package_name}
                      onChange={(e) => handleChange('package_name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="package_speed" className="form-label">Package Speed</label>
                    <input className="form-control" type="text"
                      id="package_speed"
                      placeholder="Enter Package Speed"
                      name="package_speed"
                      value={modalData?.package_speed}
                      onChange={(e) => handleChange('package_speed', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="package_speed" className="form-label">Upload Bandwidth</label>
                    <input className="form-control" type="text"
                      id="package_speed"
                      placeholder="Enter Upload Bandwidth"
                      name="upload_bandwidth"
                      value={modalData?.upload_bandwidth}
                      onChange={(e) => handleChange('upload_bandwidth', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="package_speed" className="form-label">Duration</label>
                    <input className="form-control" type="text"
                      id="package_speed"
                      placeholder="Enter Duration"
                      name="duration"
                      value={modalData?.duration}
                      onChange={(e) => handleChange('duration', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="package_speed" className="form-label">Volume</label>
                    <input className="form-control" type="text"
                      id="package_speed"
                      placeholder="Enter Volume"
                      name="volume"
                      value={modalData?.volume}
                      onChange={(e) => handleChange('volume', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="package_speed" className="form-label">Download Bandwidth</label>
                    <input className="form-control" type="text"
                      id="package_speed"
                      placeholder="Enter Download Bandwidth"
                      name="download_bandwidth"
                      value={modalData?.download_bandwidth}
                      onChange={(e) => handleChange('download_bandwidth', e.target.value)}
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

      {assignViewModal && <ViewModal show={assignViewModal} data={assignViewModalData} handleCloseModal={() => handleCloseModal()} list="assignmodal" />}

    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import { baseUrl } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ROLES_SLUG } from "../../constants/strings";
import Select from 'react-select';
import DeleteModal from "../common/DeleteModal";
import ActiveList from "./ActiveList";
import ViewModal from "./ViewModal";
import DeletedList from "./DeleteList";
import { getKeyName } from "../../constants/functions";
import ActiveCampList from "./CampWise/ActiveCampList";
import DeactiveCampList from "./CampWise/DeactiveCampList";
import ActivePackageList from "./PackageWise/DeactivePackageList";
import DeactivePackageList from "./PackageWise/DeactivePackageList";
import Loader from "../common/Loader";


export default function AdminWater() {
  const [preloader, setPreloader] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [datalist, setDataList] = useState([]);
  const [updateID, setUpdateID] = useState('');
  const [modalData, setModalData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [assignModal, setAssignModal] = useState(false);
  const [packageData, setPackgeData] = useState([]);
  const [campsList, setCampsList] = useState([]);
  const [ids, setIDS] = useState('');
  const [clientId, setClientId] = useState('');

  //delete
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

  //packagewise data
  const [packageId, setPackageID] = useState('');
  const [ActivepackageWiseData, setActivePackageWiseData] = useState([]);
  const [DeactivePackageWiseData, setDeactivePackageWiseData] = useState([]);

  //assignInfomodal
  const [assignViewModal, setAssignViewModal] = useState(false);
  const [assignViewModalData, setAssignViewModalData] = useState([]);


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
    const { data, error } = await api.get(`${baseUrl}/water-manage/api/water-package`);
    if (data) {
      setDataList(data?.data?.list)
      let optionList = []
      for (let index = 0; index < data?.data?.list?.length; index++) {
        let obj = { value: data?.data?.list[index]?.id, label: data?.data?.list[index]?.package_name }
        optionList.push(obj);
      }
      dispatch({ type: 'WATERPACKGELIST', payload: optionList });
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
    const { data, error } = await api.get(`${baseUrl}/water-manage/api/water-package?status=0`);
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
    setPrevData(data)
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
    setAssignModal(false)
    setIDS('')
    setPackgeData([])
    setCampsList([])
    setdeleteModal(false);
    setDeleteId('');
    setInfoModalData([])
    setInfoModal(false)
    setAssignViewModalData([])
    setAssignViewModal(false)
  };

  const submitHandler = async () => {
    let new_formData = {
      ...modalData,
      created_at: new Date()
    }

    const { data } = await api.post(`${baseUrl}/water-manage/api/water-package`, new_formData);

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
      let new_formData = {
        ...modalData,
        updated_at: new Date()
      }

      const { data } = await api.put(`${baseUrl}/water-manage/api/water-package/${updateID}`, new_formData);

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


  }

  const handleStatus = async (row, value) => {
    const { data } = await api.put(`${baseUrl}/water-manage/api/water-package/status-update/${row.id}`, { status: value === false ? "2" : "1", updated_at: new Date() });
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

  // assign 
  const handleChangeAssignData = (value) => {
    if (value.length >= 1) {
      let ids = value.map(item => item.value).join(',');
      setIDS(ids)
    }
    else {
      setIDS(value.value)
    }
  }

  const handleAssign = (row) => {
    setAssignModal(true)
    setPackgeData(row)
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
    
      const { data, error } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/water-package/assign-camps`, new_formData);
      if (data) {
        handleCloseModal()
        toast.success(data?.message ? data?.message : data?.messages, {
          position: toast.POSITION.TOP_RIGHT,
          hideProgrefalser: false,
          autoClose: 2000,
          theme: "colored",
        });
        setCampsList([])
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

  const handleChange = (name, value) => {
    if (name === "client_id") {
      if (value.length >= 1) {
        let ids = value.map(item => item.value).join(',');
        setCampIDS('')
        getCampsList(ids)
        setModalData({ ...modalData, [name]: value.value })
      }
      else {
        setClientId(value?.value)
        setCampIDS('')
        getCampsList(value?.value)
        setModalData({ ...modalData, [name]: value.value })
      }
    }
    else {
      setModalData({ ...modalData, [name]: value })
      setClientId('')
    }
  }

  const clearData = () => {
    setPackageID('')
    setCampIDS('')
    setClientId('')
    setCampsList([])
    setActiveCampwiseData([])
    setDeactiveCampwiseData([])
    setActivePackageWiseData([])
    setDeactivePackageWiseData([])
  }

  //reactive data 

  const tabchange = (e) => {
    if (e.target.dataset.rrUiEventKey === "ActiveWaterList") {
      getList()
      clearData()
    }
    else if (e.target.dataset.rrUiEventKey === "DeleteWaterList") {
      getDeletedList()
      clearData()
    }
    else if (e.target.dataset.rrUiEventKey === "CampWiseList" || e.target.dataset.rrUiEventKey === "PackageWiseList") {
      clearData()
    }
  }

  const reActiveDeleted = async (row, value) => {
    const { data } = await api.put(`${baseUrl}/water-manage/api/water-package/status-update/${row.id}`, { status: value === false ? 2 : 1, updated_at: new Date() });
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
    const { data } = await api.put(`${baseUrl}/water-manage/api/water-package/status-update/${deleteId}`, { status: 0, deleted_at: new Date() });

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



  // view modal
  const getInfoData = async (id) => {
    const { data, error } = await api.get(`${baseUrl}/water-manage/api/water-package/${id}`);
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
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/water-package/assigned-packages-by-camp?camp_id=${campIds}&status=1`);
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
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/water-package/assigned-packages-by-camp?camp_id=${campIds}&status=0`);
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
      toast.error('Please Select Client And Camps', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }


  // Get Assign Camps By Package
  const getActiveAssignCampsByPackage = async (packageId) => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/water-package/assigned-camps-by-package?package_id=${packageId}&status=1`);
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
  const getDeactiveAssignCampsByPackage = async (packageId) => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/water-package/assigned-camps-by-package?package_id=${packageId}&status=0`);
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
      setDeactivePackageWiseData([])
    }
  }

  const getAssignCampsByPackageList = () => {
    // setPackageWiseData([])
    if (packageId.length) {
      setPreloader(true)
      getActiveAssignCampsByPackage(packageId)
      getDeactiveAssignCampsByPackage(packageId)
    }
    else {
      toast.error('Please Select Package', {
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
              <h3 className="card-title mb-0">Water Package</h3>
              <OverlayTrigger placement="top" overlay={<Tooltip >Water Package</Tooltip>}>
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
                      defaultActiveKey="ActiveWaterList"
                      onClick={(e) => tabchange(e)}
                    >
                      <Tab eventKey="ActiveWaterList" className="me-1 " title="Active Water Package List">
                        <div className="salesdatatable">
                          <div className="table-responsive">
                            <ActiveList
                              data={datalist}
                              handleEditClick={(row) => handleEditClick(row, 'edit')}
                              handleStatus={(row, value) => handleStatus(row, value)}
                              handleDelete={(row) => handleDelete(row)}
                              handleAssignCamps={(row) => handleAssign(row)}
                              handleView={(row) => handleView(row)}
                              _USER={_USER}
                            />
                          </div>
                        </div>
                      </Tab>

                      <Tab eventKey="DeleteWaterList" className="me-1 " title="Deleted Water Package List">
                        <div className="salesdatatable">
                          <div className="table-responsive">
                            <DeletedList
                              data={Deletedatalist}
                              reActiveDeleted={(row, value) => reActiveDeleted(row, value)}
                              handleView={(row) => handleView(row)}
                              _USER={_USER}
                            />
                          </div>
                        </div>
                      </Tab>




                      <Tab eventKey="CampWiseList" className="me-1 " title="Camp Wise List">
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
                                    < ActiveCampList
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

                      <Tab eventKey="PackageWiseList" className="me-1 " title="Package Wise List">
                        <hr />
                        <div className="salesdatatable">
                          <Row className="mb-2">
                            <div className="form-group" style={{ minWidth: "200px", maxWidth: "500px" }}>
                              <label className="form-label">Select Package </label>
                              <div className="form-group d-flex px-0 align-items-start" style={{ minWidth: "200px" }}>
                                <Select
                                  id="package_id"
                                  className="w-65"
                                  placeholder="select package"
                                  onChange={(e) => GetPackageAssignData(e)}
                                  singleSelect="true"
                                  options={_USER?.waterPackageList}
                                  required={true}
                                  value={getKeyName(_USER?.waterPackageList, packageId)}
                                />
                                <Button className="btn btn-gray-dark ms-3" variant="default" onClick={() => getAssignCampsByPackageList()}>Get List </Button>
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
                                    <ActivePackageList
                                      data={ActivepackageWiseData}
                                      _USER={_USER}
                                      handleAssignView={(row) => handleAssignView(row)}
                                    />
                                  </div>
                                </Tab>
                                <Tab eventKey="DeativePackageWiseList" className="me-1 " title="Deative Package Wise List">
                                  <div className="table-responsive">
                                    <DeactivePackageList
                                      data={DeactivePackageWiseData}
                                      handleAssignView={(row) => handleAssignView(row)}
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
          <form id="form" onSubmit={isEdit ? handleSubmit(updateData) : handleSubmit(submitHandler)} validated={true}>
            <Modal.Header>
              <div className="modal-title h4 mb-0">{`${isEdit ? 'Edit' : 'Add'} Water Package`}</div>
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
                    <label htmlFor="amount" className="form-label">Package Cost ({_USER?.currency_code})</label>
                    <input className="form-control" type="text"
                      id="amount"
                      placeholder="Enter Package Cost"
                      name="amount"
                      value={modalData?.amount}
                      onChange={(e) => handleChange('amount', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="quantity" className="form-label">Package Quantity</label>
                    <input className="form-control" type="text"
                      id="quantity"
                      placeholder="Enter Package Speed"
                      name="quantity"
                      value={modalData?.quantity}
                      onChange={(e) => handleChange('quantity', e.target.value)}
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

      {assignViewModal && <ViewModal show={assignViewModal} data={assignViewModalData} handleCloseModal={() => handleCloseModal()} _USER={_USER} />}
    </div>
  );
}

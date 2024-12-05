import React, { useEffect, useState } from "react";
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApi from "../../../hooks/useApi";
import { baseUrl } from "../../../constants/endpoints";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ROLES_SLUG } from "../../../constants/strings";
import { getKeyName } from "../../../constants/functions";
import Select from 'react-select';
import DeleteModal from "../../common/DeleteModal";
import ActiveList from "./ActiveList";
import DeletedList from "./DeleteList";
import ViewModal from "./ViewModal";
import Loader from "../../common/Loader";
import SuperAdminAssignPackage from "./S-AdminAssignPackage";
import ActivePackageWise from "./PackageWise/ActivePackageWise";
import DeactivePackageWise from "./PackageWise/DeactivePackageWise";
import PackageViewModal from "../../Camps/ViewModal";
import ActiveCampList from "./CampWise/ActiveCampList";
import DeactiveCampList from "./CampWise/DeactiveCampList";


export default function ClientInternet() {
  const [preloader, setPreloader] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [clientPackgeList, setClientPackgeList] = useState([]);
  const [AssignPackgeList, setAssignPackgeList] = useState([]);
  const [updateID, setUpdateID] = useState('');
  const [modalData, setModalData] = useState([]);

  //infor modal
  const [infoModal, setInfoModal] = useState(false);
  const [infoModalData, setInfoModalData] = useState([]);
  const [prevData, setPrevData] = useState([]);

  const [internetIds, setInternetIds] = useState([]);
  const [assignModal, setAssignModal] = useState(false);

  const [packageData, setPackgeData] = useState([]);
  const [ids, setIDS] = useState('');
  const [Deletedatalist, setDeleteDataList] = useState([]);

  //delete modal
  const [deleteId, setDeleteId] = useState('');
  const [AssignDeletedatalist, setAssignDeleteDataList] = useState([]);


  //campwise data
  const [campIds, setCampIDS] = useState('');
  const [ActiveCampwiseData, setActiveCampwiseData] = useState([]);
  const [DeactiveCampwiseData, setDeactiveCampwiseData] = useState([]);

  //assignInfomodal
  const [assignViewModal, setAssignViewModal] = useState(false);
  const [assignViewModalData, setAssignViewModalData] = useState([]);
  const [assignPackageViewModal, setAssignPackageViewModal] = useState(false);
  const [assignPackageViewModalData, setAssignPackageViewModalData] = useState([]);

  //Package wise data
  const [internetID, setPackageID] = useState('');
  const [ActivePackageWiseData, setActivePackageWiseData] = useState([]);
  const [DeactivePackageWiseData, setDeactivePackageWiseData] = useState([]);



  const _USER = useSelector(e => e?.common);
  const _CURRENCY = useSelector(e => e?.common?.user_data?.currency_code);


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
      getAssignedList()
      getDeletedList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_USER?.role])

  const getList = async () => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package`);
    if (data) {
      setClientPackgeList(data?.data?.list)
      let optionList = []
      for (let index = 0; index < data?.data?.list?.length; index++) {
        let obj = { value: data?.data?.list[index]?.id, label: data?.data?.list[index]?.package_name }
        optionList.push(obj);
      }
      dispatch({ type: 'INTERNETLIST', payload: optionList });
    }
    else {
      toast.error(error, {
        position: toast.PackageITION?.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }

  const getDeletedList = async () => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package?status=0`);
    if (data) {
      setDeleteDataList(data?.data?.list)
    }
    else {
      toast.error(error, {
        position: toast.PackageITION?.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }

  const getAssignedList = async () => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/assigned`);
    if (data) {
      setAssignPackgeList(data?.data?.list)
      let optionList = []
      for (let index = 0; index < data?.data?.list.length; index++) {
        let obj = { value: data?.data?.list[index].internet_package_id, label: data?.data?.list[index].original_package_name }
        optionList.push(obj);
      }
      setInternetIds(optionList)
    }
    else {
      toast.error(error, {
        position: toast.PackageITION?.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }

  const getAssignedDeletedList = async () => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package/assigned?status=0`);
    if (data) {
      setAssignDeleteDataList(data?.data?.list)
    }
    else {
      toast.error(error, {
        position: toast.PackageITION?.TOP_RIGHT,
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
      setUpdateID(data.id)
      reset(data);
      setIsEdit(true);
    } else setIsEdit(false);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false)
    setInfoModal(false)
    setAssignModal(false)
    setdeleteModal(false)
    setIDS('')
    setDeleteId('')
    setPackgeData([])
    setAssignViewModalData([])
    setAssignViewModal(false)
    setAssignPackageViewModal(false)
    setAssignPackageViewModalData([])
  };

  const submitHandler = async () => {
    const { package_code, created_at, ...removeData } = modalData;
    let new_formData = {
      ...removeData,

    }

    const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package`, new_formData);
    if (data) {
      toast.success(data.message ? data.message : data.messages, {
        position: toast.PackageITION?.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
      setOpenModal(false)
      setModalData([])
      getList()

    }
  }

  //update data
  const updateData = async () => {
    let check = JSON.stringify(modalData) === JSON.stringify(prevData);

    if (check) {
      toast.warn('Data is Same', {
        position: toast.PackageITION?.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
    else {

      const { id, client_id, package_code, package_status, created_at, updated_at, original_package_name, original_package_code, original_package_status, original_package_speed, original_package_validity, ...removeData } = modalData
      let new_formData = {

        ...removeData,

      }
      const { data } = await api.put(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/${updateID}`, new_formData);

      if (data) {
        toast.success(data?.message ? data?.message : data?.messages, {
          position: toast.PackageITION?.TOP_RIGHT,
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

  // updat status
  const handleStatus = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/status-update/${row.id}`, { status: value === false ? "2" : "1" });
    if (data) {
      toast.success(data.message ? data.message : data.messages, {
        position: toast.PackageITION?.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
      setOpenModal(false)
      setModalData([])
      getList()
    }
  }


  //delete functionality

  const handleDelete = (row) => {
    setDeleteId(row.id)
    setdeleteModal(true)
  }

  const confirmDelete = async (deleteId) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package/status-update/${deleteId}`, { status: 0, deleted_at: new Date() });
    if (data) {
      toast.success(data.message ? data.message : data.messages, {
        position: toast.PackageITION?.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
      setOpenModal(false)
      setdeleteModal(false)
      setDeleteId('')
      getList()
    }
  }


  // info modal
  const handleView = async (row) => {
    const { data } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/${row.id}`)
    setInfoModalData(data?.data?.list)
    setInfoModal(true)
  }

  const handleChange = (name, value) => {
    setModalData({ ...modalData, [name]: value })
  }

  //assign 
  const handleAssign = (row, name) => {
    setAssignModal(true)
    setPackgeData(row)
  }

  const handleChangeAssignData = (value) => {
    if (value.length >= 1) {
      let ids = value.map(item => item.value).join(',');
      setIDS(ids)
    }
    else {
      setIDS(value[0].value);
    }
  }

  const assignHandle = async () => {
    if (ids.length) {
      let req = {}
      req.camp_ids = ids
      req.package_id = packageData.id

      const { data, error } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/assign-camps`, req);
      if (data) {
        handleCloseModal()
        toast.success(data.message ? data.message : data.messages, {
          position: toast.PackageITION?.TOP_RIGHT,
          hideProgrefalser: false,
          autoClose: 2000,
          theme: "colored",
        });
      }
      else {
        toast.error(error, {
          position: toast.PackageITION?.TOP_RIGHT,
          hideProgrefalser: false,
          autoClose: 2000,
          theme: "colored",
        });
      }
    }
    else {
      toast.error('please select ID', {
        position: toast.PackageITION?.TOP_RIGHT,
        hideProgrefalser: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }


  // tabchange
  const clearData = () => {
    setActiveCampwiseData([])
    setDeactiveCampwiseData([])
  }


  const tabchange = (e) => {
    if (e.target.dataset.rrUiEventKey === "CreateInternetPacakges") {
      getList()
      clearData()
    }
    if (e.target.dataset.rrUiEventKey === "SuperAdminPackages") {
      getAssignedList()
      clearData()
    }
    else if (e.target.dataset.rrUiEventKey === "AttachedPackageList") {
      // getCampsList()
      clearData()
    }
    else if (e.target.dataset.rrUiEventKey === "DeletedInternetPacakges") {
      getDeletedList()
      clearData()
    }
    else if (e.target.dataset.rrUiEventKey === "DeleteAssignList") {
      getAssignedDeletedList()
    }
  }


  //reactive data 
  const reActiveDeleted = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package/status-update/${row.id}`, { status: value === false ? "2" : "1", updated_at: new Date() });

    if (data) {
      toast.success(data?.message ? data?.message : data?.messages, {
        position: toast.PackageITION?.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
      getDeletedList()
    }
  }

  // Get Assign Package By Camps

  const getActiveAssignPackagebyCamps = async (ids) => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/assigned-package-camp-wise?camp_ids=${ids}&status=1`);
    if (data) {
      setActiveCampwiseData(data?.data?.list)
      setPreloader(false)
    }
    else {
      setPreloader(false)
      toast.error(error, {
        position: toast.PackageITION?.TOP_RIGHT,
        hideProgrefalser: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }
  const getDeactiveAssignPackagebyCamps = async (ids) => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/assigned-package-camp-wise?camp_ids=${ids}&status=2`);
    if (data) {
      setDeactiveCampwiseData(data?.data?.list)
      setPreloader(false)
    }
    else {
      setPreloader(false)
      toast.error(error, {
        position: toast.PackageITION?.TOP_RIGHT,
        hideProgrefalser: false,
        autoClose: 2000,
        theme: "colored",
      });
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
        position: toast.PackageITION?.TOP_RIGHT,
        hideProgrefalser: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }

  const GetAssignData = (value) => {
    if (value.length > 1) {
      let ids = value.map(item => item.value).join(',');
      setCampIDS(ids)
    }
    else if (value.length === 1) {
      setCampIDS(value[0].value)
    }
    else {
      setActiveCampwiseData([])
      setDeactiveCampwiseData([])
      setCampIDS('')
    }
  }


  // Get Assign Camps By Package
  const getActiveAssignCampsByPackage = async (internetID) => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/assigned-camps-by-client-package?client_package_id=${internetID}&status=1`);
    if (data) {
      setActivePackageWiseData(data?.data?.list)
      setPreloader(false)
    }
    else {
      setPreloader(false)
      toast.error(error, {
        position: toast.PackageITION?.TOP_RIGHT,
        hideProgrefalser: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }

  const getDeactiveAssignCampsByPackage = async (internetID) => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/internet-package/assigned-camps-by-client-package?client_package_id=${internetID}&status=2`);
    if (data) {
      setDeactivePackageWiseData(data?.data?.list)
      setPreloader(false)
    }
    else {
      setPreloader(false)
      toast.error(error, {
        position: toast.PackageITION?.TOP_RIGHT,
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
    if (internetID.length) {
      setPreloader(true)
      getActiveAssignCampsByPackage(internetID)
      getDeactiveAssignCampsByPackage(internetID)
    }
    else {
      toast.error('Please Select Package', {
        position: toast.PackageITION?.TOP_RIGHT,
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
  const handleInternetAssignView = (row) => {
    setAssignPackageViewModalData(row)
    setAssignPackageViewModal(true)
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
                      defaultActiveKey="SuperAdminPackages"
                      onClick={(e) => tabchange(e)}
                    >
                      <Tab eventKey="SuperAdminPackages" className="me-1 " title="Super Admin Packages">
                        <hr />
                        <div className="tabs-menu1 tabstyle2">
                          <Tabs
                            className=" panel-tabs "
                            variant="pills"
                            defaultActiveKey="SuperAdminPackages"
                            onClick={(e) => tabchange(e)}
                          >
                            <Tab eventKey="SuperAdminPackages" className="me-1 " title="Active Super Admin Packages">
                              <div className="salesdatatable">
                                <div className="table-responsive">
                                  <SuperAdminAssignPackage data={AssignPackgeList} />
                                </div>
                              </div>
                            </Tab>
                            <Tab eventKey="DeleteAssignList" className="me-1 " title="Deleted Super Admin Packages">
                              <div className="salesdatatable">
                                <div className="table-responsive">
                                  <SuperAdminAssignPackage data={AssignDeletedatalist} />
                                </div>
                              </div>
                            </Tab>
                          </Tabs>
                        </div>
                      </Tab>

                      <Tab eventKey="CreateInternetPacakges" className="me-1 " title="Create Internet Packages">
                        <hr />
                        <div className="salesdatatable">
                          <div className="table-responsive">
                            <ActiveList
                              data={clientPackgeList}
                              handleEditClick={(row) => handleEditClick(row, 'edit')}
                              handleStatus={(row, value) => handleStatus(row, value)}
                              handleDelete={(row) => handleDelete(row)}
                              handleView={(row) => handleView(row)}
                              handleAssignInternet={(row) => handleAssign(row, 'internet')}
                              _CURRENCY={_CURRENCY}
                            />
                          </div>
                        </div>
                      </Tab>


                      <Tab eventKey="DeletedInternetPacakges" className="me-1 " title="Deleted Internet Packages">
                        <hr />
                        <div className="salesdatatable">
                          <div className="table-responsive">
                            <DeletedList
                              data={Deletedatalist}
                              reActiveDeleted={(row, value) => reActiveDeleted(row, value)}
                              handleView={(row) => handleView(row)}
                              _CURRENCY={_CURRENCY}
                            />
                          </div>
                        </div>
                      </Tab>

                      <Tab eventKey="AttachedPackageList" className="me-1 " title="Attached Package List">
                        <hr />
                        <div className="salesdatatable">
                          <div className="form-group" style={{ minWidth: "200px", maxWidth: "500px" }}>
                            <label className="form-label">Select Camps </label>
                            <div className="form-group d-flex px-0 align-items-start" style={{ minWidth: "200px" }}>
                              <Select
                                id="client_ids"
                                className="w-65"
                                placeholder="select camps to get list"
                                onChange={(e) => GetAssignData(e)}
                                singleSelect="true"
                                options={_USER?.campsList}
                                isMulti={true}
                                required={true}
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
                                  options={_USER?.internetList}
                                  required={true}
                                  value={getKeyName(_USER?.internetList, internetID)}
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
                                    <ActivePackageWise
                                      data={ActivePackageWiseData}
                                      _USER={_USER}
                                      handleAssignView={(row) => handleInternetAssignView(row)}
                                    />
                                  </div>
                                </Tab>
                                <Tab eventKey="DeativePackageWiseList" className="me-1 " title="Deative Package Wise List">
                                  <div className="table-responsive">
                                    <DeactivePackageWise
                                      data={DeactivePackageWiseData}
                                      handleAssignView={(row) => handleInternetAssignView(row)}
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
                    <label className="form-label"> Camps </label>
                    < Select
                      id="client_ids"
                      placeholder="Select Camps"
                      onChange={(e) => handleChangeAssignData(e)}
                      singleSelect="true"
                      options={_USER?.campsList}
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
                    <label htmlFor="package_code" className="form-label">Package Alias ID</label>
                    <input className="form-control" type="text"
                      id="package_code"
                      placeholder="Enter Package Alias ID"
                      name="package_code"
                      value={modalData?.package_code}
                      onChange={(e) => handleChange('package_code', e.target.value)}
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
                    <label className="form-label"> Connect With Package</label>
                    <Select
                      id="internet_package_id"
                      placeholder="Select Internet Package"
                      value={getKeyName(internetIds, modalData?.internet_package_id)}
                      onChange={(e) => handleChange('internet_package_id', e.value)}
                      singleSelect="true"
                      options={internetIds}
                      isDisabled={isEdit}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="package_price" className="form-label">Package Price ({_CURRENCY})  </label>
                    <input className="form-control" type="text"
                      id="package_price"
                      placeholder="Enter Package Price"
                      name="package_price"
                      value={modalData?.package_price}
                      onChange={(e) => handleChange('package_price', e.target.value)}
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

      {infoModal && <ViewModal show={infoModal} data={infoModalData} handleCloseModal={() => handleCloseModal()} _CURRENCY={_CURRENCY} />}

      {assignViewModal && <ViewModal show={assignViewModal} data={assignViewModalData} handleCloseModal={() => handleCloseModal()} _CURRENCY={_CURRENCY} />}

      {assignPackageViewModal && <PackageViewModal show={assignPackageViewModal} data={assignPackageViewModalData} handleCloseModal={() => handleCloseModal()} internetList={_USER?.internetList} _CURRENCY={_CURRENCY} />}

    </div>
  );
}
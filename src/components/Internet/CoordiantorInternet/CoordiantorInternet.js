import React, { useEffect, useState } from "react";
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApi from "../../../hooks/useApi";
import { baseUrl } from "../../../constants/endpoints";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ROLES_SLUG } from "../../../constants/strings";
import { getKeyName } from "../../../constants/functions";
import Select from 'react-select';
import DeleteModal from "../../common/DeleteModal";
import ActiveList from "./ActiveList";
import DeletedList from "./DeleteList";
import ViewModal from "./ViewModal";
import AssignPackage from "./AssignPackage";


export default function CoordiantorInternet() {
  const [openModal, setOpenModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [clientPackgeList, setClientPackgeList] = useState([]);
  const [AssignPackgeList, setAssignPackgeList] = useState([]);
  const [updateID, setUpdateID] = useState('');
  const [modalData, setModalData] = useState([]);
  const [infoModalData, setInfoModalData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [internetIds, setInternetIds] = useState([]);
  const [assignModal, setAssignModal] = useState(false);
  const [packageData, setPackgeData] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [ids, setIDS] = useState('');
  const [deleteModal, setdeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [Deletedatalist, setDeleteDataList] = useState([]);
  const [AssignDeletedatalist, setAssignDeleteDataList] = useState([]);

  const _USER = useSelector(e => e?.common);
  const _CURRENCY = useSelector(e => e?.common.user_data?.currency_code);


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
      if (_USER?.user_data?.client_id > "0") {
        getInternetPackgeList()
      }
      else if (_USER?.user_data?.client_id === "0") {
        getClientList()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_USER?.role])

  const getList = async () => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package`);
    if (data) {
      setClientPackgeList(data?.data?.list)
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

  const getAssignedDeletedList = async () => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package/assigned?status=0`);
    if (data) {
      setAssignDeleteDataList(data?.data?.list)
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


  const getClientList = async () => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/client-admin`);
    if (data) {
      let optionList = []
      for (let index = 0; index < data?.data?.list.length; index++) {
        let obj = { value: data?.data?.list[index].id, label: data?.data?.list[index].full_name }
        optionList.push(obj);
      }
      setClientList(optionList)
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


  const getInternetPackgeList = async () => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package/assigned`);
    if (data) {
      setAssignPackgeList(data?.data?.list)
      let optionList = []
      for (let index = 0; index < data?.data?.list.length; index++) {
        let obj = { value: data?.data?.list[index].id, label: data?.data?.list[index].original_package_name }
        optionList.push(obj);
      }
      setInternetIds(optionList)
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
    setOpenModal(false)
    setInfoModal(false)
    setAssignModal(false)
    setIDS('')
    setPackgeData([])
    setdeleteModal(false);
    setDeleteId('');
  };

  const submitHandler = async () => {

    let new_formData = {
      ...modalData,
      created_at: new Date()
    }

    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package`, new_formData);
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
      const { data } = await api.put(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package/${updateID}`, new_formData);

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


  // delete functionality 

  const handleDelete = (row) => {
    setDeleteId(row.id)
    setdeleteModal(true)
  }

  const confirmDelete = async (deleteId) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package/status-update/${deleteId}`, { status: 0, deleted_at: new Date() });
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

  const handleView = async (row) => {
    setInfoModalData(row)
    setInfoModal(true)
  }


  const handleChange = (name, value) => {
    setModalData({ ...modalData, [name]: value })
  }


  const handleStatus = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package/status-update/${row.id}`, { status: value === false ? "2" : "1", updated_at: new Date() });

    if (data) {
      toast.success(data?.message ? data?.message : data?.messages, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
      getList()
    }
  }




  // assign functionality 

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
      setIDS(value.value)
    }
  }

  const assignHandle = async () => {
    if (ids.length) {
      let req = {}
      req.client_ids = ids
      req.internet_package_id = packageData.id

      const { data, error } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/internet-package/assign-client`, req);
      if (data) {
        handleCloseModal()
        toast.success(data?.message ? data?.message : data?.messages, {
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
      toast.error('please select ID', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgrefalser: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }


  //reactive data 

  const tabchange = (e) => {
    if (e.target.dataset.rrUiEventKey === "SuperAdminPackages") {
      getInternetPackgeList()
    }
    else if (e.target.dataset.rrUiEventKey === "ActiveInternetList") {
      getList()
    }
    else if (e.target.dataset.rrUiEventKey === "DeleteInternetList") {
      getDeletedList()
    }
    else if (e.target.dataset.rrUiEventKey === "DeleteAssignList") {
      getAssignedDeletedList()
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


  return (
    <div>
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
                      {_USER?.user_data?.client_id > "0" &&
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
                                    <AssignPackage data={AssignPackgeList} />
                                  </div>
                                </div>
                              </Tab>
                              <Tab eventKey="DeleteAssignList" className="me-1 " title="Deleted Super Admin Packages">
                                <div className="salesdatatable">
                                  <div className="table-responsive">
                                    <AssignPackage data={AssignDeletedatalist} />
                                  </div>
                                </div>
                              </Tab>
                            </Tabs>
                          </div>

                        </Tab>
                      }
                      <Tab eventKey="ActiveInternetList" className="me-1 " title="Create Internet Packages">
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
                              _USER={_USER}
                              _CURRENCY={_CURRENCY}
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
                Assign Client
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
                      options={clientList}
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

                  {_USER.user_data?.client_id > "0" &&
                    <>
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
                        <label htmlFor="package_price" className="form-label">Package Price ({_USER?.user_data?.currency_code ? _USER?.user_data?.currency_code : _USER?.currency_code})</label>
                        <input className="form-control" type="text"
                          id="package_price"
                          placeholder="Enter Package Price"
                          name="package_price"
                          value={modalData?.package_price}
                          onChange={(e) => handleChange('package_price', e.target.value)}
                          required
                        />
                      </div>
                    </>
                  }
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

      {infoModal && <ViewModal show={infoModal} data={infoModalData} handleCloseModal={() => handleCloseModal()} _CURRENCY={_CURRENCY} _USER={_USER} />}

    </div>
  );
}

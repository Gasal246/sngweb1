import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import { baseUrl } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ROLES_SLUG, TypeData } from "../../constants/strings";
import { getKeyName } from "../../constants/functions";
import DeleteModal from "../common/DeleteModal";
import ActiveList from "./ActiveList";
import DeletedList from "./DeleteList";
import ViewModal from "./ViewModal";


export default function PlantManger() {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [datalist, setDataList] = useState([]);
  const [updateID, setUpdateID] = useState('');
  const [modalData, setModalData] = useState([]);
  const [Deletedatalist, setDeleteDataList] = useState([]);
  const [deleteModal, setdeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [infoModalData, setInfoModalData] = useState([]);
  const [infoModal, setInfoModal] = useState(false);
  const _USER = useSelector(e => e?.common);
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
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/plant-manager`);
    if (data) {
      setDataList(data?.data?.list)
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
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/plant-manager?status=0`);
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
      setUpdateID(data?.id);
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
  }

  const submitHandler = async () => {
    let new_formData = {
      ...modalData,
    }

    const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/plant-manager`, new_formData);

    if (data) {
      toast.success(data?.message ? data?.message : data?.messages, {
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
    const { client_id, role_id, status, createdAt, updatedAt, id, ...removeData } = modalData;
    let new_formData = {
      ...removeData
    }

    const { data } = await api.put(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/plant-manager/${updateID}`, new_formData);

    if (data) {
      toast.success(data?.message ? data?.message : data?.messages, {
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

    const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/plant-manager/status-update/${row.id}`, { status: value === false ? "2" : "1" });

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

  const handleChange = (name, value) => {
    if (name === "type") {
      setModalData({ ...modalData, [name]: value.value })
    }
    else {
      setModalData({ ...modalData, [name]: value })
    }
  }

  // delete functionality 

  const handleDelete = (row) => {
    setDeleteId(row.id)
    setdeleteModal(true)
  }

  const confirmDelete = async (deleteId) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/plant-manager/status-update/${deleteId}`, { status: 0, deleted_at: new Date() });
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


  //reactive data 

  const tabchange = (e) => {
    if (e.target.dataset.rrUiEventKey === "ActivePlantList") {
      getList()
    }
    else if (e.target.dataset.rrUiEventKey === "DeletePlantList") {
      getDeletedList()
    }
  }

  const reActiveDeleted = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/plant-manager/status-update/${row.id}`, { status: value === false ? "2" : "1", updated_at: new Date() });

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


  // view modal
  const getInfoData = async (id) => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/plant-manager/${id}`);
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


  return (
    <div>
      <Row>
        <Col sm={12} className="col-12">
          <Card className="mt-5">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <h3 className="card-title mb-0">Plant Manager</h3>
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
                      defaultActiveKey="ActivePlantList"
                      onClick={(e) => tabchange(e)}
                    >
                      <Tab eventKey="ActivePlantList" className="me-1 " title="Active Plant Manager List">
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
                      <Tab eventKey="DeletePlantList" className="me-1 " title="Deleted Plant Manager List">
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

      {openModal && (
        <Modal size="xl" show={openModal}>
          <form id="form" onSubmit={isEdit ? handleSubmit(updateData) : handleSubmit(submitHandler)} validate>
            <Modal.Header>
              <div className="modal-title h4 mb-0">{`${isEdit ? 'Edit' : 'Add'} Plant Manager`}</div>
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
                    <label htmlFor="email" className="form-label">Type</label>
                    <Select
                      id="Type"
                      placeholder="Select Type"
                      value={getKeyName(TypeData, modalData?.type)}
                      onChange={(e) => handleChange('type', e)}
                      singleSelect="true"
                      options={TypeData}
                      required
                    />
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                    <label htmlFor="commission_pct" className="form-label">Commission PCT(%)</label>
                    <input className="form-control" type="text" id="commission_pct" placeholder="Enter Commission PCT In %" name="commission_pct"
                      onChange={(e) => handleChange('commission_pct', e.target.value)}
                      value={modalData?.commission_pct}
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
    </div>
  );
}

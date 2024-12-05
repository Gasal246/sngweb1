import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import { baseUrl } from "../../constants/endpoints";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ROLES_SLUG, TypeData } from "../../constants/strings";
import { getKeyName } from "../../constants/functions";
import DeleteModal from "../common/DeleteModal";


export default function KitchenManager() {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [datalist, setDataList] = useState([]);
  const [updateID, setUpdateID] = useState('');
  const [modalData, setModalData] = useState([]);
  const _USER = useSelector(e => e?.common);
  const [deleteId, setDeleteId] = useState('');
  const [deleteModal, setdeleteModal] = useState(false);
  const [Deletedatalist, setDeleteDataList] = useState([]);

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
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/kitchen-manager`);
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
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/kitchen-manager?status=0`);
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
  }

  const submitHandler = async () => {
    let new_formData = {
      ...modalData,
      created_at: new Date()
    }

    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/kitchen-manager`, new_formData);

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
    let new_formData = {
      ...modalData,
      updated_at: new Date()
    }

    const { data } = await api.put(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/kitchen-manager/${updateID}`, new_formData);

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

  const handleChange = (name, value) => {
    if (name === "type") {
      setModalData({ ...modalData, [name]: value.value })
    }
    else {
      setModalData({ ...modalData, [name]: value })
    }
  }

  const handleView = async (row) => {
    window.location.href = `/admin-kitchen-manger/${+row.id}/package`
  }



  const handleStatus = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/kitchen-manager/status-update/${row.id}`, { status: value === false ? "2" : "1" });
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

  //reactive data 

  const tabchange = (e) => {
    if (e.target.dataset.rrUiEventKey === "ActiveKitchenList") {
      getList()
    }
    else if (e.target.dataset.rrUiEventKey === "DeleteKitchenList") {
      getDeletedList()
    }
  }

  const reActiveDeleted = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/kitchen-manager/status-update/${row.id}`, { status: value === false ? "2" : "1" });
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
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/kitchen-manager/status-update/${deleteId}`, { status: 0, deleted_at: new Date() });
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
  return (
    <div>
      <Row>
        <Col sm={12} className="col-12">
          <Card className="mt-5">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <h3 className="card-title mb-0">Kitchen Manager</h3>
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
                      defaultActiveKey="ActiveKitchenList"
                      onClick={(e) => tabchange(e)}
                    >
                      <Tab eventKey="ActiveKitchenList" className="me-1 " title="Active Kitchen Manager List">
                        <div className="salesdatatable">
                          <div className="table-responsive">
                            <ActiveList
                              data={datalist}
                              handleEditClick={(row) => handleEditClick(row, 'edit')}
                              handleView={(row) => handleView(row)}
                              handleStatus={(row, value) => handleStatus(row, value)}
                              handleDelete={(row) => handleDelete(row)}
                            />
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="DeleteKitchenList" className="me-1 " title="Deleted Kitchen Manager List">
                        <div className="salesdatatable">
                          <div className="table-responsive">
                            <DeletedList
                              data={Deletedatalist}
                              reActiveDeleted={(row, value) => reActiveDeleted(row, value)}
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
              <div className="modal-title h4 mb-0">{`${isEdit ? 'Edit' : 'Add'} Kitchen Manager`}</div>
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
                      value={modalData?.commission_pct}
                      onChange={(e) => handleChange('commission_pct', e.target.value)}
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

    </div>
  );
}

export const ActiveList = ({ handleEditClick, data, handleStatus, handleView, handleDelete }) => {
  const columns = [
    {
      name: "	NAME",
      selector: row => [row.full_name],
      sortable: true,
      cell: row => <div className="d-flex">
        <div className="ms-2 mt-0 mt-sm-2 d-block">
          <h6 className="mb-0 fs-14 fw-semibold">{row.full_name}</h6>
          <span className="fs-12 text-muted">{row.email}</span>
        </div>
      </div>
    },
    {
      name: "CREATED AT",
      selector: row => [row.created_at],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.created_at}</span>
    },
    {
      name: "LOCATION",
      selector: row => [row.location],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.location ? row.location : "-"}</span>
    },
    {
      name: "TYPE",
      selector: row => [row.type],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.type}</span>
    },
    {
      name: "COMMISSION",
      selector: row => [row.commission_pct],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.commission_pct}%</span>
    },
    {
      name: "STATUS",
      selector: row => [row.status],
      sortable: true,
      cell: row => (
        <label className="custom-switch">
          <input type="checkbox" className="custom-switch-input" id="status"
            checked={Number(row.status) === 1 ? true : false}
            onChange={(e) => handleStatus(row, e.target.checked)}
          />
          <span className="custom-switch-indicator"></span>
        </label>
      )
    },

    {
      name: "ACTION",
      selector: row => [row.action],
      sortable: true,
      cell: row => <span className="">
        <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
          <Link onClick={() => handleEditClick(row)} to="#" className="btn btn-primary btn-sm rounded-11 my-1 me-2" ><i><svg className="table-edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" /></svg></i></Link>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
          <Link to="#" onClick={() => handleDelete(row)} className="btn btn-danger btn-sm rounded-11 my-1 me-2">
            <i>
              <svg className="table-delete" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" /></svg>
            </i>
          </Link>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip >View Package</Tooltip>}>
          <Link to="#" onClick={() => handleView(row)} className="btn btn-info btn-sm rounded-11 my-1 me-2">
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </i>
          </Link>
        </OverlayTrigger>
      </span>
    },
  ]
  const tableDatas = {
    columns,
    data,
  };
  return (
    <DataTableExtensions {...tableDatas} >
      <DataTable
        columns={columns}
        data={data}
        noHeader
        defaultSortField="id"
        defaultSortAsc={false}
        striped={true}
        center={true}
        persistTableHead
        pagination
        highlightOnHover />
    </DataTableExtensions>
  )
}

export const DeletedList = ({ data, reActiveDeleted }) => {
  const columns = [
    {
      name: "	NAME",
      selector: row => [row.full_name],
      sortable: true,
      cell: row => <div className="d-flex">
        <div className="ms-2 mt-0 mt-sm-2 d-block">
          <h6 className="mb-0 fs-14 fw-semibold">{row.full_name}</h6>
          <span className="fs-12 text-muted">{row.email}</span>
        </div>
      </div>
    },
    {
      name: "CREATED AT",
      selector: row => [row.created_at],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.created_at}</span>
    },
    {
      name: "LOCATION",
      selector: row => [row.location],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.location ? row.location : "-"}</span>
    },
    {
      name: "TYPE",
      selector: row => [row.type],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.type}</span>
    },
    {
      name: "COMMISSION",
      selector: row => [row.commission_pct],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.commission_pct}%</span>
    },

    {
      name: "STATUS",
      selector: row => [row.status],
      sortable: true,
      cell: row => (
        <label className="custom-switch">
          <input type="checkbox" className="custom-switch-input" id="status"
            checked={Number(row.status) === 1 ? true : false}
            onChange={(e) => reActiveDeleted(row, e.target.checked)}
          />
          <span className="custom-switch-indicator"></span>
        </label>
      )
    }

  ]
  const tableDatas = {
    columns,
    data,
  };
  return (
    <DataTableExtensions {...tableDatas} >
      <DataTable
        columns={columns}
        data={data}
        noHeader
        defaultSortField="id"
        defaultSortAsc={false}
        striped={true}
        center={true}
        persistTableHead
        pagination
        highlightOnHover />
    </DataTableExtensions>
  )
}
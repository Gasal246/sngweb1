import React, { useEffect, useState } from "react";
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import { baseUrl, SUPERADMIN_ADD_CLIENT_ADMIN_API, SUPERADMIN_ADD_GET_COUNTRY_API, SUPERADMIN_UPDATE_CLIENT_ADMIN_API } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { getKeyName } from "../../constants/functions";
import Select from 'react-select';
import { optionData, ROLES_SLUG } from "../../constants/strings";
import DeleteModal from "../common/DeleteModal";
import { useSelector } from "react-redux";
import ActiveList from "./ActiveList";
import ViewModal from "./ViewModal";
import DeletedList from "./DeleteList";


export default function ClientAdministrator() {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [datalist, setDataList] = useState([]);
  const [updateID, setUpdateID] = useState('');
  const [modalData, setModalData] = useState([]);
  const [CountryList, setCountryList] = useState([]);
  const [deleteModal, setdeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [Deletedatalist, setDeleteDataList] = useState([]);
  const [infoModalData, setInfoModalData] = useState([]);
  const [infoModal, setInfoModal] = useState(false);


  const api = useApi();
  const _USER = useSelector(e => e?.common);


  const { handleSubmit, reset } = useForm({ defaultValues: {}, shouldUnregister: true, mode: 'onChange', });


  useEffect(() => {
    if (_USER?.role?.length) {
      getCountryList()
      getList()
      getDeletedList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_USER?.role])

  const getList = async () => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/client-admin`);
    if (data) {

      setDataList(data?.data?.list);
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
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/client-admin?status=0`);
    if (data) {
      setDeleteDataList(data?.data?.list)
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

  const getCountryList = async () => {
    const { data, error } = await api.get(SUPERADMIN_ADD_GET_COUNTRY_API);
    if (data) {
      let optionList = []
      for (let index = 0; index < data?.data?.list.length; index++) {
        let obj = { value: data?.data?.list[index].name, label: data?.data?.list[index].name, currency_code: data?.data?.list[index].currency_code }
        optionList.push(obj);
      }

      setCountryList(optionList)
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
    setModalData(data)


    if (data) {
      setUpdateID(data?.id)
      reset(data);
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setdeleteModal(false);
    setDeleteId('');
    setInfoModalData([])
    setInfoModal(false)
  };

  const submitHandler = async () => {
    let new_formData = {
      ...modalData,
      is_internet_management: `${(modalData?.is_internet_management === true || modalData?.is_internet_management === "1") ? "1" : "0"}`,
      is_investor_management: `${(modalData?.is_investor_management === true || modalData?.is_investor_management === "1") ? "1" : "0"}`,
      is_mess_management: `${(modalData?.is_mess_management === true || modalData?.is_mess_management === "1") ? "1" : "0"}`,
      is_water_management: `${(modalData?.is_water_management === true || modalData?.is_water_management === "1") ? "1" : "0"}`,
      // created_at: new Date()
    }

    const { data, error } = await api.post(SUPERADMIN_ADD_CLIENT_ADMIN_API, new_formData);

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

    let { role_id, status, updatedAt, createdAt, id, updated_at, ...removeExtraData } = modalData;

    let new_formData = {
      ...removeExtraData,
      is_internet_management: `${(modalData?.is_internet_management === true || modalData?.is_internet_management === "1") ? "1" : "0"}`,
      is_investor_management: `${(modalData?.is_investor_management === true || modalData?.is_investor_management === "1") ? "1" : "0"}`,
      is_mess_management: `${(modalData?.is_mess_management === true || modalData?.is_mess_management === "1") ? "1" : "0"}`,
      is_water_management: `${(modalData?.is_water_management === true || modalData?.is_water_management === "1") ? "1" : "0"}`,
    }

    const { data, error } = await api.put(`${SUPERADMIN_ADD_CLIENT_ADMIN_API}/${updateID}`, new_formData);


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

    const { data } = await api.post(SUPERADMIN_UPDATE_CLIENT_ADMIN_API + "/" + row.id, { status: value === false ? "2" : "1" });
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
    if (name === 'country') {
      setModalData({ ...modalData, [name]: value.label, currency_code: value.currency_code })
    }
    else if (name === 'payment_type') {
      setModalData({ ...modalData, [name]: value.value })
    }
    else {
      setModalData({ ...modalData, [name]: value })
    }
  }


  const reActiveDeleted = async (row, value) => {
    const { data } = await api.post(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/client-admin/status-update/${row.id}`, { status: value === false ? "2" : "1", updated_at: new Date() });

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

  const tabchange = (e) => {
    if (e.target.dataset.rrUiEventKey === "ActiveClientList") {
      getList()
    }
    else if (e.target.dataset.rrUiEventKey === "DeleteClientList") {
      getDeletedList()
    }
  }


  //Delete Funtionality
  const handleDelete = (row) => {
    setDeleteId(row.id)
    setdeleteModal(true)
  }

  const confirmDelete = async (deleteId) => {
    const { data } = await api.post(SUPERADMIN_UPDATE_CLIENT_ADMIN_API + "/" + deleteId, { status: 0, deleted_at: new Date() });
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
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/client-admin/${id}`);
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
              <h3 className="card-title mb-0">Client Administrator</h3>
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
                      defaultActiveKey="ActiveClientList"
                      onClick={(e) => tabchange(e)}
                    >
                      <Tab eventKey="ActiveClientList" className="me-1 " title="Active Client List">
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
                      <Tab eventKey="DeleteClientList" className="me-1 " title="Deleted Client List">
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
          <form id="form" onSubmit={isEdit ? handleSubmit(updateData) : handleSubmit(submitHandler)} validated={true}>
            <Modal.Header>
              <div className="modal-title h4 mb-0">{`${isEdit ? 'Edit' : 'Add'} Client Administrator`}</div>
              <Button onClick={handleCloseModal} className="btn-close" variant="">
                <i className="fa fa-times fs-6"></i>
              </Button>
            </Modal.Header>
            <Modal.Body className="p-5">
              <React.Fragment>
                <h4 className="d-flex">Business Information</h4>
                <div className="mb-6">
                  <Row className="mb-2">
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
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

                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <label htmlFor="business_name" className="form-label">Business name</label>
                      <input className="form-control"
                        type="text"
                        id="business_name"
                        placeholder="Enter business name"
                        name="business_name"
                        value={modalData?.business_name}
                        onChange={(e) => handleChange('business_name', e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                      <label htmlFor="business_address" className="form-label">Business address</label>
                      <textarea className="form-control"
                        id="business_address"
                        placeholder="Enter business address"
                        name="business_address"
                        rows="3"
                        value={modalData?.business_address}
                        onChange={(e) => handleChange('business_address', e.target.value)}
                        required
                      >
                      </textarea>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <label htmlFor="email" className="form-label">Email address</label>
                      <input className="form-control" type="email" id="email" placeholder="Enter email address" name="email"
                        value={modalData?.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input className="form-control" type="text" id="phone" placeholder="Enter phone" name="phone"
                        value={modalData?.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <label htmlFor="city" className="form-label">City</label>
                      <input className="form-control" type="text" id="city" placeholder="Enter city" name="city"
                        value={modalData?.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        required
                      />
                    </div>
                    {/* <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <label htmlFor="country" className="form-label">Country</label>
                      <input className="form-control" type="text" id="country" placeholder="Enter country" name="country"
                        value={modalData?.country}
                        onChange={(e) => handleChange('country', e.target.value)}
                        required
                      />
                    </div> */}
        
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <label htmlFor="country" className="form-label">Country</label>
                      <Select
                        id="country"
                        placeholder="select country"
                        value={getKeyName(CountryList, modalData?.country)}
                        onChange={(e) => handleChange('country', e)}
                        singleSelect="true"
                        options={CountryList}
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input className="form-control" type="password" id="password" placeholder="Enter password" name="password"
                        value={modalData?.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        required
                      />
                    </div>
                  </Row>
                  <h4 className="d-flex">User Management</h4>
                  <Row className="mb-6">
                    <div className="col-lg-4 col-md-4 col-sm-12 form-group">
                      <label htmlFor="no_user" className="form-label">No of user</label>
                      <input className="form-control" type="number" id="no_user" placeholder="Enter no of user" name="no_user"
                        value={modalData?.no_user}
                        onChange={(e) => handleChange('no_user', e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 form-group">
                      <label htmlFor="no_camp" className="form-label">No of camp</label>
                      <input className="form-control" type="number" id="no_camp" placeholder="Enter no of camp" name="no_camp"
                        value={modalData?.no_camp}
                        onChange={(e) => handleChange('no_camp', e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 form-group">
                      <label htmlFor="no_cordinator" className="form-label">No of cordinator</label>
                      <input className="form-control" type="number" id="no_cordinator" placeholder="Enter no of cordinator" name="no_cordinator"
                        value={modalData?.no_cordinator}
                        onChange={(e) => handleChange('no_cordinator', e.target.value)}
                        required
                      />

                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 form-group">
                      <label htmlFor="no_pos" className="form-label">No of pos</label>
                      <input className="form-control" type="number" id="no_pos" placeholder="Enter no of pos" name="no_pos"
                        value={modalData?.no_pos}
                        onChange={(e) => handleChange('no_pos', e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 form-group">
                      <label htmlFor="no_kiosk" className="form-label">No of kiosk</label>
                      <input className="form-control" type="number" id="no_kiosk" placeholder="Enter no of kiosk" name="no_kiosk"
                        value={modalData?.no_kiosk}
                        onChange={(e) => handleChange('no_kiosk', e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 form-group">
                      <label htmlFor="no_accountant" className="form-label">No of accountant</label>
                      <input className="form-control" type="number" id="no_accountant" placeholder="Enter no of accountant" name="no_accountant"
                        value={modalData?.no_accountant}
                        onChange={(e) => handleChange('no_accountant', e.target.value)}
                        required
                      />
                    </div>
                  </Row>


                  <Row className="mb-2">
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <label className="custom-switch">
                        <label htmlFor="is_mess_management" className="form-label me-5"> Mess management </label>
                        <input type="checkbox" className="custom-switch-input" id="is_mess_management"
                          checked={Number(modalData?.is_mess_management)}
                          onChange={(e) => handleChange('is_mess_management', e.target.checked)}
                        />
                        <span className="custom-switch-indicator"></span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <label className="custom-switch">
                        <label htmlFor="is_water_management" className="form-label me-5"> Water management </label>
                        <input type="checkbox" className="custom-switch-input" id="is_water_management"
                          checked={Number(modalData?.is_water_management)}
                          onChange={(e) => handleChange('is_water_management', e.target.checked)}
                        />
                        <span className="custom-switch-indicator"></span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <label className="custom-switch">
                        <label htmlFor="is_internet_management" className="form-label me-5"> Internet management </label>
                        <input type="checkbox" className="custom-switch-input" id="is_internet_management"
                          checked={Number(modalData?.is_internet_management)}
                          onChange={(e) => handleChange('is_internet_management', e.target.checked)}
                        />
                        <span className="custom-switch-indicator"></span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <label className="custom-switch">
                        <label htmlFor="is_investor_management" className="form-label me-5"> Investor management </label>
                        <input type="checkbox" className="custom-switch-input" id="is_investor_management"
                          checked={Number(modalData?.is_investor_management)}
                          onChange={(e) => handleChange('is_investor_management', e.target.checked)}
                        />
                        <span className="custom-switch-indicator"></span>
                      </label>
                    </div>

                  </Row>


                  <Row className="mb-2">
                    <div className="col-lg-4 col-md-4 col-sm-12 form-group">
                      <label htmlFor="subscription_start" className="form-label">Subscription start</label>
                      <input className="form-control" type="date" id="subscription_start" placeholder="Enter subscription start" name="subscription_start"
                        value={modalData?.subscription_start}
                        onChange={(e) => handleChange('subscription_start', e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 form-group">
                      <label htmlFor="subscription_end" className="form-label">Subscription end</label>
                      <input className="form-control" type="date" id="subscription_end" placeholder="Enter subscription end" name="subscription_end"
                        value={modalData?.subscription_end}
                        onChange={(e) => handleChange('subscription_end', e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 form-group">
                      <label htmlFor="grace_period_days" className="form-label">Grace period days</label>
                      <input className="form-control" type="number" id="grace_period_days" placeholder="Enter grace period days" name="grace_period_days"
                        value={modalData?.grace_period_days}
                        onChange={(e) => handleChange('grace_period_days', e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 form-group">
                      <label htmlFor="payment_type" className="form-label">Payment type</label>
                      <Select
                        id="payment_type"
                        placeholder="select payment type"
                        value={getKeyName(optionData, modalData?.payment_type)}
                        onChange={(e) => handleChange('payment_type', e)}
                        singleSelect="true"
                        options={optionData}
                        required
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 form-group">
                      <label htmlFor="package_rate" className="form-label">Package rate</label>
                      <input className="form-control" type="number" id="package_rate" placeholder="Enter package rate" name="package_rate"
                        value={modalData?.package_rate}
                        onChange={(e) => handleChange('package_rate', e.target.value)}
                        required
                      />
                    </div>
                  </Row>
                </div>
              </React.Fragment>

            </Modal.Body>
            <Modal.Footer>
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
import React, { useEffect, useState } from "react";
import {Col, Row, Card, Tabs, Tab, Modal, Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import useApi from "../../hooks/useApi";
import { baseUrl } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ROLES_SLUG } from "../../constants/strings";
import ActiveList from "./ActiveList";
import Select from 'react-select';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

export default function Posdevicecode() {
  const [datalist, setDataList] = useState([]);
  const _USER = useSelector(e => e?.common);
  const api = useApi();
  const [openModal, setOpenModal] = useState(false);
  const [campIDS, setCampIDS] = useState('');
  const [posCode, setposCode] = useState('');
  const [posmodel, setposmodel] = useState(_USER.POSModal)
  const [posList, setposList] = useState([]);
  const [userposId, setuserposId] = useState('');
  const [PosIDS, setPosIDS] = useState('');
  const [POSDeviceCodeActivationModalData, setPOSDeviceCodeActivationModalData] = useState([]);
  const [openPOSDeviceCodeActivationModal, setOpenPOSDeviceCodeActivationModal] = useState(false);

  useEffect(() => {
    if (_USER?.role?.length) {
      getList()

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_USER?.role])

  const {
    handleSubmit,
  } = useForm({
    defaultValues: {},
    shouldUnregister: true,
    mode: 'onChange',
  });

  const dispatch = useDispatch()
  const getList = async () => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/pos-device-code`);
    if (data) {
      setDataList(data.data.list)
      let optionList = []
      for (let index = 0; index < data?.data?.list?.length; index++) {
        let obj = { value: data?.data?.list[index]?.pos_device_code, label: data?.data?.list[index]?.device_name }
        optionList.push(obj);
      }
      setposList(optionList);
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


  const handleStatus = async (row, value) => {
    const deActiveObj = {
      pos_device_code: row.pos_device_code,
    }

    let data;
    data = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/pos-device-code/deactivation`, deActiveObj);

    if (data?.data) {
      toast.success(data?.data.message ? data?.data.message : data?.data.messages, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
      getList()
    }
  }

  const HandleAssignCamp = (row) => {
    dispatch({ type: 'ASSIGNPOS', payload: true })
    setposCode(row)

  }
  const handleCloseModal = () => {
    setOpenModal(false)
    setOpenPOSDeviceCodeActivationModal(false)
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
      setCampIDS('')
    }
  }


  const GetAssignDataPos2 = (value) => {

    setuserposId(value.value)
  }

  const GetAssignDataPos = (value) => {

    if (value.length > 1) {
      let ids = value.map(item => item.value).join(',');
      setPosIDS(ids)
    }
    else if (value.length === 1) {
      setPosIDS(value[0].value)
    }
    else {
      setPosIDS('')
    }
  }


  const getassignedPos = async () => {
    let ids = {}
    ids.pos_device_codes = PosIDS;
    ids.pos_id = userposId;

    const { data, error } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/pos-device-code/assign-pos`, ids);
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

  const getassigned = async () => {
    let ids = {}
    ids.pos_device_code = posCode;
    ids.camp_ids = campIDS
    const { data, error } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/pos-device-code/assign-camps`, ids);
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

  const codevalue = (value) => {
    setposCode(value.value);
  }

  const posDeviceCodeActivation = () => {
    setOpenPOSDeviceCodeActivationModal(true);
  };

  const handleChange = (name, value) => {
    setPOSDeviceCodeActivationModalData({ ...POSDeviceCodeActivationModalData, [name]: value });
  }

  const submitHandler = async () => {

    let new_formData = {
      ...POSDeviceCodeActivationModalData,
    }

    const { data } = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/pos-device-code/activation`, new_formData);

    if (data) {
      toast.success(data.message ? data.message : data.messages, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgrefalser: false,
        autoClose: 2000,
        theme: "colored",
      });
      setOpenPOSDeviceCodeActivationModal(false)
      getList()
    }
  }

  return (
    <div>
      <Row>
        <Col sm={12} className="col-12">
          <Card className="mt-5">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <h3 className="card-title mb-0">POS Device Code</h3>
              <OverlayTrigger placement="top" overlay={<Tooltip >Active</Tooltip>}>
                <Link onClick={() => posDeviceCodeActivation()} to="#" className="btn btn-primary btn-icon text-white me-3">
                   <span>
                    <i className="fe fe-plus"></i>&nbsp;
                  </span>
                  Active
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
                      defaultActiveKey="ActivePosDeviceList"
                    >

                      <Tab eventKey="ActivePosDeviceList" className="me-1 " title="Active List">
                        <div className="salesdatatable">
                          <div className="table-responsive">

                            <ActiveList
                              data={datalist}
                              handleStatus={(row, value) => handleStatus(row, value)}
                              HandleAssignCamp={HandleAssignCamp}
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
      {_USER.CampModal && (
        <Modal size="xl" show={_USER.CampModal}>

          <Modal.Header>
            <div className="modal-title h4 mb-0">Assign Camps</div>
            <Button onClick={() => { dispatch({ type: 'ASSIGNCAMP', payload: false }) }} className="btn-close" variant="">
              <i className="fa fa-times fs-6"></i>
            </Button>
          </Modal.Header>
          <Modal.Body className="p-5">
            <div className="mb-6">
              <Row className="mb-2">
               
                <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                <label htmlFor="pos_device_code" className="form-label">POS Device Code</label>
                <Select
                  id="client_ids"
                  placeholder="Select POS"
                  onChange={(e) => codevalue(e)}
                  singleSelect="true"
                  options={posList}
                  isMulti={false}
                  required={true}

                />
                 </div> 
                
                <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                <label htmlFor="pos_device_code" className="form-label">Camps</label>
                  <Select
                    id="client_ids"
                    placeholder="Select Camps"
                    onChange={(e) => GetAssignData(e)}
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
            <Button type="button" variant="secondary" onClick={() => { dispatch({ type: 'ASSIGNCAMP', payload: false }) }}>Close</Button>
            <Button type="submit" variant="primary" onClick={getassigned} >Save</Button>
          </Modal.Footer>

        </Modal>
      )}

      {_USER.POSModal && (
        <Modal size="xl" show={_USER.POSModal}>

          <Modal.Header>
            <div className="modal-title h4 mb-0">Assign POS</div>
            <Button onClick={() => { dispatch({ type: 'ASSIGNPOS', payload: false }) }} className="btn-close" variant="">
              <i className="fa fa-times fs-6"></i>
            </Button>
          </Modal.Header>
          <Modal.Body className="p-5">
            <div className="mb-6">
              <Row className="mb-2">
                <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                  <label className="form-label"> POS Device Codes</label>
                  <Select
                    id="client_ids"
                    placeholder="Select POS Device Codes"
                    onChange={(e) => GetAssignDataPos(e)}
                    singleSelect="true"
                    options={posList}
                    isMulti={true}
                    required={true}

                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                  <label className="form-label"> POS </label>
                  <Select
                    id="client_ids"
                    placeholder="Select POS"
                    onChange={(e) => GetAssignDataPos2(e)}
                    singleSelect="true"
                    options={_USER?.posList}
                    isMulti={false}
                    required={true}

                  />

                </div>

              </Row>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={() => { dispatch({ type: 'ASSIGNPOS', payload: false }) }}>Close</Button>
            <Button type="submit" variant="primary" onClick={getassignedPos} >Save</Button>
          </Modal.Footer>

        </Modal>
      )}

      {openPOSDeviceCodeActivationModal &&
      <Modal size="xl" show={openPOSDeviceCodeActivationModal}>
        <form id="form" onSubmit={handleSubmit(submitHandler)} validate="true">
          <Modal.Header>
            <div className="modal-title h4 mb-0">POS Device Code Active</div>
            <Button onClick={handleCloseModal} className="btn-close" variant="">
              <i className="fa fa-times fs-6"></i>
            </Button>
          </Modal.Header>
          <Modal.Body className="p-5">
            <h4 className="d-flex">POS Device Code Information</h4>
            <div className="mb-6">
              <Row className="mb-6">
                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                  <label htmlFor="pos_device_code" className="form-label">Pos Device Code</label>
                  <input className="form-control" type="text"
                         id="pos_device_code"
                         placeholder="Enter POS Device Code"
                         name="pos_device_code"
                         onChange={(e) => handleChange('pos_device_code', e.target.value)}
                         required
                  />
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                  <label htmlFor="device_name" className="form-label">Device Name</label>
                  <input className="form-control" type="text"
                         id="device_name"
                         placeholder="Enter Device Name"
                         name="device_name"
                         onChange={(e) => handleChange('device_name', e.target.value)}
                         required
                  />
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                  <label htmlFor="device_model" className="form-label">Device Model</label>
                  <input className="form-control" type="text"
                         id="device_model"
                         placeholder="Enter Device Model"
                         name="device_model"
                         onChange={(e) => handleChange('device_model', e.target.value)}
                         required
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                  <label htmlFor="device_mac_address" className="form-label">Device Mac Address</label>
                  <input className="form-control" type="text"
                         id="device_mac_address"
                         placeholder="Enter Device Mac Address"
                         name="device_mac_address"
                         onChange={(e) => handleChange('device_mac_address', e.target.value)}
                         required
                  />
                </div>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={handleCloseModal}>Close</Button>
            <Button type="submit" variant="primary">Save</Button>
          </Modal.Footer>
        </form>
      </Modal>
      }
    </div>
  );
}
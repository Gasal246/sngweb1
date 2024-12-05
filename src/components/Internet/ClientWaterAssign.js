import React, { useEffect, useState } from "react";
import { Col, Row, Card, Button, Tab, Tabs } from "react-bootstrap";
import Select from 'react-select';
import useApi from "../../hooks/useApi";
import { baseUrl } from "../../constants/endpoints";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { statusCheck } from "../../constants/functions";
import { ROLES_SLUG } from "../../constants/strings";


export default function ClientWaterAssign() {
  const [datalist, setDataList] = useState([]);
  const [campsList, setCampsList] = useState([]);
  const [ids, setIDS] = useState('');
  const [Deletedatalist, setDeleteDataList] = useState([]);

  const _USER = useSelector(e => e?.common);

  const api = useApi();

  useEffect(() => {
    if (_USER?.role?.length) {
      getCampsList()
      getDeletedList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_USER?.role])



  const getCampsList = async () => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/camps`);
    if (data) {
      let optionList = []
      for (let index = 0; index < data.data.list.length; index++) {
        let obj = { value: data.data.list[index].id, label: data.data.list[index].camp_name }
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


  const getList = async (ids) => {
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/water-package/assigned-package-camp-wise?camp_ids=${ids}&status=1`);
    if (data) {
      setDataList(data.data.list)
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
    const { data, error } = await api.get(`${baseUrl}/${ROLES_SLUG[_USER?.role]}/api/water-package/assigned-package-camp-wise?camp_ids=${ids}&status=0`);
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

  const GetAssignData = (value) => {
    if (value.length > 1) {
      let ids = value.map(item => item.value).join(',');
      setIDS(ids)
    }
    else if (value.length === 1) {
      setIDS(value[0].value)
    }
    else {
      setDataList([])
    }
  }

  const getWaterList = () => {
    getList(ids)
  }


  const tabchange = (e) => {
    if (e.target.dataset.rrUiEventKey === "ActiveWaterList") {
      getList(ids)
    }
    else if (e.target.dataset.rrUiEventKey === "DeleteWaterList") {
      getDeletedList(ids)
    }
  }


  return (
    <div>
      <Row>
        <Col sm={12} className="col-12">
          <Card className="mt-5">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <h3 className="card-title mb-0">Assigned Water Package List</h3>
            </Card.Header>
            <Card.Body>
              <div className="packageTable">
                <div className="col-lg-6 col-md-6 col-sm-12 form-group px-0">
                  <label className="form-label">Select Camps </label>
                  <div className="col-sm-9 form-group d-flex px-0 align-items-start">
                    <Select
                      id="client_ids"
                      className="w-65"
                      placeholder="select camps to get list"
                      onChange={(e) => GetAssignData(e)}
                      singleSelect="true"
                      options={campsList}
                      isMulti={true}
                      required={true}
                    />
                    <Button className="btn btn-gray-dark ms-3" variant="default" onClick={() => getWaterList()}>Get List </Button>
                  </div>
                </div>
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
                          <div className="table-responsive">
                            <ActiveList data={datalist} />
                          </div>
                        </Tab>
                        <Tab eventKey="DeleteWaterList" className="me-1 " title="Deleted Water Package List">
                          <div className="table-responsive">
                            <DeletedList data={Deletedatalist} />
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                </div>


              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export const ActiveList = ({ data }) => {
  const columns = [
    {
      name: "CAMP	NAME",
      selector: row => [row.camp_name],
      sortable: true,
      cell: row => <div className="d-flex">
        <h6 className="mb-0 fs-14 fw-semibold">{row.camp_name}</h6>
      </div>
    },
    {
      name: "	NAME",
      selector: row => [row.package_name],
      sortable: true,
      cell: row => <div className="d-flex">
        <h6 className="mb-0 fs-14 fw-semibold">{row.package_name}</h6>
      </div>
    },
    {
      name: "QUANTITY",
      selector: row => [row.quantity],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.quantity}</span>
    },
    {
      name: "AMOUNT",
      selector: row => [row.amount],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.amount}</span>
    },
    {
      name: "STATUS",
      selector: row => [row.package_status],
      sortable: true,
      cell: row => <span className={`text-${row.package_status === "1" ? "green" : row.package_status === "0" ? "danger" : "red"} fs-15 fw-semibold`}>{statusCheck(row.package_status)}</span>
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
export const DeletedList = ({ data }) => {
  const columns = [
    {
      name: "CAMP	NAME",
      selector: row => [row.camp_name],
      sortable: true,
      cell: row => <div className="d-flex">
        <h6 className="mb-0 fs-14 fw-semibold">{row.camp_name}</h6>
      </div>
    },
    {
      name: "	NAME",
      selector: row => [row.package_name],
      sortable: true,
      cell: row => <div className="d-flex">
        <h6 className="mb-0 fs-14 fw-semibold">{row.package_name}</h6>
      </div>
    },
    {
      name: "QUANTITY",
      selector: row => [row.quantity],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.quantity}</span>
    },
    {
      name: "AMOUNT",
      selector: row => [row.amount],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.amount}</span>
    },
    {
      name: "STATUS",
      selector: row => [row.package_status],
      sortable: true,
      cell: row => <span className={`text-${row.package_status === "1" ? "green" : row.package_status === "0" ? "danger" : "red"} fs-15 fw-semibold`}>{statusCheck(row.package_status)}</span>
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
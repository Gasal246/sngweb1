import React, { useEffect, useState } from "react";
import { Col, Row, Card, Tabs, Tab } from "react-bootstrap";
import useApi from "../../hooks/useApi";
import { GET_DELETED_STORE_WATRERPACKAGE_API, GET_STORE_WATRERPACKAGE_API } from "../../constants/endpoints";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { statusCheck } from "../../constants/functions";


export default function StoreWaterAssigned() {
  const [datalist, setDataList] = useState([]);
  const _USER = useSelector(e => e?.common);
  const [Deletedatalist, setDeleteDataList] = useState([]);

  const api = useApi();

  useEffect(() => {
    if (_USER?.role?.length) {
      getList()
      getDeletedList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_USER?.role])

  const getList = async () => {
    const { data, error } = await api.get(GET_STORE_WATRERPACKAGE_API);
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
    const { data, error } = await api.get(GET_DELETED_STORE_WATRERPACKAGE_API);
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

  const tabchange = (e) => {
    if (e.target.dataset.rrUiEventKey === "ActiveWaterList") {
      getList()
    }
    else if (e.target.dataset.rrUiEventKey === "DeleteWaterList") {
      getDeletedList()
    }
  }

  return (
    <div>
      <Row>
        <Col sm={12} className="col-12">
          <Card className="mt-5">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <h3 className="card-title mb-0">Assigned Package List</h3>
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
                        <div className="packageTable">
                          <div className="table-responsive">
                            <ActiveList data={datalist} />
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="DeleteWaterList" className="me-1 " title="Delete Water Package List">
                        <div className="packageTable">
                          <div className="table-responsive">
                            <DeletedList data={Deletedatalist} />
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
    </div>
  );
}

export const ActiveList = ({ data }) => {
  const columns = [
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
      cell: row => <span className={`text-${row.package_status === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(row.package_status)}</span>
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
      cell: row => <span className={`text-${row.package_status === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(row.package_status)}</span>
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
import React, { useEffect, useState } from "react";
import { Col, Row, Card, Tabs, Tab } from "react-bootstrap";
import useApi from "../../hooks/useApi";
import { GET_DELETED_STORE_MEALPACKAGE_API, GET_STORE_MEALPACKAGE_API } from "../../constants/endpoints";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { statusCheck } from "../../constants/functions";


export default function StoreMealAssigned() {
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
    const { data, error } = await api.get(GET_STORE_MEALPACKAGE_API);
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
    const { data, error } = await api.get(GET_DELETED_STORE_MEALPACKAGE_API);
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
    if (e.target.dataset.rrUiEventKey === "ActiveMealList") {
      getList()
    }
    else if (e.target.dataset.rrUiEventKey === "DeleteMealList") {
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
                      defaultActiveKey="ActiveMealList"
                      onClick={(e) => tabchange(e)}
                    >
                      <Tab eventKey="ActiveMealList" className="me-1 " title="Active Meal Package List">
                        <div className="packageTable">
                          <div className="table-responsive">
                            <ActiveList data={datalist} />
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="DeleteMealList" className="me-1 " title="Delete Meal Package List">
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
      name: "VALIDITY (DAYS)",
      selector: row => [row.package_validity],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.package_validity}</span>
    },
    {
      name: "TYPE",
      selector: row => [row.package_type],
      sortable: true,
      cell: row => <span className={`text-${row.package_type === "Veg" ? "green" : "red"} fs-15 fw-semibold`}>{row.package_type}</span>
    },
    {
      name: "PRICE",
      selector: row => [row.package_cost],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.package_cost}</span>
    },
    {
      name: "COMMISSION",
      selector: row => [row.commission_pct],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.commission_pct}%</span>
    },
    {
      name: "FINAL COST",
      selector: row => [row.final_package_cost],
      sortable: true,
      cell: row => <h6 className="text-muted mb-0 fs-14 fw-semibold">{row.final_package_cost}</h6>
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
      name: "VALIDITY (DAYS)",
      selector: row => [row.package_validity],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.package_validity}</span>
    },
    {
      name: "TYPE",
      selector: row => [row.package_type],
      sortable: true,
      cell: row => <span className={`text-${row.package_type === "Veg" ? "green" : "red"} fs-15 fw-semibold`}>{row.package_type}</span>
    },
    {
      name: "PRICE",
      selector: row => [row.package_cost],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.package_cost}</span>
    },
    {
      name: "COMMISSION",
      selector: row => [row.commission_pct],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.commission_pct}%</span>
    },
    {
      name: "FINAL COST",
      selector: row => [row.final_package_cost],
      sortable: true,
      cell: row => <h6 className="text-muted mb-0 fs-14 fw-semibold">{row.final_package_cost}</h6>
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
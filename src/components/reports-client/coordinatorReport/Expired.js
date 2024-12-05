import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";


function ExpiredList({ data }) {


    const columns = [
        {
          name: "PACKAGE NAME",
          selector: row => [row.package_name],
          sortable: true,
          cell: row => <div className="d-flex">
            <div className="ms-2 mt-0 mt-sm-2 d-block">
              <h6 className="mb-0 fs-14 fw-semibold">{row.package_name}</h6>
            </div>
          </div>
        },
        {
          name: "PACKAGE SPEED",
          selector: row => [row.package_speed],
          sortable: true,
          cell: row => <span className="text-muted fs-15 fw-semibold">{row.package_speed}</span>
        },
        {
          name: "PACKAGE CODE",
          selector: row => [row.status],
          sortable: true,
          cell: row => (
            <span className="text-muted fs-15 fw-semibold">{row.package_code}</span>
          )
        },
        {
          name: "PRICE(AED)",
          selector: row => [row.status],
          sortable: true,
          cell: row => (
            <span className="text-muted fs-15 fw-semibold">{row.package_amount}</span>
          )
        },
        {
          name: "CAMP NAME",
          selector: row => [row.order_from_camp_detail.camp_name],
          sortable: true,
          cell: row => (
            <span className="text-muted fs-15 fw-semibold">{row.order_from_camp_detail.camp_name}</span>
          )
        },
        {
          name: "USER NAME",
          selector: row => [row.user.name],
          sortable: true,
          cell: row => (
            <span className="text-muted fs-15 fw-semibold">{row.user.name}</span>
          )
        },
        {
          name: "UUID",
          selector: row => [row.user.uuid],
          sortable: true,
          cell: row => (
            <span className="text-muted fs-15 fw-semibold">{row.user.uuid}</span>
          )
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

export default ExpiredList;    
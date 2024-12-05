import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {codeCheck, statusCheck} from '../../../constants/functions';


function DeactivatedList({ data, handleUnAssignStatus }) {
  const columns = [
    {
      name: "POS DEVICE CODE",
      selector: row => [row.pos_device_code.pos_device_code],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.pos_device_code.pos_device_code}</span>
    },
    {
      name: "CREATED AT",
      selector: row => [row.pos_device_code.createdAt],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.pos_device_code.createdAt}</span>
    },
    {
      name: "POS DEVICE CODE STATUS",
      selector: row => [row.pos_device_code.status],
      sortable: true,
      cell: row => <span className={`text-${row.pos_device_code.status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(row.pos_device_code.status.toString())}</span>
    },
    {
      name: "ASSIGNED STATUS",
      selector: row => [row.status],
      sortable: true,
      cell: row => (
        <label className="custom-switch">
          <input type="checkbox" className="custom-switch-input" id="status"
                 checked={Number(row.status) >= 1 ? true : false}
                 onChange={(e) => handleUnAssignStatus(row, e.target.checked)}
          />
          <span className="custom-switch-indicator"></span>
        </label>
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

export default DeactivatedList
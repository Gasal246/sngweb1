import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { statusCheck } from "../../../constants/functions"

function AttchedCoordinatorList({ data, handleStatus }) {
    const columns = [
        {
            name: "NAME",
            selector: row => [row.coordinator.full_name],
            sortable: true,
            cell: row =>
                <div>
                    <div className="ms-2 mt-0 mt-sm-2 d-block">
                        <h6 className="mb-0 fs-14 fw-semibold">{row.coordinator.full_name}</h6>
                        <span className="fs-12 text-muted">{row.coordinator.email}</span>
                    </div>

                </div>
        },
        {
            name: "CREATED AT",
            selector: row => [row.createdAt],
            sortable: true,
            cell: row => <span className="text-muted fs-15 fw-semibold">{row.createdAt}</span>
        },
        {
            name: "COORDINATOR STATUS",
            selector: row => [row.coordinator.status],
            sortable: true,
            cell: row => <span className={`text-${row.coordinator.status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(row.coordinator.status.toString())}</span>
        },
        {
          name: "ASSIGNED STATUS",
          selector: row => [row.status],
          sortable: true,
          cell: row => (
            <label className="custom-switch">
              <input type="checkbox" className="custom-switch-input" id="status"
                checked={Number(row.status)>= 1 ? true : false}
                onChange={(e) => handleStatus(row, e.target.checked)}
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
                className={"camps"}
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

export default AttchedCoordinatorList    

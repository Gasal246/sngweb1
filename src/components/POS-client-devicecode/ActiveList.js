import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {codeCheck, statusCheck} from '../../constants/functions';

function ActiveList({ data, handleStatus }) {
    const columns = [
        {
            name: "Device Name",
            selector: row => [row.device_name],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row.device_name ? row.device_name : '-'}</h6>
                </div>
            </div>
        },
        {
            name: "Device Model",
            selector: row => [row.device_model],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row.device_model ? row.device_model : '-'}</h6>
                </div>
            </div>
        },
        {
            name: "Device Mac Address",
            selector: row => [row.device_mac_address],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row.device_mac_address ? row.device_mac_address : '-'}</h6>
                </div>
            </div>
        },
        {
            name: "Pos Device Code",
            selector: row => [row.pos_device_code],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row.pos_device_code ? row.pos_device_code : '-'}</h6>
                </div>
            </div>
        },
        {
            name: "Is Used",
            selector: row => [row.is_used],
            sortable: true,
            cell: row => <span className={`text-${row.is_used.toString() === "0" ? "green" : "red"} fs-15 fw-semibold`}>{codeCheck(row.is_used.toString())}</span>
        },
        {
          name: "STATUS",
          selector: row => [row.status],
          sortable: true,
          cell: row => <span className={`text-${row.status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(row.status.toString())}</span>
        },
        {
            name: "CODE STATUS",
            selector: row => [row.code_status],
            sortable: true,
            cell: row => (
                <label className="custom-switch">
                    <input type="checkbox" className="custom-switch-input" id="status"
                        checked={Number(row.code_status) === 1 ? true : false}
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

export default ActiveList    
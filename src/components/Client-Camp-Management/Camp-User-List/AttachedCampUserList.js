import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { statusCheck } from "../../../constants/functions"

function AttchedCampUserList({ data }) {

    const columns = [
        {
            name: "NAME",
            selector: row => [row.user.name],
            sortable: true,
            cell: row =>
                <div>
                    <div className="ms-2 mt-0 mt-sm-2 d-block">
                        <h6 className="mb-0 fs-14 fw-semibold">{row.user.name}</h6>
                    </div>
                </div>
        },
        {
            name: "MAC ID",
            selector: row => [row.user.device_mac_id],
            sortable: true,
            cell: row => <span className="text-muted fs-15 fw-semibold">{row.user.device_mac_id}</span>
        }, {
            name: "PHONE",
            selector: row => [row.user.phone],
            sortable: true,
            cell: row => <span className="text-muted fs-15 fw-semibold">{row.user.phone}</span>
        },
        {
            name: "USER STATUS",
            selector: row => [row.user.status],
            sortable: true,
            cell: row => <span className={`text-${row.user.status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(row.user.status.toString())}</span>
        }
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

export default AttchedCampUserList

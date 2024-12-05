import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { statusCheck } from '../../../constants/functions';

function AssignPackage({ data }) {
    const columns = [
        {
            name: "PACKAGE	NAME",
            selector: row => [row.original_package_name],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row.original_package_name}</h6>
                </div>
            </div>
        },
        {
            name: "PACKAGE UUID",
            selector: row => [row.original_package_code],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row.original_package_code}</h6>
                </div>
            </div>
        },
        {
            name: "SPEED",
            selector: row => [row.original_package_speed],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row.original_package_speed}</h6>
                </div>
            </div>
        },
        {
            name: "STATUS",
            selector: row => [row.original_package_status],
            sortable: true,
            cell: row => <span className={`text-${row.original_package_status === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(row.original_package_status)}</span>
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

export default AssignPackage    
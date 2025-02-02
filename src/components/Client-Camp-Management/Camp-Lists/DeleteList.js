import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DeletedList({ data, reActiveDeleted, handleView }) {
    const columns = [
        {
            name: "CAMP	NAME",
            selector: row => [row.camp_name],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row.camp_name}</h6>
                </div>
            </div>
        },
        {
            name: "ADDRESS",
            selector: row => [row.camp_address],
            sortable: true,
            cell: row => <span className="text-muted fs-15 fw-semibold">{row.camp_address}</span>
        },
        {
            name: "CITY",
            selector: row => [row.camp_city],
            sortable: true,
            cell: row => <span className="text-muted fs-15 fw-semibold">{row.camp_city}</span>
        },
        {
            name: "CREATED AT",
            selector: row => [row.createdAt],
            sortable: true,
            cell: row => <span className="text-muted fs-15 fw-semibold">{row.createdAt}</span>
        },
        {
            name: "STATUS",
            selector: row => [row.status],
            sortable: true,
            cell: row => (
                <label className="custom-switch">
                    <input type="checkbox" className="custom-switch-input" id="status"
                        checked={Number(row.status) === 1 ? true : false}
                        onChange={(e) => reActiveDeleted(row, e.target.checked)}
                    />
                    <span className="custom-switch-indicator"></span>
                </label>
            )
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
                highlightOnHover
            />
        </DataTableExtensions>
    )
}

export default DeletedList    
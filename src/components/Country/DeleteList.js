import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DeletedList({ data, reActiveDeleted, handleView }) {

    const columns = [
        {
            name: "NAME",
            selector: row => [row.name],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row.name}</h6>
                    <span className="fs-12 text-muted">{row.email}</span>
                </div>
            </div>
        },
        {
            name: "SHORT NAME",
            selector: row => [row.short_name],
            sortable: true,
            cell: row => <span className="text-muted fs-15 fw-semibold">{row.short_name}</span>
        },
        {
            name: "COUNTRY CODE",
            selector: row => [row.country_code],
            sortable: true,
            cell: row => <span className="text-muted fs-15 fw-semibold">{row.country_code}</span>
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
        },
        {
            name: "ACTION",
            selector: row => [row.action],
            sortable: true,
            cell: row => <span className="">
                <OverlayTrigger placement="top" overlay={<Tooltip >View</Tooltip>}>
                    <Link to="#" onClick={() => handleView(row)} className="btn btn-info btn-sm rounded-11 me-2"> <i>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> </i>
                    </Link>
                </OverlayTrigger>
            </span>
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

export default DeletedList    
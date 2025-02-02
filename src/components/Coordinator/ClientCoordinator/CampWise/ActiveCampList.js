import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Link } from 'react-router-dom';
import { statusCheck } from '../../../../constants/functions';

function ActiveCampList(props) {
    const { data, handleCampWiseAssignView } = props
    const columns = [
        {
            name: "	NAME",
            selector: row => [row.coordinator.full_name],
            sortable: true,
            cell: row => <div className="d-flex">
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
            cell: row => <span className={`text-${row.status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(row.status.toString())}</span>
        },
        {
            name: "ACTION",
            selector: row => [row.action],
            sortable: true,
            cell: row => <span className="">
                <OverlayTrigger placement="top" overlay={<Tooltip >View</Tooltip>}>
                    <Link to="#" onClick={() => handleCampWiseAssignView(row)} className="btn btn-info btn-sm rounded-11 my-1 me-2"> <i> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> </i> </Link>
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

export default ActiveCampList
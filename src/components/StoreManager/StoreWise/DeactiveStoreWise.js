import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { statusCheck } from '../../../constants/functions';
import { Link } from 'react-router-dom';

function DeactiveStoreWise(props) {
    const { data, handleAssignView } = props
    const columns = [
        {
            name: "CAMP NAME",
            selector: row => [row.camp_name],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row.camp_name}</h6>
                </div>
            </div>
        },
        {
            name: "CAMP ADD",
            selector: row => [row.camp_address],
            sortable: true,
            cell: row => <span className="text-muted mb-0 fs-14 fw-semibold">{row.camp_address ? row.camp_address : '-'}</span>
        },
        {
            name: "CAMP UUID",
            selector: row => [row.camp_uuid],
            sortable: true,
            cell: row => <span className="text-muted mb-0 fs-14 fw-semibold">{row.camp_uuid ? row.camp_uuid : '-'}</span>
        },
        {
            name: "CAMP CITY",
            selector: row => [row.camp_city],
            sortable: true,
            cell: row => <span className="text-muted mb-0 fs-14 fw-semibold">{row.camp_city}</span>
        },
        {
            name: "STATUS",
            selector: row => [row.status],
            sortable: true,
            cell: row => <span className={`text-${row.status === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(row.status)}</span>
        },
        {
            name: "ACTION",
            selector: row => [row.action],
            sortable: true,
            cell: row => <span className="">
                <OverlayTrigger placement="top" overlay={<Tooltip >View</Tooltip>}>
                    <Link to="#" onClick={() => handleAssignView(row)} className="btn btn-info btn-sm rounded-11 my-1 me-2"> <i> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> </i> </Link>
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

export default DeactiveStoreWise
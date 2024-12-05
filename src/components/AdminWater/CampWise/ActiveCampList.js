import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Link } from 'react-router-dom';
import { statusCheck } from '../../../constants/functions';

function ActiveCampList(props) {
    const { data, _USER, handleAssignView } = props
    const columns =
        [
            {
                name: "CAMP	NAME",
                selector: row => [row.camp_name],
                sortable: true,
                cell: row => <div className="d-flex">
                    <div className="d-block">
                        <h6 className="mb-0 fs-14 fw-semibold">{row.camp_name}</h6>
                    </div>
                </div>
            },
            {
                name: "PACKAGE NAME",
                selector: row => [row.package_name],
                sortable: true,
                cell: row => <div className="d-flex">
                    <div className="d-block">
                        <h6 className="mb-0 fs-14 fw-semibold">{row.package_name}</h6>
                    </div>
                </div>
            },
            {
                name: "QUANTITY",
                selector: row => [row.quantity],
                sortable: true,
                cell: row => <span className="text-muted mb-0 fs-14 fw-semibold">{row.quantity}</span>
            },
            {
                name: `PRICE (${_USER?.user_data?.currency_code ? _USER?.user_data?.currency_code : _USER?.currency_code})`,
                selector: row => [row.amount],
                sortable: true,
                cell: row => <span className="text-muted mb-0 fs-14 fw-semibold">{row.amount}</span>
            },
            {
                name: "CREATED AT",
                selector: row => [row.created_at],
                sortable: true,
                cell: row => <span className="text-muted mb-0 fs-14 fw-semibold">{row.created_at}</span>
            }
            ,
            {
                name: "STATUS",
                selector: row => [row.package_status],
                sortable: true,
                cell: row => <span className={`text-${row.package_status === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(row.package_status)}</span>
            },
            {
                name: "ACTION",
                selector: row => [row.action],
                sortable: true,
                cell: row =>
                    <span>
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
                highlightOnHover
            />
        </DataTableExtensions>
    )
}

export default ActiveCampList;
import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DeletedList({ data, reActiveDeleted, handleView, _CURRENCY }) {

    const columns = [
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
            name: "PACKAGE CODE",
            selector: row => [row.package_code],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="d-block">
                    <h6 className="text-muted mb-0 fs-14 fw-semibold">{row.package_code}</h6>
                </div>
            </div>
        },
        {
            name: "SPEED",
            selector: row => [row.package_speed],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="d-block">
                    <h6 className="text-muted mb-0 fs-14 fw-semibold">{row.package_speed}</h6>
                </div>
            </div>
        },
        {
            name: `PRICE (${_CURRENCY}) `,
            selector: row => [row.package_price],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="d-block">
                    <h6 className="text-muted mb-0 fs-14 fw-semibold">{row.package_price}</h6>
                </div>
            </div>
        },

        {
            name: "STATUS",
            selector: row => [row.package_status],
            sortable: true,
            cell: row => (
                <label className="custom-switch">
                    <input type="checkbox" className="custom-switch-input" id="package_status"
                        checked={Number(row.package_status) === 1 ? true : false}
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

export default DeletedList    
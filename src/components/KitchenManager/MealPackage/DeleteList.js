import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DeletedList({ data, reActiveDeleted, handleView }) {
    const columns = [
        {
            name: "PACKAGE NAME",
            selector: row => [row.package_name],
            sortable: true,
            cell: row => <h6 className="mb-0 fs-14 fw-semibold">{row.package_name}</h6>
        },
        {
            name: "VALIDITY",
            selector: row => [row.package_validity],
            sortable: true,
            cell: row => <h6 className="text-muted mb-0 fs-14 fw-semibold">{row.package_validity} Days</h6>
        },
        {
            name: "TYPE",
            selector: row => [row.package_type],
            sortable: true,
            cell: row => <span className={`text-${row.package_type === "Veg" ? "green" : "red"} fs-15 fw-semibold`}>{row.package_type}</span>
        },
        {
            name: "PRICE",
            selector: row => [row.package_cost],
            sortable: true,
            cell: row => <h6 className="text-muted mb-0 fs-14 fw-semibold">{row.package_cost}</h6>
        },
        {
            name: "COMMISSION",
            selector: row => [row.commission_pct],
            sortable: true,
            cell: row => <h6 className="text-muted mb-0 fs-14 fw-semibold">{row.commission_pct}%</h6>
        },
        {
            name: "FINAL COST",
            selector: row => [row.final_package_cost],
            sortable: true,
            cell: row => <h6 className="text-muted mb-0 fs-14 fw-semibold">{row.final_package_cost}</h6>
        },
        {
            name: "TOTAL COST",
            selector: row => [row.total_package_cost],
            sortable: true,
            cell: row => <h6 className="text-muted mb-0 fs-14 fw-semibold">{row.total_package_cost}</h6>
        },
        {
            name: "STATUS",
            selector: row => [row.package_status],
            sortable: true,
            cell: row => {
                return (<label className="custom-switch">
                    <input type="checkbox" className="custom-switch-input" id="package_status"
                        checked={Number(row.package_status) === 1 ? true : false}
                        onChange={(e) => reActiveDeleted(row, e.target.checked)}
                    />
                    <span className="custom-switch-indicator"></span>
                </label>)
            }
        },
        {
            name: "ACTION",
            selector: row => [row.action],
            sortable: true,
            cell: row => <span className="">
                <OverlayTrigger placement="top" overlay={<Tooltip >View</Tooltip>}>
                    <Link to="#" onClick={() => handleView(row)} className="btn btn-info btn-sm rounded-11 me-2"> <i> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap={"round"} strokeLinejoin={"round"} className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> </i> </Link>
                </OverlayTrigger>
            </span>
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

export default DeletedList    
import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from 'react-router-dom';

function ActiveList({ handleEditClick, data, handleDelete, handleView, handleStatus, handleCombo }) {
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
                if (row.package_status === "0") {
                    return (<span className={`text-red fs-15 fw-semibold`}>Deleted</span>)
                }
                else {
                    return (<label className="custom-switch">
                        <input type="checkbox" className="custom-switch-input" id="package_status"
                            checked={Number(row.package_status) === 1 ? true : false}
                            onChange={(e) => handleStatus(row, e.target.checked)}
                        />
                        <span className="custom-switch-indicator"></span>
                    </label>)
                }

            }

        },
        {
            name: "ACTION",
            selector: row => [row.action],
            sortable: true,
            cell: row => <span className="">
                <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
                    <Link onClick={() => handleEditClick(row)} to="#" className="btn btn-primary btn-sm rounded-11 my-1 me-2" ><i><svg className="table-edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" /></svg></i></Link>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
                    <Link to="#" onClick={() => handleDelete(row)} className="btn btn-danger btn-sm rounded-11 my-1 me-2"><i><svg className="table-delete" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" /></svg></i></Link>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip >View</Tooltip>}>
                    <Link to="#" onClick={() => handleView(row)} className="btn btn-info btn-sm rounded-11 my-1 me-2"> <i> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap={"round"} strokeLinejoin={"round"} className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> </i> </Link>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip > Add </Tooltip>}>
                    <Link to="#" onClick={() => handleCombo(row)} className="btn btn-dark btn-sm rounded-11  my-1 me-2"> <i> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap={"round"} strokeLinejoin={"round"} className="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg> </i> </Link>
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
                className="camps"
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
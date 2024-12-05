import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { toggleCheck } from '../../constants/functions';

function ActiveList({ handleEditClick, data, handleStatus, handleDelete, handleAssignStore, handleView }) {
    const columns = [
        {
            name: "	NAME",
            selector: row => [row.full_name],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row.full_name}</h6>
                    <span className="fs-12 text-muted">{row.email}</span>
                </div>
            </div>
        },
        {
            name: "CREATED AT",
            selector: row => [row.created_at],
            sortable: true,
            cell: row => <span className="text-muted fs-15 fw-semibold">{row.created_at}</span>
        },
        {
            name: "Mess Management",
            selector: row => [row.is_mess_management],
            sortable: true,
            cell: row => <span className={`text-${row.is_mess_management === "1" ? "green" : "red"} fs-15 fw-semibold`}>{toggleCheck(row.is_mess_management)}</span>
        },
        {
            name: "Water Management",
            selector: row => [row.is_water_management],
            sortable: true,
            cell: row => <span className={`text-${row.is_water_management === "1" ? "green" : "red"} fs-15 fw-semibold`}>{toggleCheck(row.is_water_management)}</span>
        },
        {
            name: "STATUS",
            selector: row => [row.status],
            sortable: true,
            cell: row => (
                <label className="custom-switch">
                    <input type="checkbox" className="custom-switch-input" id="status"
                        checked={Number(row.status) === 1 ? true : false}
                        onChange={(e) => handleStatus(row, e.target.checked)}
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
                <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
                    <Link onClick={() => handleEditClick(row)} to="#" className="btn btn-primary btn-sm rounded-11 my-1 me-2" ><i><svg className="table-edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" /></svg></i></Link>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip >View</Tooltip>}>
                    <Link to="#" onClick={() => handleView(row)} className="btn btn-info btn-sm rounded-11 me-2"> <i> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> </i> </Link>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
                    <Link to="#" onClick={() => handleDelete(row)} className="btn btn-danger btn-sm rounded-11 my-1 me-2"><i><svg className="table-delete" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" /></svg></i></Link>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip >Assign To Camps</Tooltip>}>
                    <Link to="#" onClick={() => handleAssignStore(row)} className="btn btn-dark btn-sm rounded-11 my-1 me-2"> <i> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> </i> </Link>
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

export default ActiveList    
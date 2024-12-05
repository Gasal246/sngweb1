import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {IsAccess, statusCheck, toggleCheck} from '../../../constants/functions';

function DeletedList({ data, reActiveDeleted, handleView }) {

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
            selector: row => [row.createdAt],
            sortable: true,
            cell: row => <span className="text-muted fs-15 fw-semibold">{row.createdAt}</span>
        },
        {
            name: "Mess Management",
            selector: row => [row.is_mess_management],
            sortable: true,
            cell: row => <span className={`text-${row.is_mess_management ? (row.is_mess_management.toString() === "1" ? "green" : "red") : "red"} fs-15 fw-semibold`}>{toggleCheck(row.is_mess_management ? (row?.is_mess_management.toString()) : '0')}</span>
        },
        {
            name: "Internet Management",
            selector: row => [row.is_internet_management],
            sortable: true,
            cell: row => <span className={`text-${row.is_internet_management ? (row.is_internet_management.toString() === "1" ? "green" : "red") : "red"} fs-15 fw-semibold`}>{toggleCheck(row.is_internet_management ? (row?.is_internet_management.toString()) : '0')}</span>
        },
        {
            name: "Water Management",
            selector: row => [row.is_water_management],
            sortable: true,
            cell: row => <span className={`text-${row.is_water_management ? (row.is_water_management.toString() === "1" ? "green" : "red") : "red"} fs-15 fw-semibold`}>{toggleCheck(row.is_water_management ? (row?.is_water_management.toString()) : '0')}</span>
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
import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from 'react-router-dom';

import { statusCheck } from '../../constants/functions'
function CampInternetPackageList({ data, handleView }) {
    const columns = [
        {
            name: "PACKAGE NAME",
            selector: row => [row?.package_name],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row?.package_name ? row?.package_name : '-'}</h6>
                </div>
            </div>
        },
        {
            name: "PACKAGE CODE",
            selector: row => [row?.package_code],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row?.package_code? row?.package_code : '-'}</h6>
                </div>
            </div>
        },
        {
            name: "PACKAGE AMOUNT",
            selector: row => [row?.package_price],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row?.package_price? row?.package_price : '-'}</h6>
                </div>
            </div>
        },
        {
            name: "PACKAGE STATUS",
            selector: row => [row?.package_status],
            sortable: true,
            cell: row => (
                <label className="custom-switch">
                    <span className={`text-${row?.package_status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(row?.package_status.toString())}</span>
                </label>
            )
        },
        {
            name: "STATUS",
            selector: row => [row?.status],
            sortable: true,
            cell: row => (
                <label className="custom-switch">
                    <span className={`text-${row?.status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(row?.status.toString())}</span>
                </label>
            )
        },
        {
            name: "ACTION",
            selector: row => [row?.camp?.camp_city],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <OverlayTrigger placement="top" overlay={<Tooltip >View</Tooltip>}>
                        <Link to="#" onClick={() => handleView(row)} className="btn btn-info btn-sm rounded-11 me-2"> <i> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> </i> </Link>
                    </OverlayTrigger>
                </div>
            </div>
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

export default CampInternetPackageList;
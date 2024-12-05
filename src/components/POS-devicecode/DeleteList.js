import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { codeCheck, getKeyName } from '../../constants/functions';

function DeletedList({ _USER, data, reActiveDeleted, handleView }) {

    const columns = [
        {
            name: "Admin Name",
            selector: row => [row.client_id],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">
                        {getKeyName(_USER.clientAdministrator, row.client_id)[0].label}
                    </h6>
                </div>
            </div>
        },
        {
            name: "Device Name",
            selector: row => [row.device_name],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">q
                    <h6 className="mb-0 fs-14 fw-semibold">{row.device_name ? row.device_name : '-'}</h6>
                </div>
            </div>
        },
        {
            name: "Device Model",
            selector: row => [row.device_model],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row.device_model ? row.device_model : '-'}</h6>
                </div>
            </div>
        },
        {
            name: "Device Mac Address",
            selector: row => [row.device_mac_address],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row.device_mac_address ? row.device_mac_address : '-'}</h6>
                </div>
            </div>
        },
        {
            name: "Pos Device Code",
            selector: row => [row.pos_device_code],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row.pos_device_code ? row.pos_device_code : '-'}</h6>
                </div>
            </div>
        },
        {
            name: "Is Used",
            selector: row => [row.is_used],
            sortable: true,
            cell: row => <span className={`text-${row.is_used === "0" ? "green" : "red"} fs-15 fw-semibold`}>{codeCheck(row.is_used)}</span>
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
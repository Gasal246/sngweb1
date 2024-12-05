import React from 'react'
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { statusCheck } from '../../../constants/functions';

function DeactiveCampWise(props) {
    const { data } = props
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
            name: "CREATED AT",
            selector: row => [row.created_at],
            sortable: true,
            cell: row => <span className="text-muted mb-0 fs-14 fw-semibold">{row.created_at}</span>
        },
        {
            name: "STATUS",
            selector: row => [row.status],
            sortable: true,
            cell: row => <span className={`text-${row.status === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(row.status)}</span>
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

export default DeactiveCampWise
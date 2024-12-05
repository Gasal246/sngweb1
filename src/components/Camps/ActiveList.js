import React from 'react'
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from 'react-router-dom';

function ActiveList({ handleEditClick, data, handleView, handleStatus, handleDelete, handleAssignCoordinator, handleAssignAccountant, handleAssignPOS, handleAssignInvestor }) {
  const columns = [
    {
      name: "CAMP	NAME",
      selector: row => [row.camp_name],
      sortable: true,
      cell: row =>
        <div className="d-flex">
          <div className="ms-2 mt-0 mt-sm-2 d-block">
            <h6 className="mb-0 fs-14 fw-semibold">{row.camp_name}</h6>
          </div>
        </div>
    },
    {
      name: "ADDRESS",
      selector: row => [row.camp_address],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.camp_address}</span>
    },
    {
      name: "CITY",
      selector: row => [row.camp_city],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.camp_city}</span>
    },
    {
      name: "CREATED AT",
      selector: row => [row.createdAt],
      sortable: true,
      cell: row => <span className="text-muted fs-15 fw-semibold">{row.createdAt}</span>
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
      cell: row =>
        <span className="">
          <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
            <Link onClick={() => handleEditClick(row)} to="#" className="btn btn-primary btn-sm rounded-11 me-2 my-1" ><i>
              <svg className="table-edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" /></svg></i>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip >View Camp</Tooltip>}>
            <Link to="#" onClick={() => handleView(row)} className="btn btn-info btn-sm rounded-11 me-2 my-1"> <i>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> </i>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
            <Link to="#" onClick={() => handleDelete(row)} className="btn btn-danger btn-sm rounded-11 me-2 my-1"><i><svg className="table-delete" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" /></svg></i></Link>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip >Assign Coordinator</Tooltip>}>
            <Link to="#" onClick={() => handleAssignCoordinator(row)} className="btn btn-dark btn-sm rounded-11 me-2 my-1"><i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></i></Link>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip >Assign Accountant</Tooltip>}>
            <Link to="#" onClick={() => handleAssignAccountant(row)} className="btn btn-warning btn-sm rounded-11 me-2 my-1"><i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-database"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg></i></Link>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip >Assign Investor</Tooltip>}>
            <Link to="#" onClick={() => handleAssignInvestor(row)} className="btn btn-secondary btn-sm rounded-11 me-2 my-1"><i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-stop-circle"><circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6"></rect></svg></i></Link>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip >Assign POS</Tooltip>}>
            <Link to="#" onClick={() => handleAssignPOS(row)} className="btn btn-success btn-sm rounded-11 me-2 my-1"><i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-cpu"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg></i></Link>
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

export default ActiveList    

import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { statusCheck } from '../../constants/functions'

function ViewModal(props) {
    const { show, handleCloseModal, data, _USER } = props
    return (
        <Modal size="xl" show={show}>
            <Modal.Header>
                <div className="modal-title h4 mb-0">Package Information</div>
                <Button onClick={handleCloseModal} className="btn-close" variant="">
                    <i className="fa fa-times fs-6"></i>
                </Button>
            </Modal.Header>
            <Modal.Body className="p-5">
                <div className="mb-6 productdesc">
                    <ul className="list-unstyled mb-0">
                        <li className="row">
                            <div className="text-muted  col-xl-3 col-lg-4 col-sm-3">ID</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.id ? data?.id : "-"}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Name</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.package_name ? data?.package_name : '-'}</div>
                        </li>
                        {data?.camp_name && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Camp Name</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.camp_name ? data?.camp_name : '-'}</div>
                        </li>}
                        {data?.camp_city && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Camp City</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.camp_city ? data?.camp_city : '-'}</div>
                        </li>}
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Quantity</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.quantity ? data?.quantity : '-'}</div>
                        </li>

                        {data?.amount && <li className="row">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Amount ({_USER?.currency_code})</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{_USER?.currency_code} {data?.amount ? data?.amount : '-'}</div>
                        </li>}

                        {data?.created_by && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Created By</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.created_by > 0 ? "Super Admin" : '-'}</div>
                        </li>}

                        {data?.package_status && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Status</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.package_status === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.package_status)}</span>
                            </div>
                        </li>
                        }

                        {data?.created_at && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Created At</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.created_at}</div>
                        </li>}

                        {data?.updated_at && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Updated At</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.updated_at}</div>
                        </li>}

                        {data?.deleted_at && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">deleted At</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.deleted_at}</div>
                        </li>}


                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ViewModal
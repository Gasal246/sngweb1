import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { statusCheck } from '../../constants/functions'

function ViewModal(props) {
    const { show, handleCloseModal, data } = props
    return (
        <Modal size="xl" show={show}>
            <Modal.Header>
                <div className="modal-title h4 mb-0">Investor Information</div>
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
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Full Name</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.full_name ? data?.full_name : '-'}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Email</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.email ? data?.email : '-'}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Type</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.type ? data?.type : '-'}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">commission_pct</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.commission_pct ? data?.commission_pct : '-'}%</div>
                        </li>

                        {data?.status && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3"> Status</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.status.toString())}</span>
                            </div>
                        </li>
                        }

                        {data?.createdAt && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Created At</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.createdAt}</div>
                        </li>}

                        {data?.updatedAt && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Updated At</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.updatedAt}</div>
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
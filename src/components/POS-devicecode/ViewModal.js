import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { codeCheck, statusCheck } from '../../constants/functions'

function ViewModal(props) {
    const { show, handleCloseModal, data } = props
    return (
        <Modal size="xl" show={show}>
            <Modal.Header>
                <div className="modal-title h4 mb-0">POS Device Code Information</div>
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
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Pos Device Code</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.pos_device_code ? data?.pos_device_code : '-'}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Used</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.is_used.toString() === "0" ? "green" : "red"} fs-15 fw-semibold`}>{codeCheck(data?.is_used.toString())}</span>
                            </div>
                        </li>
                        {data?.status &&
                            <li className="row p-b-20">
                                <div className="text-muted col-xl-3 col-lg-4 col-sm-3"> Status</div>
                                <div className="col-xl-3 col-lg-8 col-sm-3">
                                    <span className={`text-${data?.status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.status.toString())}</span>
                                </div>
                            </li>}
                        {data?.createdAt &&
                            <li className="row p-b-20">
                                <div className="text-muted col-xl-3 col-lg-4 col-sm-3"> Created At</div>
                                <div className="col-xl-3 col-lg-8 col-sm-3">
                                    {data?.createdAt}
                                </div>
                            </li>}
                        {data?.updatedAt &&
                            <li className="row p-b-20">
                                <div className="text-muted col-xl-3 col-lg-4 col-sm-3"> Updated At</div>
                                <div className="col-xl-3 col-lg-8 col-sm-3">
                                    {data?.updatedAt}
                                </div>
                            </li>}
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ViewModal
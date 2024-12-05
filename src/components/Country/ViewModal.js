import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { statusCheck } from '../../constants/functions'

function ViewModal(props) {
    const { show, handleCloseModal, data } = props
    return (
        <Modal size="xl" show={show}>
            <Modal.Header>
                <div className="modal-title h4 mb-0">Country Information</div>
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
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Name</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.name ? data?.name : '-'}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Short Name</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.short_name ? data?.short_name : '-'}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Country Code</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.country_code ? data?.country_code : '-'}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Currency Code</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.currency_code ? data?.currency_code : '-'}</div>
                        </li>

                        {data?.status && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3"> Status</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.status.toString())}</span>
                            </div>
                        </li>
                        }

                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ViewModal
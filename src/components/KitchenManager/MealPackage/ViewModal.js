import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { statusCheck } from '../../../constants/functions'

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
            <Modal.Body clasName="p-5">
                <div className="mb-6 productdesc">
                    <ul className="list-unstyled mb-0">
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Id</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.id}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Name</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.package_name}</div>
                        </li>
                        <li className="row">
                            <div className="text-muted  col-xl-3 col-lg-4 col-sm-3">Package Validity</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.package_validity}</div>
                        </li>
                        <li className="row">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Type</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.package_type}</div>
                        </li>
                        <li className="row">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Category</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3 package_category">
                                {data?.category.map((item) => {
                                    return <p className="d-inline-block me-1">{item.category_name}<span>, </span></p>
                                })}
                            </div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Cost ({_USER?.user_data?.currency_code ? _USER?.user_data?.currency_code : _USER?.currency_code})</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.package_cost}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Commission (%)</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.commission_pct}%</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Final Package Cost</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.final_package_cost}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Status</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.package_status === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.package_status)}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ViewModal
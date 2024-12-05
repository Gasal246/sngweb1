import React from 'react'
import {Button, Modal} from 'react-bootstrap'
import {getKeyName, IsAccess, statusCheck} from '../../constants/functions'

function ViewModal(props) {
    const {show, handleCloseModal, data} = props
    return (
        <Modal size="xl" show={show}>
            <Modal.Header>
                <div className="modal-title h4 mb-0">Camps Internet Package Information</div>
                <Button onClick={handleCloseModal} className="btn-close" variant="">
                    <i className="fa fa-times fs-6"></i>
                </Button>
            </Modal.Header>
            <Modal.Body className="p-5">
                {data && (
                    <div>
                        <div className="mb-6 productdesc">

                            <ul className="list-unstyled mb-2">
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Code</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.package_code ? data?.package_code : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Name</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.package_name ? data?.package_name : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Price</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.package_price ? data?.package_price : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3"> Status</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">
                                        <span
                                            className={`text-${data?.status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.status.toString())}</span>
                                    </div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Status</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">
                                        <span
                                            className={`text-${data?.package_status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.package_status.toString())}</span>
                                    </div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Camp Name</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.camp_name ? data?.camp_name : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Camp Address</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.camp_address ? data?.camp_address : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Camp City</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.camp_city ? data?.camp_city : "-"}</div>
                                </li>
                            </ul>
                            <h4 className="mt-5">Original Package Details:</h4>
                            <ul className="list-unstyled mb-2">
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Original Package Name</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.original_package_name ? data?.original_package_name : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Original Package Code</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.original_package_code ? data?.original_package_code : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Original Type</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.original_type ? data?.original_type : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3"> Original Package Status</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">
                                        <span
                                            className={`text-${data?.original_package_status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.original_package_status.toString())}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default ViewModal
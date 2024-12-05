import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { statusCheck } from '../../../constants/functions'

function ViewModal(props) {
    const { show, handleCloseModal, data, list } = props
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

                        {data?.package_name && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Name</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.package_name ? data?.package_name : '-'}</div>
                        </li>}

                        {data?.package_code && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Code</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.package_code ? data?.package_code : '-'}</div>
                        </li>}

                        {data?.package_speed && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Speed</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.package_speed ? data?.package_speed : '-'}</div>
                        </li>}

                        {data?.package_status && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Status</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.package_status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.package_status.toString())}</span>
                            </div>
                        </li>}

                        {list === "assignmodal"
                            && <>
                                {data?.full_name && <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">FullName</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.full_name ? data?.full_name : '-'}</div>
                                </li>}

                                {data?.email && <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Email</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.email ? data?.email : '-'}</div>
                                </li>}

                                {data?.business_name && <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Business Name</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.business_name ? data?.business_name : '-'}</div>
                                </li>}

                                {data?.business_address && <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Business Address</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.business_address ? data?.business_address : '-'}</div>
                                </li>}

                                {data?.phone && <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Phone</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.phone ? data?.phone : '-'}</div>
                                </li>}

                                {data?.city && <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">City</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.city ? data?.city : '-'}</div>
                                </li>}

                                {data?.country && <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">country</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.country ? data?.country : '-'}</div>
                                </li>}

                                {data?.original_package_code && <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Original Package Code</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.original_package_code ? data?.original_package_code : '-'}</div>
                                </li>}

                                {data?.original_package_speed && <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Original Package Speed</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.original_package_speed ? data?.original_package_speed : '-'}</div>
                                </li>}
                                {data?.original_package_name && <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Original Package Name</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.original_package_name ? data?.original_package_name : '-'}</div>
                                </li>}

                                {data?.original_package_validity && <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Original Package validity</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.original_package_validity ? data?.original_package_validity : '-'}</div>
                                </li>}

                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Attached UUID</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.attached_uuid ? data?.attached_uuid : '-'}</div>
                                </li>

                                {data?.original_package_status && <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Status</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">
                                        <span className={`text-${data?.original_package_status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.original_package_status.toString())}</span>
                                    </div>
                                </li>}
                            </>
                        }
                        {
                            data?.volume &&
                            <li className="row p-b-20">
                                <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Volume</div>
                                <div className="col-xl-3 col-lg-8 col-sm-3">{data?.volume}</div>
                            </li>
                        }
                        {data?.duration && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Duration</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.duration}</div>
                        </li>}

                        {data?.deleted_at && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Deleted At</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.deleted_at}</div>
                        </li>}
                        {data?.upload_bandwidth && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Upload Bandwidth</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.upload_bandwidth}</div>
                        </li>}
                        {data?.download_bandwidth && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Download Bandwidth</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.download_bandwidth}</div>
                        </li>}
                        {data?.createdAt && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Created At</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.createdAt}</div>
                        </li>}
                        {data?.updatedAt && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Updated At</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.updatedAt}</div>
                        </li>}
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ViewModal
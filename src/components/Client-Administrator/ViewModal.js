import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { IsAccess, statusCheck } from '../../constants/functions'

function ViewModal(props) {
    const { show, handleCloseModal, data } = props
    return (
        <Modal size="xl" show={show}>
            <Modal.Header>
                <div className="modal-title h4 mb-0">Client Information</div>
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

                        {data?.business_name && <li className="row">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Business Name</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.business_name ? data?.business_name : '-'}</div>
                        </li>
                        }

                        {data?.phone && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Phone</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.phone ? data?.phone : '-'}</div>
                        </li>}

                        {data?.business_address && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Business Address</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.business_address ? data?.business_address : '-'}</div>
                        </li>}

                        {data?.city && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">City</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.city ? data?.city : '-'}</div>
                        </li>}

                        {data?.country && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Country</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.country ? data?.country : '-'}</div>
                        </li>}

                        {data?.currency_code && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Currency Code</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.currency_code ? data?.currency_code : '-'}</div>
                        </li>}

                        {data?.status && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3"> Status</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.status.toString())}</span>
                            </div>
                        </li>}

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

                        {data?.no_user && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">No Of User</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.no_user ? data?.no_user : '-'}</div>
                        </li>
                        }

                        {data?.no_camp && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">No Of Camp</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.no_camp ? data?.no_camp : '-'}</div>
                        </li>}

                        {data?.no_cordinator && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">No Of Cordinator</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.no_cordinator ? data?.no_cordinator : '-'}</div>
                        </li>}

                        {data?.no_pos && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">No Of Pos</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.no_pos ? data?.no_pos : '-'}</div>
                        </li>}

                        {data?.no_kiosk && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">No Of Kiosk</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.no_kiosk ? data?.no_kiosk : '-'}</div>
                        </li>}

                        {data?.no_accountant && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">No Of Accountant</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{ data?.no_accountant ? data?.no_accountant : '-' }</div>
                        </li>}

                       <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Access Of Mess Management</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.is_mess_management === 1 ? "green" : "red"} fs-15 fw-semibold`}>{IsAccess(data?.is_mess_management.toString())} </span>
                            </div>
                        </li>
                    
                       <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Access Of Water Management</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.is_water_management === 1 ? "green" : "red"} fs-15 fw-semibold`}>{IsAccess(data?.is_water_management.toString())} </span>
                            </div>
                        </li>

                       <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Access Of Internet Management</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.is_internet_management === 1 ? "green" : "red"} fs-15 fw-semibold`}>{IsAccess(data?.is_internet_management.toString())} </span>
                            </div>
                        </li>

                         <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Access Of Investor Management</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.is_investor_management === 1 ? "green" : "red"} fs-15 fw-semibold`}>{IsAccess(data?.is_investor_management.toString())} </span>
                            </div>
                        </li>

                        {data?.subscription_start && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Subscription Start</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.subscription_start ? data?.subscription_start : '-'}</div>
                        </li>}

                        {data?.subscription_end && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Subscription End</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.subscription_end ? data?.subscription_end : '-'}</div>
                        </li>}

                        {data?.grace_period_days && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Grace Period Days</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.grace_period_days ? data?.grace_period_days : '-'}</div>
                        </li>}

                        {data?.payment_type && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Payment Type</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.payment_type ? data?.payment_type : '-'}</div>
                        </li>}

                        {data?.package_rate && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Rate</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.currency_code}{data?.package_rate ? data?.package_rate : '-'}</div>
                        </li>}


                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ViewModal
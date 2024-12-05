import React from 'react'
import {Button, Modal} from 'react-bootstrap'
import {getKeyName, IsAccess, statusCheck} from '../../constants/functions'

function CampWiseModal(props) {
    const {show, handleCloseModal, data} = props

    return (
        <Modal size="xl" show={show}>
            <Modal.Header>
                <div className="modal-title h4 mb-0">Camps Wise Information</div>
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
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Order Number</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.order_number ? data?.order_number : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Name</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.package_name ? data?.package_name : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Amount</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.package_amount ? data?.package_amount : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Start Date</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.package_start_date ? data?.package_start_date : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Expiry Date</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.package_expiry_date ? data?.package_expiry_date : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Purchase Date</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.purchase_date ? data?.purchase_date : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Type</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.package_type ? data?.package_type : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Payable Amount</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.payable_amount ? data?.payable_amount : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Sub Total</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.sub_total ? data?.sub_total : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Tax Amount</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.tax_amount ? data?.tax_amount : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Order Status</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">
                                        <span
                                            className={`text-${data?.order_status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.order_status.toString())}</span>
                                    </div>
                                </li>

                            </ul>

                            <h4 className="mt-5">Camp Details:</h4>
                            <ul className="list-unstyled mb-2">
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Camp Name</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.order_from_camp_detail?.camp_name ? data?.order_from_camp_detail?.camp_name : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Camp Address</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.order_from_camp_detail?.camp_address ? data?.order_from_camp_detail?.camp_address : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Camp City</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.order_from_camp_detail?.camp_city ? data?.order_from_camp_detail?.camp_city : "-"}</div>
                                </li>
                            </ul>
                            <h4 className="mt-5">User Details:</h4>
                            <ul className="list-unstyled mb-2">
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">User Name</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.user?.name ? data?.user?.name : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">User Phone Number</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.user?.phone ? data?.user?.phone : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">User UUID</div>
                                    <div
                                        className="col-xl-3 col-lg-8 col-sm-3">{data?.user?.uuid ? data?.user?.uuid : "-"}</div>
                                </li>

                            </ul>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default CampWiseModal
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { getKeyName, IsAccess, statusCheck } from '../../constants/functions'

function ViewModal(props) {
    const { show, handleCloseModal, data, coordinatorList, accountantList, posList, internetList, _CURRENCY } = props
  
    return (
        <Modal size="xl" show={show}>
            <Modal.Header>
                <div className="modal-title h4 mb-0">Camps Information</div>
                <Button onClick={handleCloseModal} className="btn-close" variant="">
                    <i className="fa fa-times fs-6"></i>
                </Button>
            </Modal.Header>
            <Modal.Body className="p-5">
                <div className="mb-6 productdesc">

                    <ul className="list-unstyled mb-2">
                        {data?.coordinator_id && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Coordinator Name</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.coordinator_id ? getKeyName(coordinatorList, data?.coordinator_id)[0].label : "-"}</div>
                        </li>}
                        {data?.accountant_id && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Accountant Name</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.accountant_id ? getKeyName(accountantList, data?.accountant_id)[0].label : "-"}</div>
                        </li>}

                        {data?.pos_id && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">POS Name</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.pos_id ? getKeyName(posList, data?.pos_id)[0].label : "-"}</div>
                        </li>}

                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Camp Name</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.camp_name ? data?.camp_name : "-"}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Camp Address</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.camp_address ? data?.camp_address : "-"}</div>
                        </li>
                        <li className="row">
                            <div className="text-muted  col-xl-3 col-lg-4 col-sm-3">Camp City</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.camp_city ? data?.camp_city : "-"}</div>
                        </li>
                        <li className="row">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">No Of Allowed User</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.no_of_allowed_user ? data?.no_of_allowed_user : "-"}</div>
                        </li>
                        <li className="row">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">No Of Allowed Kiosk</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.no_of_allowed_kiosk ? data?.no_of_allowed_kiosk : "-"}</div>
                        </li>
                        <li className="row">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">No Of Allowed Account</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.no_of_allowed_account ? data?.no_of_allowed_account : "-"}</div>
                        </li>
                        <li className="row">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">No Of Allowed Coordinators</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.no_of_allowed_coordinators ? data?.no_of_allowed_coordinators : "-"}</div>
                        </li>
                        <li className="row">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Access Of Package Meal</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.is_allowed_package_meal.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{IsAccess(data?.is_allowed_package_meal.toString())}</span>
                            </div>
                        </li>
                        <li className="row">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Access Of Package Water</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.is_allowed_package_water.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{IsAccess(data?.is_allowed_package_water.toString())}</span>
                            </div>
                        </li>
                        <li className="row">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Access Of Package Internet</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.is_allowed_package_internet.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{IsAccess(data?.is_allowed_package_internet.toString())}</span>
                            </div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Status</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.status.toString())}</span>
                            </div>
                        </li>
                    </ul>
                    <h4>Internet Package Details:</h4>
                    <ul className="list-unstyled mb-2">
                        {data?.package_id &&
                            <>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Internet Package Name</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.package_id ? getKeyName(internetList, data?.package_id)[0].label : "-"}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Id</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.id}</div>
                                </li>
                                <li className="row">
                                    <div className="text-muted  col-xl-3 col-lg-4 col-sm-3">Package Name</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.package_name}</div>
                                </li>
                                <li className="row">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Oackage Code</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.package_code}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Speed</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.package_speed}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Price ({_CURRENCY})</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">{data?.package_price}</div>
                                </li>
                                <li className="row p-b-20">
                                    <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Package Status</div>
                                    <div className="col-xl-3 col-lg-8 col-sm-3">
                                        <span className={`text-${data?.package_status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.package_status.toString())}</span>
                                    </div>
                                </li>
                            </>
                        }
                    </ul>
                    <h4>Router Details:</h4>
                    <ul className="list-unstyled mb-2">
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Router SSID</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.router_ssid ? data?.router_ssid : "-"}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Router Primary IP</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.router_primary_ip ? data?.router_primary_ip : "-"}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Router Secondary IP</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.router_secondary_ip ? data?.router_secondary_ip : "-"}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Router Mac Address</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.router_mac_address ? data?.router_mac_address : "-"}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Router Pass</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.router_pass ? data?.router_pass : "-"}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Router Secret</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.router_secret ? data?.router_secret : "-"}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Router Alias</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.router_alias ? data?.router_alias : "-"}</div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Router Hostname</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.router_hostname ? data?.router_hostname : "-"}</div>
                        </li>
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ViewModal
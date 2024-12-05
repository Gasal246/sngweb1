import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { getKeyName, statusCheck } from '../../../constants/functions'

function ViewModal(props) {
    const { show, handleCloseModal, data, _CURRENCY } = props
    const _USER = useSelector(e => e?.common);

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
                        {data?.camp_id && <li className="row">
                            <div className="text-muted  col-xl-3 col-lg-4 col-sm-3">Camp Name</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.camp_id ? getKeyName(_USER?.campsList, data?.camp_id)[0].label : "-"}</div>
                        </li>}
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
                        {data?.original_package_name && <li className="row">
                            <div className="text-muted  col-xl-3 col-lg-4 col-sm-3">Original Package Name</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.original_package_name}</div>
                        </li>}
                        {data?.original_package_code && <li className="row">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Original Package Code</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.original_package_code}</div>
                        </li>
                        }
                        {data?.original_package_speed && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Original Package Speed</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.original_package_speed}</div>
                        </li>
                        }
                        {data?.original_package_status && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Original Package Status</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.original_package_status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.original_package_status.toString())}</span>
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
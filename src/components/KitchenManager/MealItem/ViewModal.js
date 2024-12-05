import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { getKeyName, statusCheck } from '../../../constants/functions'

function ViewModal(props) {
    const { show, handleCloseModal, data, categoryList } = props
    return (
        <Modal size="xl" show={show}>
            <Modal.Header>
                <div className="modal-title h4 mb-0">Meal Item Information</div>
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
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Item Image</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <a href={data?.item_image_url} target="_blank" rel="noreferrer" >
                                    <img src={data?.item_image_url} style={{ width: "100px", height: "100px", objectFit: "cover" }} alt={data?.item_image} />
                                </a>
                            </div>
                        </li>
                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Item Name</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.item_name ? data?.item_name : '-'}</div>
                        </li>

                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Item Description</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.item_description ? data?.item_description : '-'}</div>
                        </li>

                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Item Category</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{getKeyName(categoryList, data?.meal_category_id)[0].label}</div>
                        </li>

                        <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Item Type</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3"><span className={`text-${data?.type === "Veg" ? "green" : "red"} fs-15 fw-semibold`}>{data?.type}</span></div>
                        </li>

                        {data?.category_status && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Status</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">
                                <span className={`text-${data?.category_status === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(data?.category_status)}</span>
                            </div>
                        </li>
                        }

                        {data?.created_at && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Created At</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.created_at}</div>
                        </li>}

                        {data?.updated_at && <li className="row p-b-20">
                            <div className="text-muted col-xl-3 col-lg-4 col-sm-3">Updated At</div>
                            <div className="col-xl-3 col-lg-8 col-sm-3">{data?.updated_at}</div>
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
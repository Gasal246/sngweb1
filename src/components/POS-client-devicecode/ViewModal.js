import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { IsAccess, statusCheck } from '../../constants/functions'

function ViewModal(props) {
    const { show, handleCloseModal, data } = props
    return (
        <Modal size="xl" show={show}>
            <Modal.Header>
                <div className="modal-title h4 mb-0">National type  Information</div>
                <Button onClick={handleCloseModal} className="btn-close" variant="">
                    <i className="fa fa-times fs-6"></i>
                </Button>
            </Modal.Header>
            <Modal.Body className="p-5">
                
            </Modal.Body>
        </Modal>
    )
}

export default ViewModal
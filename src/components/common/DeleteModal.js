import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function DeleteModal(props) {
    const { show, confirmDelete, handleCloseModal } = props
    return (
        <Modal size="md" show={show} centered>
            <Modal.Body className="p-5">
                <React.Fragment>
                    <div className="modal-body text-center p-4">
                        <i className="fe fe-alert-circle fs-65 text-danger lh-1 mb-4 d-inline-block"></i>
                        <h2 className=" mb-20">
                            Are you sure?
                        </h2>
                        <Button type="submit" variant="primary" className="me-2" onClick={confirmDelete}> Yes, delete it! </Button>
                        <Button type="button" variant="secondary" onClick={handleCloseModal}> Cancel </Button>
                    </div>
                </React.Fragment>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteModal;
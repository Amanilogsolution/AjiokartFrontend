import React from "react";
import { Modal } from "react-bootstrap"
function Popup({ ...props }) {

  const handleClose = () => props.showModalFunction();



  return (
    <>


      <Modal show={props.showModal} onHide={handleClose}
        dialogClassName={props.modalClass}>
        <Modal.Header closeButton>
          <Modal.Title>{props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>

      </Modal>
    </>
  );
}

export default Popup;
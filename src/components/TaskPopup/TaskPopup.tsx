import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import closeImg from "../../images/close.png";
import addImg from "../../images/add.png";
import "./taskPopup.scss";
const TaskPopup: React.FC=()=> {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
      contentClassName="taskPopup"
    >
      <Modal.Header className="ms-auto">
        <Button variant="none" onClick={handleClose}>
          <img src={closeImg} alt="closeImg" className="closeImg" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <Form.Group className="mb-3" controlId="formTaskName">
            <Form.Label className="form-task-header">
              Task Name <span>max 20 characters</span>
            </Form.Label>
            <Form.Control type="text" placeholder="Task Name" maxLength={20}/>
          </Form.Group>
          <Form.Group>
            <Form.Label className="form-task-header">Task Status</Form.Label>
            <div className="d-flex mb-3">
              <div className="d-flex">
                <Form.Check type="radio" name="taskStatus" label="Pending" />
              </div>
              <div className="d-flex mx-3">
                <Form.Check
                  type="radio"
                  name="taskStatus"
                  label="In progress"
                />
              </div>
              <div className="d-flex mx-3">
                <Form.Check type="radio" name="taskStatus" label="Done" />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label className="form-task-header">
              Task Description
            </Form.Label>
            <Form.Control as="textarea" style={{ resize: "none" }} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label className="form-task-header">Task Date</Form.Label>
            <Form.Control type="date" className="date-input" />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              variant="none"
              className="add-btn d-flex align-items-center"
            >
              <img src={addImg} alt="post-task" />
              Post Task
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
export default TaskPopup;

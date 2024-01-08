import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import closeImg from "../../images/close.png";
import addImg from "../../images/add.png";
import "./sectionPopup.scss";
const SectionPopup: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        aria-labelledby="contained-modal-title"
        onHide={handleClose}
        contentClassName="sectionPopup"
      >
        <Modal.Body className="d-flex align-items-center justify-content-between">
          <Form
            className="w-100"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Form.Group className="mb-3" controlId="formTaskName">
              <Form.Label className="form-task-header d-flex align-items-center justify-content-between">
                <div>
                  Section Name <span>max 15 characters</span>
                </div>
                <Button variant="none" onClick={handleClose}>
                  <img src={closeImg} alt="closeImg" className="closeImg" />
                </Button>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Section Name"
                maxLength={15}
              />
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
    </>
  );
};
export default SectionPopup;

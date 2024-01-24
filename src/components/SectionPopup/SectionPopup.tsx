import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import closeImg from "../../images/close.png";
import addImg from "../../images/add.png";
import "./sectionPopup.scss";
import PopupContext from "../../contextAPI/PopupContext";
import DataContext from "../../contextAPI/DataContext";
import { v4 as uuidv4 } from 'uuid';

const SectionPopup: React.FC = () => {
  const popupContext = useContext(PopupContext);
  const dataContext = useContext(DataContext);
  if (!popupContext || !dataContext) {
    // Handle the case when the context is not available
    console.error("Context is not available");
    return null; // or return some fallback content
  }
  const handleClose = () => {
    popupContext.setPopupInfo("none");
  };
  return (
    <>
      <Modal
        show={popupContext.popupInfo === "section" && true}
        aria-labelledby="contained-modal-title"
        onHide={handleClose}
        contentClassName="sectionPopup"
      >
        <Modal.Body className="d-flex align-items-center justify-content-between">
          <Form
            className="w-100"
            onSubmit={(event) => {
              event.preventDefault();
              if(dataContext.lastSection.trim()!==""){
                switch(dataContext.lastAction){
                  case "add":
                    dataContext.dispatch({
                      type: "ADD_SECTION",
                      payload: {
                        sectionId: uuidv4(),
                        sectionName: dataContext.lastSection,
                      },
                    });
                    break;
                    case "edit":
                      dataContext.dispatch({
                        type: "EDIT_SECTION",
                        payload: {
                          sectionId: dataContext.lastId,
                          sectionName: dataContext.lastSection,
                        },
                      });
                    break;
                }
                dataContext.dispatch({
                  type: "SET_LAST_ACTION",
                  payload: "none",
                });
                handleClose();
              }
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
                required
                autoComplete="off"
                type="text"
                placeholder="Section Name"
                value={dataContext.lastSection}
                onChange={(event) => {
                  dataContext.dispatch({
                    type: "SET_LAST_SECTION_NAME",
                    payload: event.currentTarget.value
                  });
                }}
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
                Post
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default SectionPopup;

import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import closeImg from "../../images/close.png";
import addImg from "../../images/add.png";
import "./taskPopup.scss";
import PopupContext from "../../contextAPI/PopupContext";
import DataContext from "../../contextAPI/DataContext";
const TaskPopup: React.FC = () => {
  // Access the context using useContext
  const popupContext = useContext(PopupContext);
  const dataContext = useContext(DataContext);
  if (!popupContext || !dataContext) {
    // Handle the case when the context is not available
    console.error("Context is not available");
    return null;
  }
  const handleClose = () => popupContext.setPopupInfo("none");
  return (
    <Modal
      show={popupContext.popupInfo === "task" && true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
      contentClassName="taskPopup"
      className="task-popup-wrap"
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
            const taskName = dataContext.lastTask.taskName;
            if (typeof taskName === "string" && taskName.trim() !== "") {
              switch (dataContext.lastAction) {
                case "add":
                  dataContext.dispatch({
                    type: "ADD_TASK",
                    payload: {
                      sectionId: dataContext.lastId,
                      task: {
                        ...dataContext.lastTask,
                        taskId: dataContext.lastTaskId,
                      },
                    },
                  });
                  break;
                case "edit":
                  dataContext.dispatch({
                    type: "EDIT_TASK",
                    payload: {
                      sectionId: dataContext.lastId,
                      taskId: dataContext.lastTaskId,
                      updatedTask: {
                        ...dataContext.lastTask,
                        taskId: dataContext.lastTaskId,
                      },
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
            <Form.Label className="form-task-header">
              Task Name <span>max 20 characters</span>
            </Form.Label>
            <Form.Control
              value={dataContext.lastTask.taskName ?? ""}
              onChange={(event) => {
                dataContext.dispatch({
                  type: "SET_LAST_TASK",
                  payload: {
                    ...dataContext.lastTask,
                    taskName: event.currentTarget.value,
                  },
                });
              }}
              required
              autoComplete="off"
              type="text"
              placeholder="Task Name"
              maxLength={20}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="form-task-header">Task Status</Form.Label>
            <div className="check-wrap d-flex mb-3">
              <div className="d-flex">
                <Form.Check
                  onChange={() => {
                    dataContext.dispatch({
                      type: "SET_LAST_TASK",
                      payload: {
                        ...dataContext.lastTask,
                        taskStatus: "pending",
                      },
                    });
                  }}
                  checked={
                    dataContext.lastTask.taskStatus === "pending" && true
                  }
                  required
                  type="radio"
                  name="taskStatus"
                  label="Pending"
                />
              </div>
              <div className="d-flex mx-3">
                <Form.Check
                  onChange={() => {
                    dataContext.dispatch({
                      type: "SET_LAST_TASK",
                      payload: {
                        ...dataContext.lastTask,
                        taskStatus: "inProgress",
                      },
                    });
                  }}
                  checked={
                    dataContext.lastTask.taskStatus === "inProgress" && true
                  }
                  required
                  type="radio"
                  name="taskStatus"
                  label="In progress"
                />
              </div>
              <div className="d-flex mx-3">
                <Form.Check
                  onChange={() => {
                    dataContext.dispatch({
                      type: "SET_LAST_TASK",
                      payload: {
                        ...dataContext.lastTask,
                        taskStatus: "done",
                      },
                    });
                  }}
                  checked={dataContext.lastTask.taskStatus === "done" && true}
                  required
                  type="radio"
                  name="taskStatus"
                  label="Done"
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label className="form-task-header">
              Task Description
            </Form.Label>
            <Form.Control
              as="textarea"
              style={{ resize: "none" }}
              value={dataContext.lastTask.taskDesc ?? ""}
              onChange={(event) => {
                dataContext.dispatch({
                  type: "SET_LAST_TASK",
                  payload: {
                    ...dataContext.lastTask,
                    taskDesc: event.currentTarget.value,
                  },
                });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label className="form-task-header">Task Date</Form.Label>
            <Form.Control
              required
              autoComplete="off"
              type="date"
              className="date-input"
              value={dataContext.lastTask.taskDate ?? ""}
              onChange={(event) => {
                dataContext.dispatch({
                  type: "SET_LAST_TASK",
                  payload: {
                    ...dataContext.lastTask,
                    taskDate: event.currentTarget.value,
                  },
                });
              }}
              max="9999-12-31"
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
  );
};
export default TaskPopup;

import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import addImg from "../../images/add.png";
import closeImg from "../../images/close.png";
import editImg from "../../images/edit.png";
import "./tasksSection.scss";
import PopupContext from "../../contextAPI/PopupContext";
import DataContext from "../../contextAPI/DataContext";
import { v4 as uuidv4 } from "uuid";

const TasksSection: React.FC = () => {
  const popupContext = useContext(PopupContext);
  const dataContext = useContext(DataContext);
  if (!popupContext || !dataContext) {
    // Handle the case when the context is not available
    console.error("Context is not available");
    return null; // or return some fallback content
  }
  const baseTaskClassName = "task p-2 m-1 "; // space at the end
  return (
    <section className="tasksSection py-4 px-2 d-flex overflow-auto">
      {dataContext.data.map((e, sectionIindex) => {
        return (
          <div className="task-section p-3 m-3" key={"section" + sectionIindex}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="section-title d-flex align-items-center">
                {e.sectionName}
                <Button
                  variant="none"
                  onClick={() => {
                    dataContext.dispatch({
                      type: "SET_LAST_ACTION",
                      payload: "edit",
                    });
                    dataContext.dispatch({
                      type: "SET_LAST_ID",
                      payload: e.id,
                    });
                    dataContext.dispatch({
                      type: "SET_LAST_SECTION_NAME",
                      payload: e.sectionName,
                    });
                    popupContext.setPopupInfo("section");
                  }}
                >
                  <img src={editImg} alt="edit-section" className="mx-1" />
                </Button>
              </div>
              <Button variant="none">
                <img
                  src={closeImg}
                  alt="close-section"
                  className="deleteSection"
                />
              </Button>
            </div>
            <div className="tasks">
              {e.tasks.map((ele, taskIndex) => {
                return (
                  <div
                    className={baseTaskClassName + ele.taskStatus}
                    key={"task" + taskIndex}
                    onClick={() => {
                      dataContext.dispatch({
                        type: "SET_LAST_ACTION",
                        payload: "edit",
                      });
                      dataContext.dispatch({
                        type: "SET_LAST_ID",
                        payload: e.id,
                      });
                      dataContext.dispatch({
                        type: "SET_LAST_TASK_ID",
                        payload: ele.taskId,
                      });
                      dataContext.dispatch({
                        type: "SET_LAST_TASK",
                        payload: e.tasks[taskIndex],
                      });
                      popupContext.setPopupInfo("task");
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="task-name">{ele.taskName}</div>
                      <Button
                        variant="none"
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <img src={closeImg} alt="close-section" />
                      </Button>
                    </div>
                    <div className="task-date mt-3">{ele.taskDate}</div>
                  </div>
                );
              })}
            </div>
            <div className="d-flex justify-content-center">
              <Button
                variant="none"
                className="add-btn d-flex align-items-center"
                onClick={() => {
                  dataContext.dispatch({
                    type: "SET_LAST_ACTION",
                    payload: "add",
                  });
                  dataContext.dispatch({
                    type: "SET_LAST_TASK",
                    payload: "",
                  });
                  dataContext.dispatch({
                    type: "SET_LAST_ID",
                    payload: e.id,
                  });
                  dataContext.dispatch({
                    type: "SET_LAST_TASK_ID",
                    payload: uuidv4(),
                  });
                  popupContext.setPopupInfo("task");
                }}
              >
                <img src={addImg} alt="add-section" />
                Add Task
              </Button>
            </div>
          </div>
        );
      })}
    </section>
  );
};
export default TasksSection;

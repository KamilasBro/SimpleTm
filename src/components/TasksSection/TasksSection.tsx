import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import addImg from "../../images/add.png";
import closeImg from "../../images/close.png";
import editImg from "../../images/edit.png";
import "./tasksSection.scss";
const TasksSection: React.FC=()=> {
  const array = new Array(10).fill(1);
  return (
    <section className="tasksSection py-4 px-2 d-flex overflow-auto">
      {array.map((e, index) => {
        return (
          <div className="task-section p-3 m-3" key={index}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="section-title d-flex align-items-center">
                To Do
                <Button variant="none">
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
              {array.map((e, index) => {
                return (
                  <div className="task p-2 m-1" key={index}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="task-name">{e}</div>
                      <Button variant="none">
                        <img src={closeImg} alt="close-section" />
                      </Button>
                    </div>
                    <div className="task-date mt-3">123</div>
                  </div>
                );
              })}
            </div>
            <div className="d-flex justify-content-center">
              <Button
                variant="none"
                className="add-btn d-flex align-items-center"
                onClick={() => {}}
              >
                <img src={addImg} alt="add-section" />
                Add Task
              </Button>
            </div>
          </div>
        );
      })}
    </section>
  )
}
export default TasksSection;

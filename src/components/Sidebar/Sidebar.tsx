import React, { useContext, useState } from "react";
import addImg from "../../images/add.png";
import searchImg from "../../images/search.png";
import Button from "react-bootstrap/Button";
import "./sidebar.scss";
import PopupContext from "../../contextAPI/PopupContext";
import DataContext from "../../contextAPI/DataContext";
const Sidebar: React.FC = () => {
  const popupContext = useContext(PopupContext);
  const dataContext = useContext(DataContext);
  const [searchedPhrase, setLastSearchedPhrase] = useState("");
  if (!popupContext || !dataContext) {
    // Handle the case when the context is not available
    console.error("Context is not available");
    return null;
  }
  return (
    <section className="sidebar d-flex align-items-center justify-content-between py-3 px-5">
      <div className="d-flex align-items-center">
        <h4 className="p-0 m-0">Explore Tasks</h4>
        <div className="input-wrap mx-5 d-flex align-items-center justify-content-between">
          <input
            placeholder="Search"
            className="w-100"
            value={searchedPhrase}
            onChange={(event) => {
              setLastSearchedPhrase(event.currentTarget.value);
              if (event.currentTarget.value.trim() === "") {
                dataContext.dispatch({
                  type: "SET_SEARCHED_PHRASE",
                  payload: "",
                });
              }
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                dataContext.dispatch({
                  type: "SET_SEARCHED_PHRASE",
                  payload: searchedPhrase.trim(),
                });
              }
            }}
          />
          <Button
            variant="none"
            className="search-btn"
            onClick={() => {
              dataContext.dispatch({
                type: "SET_SEARCHED_PHRASE",
                payload: searchedPhrase.trim(),
              });
            }}
          >
            <img src={searchImg} alt="searchImg" />
          </Button>
        </div>
      </div>
      <Button
        variant="none"
        className="add-btn d-flex align-items-center"
        onClick={() => {
          dataContext.dispatch({
            type: "SET_LAST_ACTION",
            payload: "add",
          });
          dataContext.dispatch({
            type: "SET_LAST_SECTION_NAME",
            payload: "",
          });
          popupContext.setPopupInfo("section");
        }}
      >
        <img src={addImg} alt="add-section" />
        <span className="btn-text">Add Section</span>
      </Button>
    </section>
  );
};
export default Sidebar;

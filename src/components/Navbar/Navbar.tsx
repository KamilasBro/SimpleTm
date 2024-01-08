import React, { useReducer } from "react";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import "./navbar.scss";
import Nav from "react-bootstrap/Nav";
import NavbarComp from "react-bootstrap/Navbar";
import menuImg from "../../images/navbar/menu.png";
import taskImg from "../../images/navbar/task.png";
import bookImg from "../../images/navbar/book.png";
import gearImg from "../../images/navbar/gear.png";

const Navbar: React.FC = () => {
  interface State {
    isToggleOn: boolean;
  }

  type Action = { type: "TOGGLE" };

  const initialState: State = {
    isToggleOn: false,
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "TOGGLE":
        return {
          ...state,
          isToggleOn: !state.isToggleOn,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <NavbarComp className="navbar d-inline-flex align-items-start p-4">
      <Nav.Link
        className="toggle"
        onClick={() => {
          dispatch({ type: "TOGGLE" });
        }}
      >
        <img src={menuImg} alt="menu" />
      </Nav.Link>
      <MobileNavbar state={state} dispatch={dispatch} />
      <div className="container">
        <NavbarComp.Brand
          className="nav-brand d-flex align-items-center"
          href="#"
        >
          <img src={taskImg} alt="logo" />
          SimpleTM
        </NavbarComp.Brand>
        <Nav className="nav-links me-auto d-flex flex-column my-5">
          <Nav.Link href="#" className="mb-2">
            <img src={bookImg} alt="book" />
            Home
          </Nav.Link>
          <Nav.Link href="#">
            <img src={gearImg} alt="gear" />
            Settings
          </Nav.Link>
        </Nav>
      </div>
    </NavbarComp>
  );
};
export default Navbar;

import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavbarComp from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import closeImg from "../../images/close.png";
import taskImg from "../../images/navbar/task.png";
import bookImg from "../../images/navbar/book.png";
import gearImg from "../../images/navbar/gear.png";
import "./mobileNavbar.scss";
interface MobileNavbarProps {
  state: {
    isToggleOn: boolean;
  };
  dispatch: React.Dispatch<{ type: "TOGGLE" }>;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ state, dispatch }) => {
  return (
    <>
      <Offcanvas
        className="mobileNavbar"
        show={state.isToggleOn}
        onHide={() => {
          dispatch({ type: "TOGGLE" });
        }}
      >
        <Offcanvas.Header closeButton={false}>
          <Offcanvas.Title className="d-flex">
            <NavbarComp.Brand
              className="nav-brand d-flex align-items-center"
              href="#"
            >
              <img src={taskImg} alt="logo" />
              SimpleTM
            </NavbarComp.Brand>
          </Offcanvas.Title>
          <img
            className="closeImg"
            src={closeImg}
            alt="Close"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch({ type: "TOGGLE" })}
          />
        </Offcanvas.Header>
        <Offcanvas.Body className="container">
          <div className="container">
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MobileNavbar;

import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import TasksSection from "./components/TasksSection/TasksSection";
import SectionPopup from "./components/SectionPopup/SectionPopup";
import TaskPopup from "./components/TaskPopup/TaskPopup";
import { PopupContextProvider } from "./contextAPI/PopupContext";
import { DataContextProvider } from "./contextAPI/DataContext";
const App: React.FC = () => {
  return (
    <div className="App d-flex">
      <Navbar />
      <DataContextProvider>
        <PopupContextProvider>
          <div className="inner-container mw-100 w-100 overflow-auto">
            <Sidebar />
            <TasksSection />
          </div>
          <SectionPopup />
          <TaskPopup />
        </PopupContextProvider>
      </DataContextProvider>
    </div>
  );
};
export default App;

import React, {
  createContext,
  useReducer,
  Reducer,
  useEffect,
  useState,
} from "react";
import {
  DataContextType,
  DataContextAction,
  DataContextProviderProps,
} from "../interfaces/DataContextInterfaces";

const initialState: DataContextType = {
  data: [],
  searchedPhrase: "",
  lastAction: "none",
  lastId: "",
  lastTaskId: "",
  lastTask: {},
  lastSection: "",
  dispatch: () => {}, // Placeholder dispatch function
};

const dataReducer: Reducer<DataContextType, DataContextAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_SEARCHED_PHRASE":
      return { ...state, searchedPhrase: action.payload };
    case "SET_LAST_ACTION":
      return { ...state, lastAction: action.payload };
    case "SET_LAST_ID":
      return { ...state, lastId: action.payload };
    case "SET_LAST_TASK_ID":
      return { ...state, lastTaskId: action.payload };
    case "SET_LAST_TASK":
      return { ...state, lastTask: action.payload };
    case "SET_LAST_SECTION_NAME":
      return { ...state, lastSection: action.payload };
    case "ADD_SECTION": {
      const { sectionName, sectionId } = action.payload;
      const newSection = {
        id: sectionId,
        sectionName: sectionName,
        tasks: [],
      };
      return { ...state, data: [...state.data, newSection] };
    }
    case "EDIT_SECTION": {
      const { sectionName, sectionId } = action.payload;
      const updatedSection = state.data.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            sectionName: sectionName,
          };
        }
        return section;
      });
      return { ...state, data: updatedSection };
    }
    case "DELETE_SECTION": {
      const { sectionId } = action.payload;
      const updatedDataAfterDelete = state.data.filter(
        (section) => section.id !== sectionId
      );
      return { ...state, data: updatedDataAfterDelete };
    }
    case "ADD_TASK": {
      const { sectionId, task } = action.payload;
      const newTask = state.data.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            tasks: [...section.tasks, task],
          };
        }
        return section;
      });
      return { ...state, data: newTask };
    }
    case "EDIT_TASK": {
      const { sectionId, taskId, updatedTask } = action.payload;
      const updatedDataAfterEdit = state.data.map((section) => {
        if (section.id === sectionId) {
          const updatedTasks = section.tasks.map((task) => {
            if (task.taskId === taskId) {
              return { ...task, ...updatedTask };
            }
            return task;
          });
          return {
            ...section,
            tasks: updatedTasks,
          };
        }
        return section;
      });
      return { ...state, data: updatedDataAfterEdit };
    }
    case "DELETE_TASK": {
      const { sectionId, taskId } = action.payload;
      const updatedDataAfterDeleteTask = state.data.map((section) => {
        if (section.id === sectionId) {
          const updatedTasks = section.tasks.filter(
            (task) => task.taskId !== taskId
          );
          return {
            ...section,
            tasks: updatedTasks,
          };
        }
        return section;
      });
      return { ...state, data: updatedDataAfterDeleteTask };
    }
    default:
      return state;
  }
};

const DataContext = createContext<DataContextType | undefined>(undefined);


export function DataContextProvider({
  children,
}: DataContextProviderProps): JSX.Element {
  //saving the data
  useEffect(() => {
    const loadData = async () => {
      const storedDataString = localStorage.getItem("data");
      if (storedDataString !== null) {
        const storedData = JSON.parse(storedDataString);
        if (storedData) {
          dispatch({ type: "SET_DATA", payload: storedData });
        }
      }
      setLoading(false);
    };
    loadData();
  }, []);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    //loading the data
    if (!loading) {
      localStorage.setItem("data", JSON.stringify(state.data));
    }
  }, [state.data, loading]);

  const value: DataContextType = {
    data: state.data,
    searchedPhrase: state.searchedPhrase,
    lastAction: state.lastAction,
    lastId: state.lastId,
    lastTaskId: state.lastTaskId,
    lastTask: state.lastTask,
    lastSection: state.lastSection,
    dispatch,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
export default DataContext;

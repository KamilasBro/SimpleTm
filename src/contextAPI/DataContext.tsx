import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  Reducer,
} from "react";
import example from "../contextAPI/example.json";
interface Task {
  [key: string]: string;
}
interface DataContextType<T = Task> {
  data: Array<{
    id: string;
    sectionName: string;
    tasks: Array<T>;
  }>;
  searchedPhrase: string;
  lastAction: string;
  lastId: string;
  lastTaskId: string;
  lastTask: T;
  lastSection: string;
  dispatch: Dispatch<DataContextAction>;
}

interface DataContextAction {
  type: string;
  payload?: any;
}

// Define your initial state
const initialState: DataContextType = {
  data: example,
  searchedPhrase: "",
  lastAction: "none",
  lastId: "",
  lastTaskId: "",
  lastTask: {},
  lastSection: "",
  dispatch: () => {}, // Placeholder dispatch function
};

// Define your reducer function
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
    case "ADD_SECTION":{
      const { sectionName, sectionId } = action.payload;
      const newSection = {
        id: sectionId,
        sectionName: sectionName,
        tasks: [],
      };
      return { ...state, data: [...state.data, newSection] };}
    case "EDIT_SECTION":{
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
      return { ...state, data: updatedSection };}
    case "ADD_TASK":{
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
      return { ...state, data: newTask };}
    case "EDIT_TASK":{
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
      return { ...state, data: updatedDataAfterEdit };}
    // Add more cases for other actions as needed
    default:
      return state;
  }
};

// Initialize the context with an initial value
const DataContext = createContext<DataContextType | undefined>(undefined);

// Define the type for the props
interface DataContextProviderProps {
  children: ReactNode;
}

export function DataContextProvider({
  children,
}: DataContextProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(dataReducer, initialState);

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
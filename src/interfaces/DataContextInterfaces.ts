import React, {
    Dispatch,
    ReactNode
} from "react";

interface Task {
    [key: string]: string;
}
export interface DataContextType<T = Task> {
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

export interface DataContextAction {
    type: string;
    payload?: any;
}
export interface DataContextProviderProps {
    children: ReactNode;
  }
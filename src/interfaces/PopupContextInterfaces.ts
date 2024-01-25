import React, {
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

export interface PopupContextType {
    popupInfo: string;
    setPopupInfo: Dispatch<SetStateAction<string>>;
}
// Define the type for the props
export interface PopupContextProviderProps {
    children: ReactNode;
}
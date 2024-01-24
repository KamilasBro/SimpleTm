import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the types for the context
interface PopupContextType {
  popupInfo: string;
  setPopupInfo: Dispatch<SetStateAction<string>>;
}

// Initialize the context with an initial value (you can replace "siema" with the actual initial value type)
const PopupContext = createContext<PopupContextType | undefined>(undefined);

// Define the type for the props
interface PopupContextProviderProps {
  children: ReactNode;
}

export function PopupContextProvider({children}: PopupContextProviderProps): JSX.Element {
  const [popupInfo, setPopupInfo] = useState<string>("none");

  const value: PopupContextType = {
    popupInfo,
    setPopupInfo,
  };

  return (
    <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
  );
}

export default PopupContext;

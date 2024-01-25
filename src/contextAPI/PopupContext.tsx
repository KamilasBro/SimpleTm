import React, { createContext, useState } from "react";

import {
  PopupContextType,
  PopupContextProviderProps,
} from "../interfaces/PopupContextInterfaces";

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function PopupContextProvider({
  children,
}: PopupContextProviderProps): JSX.Element {
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

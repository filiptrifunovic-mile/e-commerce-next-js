import { createContext, useState, FC, ReactNode, useContext } from "react";

export interface StateModifers {
  openSidebar: () => void;
  closeSidebar: () => void;
}

export interface StateValues {
  isSidebarOpen: boolean;
}

const stateModifiers = {
  openSidebar: () => {},
  closeSidebar: () => {},
};

const initialState = { isSidebarOpen: false };

type State = StateValues & StateModifers;

const UIContext = createContext<State>({
  ...stateModifiers,
  ...initialState,
});

interface UIProps {
  children: ReactNode[] | ReactNode;
}

export const UIProvider: FC<UIProps> = ({ children }) => {
  const openSidebar = () => alert("opening");
  const closeSidebar = () => alert("close");

  const value = {
    openSidebar,
    closeSidebar,
    isSidebarOpen: true,
  };

  return (
    <UIContext.Provider value={value}>
      <div>{children}</div>
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  return context;
};

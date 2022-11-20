import { createContext, useState, FC, ReactNode, useContext } from "react";

const UIContext = createContext<{ [key: string]: any }>({
  uiState: "default",
});

interface UIProps {
  children: ReactNode[] | ReactNode;
}

export const UIProvider: FC<UIProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  console.log(isSidebarOpen);

  const uiState = {
    isSidebarOpen,
    setSidebarOpen,
  };

  return (
    <UIContext.Provider value={uiState}>
      <div>{children}</div>
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  return context;
};

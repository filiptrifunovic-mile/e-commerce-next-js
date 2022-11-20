import { createContext, FC, ReactNode, useContext } from "react";

const UIContext = createContext<{ [key: string]: string }>({
  uiState: "default",
});

interface UIProps {
  children: ReactNode[] | ReactNode;
}

export const UIProvider: FC<UIProps> = ({ children }) => {
  return (
    <UIContext.Provider value={{ uiState: "value" }}>
      <div>{children}</div>
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  return context;
};

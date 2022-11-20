import {
  createContext,
  useReducer,
  FC,
  ReactNode,
  useContext,
  useMemo,
} from "react";

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

type Action = { type: "OPEN_SIDEBAR" | "CLOSE_SIDEBAR" };

function uiReducer(state: StateValues, action: Action) {
  if (action.type === "OPEN_SIDEBAR") {
    return {
      ...state,
      isSidebarOpen: true,
    };
  } else {
    return {
      ...state,
      isSidebarOpen: false,
    };
  }
  // switch (action.type) {
  //   case "OPEN_SIDEBAR": {
  //     return {
  //       ...state,
  //       isSidebarOpen: true,
  //     };
  //   }
  //   case "CLOSE_SIDEBAR": {
  //     return {
  //       ...state,
  //       isSidebarOpen: false,
  //     };
  //   }
  // }
}

export const UIProvider: FC<UIProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });

  const value = useMemo(() => {
    return {
      ...state,
      openSidebar,
      closeSidebar,
    };
  }, [state]);

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

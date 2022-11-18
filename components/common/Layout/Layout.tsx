// import style from "./Layout.module.css";

// type LayoutProps = {
//   children: React.ReactNode;
// };

// const Layout = (props: LayoutProps) => {
//   return (
//     <div className={style.root}>
//       <main className="fit">{props.children}</main>
//     </div>
//   );
// };

// export default Layout;

import style from "./Layout.module.css";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode[];
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={style.root}>
      <main className="fit">{children}</main>
    </div>
  );
};

export default Layout;

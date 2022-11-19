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
import { Footer } from "@components/common";
import { Navbar } from "@components/common";
import { Sidebar } from "@components/UI";
import { CartSidebar } from "@components/cart";

interface LayoutProps {
  children: ReactNode[];
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={style.root}>
      <Navbar />
      <Sidebar>
        <CartSidebar />
      </Sidebar>
      <main className="fit">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

import style from "./Layout.module.css";
import { FC, ReactNode } from "react";
import { Footer } from "@components/common";
import { Navbar } from "@components/common";
import { Sidebar } from "@components/UI";
import { CartSidebar } from "@components/cart";
import { useUI } from "@components/UI/context";

interface LayoutProps {
  children: ReactNode[];
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { isSidebarOpen, closeSidebar } = useUI();

  return (
    <div className={style.root}>
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}>
        <CartSidebar />
      </Sidebar>
      <main className="fit">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

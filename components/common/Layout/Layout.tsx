import s from "./Layout.module.css";
import { FC, ReactNode } from "react";
import { Footer } from "@components/common";
import { Navbar } from "@components/common";
import { Sidebar } from "@components/UI";
import { CartSidebar } from "@components/cart";
import { useUI } from "@components/UI/context";
import { ApiProvider } from "@framerwork";

interface LayoutProps {
  children: ReactNode[];
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { isSidebarOpen, closeSidebar } = useUI();

  return (
    <ApiProvider>
      <div className={s.root}>
        <Navbar />
        <Sidebar onClose={closeSidebar} isOpen={isSidebarOpen}>
          <CartSidebar />
        </Sidebar>
        <main className="fit">{children}</main>
        <Footer />
      </div>
    </ApiProvider>
  );
};

export default Layout;

import style from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return (
    <div className={style.root}>
      <main className="fit">{props.children}</main>
    </div>
  );
};

export default Layout;

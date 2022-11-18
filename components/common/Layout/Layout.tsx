type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return <div className="layout">{props.children}</div>;
};

export default Layout;

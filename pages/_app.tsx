import { UIProvider, useUI } from "@components/UI/context";
import { AppProps } from "next/app";
import "../assets/main.css";

type NoopProps = {
  children: React.ReactNode;
};

const Noop = (props: NoopProps) => {
  return <>{props.children}</>;
};

function MyApp({
  Component,
  pageProps,
}: AppProps & { Component: { Layout: any } }) {
  const Layout = Component.Layout ?? Noop;
  const ui = useUI();
  return (
    <UIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UIProvider>
  );
}

export default MyApp;

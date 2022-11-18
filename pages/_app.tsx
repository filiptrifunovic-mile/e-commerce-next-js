import { AppProps } from "next/app";

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

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

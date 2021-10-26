import "../styles/globals.css";
import type { AppProps } from "next/app";

import Layout from "../components/Layout";
import StoreContext from "context/store-context";
import UiState from "store/uistate";
import { Provider } from "mobx-react";

function MyApp({ Component, pageProps }: AppProps) {
  const uiState = new UiState();
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

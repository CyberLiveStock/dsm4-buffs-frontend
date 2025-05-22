import Layout from "@/layout/Layout";
import "@/styles/globals.css";
import { applyLayout } from "@/utils/LayoutUtil.js";
import API_CONNECTION_URL from "@/config/ApiConnection";

import Head from "next/head";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function App({ Component, pageProps }) {
  const getLayout = applyLayout(Component);

  useAuthGuard();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

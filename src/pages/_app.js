import Layout from "@/layout/Layout";
import "@/styles/globals.css";
import { applyLayout } from "@/utils/LayoutUtil.js";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const getLayout = applyLayout(Component); 

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

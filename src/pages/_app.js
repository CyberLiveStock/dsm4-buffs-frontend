import Layout from "@/layout/Layout";
import "@/styles/globals.css";
import { applyLayout } from "@/utils/LayoutUtil.js";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const getLayout = applyLayout(Component); // Usa a função utilitária

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Adicione outras tags de meta ou fontes aqui */}
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

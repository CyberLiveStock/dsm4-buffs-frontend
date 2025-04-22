import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.js";
export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simula o tempo de carregamento
    setTimeout(() => {
      setLoading(false);
      router.push("/auth/login"); // Redireciona para a página de login 
    }, 3000); // 3 segundos de carregamento 
  }, [router]);

  return (
    <>
      <Head>
        <title>Carregando...</title>
        <meta
          name="description"
          content="Tela de carregamento antes de redirecionar para a tela de login"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <div style={styles.loader}>
          <LoadingSpinner />
        </div>
      ) : (
        <h1>Redirecionando para a tela de login...</h1>
      )}
    </>
  );
}

const styles = {
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    flexDirection: "column",
    textAlign: "center",
  },
};

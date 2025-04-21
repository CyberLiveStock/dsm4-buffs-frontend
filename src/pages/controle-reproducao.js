import Layout from "@/layout/Layout.js";
import styles from "@/styles/Home.module.css";

export default function ControleReproducao() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo à page Controle de Reproducao</h1>
      <div className={styles.content}>
        <p className={styles.paragraph}>Este é um exemplo de conteúdo.</p>
      </div>
    </div>
  );
}

ControleReproducao.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

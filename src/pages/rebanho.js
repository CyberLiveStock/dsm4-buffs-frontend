import Layout from "@/layout/Layout.js";
import styles from "@/styles/Home.module.css";

export default function Rebanho() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo à page Rebanho</h1>
      <div className={styles.content}>
        <p className={styles.paragraph}>
          Este é um exemplo de conteúdo.
        </p>
      </div>
    </div>
  );
}

Rebanho.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

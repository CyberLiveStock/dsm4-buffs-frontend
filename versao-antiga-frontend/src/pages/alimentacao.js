import Layout from "@/layout/Layout.js";
import styles from "@/styles/Alimentacao.module.css";

export default function Alimentacao() {
  return (
    <div class={styles.container}>
      <h1>Teste Alimentacao</h1>
    </div>
  );
}

Alimentacao.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};



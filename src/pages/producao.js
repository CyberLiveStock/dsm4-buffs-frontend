import Layout from "@/layout/Layout.js";
import styles from "@/styles/Producao.module.css";

export default function Producao() {
  return (
    <div class={styles.container}>
      <h1>Teste Producao</h1>
    </div>
  );
}

Producao.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

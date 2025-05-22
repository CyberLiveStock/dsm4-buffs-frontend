import Layout from "@/layout/Layout.js";
import styles from "@/styles/ControleZootecnico.module.css";

export default function ControleZootecnico() {
  return (
    <div class={styles.container}>
      <h1>Teste Controle Zootecnico</h1>
    </div>
  );
}

ControleZootecnico.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

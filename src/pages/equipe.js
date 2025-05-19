import Layout from "@/layout/Layout.js";
import styles from "@/styles/Equipe.module.css";

export default function Equipe() {
  return (
    <div class={styles.container}>
      <h1>Teste Equipe</h1>
    </div>
  );
}

Equipe.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

import styles from "@/styles/Home.module.css";
import Layout from "@/layout/Layout.js";

export default function Home() {
  return (
    <>
      <div className={styles.parent}>
        <div className={styles.div1}>Div 1</div>
        <div className={styles.div2}>Div 2</div>
        <div className={styles.div3}>Div 3</div>
        <div className={styles.div4}>Div 4</div>
        
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

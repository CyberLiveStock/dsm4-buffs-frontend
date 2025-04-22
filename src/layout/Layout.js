import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";
import styles from "./layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
}

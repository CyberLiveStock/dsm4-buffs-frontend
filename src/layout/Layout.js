"use client"; // Se estiver usando Next.js App Router

import { useState } from "react";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";
import styles from "@/layout/Layout.module.css"

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <header className={styles.header}>
        <Header toggleSidebar={toggleSidebar} />
      </header>

      <div className={`${styles.container} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>

        <main className={styles.main}>
          {children}
        </main>
      </div>

      
    </>
  );
}

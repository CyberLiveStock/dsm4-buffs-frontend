"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "@/layout/Layout.module.css";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <Header toggleSidebar={toggleSidebar} />
      </header>

      <div
        className={`${styles.container} ${
          sidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <aside className={styles.sidebar}>
          <Sidebar isSidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </aside>

        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}

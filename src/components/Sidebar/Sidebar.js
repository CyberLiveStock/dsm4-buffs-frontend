"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import styles from "@/components/Sidebar/Sidebar.module.css"
import { LogOut, Home, Activity, ClipboardList, Apple, Users, Factory } from "lucide-react"

export default function Sidebar({ isSidebarOpen, closeSidebar }) {
  const router = useRouter()
  const pathname = router.pathname

  const menuItems = [
    { name: "Página Inicial", path: "/home", icon: "lucide", lucideIcon: Home },
    { name: "Rebanho", path: "/rebanho", icon: "/images/bufalo.svg" },
    {
      name: "Controle de Reprodução",
      path: "/controle-reproducao",
      icon: "lucide",
      lucideIcon: Activity,
    },
    { name: "Lactação", path: "/lactacao", icon: "/images/lact.svg" },
    { name: "Manejo", path: "/manejo", icon: "lucide", lucideIcon: ClipboardList },
    { name: "Alimentação", path: "/alimentacao", icon: "lucide", lucideIcon: Apple },
    { name: "Equipe", path: "/equipe", icon: "lucide", lucideIcon: Users },
    { name: "Produção", path: "/producao", icon: "lucide", lucideIcon: Factory },
  ]

  const renderIcon = (item) => {
    if (item.icon === "lucide" && item.lucideIcon) {
      const IconComponent = item.lucideIcon
      return <IconComponent size={20} className={styles.icon} />
    } else {
      return (
        <Image src={item.icon || "/placeholder.svg"} alt={item.name} width={20} height={20} className={styles.icon} />
      )
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/auth/login")
    closeSidebar()
  }

  return (
    <>
      {isSidebarOpen && <div className={styles.backdrop} onClick={closeSidebar}></div>}

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <li key={item.path} className={styles.menuItem}>
              <Link
                href={item.path}
                className={`${styles.link} ${pathname === item.path ? styles.active : ""}`}
                onClick={closeSidebar}
              >
                {renderIcon(item)}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}

          <li className={styles.menuItem}>
            <button onClick={handleLogout} className={`${styles.link}`} aria-label="Logout">
              <LogOut size={20} className={styles.icon} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </aside>
    </>
  )
}

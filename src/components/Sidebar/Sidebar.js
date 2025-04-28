import Link from 'next/link'
import Image from 'next/image'
import { useActiveLink } from '@/utils/useActiveLink'
import styles from '@/components/Sidebar/Sidebar.module.css'

export default function Sidebar({ isSidebarOpen, closeSidebar }) {
  const menuItems = [
    { name: 'Página Inicial', path: '/home', icon: '/images/home.svg' },
    { name: 'Rebanho', path: '/rebanho', icon: '/images/bufalo.svg' },
    { name: 'Controle de Reprodução', path: '/controle-reproducao', icon: '/images/line.svg' },
    { name: 'Lactação', path: '/lactacao', icon: '/images/lact.svg' },
    { name: 'Manejo', path: '/manejo', icon: '/images/line.svg' },
    { name: 'Controle Sanitário', path: '/controle-sanitario', icon: '/images/line.svg' },
    { name: 'Controle Zootécnico', path: '/controle-zootecnico', icon: '/images/line.svg' },
    { name: 'Equipe', path: '/equipe', icon: '/images/user.svg' },
  ];

  return (
    <>
      {/* Backdrop para mobile */}
      {isSidebarOpen && <div className={styles.backdrop} onClick={closeSidebar}></div>}

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <ul className={styles.menu}>
          {menuItems.map((item) => {
            const activeClass = useActiveLink(item.path);
            return (
              <li key={item.path} className={styles.menuItem}>
                <Link href={item.path} className={`${styles.link} ${styles[activeClass]}`} onClick={closeSidebar}>
                  <Image src={item.icon} alt={item.name} width={20} height={20} className={styles.icon} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}

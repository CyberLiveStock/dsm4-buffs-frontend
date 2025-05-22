import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useActiveLink } from '@/utils/useActiveLink';
import styles from '@/components/Sidebar/Sidebar.module.css';

export default function Sidebar({ isSidebarOpen, closeSidebar }) {
  const router = useRouter();

  const menuItems = [
    { name: 'Página Inicial', path: '/home', icon: '/images/home.svg' },
    { name: 'Rebanho', path: '/rebanho', icon: '/images/bufalo.svg' },
    { name: 'Controle de Reprodução', path: '/controle-reproducao', icon: '/images/line.svg' },
    { name: 'Lactação', path: '/lactacao', icon: '/images/lact.svg' },
    { name: 'Manejo', path: '/manejo', icon: '/images/line.svg' },
    // { name: 'Controle Sanitário', path: '/controle-sanitario', icon: '/images/line.svg' },
    // { name: 'Controle Zootécnico', path: '/controle-zootecnico', icon: '/images/line.svg' },
    { name: 'Alimentação', path: '/alimentacao', icon: '/images/line.svg' },
    { name: 'Equipe', path: '/equipe', icon: '/images/user.svg' },
    { name: 'Produção', path: '/producao', icon: '/images/line.svg' },
  ];

  const handleLogout = () => {
    // Aqui você limpa os dados do usuário (ex: token) do localStorage ou cookies
    localStorage.removeItem('authToken');  // ajuste o nome conforme seu sistema
    // redireciona para a página de login
    router.push('/auth/login');
    closeSidebar(); // Fecha a sidebar
  };

  return (
    <>
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
          <li className={styles.menuItem}>
            <button
              onClick={handleLogout}
              className={`${styles.link}`}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              aria-label="Logout"
            >
              <Image src="/images/logout.svg" alt="Logout" width={20} height={20} className={styles.icon} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
}

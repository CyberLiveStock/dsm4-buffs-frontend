import styles from "@/components/Header/Header.module.css";

export default function Header({ toggleSidebar }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuButton} onClick={toggleSidebar}>
          ☰
        </button>

        <img
          src="/images/Logo buffs.svg"
          alt="Logo Buffs"
          className={styles.logo}
        />
      </div>

      <div className={styles.profile}>
        <img
          src="/images/image-buf.jpeg"
          alt="Foto de Perfil"
          className={styles.avatar}
        />
      </div>
    </header>
  );
}

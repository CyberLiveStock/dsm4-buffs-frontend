import styles from "@/components/Header/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <img src="/images/Logo buffs.svg" alt="Logo Buffs" className={styles.logo} />
      
      <div className={styles.profile}>
        <img
          src="/images/perfil.jpg" // Substitua pela imagem real do perfil ou avatar padrão
          alt="Foto de Perfil"
          className={styles.avatar}
        />
      </div>
    </header>
  );
}

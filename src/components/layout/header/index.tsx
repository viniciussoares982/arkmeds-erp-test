import Link from 'next/link'
import styles from './header.module.css';

const Header = () => {
  return (
    <header className={`container ${styles.header_background}`}>
      <span className={styles.header_title}>ARKMEDS ERP</span>
      <div className={styles['header__links-container']}>
        <Link href="/" className={styles.links}>Lista de Empresas</Link>
        <Link href="/cadastro-de-empresas" className={styles.links}>Cadastro de Empresas</Link>
      </div>
    </header>
  );
};

export default Header;

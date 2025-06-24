'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './header.module.css'

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className={`container ${styles.header_background}`}>
      <Link href="/" className={styles.header_title}>ARKMEDS ERP</Link>

      <button
        className={styles.menu_toggle}
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label="Abrir menu"
      >
        ☰
      </button>

      <nav className={`${styles['header__links-container']} ${menuAberto ? styles.aberto : ''}`}>
        <Link href="/" className={styles.links}>Lista de Empresas</Link>
        <Link href="/cadastro-de-empresas" className={styles.links}>Cadastro de Empresas</Link>
      </nav>
    </header>
  )
}

export default Header

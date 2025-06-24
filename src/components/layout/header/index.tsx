import Link from 'next/link'
import './header.css'

const Header = () => {
  return (
    <header className='container header_background'>
      <span className='header_title'>ARKMEDS ERP</span>
      <div className='header__links-container'>
        <Link href="/" className='links'>Lista de Empresas</Link>
        <Link href="/cadastro-de-empresas" className='links'>Cadastro de Empresas</Link>
      </div>
    </header>
  )
}

export default Header
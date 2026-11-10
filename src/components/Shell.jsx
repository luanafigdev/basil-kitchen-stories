import { useEffect, useState } from 'react'
import { ArrowUpRight, BookOpen, Heart, Leaf, Menu, ShoppingBasket, X } from 'lucide-react'

function Brand({ light = false }) {
  return <a href="#/inicio" className={`brand ${light ? 'brand--light' : ''}`} aria-label="BASIL, voltar ao início">
    <span className="brand__mark"><Leaf size={25} strokeWidth={1.7} /></span>
    <span className="brand__word">basil</span>
    <span className="brand__sub">KITCHEN STORIES</span>
  </a>
}

export function Header({ route, favoriteCount, shoppingCount }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => setMobileOpen(false), [route])
  useEffect(() => {
    document.body.classList.toggle('nav-open', mobileOpen)
    return () => document.body.classList.remove('nav-open')
  }, [mobileOpen])
  const links = [
    ['inicio', 'Início'], ['confeitaria', 'Confeitaria'], ['escola', 'Escola'], ['receitas', 'Receitas'],
    ['despensa', 'Minha despensa'], ['caderno', 'Meu caderno']
  ]
  return <>
    <div className="utility-bar"><span>UM LUGAR PARA COZINHAR COM CALMA</span><span>RECEITAS · TÉCNICAS · AFETO</span></div>
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav aria-label="Navegação principal" className="desktop-nav">
          {links.map(([page, label]) => <a key={page} href={`#/${page}`} className={route === page ? 'is-current' : ''}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="header-icon" href="#/caderno" aria-label={`${favoriteCount} receitas favoritas`} title="Favoritos"><Heart size={19}/>{favoriteCount > 0 && <span className="header-count">{favoriteCount}</span>}</a>
          <a className="header-icon" href="#/compras" aria-label="Lista de compras" title="Lista de compras"><ShoppingBasket size={20}/>{shoppingCount > 0 && <span className="header-count">{shoppingCount}</span>}</a>
          <button type="button" className="mobile-menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen}>{mobileOpen ? <X/> : <Menu/>}</button>
        </div>
      </div>
    </header>
    {mobileOpen && <nav className="mobile-nav" aria-label="Navegação para celular">{links.map(([page,label]) => <a key={page} href={`#/${page}`}>{label}<ArrowUpRight size={16}/></a>)}<a href="#/compras">Lista de compras <ShoppingBasket size={17}/></a></nav>}
  </>
}

export function Footer() {
  return <footer className="footer">
    <div className="container footer-top">
      <div>
        <div className="eyebrow eyebrow--light"><span className="eyebrow-line"/> UMA EXPERIÊNCIA DIGITAL FEITA COM CUIDADO</div>
        <h2>Gostou deste cantinho?<br/><em>Vamos criar o seu.</em></h2>
        <p>Sites e experiências digitais com identidade, detalhes e personalidade.</p>
        <a className="btn btn--cream footer-contact" href="mailto:luanafigueiredo.dev@gmail.com?subject=Quero%20conversar%20sobre%20um%20projeto">Fale comigo <ArrowUpRight size={18}/></a>
      </div>
      <div className="footer-aside"><span className="footer-stamp"><Leaf size={70} strokeWidth={1}/></span><span>UM PROJETO DE<br/><b>LUANA FIGUEIREDO</b></span><a href="mailto:luanafigueiredo.dev@gmail.com">luanafigueiredo.dev@gmail.com</a></div>
    </div>
    <div className="container footer-bottom"><Brand light/><span>Receitas para guardar. Ideias para compartilhar.</span><a href="#/inicio">Voltar ao início ↑</a></div>
  </footer>
}

export function EmptyState({ icon: Icon = BookOpen, title, text, href = '#/receitas', action = 'Explorar receitas' }) {
  return <div className="empty-state"><div className="empty-state__icon"><Icon size={30}/></div><h3>{title}</h3><p>{text}</p><a className="btn btn--dark" href={href}>{action}<ArrowUpRight size={16}/></a></div>
}

export function SectionIntro({ overline, title, accent, text }) {
  return <div className="page-intro container"><div className="eyebrow"><span className="eyebrow-line"/>{overline}</div><h1>{title} <em>{accent}</em></h1><p>{text}</p></div>
}

import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react'

import { recipes } from '../data/recipes'
import RecipeCover from '../components/RecipeCover'
import RecipeCard from '../components/RecipeCard'
import { EmptyState } from '../components/Shell'
import { normalize } from '../lib/utils'

const categories = ['Todas', 'Confeitaria', 'Pães & café', 'Pratos principais', 'Entradas']
const featuredPastry = ['torta-de-limao-brasileira', 'bolo-red-velvet', 'brioche-frances', 'brownie-americano']
const pick = id => recipes.find(recipe => recipe.id === id)

const featuredImages = {
  'bolo-red-velvet': `${import.meta.env.BASE_URL}images/featured-red-velvet.png`,
  'brioche-frances': `${import.meta.env.BASE_URL}images/featured-brioche.png`,
  'torta-de-limao-brasileira': `${import.meta.env.BASE_URL}images/featured-lemon-tart.png`,
}

function Hero({ onSearch }) {
  const heroMain = pick('bolo-red-velvet')
  const heroSmall = pick('brioche-frances')

  return <section className="hero">
    <div className="container hero-grid">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line"/> O CADERNO DE RECEITAS QUE VOCÊ VAI QUERER GUARDAR</div>
        <h1>Histórias que<br/>começam <em>na cozinha.</em></h1>
        <p>Um espaço para experimentar, aprender e descobrir novos sabores. Com um carinho especial por tudo que sai do forno.</p>
        <div className="hero-actions"><a className="btn btn--dark" href="#/receitas">Explorar receitas <ArrowUpRight size={18}/></a><a href="#/confeitaria" className="text-link">Apaixone-se pela confeitaria <ArrowRight size={16}/></a></div>
        <div className="hero-proof"><span className="hero-proof__flower">✳</span><span><b>200 receitas para descobrir</b><small>100 brasileiras · 100 do mundo</small></span></div>
      </div>
      <div className="hero-visual">
        <a className="hero-photo hero-photo--main hero-photo-card" href={`#/receita/${heroMain.id}`} aria-label={`Abrir receita de ${heroMain.title}`}>
          <img src={featuredImages[heroMain.id]} alt="" loading="eager"/>
          <div className="hero-photo__fade"/>
          <div className="hero-photo__overlay">
            <span className="hero-photo__eyebrow">CONFEITARIA / MUNDO</span>
            <strong className="hero-photo__title">{heroMain.title}</strong>
            <span className="hero-photo__meta">RECEITAS · TÉCNICAS · AFETO <b>{Math.floor(heroMain.time / 60)}h {String(heroMain.time % 60).padStart(2, '0')}min</b></span>
          </div>
          <span className="hero-photo__caption">01 / DO NOSSO CADERNO</span>
        </a>
        <a className="hero-photo hero-photo--small hero-photo-card hero-photo-card--small" href={`#/receita/${heroSmall.id}`} aria-label={`Abrir receita de ${heroSmall.title}`}>
          <img src={featuredImages[heroSmall.id]} alt="" loading="eager"/>
          <div className="hero-photo__fade"/>
          <div className="hero-photo__overlay hero-photo__overlay--small">
            <span className="hero-photo__eyebrow">PÃES & CAFÉ / MUNDO</span>
            <strong className="hero-photo__title">{heroSmall.title}</strong>
          </div>
        </a>
        <div className="hero-sticker"><span>feito com</span><strong>carinho</strong><span>✳ & vontade</span></div>
        <div className="hero-visual__label">BASIL KITCHEN STORIES — VOL. 01</div>
      </div>
    </div>
    <div className="hero-bottom container"><span>CONFEITARIA · AFETO · DESCOBERTA</span><a href="#/confeitaria">Descubra o lado doce <ArrowDown size={15}/></a></div>
  </section>
}

function IntroRibbon() {
  return <div className="ribbon"><div className="container ribbon-inner"><span>✳ RECEITAS QUE ACOLHEM</span><span>✦ UM TOQUE DE CONFEITARIA</span><span>✳ INGREDIENTES DE VERDADE</span><span>✦ FEITO PARA COMPARTILHAR</span></div></div>
}

function FeaturedPhotoCard({ recipe, image, isFavorite, onToggleFavorite }) {
  return <article className="recipe-card recipe-card--feature-photo">
    <a href={`#/receita/${recipe.id}`} className="recipe-card__feature-link" aria-label={`Abrir receita de ${recipe.title}`}>
      <span className="recipe-card__feature-media">
        <img src={image} alt="" loading="lazy"/>
      </span>
      <span className="recipe-card__feature-content">
        <span className="recipe-card__feature-brand">basil <small>· KITCHEN STORIES</small></span>
        <span className="recipe-card__feature-category">{recipe.category}</span>
        <span className="recipe-card__feature-kicker">{recipe.origin === 'Brasil' ? 'DO NOSSO BRASIL' : 'SABORES DO MUNDO'} / {recipe.tags?.[0] || 'RECEITA'}</span>
        <strong className="recipe-card__feature-title">{recipe.title}</strong>
        <span className="recipe-card__feature-description">{recipe.description}</span>
      </span>
      <span className="recipe-card__feature-footer">
        <span>{recipe.time <= 60 ? `${recipe.time} min` : `${Math.floor(recipe.time / 60)}h ${String(recipe.time % 60).padStart(2, '0')}min`}</span>
        <span>LER RECEITA <ArrowUpRight size={18} strokeWidth={1.7}/></span>
      </span>
    </a>
    <button
      type="button"
      className={`favorite-button ${isFavorite ? 'is-active' : ''}`}
      onClick={() => onToggleFavorite(recipe.id)}
      aria-label={isFavorite ? `Remover ${recipe.title} dos favoritos` : `Salvar ${recipe.title} nos favoritos`}
      aria-pressed={isFavorite}
    >
      ♥
    </button>
  </article>
}

function PastryFeature({ favorites, onToggleFavorite }) {
  const items = featuredPastry.map(pick)
  return <section className="pastry-section" id="especial-confeitaria">
    <div className="container">
      <div className="section-heading section-heading--split">
        <div><div className="eyebrow"><span className="eyebrow-line"/> O CAPÍTULO MAIS DOCE</div><h2>Confeitaria é <em>um jeito<br/>de demonstrar carinho.</em></h2></div>
        <div className="section-heading__right"><p>Da massa perfeita ao último detalhe da cobertura. Aqui, cada preparo tem seu tempo — e sua história.</p><a className="text-link" href="#/escola">Conhecer a Escola <ArrowUpRight size={17}/></a></div>
      </div>
      <div className="pastry-grid">
        <div className="pastry-spotlight"><a href="#/receita/torta-de-limao-brasileira"><img src={featuredImages['torta-de-limao-brasileira']} alt="" className="pastry-spotlight__img" loading="lazy"/><div className="pastry-spotlight__shade"/><span className="spotlight-label">RECEITA EM DESTAQUE / 01</span><div className="spotlight-text"><span>UM CLÁSSICO IRRESISTÍVEL</span><h3>Torta de<br/><em>limão.</em></h3><span className="round-arrow"><ArrowUpRight size={24}/></span></div></a></div>
        <div className="pastry-side-cards">{items.slice(1, 3).map(recipe => <FeaturedPhotoCard key={recipe.id} recipe={recipe} image={featuredImages[recipe.id]} isFavorite={favorites.includes(recipe.id)} onToggleFavorite={onToggleFavorite}/> )}</div>
      </div>
    </div>
  </section>
}

function KitchenNote() {
  return <section className="kitchen-note"><div className="container kitchen-note__inner">
    <div className="kitchen-note__art"><div className="kitchen-note__frame"><span className="kitchen-note__scribble">“</span><strong>O segredo de uma boa receita<br/>é o cuidado com cada etapa.</strong><span>— ANOTAÇÕES DA COZINHA</span></div></div>
    <div className="kitchen-note__text"><div className="eyebrow"><span className="eyebrow-line"/> NOTAS DA COZINHA</div><h2>Pequenos detalhes.<br/><em>Grandes resultados.</em></h2><p>Temperatura dos ingredientes, medidas certas, paciência com a massa. Na confeitaria, técnica e sensibilidade caminham lado a lado.</p><a href="#/escola" className="btn btn--outline">Explorar a Escola <ArrowRight size={16}/></a></div>
  </div></section>
}

function RecipeExplorer({ favorites, onToggleFavorite, pastryOnly = false, title = 'Receitas para todos os momentos' }) {
  const [category, setCategory] = useState(pastryOnly ? 'Confeitaria' : 'Todas')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('destaques')
  const [duration, setDuration] = useState('todos')
  const [origin,setOrigin] = useState('Todas')
  const [diet,setDiet] = useState('Todas')
  const [activeOnly,setActiveOnly] = useState(false)
  const [visible, setVisible] = useState(12)
  useEffect(() => { setCategory(pastryOnly ? 'Confeitaria' : 'Todas'); setVisible(12) }, [pastryOnly])
  const results = useMemo(() => {
    let list = recipes.filter(recipe => category === 'Todas' || recipe.category === category)
    if (origin !== 'Todas') list = list.filter(recipe => recipe.origin === origin)
    if (diet !== 'Todas') list = list.filter(recipe => diet==='Vegetarianas' ? ['Vegetariana','Vegana'].includes(recipe.diet) : recipe.diet === diet)
    if (activeOnly) list = list.filter(recipe=>recipe.active)
    if (query.trim()) {
      const q = normalize(query)
      list = list.filter(recipe => normalize([recipe.title, recipe.description, recipe.category, ...recipe.tags, ...recipe.ingredients.map(ingredient => ingredient.name)].join(' ')).includes(q))
    }
    if (duration === 'ate30') list = list.filter(recipe => recipe.time <= 30)
    if (duration === 'ate60') list = list.filter(recipe => recipe.time <= 60)
    return [...list].sort((a,b) => sort === 'az' ? a.title.localeCompare(b.title,'pt-BR') : sort === 'rapidas' ? a.time-b.time : Number(b.featured)-Number(a.featured))
  }, [category, query, sort, duration, origin, diet, activeOnly])
  return <section className="explore-section" id="receitas">
    <div className="container">
      <div className="section-heading"><div className="eyebrow"><span className="eyebrow-line"/> ENCONTRE SUA PRÓXIMA RECEITA</div><h2>{title.split('|')[0]} <em>{title.split('|')[1] || ''}</em></h2><p>Escolha pelo sabor, pelo tempo ou pelo que já tem na cozinha.</p></div>
      <div className="recipe-toolbar">
        <label className="search-field"><Search size={18}/><input type="search" placeholder="Buscar receita, ingrediente ou país..." aria-label="Buscar receita ou ingrediente" value={query} onChange={event => { setQuery(event.target.value); setVisible(12) }}/>{query && <button type="button" onClick={() => setQuery('')} aria-label="Limpar busca"><X size={16}/></button>}</label>
        <div className="recipe-toolbar__selects"><label><SlidersHorizontal size={16}/><select value={duration} onChange={event => {setDuration(event.target.value);setVisible(12)}} aria-label="Filtrar por tempo"><option value="todos">Qualquer tempo</option><option value="ate30">Até 30 min</option><option value="ate60">Até 1 hora</option></select><ChevronDown size={15}/></label><label><select value={sort} onChange={event=>setSort(event.target.value)} aria-label="Ordenar receitas"><option value="destaques">Destaques</option><option value="rapidas">Mais rápidas</option><option value="az">Nome A–Z</option></select><ChevronDown size={15}/></label></div>
      </div>
      <div className="recipe-extra-filters">
        <label>Origem<select value={origin} onChange={e=>{setOrigin(e.target.value);setVisible(12)}}><option value="Todas">Brasil e mundo</option><option value="Brasil">Brasileiras</option><option value="Mundo">Internacionais</option></select></label>
        <label>Alimentação<select value={diet} onChange={e=>{setDiet(e.target.value);setVisible(12)}}><option value="Todas">Todas</option><option value="Vegana">Veganas</option><option value="Vegetarianas">Vegetarianas (incluindo veganas)</option><option value="Vegetariana">Ovolactovegetarianas</option></select></label>
        <label className="active-filter"><input type="checkbox" checked={activeOnly} onChange={e=>{setActiveOnly(e.target.checked);setVisible(12)}}/> BASIL ACTIVE</label>
      </div>
      <div className="category-tabs" role="group" aria-label="Filtrar por categoria">{categories.map(item => <button key={item} type="button" className={category === item ? 'active' : ''} onClick={() => {setCategory(item);setVisible(12)}}>{item}{item==='Confeitaria' && <span>✳</span>}</button>)}</div>
      <div className="result-count"><span>{results.length} {results.length === 1 ? 'receita encontrada' : 'receitas encontradas'}</span>{(query || category !== 'Todas' || duration !== 'todos' || origin !== 'Todas' || diet !== 'Todas' || activeOnly) && <button type="button" onClick={()=>{setQuery('');setCategory(pastryOnly?'Confeitaria':'Todas');setDuration('todos');setOrigin('Todas');setDiet('Todas');setActiveOnly(false);setVisible(12)}}>Limpar filtros <X size={14}/></button>}</div>
      {results.length ? <><div className="recipe-grid">{results.slice(0,visible).map(recipe => <RecipeCard key={recipe.id} recipe={recipe} isFavorite={favorites.includes(recipe.id)} onToggleFavorite={onToggleFavorite}/>)}</div>{results.length > visible && <div className="load-more"><button type="button" className="btn btn--outline" onClick={()=>setVisible(v=>v+12)}>Ver mais receitas <ArrowDown size={16}/></button><span>Mostrando {Math.min(visible,results.length)} de {results.length}</span></div>}</> : <EmptyState icon={Search} title="Ainda não encontramos essa combinação" text="Tente outro ingrediente ou remova um dos filtros." href="#/despensa" action="Buscar pela despensa"/>}
    </div>
  </section>
}

function AcademyFeature(){return <section className="academy-feature"><div className="container academy-feature-inner"><div><div className="eyebrow"><span className="eyebrow-line"/> ESCOLA DE CONFEITARIA</div><h2>Aprenda o <em>porquê</em><br/>de cada preparo.</h2><p>30 aulas organizadas em seis módulos: ingredientes, massas, cremes, chocolate, acabamento e panificação doce.</p><a href="#/escola" className="btn btn--dark">Entrar na escola <ArrowRight size={17}/></a></div><div className="academy-feature-stamp"><span>6 MÓDULOS</span><strong>30</strong><em>aulas</em><small>BASIL ACADEMY</small></div></div></section>}

export function Home({ route, favorites, onToggleFavorite }) {
  const isArchive = route !== 'inicio'
  useEffect(()=>{
    if (route === 'receitas' || route === 'confeitaria') {
      const t = window.setTimeout(()=>window.scrollTo({ top: 0, behavior: 'instant' }),30)
      return ()=>clearTimeout(t)
    }
  },[route])
  return <main>
    {!isArchive && <><Hero/><IntroRibbon/><PastryFeature favorites={favorites} onToggleFavorite={onToggleFavorite}/><KitchenNote/><AcademyFeature/></>}
    {isArchive && <section className={`archive-hero ${route === 'confeitaria'?'archive-hero--pastry':''}`}><div className="container archive-hero__inner"><div className="eyebrow"><span className="eyebrow-line"/>{route==='confeitaria'?'UM UNIVERSO DE DOÇURA':'O ACERVO BASIL'}</div><h1>{route==='confeitaria' ? <>Um carinho especial pela <em>confeitaria.</em></> : <>Para cada vontade,<br/><em>uma receita.</em></>}</h1><p>{route==='confeitaria' ? 'Bolos, tortas, massas doces e pequenos segredos para acertar o ponto.' : 'Explore sabores, descubra novas combinações e salve seus favoritos.'}</p><span className="archive-hero__deco">✳</span></div></section>}
    <RecipeExplorer key={route} favorites={favorites} onToggleFavorite={onToggleFavorite} pastryOnly={route==='confeitaria'} title={route==='confeitaria'?'Do nosso forno |para a sua mesa.':'Receitas para |todos os momentos.'}/>
    {!isArchive && <section className="pantry-promo"><div className="container pantry-promo__inner"><div><div className="eyebrow"><span className="eyebrow-line"/> UMA IDEIA PARA HOJE</div><h2>Abriu o armário e não sabe<br/><em>o que preparar?</em></h2><p>Conte o que tem na despensa. O BASIL mostra as receitas que mais combinam com seus ingredientes.</p><a href="#/despensa" className="btn btn--dark">Explorar minha despensa <ArrowUpRight size={18}/></a></div></div></section>}
  </main>
}

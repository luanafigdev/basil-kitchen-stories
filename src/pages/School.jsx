import { useMemo, useState } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  Search
} from 'lucide-react'
import { lessons } from '../data/lessons'
import { lessonPreparations } from '../data/lessonPreparations'
import { useStoredState } from '../lib/storage'

const modules = [
  'Fundamentos',
  'Massas e bolos',
  'Cremes e recheios',
  'Chocolateria',
  'Decoração',
  'Panificação doce'
]

const moduleNotes = {
  Fundamentos: 'Precisão, ingredientes e a organização de uma bancada profissional.',
  'Massas e bolos': 'Estrutura, aeração e texturas que transformam boas massas.',
  'Cremes e recheios': 'Bases clássicas e controle de textura, calor e emulsão.',
  Chocolateria: 'Do cacau à temperagem, com técnica e atenção ao detalhe.',
  Decoração: 'Acabamento delicado, montagem segura e identidade visual.',
  'Panificação doce': 'Fermentação, massas enriquecidas e paciência de artesão.'
}

const practiceCount = Object.keys(lessonPreparations).length

function Preparation({ lesson }) {
  const preparation = lessonPreparations[lesson.id]

  if (!preparation) {
    return (
      <section className="school-study-exercise">
        <div className="eyebrow"><span className="eyebrow-line"/> CADERNO DE PRÁTICA</div>
        <h3>Exercício de laboratório</h3>
        <p>{lesson.exercise}</p>
        <small>Registre suas observações sobre textura, tempo e resultado. Algumas aulas são conceituais e não exigem uma receita-base.</small>
      </section>
    )
  }

  return (
    <section className="school-practical" id="laboratorio">
      <div className="school-practical-head">
        <div className="eyebrow"><span className="eyebrow-line"/> RECEITA-BASE · LABORATÓRIO BASIL</div>
        <h3>{preparation.name}</h3>
        <div className="school-practical-meta">
          <span>{preparation.yield}</span>
          <span>{preparation.time}</span>
        </div>
      </div>
      <div className="school-practical-grid">
        <div className="school-practical-ingredients">
          <h4>Ingredientes pesados</h4>
          <ul>{preparation.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>
        </div>
        <div className="school-practical-method">
          <h4>Modo de preparo</h4>
          <ol>{preparation.steps.map((step, index) => (
            <li key={index}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </li>
          ))}</ol>
        </div>
      </div>
      <div className="school-practical-notes">
        <h4>Temperatura, ponto & conservação</h4>
        <p>{preparation.temperature}</p>
        <ul>{preparation.notes.map((note, index) => <li key={index}>{note}</li>)}</ul>
      </div>
      {preparation.sources?.length > 0 && (
        <p className="school-practical-sources">
          Referências técnicas: {preparation.sources.map((url, index) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer">Fonte {index + 1}</a>
          ))}. Fórmula editorial para estudo; não certificada por teste de cozinha.
        </p>
      )}
    </section>
  )
}

export function School() {
  const [done, setDone] = useStoredState('basil:school:completed:v1', [])
  const [active, setActive] = useState(null)
  const [search, setSearch] = useState('')
  const [module, setModule] = useState('Todos')

  const lesson = lessons.find(item => item.id === active)
  const items = useMemo(() => lessons.filter(item => (
    (module === 'Todos' || item.module === module) &&
    `${item.title} ${item.summary} ${item.module}`.toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR'))
  )), [module, search])
  const completedCount = lessons.filter(item => done.includes(item.id)).length
  const percentage = Math.round(100 * completedCount / lessons.length)
  const index = lesson ? lessons.findIndex(item => item.id === lesson.id) : -1
  const next = lessons[index + 1]

  const openLesson = id => {
    setActive(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const back = () => {
    setActive(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const toggleLesson = id => {
    setDone(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  }

  return (
    <main className="school-page">
      {!lesson ? (
        <>
          <section className="school-hero">
            <div className="container school-hero-grid">
              <div>
                <div className="eyebrow"><span className="eyebrow-line"/> BASIL ACADEMY · APRENDA COM CARINHO</div>
                <h1>A arte de confeitar<br/><em>começa aqui.</em></h1>
                <p>Da primeira pesagem ao acabamento mais delicado. Uma escola para entender a técnica por trás da beleza, com fórmulas-base e prática guiada.</p>
                <button type="button" className="btn btn--dark" onClick={() => document.getElementById('aulas')?.scrollIntoView({ behavior: 'smooth' })}>
                  Explorar aulas <ArrowRight size={17}/>
                </button>
              </div>
              <div className="school-hero-art" aria-label="30 aulas de confeitaria" role="img">
                <span>CONFEITARIA<br/>COM MÉTODO</span>
                <div className="school-hero-disc" aria-hidden="true">✳</div>
                <strong>{lessons.length}</strong>
                <em>aulas para estudar</em>
              </div>
            </div>
          </section>
          <section className="school-content container" id="aulas">
            <div className="school-progress">
              <div>
                <div className="eyebrow">SEU CAMINHO NA CONFEITARIA</div>
                <h2>Aprender também é <em>um processo.</em></h2>
                <p>{completedCount} de {lessons.length} aulas concluídas · {practiceCount} fórmulas-base</p>
              </div>
              <div className="school-progress-indicator">
                <b>{percentage}%</b>
                <div className="progress-track" role="progressbar" aria-label="Progresso na Escola de Confeitaria" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
                  <span style={{ width: `${percentage}%` }}/>
                </div>
                <small>Seu progresso fica salvo neste navegador.</small>
              </div>
            </div>
            <div className="school-controls">
              <label className="search-field">
                <Search size={17}/>
                <input type="search" placeholder="Pesquisar técnica ou aula..." aria-label="Pesquisar aulas" value={search} onChange={event => setSearch(event.target.value)}/>
              </label>
              <div className="school-module-tabs" role="group" aria-label="Filtrar por módulo">
                {['Todos', ...modules].map(name => (
                  <button key={name} className={module === name ? 'selected' : ''} type="button" aria-pressed={module === name} onClick={() => setModule(name)}>{name}</button>
                ))}
              </div>
            </div>
            <div className="school-modules">
              {modules.map((name, moduleIndex) => {
                const listed = items.filter(item => item.module === name)
                const completed = lessons.filter(item => item.module === name && done.includes(item.id)).length
                if (!listed.length) return null
                return (
                  <section key={name} className="school-module">
                    <div className="school-module-head">
                      <span>MÓDULO {String(moduleIndex + 1).padStart(2, '0')} · {completed} DE 5 CONCLUÍDAS</span>
                      <h3>{name}</h3>
                      <p>{moduleNotes[name]}</p>
                    </div>
                    <div className="school-lesson-list">
                      {listed.map(item => (
                        <button className="school-lesson-link" key={item.id} type="button" onClick={() => openLesson(item.id)}>
                          <span className="school-lesson-number">{done.includes(item.id) ? <Check size={18}/> : String(lessons.indexOf(item) + 1).padStart(2, '0')}</span>
                          <span className="school-lesson-label"><b>{item.title}</b><small>{item.summary}</small></span>
                          <ArrowRight size={17}/>
                        </button>
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
            {items.length === 0 && <p className="school-empty-results">Não encontramos aulas com esse termo.</p>}
          </section>
        </>
      ) : (
        <section className="school-content school-content--lesson container">
          <article className="school-lesson">
            <button className="school-back" type="button" onClick={back}><ArrowLeft size={17}/> Voltar às aulas</button>
            <div className="eyebrow"><span className="eyebrow-line"/> {lesson.module.toUpperCase()} · AULA {String(index + 1).padStart(2, '0')} / {lessons.length}</div>
            <h2>{lesson.title}</h2>
            <p className="school-lesson-summary">{lesson.summary}</p>
            <div className="school-lesson-panels">
              <section><BookOpen size={22}/><h3>Entenda a técnica</h3><p>{lesson.principle}</p></section>
              <section><Lightbulb size={22}/><h3>Coloque em prática</h3><p>{lesson.exercise}</p></section>
              <section><AlertCircle size={22}/><h3>Erro comum</h3><p>{lesson.mistake}</p></section>
            </div>
            <Preparation lesson={lesson}/>
            <div className="school-check"><span>REVISÃO DA AULA</span><p>{lesson.question}</p></div>
            <div className="school-lesson-actions">
              <button className="btn btn--dark" type="button" onClick={() => toggleLesson(lesson.id)}>
                {done.includes(lesson.id) ? <Check size={17}/> : <CheckCircle2 size={17}/>}
                {done.includes(lesson.id) ? 'Marcar como não concluída' : 'Marcar aula como concluída'}
              </button>
              {next && <button className="btn btn--outline" type="button" onClick={() => openLesson(next.id)}>Próxima aula <ArrowRight size={17}/></button>}
            </div>
          </article>
        </section>
      )}
      <section className="school-disclaimer">
        <div className="container"><GraduationCap size={26}/><p>A BASIL Academy é um material de estudo, não uma certificação profissional. Siga as orientações de higiene, manipulação segura e conservação dos alimentos.</p></div>
      </section>
    </main>
  )
}

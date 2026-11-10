import { useEffect, useState } from 'react'
import { CheckCircle2, X } from 'lucide-react'

import { allRecipes } from './data/allRecipes'
import { useHashRoute, useStoredState } from './lib/storage'
import { Header, Footer, EmptyState } from './components/Shell'
import { Home } from './pages/Home'
import { RecipeDetail } from './pages/RecipeDetail'
import { SavedPage, PantryPage, ShoppingPage } from './pages/Cabinet'
import { School } from './pages/School'

const pick = id => allRecipes.find(recipe => recipe.id === id)

function NotFound() {
  return <main className="internal-page"><div className="container"><EmptyState title="Essa receita não está no caderno" text="Pode ser que o endereço tenha mudado. Explore nosso acervo."/></div></main>
}

export default function App() {
  const route = useHashRoute()
  const [favorites, setFavorites] = useStoredState('basil:favorites:v1',[])
  const [chosen,setChosen] = useStoredState('basil:shopping:recipes:v1',[])
  const [extras,setExtras] = useStoredState('basil:shopping:extras:v1',[])
  const [checkedItems,setCheckedItems] = useStoredState('basil:shopping:checked:v1',[])
  const [notes,setNotes] = useStoredState('basil:notes:v1',{})
  const [message,setMessage] = useState('')
  useEffect(()=>{if(!message)return;const t=setTimeout(()=>setMessage(''),3300);return()=>clearTimeout(t)},[message])
  const notify = text => setMessage(text)
  const toggleFavorite = id => {const was=favorites.includes(id);setFavorites(v=>was?v.filter(x=>x!==id):[...v,id]);notify(was?'Receita removida dos favoritos.':'Receita salva no seu caderno.')}
  const addShopping = (recipeId,portions) => {setChosen(v=>[...v.filter(x=>x.recipeId!==recipeId),{recipeId,portions}]);setCheckedItems([]);notify('Ingredientes adicionados à lista de compras.')}
  const [section,id] = route.split('/')
  const recipe = section==='receita'?pick(id):null
  let page
  if(['inicio','receitas','confeitaria'].includes(section)) page=<Home route={section} favorites={favorites} onToggleFavorite={toggleFavorite}/>
  else if(section==='receita'&&recipe) page=<RecipeDetail key={recipe.id} recipe={recipe} favorite={favorites.includes(recipe.id)} favoriteIds={favorites} onToggleFavorite={toggleFavorite} onAddShopping={addShopping} notes={notes} setNotes={setNotes} notify={notify}/>
  else if(section==='escola') page=<School/>
  else if(section==='despensa') page=<PantryPage favorites={favorites} onToggleFavorite={toggleFavorite}/>
  else if(section==='caderno') page=<SavedPage favorites={favorites} onToggleFavorite={toggleFavorite} notes={notes}/>
  else if(section==='compras') page=<ShoppingPage chosen={chosen} setChosen={setChosen} extras={extras} setExtras={setExtras} checkedItems={checkedItems} setCheckedItems={setCheckedItems} notify={notify}/>
  else page=<NotFound/>
  return <><Header route={section} favoriteCount={favorites.length} shoppingCount={chosen.length+extras.length}/>{page}<Footer/>{message&&<div className="toast" role="status"><CheckCircle2 size={18}/>{message}<button type="button" onClick={()=>setMessage('')} aria-label="Fechar aviso"><X size={16}/></button></div>}</>
}

import { formatDuration } from '../lib/utils'

export function getRecipeTone(recipe) {
  if (recipe.category === 'Confeitaria') return 'sweet'
  if (recipe.category === 'Pães & café') return 'bread'
  if (recipe.category === 'Pratos principais') return 'savory'
  return 'fresh'
}

export default function RecipeCover({ recipe, className = '' }) {
  const tone = getRecipeTone(recipe)
  return (
    <div className={`recipe-cover recipe-cover--${tone} ${className}`} aria-label={`Capa editorial de ${recipe.title}`}>
      <div className="recipe-cover__masthead" aria-hidden="true">
        <span className="recipe-cover__brand">basil</span>
        <span className="recipe-cover__series">KITCHEN STORIES</span>
      </div>
      <div className="recipe-cover__story">
        <span className="recipe-cover__eyebrow">{recipe.category} / {recipe.origin === 'Brasil' ? 'Brasil' : 'Mundo'}</span>
        <strong className="recipe-cover__title">{recipe.title}</strong>
        <span className="recipe-cover__subtitle">{recipe.tags?.[0] || 'Uma história para cozinhar'}</span>
      </div>
      <div className="recipe-cover__foot">
        <span>RECEITAS · TÉCNICAS · AFETO</span>
        <span>{formatDuration(recipe.time)}</span>
      </div>
    </div>
  )
}

import { ArrowUpRight, Clock3, Heart } from 'lucide-react'
import { formatDuration } from '../lib/utils'
import { getRecipeTone } from './RecipeCover'

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite, wide = false }) {
  return (
    <article className={`recipe-card recipe-card--editorial recipe-card--${getRecipeTone(recipe)} ${wide ? 'recipe-card--wide' : ''}`}>
      <a href={`#/receita/${recipe.id}`} className="recipe-card__editorial-link" aria-label={`Abrir receita de ${recipe.title}`}>
        <span className="recipe-card__editorial-header">
          <span className="recipe-card__editorial-brand">basil <small>· KITCHEN STORIES</small></span>
          <span className="recipe-card__editorial-category">{recipe.category}</span>
        </span>
        <span className="recipe-card__editorial-content">
          <span className="recipe-card__editorial-kicker">{recipe.origin === 'Brasil' ? 'DO NOSSO BRASIL' : 'SABORES DO MUNDO'} / {recipe.tags?.[0] || 'RECEITA'}</span>
          <strong className="recipe-card__editorial-title">{recipe.title}</strong>
          <span className="recipe-card__editorial-description">{recipe.description}</span>
        </span>
        <span className="recipe-card__editorial-footer">
          <span><Clock3 size={14} strokeWidth={1.7}/>{formatDuration(recipe.time)}</span>
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
        <Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
    </article>
  )
}

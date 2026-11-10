import { recipes } from './recipes'
import { legacyRecipes } from './legacyRecipes'

export const allRecipes = [...recipes, ...legacyRecipes.filter(item => !recipes.some(recipe => recipe.id === item.id))]

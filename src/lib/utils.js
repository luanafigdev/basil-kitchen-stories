export function normalize(value = '') {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim()
}

export function formatAmount(value) {
  if (Number.isInteger(value)) return String(value)
  return value.toLocaleString('pt-BR', { maximumFractionDigits: value < 10 ? 2 : 1 })
}

export function ingredientAmount(ingredient, portions, basePortions) {
  const value = ingredient.amount * portions / basePortions
  return `${formatAmount(Math.round(value * 100) / 100)} ${ingredient.unit}`
}

export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h}h ${String(m).padStart(2, '0')}min` : `${h}h`
}

export function getImageUrl(recipe, width = 800) {
  if (!recipe.photo || recipe.imageStatus !== 'photograph') return null
  if (/^https:\/\//.test(recipe.photo)) return recipe.photo
  if (recipe.photo.startsWith("local:")) return `${import.meta.env.BASE_URL}assets/${recipe.photo.slice(6)}`
  return `https://images.unsplash.com/${recipe.photo}?auto=format&fit=crop&w=${width}&q=80`
}

export function printShoppingList(entries) {
  return `BASIL — Lista de compras\n\n${entries.map(({ name, quantity, unit }) => `☐ ${quantity ? `${formatAmount(quantity)} ${unit} — ` : ''}${name}`).join('\n')}\n\nFeito com carinho no BASIL.`
}

export function aggregateShopping(recipes, chosen, extras = []) {
  const grouped = new Map()
  for (const { recipeId, portions } of chosen) {
    const recipe = recipes.find(item => item.id === recipeId)
    if (!recipe) continue
    for (const ingredient of recipe.ingredients) {
      const key = `${normalize(ingredient.name)}:${ingredient.unit}`
      const current = grouped.get(key) || { id: key, name: ingredient.name, unit: ingredient.unit, quantity: 0 }
      current.quantity += ingredient.amount * portions / recipe.portions
      grouped.set(key, current)
    }
  }
  const all = [...grouped.values()].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  return [...all, ...extras.map(item => ({ id: `extra:${item.id}`, name: item.name, quantity: 0, unit: '' }))]
}

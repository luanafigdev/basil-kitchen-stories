import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const paths = [
  'src/components/RecipeCard.jsx',
  'src/components/RecipeCover.jsx',
  'src/pages/RecipeDetail.jsx',
  'src/pages/Cabinet.jsx',
]

for (const file of paths) {
  const source = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
  assert.ok(!/<img\b/i.test(source), `${file}: image element found`)
  assert.ok(!/photoService|RecipePhoto|PhotoAttribution/.test(source), `${file}: old photo workflow found`)
}

const home = readFileSync(new URL('../src/pages/Home.jsx', import.meta.url), 'utf8')
assert.ok(home.includes('featuredImages'))
assert.ok(home.includes('FeaturedPhotoCard'))
assert.ok(!/photoService|RecipePhoto|PhotoAttribution/.test(home))

const covers = readFileSync(new URL('../src/components/RecipeCover.jsx', import.meta.url), 'utf8')
assert.ok(covers.includes('recipe-cover--${tone}'))

const cards = readFileSync(new URL('../src/components/RecipeCard.jsx', import.meta.url), 'utf8')
assert.ok(cards.includes('recipe-card__editorial-link'))
assert.ok(cards.includes('onToggleFavorite(recipe.id)'))

const school = readFileSync(new URL('../src/pages/School.jsx', import.meta.url), 'utf8')
assert.ok(school.includes('school-practical'))
assert.ok(school.includes('school-hero-art'))

console.log('BASIL: fotos restritas aos destaques da home; catálogo editorial, Escola e favoritos preservados.')

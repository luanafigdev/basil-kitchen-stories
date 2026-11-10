import assert from 'node:assert/strict'
import { recipes } from '../src/data/recipes.js'
import { lessons } from '../src/data/lessons.js'
import { lessonPreparations } from '../src/data/lessonPreparations.js'
import { aggregateShopping, formatAmount, normalize } from '../src/lib/utils.js'

assert.equal(recipes.length, 200)
assert.equal(recipes.filter(r => r.origin === 'Brasil').length, 100)
assert.equal(recipes.filter(r => r.origin === 'Mundo').length, 100)
assert.equal(new Set(recipes.map(r => r.id)).size, 200)
assert.equal(lessons.length, 30)
assert.equal(new Set(lessons.map(l => l.module)).size, 6)
assert.ok(recipes.every(r=>r.ingredients.length>=3 && r.ingredients.every(i => i.amount>0 && i.name && i.unit)))
assert.ok(recipes.every(r=>r.steps.length>=3 && r.steps.every(s=>s.trim().length>=30)))
assert.ok(recipes.every(r=>r.timing.total===r.timing.active+r.timing.cooking+r.timing.rest))
assert.ok(recipes.every(r=>r.portions>0&&r.time===r.timing.total))
assert.ok(recipes.every(r=>r.substitutions.length>0))
assert.equal(Object.keys(lessonPreparations).length,12)
assert.ok(Object.entries(lessonPreparations).every(([id,r])=>lessons.some(l=>l.id===id)&&r.ingredients.length>=2&&r.steps.length>=3&&r.notes.length>=2))
assert.equal(recipes.find(r=>r.title==='Lasanha de berinjela').diet,'Vegetariana')
assert.equal(recipes.find(r=>r.title==='Moqueca de banana-da-terra').diet,'Vegana')
assert.equal(recipes.find(r=>r.title==='Brigadeiro vegano').diet,'Vegana')
assert.equal(recipes.find(r=>r.title==='Feijoada tradicional').diet,'Tradicional')
assert.equal(recipes.find(r=>r.title==='Manjar branco com calda de ameixa').diet,'Vegetariana')
assert.equal(recipes.filter(r=>r.diet==='Vegana').length>=40,true)
assert.equal(recipes.filter(r=>r.diet==='Vegetariana').length>=40,true)
assert.ok(recipes.filter(r=>r.active).length>=40)
assert.equal(normalize('AÇÚCAR'), 'acucar')
assert.equal(formatAmount(1.5),'1,5')
const chosen = [
 {recipeId:'bolo-red-velvet',portions:24},
 {recipeId:'brownie-americano',portions:9}
]
const list = aggregateShopping(recipes,chosen)
assert.equal(list.find(x=>x.name==='Farinha').quantity,560+95)
const doubled=aggregateShopping(recipes,[{recipeId:'lasanha-de-berinjela',portions:16}])
assert.equal(doubled.find(x=>x.name==='Berinjela').quantity,1800)
console.log('BASIL: 200 receitas em capas editoriais sem fotos, 30 aulas, 12 fórmulas-base, tempos e lista de compras validados.')

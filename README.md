# BASIL — Kitchen Stories

Biblioteca gastronômica com destaque para confeitaria, receitas brasileiras e internacionais, organização pessoal e escola de técnicas.

## O que inclui

- A versão 1.0 do basil era composta de 50 receitas brasileiras, foi expandido para 100 e, posteriormente, para 200.
- Projeto iniciado em 05/05/2026 e finalizado em 17/09/2026 (provavelmente será atualizado futuramente)
- 200 fichas gastronômicas: 100 brasileiras e 100 de cozinhas do mundo.
- Confeitaria em destaque, incluindo torta de limão, quindim, bolos e massas doces.
- Lasanha de berinjela, pratos baianos e opções veganas, vegetarianas e BASIL ACTIVE.
- Escola de Confeitaria com estética editorial sem fotografias: 30 aulas em seis módulos, progresso persistente e 12 fórmulas-base completas (creme de confeiteiro, ganache, chantilly, pão de ló, brioche e outras). Cada aula inclui teoria, exercício, erros frequentes e revisão.
- Preparo passo a passo, ingredientes ajustáveis, tempo ativo, cocção e espera.
- Dicas de substituição de ingredientes, incluindo alertas quando não há equivalência fiel.
- Pesquisa, filtros de origem e alimentação, favoritos, despensa, anotações e lista de compras.
- Leitura responsiva; progresso das aulas e dados pessoais salvos no navegador.
- Contato profissional no rodapé: luanafigueiredo.dev@gmail.com.



## Identidade da Escola

 módulos e aulas. As aulas com fórmula-base apresentam rendimento, duração, lista de ingredientes pesados, preparo numerado e recomendações de ponto, temperatura e conservação. Nas aulas conceituais, há exercício orientado em vez de uma receita artificial. O progresso usa a mesma chave de armazenamento das versões anteriores.


## Revisão das receitas

As 200 fichas são uma base editorial estruturada com formulações orientativas para uso doméstico. Não foram todas testadas na cozinha da DEV nem verificadas individualmente por uma pessoa especialista. Tempos são estimativas; confirme ponto, higiene e conservação, especialmente em receitas com ovos, carnes, frutos do mar, fermentação e alimentos crus. Receitas tradicionais podem variar de acordo com a região e a técnica.

## Estrutura

```
BASIL/
├── src/components/RecipeCover.jsx capas editoriais sem imagens
├── src/data/lessonPreparations.js 12 fórmulas-base ensinadas na Escola
├── src/components/              interface reutilizável
├── src/data/recipes.js           200 fichas
├── src/data/lessons.js           30 aulas
├── src/data/legacyRecipes.js    compatibilidade com favoritos antigos
├── src/pages/                   páginas da aplicação
├── src/lib/                     armazenamento e cálculos
├── REFERENCIAS_TECNICAS.md      fontes e notas da Escola
├── scripts/validate-content.mjs
├── ABRIR_BASIL.bat
└── package.json
```


O projeto usa React e Vite. 

Feito com atenção à experiência de uso, acessibilidade e manutenção do projeto.



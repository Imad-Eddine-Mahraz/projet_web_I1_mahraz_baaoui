# FitZone - site complet

Site de salles de sport (projet WEB TI504N). HTML5 + CSS3 + JavaScript, sans framework.

## Lancer le site
Ouvre `index.html` dans ton navigateur (double-clic). Aucun serveur nécessaire.

## Structure
```
css/style.css
img/logo.svg
img/slide-24h.svg
img/slide-cours.svg
img/slide-muscu.svg
index.html
js/contact.js
js/filter.js
js/main.js
js/tarifs.js
pages/a-propos.html
pages/clubs.html
pages/contact.html
pages/cours.html
pages/tarifs.html
```

## Avant de rendre
1. Remplace les noms dans `pages/a-propos.html`.
2. Valide chaque page sur https://validator.w3.org (onglet "Validate by File Upload") et `css/style.css` sur https://jigsaw.w3.org/css-validator/.
3. Fais la maquette (Figma, Miro ou papier scanné) : header, hero, grille de cartes, tableau, formulaire.
4. Un dépôt GitHub, un commit par membre, avec des messages clairs.

## À savoir expliquer en soutenance
- `defer` sur les scripts + `try/catch` : une erreur JS ne bloque pas l'affichage.
- `main.js` : menu burger (classe `open` + `aria-expanded`), carrousel (`setInterval`), `IntersectionObserver`.
- `filter.js` : un seul script filtre clubs et cours grâce aux attributs `data-*`.
- Le CSS utilise des variables (`:root`), Flexbox, Grid et une media query à 820 px.

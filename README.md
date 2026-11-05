# Les Petits Plats — moteur de recherche de recettes

> Site de recettes avec une recherche instantanée et des filtres par ingrédient, appareil et ustensile. Deux algorithmes de recherche ont été développés puis comparés en performance.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white)

**👉 Voir le site : [bartzcyril.github.io/LesPetitsPlats](https://bartzcyril.github.io/LesPetitsPlats/)**

## Sujet

Projet de formation OpenClassrooms. Un éditeur de livres de cuisine lance son site de recettes, sur le modèle de Marmiton ou 750g. Mission : développer la fonctionnalité de recherche, à partir d'un fichier de 50 recettes, en la concevant de deux façons différentes pour retenir la plus performante.

## Fonctionnalités

- **Recherche principale** dans le titre, la description et les ingrédients, dès 3 caractères
- **Filtres avancés** par ingrédients, appareils et ustensiles, avec recherche dans chaque liste
- Combinaison de plusieurs filtres sous forme d'étiquettes, retirables en un clic
- Mise à jour instantanée des recettes et des listes de filtres

## Deux algorithmes comparés

| Branche | Approche |
| --- | --- |
| `main` | Boucles natives (`for`, `while`) |
| `main2` | Programmation fonctionnelle (`filter`, `map`, `forEach`, `includes`) |

Les deux versions ont été décrites dans une fiche d'investigation (algorigrammes), puis comparées avec un outil de benchmark (JSBench) en nombre d'opérations par seconde, afin de recommander l'algorithme à conserver.

## Compétences acquises

- **Algorithmique** : conception de deux approches pour un même besoin, analyse de leur complexité
- **Mesure de performance** et argumentation d'un choix technique
- **Documentation** : fiche d'investigation de fonctionnalité avec algorigrammes
- **TypeScript** : typage des recettes et des fonctions de filtrage
- **Sécurité** des entrées utilisateur dans la recherche
- **Git** : une branche par implémentation
- **Vite** pour le développement et le build, Sass pour les styles

## Lancer le projet en local

```bash
npm install
npm run dev       # serveur de développement
npm run build     # build de production dans dist/
```

## Site

[Les Petits Plats](https://bartzcyril.github.io/LesPetitsPlats/)

## Maquette

[Maquette Figma](https://www.figma.com/file/xqeE1ZKlHUWi2Efo8r73NK/UI-Design-Les-Petits-Plats-FR?type=design&node-id=0-1&mode=design)

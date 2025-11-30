# Snake Game — Ethel

## Description du projet
Snake Game est une version modernisée du classique jeu Snake, développée pour le web. Le joueur contrôle un serpent qui grandit en mangeant de la nourriture, tout en évitant de se heurter aux murs ou à lui-même. L’interface propose plusieurs skins et une musique rétro pour une expérience immersive.

## Technologies utilisées
- **HTML5** : structure de la page
- **CSS3** : styles et mise en page, overlays et responsive design
- **JavaScript (ES6)** : logique du jeu, gestion des événements clavier, animation du serpent
- **Canvas API** : rendu graphique du serpent et de la nourriture
- **Web Audio API** : sons rétro et effets sonores

## Fonctionnalités principales
- Sélection de skins pour le serpent (néon, arc-en-ciel, normal)
- Gestion du score en temps réel
- Écran de démarrage, menu en jeu et écran de Game Over
- Pause et reprise du jeu
- Sons rétro pour les mouvements et collisions
- Responsive design pour mobile et desktop

## Lien vers la page GitHub Pages
[Voir le rendu final sur GitHub Pages](https://ton-nom-utilisateur.github.io/snake-game/)

## Nouveautés explorées
- Découverte et utilisation de la **Canvas API** pour dessiner et animer le serpent
- Application de la **Web Audio API** pour générer des sons dynamiques
- Gestion des overlays et menus interactifs avec le DOM
- Mise en place de plusieurs skins et d’un système de sélection dynamique

## Difficultés rencontrées
- Le start screen restait affiché même après avoir commencé le jeu
- Gestion correcte des collisions du serpent avec lui-même
- Synchronisation des sons avec les actions du jeu
- Mise en place d’un système de skins dynamique et visuellement correct

## Solutions apportées
- Correction des erreurs de syntaxe dans le JavaScript (`sstartBtn` → `startBtn`)
- Masquage et affichage des overlays avec `classList.add` / `remove`
- Utilisation de `setInterval` pour la boucle principale du jeu et `unshift` / `pop` pour gérer le serpent
- Tests et ajustements pour les couleurs et effets des skins
- Recherche dans la documentation MDN pour comprendre la Canvas API et Web Audio API

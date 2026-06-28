# Trouillebout Maçonnerie — site vitrine

Site vitrine 4 pages (Accueil, Services, Réalisations, Contact) construit avec
**Astro**, animé avec **GSAP** (ScrollTrigger), et dont **tout le contenu**
(textes, photos, services, chantiers, coordonnées) est éditable :

- **par une IA** (Claude, etc.) — le contenu vit dans de simples fichiers
  Markdown/JSON, lisibles et modifiables directement ;
- **par un backoffice visuel** — [Decap CMS](https://decapcms.org) sur `/admin`,
  pour une personne non technique (formulaires, pas de code).

Design recréé pixel-près à partir du handoff `design_handoff_trouillebout_site`
(couleurs, typographies Oswald/Archivo, espacements — voir le `README.md` de ce
dossier pour le détail des tokens).

## Démarrer en local

```sh
npm install
npm run dev
```

Site sur `http://localhost:4321` (ou le port suivant disponible).

```sh
npm run build     # build de production dans dist/
npm run preview   # prévisualiser ce build
```

## Structure du contenu (éditable)

```
src/content/
├── settings/site.json       Coordonnées (téléphone, email, adresse, horaires...)
├── pages/
│   ├── home.json            Textes de la page Accueil
│   ├── services.json        En-tête + CTA de la page Services
│   ├── realisations.json    En-tête de la page Réalisations
│   └── contact.json         Textes de la page Contact
├── services/*.md            Les 5 métiers (un fichier par service)
└── realisations/*.md        Les chantiers de la galerie
```

Pour modifier un texte, un numéro de téléphone, ajouter un chantier ou un
service : **modifier directement ces fichiers** (à la main, ou en demandant à
une IA de le faire) — le site se reconstruit automatiquement avec les
nouvelles valeurs. Aucune connaissance du code n'est nécessaire, ce sont des
champs simples (`titre`, `description`, `photo`...).

### Photos

Tant qu'un service/chantier n'a pas de photo (`image: ""`), un emplacement
hachuré avec une légende s'affiche à la place — jamais de case vide ou
d'erreur. Dès qu'une image est renseignée (via le CMS ou en collant un chemin
type `/images/uploads/photo.jpg` dans le fichier), elle remplace
automatiquement le placeholder.

## Backoffice (Decap CMS)

Une interface d'administration est disponible sur **`/admin`** une fois le
site déployé. Elle permet à quelqu'un de non technique de modifier tous les
textes, d'ajouter/retirer un service ou un chantier, et d'uploader des photos
— sans toucher au code. Chaque modification crée un commit Git en coulisses.

### Mise en route (une seule fois, après déploiement sur Netlify)

1. Déployer ce dépôt sur [Netlify](https://netlify.com) (voir section suivante).
2. Dans le tableau de bord Netlify du site : **Identity → Enable Identity**.
3. Toujours dans Identity : **Services → Git Gateway → Enable Git Gateway**.
4. **Identity → Invite users**, inviter l'email de la personne qui doit
   pouvoir modifier le site (ex. la cliente). Elle reçoit un mail pour définir
   son mot de passe.
5. Elle se rend sur `https://<le-site>.netlify.app/admin`, se connecte, et
   modifie le site depuis l'interface.

La configuration du CMS (quels champs sont modifiables, pour quelle page) est
dans `public/admin/config.yml` — à ajuster si de nouveaux champs doivent
devenir éditables.

## Déploiement sur Netlify

1. Pousser ce projet sur un dépôt Git (GitHub/GitLab/Bitbucket).
2. Sur Netlify : **Add new site → Import an existing project**, choisir le
   dépôt.
3. Build command : `npm run build` — Publish directory : `dist`
   (déjà configurés dans `netlify.toml`).
4. Déployer, puis suivre la section CMS ci-dessus pour activer le backoffice.

## Animations GSAP

- **Entrée du hero** : titre, paragraphe, boutons, photo apparaissent en
  fondu/translation au chargement (`src/scripts/animations.ts`).
- **Révélations au scroll** (ScrollTrigger) : cartes services, bloc "Pourquoi
  nous", étapes du process, galerie réalisations.
- **Compteurs animés** : les statistiques (3 générations / 40 ans / +500
  chantiers) comptent jusqu'à leur valeur au scroll.
- **Zoom léger** au survol des photos de chantiers.
- Tout le contenu reste **visible même si le JavaScript ne se charge pas**
  (dégradation progressive) : les animations sont un plus, jamais une
  condition d'affichage.
- Respecte `prefers-reduced-motion`.

## Pourquoi cette approche (Astro + Decap CMS) ?

- **Astro** génère un site statique très rapide (idéal pour le SEO local
  d'une entreprise de maçonnerie), sans la complexité d'un framework JS
  applicatif inutile ici.
- **Decap CMS** est gratuit, ne nécessite aucune base de données ni service
  tiers payant : il lit/écrit directement les fichiers Markdown/JSON du dépôt
  Git. C'est ce qui permet aux **deux usages voulus de coexister sans
  conflit** : une IA peut modifier les mêmes fichiers que la personne qui
  utilise le formulaire `/admin` — il n'y a qu'une seule source de vérité (les
  fichiers), pas une base de données séparée à synchroniser.

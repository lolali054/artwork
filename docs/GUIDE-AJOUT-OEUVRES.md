# Guide d'Administration pour l'Ajout d'Œuvres d'Art

Ce guide explique comment ajouter de nouvelles œuvres d'art à la galerie en ligne de Cindy Roy-Boutin.

## Structure des Images

Toutes les images des œuvres d'art sont stockées dans le dossier `/public/images/artwork/`. Cette organisation permet de:

- Garder toutes les images d'œuvres d'art dans un emplacement centralisé
- Faciliter la gestion et la mise à jour des images
- Assurer que les chemins d'accès aux images restent cohérents

## Processus d'Ajout d'une Nouvelle Œuvre

### 1. Préparation de l'Image

1. Prenez une photo de haute qualité de l'œuvre d'art
   - Utilisez un éclairage naturel uniforme
   - Évitez les reflets et les ombres indésirables
   - Assurez-vous que les couleurs sont fidèles à l'original

2. Traitez l'image:
   - Recadrez l'image pour montrer l'œuvre complète
   - Redimensionnez à une résolution appropriée (recommandé: 1200x1600 pixels minimum)
   - Optimisez la taille du fichier (idéalement moins de 2 MB)
   - Enregistrez au format JPG ou PNG

3. Nommez le fichier selon la convention:
   ```
   [id]_[titre-simplifie].jpg
   ```
   Exemple: `7_foret-brumeuse.jpg`

### 2. Ajout de l'Image au Projet

1. Placez l'image dans le dossier `/public/images/artwork/`

### 3. Mise à Jour du Fichier de Données

1. Ouvrez le fichier `src/lib/data.ts`
2. Ajoutez une nouvelle entrée dans le tableau `paintings` avec toutes les informations requises:

```typescript
{
  id: "7", // Utilisez un ID unique et séquentiel
  title: "Forêt Brumeuse", // Titre complet de l'œuvre
  artist: "Cindy Roy-Boutin", // Nom de l'artiste
  description: "Une scène mystérieuse de forêt enveloppée dans la brume matinale...", // Description détaillée
  price: 1350, // Prix en dollars (sans symbole $ ou formatage)
  dimensions: "70 x 90 cm", // Dimensions en centimètres
  medium: "Acrylique sur toile", // Médium utilisé
  year: 2024, // Année de création
  imageUrl: "/images/artwork/7_foret-brumeuse.jpg", // Chemin vers l'image (relatif à /public)
  featured: false, // true si l'œuvre doit apparaître dans la section "Featured"
  sold: false // true si l'œuvre est déjà vendue
}
```

### 4. Vérification

Après avoir ajouté la nouvelle œuvre:

1. Lancez l'application en mode développement:
   ```
   npm run dev
   ```
2. Vérifiez que l'œuvre apparaît correctement dans la galerie
3. Vérifiez que l'image se charge correctement
4. Testez les filtres et la recherche pour vous assurer que la nouvelle œuvre est correctement indexée

## Gestion des Œuvres Vendues

Lorsqu'une œuvre est vendue:

1. Localisez l'entrée correspondante dans `src/lib/data.ts`
2. Changez la propriété `sold` de `false` à `true`
3. L'œuvre apparaîtra maintenant avec un badge "Vendu" dans la galerie

## Mise en Avant d'Œuvres (Featured)

Pour mettre en avant une œuvre sur la page d'accueil:

1. Localisez l'entrée correspondante dans `src/lib/data.ts`
2. Changez la propriété `featured` de `false` à `true`
3. L'œuvre apparaîtra maintenant dans la section "Œuvres en Vedette" sur la page d'accueil

## Conseils pour les Photos d'Œuvres d'Art

- **Éclairage**: Photographiez les œuvres sous un éclairage naturel diffus, idéalement près d'une fenêtre par temps nuageux
- **Angle**: Prenez la photo de face, perpendiculaire à l'œuvre
- **Contexte**: Envisagez de prendre des photos supplémentaires montrant l'œuvre dans un contexte (accrochée sur un mur, dans un intérieur)
- **Détails**: Pour les grandes œuvres, incluez quelques photos de détails pour montrer la texture et les techniques
- **Échelle**: Incluez un élément permettant de comprendre l'échelle de l'œuvre

## Résolution des Problèmes Courants

- **Image non affichée**: Vérifiez que le chemin dans `imageUrl` correspond exactement au nom du fichier dans le dossier `/public/images/artwork/`
- **Image déformée**: Assurez-vous que l'image a un ratio d'aspect approprié (idéalement 3:4 pour portrait ou 4:3 pour paysage)
- **Image trop grande/lente à charger**: Optimisez l'image pour réduire sa taille de fichier

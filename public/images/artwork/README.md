# Guide pour l'ajout d'œuvres d'art

Ce dossier contient toutes les images des œuvres d'art présentées dans la galerie. Suivez ces instructions pour ajouter de nouvelles œuvres d'art à la galerie.

## Format des images

- Utilisez des images de haute qualité (résolution recommandée: 1200x1600 pixels minimum)
- Format: JPG ou PNG
- Taille de fichier: moins de 2 MB si possible
- Ratio d'aspect: idéalement 3:4 (portrait) ou 4:3 (paysage)
- Nommez les fichiers avec un format cohérent: `id_titre-simplifie.jpg` (ex: `7_foret-brumeuse.jpg`)

## Comment ajouter une nouvelle œuvre

1. Placez l'image de l'œuvre dans ce dossier (`/public/images/artwork/`)
2. Ouvrez le fichier `src/lib/data.ts`
3. Ajoutez une nouvelle entrée dans le tableau `paintings` avec les informations suivantes:
   - `id`: Un identifiant unique (numérique ou chaîne)
   - `title`: Le titre de l'œuvre
   - `artist`: Le nom de l'artiste (Cindy Roy-Boutin)
   - `description`: Une description détaillée de l'œuvre
   - `price`: Le prix en dollars
   - `dimensions`: Les dimensions en centimètres (ex: "60 x 90 cm")
   - `medium`: Le médium utilisé (ex: "Huile sur toile")
   - `year`: L'année de création
   - `imageUrl`: Le chemin vers l'image (`/images/artwork/nom-du-fichier.jpg`)
   - `featured`: Booléen indiquant si l'œuvre doit être mise en avant
   - `sold`: Booléen indiquant si l'œuvre est vendue

## Exemple d'ajout dans data.ts

```typescript
{
  id: "7",
  title: "Forêt Brumeuse",
  artist: "Cindy Roy-Boutin",
  description: "Une scène mystérieuse de forêt enveloppée dans la brume matinale...",
  price: 1350,
  dimensions: "70 x 90 cm",
  medium: "Acrylique sur toile",
  year: 2024,
  imageUrl: "/images/artwork/7_foret-brumeuse.jpg",
  featured: false,
  sold: false
}
```

## Conseils pour les photos

- Photographiez les œuvres sous un éclairage naturel uniforme
- Évitez les reflets et les ombres indésirables
- Assurez-vous que les couleurs sont fidèles à l'original
- Cadrez l'image pour montrer l'œuvre complète, y compris les bords
- Si possible, incluez une photo de l'œuvre dans un contexte (ex: accrochée sur un mur)

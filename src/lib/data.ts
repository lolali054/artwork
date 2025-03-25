export interface Painting {
  id: string;
  title: string;
  artist: string;
  description: string;
  price: number;
  dimensions: string;
  medium: string;
  year: number;
  imageUrl: string;
  featured: boolean;
  sold: boolean;
}

export const paintings: Painting[] = [
  {
    id: "1",
    title: "Prairie d'Été",
    artist: "Cindy Roy-Boutin",
    description: "Une représentation vibrante d'une prairie d'été en pleine floraison. Cette œuvre capture l'essence des chaudes journées d'été avec ses couleurs vives et ses coups de pinceau fluides. Le spectateur est invité à vivre la tranquillité et la beauté de la nature à son apogée.",
    price: 1200,
    dimensions: "60 x 90 cm",
    medium: "Huile sur toile",
    year: 2022,
    imageUrl: "/images/artwork/test.jpg",
    featured: true,
    sold: false
  },
  {
    id: "2",
    title: "Vue Montagnarde",
    artist: "Cindy Roy-Boutin",
    description: "Un paysage atmosphérique représentant une vue sereine sur la montagne. La peinture crée un sentiment de profondeur et de grandeur, avec des sommets lointains émergeant de la brume matinale. La palette de couleurs fraîches évoque un sentiment de calme et de contemplation.",
    price: 1450,
    dimensions: "75 x 100 cm",
    medium: "Acrylique sur toile",
    year: 2023,
    imageUrl: "/images/artwork/2_vue-montagnarde.jpg",
    featured: true,
    sold: false
  },
  {
    id: "3",
    title: "Pins Ancestraux",
    artist: "Cindy Roy-Boutin",
    description: "Une étude de pins ancestraux dans une clairière forestière. Cette peinture explore la relation entre la lumière et l'ombre lorsque la lumière du soleil filtre à travers la canopée dense. Le travail texturé du pinceau crée une qualité tactile qui donne vie à la scène.",
    price: 950,
    dimensions: "50 x 60 cm",
    medium: "Huile sur lin",
    year: 2021,
    imageUrl: "/images/artwork/3_pins-ancestraux.jpg",
    featured: false,
    sold: false
  },
  {
    id: "4",
    title: "Canopée Forestière",
    artist: "Cindy Roy-Boutin",
    description: "Une vue vers le haut à travers une canopée forestière dense. Cette perspective unique invite le spectateur à regarder vers le ciel, où la lumière du soleil crée une cathédrale naturelle de lumière et de couleur. La peinture capture un moment d'émerveillement et de connexion avec la nature.",
    price: 1100,
    dimensions: "60 x 60 cm",
    medium: "Huile sur toile",
    year: 2022,
    imageUrl: "/images/artwork/4_riviere-tranquille.jpg",
    featured: false,
    sold: true
  },
  {
    id: "5",
    title: "Lumière Tachetée",
    artist: "Cindy Roy-Boutin",
    description: "Une étude de la lumière qui passe à travers les feuilles des arbres, créant des motifs sur le sol de la forêt. Cette pièce contemplative explore la nature éphémère de la lumière et la beauté trouvée dans les moments fugaces. La palette chaude crée un sentiment de tranquillité et de nostalgie.",
    price: 1300,
    dimensions: "70 x 90 cm",
    medium: "Huile sur toile",
    year: 2023,
    imageUrl: "/images/artwork/5_crepuscule-dore.jpg",
    featured: true,
    sold: false
  },
  {
    id: "6",
    title: "Côte Sauvage",
    artist: "Cindy Roy-Boutin",
    description: "Une représentation dynamique d'une côte sauvage battue par les vagues. Cette œuvre capture la puissance et la beauté brute de l'océan, avec des vagues écumantes se brisant contre des falaises escarpées. Les tons bleus profonds et les accents blancs créent un contraste saisissant.",
    price: 1550,
    dimensions: "80 x 120 cm",
    medium: "Acrylique sur toile",
    year: 2024,
    imageUrl: "/images/artwork/6_cote-sauvage.jpg",
    featured: true,
    sold: false
  }
];

export const getFeaturedPaintings = (): Painting[] => {
  return paintings.filter(painting => painting.featured);
};

export const getAllPaintings = (): Painting[] => {
  return paintings;
};

export const getPaintingById = (id: string): Painting | undefined => {
  return paintings.find(painting => painting.id === id);
};

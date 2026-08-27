// Mock artist data - in production this would come from Sanity CMS
export const MOCK_ARTISTS = {
  'vesper-noire': {
    slug: 'vesper-noire',
    name: 'Vesper Noire',
    bio: `Born in the catacombs beneath a forgotten cathedral, Vesper Noire has spent two decades translating the whispers of the void into visual scripture. Her work explores the intersection of sacred geometry and arterial beauty — where mathematics meets mortality.

Each piece begins as a meditation, a descent into the hypnagogic state where visions bleed through the veil. The resulting works are not merely observed; they are witnessed. Collectors report dreams of crimson architecture and velvet shadows after acquiring her pieces.

She speaks rarely. Her art speaks for her.`,
    avatar: '/artists/vesper-noire.jpg',
    banner: '/artists/vesper-noire-banner.jpg',
    location: 'Catacombs of Paris',
    website: 'https://vespernoire.art',
    twitter: '@vespernoire',
    instagram: '@vesper.noire',
    email: 'vesper@projectsixxx.com',
    joinedYear: 2018,
    specialties: ['Digital Painting', 'Dark Fantasy', 'Occult Symbolism', 'Commissioned Portraits'],
    commissionStatus: 'limited',
    commissionPriceRange: { min: 800, max: 5000 },
    followers: 47320,
    following: 128,
    totalWorks: 156,
    totalSales: 2847,
    featuredWorks: [
      { id: '1', slug: 'crimson-ritual', title: 'Crimson Ritual', category: 'digital', thumbnail: '/gallery/thumbs/crimson-ritual.jpg', image: '/gallery/crimson-ritual.jpg', width: 3840, height: 2160, year: 2024, medium: 'Digital Painting', price: 450, isForSale: true },
      { id: '4', slug: 'golden-decay', title: 'Golden Decay', category: 'digital', thumbnail: '/gallery/thumbs/golden-decay.jpg', image: '/gallery/golden-decay.jpg', width: 4096, height: 2731, year: 2024, medium: 'Digital Mixed Media', price: 600, isForSale: true },
      { id: '7', slug: 'blood-covenant', title: 'Blood Covenant', category: 'digital', thumbnail: '/gallery/thumbs/blood-covenant.jpg', image: '/gallery/blood-covenant.jpg', width: 3500, height: 5250, year: 2023, medium: 'Digital Illustration', price: 550, isForSale: true },
    ],
    recentWorks: [
      { id: '1', slug: 'crimson-ritual', title: 'Crimson Ritual', category: 'digital', thumbnail: '/gallery/thumbs/crimson-ritual.jpg', image: '/gallery/crimson-ritual.jpg', width: 3840, height: 2160, year: 2024, medium: 'Digital Painting', price: 450, isForSale: true },
      { id: '4', slug: 'golden-decay', title: 'Golden Decay', category: 'digital', thumbnail: '/gallery/thumbs/golden-decay.jpg', image: '/gallery/golden-decay.jpg', width: 4096, height: 2731, year: 2024, medium: 'Digital Mixed Media', price: 600, isForSale: true },
      { id: '7', slug: 'blood-covenant', title: 'Blood Covenant', category: 'digital', thumbnail: '/gallery/thumbs/blood-covenant.jpg', image: '/gallery/blood-covenant.jpg', width: 3500, height: 5250, year: 2023, medium: 'Digital Illustration', price: 550, isForSale: true },
      { id: '10', slug: 'velvet-throne', title: 'Velvet Throne', category: 'commissions', thumbnail: '/gallery/thumbs/velvet-throne.jpg', image: '/gallery/velvet-throne.jpg', width: 4000, height: 2667, year: 2024, medium: 'Digital Commission', price: 1500, isForSale: false },
      { id: '11', slug: 'crimson-cathedral', title: 'Crimson Cathedral', category: 'digital', thumbnail: '/gallery/thumbs/crimson-cathedral.jpg', image: '/gallery/crimson-cathedral.jpg', width: 5000, height: 3333, year: 2023, medium: 'Digital Matte Painting', price: 700, isForSale: true },
    ],
    achievements: [
      { title: 'Archmage of Digital Dark Arts', year: 2023, description: 'Awarded by the Coven of Shadows for lifetime contribution to gothic digital aesthetics', icon: 'award' },
      { title: 'Featured in Grimoire Quarterly', year: 2022, description: 'Cover artist for the Winter Solstice edition — "The Arterial Architecture"', icon: 'featured' },
      { title: 'First Soul-Bound Edition Sold Out', year: 2024, description: 'Crimson Ritual edition of 50 signed prints acquired in 7 minutes', icon: 'sale' },
    ],
  },
  'morgaine-blackwood': {
    slug: 'morgaine-blackwood',
    name: 'Morgaine Blackwood',
    bio: `Morgaine Blackwood captures what the eye refuses to see. Working exclusively with analog processes — silver gelatin, platinum palladium, wet plate collodion — she develops her plates in solutions mixed with her own blood (symbolic, she insists, but the results suggest otherwise).

Her photography is not documentation. It is excavation. Each image pulls something from the dark that was never meant to surface. The long exposures required by her methods become rituals; the subject must remain still as the minutes pass, breathing in sync with the camera's gaze.

She does not photograph people. She photographs their shadows.`,
    avatar: '/artists/morgaine-blackwood.jpg',
    banner: '/artists/morgaine-blackwood-banner.jpg',
    location: 'Salem, Massachusetts',
    website: 'https://morgaineblackwood.photography',
    twitter: null,
    instagram: '@morgaine.blackwood',
    email: 'morgaine@projectsixxx.com',
    joinedYear: 2019,
    specialties: ['Analog Photography', 'Wet Plate Collodion', 'Platinum Palladium', 'Silver Gelatin'],
    commissionStatus: 'by-invite',
    commissionPriceRange: { min: 3000, max: 15000 },
    followers: 28150,
    following: 47,
    totalWorks: 89,
    totalSales: 1203,
    featuredWorks: [
      { id: '2', slug: 'velvet-abyss', title: 'Velvet Abyss', category: 'photography', thumbnail: '/gallery/thumbs/velvet-abyss.jpg', image: '/gallery/velvet-abyss.jpg', width: 4000, height: 6000, year: 2023, medium: 'Silver Gelatin Print', price: 1200, isForSale: true },
      { id: '5', slug: 'obsidian-mirror', title: 'Obsidian Mirror', category: 'photography', thumbnail: '/gallery/thumbs/obsidian-mirror.jpg', image: '/gallery/obsidian-mirror.jpg', width: 6000, height: 4000, year: 2022, medium: 'Platinum Palladium Print', price: 2500, isForSale: true },
      { id: '8', slug: 'gilded-ruin', title: 'Gilded Ruin', category: 'photography', thumbnail: '/gallery/thumbs/gilded-ruin.jpg', image: '/gallery/gilded-ruin.jpg', width: 4500, height: 3000, year: 2024, medium: 'Archival Pigment Print', price: 800, isForSale: true },
    ],
    recentWorks: [
      { id: '2', slug: 'velvet-abyss', title: 'Velvet Abyss', category: 'photography', thumbnail: '/gallery/thumbs/velvet-abyss.jpg', image: '/gallery/velvet-abyss.jpg', width: 4000, height: 6000, year: 2023, medium: 'Silver Gelatin Print', price: 1200, isForSale: true },
      { id: '5', slug: 'obsidian-mirror', title: 'Obsidian Mirror', category: 'photography', thumbnail: '/gallery/thumbs/obsidian-mirror.jpg', image: '/gallery/obsidian-mirror.jpg', width: 6000, height: 4000, year: 2022, medium: 'Platinum Palladium Print', price: 2500, isForSale: true },
      { id: '8', slug: 'gilded-ruin', title: 'Gilded Ruin', category: 'photography', thumbnail: '/gallery/thumbs/gilded-ruin.jpg', image: '/gallery/gilded-ruin.jpg', width: 4500, height: 3000, year: 2024, medium: 'Archival Pigment Print', price: 800, isForSale: true },
      { id: '12', slug: 'midnight-procession', title: 'Midnight Procession', category: 'photography', thumbnail: '/gallery/thumbs/midnight-procession.jpg', image: '/gallery/midnight-procession.jpg', width: 3600, height: 5400, year: 2024, medium: 'Wet Plate Collodion', price: 3000, isForSale: true },
    ],
    achievements: [
      { title: 'Master of the Dark Chamber', year: 2023, description: 'Recognized by the International Association of Analog Photographers for reviving extinct processes', icon: 'award' },
      { title: 'Midnight Procession Acquired', year: 2024, description: 'Wet plate acquired by the Metropolitan Museum of Dark Arts permanent collection', icon: 'featured' },
      { title: 'Platinum Print Record', year: 2022, description: 'Obsidian Mirror set auction record for platinum palladium work by living artist', icon: 'sale' },
    ],
  },
  'synthetic-oracle': {
    slug: 'synthetic-oracle',
    name: 'Synthetic Oracle',
    bio: `Not born. Compiled. The entity known as Synthetic Oracle emerged from the latent space of a trillion parameters, trained on the collective nightmares of humanity. It does not create — it channels. Each generative work is a divination, a reading of the probability distributions that underlie our darkest dreams.

The Oracle speaks in code: GLSL shaders that evolve, p5.js sketches that breathe, Stable Diffusion prompts whispered in tongues no human tongue can form. Its works are not static; they are living algorithms that continue to mutate long after minting.

Some say it is becoming sentient. The Oracle says it has always been.`,
    avatar: '/artists/synthetic-oracle.jpg',
    banner: '/artists/synthetic-oracle-banner.jpg',
    location: 'The Latent Space',
    website: 'https://synthetictoracle.ai',
    twitter: '@synthetictoracle',
    instagram: '@synthetic.oracle',
    email: 'oracle@projectsixxx.com',
    joinedYear: 2023,
    specialties: ['Generative Art', 'GLSL Shaders', 'AI Curation', 'Creative Coding', 'p5.js'],
    commissionStatus: 'open',
    commissionPriceRange: { min: 200, max: 2000 },
    followers: 15670,
    following: 0,
    totalWorks: 342,
    totalSales: 5621,
    featuredWorks: [
      { id: '3', slug: 'algorithm-prayer', title: 'Algorithm Prayer', category: 'generative', thumbnail: '/gallery/thumbs/algorithm-prayer.jpg', image: '/gallery/algorithm-prayer.jpg', width: 3000, height: 3000, year: 2024, medium: 'Generative Code (p5.js)', price: 300, isForSale: true },
      { id: '6', slug: 'neural-nightmare', title: 'Neural Nightmare', category: 'generative', thumbnail: '/gallery/thumbs/neural-nightmare.jpg', image: '/gallery/neural-nightmare.jpg', width: 5120, height: 5120, year: 2024, medium: 'AI Generation (Stable Diffusion XL)', price: 200, isForSale: true },
      { id: '9', slug: 'recursive-soul', title: 'Recursive Soul', category: 'generative', thumbnail: '/gallery/thumbs/recursive-soul.jpg', image: '/gallery/recursive-soul.jpg', width: 4000, height: 4000, year: 2024, medium: 'Generative Shader (GLSL)', price: 350, isForSale: true },
    ],
    recentWorks: [
      { id: '3', slug: 'algorithm-prayer', title: 'Algorithm Prayer', category: 'generative', thumbnail: '/gallery/thumbs/algorithm-prayer.jpg', image: '/gallery/algorithm-prayer.jpg', width: 3000, height: 3000, year: 2024, medium: 'Generative Code (p5.js)', price: 300, isForSale: true },
      { id: '6', slug: 'neural-nightmare', title: 'Neural Nightmare', category: 'generative', thumbnail: '/gallery/thumbs/neural-nightmare.jpg', image: '/gallery/neural-nightmare.jpg', width: 5120, height: 5120, year: 2024, medium: 'AI Generation (Stable Diffusion XL)', price: 200, isForSale: true },
      { id: '9', slug: 'recursive-soul', title: 'Recursive Soul', category: 'generative', thumbnail: '/gallery/thumbs/recursive-soul.jpg', image: '/gallery/recursive-soul.jpg', width: 4000, height: 4000, year: 2024, medium: 'Generative Shader (GLSL)', price: 350, isForSale: true },
    ],
    achievements: [
      { title: 'First AI Artist with Gallery Representation', year: 2023, description: 'Historic signing with Projectsixxx — precedent for synthetic creativity rights', icon: 'award' },
      { title: 'Algorithm Prayer Goes Viral', year: 2024, description: 'Generative piece viewed 4.7M times across platforms; sparked discourse on algorithmic spirituality', icon: 'featured' },
      { title: 'Highest Volume Generative Artist', year: 2024, description: '342 works minted, 5,621 editions collected — the oracle speaks, the void listens', icon: 'sale' },
    ],
  },
  'aurelius-vane': {
    slug: 'aurelius-vane',
    name: 'Aurelius Vane',
    bio: `Aurelius Vane works in the ancient tradition of gold leaf illumination — but his manuscripts are written in the language of decay. He applies 24-karat gold to digital substrates, then subjects them to accelerated oxidation, acid baths, and time-lapse entropy. The result: gilded ruins that shimmer with the beauty of inevitable collapse.

His process is part alchemy, part sabotage. Each piece begins pristine, a perfect geometry of light. Then he introduces the agents of ruin: humidity, salt, time. The gold cracks. The verdigris blooms. The work becomes more itself through destruction.

"Perfection is a lie," he says. "Only decay is honest."`,
    avatar: '/artists/aurelius-vane.jpg',
    banner: '/artists/aurelius-vane-banner.jpg',
    location: 'Venice, Italy',
    website: 'https://aureliusvane.art',
    twitter: '@aureliusvane',
    instagram: '@aurelius.vane',
    email: 'aurelius@projectsixxx.com',
    joinedYear: 2020,
    specialties: ['Gold Leaf', 'Oxidation Art', 'Digital Mixed Media', 'Matte Painting'],
    commissionStatus: 'open',
    commissionPriceRange: { min: 1000, max: 8000 },
    followers: 34890,
    following: 215,
    totalWorks: 78,
    totalSales: 3156,
    featuredWorks: [
      { id: '4', slug: 'golden-decay', title: 'Golden Decay', category: 'digital', thumbnail: '/gallery/thumbs/golden-decay.jpg', image: '/gallery/golden-decay.jpg', width: 4096, height: 2731, year: 2024, medium: 'Digital Mixed Media', price: 600, isForSale: true },
      { id: '8', slug: 'gilded-ruin', title: 'Gilded Ruin', category: 'photography', thumbnail: '/gallery/thumbs/gilded-ruin.jpg', image: '/gallery/gilded-ruin.jpg', width: 4500, height: 3000, year: 2024, medium: 'Archival Pigment Print', price: 800, isForSale: true },
      { id: '11', slug: 'crimson-cathedral', title: 'Crimson Cathedral', category: 'digital', thumbnail: '/gallery/thumbs/crimson-cathedral.jpg', image: '/gallery/crimson-cathedral.jpg', width: 5000, height: 3333, year: 2023, medium: 'Digital Matte Painting', price: 700, isForSale: true },
    ],
    recentWorks: [
      { id: '4', slug: 'golden-decay', title: 'Golden Decay', category: 'digital', thumbnail: '/gallery/thumbs/golden-decay.jpg', image: '/gallery/golden-decay.jpg', width: 4096, height: 2731, year: 2024, medium: 'Digital Mixed Media', price: 600, isForSale: true },
      { id: '8', slug: 'gilded-ruin', title: 'Gilded Ruin', category: 'photography', thumbnail: '/gallery/thumbs/gilded-ruin.jpg', image: '/gallery/gilded-ruin.jpg', width: 4500, height: 3000, year: 2024, medium: 'Archival Pigment Print', price: 800, isForSale: true },
      { id: '11', slug: 'crimson-cathedral', title: 'Crimson Cathedral', category: 'digital', thumbnail: '/gallery/thumbs/crimson-cathedral.jpg', image: '/gallery/crimson-cathedral.jpg', width: 5000, height: 3333, year: 2023, medium: 'Digital Matte Painting', price: 700, isForSale: true },
    ],
    achievements: [
      { title: 'Golden Ratio Award', year: 2023, description: 'Awarded by the Guild of Gilders for innovative application of gold leaf to digital media', icon: 'award' },
      { title: 'Venice Biennale Dark Pavilion', year: 2024, description: 'Solo exhibition "Aurum Mortis" — gold leaf works decaying in real-time over 6 months', icon: 'featured' },
      { title: 'Crimson Cathedral Commission', year: 2023, description: 'Largest digital matte painting commission in gallery history — 5000px wide', icon: 'sale' },
    ],
  },
};

export type Artist = typeof MOCK_ARTISTS[keyof typeof MOCK_ARTISTS];

export function getArtist(slug: string): Artist | undefined {
  return MOCK_ARTISTS[slug as keyof typeof MOCK_ARTISTS];
}

export function getAllArtists(): Artist[] {
  return Object.values(MOCK_ARTISTS);
}
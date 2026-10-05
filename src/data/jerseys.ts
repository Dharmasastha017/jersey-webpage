import { Jersey } from '../types/jersey';

// Generated high-fidelity image assets
export const HERO_IMAGE = '/src/assets/images/hero_jersey_editorial_1791195393853.jpg';
export const RETRO_PRODUCT_IMAGE = '/src/assets/images/product_classic_retro_kit_1791195415015.jpg';
export const NATIONAL_PRODUCT_IMAGE = '/src/assets/images/product_national_kit_1791195431324.jpg';
export const CUSTOM_STATION_IMAGE = '/src/assets/images/custom_kit_station_1791195444499.jpg';

export const JERSEYS_DATA: Jersey[] = [
  {
    id: 'rm-2425-home',
    title: 'Real Madrid 2024/25 Authentic Home Kit',
    club: 'Real Madrid',
    league: 'La Liga',
    season: '2024/25',
    type: 'Home',
    edition: 'Matchday Player Issue',
    price: 135,
    originalPrice: 150,
    image: HERO_IMAGE,
    primaryColor: '#FFFFFF',
    secondaryColor: '#1A1D20',
    accentColor: '#D4AF37', // Gold trim
    textColor: '#1A1D20',
    pattern: 'solid',
    description: 'The iconic Los Blancos home shirt crafted with a custom houndstooth pattern woven directly into the fabric. Engineered with HEAT.RDY technology for elite athletic performance.',
    fabricDetails: '100% Recycled Jacquard Polyester. Heat-applied metallic crest, ribbed polo collar with single-button placket.',
    playerPresets: [
      { name: 'MBAPPÉ', number: 9 },
      { name: 'BELLINGHAM', number: 5 },
      { name: 'VINÍCIUS JR', number: 7 },
      { name: 'MODRIĆ', number: 10 },
      { name: 'RODRYGO', number: 11 },
    ],
    availableBadges: ['UEFA Champions League 15 Badge', 'La Liga Champion Crest', 'FIFA Club World Cup Shield'],
    inStock: true,
    featured: true,
    badgeTag: 'Matchday Issue'
  },
  {
    id: 'ars-9193-retro',
    title: 'Arsenal 1991/93 "Bruised Banana" Iconic Retro Shirt',
    club: 'Arsenal',
    league: 'Retro Archive',
    season: '1991/93',
    type: 'Retro',
    edition: 'Stadium Replica',
    price: 95,
    image: RETRO_PRODUCT_IMAGE,
    primaryColor: '#F4CA16', // Iconic Yellow
    secondaryColor: '#122543', // Deep Navy
    accentColor: '#D8232A', // Red JVC & trim
    textColor: '#122543',
    pattern: 'chevrons',
    description: 'Arguably the most famous away shirt in football history. The asymmetric jagged navy chevrons on vibrant yellow fabric crowned the Gunners during the 1993 domestic cup double.',
    fabricDetails: 'Heavyweight archival double-knit polyester with sublimated graphic, ribbed retro V-neck collar, faithfully stitched heritage Arsenal cannon crest.',
    playerPresets: [
      { name: 'WRIGHT', number: 8 },
      { name: 'ADAMS', number: 6 },
      { name: 'ROCASTLE', number: 7 },
      { name: 'SMITH', number: 9 },
      { name: 'MERSON', number: 10 },
    ],
    availableBadges: ['FA Cup 1993 Final Embroidery', 'Vintage Football League 1888-1992 Sleeve Patch'],
    inStock: true,
    featured: true,
    badgeTag: 'Vault Relic'
  },
  {
    id: 'arg-2024-champions',
    title: 'Argentina 2024 Three Stars Copa Champions Home Kit',
    club: 'Argentina',
    league: 'International',
    season: '2024/25',
    type: 'Home',
    edition: 'Matchday Player Issue',
    price: 130,
    image: NATIONAL_PRODUCT_IMAGE,
    primaryColor: '#74ACDF', // Albiceleste sky blue
    secondaryColor: '#FFFFFF',
    accentColor: '#DAA520', // Gold World Cup center patch & 3 stars
    textColor: '#DAA520',
    pattern: 'stripes',
    description: 'The triumphant Albiceleste shirt carrying the prestigious gold FIFA World Champions crest on the chest and three golden embroidered stars over the AFA crest.',
    fabricDetails: 'AEROREADY performance ultra-breathable micro-mesh. Gold detailing on shoulders and three stripes.',
    playerPresets: [
      { name: 'MESSI', number: 10 },
      { name: 'DI MARÍA', number: 11 },
      { name: 'MARTÍNEZ', number: 23 },
      { name: 'DE PAUL', number: 7 },
      { name: 'ÁLVAREZ', number: 9 },
    ],
    availableBadges: ['FIFA World Champions Gold Badge', 'Copa América 2024 Sleeve Patch'],
    inStock: true,
    featured: true,
    badgeTag: 'World Champions'
  },
  {
    id: 'milan-0607-retro',
    title: 'AC Milan 2006/07 Athens Final Vintage Away Kit',
    club: 'AC Milan',
    league: 'Retro Archive',
    season: '2006/07',
    type: 'Retro',
    edition: 'Stadium Replica',
    price: 98,
    image: RETRO_PRODUCT_IMAGE,
    primaryColor: '#F5F5F7', // Pristine White
    secondaryColor: '#B01016', // Milan Red
    accentColor: '#111111', // Black
    textColor: '#B01016',
    pattern: 'solid',
    description: 'The legendary "Maglia Fortunata" (Lucky Shirt) worn in Athens when Carlo Ancelotti’s side lifted their 7th European Cup title behind Pippo Inzaghi’s iconic brace.',
    fabricDetails: 'Silky retro Climacool fabric, commemorative "Final Athens 2007" chest script, embroidered 7-trophy badge of honour.',
    playerPresets: [
      { name: 'KAKÁ', number: 22 },
      { name: 'MALDINI', number: 3 },
      { name: 'INZAGHI', number: 9 },
      { name: 'PIRLO', number: 21 },
      { name: 'NESTA', number: 13 },
      { name: 'SEEDORF', number: 10 },
    ],
    availableBadges: ['UEFA Badge of Honour (7 Cups)', 'Athens 2007 Final Match Detail Chest Embroidery'],
    inStock: true,
    featured: true,
    badgeTag: 'Athens 2007 Final'
  },
  {
    id: 'barca-2425-home',
    title: 'FC Barcelona 2024/25 125th Anniversary Home Kit',
    club: 'FC Barcelona',
    league: 'La Liga',
    season: '2024/25',
    type: 'Home',
    edition: 'Matchday Player Issue',
    price: 135,
    image: HERO_IMAGE,
    primaryColor: '#004D98', // Deep Blau
    secondaryColor: '#A50044', // Grana
    accentColor: '#EDBB00', // Gold Spotify & swoosh
    textColor: '#EDBB00',
    pattern: 'half',
    description: 'Honoring 125 years of Blaugrana history with the original half-and-half color block inspired by the club’s founding shirt from 1899, centered with the 125th anniversary crest inscription.',
    fabricDetails: 'Dri-FIT ADV engineered knit with precision zonal ventilation, 3D silicone crest with golden rim detail.',
    playerPresets: [
      { name: 'LAMINE YAMAL', number: 19 },
      { name: 'PEDRI', number: 8 },
      { name: 'GAVI', number: 6 },
      { name: 'LEWANDOWSKI', number: 9 },
      { name: 'RAPHINHA', number: 11 },
    ],
    availableBadges: ['125th Club Anniversary Sleeve Seal', 'Champions League 2024 Starball', 'La Liga Official Patch'],
    inStock: true,
    featured: false,
    badgeTag: '125th Anniversary'
  },
  {
    id: 'jpn-2224-origami',
    title: 'Japan National Team "Origami Crow" Special Edition Kit',
    club: 'Japan',
    league: 'International',
    season: '2022/24',
    type: 'Special',
    edition: 'Matchday Player Issue',
    price: 125,
    image: NATIONAL_PRODUCT_IMAGE,
    primaryColor: '#0F2050', // Samurai Blue
    secondaryColor: '#E2E8F0', // White origami lines
    accentColor: '#C8102E', // Rising sun crimson
    textColor: '#FFFFFF',
    pattern: 'pinstripes',
    description: 'Inspired by the origami folded paper crane, symbolizing wishes for triumph and hope. The graphic lines represent the Yatagarasu (three-legged crow) soaring in flight.',
    fabricDetails: 'Heat-transfer JFA crest, ultra-light cooling fabric with laser-cut ventilation ports down both side flanks.',
    playerPresets: [
      { name: 'MITOMA', number: 7 },
      { name: 'KUBO', number: 20 },
      { name: 'ENDO', number: 6 },
      { name: 'MINAMINO', number: 8 },
      { name: 'TOMIYASU', number: 16 },
    ],
    availableBadges: ['AFC Asian Cup Sleeve Patch', 'World Cup 2026 Qualifier Patch'],
    inStock: true,
    featured: false,
    badgeTag: 'Collector Favorite'
  },
  {
    id: 'manu-9899-treble',
    title: 'Manchester United 1998/99 Treble Winners Retro Shirt',
    club: 'Manchester United',
    league: 'Retro Archive',
    season: '1998/99',
    type: 'Retro',
    edition: 'Stadium Replica',
    price: 98,
    image: RETRO_PRODUCT_IMAGE,
    primaryColor: '#DA291C', // United Red
    secondaryColor: '#FFFFFF', // Sharp sponsor & trim
    accentColor: '#000000', // Black collar trim
    textColor: '#FFFFFF',
    pattern: 'solid',
    description: 'The shirt of Camp Nou 1999 magic: Solskjaer in the 93rd minute, Sheringham in the 91st. Complete with the Umbro chevron sleeves and classic zip-up polo neck collar.',
    fabricDetails: 'Heavy sheen archival polyester, jacquard club crest embedded into the fabric weave, authentic vintage Sharp sponsor.',
    playerPresets: [
      { name: 'BECKHAM', number: 7 },
      { name: 'SCHOLES', number: 18 },
      { name: 'GIGGS', number: 11 },
      { name: 'KEANE', number: 16 },
      { name: 'SOLSKJÆR', number: 20 },
      { name: 'CANTONA', number: 7 },
    ],
    availableBadges: ['UEFA Champions League Winners 1999 Arm Patch', 'Premier League 1998/99 Champions Patch'],
    inStock: true,
    featured: true,
    badgeTag: 'Treble 1999'
  },
  {
    id: 'liv-2425-home',
    title: 'Liverpool FC 2024/25 Retro-Infused Home Shirt',
    club: 'Liverpool',
    league: 'Premier League',
    season: '2024/25',
    type: 'Home',
    edition: 'Stadium Replica',
    price: 88,
    image: HERO_IMAGE,
    primaryColor: '#C8102E', // Gym Red
    secondaryColor: '#F6EB61', // Yellow pinstripes
    accentColor: '#FFFFFF', // Standard Chartered
    textColor: '#FFFFFF',
    pattern: 'pinstripes',
    description: 'A nostalgic modern reimagining of the iconic 1984 Rome European Cup-winning pinstriped strip. Subtle repeating "YNWA" chrome watermark patterns embedded in the collar.',
    fabricDetails: 'Nike Dri-FIT breathable fabric with 97 eternal flame memorial motif heat-applied at the back neck.',
    playerPresets: [
      { name: 'SALAH', number: 11 },
      { name: 'VAN DIJK', number: 4 },
      { name: 'ALEXANDER-ARNOLD', number: 66 },
      { name: 'SZOBOSZLAI', number: 8 },
      { name: 'MAC ALLISTER', number: 10 },
    ],
    availableBadges: ['Premier League Lion Sleeve Badge', 'No Room for Racism Badge', 'UEFA Champions League Starball'],
    inStock: true,
    featured: false,
    badgeTag: 'Best Seller'
  },
  {
    id: 'fra-2425-away',
    title: 'France 2024/25 Euro Pinstripe Away Kit',
    club: 'France',
    league: 'International',
    season: '2024/25',
    type: 'Away',
    edition: 'Matchday Player Issue',
    price: 130,
    image: NATIONAL_PRODUCT_IMAGE,
    primaryColor: '#F7F8FA', // Crisp Off-White
    secondaryColor: '#002654', // Navy
    accentColor: '#ED2939', // French Blue & Red pinstripes
    textColor: '#002654',
    pattern: 'pinstripes',
    description: 'An ode to the 1980s Platini era with alternating classic red and royal blue vertical pinstripes and an oversized retro metallic golden Gallic rooster crest.',
    fabricDetails: 'Ultra-lightweight open-hole knit with seamless bonded hems and iridescent golden FFF Rooster crest.',
    playerPresets: [
      { name: 'MBAPPÉ', number: 10 },
      { name: 'GRIEZMANN', number: 7 },
      { name: 'CAMAVINGA', number: 6 },
      { name: 'DEMBÉLÉ', number: 11 },
      { name: 'SALÍBA', number: 17 },
    ],
    availableBadges: ['UEFA Euro 2024 Tournament Badge', 'UEFA Foundation For Children Patch'],
    inStock: true,
    featured: false,
    badgeTag: 'Euro 2024'
  },
  {
    id: 'bra-2002-retro',
    title: 'Brazil 2002 Penta World Cup Final Retro Kit',
    club: 'Brazil',
    league: 'Retro Archive',
    season: '2002',
    type: 'Retro',
    edition: 'Stadium Replica',
    price: 95,
    image: RETRO_PRODUCT_IMAGE,
    primaryColor: '#FFDF00', // Iconic Canary Yellow
    secondaryColor: '#009739', // Green collar and flank arc
    accentColor: '#002776', // Blue numbers
    textColor: '#002776',
    pattern: 'solid',
    description: 'The shirt of Ronaldo Nazário’s redemption in Yokohama, bagging two in the final to seal Brazil’s 5th World Cup. Complete with the legendary Total 90 concentric circle squad numbers.',
    fabricDetails: 'Dual-layer breathable mesh body, embroidered 4-star CBF crest (pre-fifth star matchday specification), authentic Total 90 geometric curves.',
    playerPresets: [
      { name: 'RONALDO', number: 9 },
      { name: 'RONALDINHO', number: 11 },
      { name: 'RIVALDO', number: 10 },
      { name: 'ROBERTO CARLOS', number: 6 },
      { name: 'CAFU', number: 2 },
      { name: 'KAKÁ', number: 23 },
    ],
    availableBadges: ['2002 FIFA World Cup Korea Japan Official Sleeve Emblem'],
    inStock: true,
    featured: true,
    badgeTag: 'Penta 2002'
  },
  {
    id: 'bvb-9697-retro',
    title: 'Borussia Dortmund 1996/97 Neon European Champions Kit',
    club: 'Borussia Dortmund',
    league: 'Retro Archive',
    season: '1996/97',
    type: 'Retro',
    edition: 'Stadium Replica',
    price: 92,
    image: RETRO_PRODUCT_IMAGE,
    primaryColor: '#E6FF00', // Electrifying Neon Yellow
    secondaryColor: '#0D0E11', // Jet Black
    accentColor: '#E6FF00',
    textColor: '#0D0E11',
    pattern: 'stripes',
    description: 'The iconic high-voltage neon strip worn when Lars Ricken chipped Angelo Peruzzi from 30 yards to win Dortmund’s first-ever Champions League in Munich.',
    fabricDetails: 'Vibrant neon poly-tricot weave with authentic "Die Continentale" sponsor chest print and vintage BVB 09 round crest.',
    playerPresets: [
      { name: 'RICKEN', number: 18 },
      { name: 'SAMMER', number: 6 },
      { name: 'RIEDLE', number: 13 },
      { name: 'MÖLLER', number: 10 },
      { name: 'CHAPUISAT', number: 9 },
    ],
    availableBadges: ['Champions League Final 1997 Commemorative Detail'],
    inStock: true,
    featured: false,
    badgeTag: 'Munich 1997'
  },
  {
    id: 'mia-2425-away',
    title: 'Inter Miami CF 2024/25 "La Noche" Black & Pink Kit',
    club: 'Inter Miami',
    league: 'International',
    season: '2024/25',
    type: 'Away',
    edition: 'Matchday Player Issue',
    price: 120,
    image: HERO_IMAGE,
    primaryColor: '#121214', // Jet Black
    secondaryColor: '#F485B8', // Neon Heron Pink
    accentColor: '#F485B8',
    textColor: '#F485B8',
    pattern: 'solid',
    description: 'The nocturnal South Beach silhouette celebrating Miami nightlife with vibrant heron pink accents, Royal Caribbean anchor crest, and freedom to dream motto on the neck.',
    fabricDetails: '100% Recycled AEROREADY weave with lightweight 3D silicone heron crest and pink 3-stripes on the shoulder.',
    playerPresets: [
      { name: 'MESSI', number: 10 },
      { name: 'SUÁREZ', number: 9 },
      { name: 'BUSQUETS', number: 5 },
      { name: 'ALBA', number: 18 },
    ],
    availableBadges: ['MLS Cup Champions Gold Crest', 'Leagues Cup Champions Shield'],
    inStock: true,
    featured: false,
    badgeTag: 'Supporters Shield'
  },
];

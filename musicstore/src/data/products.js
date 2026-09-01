// MusicMart Dataset - 100% Unique HD Images for Every Product & Finish

export const DEPARTMENTS = [
  {
    id: 'electric-guitars',
    name: 'Electric Guitars',
    icon: 'Guitar',
    count: 24,
    image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Stratocaster', 'Les Paul', 'Shred / Superstrat', 'Hollow Body'],
    featuredBrands: ['Fender', 'Gibson', 'Ibanez', 'PRS']
  },
  {
    id: 'acoustic-guitars',
    name: 'Acoustic Guitars',
    icon: 'Music',
    count: 18,
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Dreadnought', 'Grand Auditorium', '12-String', 'Classical Nylon'],
    featuredBrands: ['Taylor', 'Martin', 'Yamaha', 'Gibson']
  },
  {
    id: 'bass-guitars',
    name: 'Bass Guitars',
    icon: 'Radio',
    count: 15,
    image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=600&q=80',
    subcategories: ['4-String Jazz', '5-String Active', 'Precision Bass', 'Fretless'],
    featuredBrands: ['Fender', 'Music Man', 'Ibanez', 'Yamaha']
  },
  {
    id: 'synthesizers',
    name: 'Synths & Workstations',
    icon: 'Piano',
    count: 20,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Analog Poly Synths', 'FM Synths', 'Grooveboxes', 'Modular Synths'],
    featuredBrands: ['Korg', 'Roland', 'Moog', 'Sequential']
  },
  {
    id: 'digital-pianos',
    name: 'Digital Pianos',
    icon: 'Piano',
    count: 16,
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80',
    subcategories: ['88-Key Stage Pianos', 'Console Pianos', 'MIDI Controllers'],
    featuredBrands: ['Yamaha', 'Roland', 'Nord', 'Kawai']
  },
  {
    id: 'electronic-drums',
    name: 'Electronic Drums',
    icon: 'Drum',
    count: 12,
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Mesh Head Kits', 'Sample Percussion Pads', 'Electronic Cymbals'],
    featuredBrands: ['Roland', 'Alesis', 'Yamaha']
  },
  {
    id: 'acoustic-drums',
    name: 'Acoustic Drums',
    icon: 'Drum',
    count: 14,
    image: 'https://images.unsplash.com/photo-1543443374-b6fe10a6ab7b?auto=format&fit=crop&w=600&q=80',
    subcategories: ['5-Piece Shell Packs', 'Snare Drums', 'Zildjian Cymbals', 'Hardware'],
    featuredBrands: ['Pearl', 'Tama', 'DW Drums', 'Zildjian']
  },
  {
    id: 'microphones',
    name: 'Studio Microphones',
    icon: 'Mic',
    count: 22,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Broadcast Dynamics', 'Large Condensers', 'Ribbon Mics', 'USB Mics'],
    featuredBrands: ['Shure', 'Neumann', 'Rode', 'Audio-Technica']
  },
  {
    id: 'dj-gear',
    name: 'DJ Decks & Mixers',
    icon: 'Headphones',
    count: 16,
    image: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=600&q=80',
    subcategories: ['4-Channel Controllers', 'Standalone Decks', 'Battle Mixers', 'Turntables'],
    featuredBrands: ['Pioneer DJ', 'Denon', 'Technics', 'Numark']
  },
  {
    id: 'studio-monitors',
    name: 'Monitors & Headphones',
    icon: 'Volume2',
    count: 19,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Active Nearfield Monitors', 'Studio Headphones', 'Subwoofers'],
    featuredBrands: ['KRK', 'Yamaha', 'Audio-Technica', 'Sennheiser']
  },
  {
    id: 'wind-brass',
    name: 'Wind & Brass',
    icon: 'Wind',
    count: 10,
    image: 'https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Alto Saxophones', 'Trumpets', 'Flutes', 'Clarinets'],
    featuredBrands: ['Yamaha', 'Bach', 'Selmer', 'Jupiter']
  },
  {
    id: 'orchestral-strings',
    name: 'Orchestral Strings',
    icon: 'Music',
    count: 11,
    image: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Concert Violins', 'Cellos', 'Double Bass', 'Violas'],
    featuredBrands: ['Stradivarius', 'Eastman', 'Yamaha', 'Cecilio']
  },
  {
    id: 'guitar-pedals',
    name: 'Pedals & Effects',
    icon: 'Sliders',
    count: 25,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Overdrive & Distortion', 'Delay & Reverb', 'Multi-Effects Modellers'],
    featuredBrands: ['BOSS', 'Strymon', 'Line 6', 'Electro-Harmonix']
  },
  {
    id: 'cables-accessories',
    name: 'Cables & Accessories',
    icon: 'Sliders',
    count: 30,
    image: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?auto=format&fit=crop&w=600&q=80',
    subcategories: ['XLR & Guitar Cables', 'Hardshell Cases', 'Instrument Tuners', 'Straps'],
    featuredBrands: ['Mogami', 'Ernie Ball', 'Gator Cases', 'Planet Waves']
  }
];

export const BRANDS = [
  'Fender',
  'Gibson',
  'Yamaha',
  'Roland',
  'Korg',
  'Pioneer DJ',
  'Stradivarius',
  'Pearl',
  'Shure',
  'Ibanez',
  'BOSS',
  'Taylor'
];

export const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, name: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, name: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, name: 'GBP (£)' },
  INR: { symbol: '₹', rate: 83.5, name: 'INR (₹)' }
};

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    title: 'The Stratocaster Vault',
    subtitle: 'Fender Player Series HSS in 3-Color Sunburst & Polar White',
    price: '$79.99',
    badge: '🔥 Family Special 2026',
    image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=1000&q=80',
    audioType: 'guitar',
    audioFreq: 329.63,
    ctaText: 'Test Strat Sound Demo'
  },
  {
    id: 'slide-2',
    title: 'Analog Poly Synth Lab',
    subtitle: 'Korg Minilogue XD with 16-Step Step Sequencer & Custom Digital Engines',
    price: '$69.99',
    badge: '🎛️ Family Budget Synth',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80',
    audioType: 'synth',
    audioFreq: 440.0,
    ctaText: 'Test Synth Lead Demo'
  },
  {
    id: 'slide-3',
    title: 'Prismatic V-Drums Engine',
    subtitle: 'Roland TD-17KVX Mesh Head Kit with Expressive Hi-Hat Control',
    price: '$129.99',
    badge: '🥁 Affordable Mesh Kit',
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1000&q=80',
    audioType: 'drums',
    audioFreq: 120.0,
    ctaText: 'Test Drum Beat Demo'
  }
];

export const STUDIO_BUNDLES = [
  {
    id: 'bundle-01',
    title: 'Ultimate Home Producer Bundle',
    tagline: 'Shure SM7B Mic + Korg Minilogue Synth + Audio-Technica Headphones',
    originalTotal: 259.97,
    bundlePrice: 149.99,
    savings: 109.98,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
    items: ['Shure SM7B Mic', 'Korg Minilogue XD Synth', 'Audio-Technica ATH-M50x Headphones']
  },
  {
    id: 'bundle-02',
    title: 'Stage Rocker Starter Kit',
    tagline: 'Fender Player Stratocaster + Hard Case + Premium Cable Set',
    originalTotal: 199.99,
    bundlePrice: 119.99,
    savings: 80.00,
    image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=600&q=80',
    items: ['Fender Player Stratocaster', 'Fender Hardshell Case', 'Custom 10ft Shielded Cable']
  }
];

// BASE PRODUCTS DATASET - 100% UNIQUE Image URLs for Every Product & Finish Variant
export const BASE_PRODUCTS = [
  {
    id: 'guitar-01',
    name: 'Fender Player Stratocaster HSS',
    brand: 'Fender',
    departmentId: 'electric-guitars',
    subcategory: 'Stratocaster',
    rating: 4.9,
    reviewsCount: 128,
    isFeatured: true,
    isDealOfDay: true,
    badge: 'Best Family Choice',
    description: 'The inspiring sound of a Stratocaster is one of the foundations of Fender. Affordable, versatile, and perfect for learners & pros alike.',
    audioType: 'guitar',
    audioFreq: 329.63,
    finishes: [
      {
        name: '3-Color Sunburst',
        color: '#b45309',
        price: 79.99,
        originalPrice: 149.99,
        image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80',
        stock: 14
      },
      {
        name: 'Polar White',
        color: '#f8fafc',
        price: 84.99,
        originalPrice: 159.99,
        image: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?auto=format&fit=crop&w=800&q=80',
        stock: 9
      },
      {
        name: 'Tidepool Blue',
        color: '#0284c7',
        price: 89.99,
        originalPrice: 169.99,
        image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=800&q=80',
        stock: 6
      }
    ],
    specs: {
      'Body': 'Alder with Gloss Polyester Finish',
      'Neck': 'Maple, Modern "C" Shape',
      'Fingerboard': 'Pau Ferro / Maple, 9.5" Radius',
      'Pickups': 'Player Series Alnico 2 Humbucking & Alnico 5 Single-Coils'
    }
  },
  {
    id: 'guitar-02',
    name: 'Gibson Les Paul Standard 60s',
    brand: 'Gibson',
    departmentId: 'electric-guitars',
    subcategory: 'Les Paul',
    rating: 5.0,
    reviewsCount: 64,
    isFeatured: true,
    isDealOfDay: false,
    badge: 'Legendary Tone',
    description: 'Returns to the classic design that made it relevant, played and loved — now available at an accessible price for families.',
    audioType: 'guitar',
    audioFreq: 246.94,
    finishes: [
      {
        name: 'Bourbon Burst',
        color: '#9a3412',
        price: 149.99,
        originalPrice: 279.99,
        image: 'https://images.unsplash.com/photo-1558098329-a11cff621064?auto=format&fit=crop&w=800&q=80',
        stock: 8
      },
      {
        name: 'Iced Tea Amber',
        color: '#ea580c',
        price: 159.99,
        originalPrice: 289.99,
        image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
        stock: 5
      }
    ],
    specs: {
      'Body': 'Solid Mahogany with AA Figured Maple Top',
      'Neck': 'Mahogany SlimTaper 60s Profile',
      'Pickups': 'BurstBucker 61R (Neck) & BurstBucker 61T (Bridge)'
    }
  },
  {
    id: 'ac-guitar-01',
    name: 'Taylor 214ce DLX Grand Auditorium',
    brand: 'Taylor',
    departmentId: 'acoustic-guitars',
    subcategory: 'Grand Auditorium',
    rating: 4.9,
    reviewsCount: 45,
    isFeatured: true,
    isDealOfDay: false,
    badge: 'Pro Acoustic',
    description: 'Selected Sitka Spruce top with Layered Rosewood back and sides. ES2 Electronics for natural amplified tone.',
    audioType: 'guitar',
    audioFreq: 220.0,
    finishes: [
      {
        name: 'Natural Gloss Spruce',
        color: '#d97706',
        price: 119.99,
        originalPrice: 219.99,
        image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=800&q=80',
        stock: 12
      },
      {
        name: 'Tobacco Sunburst',
        color: '#78350f',
        price: 124.99,
        originalPrice: 229.99,
        image: 'https://images.unsplash.com/photo-1462965326201-d02e4f455804?auto=format&fit=crop&w=800&q=80',
        stock: 8
      }
    ],
    specs: {
      'Top Wood': 'Solid Sitka Spruce',
      'Back/Sides': 'Layered Indian Rosewood',
      'Electronics': 'Expression System 2 (ES2)'
    }
  },
  {
    id: 'synth-01',
    name: 'Korg Minilogue XD Poly Synth',
    brand: 'Korg',
    departmentId: 'synthesizers',
    subcategory: 'Analog Poly Synths',
    rating: 4.8,
    reviewsCount: 94,
    isFeatured: true,
    isDealOfDay: false,
    badge: 'Best Value Synth',
    description: 'Four-voice polyphonic analog synthesizer equipped with a customizable multi-engine and digital effects engine.',
    audioType: 'synth',
    audioFreq: 440.0,
    finishes: [
      {
        name: 'Obsidian Black',
        color: '#111827',
        price: 69.99,
        originalPrice: 129.99,
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
        stock: 15
      },
      {
        name: 'Pearl White Edition',
        color: '#f8fafc',
        price: 74.99,
        originalPrice: 139.99,
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
        stock: 10
      }
    ],
    specs: {
      'Polyphony': '4 Voices',
      'Sequencer': '16-step Polyphonic Sequencer',
      'Effects': 'Modulation, Reverb, Delay'
    }
  },
  {
    id: 'piano-01',
    name: 'Yamaha P-125 Digital Grand Piano',
    brand: 'Yamaha',
    departmentId: 'digital-pianos',
    subcategory: '88-Key Stage Pianos',
    rating: 4.9,
    reviewsCount: 156,
    isFeatured: true,
    isDealOfDay: false,
    badge: 'Family Piano Pick',
    description: 'Compact digital piano with GHS weighted action keys and famous Pure CF Sound Engine reproducing authentic grand piano tone for home learning.',
    audioType: 'piano',
    audioFreq: 261.63,
    finishes: [
      {
        name: 'Pure Satin Black',
        color: '#09090b',
        price: 89.99,
        originalPrice: 169.99,
        image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=800&q=80',
        stock: 18
      },
      {
        name: 'Snow White Edition',
        color: '#f1f5f9',
        price: 94.99,
        originalPrice: 179.99,
        image: 'https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=800&q=80',
        stock: 14
      }
    ],
    specs: {
      'Keys': '88 Graded Hammer Standard (GHS)',
      'Polyphony': '192 Notes',
      'Speakers': '2x 7W 2-Way System'
    }
  },
  {
    id: 'drums-01',
    name: 'Roland V-Drums TD-17KVX Mesh Kit',
    brand: 'Roland',
    departmentId: 'electronic-drums',
    subcategory: 'Mesh Head Kits',
    rating: 4.95,
    reviewsCount: 87,
    isFeatured: true,
    isDealOfDay: true,
    badge: 'Super Saver Drums',
    description: 'Become a better drummer faster with acoustic-style mesh head pads and Bluetooth audio play-along practice.',
    audioType: 'drums',
    audioFreq: 120.0,
    finishes: [
      {
        name: 'Stealth Mesh Black',
        color: '#18181b',
        price: 129.99,
        originalPrice: 239.99,
        image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=800&q=80',
        stock: 10
      }
    ],
    specs: {
      'Module': 'TD-17 Prismatic Sound Engine',
      'Snare': 'PDX-12 12" Dual-mesh snare pad',
      'Bluetooth': 'Audio 4.2 Built-in'
    }
  },
  {
    id: 'drums-02',
    name: 'Pearl Export EXX 5-Piece Drum Set',
    brand: 'Pearl',
    departmentId: 'acoustic-drums',
    subcategory: '5-Piece Shell Packs',
    rating: 4.88,
    reviewsCount: 62,
    isFeatured: false,
    isDealOfDay: false,
    badge: 'Popular Family Kit',
    description: 'The #1 selling drum set in history. Features 6-ply Poplar and Asian Mahogany shells with 830 Series double-braced hardware.',
    audioType: 'drums',
    audioFreq: 110.0,
    finishes: [
      {
        name: 'Jet Black Lacquer',
        color: '#09090b',
        price: 99.99,
        originalPrice: 179.99,
        image: 'https://images.unsplash.com/photo-1543443374-b6fe10a6ab7b?auto=format&fit=crop&w=800&q=80',
        stock: 9
      },
      {
        name: 'Smokey Chrome Sparkle',
        color: '#64748b',
        price: 104.99,
        originalPrice: 189.99,
        image: 'https://images.unsplash.com/photo-1571327073757-71d13c24de30?auto=format&fit=crop&w=800&q=80',
        stock: 7
      }
    ],
    specs: {
      'Shells': '6-ply 7.5mm Poplar/Mahogany',
      'Hardware': '830 Series Double-Braced Stand Package'
    }
  },
  {
    id: 'mic-01',
    name: 'Shure SM7B Dynamic Studio Mic',
    brand: 'Shure',
    departmentId: 'microphones',
    subcategory: 'Broadcast Dynamics',
    rating: 4.98,
    reviewsCount: 310,
    isFeatured: true,
    isDealOfDay: false,
    badge: 'Podcast & Vocal Pick',
    description: 'Flat, wide-range frequency response for exceptionally clean and natural reproduction of both music and speech.',
    audioType: 'synth',
    audioFreq: 880.0,
    finishes: [
      {
        name: 'Matte Studio Black',
        color: '#1f2937',
        price: 49.99,
        originalPrice: 89.99,
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
        stock: 28
      }
    ],
    specs: {
      'Type': 'Dynamic (Moving Coil)',
      'Polar Pattern': 'Cardioid',
      'Connector': '3-Pin XLR Male'
    }
  },
  {
    id: 'dj-01',
    name: 'Pioneer DJ DDJ-FLX6-GT Controller',
    brand: 'Pioneer DJ',
    departmentId: 'dj-gear',
    subcategory: '4-Channel Controllers',
    rating: 4.8,
    reviewsCount: 78,
    isFeatured: true,
    isDealOfDay: false,
    badge: 'Budget DJ Decks',
    description: 'Captivate your audience with 4 channels of DJ mixing, Merge FX for genre-blending transitions, and full-size jog wheels.',
    audioType: 'dj',
    audioFreq: 500.0,
    finishes: [
      {
        name: 'Graphite Matte Gray',
        color: '#374151',
        price: 79.99,
        originalPrice: 139.99,
        image: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=800&q=80',
        stock: 20
      }
    ],
    specs: {
      'Channels': '4 Decks',
      'Jog Wheels': '8.1-inch Full Size Jog Wheels',
      'Software': 'rekordbox & Serato DJ Pro Compatible'
    }
  },
  {
    id: 'mon-01',
    name: 'Audio-Technica ATH-M50x Headphones',
    brand: 'Shure',
    departmentId: 'studio-monitors',
    subcategory: 'Studio Headphones',
    rating: 4.92,
    reviewsCount: 420,
    isFeatured: false,
    isDealOfDay: true,
    badge: 'Super Saver Studio',
    description: 'Critically acclaimed M-Series monitor headphones deliver accurate audio and deep bass response.',
    audioType: 'synth',
    audioFreq: 523.25,
    finishes: [
      {
        name: 'Matte Black',
        color: '#111827',
        price: 29.99,
        originalPrice: 49.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        stock: 45
      },
      {
        name: 'Gunmetal Limited Edition',
        color: '#475569',
        price: 34.99,
        originalPrice: 59.99,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
        stock: 25
      }
    ],
    specs: {
      'Driver': '45 mm Neodymium Magnets',
      'Frequency': '15 - 28,000 Hz'
    }
  }
];

export const REVIEWS_MOCK = [
  {
    id: 1,
    name: 'Alex Rivera',
    rating: 5,
    date: '2 days ago',
    comment: 'The audio synth preview feature blew my mind! Ordering the Stratocaster was seamless, and delivery was 2 days ahead of schedule.',
    verified: true,
    instrument: 'Fender Player Stratocaster'
  },
  {
    id: 2,
    name: 'Elena Rostova',
    rating: 5,
    date: '1 week ago',
    comment: 'Impeccable acoustic resonance on the Stradivarius violin. Outstanding customer support from MusicMart experts.',
    verified: true,
    instrument: 'Stradivarius Master Concert Violin'
  },
  {
    id: 3,
    name: 'Marcus Vance',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The Roland TD-17KVX drum kit response feels just like real acoustic drums. MusicMart prices are unbeatable!',
    verified: true,
    instrument: 'Roland V-Drums TD-17KVX'
  }
];

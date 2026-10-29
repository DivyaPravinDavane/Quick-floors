export interface FlooringMaterial {
  id: string;
  name: string;
  category: 'wood' | 'stone' | 'marble';
  color: string;
  roughness: number;
  metalness: number;
  tileRepeat: [number, number];
  description: string;
  roomLighting: {
    ambientIntensity: number;
    directionalIntensity: number;
    lightColor: string;
  };
  sampleTag: string;
  productMatchSlug?: string;
  thumbnailColor: string;
}

export const FLOORING_MATERIALS: FlooringMaterial[] = [
  {
    id: 'natural-oak',
    name: 'Natural White Oak',
    category: 'wood',
    color: '#c4a682',
    roughness: 0.65,
    metalness: 0.05,
    tileRepeat: [8, 8],
    description: 'Wire-brushed Scandinavian oak with soft organic grain and subtle matte luminescence.',
    roomLighting: {
      ambientIntensity: 0.9,
      directionalIntensity: 1.4,
      lightColor: '#fff9f0',
    },
    sampleTag: 'AquaShield 6mm / Dunite Oak',
    productMatchSlug: 'cyrus-dunite-oak',
    thumbnailColor: '#c29d72',
  },
  {
    id: 'warm-walnut',
    name: 'Heritage Warm Walnut',
    category: 'wood',
    color: '#654832',
    roughness: 0.55,
    metalness: 0.08,
    tileRepeat: [8, 8],
    description: 'Deep mocha and caramel undertones with rich architectural depth and satin finish.',
    roomLighting: {
      ambientIntensity: 0.85,
      directionalIntensity: 1.5,
      lightColor: '#fff3e3',
    },
    sampleTag: 'Dynamic 7MM / Dominion',
    productMatchSlug: 'dynamic-dominion-7mm',
    thumbnailColor: '#5a3d28',
  },
  {
    id: 'light-stone',
    name: 'Crema Avell Porcelain',
    category: 'stone',
    color: '#e4ddd3',
    roughness: 0.35,
    metalness: 0.1,
    tileRepeat: [4, 4],
    description: 'Subtle limestone striations with soft honed reflectance ideal for bright open interiors.',
    roomLighting: {
      ambientIntensity: 0.95,
      directionalIntensity: 1.3,
      lightColor: '#ffffff',
    },
    sampleTag: 'Trecento / Bianco River',
    productMatchSlug: 'bianco-river-24x48',
    thumbnailColor: '#ded5c7',
  },
  {
    id: 'marble',
    name: 'Arabescato Polished Marble',
    category: 'marble',
    color: '#f0ede6',
    roughness: 0.15,
    metalness: 0.2,
    tileRepeat: [3, 3],
    description: 'High-gloss crystalline white with subtle smoke-grey and soft gold veining.',
    roomLighting: {
      ambientIntensity: 0.8,
      directionalIntensity: 1.7,
      lightColor: '#f7faff',
    },
    sampleTag: 'Paonazzo / Arabescato 24x48',
    productMatchSlug: 'arabescato-24x48-polished',
    thumbnailColor: '#ece7dc',
  },
  {
    id: 'dark-stone',
    name: 'Montauk Sombra Slate',
    category: 'stone',
    color: '#2a2c2e',
    roughness: 0.7,
    metalness: 0.12,
    tileRepeat: [4, 4],
    description: 'Gauged architectural slate with earthy charcoal texture and dramatic grounding contrast.',
    roomLighting: {
      ambientIntensity: 0.75,
      directionalIntensity: 1.6,
      lightColor: '#f0f3f6',
    },
    sampleTag: 'Montauk Black 12x24 Gauged',
    productMatchSlug: 'montauk-black-12x24-gauged',
    thumbnailColor: '#2b2d30',
  },
];

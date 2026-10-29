export interface InspirationRoom {
  id: string;
  title: string;
  tagline: string;
  category: 'living' | 'kitchen' | 'bathroom' | 'commercial' | 'bedroom';
  image: string;
  flooringUsed: string;
  productSlug: string;
  description: string;
  features: string[];
}

export const INSPIRATION_ROOMS: InspirationRoom[] = [
  {
    id: 'living-nordic',
    title: 'Nordic Light Minimalist Living',
    tagline: 'Expansive natural light with wire-brushed oak warmth',
    category: 'living',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    flooringUsed: 'AquaShield Core 6mm Sandcastle Oak',
    productSlug: 'aquashield-sandcastle-6mm',
    description: 'An open-concept living space defined by floor-to-ceiling glass, linen upholstery, and continuous natural white oak flooring that bridges indoor calm with outdoor garden greens.',
    features: ['100% Waterproof SPC', 'Embossed In Register texture', 'Acoustic IXPE underlayment'],
  },
  {
    id: 'kitchen-monolith',
    title: 'Monolithic Architectural Kitchen',
    tagline: 'Grand format Italian marble veining paired with dark smoked timber',
    category: 'kitchen',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85',
    flooringUsed: 'Paonazzo 24x48 Polished Porcelain',
    productSlug: 'paonazzo-24x48-polished',
    description: 'A sculptural kitchen island clad in matching grand porcelain slabs, complemented by seamless 24x48 rectified tile flooring with subtle warm amber and graphite currents.',
    features: ['Precision rectified joints', 'Impervious zero-stain porcelain', 'Seamless monolithic flow'],
  },
  {
    id: 'bathroom-spa',
    title: 'Sanctuary Master Bath & Wet Room',
    tagline: 'River-tumbled pebbles meeting luminous Calacatta marble planes',
    category: 'bathroom',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=85',
    flooringUsed: 'Calacatta Goldie 24x48 & River Pebbles',
    productSlug: 'calacatta-goldie-24x48-polished',
    description: 'A light-flooded ensuite sanctuary incorporating curbless shower transitions, freestanding soaker tub, and warm golden marble veining.',
    features: ['Curbless waterproofing with Schluter', 'Slip-resistant natural pebble drainage', 'Radiant underfloor warmth'],
  },
  {
    id: 'commercial-studio',
    title: 'High-Ceiling Creative Loft & Studio',
    tagline: 'Industrial warmth with heavy-duty commercial endurance',
    category: 'commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
    flooringUsed: 'Montauk Black 12x24 Gauged Slate',
    productSlug: 'montauk-black-12x24-gauged',
    description: 'An architectural studio featuring exposed brickwork, black steel fenestration, and cleft Montauk slate that handles high foot traffic while grounding the creative atmosphere.',
    features: ['Natural split stone resilience', 'Zero VOC emissions', 'Acoustic comfort'],
  },
  {
    id: 'bedroom-calm',
    title: 'Serene Japandi Master Suite',
    tagline: 'Muted greige stone finishes that diffuse morning sunbeams',
    category: 'bedroom',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
    flooringUsed: 'Bamboo 24x48 Matte Porcelain',
    productSlug: 'bamboo-24x48-matte',
    description: 'Soft tactile minimalism with unlacquered brass accents, slatted oak partitions, and velvety matte porcelain flooring that remains gentle underfoot year-round.',
    features: ['Anti-glare silky matte touch', 'Hypoallergenic easy-clean surface', 'Radiant in-floor heating ready'],
  },
];

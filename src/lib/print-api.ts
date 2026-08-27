// Print API integration types and configuration

export type PaperType = 'matte' | 'gloss' | 'metallic' | 'fine-art' | 'canvas';
export type FrameType = 'black' | 'gold' | 'ornate' | 'float' | 'none';
export type SizeOption = '8x10' | '11x14' | '16x20' | '18x24' | '24x36' | 'custom';

export interface PrintOption {
  id: string;
  name: string;
  description: string;
  multiplier: number; // Price multiplier
  icon: string;
}

export interface FrameOption {
  id: string;
  name: string;
  description: string;
  price: number; // Fixed price addition
  color: string;
  thumbnail: string;
}

export interface SizeOptionDetail {
  id: SizeOption;
  name: string;
  width: number; // inches
  height: number; // inches
  pixels: { width: number; height: number }; // Minimum recommended pixels
  multiplier: number;
}

export interface PrintProduct {
  id: string;
  artworkId: string;
  title: string;
  imageUrl: string;
  basePrice: number; // Base price for smallest size, matte, no frame
  paperOptions: PaperType[];
  frameOptions: FrameType[];
  sizeOptions: SizeOption[];
  edition?: {
    total: number;
    number: number;
    isSigned: boolean;
    isNumbered: boolean;
    certificateOfAuthenticity: boolean;
  };
}

// Paper types with pricing multipliers
export const PAPER_OPTIONS: Record<PaperType, PrintOption> = {
  matte: {
    id: 'matte',
    name: 'Matte',
    description: 'Smooth, non-reflective surface. Deep blacks, subtle texture.',
    multiplier: 1.0,
    icon: '📄',
  },
  gloss: {
    id: 'gloss',
    name: 'Gloss',
    description: 'High-shine finish. Vibrant colors, reflective surface.',
    multiplier: 1.15,
    icon: '✨',
  },
  metallic: {
    id: 'metallic',
    name: 'Metallic',
    description: 'Pearlescent shimmer. Colors pop with dimensional depth.',
    multiplier: 1.35,
    icon: '🔮',
  },
  'fine-art': {
    id: 'fine-art',
    name: 'Fine Art (Hahnemühle)',
    description: 'Museum-grade archival paper. Textured, luxurious, eternal.',
    multiplier: 1.8,
    icon: '🏛️',
  },
  canvas: {
    id: 'canvas',
    name: 'Canvas',
    description: 'Textured canvas wrap. Gallery-ready, no frame needed.',
    multiplier: 2.2,
    icon: '🎨',
  },
};

// Frame options with fixed prices
export const FRAME_OPTIONS: Record<FrameType, FrameOption> = {
  none: {
    id: 'none',
    name: 'No Frame',
    description: 'Print only. Ready for your own framing.',
    price: 0,
    color: 'transparent',
    thumbnail: '/frames/none.jpg',
  },
  black: {
    id: 'black',
    name: 'Black Wood',
    description: 'Classic black wood frame. Modern, versatile, timeless.',
    price: 45,
    color: '#1a1a1a',
    thumbnail: '/frames/black.jpg',
  },
  gold: {
    id: 'gold',
    name: 'Gold Leaf',
    description: 'Gilded gold frame. Ornate, luxurious, catches the light.',
    price: 120,
    color: '#b8956a',
    thumbnail: '/frames/gold.jpg',
  },
  ornate: {
    id: 'ornate',
    name: 'Ornate Baroque',
    description: 'Hand-carved baroque frame. Museum quality, heavy, regal.',
    price: 280,
    color: '#8b7355',
    thumbnail: '/frames/ornate.jpg',
  },
  float: {
    id: 'float',
    name: 'Float Frame',
    description: 'Print appears to float. Contemporary, minimalist, elegant.',
    price: 85,
    color: '#2a2a2a',
    thumbnail: '/frames/float.jpg',
  },
};

// Standard sizes
export const SIZE_OPTIONS: Record<SizeOption, SizeOptionDetail> = {
  '8x10': {
    id: '8x10',
    name: '8″ × 10″',
    width: 8,
    height: 10,
    pixels: { width: 2400, height: 3000 },
    multiplier: 1.0,
  },
  '11x14': {
    id: '11x14',
    name: '11″ × 14″',
    width: 11,
    height: 14,
    pixels: { width: 3300, height: 4200 },
    multiplier: 1.6,
  },
  '16x20': {
    id: '16x20',
    name: '16″ × 20″',
    width: 16,
    height: 20,
    pixels: { width: 4800, height: 6000 },
    multiplier: 2.5,
  },
  '18x24': {
    id: '18x24',
    name: '18″ × 24″',
    width: 18,
    height: 24,
    pixels: { width: 5400, height: 7200 },
    multiplier: 3.2,
  },
  '24x36': {
    id: '24x36',
    name: '24″ × 36″',
    width: 24,
    height: 36,
    pixels: { width: 7200, height: 10800 },
    multiplier: 5.5,
  },
  custom: {
    id: 'custom',
    name: 'Custom Size',
    width: 0,
    height: 0,
    pixels: { width: 0, height: 0 },
    multiplier: 1.0,
  },
};

// Printful API integration
const PRINTFUL_API_URL = 'https://api.printful.com';
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY || '';

interface PrintfulProduct {
  id: number;
  name: string;
  variant_id: number;
  price: string;
  currency: string;
  files: Array<{
    placement: string;
    image_url: string;
    position: {
      area_width: number;
      area_height: number;
      width: number;
      height: number;
      top: number;
      left: number;
    };
  }>;
  options: Array<{
    id: string;
    value: string;
  }>;
}

interface PrintfulOrder {
  recipient: {
    name: string;
    address1: string;
    city: string;
    state_code: string;
    country_code: string;
    zip: string;
    email: string;
    phone?: string;
  };
  items: Array<{
    variant_id: number;
    quantity: number;
    files: Array<{
      placement: string;
      image_url: string;
    }>;
    options?: Array<{
      id: string;
      value: string;
    }>;
  }>;
}

export async function createPrintfulProduct(artwork: {
  id: string;
  title: string;
  imageUrl: string;
  width: number;
  height: number;
}): Promise<PrintfulProduct | null> {
  if (!PRINTFUL_API_KEY) {
    console.warn('Printful API key not configured');
    return null;
  }

  try {
    // This would create a product in Printful with the artwork
    // For now, return mock data
    return {
      id: Date.now(),
      name: artwork.title,
      variant_id: 4012, // Poster variant
      price: '25.00',
      currency: 'USD',
      files: [{
        placement: 'default',
        image_url: artwork.imageUrl,
        position: {
          area_width: 1800,
          area_height: 2400,
          width: 1800,
          height: 2400,
          top: 0,
          left: 0,
        },
      }],
      options: [],
    };
  } catch (error) {
    console.error('Printful product creation failed:', error);
    return null;
  }
}

export async function submitPrintfulOrder(order: PrintfulOrder): Promise<{ orderId: string; status: string } | null> {
  if (!PRINTFUL_API_KEY) {
    console.warn('Printful API key not configured');
    return null;
  }

  try {
    // Submit order to Printful
    const response = await fetch(`${PRINTFUL_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    const data = await response.json();
    return {
      orderId: data.result.id,
      status: data.result.status,
    };
  } catch (error) {
    console.error('Printful order submission failed:', error);
    return null;
  }
}

// Gelato API integration (alternative)
const GELATO_API_URL = 'https://api.gelato.com/v2';
const GELATO_API_KEY = process.env.GELATO_API_KEY || '';

interface GelatoProduct {
  productUid: string;
  name: string;
  files: Array<{
    type: string;
    url: string;
  }>;
}

interface GelatoOrder {
  orderReferenceId: string;
  customerReferenceId: string;
  currencyIsoCode: string;
  items: Array<{
    itemReferenceId: string;
    productUid: string;
    quantity: number;
    files: Array<{
      type: string;
      url: string;
    }>;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    city: string;
    state: string;
    postCode: string;
    countryCode: string;
    email: string;
    phone?: string;
  };
}

export async function createGelatoOrder(order: GelatoOrder): Promise<{ orderId: string; status: string } | null> {
  if (!GELATO_API_KEY) {
    console.warn('Gelato API key not configured');
    return null;
  }

  try {
    const response = await fetch(`${GELATO_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GELATO_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Gelato-API-Key': GELATO_API_KEY,
      },
      body: JSON.stringify(order),
    });

    const data = await response.json();
    return {
      orderId: data.id,
      status: data.status,
    };
  } catch (error) {
    console.error('Gelato order submission failed:', error);
    return null;
  }
}

// Calculate print price
export function calculatePrintPrice(
  basePrice: number,
  size: SizeOption,
  paper: PaperType,
  frame: FrameType
): number {
  const sizeMultiplier = SIZE_OPTIONS[size]?.multiplier || 1.0;
  const paperMultiplier = PAPER_OPTIONS[paper]?.multiplier || 1.0;
  const framePrice = FRAME_OPTIONS[frame]?.price || 0;

  return Math.round(basePrice * sizeMultiplier * paperMultiplier + framePrice);
}

// Soul-Bound Edition types
export interface SoulBoundEdition {
  id: string;
  artworkId: string;
  editionNumber: number;
  totalEdition: number;
  isSigned: boolean;
  isNumbered: boolean;
  certificateOfAuthenticity: boolean;
  blockchainRecord?: {
    network: 'base' | 'arbitrum';
    contractAddress: string;
    tokenId: string;
    transactionHash: string;
  };
  physicalCertificate: {
    paperType: 'fine-art';
    includesArtistSignature: boolean;
    includesWaxSeal: boolean;
    includesNumbering: boolean;
  };
  price: number;
  status: 'available' | 'reserved' | 'sold' | 'burned';
}

export function generateSoulBoundEditions(
  artworkId: string,
  totalEdition: number,
  basePrice: number,
  artistName: string
): SoulBoundEdition[] {
  return Array.from({ length: totalEdition }, (_, i) => ({
    id: `soul-${artworkId}-${i + 1}`,
    artworkId,
    editionNumber: i + 1,
    totalEdition,
    isSigned: true,
    isNumbered: true,
    certificateOfAuthenticity: true,
    physicalCertificate: {
      paperType: 'fine-art',
      includesArtistSignature: true,
      includesWaxSeal: true,
      includesNumbering: true,
    },
    price: Math.round(basePrice * 3 * (1 + i / totalEdition * 0.5)), // Price increases with edition number
    status: 'available',
  }));
}
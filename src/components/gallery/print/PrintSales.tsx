'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  PAPER_OPTIONS, FRAME_OPTIONS, SIZE_OPTIONS,
  PaperType, FrameType, SizeOption,
  PrintProduct, calculatePrintPrice, SoulBoundEdition, generateSoulBoundEditions
} from '@/lib/print-api';
import { 
  ChevronRight, ChevronLeft, Check, X, 
  Eye, Heart, Share2, Download, 
  Crown, Gem, Award, Shield, 
  Loader2, Truck, Box, RotateCcw,
  Ruler
} from 'lucide-react';

interface PrintSalesProps {
  product: PrintProduct;
  onBuy?: (config: PrintConfiguration) => void;
  onClose?: () => void;
}

interface PrintConfiguration {
  size: SizeOption;
  paper: PaperType;
  frame: FrameType;
  quantity: number;
  customWidth?: number;
  customHeight?: number;
}

const DEFAULT_CONFIG: PrintConfiguration = {
  size: '16x20',
  paper: 'fine-art',
  frame: 'black',
  quantity: 1,
};

export function PrintSales({ product, onBuy, onClose }: PrintSalesProps) {
  const [config, setConfig] = useState<PrintConfiguration>(DEFAULT_CONFIG);
  const [previewZoom, setPreviewZoom] = useState(1);
  const [showSoulBound, setShowSoulBound] = useState(false);
  const [soulBoundEditions] = useState<SoulBoundEdition[]>(
    product.edition ? generateSoulBoundEditions(
      product.id,
      product.edition.total,
      product.basePrice,
      'Artist'
    ) : []
  );
  const [selectedEdition, setSelectedEdition] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const price = useMemo(() => {
    let base = calculatePrintPrice(
      product.basePrice,
      config.size,
      config.paper,
      config.frame
    );
    
    // Soul-bound edition pricing
    if (showSoulBound && selectedEdition !== null) {
      const edition = soulBoundEditions.find(e => e.editionNumber === selectedEdition);
      if (edition) base = edition.price;
    }
    
    return base * config.quantity;
  }, [config, product.basePrice, showSoulBound, selectedEdition, soulBoundEditions]);

  const sizeDetail = SIZE_OPTIONS[config.size];
  const paperDetail = PAPER_OPTIONS[config.paper];
  const frameDetail = FRAME_OPTIONS[config.frame];

  // Check if image meets minimum resolution
  const meetsResolution = useMemo(() => {
    if (!sizeDetail || config.size === 'custom') return true;
    return product.imageWidth >= sizeDetail.pixels.width && 
           product.imageHeight >= sizeDetail.pixels.height;
  }, [config.size, product.imageWidth, product.imageHeight, sizeDetail]);

  const handleConfigChange = useCallback((key: keyof PrintConfiguration, value: unknown) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    // Reset edition selection when config changes
    if (key !== 'quantity') setSelectedEdition(null);
  }, []);

  const handleSizeChange = useCallback((size: SizeOption) => {
    setConfig(prev => ({ ...prev, size }));
    setSelectedEdition(null);
  }, []);

  const handlePaperChange = useCallback((paper: PaperType) => {
    setConfig(prev => ({ ...prev, paper }));
    setSelectedEdition(null);
  }, []);

  const handleFrameChange = useCallback((frame: FrameType) => {
    setConfig(prev => ({ ...prev, frame }));
    setSelectedEdition(null);
  }, []);

  const handleBuy = async () => {
    if (onBuy) {
      setIsLoading(true);
      await onBuy({ ...config, soulBoundEdition: selectedEdition });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen texture-velvet py-12 md:py-20">
      {onClose && (
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-50 btn-whisper p-2 rounded-full"
          aria-label="Close print configurator"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="container-nocturne max-w-6xl">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-ui text-xs uppercase tracking-widest text-blood-400">
              Print Sanctum
            </span>
            {product.edition && (
              <span className="px-3 py-1 bg-blood-500/20 border border-blood-400/30 text-blood-300 text-xs font-ui uppercase tracking-wider rounded-obsidian">
                Soul-Bound Edition
              </span>
            )}
          </div>
          <h1 className="text-display text-3xl md:text-4xl lg:text-5xl gradient-velvet mb-2">
            {product.title}
          </h1>
          <p className="text-body text-text-secondary">
            Configure your physical manifestation. Each print is produced on demand with archival materials.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Preview Panel */}
          <div className="sticky top-24 space-y-6">
            {/* Main Preview */}
            <div className="card-velvet overflow-hidden relative">
              <div className="relative" style={{ aspectRatio: '4/5' }}>
                {/* Frame preview */}
                {config.frame !== 'none' && (
                  <div className="absolute inset-0 pointer-events-none z-10" style={{
                    boxShadow: `inset 0 0 0 ${config.frame === 'ornate' ? '60px' : config.frame === 'float' ? '30px' : '40px'} ${frameDetail.color}`,
                    border: config.frame === 'float' ? '4px solid transparent' : 'none',
                  }}>
                    {config.frame === 'ornate' && (
                      <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, ${frameDetail.color}22, ${frameDetail.color}22 2px, transparent 2px, transparent 4px)`,
                        opacity: 0.3,
                        pointerEvents: 'none',
                      }} />
                    )}
                  </div>
                )}

                {/* Paper texture overlay */}
                <div className="absolute inset-0 pointer-events-none z-5 opacity-30" style={{
                  backgroundImage: config.paper === 'canvas' 
                    ? 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27 opacity=%270.1%27/%3E%3C/svg%3E")'
                    : config.paper === 'fine-art'
                    ? 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%273%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27 opacity=%270.08%27/%3E%3C/svg%3E")'
                    : config.paper === 'metallic'
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)'
                    : 'none',
                  backgroundSize: config.paper === 'canvas' ? '200px' : 'cover',
                }} />

                {/* Artwork image */}
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-contain p-8 md:p-12 transition-transform duration-300"
                  style={{ transform: `scale(${previewZoom})` }}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Matting preview for framed prints */}
                {config.frame !== 'none' && config.frame !== 'float' && (
                  <div className="absolute inset-20 md:inset-24 pointer-events-none z-15" style={{
                    boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.1), inset 0 0 0 4px rgba(255,255,255,0.02)',
                  }} />
                )}
              </div>

              {/* Zoom controls */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-2 bg-void-900/80 backdrop-blur-sm border border-border-subtle rounded-obsidian p-2">
                <button
                  onClick={() => setPreviewZoom(Math.max(0.5, previewZoom - 0.25))}
                  className="btn-whisper p-1.5"
                  aria-label="Zoom out"
                >
                  <RotateCcw className="w-4 h-4 -rotate-45" />
                </button>
                <span className="text-ui text-text-secondary text-sm font-mono px-2">
                  {Math.round(previewZoom * 100)}%
                </span>
                <button
                  onClick={() => setPreviewZoom(Math.min(3, previewZoom + 0.25))}
                  className="btn-whisper p-1.5"
                  aria-label="Zoom in"
                >
                  <RotateCcw className="w-4 h-4 rotate-45" />
                </button>
                <button
                  onClick={() => setPreviewZoom(1)}
                  className="btn-whisper p-1.5"
                  aria-label="Reset zoom"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Resolution warning */}
              {!meetsResolution && config.size !== 'custom' && (
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-blood-500/20 border border-blood-400/30 text-blood-300 px-3 py-2 rounded-velvet text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 flex-shrink-0" />
                  <span>Image may appear soft at this size. Minimum: {sizeDetail?.pixels.width}×{sizeDetail?.pixels.height}px</span>
                </div>
              )}
            </div>

            {/* Soul-Bound Edition Toggle */}
            {product.edition && (
              <div className="card-velvet p-4 border-blood-400/20 bg-blood-500/5">
                <label className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSoulBound}
                    onChange={(e) => {
                      setShowSoulBound(e.target.checked);
                      if (!e.target.checked) setSelectedEdition(null);
                    }}
                    className="w-5 h-5 accent-blood-400"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-body text-text-primary">
                      <Crown className="w-5 h-5 text-wine-300" />
                      <span>Soul-Bound Edition</span>
                    </div>
                    <p className="text-ui text-text-muted text-sm ml-7 mt-1">
                      Limited to {product.edition.total} signed & numbered prints with certificate of authenticity, wax seal, and blockchain record on Base.
                    </p>
                  </div>
                </label>
                
                {showSoulBound && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {soulBoundEditions.slice(0, 12).map(edition => (
                      <button
                        key={edition.id}
                        onClick={() => setSelectedEdition(edition.editionNumber === selectedEdition ? null : edition.editionNumber)}
                        className={cn(
                          'p-3 rounded-velvet text-center transition-all duration-[var(--dur-flutter)]',
                          'flex flex-col items-center gap-1',
                          selectedEdition === edition.editionNumber
                            ? 'bg-blood-500/20 border-blood-400/50 shadow-blood-glow/20'
                            : edition.status === 'sold'
                            ? 'bg-void-700 border-border-subtle text-text-muted cursor-not-allowed'
                            : 'border-border-subtle hover:border-wine-300/50 hover:bg-void-700/50'
                        )}
                        disabled={edition.status === 'sold'}
                      >
                        <span className="text-display-alt text-lg">
                          {edition.editionNumber}/{edition.totalEdition}
                        </span>
                        <span className="text-ui text-xs text-text-muted">${edition.price}</span>
                        {edition.status === 'sold' && (
                          <span className="text-xs text-blood-400">SOLD</span>
                        )}
                      </button>
                    ))}
                    {soulBoundEditions.length > 12 && (
                      <button className="btn-whisper text-sm">
                        +{soulBoundEditions.length - 12} more
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Price Summary */}
            <div className="card-velvet p-6 border-wine-300/20">
              <h3 className="text-display-alt text-xl gradient-wine mb-4">Investment</h3>
              <dl className="space-y-3 text-body">
                <div className="flex justify-between">
                  <dt className="text-text-secondary">Base Print</dt>
                  <dd className="text-text-primary">${product.basePrice}</dd>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <dt>Size: {sizeDetail?.name}</dt>
                  <dd>×{sizeDetail?.multiplier || 1}x</dd>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <dt>Paper: {paperDetail.name}</dt>
                  <dd>×{paperDetail.multiplier}x</dd>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <dt>Frame: {frameDetail.name}</dt>
                  <dd>{frameDetail.price > 0 ? `+$${frameDetail.price}` : 'None'}</dd>
                </div>
                {showSoulBound && selectedEdition !== null && (
                  <div className="flex justify-between border-t border-border-subtle pt-3">
                    <dt className="text-blood-300 flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Edition #{selectedEdition}
                    </dt>
                    <dd className="text-blood-300 font-display">Included</dd>
                  </div>
                )}
                <div className="flex justify-between border-t border-border-subtle pt-3 text-display">
                  <dt>Total ({config.quantity}x)</dt>
                  <dd className="gradient-blood">${price.toLocaleString()}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* Size Selector */}
            <section className="card-velvet p-6">
              <h3 className="text-display-alt text-lg gradient-velvet mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5" />
                Dimensions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {(Object.keys(SIZE_OPTIONS) as SizeOption[]).map(size => {
                  const detail = SIZE_OPTIONS[size];
                  const isSelected = config.size === size;
                  return (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={cn(
                        'p-4 rounded-velvet border-2 text-left transition-all duration-[var(--dur-flutter)]',
                        isSelected
                          ? 'border-blood-400 bg-blood-500/10 shadow-blood-glow/20'
                          : 'border-border-subtle hover:border-wine-300/50 hover:bg-void-700/50'
                      )}
                    >
                      <div className="text-display-alt font-medium text-text-primary">{detail.name}</div>
                      <div className="text-ui text-text-muted text-xs mt-1">
                        {detail.width}″ × {detail.height}″
                      </div>
                      <div className="text-ui text-text-muted text-xs mt-1">
                        Min: {detail.pixels.width}×{detail.pixels.height}px
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-blood-400 mt-2" />}
                    </button>
                  );
                })}
              </div>
              
              {/* Custom size input */}
              {config.size === 'custom' && (
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <input
                    type="number"
                    min="1"
                    max="60"
                    step="0.5"
                    value={config.customWidth || ''}
                    onChange={(e) => handleConfigChange('customWidth', parseFloat(e.target.value) || 0)}
                    placeholder="Width (inches)"
                    className="bg-void-900 border border-border-subtle rounded-velvet p-3 text-text-primary focus:outline-none focus:border-blood-400"
                  />
                  <input
                    type="number"
                    min="1"
                    max="60"
                    step="0.5"
                    value={config.customHeight || ''}
                    onChange={(e) => handleConfigChange('customHeight', parseFloat(e.target.value) || 0)}
                    placeholder="Height (inches)"
                    className="bg-void-900 border border-border-subtle rounded-velvet p-3 text-text-primary focus:outline-none focus:border-blood-400"
                  />
                </div>
              )}
            </section>

            {/* Paper Selector */}
            <section className="card-velvet p-6">
              <h3 className="text-display-alt text-lg gradient-velvet mb-4 flex items-center gap-2">
                <Gem className="w-5 h-5" />
                Paper
              </h3>
              <div className="space-y-3">
                {(Object.keys(PAPER_OPTIONS) as PaperType[]).map(paper => {
                  const detail = PAPER_OPTIONS[paper];
                  const isSelected = config.paper === paper;
                  return (
                    <button
                      key={paper}
                      onClick={() => handlePaperChange(paper)}
                      className={cn(
                        'w-full p-4 rounded-velvet border-2 text-left transition-all duration-[var(--dur-flutter)]',
                        'flex items-center gap-4',
                        isSelected
                          ? 'border-blood-400 bg-blood-500/10 shadow-blood-glow/20'
                          : 'border-border-subtle hover:border-wine-300/50 hover:bg-void-700/50'
                      )}
                    >
                      <div className="w-12 h-12 rounded-obsidian bg-void-900 border border-border-subtle flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{detail.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-body font-medium text-text-primary">{detail.name}</h4>
                        <p className="text-ui text-text-muted text-sm">{detail.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-display-alt text-wine-300">×{detail.multiplier}</div>
                        {isSelected && <Check className="w-5 h-5 text-blood-400 ml-auto mt-1" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Frame Selector */}
            <section className="card-velvet p-6">
              <h3 className="text-display-alt text-lg gradient-velvet mb-4 flex items-center gap-2">
                <Box className="w-5 h-5" />
                Frame
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(Object.keys(FRAME_OPTIONS) as FrameType[]).map(frame => {
                  const detail = FRAME_OPTIONS[frame];
                  const isSelected = config.frame === frame;
                  return (
                    <button
                      key={frame}
                      onClick={() => handleFrameChange(frame)}
                      className={cn(
                        'p-4 rounded-velvet border-2 text-center transition-all duration-[var(--dur-flutter)]',
                        isSelected
                          ? 'border-blood-400 bg-blood-500/10 shadow-blood-glow/20'
                          : 'border-border-subtle hover:border-wine-300/50 hover:bg-void-700/50'
                      )}
                    >
                      <div className="w-16 h-16 mx-auto mb-3 rounded-obsidian bg-void-900 border border-border-subtle relative overflow-hidden">
                        {detail.id !== 'none' && (
                          <div className="absolute inset-4" style={{
                            border: `${frame === 'ornate' ? '8px' : frame === 'float' ? '4px' : '6px'} solid ${detail.color}`,
                          }}>
                            {frame === 'ornate' && (
                              <div className="absolute inset-0 opacity-30" style={{
                                backgroundImage: `repeating-linear-gradient(45deg, ${detail.color}44, ${detail.color}44 1px, transparent 1px, transparent 2px)`,
                              }} />
                            )}
                          </div>
                        )}
                        {detail.id === 'none' && (
                          <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                            <X className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <h4 className="text-body font-medium text-text-primary">{detail.name}</h4>
                      <p className="text-ui text-text-muted text-xs mb-2">{detail.description}</p>
                      <div className="text-display-alt text-wine-300">
                        {detail.price > 0 ? `+$${detail.price}` : 'Included'}
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-blood-400 mx-auto mt-2" />}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Quantity */}
            <section className="card-velvet p-6">
              <h3 className="text-display-alt text-lg gradient-velvet mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setConfig(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                  className="btn-whisper p-3 w-12 h-12"
                  aria-label="Decrease quantity"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={config.quantity}
                  onChange={(e) => setConfig(prev => ({ ...prev, quantity: Math.max(1, Math.min(10, parseInt(e.target.value) || 1)) }))}
                  className="w-24 text-center bg-void-900 border border-border-subtle rounded-velvet p-3 text-2xl font-display text-text-primary focus:outline-none focus:border-blood-400"
                />
                <button
                  onClick={() => setConfig(prev => ({ ...prev, quantity: Math.min(10, prev.quantity + 1) }))}
                  className="btn-whisper p-3 w-12 h-12"
                  aria-label="Increase quantity"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </section>

            {/* Shipping Info */}
            <section className="card-velvet p-6 border-border-subtle">
              <h3 className="text-display-alt text-lg gradient-wine mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipping & Protection
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-text-secondary">
                  <Shield className="w-4 h-4 text-wine-300" />
                  <span>Insured shipping included</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Box className="w-4 h-4 text-wine-300" />
                  <span>Archival packaging</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <RotateCcw className="w-4 h-4 text-wine-300" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Award className="w-4 h-4 text-wine-300" />
                  <span>Certificate of authenticity</span>
                </div>
              </div>
              <p className="text-ui text-text-muted text-xs mt-4">
                Production: 5–7 business days. Shipping: 3–10 business days (domestic), 7–21 (international).
              </p>
            </section>

            {/* Buy Button */}
            <div className="sticky bottom-4 space-y-3">
              <button
                onClick={handleBuy}
                disabled={isLoading}
                className="btn-ritual w-full py-4 text-lg flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Consecrating...
                  </>
                ) : (
                  <>
                    <span>Acquire for ${price.toLocaleString()}</span>
                    <Truck className="w-5 h-5" />
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-6 text-ui text-text-muted text-xs">
                <button className="btn-whisper flex items-center gap-1" onClick={() => {}}>
                  <Heart className="w-4 h-4" />
                  Save
                </button>
                <button className="btn-whisper flex items-center gap-1" onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.title,
                      text: `Print configuration: ${config.size}, ${config.paper}, ${config.frame}`,
                      url: window.location.href,
                    });
                  }
                }}>
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* JSON-LD for Product/Offer */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: product.title,
              image: product.imageUrl,
              description: `Museum-quality print of "${product.title}". Available in multiple papers, frames, and sizes.`,
              brand: {
                '@type': 'Brand',
                name: 'Projectsixxx Gallery',
              },
              offers: {
                '@type': 'Offer',
                url: window.location.href,
                priceCurrency: 'USD',
                price: price.toFixed(2),
                availability: 'https://schema.org/InStock',
                seller: {
                  '@type': 'Organization',
                  name: 'Projectsixxx Gallery',
                },
              },
              ...(product.edition && {
                isVariantOf: {
                  '@type': 'Product',
                  name: `${product.title} (Original)`,
                  description: `Original artwork. Limited edition of ${product.edition.total}.`,
                },
              }),
            }),
          }}
        />
      </div>
    </div>
  );
}
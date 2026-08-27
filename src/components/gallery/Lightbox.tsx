'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import {
  BloodRainMaterial,
  VelvetVignetteMaterial,
  GoldLeafDecayMaterial,
  ObsidianReflectionMaterial,
  TransitionMaterial,
  ShaderType,
  getShaderForCategory,
} from '@/shaders';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight, Share2, Heart, Download, Maximize, Minimize } from 'lucide-react';

// Extend Three.js with our custom materials
extend({
  BloodRainMaterial,
  VelvetVignetteMaterial,
  GoldLeafDecayMaterial,
  ObsidianReflectionMaterial,
  TransitionMaterial,
});

declare module '@react-three/fiber' {
  interface ThreeElements {
    bloodRainMaterial: typeof BloodRainMaterial;
    velvetVignetteMaterial: typeof VelvetVignetteMaterial;
    goldLeafDecayMaterial: typeof GoldLeafDecayMaterial;
    obsidianReflectionMaterial: typeof ObsidianReflectionMaterial;
    transitionMaterial: typeof TransitionMaterial;
  }
}

interface Artwork {
  id: string;
  slug: string;
  title: string;
  artist: {
    name: string;
    slug: string;
    avatar?: string;
  };
  category: 'digital' | 'photography' | 'generative' | 'commissions';
  image: string;
  width: number;
  height: number;
  year: number;
  medium: string;
  dimensions: string;
  description?: string;
  summonedBy?: string;
  price?: number;
  isForSale?: boolean;
  edition?: {
    total: number;
    number: number;
    isSigned: boolean;
  };
}

interface LightboxProps {
  artworks: Artwork[];
  initialIndex: number;
  onClose: () => void;
  onShare?: (artwork: Artwork) => void;
  onCollect?: (artwork: Artwork) => void;
  onBuyPrint?: (artwork: Artwork) => void;
}

function ShaderPlane({
  shaderType,
  texture,
  intensity = 1.0,
  mousePosition,
}: {
  shaderType: ShaderType;
  texture: THREE.Texture | null;
  intensity?: number;
  mousePosition?: { x: number; y: number };
}) {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!materialRef.current) return;
    const uniforms = materialRef.current.uniforms;
    uniforms.uIntensity.value = intensity;
    uniforms.uTime.value = timeRef.current;
    if (texture) {
      uniforms.uTexture.value = texture;
      texture.needsUpdate = true;
    }
  }, [shaderType, texture, intensity]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = timeRef.current;
      if (mousePosition && 'uMouse' in materialRef.current.uniforms) {
        materialRef.current.uniforms.uMouse.value.set(
          mousePosition.x * 2 - 1,
          -(mousePosition.y * 2 - 1)
        );
      }
    }
  });

  const materialNode = useMemo(() => {
    switch (shaderType) {
      case 'bloodRain':
        return <bloodRainMaterial ref={materialRef} attachments={['material']} />;
      case 'velvetVignette':
        return <velvetVignetteMaterial ref={materialRef} attachments={['material']} />;
      case 'goldLeafDecay':
        return <goldLeafDecayMaterial ref={materialRef} attachments={['material']} />;
      case 'obsidianReflection':
        return <obsidianReflectionMaterial ref={materialRef} attachments={['material']} />;
      default:
        return <bloodRainMaterial ref={materialRef} attachments={['material']} />;
    }
  }, [shaderType]);

  return (
    <mesh geometry={new THREE.PlaneGeometry(2, 2)}>
      {materialNode}
    </mesh>
  );
}

// Transition plane for shader-based transitions between images
function TransitionPlane({
  fromTexture,
  toTexture,
  progress,
  shaderType = 'bloodRain',
}: {
  fromTexture: THREE.Texture | null;
  toTexture: THREE.Texture | null;
  progress: number;
  shaderType?: ShaderType;
}) {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = timeRef.current;
      materialRef.current.uniforms.uProgress.value = progress;
      if (fromTexture) materialRef.current.uniforms.uFromTexture.value = fromTexture;
      if (toTexture) materialRef.current.uniforms.uToTexture.value = toTexture;
    }
  });

  return (
    <mesh geometry={new THREE.PlaneGeometry(2, 2)}>
      <transitionMaterial ref={materialRef} attachments={['material']} />
    </mesh>
  );
}

export function Lightbox({
  artworks,
  initialIndex,
  onClose,
  onShare,
  onCollect,
  onBuyPrint,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<1 | -1>(1);
  const [showMetadata, setShowMetadata] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  const currentArtwork = artworks[currentIndex];
  const currentShader = getShaderForCategory(currentArtwork.category);
  const nextIndex = (currentIndex + 1) % artworks.length;
  const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;

  // Load textures for current and adjacent artworks
  const currentTexture = useTexture(currentArtwork.image);
  const nextTexture = useTexture(artworks[nextIndex].image);
  const prevTexture = useTexture(artworks[prevIndex].image);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && !isTransitioning) {
        navigate(1);
      } else if (e.key === 'ArrowLeft' && !isTransitioning) {
        navigate(-1);
      } else if (e.key === ' ') {
        e.preventDefault();
        setShowMetadata(!showMetadata);
      } else if (e.key === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning, onClose, showMetadata]);

  // Handle transition animation
  useEffect(() => {
    if (!isTransitioning) return;

    const startTime = performance.now();
    const duration = 800; // ms

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setTransitionProgress(eased);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsTransitioning(false);
        setTransitionProgress(0);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isTransitioning]);

  const navigate = useCallback((direction: 1 | -1) => {
    if (isTransitioning) return;
    setTransitionDirection(direction);
    setIsTransitioning(true);
    
    // Update index after transition starts
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + direction + artworks.length) % artworks.length);
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }, 50);
  }, [isTransitioning, artworks.length]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(console.error);
      setIsFullscreen(false);
    }
  }, []);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Mouse handling for pan/zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      setZoom((prev) => Math.max(0.5, Math.min(3, prev - e.deltaY * 0.001)));
    } else {
      setPan((prev) => ({
        x: prev.x - e.deltaX * 0.5,
        y: prev.y - e.deltaY * 0.5,
      }));
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0 && zoom > 1) {
      isPanning.current = true;
      panStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
      e.preventDefault();
    }
  }, [zoom, pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });

    if (isPanning.current) {
      setPan({
        x: e.clientX - panStart.current.x,
        y: e.clientY - panStart.current.y,
      });
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePosition(null);
    isPanning.current = false;
  }, []);

  const handleDoubleClick = useCallback(() => {
    setZoom((prev) => (prev > 1 ? 1 : 2));
    setPan({ x: 0, y: 0 });
  }, []);

  // Touch handling for mobile
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchZoomRef = useRef<number>(1);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchZoomRef.current = Math.sqrt(dx * dx + dy * dy);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1 && touchStartRef.current) {
      const dx = e.touches[0].clientX - touchStartRef.current.x;
      const dy = e.touches[0].clientY - touchStartRef.current.y;
      
      if (zoom > 1) {
        setPan((prev) => ({
          x: prev.x + dx,
          y: prev.y + dy,
        }));
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else {
        // Swipe navigation
        if (Math.abs(dx) > 50 && !isTransitioning) {
          navigate(dx > 0 ? -1 : 1);
          touchStartRef.current = null;
        }
      }
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const scale = distance / touchZoomRef.current;
      setZoom((prev) => Math.max(0.5, Math.min(3, prev * scale)));
      touchZoomRef.current = distance;
    }
  }, [zoom, isTransitioning, navigate]);

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
  }, []);

  if (!currentArtwork) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-void-950',
        isFullscreen ? 'fullscreen' : ''
      )}
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${currentArtwork.title} by ${currentArtwork.artist.name}`}
    >
      {/* Background click to close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main viewer area */}
      <div
        className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      >
        {/* Shader-rendered current image */}
        <div
          className="relative overflow-hidden"
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transition: isPanning.current ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          {/* Current artwork with shader */}
          <div style={{ width: '100%', height: '100%' }}>
            <Canvas
              camera={{ position: [0, 0, 1], fov: 50 }}
              gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
              style={{ width: '100%', height: '100%', display: 'block' }}
            >
              <ShaderPlane
                shaderType={currentShader}
                texture={currentTexture}
                intensity={1.0}
                mousePosition={mousePosition || undefined}
              />
            </Canvas>
          </div>

          {/* Transition overlay */}
          {isTransitioning && (
            <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <Canvas
                camera={{ position: [0, 0, 1], fov: 50 }}
                gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
                style={{ width: '100%', height: '100%', display: 'block' }}
              >
                <TransitionPlane
                  fromTexture={transitionDirection === 1 ? currentTexture : prevTexture}
                  toTexture={transitionDirection === 1 ? nextTexture : currentTexture}
                  progress={transitionProgress}
                  shaderType={currentShader}
                />
              </Canvas>
            </div>
          )}
        </div>

        {/* Navigation arrows */}
        {artworks.length > 1 && (
          <>
            <button
              className={cn(
                'absolute left-4 md:left-8 top-1/2 -translate-y-1/2',
                'btn-whisper p-3 rounded-full',
                'hover:bg-blood-500/20 hover:border-blood-400/50',
                'transition-all duration-[var(--dur-flutter)]',
                'opacity-60 hover:opacity-100',
                'hidden md:flex'
              )}
              onClick={() => navigate(-1)}
              onMouseDown={(e) => e.stopPropagation()}
              aria-label="Previous artwork"
              disabled={isTransitioning}
            >
              <ChevronLeft className="w-6 h-6 text-wine-300" />
            </button>
            <button
              className={cn(
                'absolute right-4 md:right-8 top-1/2 -translate-y-1/2',
                'btn-whisper p-3 rounded-full',
                'hover:bg-blood-500/20 hover:border-blood-400/50',
                'transition-all duration-[var(--dur-flutter)]',
                'opacity-60 hover:opacity-100',
                'hidden md:flex'
              )}
              onClick={() => navigate(1)}
              onMouseDown={(e) => e.stopPropagation()}
              aria-label="Next artwork"
              disabled={isTransitioning}
            >
              <ChevronRight className="w-6 h-6 text-wine-300" />
            </button>
            {/* Mobile swipe hints */}
            <div className={cn(
              'absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 md:hidden',
              'text-text-muted text-xs font-ui'
            )}>
              <span>Swipe to navigate</span>
              <span>Double tap to zoom</span>
            </div>
          </>
        )}

        {/* Close button */}
        <button
          className={cn(
            'absolute top-4 right-4 md:top-6 md:right-6',
            'btn-whisper p-2 rounded-full',
            'hover:bg-blood-500/20 hover:border-blood-400/50',
            'transition-all duration-[var(--dur-flutter)]',
            'z-10'
          )}
          onClick={onClose}
          onMouseDown={(e) => e.stopPropagation()}
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5 text-wine-300" />
        </button>

        {/* Fullscreen toggle */}
        <button
          className={cn(
            'absolute top-4 right-14 md:top-6 md:right-14',
            'btn-whisper p-2 rounded-full',
            'hover:bg-wine-300/10 hover:border-wine-300/50',
            'transition-all duration-[var(--dur-flutter)]',
            'z-10'
          )}
          onClick={toggleFullscreen}
          onMouseDown={(e) => e.stopPropagation()}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? <Minimize className="w-5 h-5 text-wine-300" /> : <Maximize className="w-5 h-5 text-wine-300" />}
        </button>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-text-muted text-ui text-sm md:hidden">
          {currentIndex + 1} / {artworks.length}
        </div>
      </div>

      {/* Metadata sidebar */}
      {showMetadata && (
        <aside
          className={cn(
            'fixed right-0 top-0 bottom-0 w-full md:w-96',
            'bg-void-900/95 backdrop-blur-xl border-l border-border-subtle',
            'overflow-y-auto p-6 md:p-8',
            'transform transition-transform duration-[var(--dur-sigh)] ease-[var(--ease-sigh)]',
            'z-40'
          )}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-ui text-xs uppercase tracking-wider text-blood-400">
                {currentArtwork.category.charAt(0).toUpperCase() + currentArtwork.category.slice(1)}
              </span>
              <h2 className="text-display text-3xl md:text-4xl mt-2 text-text-primary">
                {currentArtwork.title}
              </h2>
            </div>
            <button
              className="btn-whisper p-2 rounded-obsidian md:hidden"
              onClick={() => setShowMetadata(false)}
              aria-label="Hide metadata"
            >
              <X className="w-5 h-5 text-wine-300" />
            </button>
          </div>

          {/* Artist info */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-void-800/50 rounded-velvet border border-border-subtle">
            {currentArtwork.artist.avatar && (
              <img
                src={currentArtwork.artist.avatar}
                alt={currentArtwork.artist.name}
                className="w-12 h-12 rounded-full border border-wine-300/30 object-cover"
              />
            )}
            <div>
              <p className="text-ui text-text-muted text-sm">Summoned By</p>
              <a
                href={`/gallery/artist/${currentArtwork.artist.slug}`}
                className="link-ritual text-body font-medium text-text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  window.location.href = `/gallery/artist/${currentArtwork.artist.slug}`;
                }}
              >
                {currentArtwork.artist.name}
              </a>
            </div>
          </div>

          {/* Artwork details */}
          <dl className="space-y-4 mb-6 text-body">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-ui text-text-muted text-xs uppercase tracking-wider">Medium</dt>
                <dd className="text-text-primary mt-1">{currentArtwork.medium}</dd>
              </div>
              <div>
                <dt className="text-ui text-text-muted text-xs uppercase tracking-wider">Year</dt>
                <dd className="text-text-primary mt-1">{currentArtwork.year}</dd>
              </div>
              <div>
                <dt className="text-ui text-text-muted text-xs uppercase tracking-wider">Dimensions</dt>
                <dd className="text-text-primary mt-1">{currentArtwork.dimensions}</dd>
              </div>
              <div>
                <dt className="text-ui text-text-muted text-xs uppercase tracking-wider">Resolution</dt>
                <dd className="text-text-primary mt-1">{currentArtwork.width} × {currentArtwork.height} px</dd>
              </div>
            </div>
            {currentArtwork.edition && (
              <div className="p-4 bg-blood-500/10 border border-blood-400/20 rounded-velvet">
                <dt className="text-ui text-text-muted text-xs uppercase tracking-wider">Edition</dt>
                <dd className="text-text-primary mt-1">
                  {currentArtwork.edition.number} / {currentArtwork.edition.total}
                  {currentArtwork.edition.isSigned && ' • Signed'}
                </dd>
              </div>
            )}
          </dl>

          {/* Description */}
          {currentArtwork.description && (
            <div className="mb-6">
              <dt className="text-ui text-text-muted text-xs uppercase tracking-wider mb-2">Invocation</dt>
              <dd className="text-body text-text-secondary whitespace-pre-wrap">{currentArtwork.description}</dd>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-border-subtle">
            {currentArtwork.isForSale && currentArtwork.price && (
              <button
                className="btn-ritual flex-1 min-w-[140px]"
                onClick={() => onBuyPrint?.(currentArtwork)}
              >
                Acquire Print — {currentArtwork.price.toLocaleString()} USD
              </button>
            )}
            <button
              className="btn-covenant flex-1 min-w-[140px]"
              onClick={() => onCollect?.(currentArtwork)}
            >
              <Heart className="w-4 h-4 mr-2" />
              Collect
            </button>
            <button
              className="btn-whisper flex-1 min-w-[140px]"
              onClick={() => onShare?.(currentArtwork)}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
            {currentArtwork.isForSale && (
              <button
                className="btn-whisper flex-1 min-w-[140px]"
                onClick={() => onBuyPrint?.(currentArtwork)}
              >
                <Download className="w-4 h-4 mr-2" />
                High-Res Download
              </button>
            )}
          </div>

          {/* Shader selector (for demo/exploration) */}
          <details className="mt-6">
            <summary className="text-ui text-text-secondary cursor-pointer flex items-center gap-2">
              <span>Shader Lens</span>
              <ChevronRight className="w-4 h-4 text-text-muted" />
            </summary>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {(['bloodRain', 'velvetVignette', 'goldLeafDecay', 'obsidianReflection'] as ShaderType[]).map(
                (shader) => (
                  <button
                    key={shader}
                    className={cn(
                      'btn-whisper py-2 text-sm',
                      currentShader === shader
                        ? 'bg-blood-500/20 border-blood-400/50 text-blood-300'
                        : ''
                    )}
                    onClick={() => {
                      // This would require state management for shader override
                    }}
                  >
                    {shader.charAt(0).toUpperCase() + shader.slice(1).replace(/([A-Z])/g, ' $1')}
                  </button>
                )
              )}
            </div>
          </details>
        </aside>
      )}

      {/* Mobile metadata toggle */}
      {!showMetadata && (
        <button
          className="fixed bottom-4 right-4 md:hidden btn-ritual rounded-full p-3 shadow-blood-glow z-50"
          onClick={() => setShowMetadata(true)}
          aria-label="Show metadata"
        >
          <span className="sr-only">Show artwork details</span>
        </button>
      )}
    </div>
  );
}
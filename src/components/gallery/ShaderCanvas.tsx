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
  ShaderType,
} from '@/shaders';
import { cn } from '@/lib/utils';

// Extend Three.js with our custom materials
extend({
  BloodRainMaterial,
  VelvetVignetteMaterial,
  GoldLeafDecayMaterial,
  ObsidianReflectionMaterial,
});

declare module '@react-three/fiber' {
  interface ThreeElements {
    bloodRainMaterial: typeof BloodRainMaterial;
    velvetVignetteMaterial: typeof VelvetVignetteMaterial;
    goldLeafDecayMaterial: typeof GoldLeafDecayMaterial;
    obsidianReflectionMaterial: typeof ObsidianReflectionMaterial;
  }
}

interface ShaderPlaneProps {
  shaderType: ShaderType;
  texture: THREE.Texture | null;
  intensity?: number;
  mousePosition?: { x: number; y: number };
}

// Shader plane component that renders a full-screen quad with the shader
function ShaderPlane({ shaderType, texture, intensity = 1.0, mousePosition }: ShaderPlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const timeRef = useRef(0);

  // Set up material based on shader type
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

  // Animation loop
  useFrame((_, delta) => {
    timeRef.current += delta;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = timeRef.current;

      // Mouse interaction - subtle distortion
      if (mousePosition) {
        // Only set if the uniform exists (some shaders may not have uMouse)
        if ('uMouse' in materialRef.current.uniforms) {
          materialRef.current.uniforms.uMouse.value.set(
            mousePosition.x * 2 - 1,
            -(mousePosition.y * 2 - 1)
          );
        }
      }
    }
  });

  // Select material based on type
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

interface ShaderCanvasProps {
  shaderType: ShaderType;
  imageSrc: string;
  intensity?: number;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function ShaderCanvas({
  shaderType,
  imageSrc,
  intensity = 1.0,
  className,
  onLoad,
  onError,
}: ShaderCanvasProps) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      imageSrc,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = true;
        setTexture(tex);
        onLoad?.();
      },
      undefined,
      (err) => {
        console.error('Shader texture load error:', err);
        onError?.();
      }
    );

    return () => {
      if (texture) texture.dispose();
    };
  }, [imageSrc, onLoad, onError]);

  // Mouse tracking for interactive shaders
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePosition(null);
  }, []);

  if (!texture) {
    return (
      <div
        ref={containerRef}
        className={cn('relative overflow-hidden', className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ aspectRatio: '16/10' }}
      >
        <div className="absolute inset-0 velvet-shimmer" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ aspectRatio: '16/10' }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ShaderPlane
          shaderType={shaderType}
          texture={texture}
          intensity={intensity}
          mousePosition={mousePosition || undefined}
        />
      </Canvas>
    </div>
  );
}

// Specialized shader components for easier usage
export function BloodRainCanvas(props: Omit<ShaderCanvasProps, 'shaderType'>) {
  return <ShaderCanvas shaderType="bloodRain" {...props} />;
}

export function VelvetVignetteCanvas(props: Omit<ShaderCanvasProps, 'shaderType'>) {
  return <ShaderCanvas shaderType="velvetVignette" {...props} />;
}

export function GoldLeafDecayCanvas(props: Omit<ShaderCanvasProps, 'shaderType'>) {
  return <ShaderCanvas shaderType="goldLeafDecay" {...props} />;
}

export function ObsidianReflectionCanvas(props: Omit<ShaderCanvasProps, 'shaderType'>) {
  return <ShaderCanvas shaderType="obsidianReflection" {...props} />;
}

// Auto-select shader based on artwork category
export function getShaderForCategory(category: string): ShaderType {
  switch (category) {
    case 'digital':
      return 'bloodRain';
    case 'photography':
      return 'velvetVignette';
    case 'generative':
      return 'goldLeafDecay';
    case 'commissions':
      return 'obsidianReflection';
    default:
      return 'bloodRain';
  }
}

export function AutoShaderCanvas(props: Omit<ShaderCanvasProps, 'shaderType'> & { category: string }) {
  const shaderType = getShaderForCategory(props.category);
  return <ShaderCanvas shaderType={shaderType} {...props} />;
}
import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Transition Shader - Crossfade with displacement for lightbox transitions
export const TransitionMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uFromTexture: null,
    uToTexture: null,
    uDisplacementScale: 0.1,
    uDisplacementSpeed: 2.0,
    uColorBlood: new THREE.Color(0.75, 0.15, 0.15),
    uColorVoid: new THREE.Color(0.04, 0.04, 0.06),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform float uProgress;
    uniform sampler2D uFromTexture;
    uniform sampler2D uToTexture;
    uniform float uDisplacementScale;
    uniform float uDisplacementSpeed;
    uniform vec3 uColorBlood;
    uniform vec3 uColorVoid;

    varying vec2 vUv;

    // Hash function
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    // Noise
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
      );
    }

    // FBM for displacement
    float fbm(vec2 p, int octaves) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    // Smoothstep with configurable edge
    float smoothstepCustom(float edge0, float edge1, float x) {
      float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
      return t * t * (3.0 - 2.0 * t);
    }

    void main() {
      vec2 uv = vUv;
      
      // Displacement based on noise and progress
      float displacement = fbm(uv * 5.0 + vec2(uTime * uDisplacementSpeed, 0.0), 4);
      displacement = displacement * uDisplacementScale * sin(uProgress * 3.14159);
      
      // Apply displacement to UV coordinates
      vec2 displacedUv = uv + vec2(displacement, displacement * 0.5);
      
      // Clamp UVs
      displacedUv = clamp(displacedUv, 0.0, 1.0);
      
      // Sample both textures
      vec4 fromColor = texture2D(uFromTexture, displacedUv);
      vec4 toColor = texture2D(uToTexture, uv);
      
      // Crossfade with smoothstep for organic feel
      float fadeProgress = smoothstepCustom(0.0, 1.0, uProgress);
      
      // Add blood veil during transition
      float bloodVeil = sin(uProgress * 3.14159) * 0.15;
      vec3 bloodTint = uColorBlood * bloodVeil * (1.0 - abs(uv.x - 0.5) * 2.0);
      
      // Combine
      vec3 finalColor = mix(fromColor.rgb, toColor.rgb, fadeProgress);
      finalColor += bloodTint;
      
      // Subtle vignette during transition
      float vignette = 1.0 - length(uv - 0.5) * 0.3 * uProgress;
      finalColor *= vignette;
      
      // Gamma correction
      finalColor = pow(finalColor, vec3(1.0 / 2.2));
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ TransitionMaterial: TransitionMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    transitionMaterial: typeof TransitionMaterial;
  }
}
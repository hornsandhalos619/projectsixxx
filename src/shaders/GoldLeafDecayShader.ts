import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Gold Leaf Decay Shader - Cracked gold leaf with oxidation and decay effects
export const GoldLeafDecayMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
    uTexture: null,
    uIntensity: 1.0,
    uCrackDensity: 0.5,
    uCrackWidth: 0.02,
    uOxidation: 0.3,
    uLeafScale: 1.0,
    uDriftSpeed: 0.1,
    uColorGold: new THREE.Color(0.83, 0.65, 0.45), // wine-300
    uColorGoldDark: new THREE.Color(0.72, 0.58, 0.42), // wine-400
    uColorOxidized: new THREE.Color(0.45, 0.35, 0.2), // oxidized gold
    uColorCrack: new THREE.Color(0.04, 0.04, 0.06), // void-950
    uColorBase: new THREE.Color(0.07, 0.07, 0.1), // void-900
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform sampler2D uTexture;
    uniform float uIntensity;
    uniform float uCrackDensity;
    uniform float uCrackWidth;
    uniform float uOxidation;
    uniform float uLeafScale;
    uniform float uDriftSpeed;
    uniform vec3 uColorGold;
    uniform vec3 uColorGoldDark;
    uniform vec3 uColorOxidized;
    uniform vec3 uColorCrack;
    uniform vec3 uColorBase;

    varying vec2 vUv;
    varying vec3 vPosition;

    // Hash
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    float hash3(vec3 p) {
      return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
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

    float noise3(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(
          mix(hash3(i), hash3(i + vec3(1.0, 0.0, 0.0)), f.x),
          mix(hash3(i + vec3(0.0, 1.0, 0.0)), hash3(i + vec3(1.0, 1.0, 0.0)), f.x),
          f.y
        ),
        mix(
          mix(hash3(i + vec3(0.0, 0.0, 1.0)), hash3(i + vec3(1.0, 0.0, 1.0)), f.x),
          mix(hash3(i + vec3(0.0, 1.0, 1.0)), hash3(i + vec3(1.0, 1.0, 1.0)), f.x),
          f.y
        ),
        f.z
      );
    }

    // FBM
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

    // Voronoi for gold leaf cells
    vec2 voronoi(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 res = vec2(1.0);
      float minDist = 10.0;
      for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
          vec2 neighbor = vec2(float(x), float(y));
          vec2 point = hash(i + neighbor + 0.5) - 0.5;
          float dist = length(f - neighbor - point);
          if (dist < minDist) {
            minDist = dist;
            res = point;
          }
        }
      }
      return vec2(minDist, hash(i + floor(res + 0.5)));
    }

    // Crack network using edge detection on voronoi
    float cracks(vec2 p, float density, float width) {
      vec2 vor = voronoi(p * density);
      float edges = smoothstep(0.0, width, vor.x) * (1.0 - smoothstep(width, width * 2.0, vor.x));
      
      // Secondary crack network
      vec2 vor2 = voronoi(p * density * 0.5 + 100.0);
      float edges2 = smoothstep(0.0, width * 0.5, vor2.x) * (1.0 - smoothstep(width * 0.5, width, vor2.x));
      
      return max(edges, edges2 * 0.5);
    }

    // Gold leaf texture with brushed metal look
    vec3 goldLeaf(vec2 uv, float time) {
      // Base gold color variation per leaf cell
      vec2 cell = floor(uv * uLeafScale * 20.0);
      float cellHash = hash(cell);
      vec3 leafColor = mix(uColorGoldDark, uColorGold, cellHash);
      
      // Brushed metal lines
      float brush = sin(uv.y * 200.0 + cellHash * 10.0 + time * 0.1) * 0.02;
      leafColor += vec3(brush) * uColorGold;
      
      // Subtle noise for surface imperfection
      float surfaceNoise = fbm(uv * 50.0 + vec2(time * 0.02), 3) * 0.05;
      leafColor += vec3(surfaceNoise) * uColorGold;
      
      return leafColor;
    }

    // Oxidation patches
    float oxidation(vec2 uv, float time) {
      float ox = 0.0;
      for (int i = 0; i < 4; i++) {
        float scale = 10.0 * pow(2.0, float(i));
        ox += fbm(uv * scale + vec2(time * 0.001, 0.0), 3) * pow(0.5, float(i));
      }
      return smoothstep(0.6, 0.8, ox) * uOxidation;
    }

    // Gold flecks drifting animation
    float goldFlecks(vec2 uv, float time) {
      float flecks = 0.0;
      vec2 driftUv = uv + vec2(time * uDriftSpeed * 0.1, time * uDriftSpeed * 0.05);
      for (int i = 0; i < 6; i++) {
        float seed = float(i) * 41.3;
        vec2 center = vec2(
          fract(hash(vec2(seed, time * 0.05)) * 20.0) / 20.0,
          fract(hash(vec2(seed + 100.0, time * 0.03)) * 20.0) / 20.0
        );
        float dist = length(driftUv * 20.0 - center * 20.0);
        flecks += smoothstep(0.5, 0.0, dist) * hash(vec2(seed, time * 0.02));
      }
      return flecks * 0.02;
    }

    void main() {
      vec2 uv = vUv;
      vec2 screenUv = gl_FragCoord.xy / uResolution;
      
      // Base texture
      vec4 baseTexture = texture2D(uTexture, uv);
      vec3 baseColor = baseTexture.rgb;
      
      // Gold leaf cells
      vec3 leafColor = goldLeaf(uv, uTime);
      
      // Crack network
      float crackAmount = cracks(uv, uCrackDensity * 15.0, uCrackWidth);
      
      // Oxidation
      float oxAmount = oxidation(uv, uTime);
      
      // Gold flecks
      float flecks = goldFlecks(uv, uTime);
      
      // Combine: start with base, overlay gold leaf where cracks aren't
      vec3 finalColor = baseColor;
      
      // Gold leaf shows through in non-cracked areas
      float leafMask = 1.0 - crackAmount;
      finalColor = mix(finalColor, leafColor, leafMask * 0.6 * uIntensity);
      
      // Oxidation overlays
      finalColor = mix(finalColor, uColorOxidized, oxAmount * 0.4);
      
      // Cracks are deep void
      finalColor = mix(finalColor, uColorCrack, crackAmount);
      
      // Gold flecks on top
      finalColor += uColorGold * flecks;
      
      // Subtle vignette
      float vignette = 1.0 - length(uv - 0.5) * 0.4;
      finalColor *= vignette;
      
      // Gamma correction
      finalColor = pow(finalColor, vec3(1.0 / 2.2));
      
      gl_FragColor = vec4(finalColor, baseTexture.a);
    }
  `
);

extend({ GoldLeafDecayMaterial: GoldLeafDecayMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    goldLeafDecayMaterial: typeof GoldLeafDecayMaterial;
  }
}
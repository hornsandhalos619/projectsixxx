import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Velvet Vignette Shader - Deep velvet texture with subtle sheen and vignetting
export const VelvetVignetteMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
    uTexture: null,
    uIntensity: 1.0,
    uVignetteStrength: 0.6,
    uVignetteRadius: 0.7,
    uVelvetScale: 1.0,
    uSheenAngle: 45.0,
    uSheenIntensity: 0.15,
    uColorBase: new THREE.Color(0.07, 0.07, 0.1),
    uColorSheen: new THREE.Color(0.83, 0.65, 0.45),
    uColorDeep: new THREE.Color(0.04, 0.04, 0.06),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalMatrix * normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform sampler2D uTexture;
    uniform float uIntensity;
    uniform float uVignetteStrength;
    uniform float uVignetteRadius;
    uniform float uVelvetScale;
    uniform float uSheenAngle;
    uniform float uSheenIntensity;
    uniform vec3 uColorBase;
    uniform vec3 uColorSheen;
    uniform vec3 uColorDeep;

    varying vec2 vUv;
    varying vec3 vNormal;

    // Hash function
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    // 3D noise for velvet fibers
    float noise3d(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(
          mix(hash(i.xy), hash(i.xy + vec2(1.0, 0.0)), f.x),
          mix(hash(i.xy + vec2(0.0, 1.0)), hash(i.xy + vec2(1.0, 1.0)), f.x),
          f.y
        ),
        mix(
          mix(hash(i.xy + vec2(0.0, 0.0)), hash(i.xy + vec2(1.0, 0.0)), f.x),
          mix(hash(i.xy + vec2(0.0, 1.0)), hash(i.xy + vec2(1.0, 1.0)), f.x),
          f.y
        ),
        f.z
      );
    }

    // FBM for organic texture
    float fbm(vec3 p, int octaves) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        value += amplitude * noise3d(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    // Velvet fiber direction field
    vec2 velvetDirection(vec2 uv, float scale) {
      float angle = uSheenAngle * 3.14159 / 180.0;
      vec2 dir = vec2(cos(angle), sin(angle));
      // Add subtle variation based on position
      float variation = sin(uv.x * 20.0) * cos(uv.y * 20.0) * 0.1;
      return dir + vec2(variation, -variation * 0.5);
    }

    // Specular highlight for velvet sheen
    float velvetSheen(vec2 uv, vec3 viewDir, vec3 normal) {
      vec2 fiberDir = velvetDirection(uv, uVelvetScale);
      vec3 fiberDir3 = normalize(vec3(fiberDir, 0.1));
      float NdotV = max(dot(normal, viewDir), 0.0);
      float NdotH = max(dot(normal, fiberDir3), 0.0);
      float VdotH = max(dot(viewDir, fiberDir3), 0.0);
      
      // Anisotropic highlight
      float specular = pow(NdotH, 50.0) * pow(VdotH, 10.0);
      return specular * uSheenIntensity;
    }

    // Subsurface scattering approximation for deep velvet
    float velvetSubsurface(vec2 uv) {
      float scatter = 0.0;
      for (int i = 0; i < 3; i++) {
        float scale = 50.0 * pow(2.0, float(i));
        scatter += fbm(vec3(uv * scale, uTime * 0.01), 3) * pow(0.5, float(i));
      }
      return scatter * 0.02;
    }

    void main() {
      vec2 uv = vUv;
      vec2 screenUv = gl_FragCoord.xy / uResolution;
      
      // Base texture
      vec4 baseTexture = texture2D(uTexture, uv);
      vec3 baseColor = baseTexture.rgb;
      
      // Velvet fiber texture (procedural)
      vec3 p = vec3(uv * uVelvetScale * 100.0, uTime * 0.05);
      float fibers = fbm(p, 4);
      
      // Subtle color variation from fibers
      vec3 velvetColor = mix(uColorDeep, uColorBase, fibers * 0.3 + 0.7);
      
      // Sheen calculation (view-dependent)
      vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
      vec3 normal = normalize(vNormal);
      float sheen = velvetSheen(uv, viewDir, normal);
      
      // Subsurface glow
      float subsurface = velvetSubsurface(uv);
      
      // Combine velvet texture with base image
      vec3 texturedColor = mix(baseColor, velvetColor, 0.3 * uIntensity);
      texturedColor += uColorSheen * sheen;
      texturedColor += uColorBase * subsurface;
      
      // Vignette
      float dist = length(uv - 0.5) * 2.0;
      float vignette = smoothstep(uVignetteRadius, 1.0, dist);
      vignette = 1.0 - vignette * uVignetteStrength;
      
      // Apply vignette
      texturedColor *= vignette;
      
      // Subtle animated breathing
      float breath = 1.0 + sin(uTime * 0.5) * 0.01;
      texturedColor *= breath;
      
      // Gamma correction
      texturedColor = pow(texturedColor, vec3(1.0 / 2.2));
      
      gl_FragColor = vec4(texturedColor, baseTexture.a);
    }
  `
);

extend({ VelvetVignetteMaterial: VelvetVignetteMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    velvetVignetteMaterial: typeof VelvetVignetteMaterial;
  }
}
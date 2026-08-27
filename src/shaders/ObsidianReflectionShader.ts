import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Obsidian Reflection Shader - Dark glassy surface with subtle reflections and depth
export const ObsidianReflectionMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
    uTexture: null,
    uIntensity: 1.0,
    uReflectivity: 0.3,
    uRoughness: 0.1,
    uDepthScale: 1.0,
    uCausticsSpeed: 0.5,
    uColorObsidian: new THREE.Color(0.04, 0.04, 0.06), // void-950
    uColorDeep: new THREE.Color(0.02, 0.02, 0.03),
    uColorHighlight: new THREE.Color(0.15, 0.15, 0.2),
    uColorReflection: new THREE.Color(0.08, 0.06, 0.1),
    uColorBlood: new THREE.Color(0.75, 0.15, 0.15), // blood-400
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      vViewDir = normalize(cameraPosition - vWorldPosition);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform sampler2D uTexture;
    uniform float uIntensity;
    uniform float uReflectivity;
    uniform float uRoughness;
    uniform float uDepthScale;
    uniform float uCausticsSpeed;
    uniform vec3 uColorObsidian;
    uniform vec3 uColorDeep;
    uniform vec3 uColorHighlight;
    uniform vec3 uColorReflection;
    uniform vec3 uColorBlood;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;

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

    float fbm3(vec3 p, int octaves) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        value += amplitude * noise3(p);
        p *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    // Caustics pattern
    float caustics(vec2 uv, float time) {
      vec2 p = uv * 20.0 + vec2(time * uCausticsSpeed * 0.5, time * uCausticsSpeed * 0.3);
      float c = 0.0;
      for (int i = 0; i < 4; i++) {
        float scale = pow(2.0, float(i));
        c += abs(sin(p.x * scale + noise(vec2(p.y * scale, time * 0.1)))) * pow(0.5, float(i));
      }
      return c * 0.1;
    }

    // Fresnel effect for glass-like reflection
    float fresnel(vec3 viewDir, vec3 normal, float power) {
      return pow(1.0 - max(dot(viewDir, normal), 0.0), power);
    }

    // GGX distribution for microfacet specular
    float ggxDistribution(float NdotH, float roughness) {
      float a = roughness * roughness;
      float a2 = a * a;
      float NdotH2 = NdotH * NdotH;
      float denom = (NdotH2 * (a2 - 1.0) + 1.0);
      return a2 / (3.14159 * denom * denom);
    }

    // Depth layers - simulating internal structure
    float depthLayers(vec2 uv, float time) {
      float depth = 0.0;
      for (int i = 0; i < 5; i++) {
        float layerDepth = float(i) * 0.2;
        float scale = 10.0 * pow(1.5, float(i));
        float n = fbm3(vec3(uv * scale, time * 0.01 + layerDepth), 3);
        depth += smoothstep(0.4, 0.6, n) * pow(0.6, float(i));
      }
      return depth * uDepthScale;
    }

    // Subtle vein/crack structure in obsidian
    float obsidianVeins(vec2 uv, float time) {
      float veins = 0.0;
      vec2 p = uv * 30.0;
      for (int i = 0; i < 3; i++) {
        float n = noise(p + vec2(time * 0.001, 0.0));
        n = pow(abs(n - 0.5) * 2.0, 3.0);
        veins += n * pow(0.5, float(i));
        p *= 2.0;
      }
      return veins * 0.03;
    }

    void main() {
      vec2 uv = vUv;
      vec2 screenUv = gl_FragCoord.xy / uResolution;
      
      // Base texture
      vec4 baseTexture = texture2D(uTexture, uv);
      vec3 baseColor = baseTexture.rgb;
      
      // View and normal
      vec3 viewDir = vViewDir;
      vec3 normal = vNormal;
      float NdotV = max(dot(normal, viewDir), 0.0);
      
      // Depth layers for internal complexity
      float depth = depthLayers(uv, uTime);
      
      // Obsidian base color with depth variation
      vec3 obsidianColor = mix(uColorDeep, uColorObsidian, depth);
      
      // Veins/cracks
      float veins = obsidianVeins(uv, uTime);
      obsidianColor = mix(obsidianColor, uColorBlood * 0.1, veins);
      
      // Fresnel reflection
      float fresnelTerm = fresnel(viewDir, normal, 3.0);
      vec3 reflectionColor = uColorReflection * fresnelTerm * uReflectivity;
      
      // Specular highlight (GGX)
      vec3 halfDir = normalize(viewDir + vec3(0.0, 0.0, 1.0));
      float NdotH = max(dot(normal, halfDir), 0.0);
      float specular = ggxDistribution(NdotH, uRoughness) * fresnelTerm * 0.5;
      vec3 specularColor = uColorHighlight * specular;
      
      // Caustics (subtle light patterns)
      float caustic = caustics(uv, uTime);
      
      // Environment reflection simulation (dark room)
      vec3 envReflection = vec3(0.02) * (1.0 - NdotV) * 0.3;
      
      // Combine all layers
      vec3 finalColor = baseColor;
      
      // Base obsidian shows through where texture is dark
      float luminance = dot(baseColor, vec3(0.299, 0.587, 0.114));
      float obsidianMask = smoothstep(0.1, 0.4, 1.0 - luminance);
      finalColor = mix(finalColor, obsidianColor, obsidianMask * 0.7 * uIntensity);
      
      // Add reflections
      finalColor += reflectionColor * (1.0 - luminance * 0.5);
      finalColor += specularColor;
      finalColor += envReflection;
      finalColor += uColorHighlight * caustic;
      
      // Subtle animated pulse (heartbeat)
      float pulse = 1.0 + sin(uTime * 1.2) * 0.005;
      finalColor *= pulse;
      
      // Vignette for depth
      float vignette = 1.0 - length(uv - 0.5) * 0.5;
      finalColor *= vignette;
      
      // Gamma correction
      finalColor = pow(finalColor, vec3(1.0 / 2.2));
      
      gl_FragColor = vec4(finalColor, baseTexture.a);
    }
  `
);

extend({ ObsidianReflectionMaterial: ObsidianReflectionMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    obsidianReflectionMaterial: typeof ObsidianReflectionMaterial;
  }
}
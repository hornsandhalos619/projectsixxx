import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Blood Rain Shader - Dark visceral rain with blood-colored droplets
export const BloodRainMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
    uTexture: null,
    uIntensity: 1.0,
    uSpeed: 1.0,
    uDensity: 0.5,
    uColorA: new THREE.Color(0.75, 0.15, 0.15), // blood-400
    uColorB: new THREE.Color(0.55, 0.12, 0.12), // blood-500
    uColorC: new THREE.Color(0.36, 0.08, 0.08), // blood-600
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
    uniform vec2 uResolution;
    uniform sampler2D uTexture;
    uniform float uIntensity;
    uniform float uSpeed;
    uniform float uDensity;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;

    varying vec2 vUv;

    // Hash function for pseudo-randomness
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    // 2D noise
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
      );
    }

    // FBM noise for organic movement
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

    // Blood droplet shape
    float droplet(vec2 uv, vec2 center, float size, float elongation) {
      vec2 diff = uv - center;
      diff.y *= elongation;
      float dist = length(diff);
      return smoothstep(size, size - 0.01, dist);
    }

    void main() {
      vec2 uv = vUv;
      vec2 screenUv = gl_FragCoord.xy / uResolution;
      
      // Base texture sampling
      vec4 baseColor = texture2D(uTexture, uv);
      
      // Time-based animation
      float time = uTime * uSpeed;
      
      // Rain layers - multiple octaves for depth
      float rain = 0.0;
      vec3 rainColor = vec3(0.0);
      
      // Layer 1: Heavy drops
      for (int i = 0; i < 8; i++) {
        float seed = float(i) * 17.3;
        vec2 offset = vec2(
          fbm(vec2(seed, time * 0.3 + seed), 3),
          fbm(vec2(seed + 100.0, time * 0.5 + seed), 3)
        );
        vec2 dropCenter = fract(uv * uDensity * 3.0 + offset);
        float drop = droplet(dropCenter, vec2(0.5, 0.5), 0.008, 3.0 + sin(time + seed) * 0.5);
        float alpha = drop * (0.3 + 0.4 * noise(vec2(seed, time)));
        rain += alpha;
        rainColor += mix(uColorC, uColorB, noise(vec2(seed, time * 0.7))) * alpha;
      }
      
      // Layer 2: Fine mist
      float mist = fbm(uv * 10.0 + vec2(time * 0.2, time * 0.1), 4) * 0.15;
      rainColor += uColorA * mist;
      
      // Layer 3: Streaks (vertical trails)
      vec2 streakUv = uv;
      streakUv.y += time * 0.5;
      float streaks = 0.0;
      for (int i = 0; i < 5; i++) {
        float seed = float(i) * 23.7;
        float streak = noise(vec2(streakUv.x * 50.0 + seed, streakUv.y * 10.0 + seed + time));
        streak = pow(streak, 8.0) * 0.02;
        streaks += streak;
        rainColor += uColorB * streak;
      }
      
      // Blood splatter on impact (bottom of screen)
      float splashZone = smoothstep(0.7, 1.0, uv.y);
      float splatter = 0.0;
      for (int i = 0; i < 4; i++) {
        float seed = float(i) * 31.1;
        vec2 splatCenter = vec2(
          fract(hash(vec2(seed, time * 0.1)) * 10.0),
          0.85 + 0.1 * sin(time * 2.0 + seed)
        );
        float dist = length(uv - splatCenter);
        float splat = smoothstep(0.05, 0.0, dist) * splashZone;
        splatter += splat * 0.3;
        rainColor += uColorA * splat * 0.5;
      }
      
      // Combine all rain effects
      float totalRain = min(rain + mist + streaks + splatter, 1.0) * uIntensity;
      
      // Apply rain over base texture with screen blending
      vec3 finalColor = baseColor.rgb;
      finalColor = mix(finalColor, rainColor, totalRain * 0.7);
      
      // Add subtle vignette
      float vignette = 1.0 - length(uv - 0.5) * 0.3;
      finalColor *= vignette;
      
      // Gamma correction
      finalColor = pow(finalColor, vec3(1.0 / 2.2));
      
      gl_FragColor = vec4(finalColor, baseColor.a);
    }
  `
);

extend({ BloodRainMaterial: BloodRainMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    bloodRainMaterial: typeof BloodRainMaterial;
  }
}
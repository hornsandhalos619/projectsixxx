export { BloodRainMaterial } from './BloodRainShader';
export { VelvetVignetteMaterial } from './VelvetVignetteShader';
export { GoldLeafDecayMaterial } from './GoldLeafDecayShader';
export { ObsidianReflectionMaterial } from './ObsidianReflectionShader';
export { TransitionMaterial } from './TransitionShader';

export type ShaderType = 'bloodRain' | 'velvetVignette' | 'goldLeafDecay' | 'obsidianReflection';

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

export const SHADER_UNIFORMS: Record<ShaderType, Record<string, unknown>> = {
  bloodRain: {
    uIntensity: 1.0,
    uSpeed: 1.0,
    uDensity: 0.5,
  },
  velvetVignette: {
    uIntensity: 1.0,
    uVignetteStrength: 0.6,
    uVignetteRadius: 0.7,
    uVelvetScale: 1.0,
    uSheenIntensity: 0.15,
  },
  goldLeafDecay: {
    uIntensity: 1.0,
    uCrackDensity: 0.5,
    uCrackWidth: 0.02,
    uOxidation: 0.3,
    uLeafScale: 1.0,
    uDriftSpeed: 0.1,
  },
  obsidianReflection: {
    uIntensity: 1.0,
    uReflectivity: 0.3,
    uRoughness: 0.1,
    uDepthScale: 1.0,
    uCausticsSpeed: 0.5,
  },
};

export const SHADER_NAMES: Record<ShaderType, string> = {
  bloodRain: 'Blood Rain',
  velvetVignette: 'Velvet Vignette',
  goldLeafDecay: 'Gold Leaf Decay',
  obsidianReflection: 'Obsidian Reflection',
};

export const SHADER_DESCRIPTIONS: Record<ShaderType, string> = {
  bloodRain: 'Visceral arterial droplets falling through darkness',
  velvetVignette: 'Deep piled velvet with catching sheen',
  goldLeafDecay: 'Cracked gilding oxidizing into beauty',
  obsidianReflection: 'Volcanic glass reflecting the void',
};
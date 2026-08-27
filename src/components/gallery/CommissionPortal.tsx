'use client';

import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  ChevronRight, ChevronLeft, Check, X, 
  FileText, Palette, Ruler, DollarSign, Clock, 
  Image as ImageIcon, ArrowRight, ArrowLeft,
  Heart, Sparkles, Crown, Gem
} from 'lucide-react';

interface CommissionBrief {
  concept: string;
  references: string[];
  style: string;
  dimensions: string;
  budget: number;
  timeline: string;
  contactEmail: string;
  contactName: string;
}

type Step = 'concept' | 'style' | 'dimensions' | 'budget' | 'timeline' | 'references' | 'review';

const STEPS: { id: Step; label: string; icon: React.ComponentType<{ className?: string }>; description: string }[] = [
  { id: 'concept', label: 'Concept', icon: FileText, description: 'Describe your vision' },
  { id: 'style', label: 'Style', icon: Palette, description: 'Choose aesthetic direction' },
  { id: 'dimensions', label: 'Dimensions', icon: Ruler, description: 'Size & format' },
  { id: 'budget', label: 'Budget', icon: DollarSign, description: 'Investment range' },
  { id: 'timeline', label: 'Timeline', icon: Clock, description: 'When you need it' },
  { id: 'references', label: 'References', icon: ImageIcon, description: 'Visual inspiration' },
  { id: 'review', label: 'Review', icon: Sparkles, description: 'Confirm & summon' },
];

const STYLE_OPTIONS = [
  { id: 'dark-fantasy', name: 'Dark Fantasy', description: 'Epic, mythological, atmospheric', icon: Crown, basePrice: 1000 },
  { id: 'occult-symbolism', name: 'Occult Symbolism', description: 'Sigils, geometry, esoteric', icon: Gem, basePrice: 800 },
  { id: 'gothic-portrait', name: 'Gothic Portrait', description: 'Character-focused, emotional', icon: Heart, basePrice: 1200 },
  { id: 'abstract-void', name: 'Abstract Void', description: 'Non-representational, texture-heavy', icon: Sparkles, basePrice: 600 },
  { id: 'generative-code', name: 'Generative Code', description: 'Algorithmic, evolving, code-based', icon: Gem, basePrice: 400 },
  { id: 'analog-photography', name: 'Analog Photography', description: 'Wet plate, platinum, silver gelatin', icon: Crown, basePrice: 2000 },
];

const TIER_PRICING = {
  acolyte: { multiplier: 1.0, name: 'Acolyte', description: 'Single artist, standard timeline, 2 revisions', features: ['1 artist', 'Standard timeline', '2 revisions', 'Digital delivery'] },
  adept: { multiplier: 2.5, name: 'Adept', description: 'Senior artist, priority queue, 4 revisions, print included', features: ['Senior artist', 'Priority queue', '4 revisions', 'Signed print', 'Process documentation'] },
  archmage: { multiplier: 5.0, name: 'Archmage', description: 'Lead artist, dedicated schedule, unlimited revisions, framed original', features: ['Lead artist', 'Dedicated schedule', 'Unlimited revisions', 'Framed original', 'Process documentation', 'Video timelapse', 'Rights negotiation'] },
};

export function CommissionPortal() {
  const [currentStep, setCurrentStep] = useState<Step>('concept');
  const [brief, setBrief] = useState<CommissionBrief>({
    concept: '',
    references: [],
    style: '',
    dimensions: '',
    budget: 0,
    timeline: '',
    contactEmail: '',
    contactName: '',
  });
  const [selectedTier, setSelectedTier] = useState<'acolyte' | 'adept' | 'archmage'>('acolyte');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof CommissionBrief, string>>>({});

  const currentStepIndex = STEPS.findIndex(s => s.id === currentStep);
  const canGoNext = useCallback(() => {
    switch (currentStep) {
      case 'concept':
        return brief.concept.trim().length >= 50;
      case 'style':
        return brief.style !== '';
      case 'dimensions':
        return brief.dimensions.trim().length > 0;
      case 'budget':
        return brief.budget > 0;
      case 'timeline':
        return brief.timeline !== '';
      case 'references':
        return true; // Optional
      case 'review':
        return brief.contactName.trim().length > 0 && brief.contactEmail.includes('@');
      default:
        return false;
    }
  }, [currentStep, brief]);

  const validateStep = useCallback(() => {
    const newErrors: Partial<Record<keyof CommissionBrief, string>> = {};
    switch (currentStep) {
      case 'concept':
        if (brief.concept.trim().length < 50) {
          newErrors.concept = 'The vision must be at least 50 characters. Speak from the depths.';
        }
        break;
      case 'style':
        if (!brief.style) {
          newErrors.style = 'Choose a path. The style guides the summoning.';
        }
        break;
      case 'dimensions':
        if (!brief.dimensions.trim()) {
          newErrors.dimensions = 'Define the vessel. Dimensions are required.';
        }
        break;
      case 'budget':
        if (brief.budget <= 0) {
          newErrors.budget = 'State your offering. The spirits require tribute.';
        }
        break;
      case 'timeline':
        if (!brief.timeline) {
          newErrors.timeline = 'When must the work manifest?';
        }
        break;
      case 'review':
        if (!brief.contactName.trim()) {
          newErrors.contactName = 'Your true name is required for the covenant.';
        }
        if (!brief.contactEmail.includes('@')) {
          newErrors.contactEmail = 'A valid scrying mirror (email) is needed.';
        }
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentStep, brief]);

  const nextStep = useCallback(() => {
    if (validateStep()) {
      if (currentStepIndex < STEPS.length - 1) {
        setCurrentStep(STEPS[currentStepIndex + 1].id);
      }
    }
  }, [currentStepIndex, validateStep]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStep(STEPS[currentStepIndex - 1].id);
    }
  }, [currentStepIndex]);

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In production: send to backend, create commission record, send confirmation email
    console.log('Commission brief submitted:', { ...brief, tier: selectedTier });
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    
    // Reset after showing success
    setTimeout(() => {
      setSubmitStatus('idle');
      setCurrentStep('concept');
      setBrief({
        concept: '', references: [], style: '', dimensions: '',
        budget: 0, timeline: '', contactEmail: '', contactName: ''
      });
      setSelectedTier('acolyte');
    }, 5000);
  };

  // Render step content
  const renderStep = () => {
    switch (currentStep) {
      case 'concept':
        return (
          <div className="space-y-6">
            <label htmlFor="concept" className="block text-ui text-text-secondary mb-3">
              Describe the Vision <span className="text-blood-400">*</span>
            </label>
            <textarea
              id="concept"
              value={brief.concept}
              onChange={(e) => setBrief(prev => ({ ...prev, concept: e.target.value }))}
              rows={8}
              className={cn(
                'w-full bg-void-900 border border-border-subtle rounded-velvet p-4 text-text-primary placeholder:text-text-muted',
                'focus:outline-none focus:border-blood-400 transition-colors',
                errors.concept && 'border-blood-400 focus:border-blood-400'
              )}
              placeholder="What haunts you? Describe the theme, mood, characters, symbols, narrative... Be as vivid as the darkness allows. The more detail, the truer the manifestation."
              aria-describedby={errors.concept ? 'concept-error' : 'concept-hint'}
            />
            {errors.concept && (
              <p id="concept-error" className="text-sm text-blood-400 flex items-center gap-1 blood-drip" role="alert">
                <X className="w-4 h-4" /> {errors.concept}
              </p>
            )}
            {!errors.concept && (
              <p id="concept-hint" className="text-xs text-text-muted">
                Minimum 50 characters. Current: {brief.concept.length}
              </p>
            )}
          </div>
        );

      case 'style':
        return (
          <div className="space-y-6">
            <label className="block text-ui text-text-secondary mb-3">
              Choose the Aesthetic Path <span className="text-blood-400">*</span>
            </label>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" role="radiogroup" aria-label="Art style">
              {STYLE_OPTIONS.map((style) => {
                const Icon = style.icon;
                const isSelected = brief.style === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setBrief(prev => ({ ...prev, style: style.id }))}
                    className={cn(
                      'relative p-4 rounded-velvet border-2 transition-all duration-[var(--dur-flutter)]',
                      'flex flex-col items-start gap-3',
                      isSelected
                        ? 'border-blood-400 bg-blood-500/10 shadow-blood-glow/20'
                        : 'border-border-subtle hover:border-wine-300/50 hover:bg-void-700/50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-obsidian bg-void-900 border border-border-subtle flex items-center justify-center">
                        <Icon className="w-5 h-5 text-wine-300" />
                      </div>
                      <div>
                        <h4 className="text-body font-medium text-text-primary">{style.name}</h4>
                        <p className="text-ui text-text-muted text-xs">{style.description}</p>
                      </div>
                    </div>
                    <div className="text-ui text-text-muted text-sm">
                      From ${style.basePrice.toLocaleString()}
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blood-400 flex items-center justify-center">
                        <Check className="w-3 h-3 text-void-950" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {errors.style && (
              <p className="text-sm text-blood-400 flex items-center gap-1 blood-drip" role="alert">
                <X className="w-4 h-4" /> {errors.style}
              </p>
            )}
          </div>
        );

      case 'dimensions':
        return (
          <div className="space-y-6">
            <label htmlFor="dimensions" className="block text-ui text-text-secondary mb-3">
              Define the Vessel <span className="text-blood-400">*</span>
            </label>
            <input
              id="dimensions"
              type="text"
              value={brief.dimensions}
              onChange={(e) => setBrief(prev => ({ ...prev, dimensions: e.target.value }))}
              className={cn(
                'w-full bg-void-900 border border-border-subtle rounded-velvet p-4 text-text-primary placeholder:text-text-muted',
                'focus:outline-none focus:border-blood-400 transition-colors',
                errors.dimensions && 'border-blood-400 focus:border-blood-400'
              )}
              placeholder="e.g., 3000x4000px, 24x36in, 4096x4096px, A2"
              aria-describedby={errors.dimensions ? 'dim-error' : 'dim-hint'}
            />
            {errors.dimensions && (
              <p id="dim-error" className="text-sm text-blood-400 flex items-center gap-1 blood-drip" role="alert">
                <X className="w-4 h-4" /> {errors.dimensions}
              </p>
            )}
            {!errors.dimensions && (
              <p id="dim-hint" className="text-xs text-text-muted">
                Specify pixel dimensions for digital, inches/cm for print. Aspect ratio will be preserved.
              </p>
            )}
            
            <div className="card-velvet p-4 border-border-subtle">
              <h4 className="text-ui text-text-secondary mb-3">Common Formats</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  '1920x1080 (HD)', '3840x2160 (4K)', '3000x3000 (Square)',
                  '24x36in (Poster)', '18x24in (Print)', '11x17in (Tabloid)',
                  '4096x4096 (Generative)', 'A3 (297x420mm)'
                ].map(format => (
                  <button
                    key={format}
                    type="button"
                    onClick={() => setBrief(prev => ({ ...prev, dimensions: format }))}
                    className="btn-whisper text-sm justify-start px-3 py-2"
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'budget':
        return (
          <div className="space-y-6">
            <label htmlFor="budget" className="block text-ui text-text-secondary mb-3">
              State Your Offering <span className="text-blood-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-wine-300 text-xl font-mono">$</span>
              <input
                id="budget"
                type="number"
                min="100"
                step="100"
                value={brief.budget}
                onChange={(e) => setBrief(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
                className={cn(
                  'w-full pl-10 pr-4 py-4 bg-void-900 border border-border-subtle rounded-velvet text-text-primary placeholder:text-text-muted',
                  'focus:outline-none focus:border-blood-400 transition-colors text-2xl font-mono',
                  errors.budget && 'border-blood-400 focus:border-blood-400'
                )}
                placeholder="1000"
                aria-describedby={errors.budget ? 'budget-error' : 'budget-hint'}
              />
            </div>
            {errors.budget && (
              <p id="budget-error" className="text-sm text-blood-400 flex items-center gap-1 blood-drip" role="alert">
                <X className="w-4 h-4" /> {errors.budget}
              </p>
            )}
            {!errors.budget && (
              <p id="budget-hint" className="text-xs text-text-muted">
                Minimum $100. Your budget determines artist tier and scope.
              </p>
            )}

            {/* Tier Selection */}
            <div>
              <label className="block text-ui text-text-secondary mb-3">
                Choose Your Covenant Tier
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {(['acolyte', 'adept', 'archmage'] as const).map(tier => {
                  const config = TIER_PRICING[tier];
                  const price = Math.round(brief.budget * config.multiplier) || 0;
                  const isSelected = selectedTier === tier;
                  return (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className={cn(
                        'relative p-6 rounded-velvet border-2 transition-all duration-[var(--dur-sigh)]',
                        'flex flex-col',
                        isSelected
                          ? 'border-blood-400 bg-blood-500/10 shadow-blood-glow/20'
                          : 'border-border-subtle hover:border-wine-300/50 hover:bg-void-700/50'
                      )}
                    >
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blood-400 flex items-center justify-center">
                          <Check className="w-3 h-3 text-void-950" />
                        </div>
                      )}
                      <div className="mb-4">
                        <h4 className="text-display-alt text-lg gradient-wine">{config.name}</h4>
                        <p className="text-ui text-text-muted text-sm mt-1">{config.description}</p>
                      </div>
                      <ul className="space-y-2 mb-6 flex-1">
                        {config.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-body text-text-secondary text-sm">
                            <Check className="w-4 h-4 text-wine-300 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t border-border-subtle">
                        <div className="text-display text-2xl gradient-blood">${price.toLocaleString()}</div>
                        <div className="text-ui text-text-muted">Estimated investment</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-6">
            <label htmlFor="timeline" className="block text-ui text-text-secondary mb-3">
              When Must the Work Manifest? <span className="text-blood-400">*</span>
            </label>
            <select
              id="timeline"
              value={brief.timeline}
              onChange={(e) => setBrief(prev => ({ ...prev, timeline: e.target.value }))}
              className={cn(
                'w-full bg-void-900 border border-border-subtle rounded-velvet p-4 text-text-primary',
                'focus:outline-none focus:border-blood-400 transition-colors appearance-none',
                'bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%23b8956a%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E")] bg-no-repeat bg-right-4 bg-center pr-10',
                errors.timeline && 'border-blood-400 focus:border-blood-400'
              )}
              aria-describedby={errors.timeline ? 'timeline-error' : undefined}
            >
              <option value="">Select timeline</option>
              <option value="2-weeks">2 weeks (Rush — +50%)</option>
              <option value="4-weeks">4 weeks (Standard)</option>
              <option value="6-weeks">6 weeks (Relaxed)</option>
              <option value="8-weeks">8 weeks (Deep work)</option>
              <option value="12-weeks">12+ weeks (Masterwork)</option>
              <option value="flexible">Flexible / No deadline</option>
            </select>
            {errors.timeline && (
              <p id="timeline-error" className="text-sm text-blood-400 flex items-center gap-1 blood-drip" role="alert">
                <X className="w-4 h-4" /> {errors.timeline}
              </p>
            )}
            
            <div className="card-velvet p-4 border-border-subtle">
              <h4 className="text-ui text-text-secondary mb-3">Timeline Guidance</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-obsidian bg-void-900 border border-border-subtle flex items-center justify-center text-wine-300 text-xs">1</span>Concept approval: 1 week</div>
                <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-obsidian bg-void-900 border border-border-subtle flex items-center justify-center text-wine-300 text-xs">2</span>Work in progress: 2–6 weeks</div>
                <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-obsidian bg-void-900 border border-border-subtle flex items-center justify-center text-wine-300 text-xs">3</span>Revisions: 1–2 weeks</div>
                <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-obsidian bg-void-900 border border-border-subtle flex items-center justify-center text-wine-300 text-xs">4</span>Final delivery: 1 week</div>
              </div>
            </div>
          </div>
        );

      case 'references':
        return (
          <div className="space-y-6">
            <label className="block text-ui text-text-secondary mb-3 flex items-center gap-2">
              Visual References <span className="text-text-muted">(Optional)</span>
            </label>
            <div className="space-y-3">
              {brief.references.map((ref, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="url"
                    value={ref}
                    onChange={(e) => {
                      const newRefs = [...brief.references];
                      newRefs[i] = e.target.value;
                      setBrief(prev => ({ ...prev, references: newRefs }));
                    }}
                    placeholder="https://example.com/reference.jpg"
                    className="flex-1 bg-void-900 border border-border-subtle rounded-velvet p-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-blood-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newRefs = brief.references.filter((_, idx) => idx !== i);
                      setBrief(prev => ({ ...prev, references: newRefs }));
                    }}
                    className="btn-whisper p-3"
                    aria-label="Remove reference"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {brief.references.length < 5 && (
                <button
                  type="button"
                  onClick={() => setBrief(prev => ({ ...prev, references: [...prev.references, ''] }))}
                  className="btn-covenant w-full justify-center"
                >
                  <span className="text-lg mr-2">+</span> Add Reference
                </button>
              )}
            </div>
            <p className="text-xs text-text-muted">
              Provide URLs to images that capture the mood, palette, composition, or specific elements you desire. 
              The artist will use these as invocation anchors, not copies.
            </p>
          </div>
        );

      case 'review':
        const styleConfig = STYLE_OPTIONS.find(s => s.id === brief.style);
        const tierConfig = TIER_PRICING[selectedTier];
        const estimatedPrice = Math.round(brief.budget * tierConfig.multiplier);
        
        return (
          <div className="space-y-6">
            <div className="card-velvet p-6 border-border-subtle">
              <h3 className="text-display-alt text-xl gradient-velvet mb-4">Review the Summoning</h3>
              <dl className="space-y-4 text-body">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-ui text-text-muted text-xs uppercase tracking-wider">Concept</dt>
                    <dd className="text-text-primary mt-1 whitespace-pre-wrap">{brief.concept}</dd>
                  </div>
                  <div>
                    <dt className="text-ui text-text-muted text-xs uppercase tracking-wider">Style</dt>
                    <dd className="text-text-primary mt-1">{styleConfig?.name}</dd>
                  </div>
                  <div>
                    <dt className="text-ui text-text-muted text-xs uppercase tracking-wider">Dimensions</dt>
                    <dd className="text-text-primary mt-1">{brief.dimensions}</dd>
                  </div>
                  <div>
                    <dt className="text-ui text-text-muted text-xs uppercase tracking-wider">Timeline</dt>
                    <dd className="text-text-primary mt-1">
                      {STEPS.find(s => s.id === 'timeline')?.label}: {brief.timeline}
                    </dd>
                  </div>
                </div>
                <div className="border-t border-border-subtle pt-4">
                  <dt className="text-ui text-text-muted text-xs uppercase tracking-wider">Tier</dt>
                  <dd className="text-text-primary mt-1">{tierConfig.name} — ${estimatedPrice.toLocaleString()} USD</dd>
                </div>
                {brief.references.filter(Boolean).length > 0 && (
                  <div>
                    <dt className="text-ui text-text-muted text-xs uppercase tracking-wider">References</dt>
                    <dd className="text-text-primary mt-1">{brief.references.filter(Boolean).length} provided</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="card-velvet p-6 border-border-subtle">
              <h3 className="text-display-alt text-xl gradient-wine mb-4">Contact for the Covenant</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactName" className="block text-ui text-text-secondary mb-2">
                    Your Name <span className="text-blood-400">*</span>
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    value={brief.contactName}
                    onChange={(e) => setBrief(prev => ({ ...prev, contactName: e.target.value }))}
                    className={cn(
                      'w-full bg-void-900 border border-border-subtle rounded-velvet p-3 text-text-primary',
                      'focus:outline-none focus:border-blood-400',
                      errors.contactName && 'border-blood-400'
                    )}
                    placeholder="Your true name"
                  />
                  {errors.contactName && <p className="text-sm text-blood-400 mt-1">{errors.contactName}</p>}
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-ui text-text-secondary mb-2">
                    Scrying Mirror (Email) <span className="text-blood-400">*</span>
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    value={brief.contactEmail}
                    onChange={(e) => setBrief(prev => ({ ...prev, contactEmail: e.target.value }))}
                    className={cn(
                      'w-full bg-void-900 border border-border-subtle rounded-velvet p-3 text-text-primary',
                      'focus:outline-none focus:border-blood-400',
                      errors.contactEmail && 'border-blood-400'
                    )}
                    placeholder="you@domain.com"
                  />
                  {errors.contactEmail && <p className="text-sm text-blood-400 mt-1">{errors.contactEmail}</p>}
                </div>
              </div>
            </div>

            {submitStatus === 'success' && (
              <div className="card-velvet p-6 border-blood-400/30 bg-blood-500/10 animate-in">
                <div className="flex items-center gap-3 text-blood-300">
                  <div className="w-12 h-12 rounded-full bg-blood-500/20 flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-display-alt">The Covenant is Sealed</h4>
                    <p className="text-body text-text-secondary">Your summoning has been received. The artist will respond within 48 hours with a formal quote and timeline.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen texture-velvet py-12 md:py-20">
      <div className="container-nocturne max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <span className="text-ui text-xs uppercase tracking-widest text-blood-400 mb-4 block">Commission Portal</span>
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl gradient-velvet mb-4">
            Summon a Work
          </h1>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Describe your vision. Choose your artist. Seal the covenant. 
            From concept to creation — your darkness, given form.
          </p>
        </header>

        {/* Progress Steps */}
        <nav className="mb-8" aria-label="Commission progress">
          <ol className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-hide" role="list">
            {STEPS.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              return (
                <li key={step.id} className="flex items-center flex-shrink-0">
                  <div className={cn(
                    'relative flex items-center',
                    isCurrent ? 'z-10' : ''
                  )}>
                    <button
                      type="button"
                      onClick={() => {
                        if (index <= currentStepIndex) setCurrentStep(step.id);
                      }}
                      disabled={index > currentStepIndex}
                      className={cn(
                        'relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center',
                        'transition-all duration-[var(--dur-flutter)]',
                        isCompleted
                          ? 'bg-blood-500 border-blood-500 text-void-950'
                          : isCurrent
                          ? 'bg-void-900 border-2 border-blood-400 text-blood-400 shadow-blood-glow/30'
                          : 'bg-void-800 border border-border-subtle text-text-muted'
                      )}
                      aria-current={isCurrent ? 'step' : undefined}
                      aria-label={`${isCompleted ? 'Completed' : isCurrent ? 'Current' : 'Pending'}: ${step.label}`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 md:w-6 md:h-6" />
                      ) : (
                        <span className="font-ui font-bold text-lg md:text-xl">{index + 1}</span>
                      )}
                    </button>
                    {isCurrent && (
                      <span className="absolute left-full ml-2 whitespace-nowrap hidden md:block text-ui text-text-secondary">
                        {step.label}
                      </span>
                    )}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={cn(
                        'w-16 md:w-24 h-0.5 mx-2',
                        index < currentStepIndex ? 'bg-blood-500' : 'bg-border-subtle'
                      )} 
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Step Content */}
        <main className="card-velvet p-6 md:p-8 lg:p-12 animate-in">
          {renderStep()}
        </main>

        {/* Navigation */}
        <footer className="flex items-center justify-between mt-8 pt-8 border-t border-border-subtle">
          <div className="flex items-center gap-4 text-ui text-text-muted text-sm">
            <span>Step {currentStepIndex + 1} of {STEPS.length}</span>
            <div className="w-32 h-1.5 bg-void-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blood-400 to-wine-300 transition-all duration-[var(--dur-sigh)]"
                style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex gap-3">
            {currentStepIndex > 0 && (
              <button
                onClick={prevStep}
                className="btn-covenant flex items-center gap-2"
                disabled={isSubmitting}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            {currentStepIndex < STEPS.length - 1 ? (
              <button
                onClick={nextStep}
                className="btn-ritual flex items-center gap-2"
                disabled={isSubmitting || !canGoNext()}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-ritual flex items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-blood-400/50 border-t-blood-400 rounded-full animate-spin" />
                    Sealing...
                  </>
                ) : (
                  <>
                    Summon
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </footer>

        {/* JSON-LD for Commission Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: 'Custom Art Commission',
              description: 'Bespoke dark art commission service with tiered pricing, contract e-signature, and progress tracking.',
              provider: {
                '@type': 'Organization',
                name: 'Projectsixxx Gallery',
              },
              areaServed: 'Worldwide',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Commission Tiers',
                itemListElement: Object.entries(TIER_PRICING).map(([tier, config]) => ({
                  '@type': 'Offer',
                  name: config.name,
                  description: config.description,
                  price: 'Variable',
                  priceCurrency: 'USD',
                })),
              },
            }),
          }}
        />
      </div>
    </div>
  );
}
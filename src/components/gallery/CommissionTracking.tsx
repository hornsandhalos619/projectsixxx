'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, ChevronRight, Check, X, 
  FileText, Palette, Ruler, DollarSign, Clock, 
  Image as ImageIcon, ArrowRight, ArrowLeft,
  Heart, Sparkles, Crown, Gem,
  Loader2, Truck, Box, RotateCcw,
  Shield, Award, Mail, MessageSquare,
  Circle, Zap, Eye, Download
} from 'lucide-react';

interface Commission {
  id: string;
  status: 'pending' | 'quoted' | 'contracted' | 'in-progress' | 'review' | 'delivered' | 'cancelled';
  tier: 'acolyte' | 'adept' | 'archmage';
  brief: {
    concept: string;
    style: string;
    dimensions: string;
    budget: number;
    timeline: string;
    references: string[];
  };
  quote: {
    amount: number;
    currency: 'USD';
    validUntil: string;
    includes: string[];
  };
  contract?: {
    signedAt: string;
    docusignEnvelopeId?: string;
  };
  progress: {
    percentage: number;
    currentStage: string;
    milestones: Milestone[];
  };
  artist: {
    name: string;
    slug: string;
    avatar: string;
  };
  client: {
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  dueDate: string;
  completedAt?: string;
  images?: string[];
  feedback?: string;
}

const MOCK_COMMISSION: Commission = {
  id: 'comm-001',
  status: 'in-progress',
  tier: 'adept',
  brief: {
    concept: 'A gothic cathedral rising from a sea of blood, with spires that pierce a crimson sky. The architecture should be impossible - non-Euclidean, with stairways leading nowhere and windows showing other worlds. In the foreground, a lone figure in tattered robes kneels, arms raised in supplication. The mood is reverent terror.',
    style: 'dark-fantasy',
    dimensions: '3000x4000px',
    budget: 1500,
    timeline: '8-weeks',
    references: [
      'https://example.com/ref1.jpg',
      'https://example.com/ref2.jpg',
    ],
  },
  quote: {
    amount: 3750,
    currency: 'USD',
    validUntil: '2024-12-31',
    includes: ['Senior artist', 'Priority queue', '4 revisions', 'Signed print', 'Process documentation'],
  },
  contract: {
    signedAt: '2024-01-15T10:30:00Z',
    docusignEnvelopeId: 'env-abc123',
  },
  progress: {
    percentage: 65,
    currentStage: 'Rendering & Detail Pass',
    milestones: [
      {
        id: 'm1',
        title: 'Concept Approval',
        description: 'Initial sketches and composition approval',
        status: 'completed',
        dueDate: '2024-01-22',
        completedAt: '2024-01-20T14:00:00Z',
        images: ['/commissions/comm-001/concept-1.jpg', '/commissions/comm-001/concept-2.jpg'],
      },
      {
        id: 'm2',
        title: 'Line Art & Composition',
        description: 'Final line work and composition lock',
        status: 'completed',
        dueDate: '2024-02-05',
        completedAt: '2024-02-03T10:00:00Z',
        images: ['/commissions/comm-001/lineart.jpg'],
      },
      {
        id: 'm3',
        title: 'Base Colors & Lighting',
        description: 'Flat colors, mood lighting, atmosphere',
        status: 'completed',
        dueDate: '2024-02-19',
        completedAt: '2024-02-17T16:00:00Z',
        images: ['/commissions/comm-001/base-colors.jpg'],
      },
      {
        id: 'm4',
        title: 'Rendering & Detail Pass',
        description: 'Full rendering, textures, details, effects',
        status: 'in-progress',
        dueDate: '2024-03-04',
        images: ['/commissions/comm-001/wip-1.jpg', '/commissions/comm-001/wip-2.jpg'],
      },
      {
        id: 'm5',
        title: 'Final Polish & Delivery',
        description: 'Final touches, high-res export, print files',
        status: 'pending',
        dueDate: '2024-03-11',
      },
    ],
  },
  artist: {
    name: 'Vesper Noire',
    slug: 'vesper-noire',
    avatar: '/artists/vesper-noire.jpg',
  },
  client: {
    name: 'Lord Malachai',
    email: 'malachai@void.walker',
  },
  createdAt: '2024-01-10T09:00:00Z',
  updatedAt: '2024-02-20T14:30:00Z',
};

const STATUS_CONFIG = {
  pending: { label: 'Awaiting Quote', color: 'text-wine-300', bg: 'bg-wine-300/10', icon: Circle },
  quoted: { label: 'Quoted', color: 'text-wine-400', bg: 'bg-wine-400/10', icon: FileText },
  contracted: { label: 'Contracted', color: 'text-blood-400', bg: 'bg-blood-400/10', icon: Award },
  'in-progress': { label: 'In Progress', color: 'text-blood-400', bg: 'bg-blood-400/10', icon: Zap },
  review: { label: 'Client Review', color: 'text-wine-300', bg: 'bg-wine-300/10', icon: Eye },
  delivered: { label: 'Delivered', color: 'text-wine-300', bg: 'bg-wine-300/10', icon: Check },
  cancelled: { label: 'Cancelled', color: 'text-text-muted', bg: 'bg-void-700', icon: X },
};

const TIER_CONFIG = {
  acolyte: { name: 'Acolyte', color: 'text-wine-400' },
  adept: { name: 'Adept', color: 'text-blood-400' },
  archmage: { name: 'Archmage', color: 'text-wine-300' },
};

export function CommissionTracking({ commissionId }: { commissionId: string }) {
  const [commission, setCommission] = useState<Commission | null>(MOCK_COMMISSION);
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'messages' | 'files'>('overview');
  const [showFeedback, setShowFeedback] = useState<string | null>(null);

  // In production, fetch from API
  useEffect(() => {
    // fetchCommission(commissionId).then(setCommission);
  }, [commissionId]);

  if (!commission) {
    return (
      <div className="min-h-screen texture-velvet flex items-center justify-center">
        <div className="velvet-shimmer h-64 w-full max-w-md rounded-velvet" />
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[commission.status];
  const StatusIcon = statusCfg.icon;
  const tierCfg = TIER_CONFIG[commission.tier];

  return (
    <div className="min-h-screen texture-velvet py-12 md:py-20">
      <div className="container-nocturne max-w-5xl">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-ui text-xs uppercase tracking-widest text-blood-400 mb-2 block">
                Commission Covenant
              </span>
              <h1 className="text-display text-3xl md:text-4xl gradient-velvet">
                #{commission.id}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className={cn(
                'px-3 py-1 rounded-obsidian text-xs font-ui uppercase tracking-wider border',
                statusCfg.bg,
                statusCfg.color,
                'flex items-center gap-1.5'
              )}>
                <StatusIcon className="w-3 h-3" />
                {statusCfg.label}
              </span>
              <span className={cn(
                'px-3 py-1 rounded-obsidian text-xs font-ui uppercase tracking-wider border border-wine-300/30',
                tierCfg.color
              )}>
                {tierCfg.name} Tier
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="card-velvet p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-ui text-text-secondary">Overall Progress</span>
              <span className="text-display font-mono text-blood-400">{commission.progress.percentage}%</span>
            </div>
            <div className="h-2 bg-void-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blood-400 to-wine-300 rounded-full transition-all duration-[var(--dur-ritual)] ease-[var(--ease-ritual)]"
                style={{ width: `${commission.progress.percentage}%` }}
              />
            </div>
            <p className="text-ui text-text-muted text-sm mt-2">
              Current stage: <span className="text-text-primary">{commission.progress.currentStage}</span>
            </p>
          </div>
        </header>

        {/* Tabs */}
        <nav className="mb-8" aria-label="Commission sections">
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide" role="tablist">
            {(['overview', 'progress', 'messages', 'files'] as const).map(tab => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'btn-whisper whitespace-nowrap px-4 py-2',
                  activeTab === tab
                    ? 'bg-blood-500/20 border-blood-400/50 text-blood-300'
                    : 'hover:border-wine-300/30'
                )}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </nav>

        {/* Tab Content */}
        <main className="card-velvet overflow-hidden">
          {activeTab === 'overview' && <OverviewTab commission={commission} />}
          {activeTab === 'progress' && <ProgressTab commission={commission} />}
          {activeTab === 'messages' && <MessagesTab commission={commission} />}
          {activeTab === 'files' && <FilesTab commission={commission} />}
        </main>

        {/* JSON-LD for Commission */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CreativeWork',
              name: `Commission #${commission.id}`,
              creator: {
                '@type': 'Person',
                name: commission.artist.name,
              },
              about: commission.brief.concept,
              dateCreated: commission.createdAt,
              dateModified: commission.updatedAt,
              workExample: {
                '@type': 'VisualArtwork',
                artMedium: 'Digital Commission',
                genre: commission.brief.style,
              },
            }),
          }}
        />
      </div>
    </div>
  );
}

function OverviewTab({ commission }: { commission: Commission }) {
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Artist & Client Info */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="card-velvet p-6 border-border-subtle">
          <h3 className="text-display-alt text-lg gradient-wine mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Summoned By
          </h3>
          <div className="flex items-center gap-4">
            <img
              src={commission.artist.avatar}
              alt={commission.artist.name}
              className="w-16 h-16 rounded-full border border-wine-300/30 object-cover"
            />
            <div>
              <a href={`/gallery/artist/${commission.artist.slug}`} className="link-ritual text-body font-medium">
                {commission.artist.name}
              </a>
              <p className="text-ui text-text-muted text-sm mt-1">The conjurer of this work</p>
            </div>
          </div>
        </div>

        <div className="card-velvet p-6 border-border-subtle">
          <h3 className="text-display-alt text-lg gradient-wine mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Patron
          </h3>
          <div>
            <p className="text-body font-medium text-text-primary">{commission.client.name}</p>
            <p className="text-ui text-text-muted text-sm">{commission.client.email}</p>
          </div>
        </div>
      </section>

      {/* Brief Summary */}
      <section>
        <h3 className="text-display-alt text-lg gradient-velvet mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          The Vision
        </h3>
        <div className="card-velvet p-6 border-border-subtle prose prose-invert max-w-none">
          <p className="whitespace-pre-wrap text-body text-text-secondary">{commission.brief.concept}</p>
        </div>
      </section>

      {/* Specs Grid */}
      <section className="grid md:grid-cols-3 gap-4">
        <SpecCard icon={Palette} label="Style" value={commission.brief.style} />
        <SpecCard icon={Ruler} label="Dimensions" value={commission.brief.dimensions} />
        <SpecCard icon={Clock} label="Timeline" value={commission.brief.timeline} />
        <SpecCard icon={DollarSign} label="Budget" value={`$${commission.brief.budget.toLocaleString()}`} />
        <SpecCard icon={Crown} label="Tier" value={tierCfg.name} />
        <SpecCard icon={Zap} label="Current Stage" value={commission.progress.currentStage} />
      </section>

      {/* Quote & Contract */}
      <section className="grid md:grid-cols-2 gap-4">
        <div className="card-velvet p-6 border-border-subtle">
          <h3 className="text-display-alt text-lg gradient-wine mb-4 flex items-center gap-2">
            <Gem className="w-5 h-5" />
            Quote
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Quoted Amount</span>
              <span className="text-display text-xl gradient-blood">${commission.quote.amount.toLocaleString()} {commission.quote.currency}</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Valid Until</span>
              <span className="text-text-primary">{new Date(commission.quote.validUntil).toLocaleDateString()}</span>
            </div>
            <ul className="space-y-1 text-sm text-text-secondary">
              {commission.quote.includes.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-wine-300 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card-velvet p-6 border-border-subtle">
          <h3 className="text-display-alt text-lg gradient-wine mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Covenant
          </h3>
          {commission.contract ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blood-500/10 border border-blood-400/20 rounded-velvet">
                <Check className="w-5 h-5 text-blood-400" />
                <div>
                  <p className="text-body text-text-primary">Contract Sealed</p>
                  <p className="text-ui text-text-muted text-sm">
                    Signed {new Date(commission.contract.signedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {commission.contract.docusignEnvelopeId && (
                <p className="text-ui text-text-muted text-xs">
                  DocuSign Envelope: {commission.contract.docusignEnvelopeId}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-body text-text-secondary mb-4">Awaiting contract signature</p>
              <button className="btn-ritual">Sign Covenant</button>
            </div>
          )}
        </div>
      </section>

      {/* Key Dates */}
      <section>
        <h3 className="text-display-alt text-lg gradient-wine mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Key Dates
        </h3>
        <dl className="grid md:grid-cols-3 gap-4 text-body">
          <div className="card-velvet p-4 border-border-subtle">
            <dt className="text-ui text-text-muted text-xs uppercase tracking-wider">Summoned</dt>
            <dd className="text-text-primary mt-1">{new Date(commission.createdAt).toLocaleDateString()}</dd>
          </div>
          <div className="card-velvet p-4 border-border-subtle">
            <dt className="text-ui text-text-muted text-xs uppercase tracking-wider">Last Updated</dt>
            <dd className="text-text-primary mt-1">{new Date(commission.updatedAt).toLocaleDateString()}</dd>
          </div>
          <div className="card-velvet p-4 border-border-subtle">
            <dt className="text-ui text-text-muted text-xs uppercase tracking-wider">Est. Delivery</dt>
            <dd className="text-text-primary mt-1">
              {commission.progress.milestones[commission.progress.milestones.length - 1]?.dueDate 
                ? new Date(commission.progress.milestones[commission.progress.milestones.length - 1].dueDate).toLocaleDateString()
                : 'TBD'}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

function SpecCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="card-velvet p-4 border-border-subtle">
      <dt className="flex items-center gap-2 text-ui text-text-muted text-xs uppercase tracking-wider mb-2">
        <Icon className="w-4 h-4 text-wine-300" />
        {label}
      </dt>
      <dd className="text-body text-text-primary">{value}</dd>
    </div>
  );
}

function ProgressTab({ commission }: { commission: Commission }) {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-display-alt text-lg gradient-velvet">Ritual Progress</h3>
        <span className="text-ui text-text-muted text-sm">
          {commission.progress.milestones.filter(m => m.status === 'completed').length} / {commission.progress.milestones.length} milestones
        </span>
      </div>

      <div className="space-y-4">
        {commission.progress.milestones.map((milestone, index) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            index={index + 1}
            isCurrent={milestone.status === 'in-progress'}
            onFeedbackClick={(milestoneId) => setShowFeedback(milestoneId)}
          />
        ))}
      </div>
    </div>
  );
}

function MilestoneCard({ 
  milestone, 
  index, 
  isCurrent, 
  onFeedbackClick 
}: { 
  milestone: Milestone; 
  index: number; 
  isCurrent: boolean;
  onFeedbackClick: (id: string) => void;
}) {
  const statusIcons = {
    pending: Circle,
    'in-progress': Zap,
    completed: Check,
    blocked: X,
  };
  const StatusIcon = statusIcons[milestone.status];
  
  const statusColors = {
    pending: 'text-text-muted border-border-subtle',
    'in-progress': 'text-blood-400 border-blood-400/50',
    completed: 'text-wine-300 border-wine-300/50',
    blocked: 'text-blood-400 border-blood-400/50',
  };

  return (
    <div className={cn(
      'card-velvet p-6 relative overflow-hidden transition-all duration-[var(--dur-sigh)]',
      'border-l-4',
      statusColors[milestone.status].replace('text-', 'border-')
    )}>
      <div className="flex items-start gap-4">
        {/* Step number & status */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center',
            'border-2',
            milestone.status === 'completed' 
              ? 'bg-wine-300 border-wine-300 text-void-950'
              : isCurrent
              ? 'bg-blood-400 border-blood-400 text-void-950 animate-pulse'
              : 'bg-void-900 border-border-subtle text-text-muted'
          )}>
            {milestone.status === 'completed' ? (
              <Check className="w-5 h-5" />
            ) : (
              <span className="font-display font-bold">{index}</span>
            )}
          </div>
          <div className="h-8 w-0.5 bg-border-subtle" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-display-alt text-lg text-text-primary">{milestone.title}</h4>
            <span className={cn(
              'px-2 py-0.5 rounded-obsidian text-xs font-ui uppercase tracking-wider',
              statusColors[milestone.status]
            )}>
              {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1).replace('-', ' ')}
            </span>
            {isCurrent && (
              <span className="px-2 py-0.5 rounded-obsidian text-xs font-ui uppercase tracking-wider bg-blood-400/20 text-blood-400 animate-pulse">
                Current
              </span>
            )}
          </div>
          <p className="text-body text-text-secondary mb-3">{milestone.description}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="text-ui text-text-muted flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Due: {new Date(milestone.dueDate).toLocaleDateString()}
            </span>
            {milestone.completedAt && (
              <span className="text-ui text-wine-300 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Completed: {new Date(milestone.completedAt).toLocaleDateString()}
              </span>
            )}
            {milestone.feedback && (
              <button
                onClick={() => onFeedbackClick(milestone.id)}
                className="text-ui text-blood-400 hover:text-blood-300 flex items-center gap-1"
              >
                <MessageSquare className="w-3 h-3" />
                View Feedback
              </button>
            )}
          </div>

          {/* Progress images */}
          {milestone.images && milestone.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
              {milestone.images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-velvet overflow-hidden">
                  <img
                    src={img}
                    alt={`${milestone.title} progress ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MessagesTab({ commission }: { commission: Commission }) {
  const [newMessage, setNewMessage] = useState('');

  const messages = [
    { id: 1, from: 'Vesper Noire', role: 'artist', time: '2024-02-20T14:30:00Z', content: 'The base colors are approved. Moving into the rendering phase now. Expect WIP updates every 2-3 days.' },
    { id: 2, from: 'Lord Malachai', role: 'client', time: '2024-02-20T15:00:00Z', content: 'Excellent. The crimson sky tone is perfect. Please ensure the non-Euclidean architecture reads clearly at smaller sizes.' },
    { id: 3, from: 'Vesper Noire', role: 'artist', time: '2024-02-17T16:00:00Z', content: 'Base colors and lighting complete. The cathedral\'s impossible geometry is taking shape. Sharing WIP images.' },
    { id: 4, from: 'System', role: 'system', time: '2024-02-03T10:00:00Z', content: 'Milestone "Line Art & Composition" marked complete.' },
    { id: 5, from: 'Vesper Noire', role: 'artist', time: '2024-01-20T14:00:00Z', content: 'Concept sketches delivered. Two composition options for your review.' },
  ];

  return (
    <div className="p-6 md:p-8 flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto space-y-6" style={{ scrollBehavior: 'smooth' }}>
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>
      <div className="border-t border-border-subtle pt-4 mt-4">
        <form onSubmit={(e) => { e.preventDefault(); setNewMessage(''); }} className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Send a message to the artist..."
            className="flex-1 bg-void-900 border border-border-subtle rounded-velvet p-3 text-text-primary focus:outline-none focus:border-blood-400"
          />
          <button type="submit" disabled={!newMessage.trim()} className="btn-ritual">
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: { id: number; from: string; role: 'artist' | 'client' | 'system'; time: string; content: string } }) {
  const isSystem = message.role === 'system';
  
  return (
    <div className={cn(
      'flex gap-3',
      !isSystem && message.role === 'client' && 'flex-row-reverse'
    )}>
      {!isSystem && (
        <div className="w-10 h-10 rounded-full bg-void-900 border border-border-subtle flex items-center justify-center flex-shrink-0">
          {message.role === 'artist' ? (
            <Zap className="w-5 h-5 text-blood-400" />
          ) : (
            <Heart className="w-5 h-5 text-wine-300" />
          )}
        </div>
      )}
      <div className={cn(
        'flex-1 max-w-[70%]',
        !isSystem && message.role === 'client' && 'text-right'
      )}>
        {!isSystem && (
          <div className="flex items-center gap-2 mb-1 justify-end">
            <span className="text-body font-medium text-text-primary">{message.from}</span>
            <span className="text-ui text-text-muted text-xs">{new Date(message.time).toLocaleString()}</span>
          </div>
        )}
        <div className={cn(
          'inline-block px-4 py-2 rounded-velvet',
          isSystem
            ? 'bg-void-800 border border-border-subtle text-text-muted text-sm italic'
            : message.role === 'artist'
            ? 'bg-blood-500/10 border border-blood-400/20 text-text-primary'
            : 'bg-wine-300/10 border border-wine-300/20 text-text-primary'
        )}>
          {message.content}
        </div>
        {isSystem && (
          <div className="text-ui text-text-muted text-xs mt-1">{new Date(message.time).toLocaleString()}</div>
        )}
      </div>
    </div>
  );
}

function FilesTab({ commission }: { commission: Commission }) {
  // Collect all images from milestones
  const allImages = commission.progress.milestones.flatMap(m => 
    (m.images || []).map(img => ({
      url: img,
      milestone: m.title,
      milestoneId: m.id,
    }))
  );

  return (
    <div className="p-6 md:p-8">
      <h3 className="text-display-alt text-lg gradient-velvet mb-6">Ritual Artifacts</h3>
      
      {allImages.length === 0 ? (
        <div className="card-velvet p-12 text-center border-border-subtle">
          <Eye className="w-12 h-12 mx-auto text-text-muted mb-4" />
          <p className="text-body text-text-secondary">No ritual artifacts yet. The work is still forming in the void.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allImages.map((file, i) => (
            <div key={i} className="card-velvet overflow-hidden rounded-velvet border-border-subtle group">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={file.url}
                  alt={`${file.milestone} artifact ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--dur-sigh)] flex items-end p-3">
                  <div className="w-full">
                    <button className="btn-ritual w-full text-sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-ui text-text-muted text-xs uppercase tracking-wider">{file.milestone}</p>
                <p className="text-body text-text-primary text-sm truncate">Artifact {i + 1}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
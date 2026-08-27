'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MasonryGrid } from './MasonryGrid';
import { cn } from '@/lib/utils';
import { X, Globe, Mail, Heart, Eye, Award, Clock, MapPin, Users, Calendar, MessageSquare } from 'lucide-react';

interface Artist {
  slug: string;
  name: string;
  bio: string;
  avatar: string;
  banner: string;
  location?: string;
  website?: string;
  twitter?: string;
  instagram?: string;
  email?: string;
  joinedYear: number;
  specialties: string[];
  commissionStatus: 'open' | 'limited' | 'closed' | 'by-invite';
  commissionPriceRange: { min: number; max: number };
  followers: number;
  following: number;
  totalWorks: number;
  totalSales: number;
  featuredWorks: Artwork[];
  recentWorks: Artwork[];
  achievements: Achievement[];
}

interface Artwork {
  id: string;
  slug: string;
  title: string;
  category: 'digital' | 'photography' | 'generative' | 'commissions';
  thumbnail: string;
  image: string;
  width: number;
  height: number;
  year: number;
  medium: string;
  price?: number;
  isForSale?: boolean;
}

interface Achievement {
  title: string;
  year: number;
  description: string;
  icon: string;
}

interface ArtistProfileProps {
  artist: Artist;
}

const COMMISSION_STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  open: { label: 'Accepting Commissions', color: 'text-wine-300', bg: 'bg-wine-300/10 border-wine-300/30' },
  limited: { label: 'Limited Slots', color: 'text-blood-400', bg: 'bg-blood-400/10 border-blood-400/30' },
  closed: { label: 'Commissions Closed', color: 'text-text-muted', bg: 'bg-void-700 border-border-subtle' },
  'by-invite': { label: 'By Invitation Only', color: 'text-wine-400', bg: 'bg-wine-400/10 border-wine-400/30' },
};

export function ArtistProfile({ artist }: ArtistProfileProps) {
  const [activeTab, setActiveTab] = useState<'featured' | 'all' | 'commissions'>('featured');
  const [showContact, setShowContact] = useState(false);

  const statusConfig = COMMISSION_STATUS_LABELS[artist.commissionStatus];

  const displayWorks = activeTab === 'featured' ? artist.featuredWorks : artist.recentWorks;

  return (
    <div className="min-h-screen texture-velvet">
      {/* Banner/Hero */}
      <section className="relative h-64 md:h-80 lg:h-96">
        <div className="absolute inset-0">
          <Image
            src={artist.banner}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-900/50 to-transparent" />
        </div>

        {/* Overlay content */}
        <div className="relative h-full flex items-end px-4 md:px-8 lg:px-16 pb-8">
          <div className="container-nocturne w-full">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex items-start md:items-end gap-6">
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blood-500 to-wine-400 p-[2px] -z-10" />
                  <Image
                    src={artist.avatar}
                    alt={artist.name}
                    fill
                    className="object-cover rounded-full border-2 border-void-900"
                    sizes="128px"
                  />
                </div>
                <div>
                  <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-text-primary">
                    {artist.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-text-secondary">
                    <span className="text-ui flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {artist.location || 'The Shadows'}
                    </span>
                    <span className="text-ui flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Summoned {new Date().getFullYear() - artist.joinedYear} years ago
                    </span>
                    <span className={cn(
                      'px-3 py-1 rounded-obsidian text-xs font-ui uppercase tracking-wider border',
                      statusConfig.bg,
                      statusConfig.color
                    )}>
                      {statusConfig.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 md:ml-auto">
                {artist.website && (
                  <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-covenant flex items-center gap-2"
                    aria-label="Visit website"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="hidden sm:inline">Website</span>
                  </a>
                )}
                {artist.twitter && (
                  <a
                    href={`https://twitter.com/${artist.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whisper flex items-center gap-2"
                    aria-label="Follow on X"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">{artist.twitter}</span>
                  </a>
                )}
                {artist.instagram && (
                  <a
                    href={`https://instagram.com/${artist.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whisper flex items-center gap-2"
                    aria-label="Follow on Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                    <span className="hidden sm:inline">{artist.instagram}</span>
                  </a>
                )}
                {artist.commissionStatus !== 'closed' && (
                  <button
                    onClick={() => setShowContact(true)}
                    className="btn-ritual flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Commission</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border-subtle bg-void-900/50 backdrop-blur-sm">
        <div className="container-nocturne py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <StatCard
              icon={Eye}
              value={artist.totalWorks}
              label="Works Summoned"
            />
            <StatCard
              icon={Heart}
              value={artist.followers.toLocaleString()}
              label="Disciples"
            />
            <StatCard
              icon={Award}
              value={artist.totalSales.toLocaleString()}
              label="Souls Collected"
            />
            <StatCard
              icon={Clock}
              value={`${artist.commissionPriceRange.min}–${artist.commissionPriceRange.max}`}
              label="Commission Range (USD)"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container-nocturne py-12 md:py-16">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Bio */}
            <section className="card-velvet p-6">
              <h2 className="text-display-alt text-xl gradient-wine mb-4">Grimoire</h2>
              <p className="text-body text-text-secondary whitespace-pre-wrap">{artist.bio}</p>
            </section>

            {/* Specialties */}
            <section className="card-velvet p-6">
              <h2 className="text-display-alt text-xl gradient-wine mb-4">Domains of Power</h2>
              <div className="flex flex-wrap gap-2">
                {artist.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-3 py-1 text-sm font-ui bg-void-700 border border-wine-300/20 text-wine-300 rounded-obsidian"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </section>

            {/* Commission Info */}
            {artist.commissionStatus !== 'closed' && (
              <section className="card-velvet p-6">
                <h2 className="text-display-alt text-xl gradient-wine mb-4">Commission Ritual</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-void-700/50 rounded-velvet">
                    <div className="w-10 h-10 rounded-obsidian bg-blood-500/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blood-400" />
                    </div>
                    <div>
                      <p className="text-ui text-text-muted text-xs">Starting Price</p>
                      <p className="text-display-alt text-blood-400">${artist.commissionPriceRange.min.toLocaleString()}+</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-void-700/50 rounded-velvet">
                    <div className="w-10 h-10 rounded-obsidian bg-wine-400/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-wine-400" />
                    </div>
                    <div>
                      <p className="text-ui text-text-muted text-xs">Typical Timeline</p>
                      <p className="text-body text-text-primary">4–8 weeks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-void-700/50 rounded-velvet">
                    <div className="w-10 h-10 rounded-obsidian bg-void-700 border border-border-subtle flex items-center justify-center">
                      <Users className="w-5 h-5 text-text-secondary" />
                    </div>
                    <div>
                      <p className="text-ui text-text-muted text-xs">Revisions Included</p>
                      <p className="text-body text-text-primary">3 rounds</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowContact(true)}
                    className="btn-ritual w-full mt-2"
                  >
                    Summon a Commission
                  </button>
                </div>
              </section>
            )}

            {/* Achievements */}
            {artist.achievements.length > 0 && (
              <section className="card-velvet p-6">
                <h2 className="text-display-alt text-xl gradient-wine mb-4">Honors & Rites</h2>
                <dl className="space-y-4">
                  {artist.achievements.map((achievement, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-10 h-10 rounded-obsidian bg-blood-500/10 border border-blood-400/20 flex items-center justify-center flex-shrink-0">
                        {achievement.icon === 'award' && <Award className="w-5 h-5 text-blood-400" />}
                        {achievement.icon === 'featured' && <Eye className="w-5 h-5 text-blood-400" />}
                        {achievement.icon === 'sale' && <Heart className="w-5 h-5 text-blood-400" />}
                      </div>
                      <div>
                        <dt className="text-body font-medium text-text-primary">{achievement.title}</dt>
                        <dd className="text-ui text-text-secondary text-sm">{achievement.description}</dd>
                        <dd className="text-ui text-text-muted text-xs">Year of the Void {achievement.year}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {/* Follow Button */}
            <section className="card-velvet p-6 text-center">
              <p className="text-body text-text-secondary mb-4">
                Join the coven. Receive visions of new works.
              </p>
              <button className="btn-covenant w-full">
                <Heart className="w-4 h-4 mr-2" />
                Follow Artist
              </button>
            </section>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-12">
            {/* About Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-display text-2xl md:text-3xl gradient-velvet">
                  {activeTab === 'featured' ? 'Featured Works' : 'All Works'}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('featured')}
                    className={cn(
                      'btn-whisper px-4 py-2 text-sm',
                      activeTab === 'featured' && 'bg-blood-500/20 border-blood-400/50 text-blood-300'
                    )}
                  >
                    Featured
                  </button>
                  <button
                    onClick={() => setActiveTab('all')}
                    className={cn(
                      'btn-whisper px-4 py-2 text-sm',
                      activeTab === 'all' && 'bg-blood-500/20 border-blood-400/50 text-blood-300'
                    )}
                  >
                    All Works
                  </button>
                </div>
              </div>

              <MasonryGrid
                artworks={displayWorks}
                onLoadMore={() => {}}
                hasMore={false}
                isLoading={false}
              />
            </section>

            {/* Commission Gallery (if applicable) */}
            {artist.commissionStatus !== 'closed' && (
              <section>
                <h2 className="text-display text-2xl md:text-3xl gradient-wine mb-6">
                  Commissioned Works
                </h2>
                <MasonryGrid
                  artworks={artist.recentWorks.filter(w => w.category === 'commissions')}
                  onLoadMore={() => {}}
                  hasMore={false}
                  isLoading={false}
                />
              </section>
            )}
          </div>
        </div>
      </main>

      {/* Commission Modal */}
      {showContact && (
        <CommissionModal
          artist={artist}
          onClose={() => setShowContact(false)}
        />
      )}

      {/* JSON-LD for Artist */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: artist.name,
            url: `${window.location.origin}/gallery/artist/${artist.slug}`,
            image: artist.avatar,
            description: artist.bio,
            sameAs: [
              artist.website,
              artist.twitter ? `https://twitter.com/${artist.twitter.replace('@', '')}` : null,
              artist.instagram ? `https://instagram.com/${artist.instagram.replace('@', '')}` : null,
            ].filter(Boolean),
            knowsAbout: artist.specialties,
            worksFor: {
              '@type': 'Organization',
              name: 'Projectsixxx Gallery',
            },
          }),
        }}
      />
    </div>
  );
}

function StatCard({ icon: Icon, value, label }: { icon: React.ComponentType<{ className?: string }>; value: string | number; label: string }) {
  return (
    <div className="p-4 md:p-6">
      <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-obsidian bg-void-800/50 border border-wine-300/20 flex items-center justify-center">
        <Icon className="w-6 h-6 md:w-7 md:h-7 text-wine-300" />
      </div>
      <div className="text-display text-2xl md:text-3xl text-text-primary">{value}</div>
      <div className="text-ui text-text-muted text-sm mt-1">{label}</div>
    </div>
  );
}

function CommissionModal({ artist, onClose }: { artist: Artist; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-950/90 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-void-800 border border-border-subtle rounded-velvet max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-border-subtle flex items-center justify-between">
          <h2 className="text-display text-2xl">Summon a Commission</h2>
          <button onClick={onClose} className="btn-whisper p-2 rounded-full" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-body text-text-secondary">
            Describe the vision you wish to manifest. {artist.name} will respond within 48 hours with a quote and timeline.
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="concept" className="block text-ui text-text-secondary mb-2">Concept & Vision</label>
              <textarea
                id="concept"
                rows={4}
                className="w-full bg-void-900 border border-border-subtle rounded-velvet p-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-blood-400"
                placeholder="Describe the theme, mood, characters, symbols... Be as vivid as the darkness allows."
              />
            </div>
            <div>
              <label htmlFor="references" className="block text-ui text-text-secondary mb-2">Reference Images (URLs)</label>
              <input
                id="references"
                type="text"
                className="w-full bg-void-900 border border-border-subtle rounded-velvet p-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-blood-400"
                placeholder="https://example.com/ref1.jpg, https://example.com/ref2.jpg"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dimensions" className="block text-ui text-text-secondary mb-2">Dimensions</label>
                <input
                  id="dimensions"
                  type="text"
                  className="w-full bg-void-900 border border-border-subtle rounded-velvet p-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-blood-400"
                  placeholder="e.g., 3000x4000px or 24x36in"
                />
              </div>
              <div>
                <label htmlFor="budget" className="block text-ui text-text-secondary mb-2">Budget (USD)</label>
                <input
                  id="budget"
                  type="number"
                  min={artist.commissionPriceRange.min}
                  className="w-full bg-void-900 border border-border-subtle rounded-velvet p-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-blood-400"
                  placeholder={`${artist.commissionPriceRange.min}`}
                />
              </div>
            </div>
            <div>
              <label htmlFor="timeline" className="block text-ui text-text-secondary mb-2">Desired Completion</label>
              <input
                id="timeline"
                type="date"
                className="w-full bg-void-900 border border-border-subtle rounded-velvet p-4 text-text-primary focus:outline-none focus:border-blood-400"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={onClose} className="btn-covenant flex-1">
                Cancel
              </button>
              <button type="submit" className="btn-ritual flex-1">
                Send Summoning
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
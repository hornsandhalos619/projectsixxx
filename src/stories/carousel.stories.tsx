"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "../components/ui/carousel";
import { Card } from "../components/ui/card";
import { GothicIcons } from "../components/ui/icon";
import { Typography, Button } from "../components/ui/typography";
import { Divider } from "../components/ui/divider";

const meta: Meta<typeof Carousel> = {
  title: "UI/Carousel",
  component: Carousel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Carousel/Slider component with infinite scroll, snap, blood-dot pagination, and touch/swipe support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    autoPlay: {
      control: "boolean",
      description: "Enable auto-play",
    },
    autoPlayInterval: {
      control: "number",
      description: "Auto-play interval in ms",
    },
    showArrows: {
      control: "boolean",
      description: "Show navigation arrows",
    },
    showDots: {
      control: "boolean",
      description: "Show pagination dots",
    },
    infinite: {
      control: "boolean",
      description: "Infinite loop",
    },
    snap: {
      control: "boolean",
      description: "Snap to slides",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const slides = [
  (
    <div key="1" className="flex items-center justify-center h-64 bg-gradient-to-br from-blood-600/30 via-void-800 to-wine-500/30">
      <div className="text-center p-8">
        <GothicIcons.Sigil className="h-16 w-16 mx-auto mb-4 text-blood-400" />
        <Typography element="headline">First Seal</Typography>
        <Typography element="body" className="mt-2 max-w-md mx-auto">The invocation begins at midnight.</Typography>
      </div>
    </div>
  ),
  (
    <div key="2" className="flex items-center justify-center h-64 bg-gradient-to-br from-wine-500/30 via-void-800 to-blood-600/30">
      <div className="text-center p-8">
        <GothicIcons.Chalice className="h-16 w-16 mx-auto mb-4 text-wine-300" />
        <Typography element="headline">Second Seal</Typography>
        <Typography element="body" className="mt-2 max-w-md mx-auto">The binding requires blood and wax.</Typography>
      </div>
    </div>
  ),
  (
    <div key="3" className="flex items-center justify-center h-64 bg-gradient-to-br from-void-700 via-blood-600/20 to-void-700">
      <div className="text-center p-8">
        <GothicIcons.WaxSeal className="h-16 w-16 mx-auto mb-4 text-blood-400" />
        <Typography element="headline">Third Seal</Typography>
        <Typography element="body" className="mt-2 max-w-md mx-auto">The offering must be personal.</Typography>
      </div>
    </div>
  ),
  (
    <div key="4" className="flex items-center justify-center h-64 bg-gradient-to-br from-blood-600/20 via-wine-500/20 to-blood-600/20">
      <div className="text-center p-8">
        <GothicIcons.Ouroboros className="h-16 w-16 mx-auto mb-4 text-wine-300" />
        <Typography element="headline">Fourth Seal</Typography>
        <Typography element="body" className="mt-2 max-w-md mx-auto">The entity manifests. The covenant is sealed.</Typography>
      </div>
    </div>
  ),
];

const cardSlides = [
  (
    <Card key="1" variant="gradient-border" className="h-full">
      <div className="aspect-video bg-gradient-to-br from-blood-600/30 to-void-800" />
      <div className="p-6">
        <Typography element="headline">Cursed Blade</Typography>
        <Typography element="body" className="mt-2">Forged in the blood of fallen gods.</Typography>
        <Button variant="blood" className="mt-4" size="sm">Claim</Button>
      </div>
    </Card>
  ),
  (
    <Card key="2" variant="gradient-border-wine" className="h-full">
      <div className="aspect-video bg-gradient-to-br from-wine-500/30 to-void-800" />
      <div className="p-6">
        <Typography element="headline">Ancient Grimoire</Typography>
        <Typography element="body" className="mt-2">Contains forbidden knowledge.</Typography>
        <Button variant="secondary" className="mt-4" size="sm">Study</Button>
      </div>
    </Card>
  ),
  (
    <Card key="3" variant="gradient-border-velvet" className="h-full">
      <div className="aspect-video bg-gradient-to-br from-void-700 to-blood-600/20" />
      <div className="p-6">
        <Typography element="headline">Phantom Ring</Typography>
        <Typography element="body" className="mt-2">Grants passage through shadows.</Typography>
        <Button variant="velvet" className="mt-4" size="sm">Wear</Button>
      </div>
    </Card>
  ),
];

export const Default: Story = {
  args: {
    children: slides,
    showArrows: true,
    showDots: true,
    infinite: true,
    snap: true,
  },
};

export const AutoPlay: Story = {
  args: {
    children: slides,
    autoPlay: true,
    autoPlayInterval: 3000,
    showArrows: true,
    showDots: true,
    infinite: true,
  },
};

export const NoArrows: Story = {
  args: {
    children: slides,
    showArrows: false,
    showDots: true,
    infinite: true,
  },
};

export const NoDots: Story = {
  args: {
    children: slides,
    showArrows: true,
    showDots: false,
    infinite: true,
  },
};

export const NonInfinite: Story = {
  args: {
    children: slides,
    showArrows: true,
    showDots: true,
    infinite: false,
  },
};

export const CardCarousel: Story = {
  args: {
    children: cardSlides,
    showArrows: true,
    showDots: true,
    infinite: true,
    snap: true,
  },
};

export const VariantBlood: Story = {
  args: {
    children: slides,
    variant: "blood",
    showArrows: true,
    showDots: true,
  },
};

export const VariantWine: Story = {
  args: {
    children: slides,
    variant: "wine",
    showArrows: true,
    showDots: true,
  },
};

export const VariantVelvet: Story = {
  args: {
    children: slides,
    variant: "velvet",
    showArrows: true,
    showDots: true,
  },
};

export const SingleSlide: Story = {
  args: {
    children: [slides[0]],
    showArrows: false,
    showDots: false,
  },
};

export const TwoSlides: Story = {
  args: {
    children: slides.slice(0, 2),
    showArrows: true,
    showDots: true,
    infinite: true,
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <Typography element="label" className="mb-2">Ritual Phases</Typography>
        <Carousel
          autoPlay
          autoPlayInterval={4000}
          showArrows
          showDots
          infinite
          snap
        >
          {slides}
        </Carousel>
      </div>
      <Divider variant="blood-gradient" />
      <div>
        <Typography element="label" className="mb-2">Artifacts</Typography>
        <Carousel showArrows showDots infinite snap>
          {cardSlides}
        </Carousel>
      </div>
    </div>
  ),
};
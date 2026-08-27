"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { GothicIcons } from "../components/ui/icon";
import { Typography } from "../components/ui/typography";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Tabs component with blood underline indicator, velvet panels, and multiple variants. Built on Radix UI.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "blood", "wine", "velvet"],
      description: "Tabs list variant",
    },
    contentVariant: {
      control: "select",
      options: ["default", "blood", "wine", "none"],
      description: "Tabs content variant",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Tabs orientation",
    },
    defaultValue: {
      control: "text",
      description: "Default active tab value",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    defaultValue: "rituals",
    children: (
      <>
        <TabsList>
          <TabsTrigger value="rituals">Rituals</TabsTrigger>
          <TabsTrigger value="entities">Entities</TabsTrigger>
          <TabsTrigger value="grimoires">Grimoires</TabsTrigger>
          <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
        </TabsList>
        <TabsContent value="rituals">
          <Typography element="body">Rituals are the foundation of all dark arts. Each ritual requires specific components, timing, and intent.</Typography>
        </TabsContent>
        <TabsContent value="entities">
          <Typography element="body">Entities are beings summoned from other planes. They range from minor imps to ancient primordials.</Typography>
        </TabsContent>
        <TabsContent value="grimoires">
          <Typography element="body">Grimoires contain the accumulated knowledge of centuries. Handle with care.</Typography>
        </TabsContent>
        <TabsContent value="artifacts">
          <Typography element="body">Artifacts hold immense power. Some are tools, others are prisons.</Typography>
        </TabsContent>
      </>
    ),
  },
};

export const BloodVariant: Story = {
  args: {
    defaultValue: "blood",
    variant: "blood",
    children: (
      <>
        <TabsList variant="blood">
          <TabsTrigger value="blood">Blood</TabsTrigger>
          <TabsTrigger value="bone">Bone</TabsTrigger>
          <TabsTrigger value="ash">Ash</TabsTrigger>
        </TabsList>
        <TabsContent value="blood">
          <Typography element="body">Blood rituals are the most potent. They require life essence as fuel.</Typography>
        </TabsContent>
        <TabsContent value="bone">
          <Typography element="body">Bone rituals use the structural remains of the dead.</Typography>
        </TabsContent>
        <TabsContent value="ash">
          <Typography element="body">Ash rituals work with the remnants of what was burned.</Typography>
        </TabsContent>
      </>
    ),
  },
};

export const WineVariant: Story = {
  args: {
    defaultValue: "red",
    variant: "wine",
    children: (
      <>
        <TabsList variant="wine">
          <TabsTrigger value="red">Red Wine</TabsTrigger>
          <TabsTrigger value="white">White Wine</TabsTrigger>
          <TabsTrigger value="blood">Blood Wine</TabsTrigger>
        </TabsList>
        <TabsContent value="red">
          <Typography element="body">Red wines aged in oak coffins for centuries.</Typography>
        </TabsContent>
        <TabsContent value="white">
          <Typography element="body">White wines chilled in glacier ice.</Typography>
        </TabsContent>
        <TabsContent value="blood">
          <Typography element="body">Blood wine - the vintage of the ancients.</Typography>
        </TabsContent>
      </>
    ),
  },
};

export const VelvetVariant: Story = {
  args: {
    defaultValue: "touch",
    variant: "velvet",
    children: (
      <>
        <TabsList variant="velvet">
          <TabsTrigger value="touch">Touch</TabsTrigger>
          <TabsTrigger value="whisper">Whisper</TabsTrigger>
          <TabsTrigger value="sigh">Sigh</TabsTrigger>
        </TabsList>
        <TabsContent value="touch">
          <Typography element="body">The velvet touch - soft, sensual, deadly.</Typography>
        </TabsContent>
        <TabsContent value="whisper">
          <Typography element="body">Whispers carry secrets through the dark.</Typography>
        </TabsContent>
        <TabsContent value="sigh">
          <Typography element="body">A sigh releases what the heart holds.</Typography>
        </TabsContent>
      </>
    ),
  },
};

export const WithContentVariants: Story = {
  args: {
    defaultValue: "default",
    contentVariant: "default",
    children: (
      <>
        <TabsList>
          <TabsTrigger value="default">Default</TabsTrigger>
          <TabsTrigger value="blood">Blood</TabsTrigger>
          <TabsTrigger value="wine">Wine</TabsTrigger>
          <TabsTrigger value="none">None</TabsTrigger>
        </TabsList>
        <TabsContent value="default" variant="default">
          <Typography element="body">Default content panel with velvet texture.</Typography>
        </TabsContent>
        <TabsContent value="blood" variant="blood">
          <Typography element="body">Blood content panel with crimson tint.</Typography>
        </TabsContent>
        <TabsContent value="wine" variant="wine">
          <Typography element="body">Wine content panel with amber glow.</Typography>
        </TabsContent>
        <TabsContent value="none" variant="none">
          <Typography element="body">No panel styling - raw content.</Typography>
        </TabsContent>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    defaultValue: "first",
    orientation: "vertical",
    children: (
      <div className="flex gap-6">
        <TabsList orientation="vertical" variant="blood">
          <TabsTrigger value="first">First Seal</TabsTrigger>
          <TabsTrigger value="second">Second Seal</TabsTrigger>
          <TabsTrigger value="third">Third Seal</TabsTrigger>
          <TabsTrigger value="fourth">Fourth Seal</TabsTrigger>
        </TabsList>
        <TabsContent value="first">
          <Typography element="body">The first seal binds the physical form.</Typography>
        </TabsContent>
        <TabsContent value="second">
          <Typography element="body">The second seal binds the mind.</Typography>
        </TabsContent>
        <TabsContent value="third">
          <Typography element="body">The third seal binds the spirit.</Typography>
        </TabsContent>
        <TabsContent value="fourth">
          <Typography element="body">The fourth seal binds the fate.</Typography>
        </TabsContent>
      </div>
    ),
  },
};

export const WithIcons: Story = {
  args: {
    defaultValue: "summon",
    children: (
      <>
        <TabsList>
          <TabsTrigger value="summon">
            <GothicIcons.Sigil className="h-4 w-4 mr-2" /> Summon
          </TabsTrigger>
          <TabsTrigger value="bind">
            <GothicIcons.WaxSeal className="h-4 w-4 mr-2" /> Bind
          </TabsTrigger>
          <TabsTrigger value="banish">
            <GothicIcons.Skull className="h-4 w-4 mr-2" /> Banish
          </TabsTrigger>
        </TabsList>
        <TabsContent value="summon">
          <Typography element="body">Call forth entities from the void.</Typography>
        </TabsContent>
        <TabsContent value="bind">
          <Typography element="body">Seal entities to your will with wax.</Typography>
        </TabsContent>
        <TabsContent value="banish">
          <Typography element="body">Return entities to their plane of origin.</Typography>
        </TabsContent>
      </>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <Tabs defaultValue="small">
        <TabsList>
          <TabsTrigger value="small" size="sm">Small</TabsTrigger>
          <TabsTrigger value="medium" size="sm">Medium</TabsTrigger>
          <TabsTrigger value="large" size="sm">Large</TabsTrigger>
        </TabsList>
        <TabsContent value="small">
          <Typography element="body-sm">Small tabs for compact spaces.</Typography>
        </TabsContent>
        <TabsContent value="medium">
          <Typography element="body-sm">Medium tabs - the default size.</Typography>
        </TabsContent>
        <TabsContent value="large">
          <Typography element="body-sm">Large tabs for prominent navigation.</Typography>
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="small">
        <TabsList>
          <TabsTrigger value="small" size="md">Small</TabsTrigger>
          <TabsTrigger value="medium" size="md">Medium</TabsTrigger>
          <TabsTrigger value="large" size="md">Large</TabsTrigger>
        </TabsList>
        <TabsContent value="small">
          <Typography element="body">Small tabs for compact spaces.</Typography>
        </TabsContent>
        <TabsContent value="medium">
          <Typography element="body">Medium tabs - the default size.</Typography>
        </TabsContent>
        <TabsContent value="large">
          <Typography element="body">Large tabs for prominent navigation.</Typography>
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="small">
        <TabsList>
          <TabsTrigger value="small" size="lg">Small</TabsTrigger>
          <TabsTrigger value="medium" size="lg">Medium</TabsTrigger>
          <TabsTrigger value="large" size="lg">Large</TabsTrigger>
        </TabsList>
        <TabsContent value="small">
          <Typography element="body-lg">Small tabs for compact spaces.</Typography>
        </TabsContent>
        <TabsContent value="medium">
          <Typography element="body-lg">Medium tabs - the default size.</Typography>
        </TabsContent>
        <TabsContent value="large">
          <Typography element="body-lg">Large tabs for prominent navigation.</Typography>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Tabs defaultValue="overview" variant="velvet" contentVariant="velvet">
      <TabsList variant="velvet">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="specs">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="ritual">Ritual</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" variant="velvet">
        <div className="space-y-4">
          <Typography element="headline">Cursed Blade of the Ancients</Typography>
          <Typography element="body">A weapon forged in the blood of fallen gods. Its edge never dulls, its thirst never sated.</Typography>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blood-400/20 text-blood-300 rounded-full text-sm">Legendary</span>
            <span className="px-3 py-1 bg-wine-400/20 text-wine-300 rounded-full text-sm">Cursed</span>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="specs" variant="velvet">
        <div className="space-y-2">
          <Typography element="label">Damage</Typography>
          <Typography element="body">999+ (Unmeasurable)</Typography>
          <Typography element="label">Speed</Typography>
          <Typography element="body">Instant</Typography>
          <Typography element="label">Range</Typography>
          <Typography element="body">Melee (Planar reach)</Typography>
          <Typography element="label">Requirements</Typography>
          <Typography element="body">Soul binding required</Typography>
        </div>
      </TabsContent>
      <TabsContent value="reviews" variant="velvet">
        <div className="space-y-4">
          <div className="p-4 bg-void-700/50 rounded-gothic-md border border-border-subtle">
            <Typography element="label">⭐⭐⭐⭐⭐ "Consumed my enemies"</Typography>
            <Typography element="body-sm" color="secondary">— Lord of Shadows</Typography>
          </div>
          <div className="p-4 bg-void-700/50 rounded-gothic-md border border-border-subtle">
            <Typography element="label">⭐⭐⭐⭐ "Cost me my left hand"</Typography>
            <Typography element="body-sm" color="secondary">— Fallen Paladin</Typography>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="ritual" variant="velvet">
        <Typography element="body">To claim this blade, you must perform the Ritual of Binding at midnight under a blood moon. The price is a memory you cherish most.</Typography>
      </TabsContent>
    </Tabs>
  ),
};
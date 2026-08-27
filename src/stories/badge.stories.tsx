import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../components/ui/badge";
import { GothicIcons } from "../components/ui/icon";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Badge component with blood, wine, pallor, void, gold, rose, and outline variants. Supports dots, pulse animation, and icons.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["blood", "wine", "pallor", "void", "gold", "rose", "outline"],
      description: "Visual variant",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Badge size",
    },
    dot: {
      control: "boolean",
      description: "Show colored dot indicator",
    },
    pulse: {
      control: "boolean",
      description: "Enable pulse animation",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Blood: Story = {
  args: {
    children: "Blood",
    variant: "blood",
  },
};

export const Wine: Story = {
  args: {
    children: "Wine",
    variant: "wine",
  },
};

export const Pallor: Story = {
  args: {
    children: "Pallor",
    variant: "pallor",
  },
};

export const Void: Story = {
  args: {
    children: "Void",
    variant: "void",
  },
};

export const Gold: Story = {
  args: {
    children: "Gold",
    variant: "gold",
  },
};

export const Rose: Story = {
  args: {
    children: "Rose",
    variant: "rose",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="blood">Blood</Badge>
      <Badge variant="wine">Wine</Badge>
      <Badge variant="pallor">Pallor</Badge>
      <Badge variant="void">Void</Badge>
      <Badge variant="gold">Gold</Badge>
      <Badge variant="rose">Rose</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="blood" dot>Live</Badge>
      <Badge variant="wine" dot>Active</Badge>
      <Badge variant="pallor" dot>Ready</Badge>
      <Badge variant="void" dot>Hidden</Badge>
    </div>
  ),
};

export const WithPulse: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="blood" pulse>Pulsing Blood</Badge>
      <Badge variant="wine" pulse>Pulsing Wine</Badge>
      <Badge variant="rose" pulse>Pulsing Rose</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="blood" icon={<GothicIcons.BloodDrop className="h-3 w-3" />}>Ritual</Badge>
      <Badge variant="wine" icon={<GothicIcons.Chalice className="h-3 w-3" />}>Feast</Badge>
      <Badge variant="velvet" icon={<GothicIcons.VelvetRibbon className="h-3 w-3" />}>Touch</Badge>
      <Badge variant="gold" icon={<GothicIcons.Crown className="h-3 w-3" />}>Royal</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge size="xs">XS</Badge>
      <Badge size="sm">SM</Badge>
      <Badge size="md">MD</Badge>
      <Badge size="lg">LG</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="space-y-3 w-64">
      <div className="flex items-center gap-2">
        <Badge variant="blood" dot pulse>Online</Badge>
        <span className="text-pallor-300 text-sm">Active ritual</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="wine" dot>Away</Badge>
        <span className="text-pallor-300 text-sm">In the shadows</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="void" dot>Offline</Badge>
        <span className="text-pallor-300 text-sm">Dormant</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="rose" dot pulse>Busy</Badge>
        <span className="text-pallor-300 text-sm">Casting spell</span>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="flex flex-wrap gap-2">
        <Badge variant="blood">Blood</Badge>
        <Badge variant="blood" dot>Blood Dot</Badge>
        <Badge variant="blood" pulse>Blood Pulse</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="wine">Wine</Badge>
        <Badge variant="wine" dot>Wine Dot</Badge>
        <Badge variant="wine" pulse>Wine Pulse</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="gold">Gold</Badge>
        <Badge variant="rose">Rose</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </div>
  ),
};
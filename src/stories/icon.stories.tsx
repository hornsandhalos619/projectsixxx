import type { Meta, StoryObj } from "@storybook/react";
import { Icon, GothicIcons } from "../components/ui/icon";
import { Typography } from "../components/ui/typography";

const gothicIconComponents = {
  WaxSeal: GothicIcons.WaxSeal,
  Chalice: GothicIcons.Chalice,
  Skull: GothicIcons.Skull,
  Bat: GothicIcons.Bat,
  Rose: GothicIcons.Rose,
  Dagger: GothicIcons.Dagger,
  Crown: GothicIcons.Crown,
  Pentagram: GothicIcons.Pentagram,
  Moon: GothicIcons.Moon,
  Candle: GothicIcons.Candle,
  Grimoire: GothicIcons.Grimoire,
  BloodDrop: GothicIcons.BloodDrop,
  VelvetRibbon: GothicIcons.VelvetRibbon,
  Ouroboros: GothicIcons.Ouroboros,
  Key: GothicIcons.Key,
  Sigil: GothicIcons.Sigil,
} as const;

type GothicIconName = keyof typeof gothicIconComponents;

const meta: Meta<typeof Icon> = {
  title: "UI/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Icon system with Lucide React icons and custom Gothic icons. Supports size, variant, weight, and animation variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "Lucide icon name",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
      description: "Icon size",
    },
    variant: {
      control: "select",
      options: ["default", "primary", "muted", "accent", "wine", "blood", "inverse"],
      description: "Color variant",
    },
    weight: {
      control: "select",
      options: ["thin", "normal", "medium", "bold"],
      description: "Stroke weight",
    },
    animated: {
      control: "boolean",
      description: "Enable blood pulse animation",
    },
    spin: {
      control: "boolean",
      description: "Enable spin animation",
    },
    pulse: {
      control: "boolean",
      description: "Enable pulse animation",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: "Skull",
    size: "xl",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Icon name="Skull" size="xs" />
      <Icon name="Skull" size="sm" />
      <Icon name="Skull" size="md" />
      <Icon name="Skull" size="lg" />
      <Icon name="Skull" size="xl" />
      <Icon name="Skull" size="2xl" />
      <Icon name="Skull" size="3xl" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Icon name="Rose" variant="default" size="xl" />
      <Icon name="Rose" variant="primary" size="xl" />
      <Icon name="Rose" variant="muted" size="xl" />
      <Icon name="Rose" variant="accent" size="xl" />
      <Icon name="Rose" variant="wine" size="xl" />
      <Icon name="Rose" variant="blood" size="xl" />
      <Icon name="Rose" variant="inverse" size="xl" className="bg-pallor-100 p-2 rounded" />
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Icon name="Dagger" weight="thin" size="xl" variant="blood" />
      <Icon name="Dagger" weight="normal" size="xl" variant="blood" />
      <Icon name="Dagger" weight="medium" size="xl" variant="blood" />
      <Icon name="Dagger" weight="bold" size="xl" variant="blood" />
    </div>
  ),
};

export const Animated: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Icon name="Bat" animated size="xl" variant="blood" />
      <Icon name="Rose" spin size="xl" variant="blood" />
      <Icon name="BloodDrop" pulse size="xl" variant="blood" />
    </div>
  ),
};

export const GothicIconsGallery: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-6 max-w-4xl">
      {(Object.entries(gothicIconComponents) as [GothicIconName, React.ComponentType<React.SVGProps<SVGSVGElement>>][]).map(([name, IconComponent]) => (
        <div key={name} className="flex flex-col items-center gap-2 p-4 bg-void-800 rounded-gothic-lg border border-border-subtle">
          <IconComponent className="h-12 w-12" />
          <Typography element="caption" className="text-center">{name}</Typography>
        </div>
      ))}
    </div>
  ),
};

export const LucideIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4 max-w-4xl">
      {[
        "Moon",
        "Sun",
        "Star",
        "Heart",
        "Skull",
        "Ghost",
        "Zap",
        "Flame",
        "Droplet",
        "Gem",
        "Crown",
        "Key",
        "Lock",
        "Unlock",
        "Eye",
        "EyeOff",
        "Search",
        "Filter",
        "Settings",
        "Menu",
        "X",
        "Plus",
        "Minus",
        "Check",
        "ArrowRight",
        "ArrowLeft",
        "ArrowUp",
        "ArrowDown",
        "ChevronRight",
        "ChevronLeft",
        "ChevronUp",
        "ChevronDown",
        "Circle",
        "Square",
        "Triangle",
        "Hexagon",
      ].map((name) => (
        <div key={name} className="flex flex-col items-center gap-2 p-4 bg-void-800 rounded-gothic-lg border border-border-subtle">
          <Icon name={name as any} size="lg" variant="primary" />
          <Typography element="caption" className="text-center text-xs">{name}</Typography>
        </div>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <button className="p-2 rounded-gothic-md bg-void-800 border border-border-subtle hover:border-blood-400/50 transition-colors">
        <Icon name="Skull" size="lg" variant="blood" />
      </button>
      <button className="p-2 rounded-gothic-md bg-void-800 border border-border-subtle hover:border-wine-400/50 transition-colors">
        <Icon name="Rose" size="lg" variant="wine" spin />
      </button>
      <button className="p-2 rounded-gothic-md bg-void-800 border border-border-subtle hover:border-blood-400/50 transition-colors">
        <Icon name="Bat" size="lg" variant="blood" animated />
      </button>
    </div>
  ),
};
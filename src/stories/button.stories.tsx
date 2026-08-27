import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { GothicIcons } from "./icon";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A versatile button component with gothic/nocturne design system variants including primary, secondary, ghost, blood, velvet, and more.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "blood", "velvet", "outline", "destructive"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "icon"],
      description: "Button size",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether button takes full width",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    asChild: {
      control: "boolean",
      description: "Render as child component",
    },
    iconLeft: {
      control: false,
      description: "Icon to show on left",
      table: { category: "Icons" },
    },
    iconRight: {
      control: false,
      description: "Icon to show on right",
      table: { category: "Icons" },
    },
    loadingText: {
      control: "text",
      description: "Text to show while loading",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Summon",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Summon",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Summon",
    variant: "ghost",
  },
};

export const Blood: Story = {
  args: {
    children: "Blood Ritual",
    variant: "blood",
  },
};

export const Velvet: Story = {
  args: {
    children: "Velvet Touch",
    variant: "velvet",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destroy",
    variant: "destructive",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="blood">Blood</Button>
      <Button variant="velvet">Velvet</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
      <Button size="icon" aria-label="Icon button">
        <GothicIcons.WaxSeal className="h-5 w-5" />
      </Button>
    </div>
  ),
};

export const WithIconLeft: Story = {
  args: {
    children: "With Icon",
    iconLeft: <GothicIcons.BloodDrop className="h-4 w-4" />,
  },
};

export const WithIconRight: Story = {
  args: {
    children: "With Icon",
    iconRight: <GothicIcons.VelvetRibbon className="h-4 w-4" />,
  },
};

export const Loading: Story = {
  args: {
    children: "Summoning...",
    loading: true,
    loadingText: "Binding shadows...",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
};

export const AsChild: Story = {
  render: () => (
    <Button asChild>
      <a href="#summon" className="w-full">
        Rendered as Link
      </a>
    </Button>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="flex gap-2">
        <Button variant="primary" size="sm">Primary</Button>
        <Button variant="secondary" size="sm">Secondary</Button>
        <Button variant="ghost" size="sm">Ghost</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="blood" size="sm">Blood</Button>
        <Button variant="velvet" size="sm">Velvet</Button>
        <Button variant="destructive" size="sm">Destructive</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" size="sm" loading>Loading</Button>
        <Button variant="primary" size="sm" disabled>Disabled</Button>
      </div>
    </div>
  ),
};
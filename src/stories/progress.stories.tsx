"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { Progress, StepProgress } from "../components/ui/progress";
import { GothicIcons } from "../components/ui/icon";
import { Typography } from "../components/ui/typography";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Progress component with blood fill, velvet track, and ritual step variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "blood", "wine", "velvet", "gold", "ritual"],
      description: "Progress variant",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Progress height",
    },
    radius: {
      control: "select",
      options: ["full", "gothic", "none"],
      description: "Border radius",
    },
    showLabel: {
      control: "boolean",
      description: "Show percentage label",
    },
    labelPosition: {
      control: "select",
      options: ["inside", "outside", "overlay"],
      description: "Label position",
    },
    striped: {
      control: "boolean",
      description: "Striped animation",
    },
    animated: {
      control: "boolean",
      description: "Shimmer animation",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 65,
    variant: "default",
  },
};

export const Blood: Story = {
  args: {
    value: 75,
    variant: "blood",
  },
};

export const Wine: Story = {
  args: {
    value: 50,
    variant: "wine",
  },
};

export const Velvet: Story = {
  args: {
    value: 80,
    variant: "velvet",
  },
};

export const Gold: Story = {
  args: {
    value: 90,
    variant: "gold",
  },
};

export const Ritual: Story = {
  args: {
    value: 45,
    variant: "ritual",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <Typography element="label" className="mb-2">Default</Typography>
        <Progress value={65} variant="default" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Blood</Typography>
        <Progress value={75} variant="blood" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Wine</Typography>
        <Progress value={50} variant="wine" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Velvet</Typography>
        <Progress value={80} variant="velvet" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Gold</Typography>
        <Progress value={90} variant="gold" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Ritual</Typography>
        <Progress value={45} variant="ritual" />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <Typography element="label" className="mb-2">Outside Label</Typography>
        <Progress value={65} variant="blood" showLabel labelPosition="outside" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Inside Label</Typography>
        <Progress value={75} variant="wine" showLabel labelPosition="inside" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Overlay Label</Typography>
        <Progress value={85} variant="velvet" showLabel labelPosition="overlay" />
      </div>
    </div>
  ),
};

export const WithCustomFormat: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <Typography element="label" className="mb-2">Ritual Progress</Typography>
        <Progress
          value={3}
          max={4}
          variant="ritual"
          showLabel
          labelPosition="outside"
          labelFormat={(value) => `Phase ${Math.round(value)} of 4`}
        />
      </div>
      <div>
        <Typography element="label" className="mb-2">Blood Collected</Typography>
        <Progress
          value={2.5}
          max={5}
          variant="blood"
          showLabel
          labelPosition="outside"
          labelFormat={(value) => `${value.toFixed(1)} / 5.0 liters`}
        />
      </div>
      <div>
        <Typography element="label" className="mb-2">Soul Essence</Typography>
        <Progress
          value={750}
          max={1000}
          variant="velvet"
          showLabel
          labelPosition="outside"
          labelFormat={(value) => `${Math.round(value)} / 1000`}
        />
      </div>
    </div>
  ),
};

export const Striped: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <Progress value={50} variant="blood" striped />
      <Progress value={75} variant="wine" striped />
      <Progress value={30} variant="velvet" striped />
    </div>
  ),
};

export const Animated: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <Progress value={60} variant="blood" animated />
      <Progress value={40} variant="wine" animated />
      <Progress value={80} variant="velvet" animated />
      <Progress value={50} variant="ritual" animated />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <Typography element="label" className="mb-2">XS</Typography>
        <Progress value={50} variant="blood" size="xs" />
      </div>
      <div>
        <Typography element="label" className="mb-2">SM</Typography>
        <Progress value={50} variant="blood" size="sm" />
      </div>
      <div>
        <Typography element="label" className="mb-2">MD</Typography>
        <Progress value={50} variant="blood" size="md" />
      </div>
      <div>
        <Typography element="label" className="mb-2">LG</Typography>
        <Progress value={50} variant="blood" size="lg" />
      </div>
      <div>
        <Typography element="label" className="mb-2">XL</Typography>
        <Progress value={50} variant="blood" size="xl" />
      </div>
    </div>
  ),
};

export const RadiusVariants: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <Typography element="label" className="mb-2">Full (default)</Typography>
        <Progress value={60} variant="blood" radius="full" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Gothic</Typography>
        <Progress value={60} variant="blood" radius="gothic" />
      </div>
      <div>
        <Typography element="label" className="mb-2">None</Typography>
        <Progress value={60} variant="blood" radius="none" />
      </div>
    </div>
  ),
};

export const StepProgressDefault: Story = {
  render: () => (
    <StepProgress
      steps={[
        { label: "Invocation", description: "Speak the true name", icon: <GothicIcons.Sigil className="h-5 w-5" />, complete: true },
        { label: "Binding", description: "Seal with wax and blood", icon: <GothicIcons.WaxSeal className="h-5 w-5" />, current: true },
        { label: "Offering", description: "Give what is demanded", icon: <GothicIcons.Dagger className="h-5 w-5" /> },
        { label: "Manifestation", description: "The entity arrives", icon: <GothicIcons.Ouroboros className="h-5 w-5" /> },
      ]}
    />
  ),
};

export const StepProgressVertical: Story = {
  render: () => (
    <StepProgress
      orientation="vertical"
      variant="blood"
      size="lg"
      steps={[
        { label: "Discovery", description: "Seek the forbidden knowledge", complete: true },
        { label: "Preparation", description: "Gather components and sacrifices", complete: true },
        { label: "Execution", description: "Perform the ritual at midnight", current: true },
        { label: "Ascension", description: "Claim your power", description: "The pact is sealed" },
      ]}
    />
  ),
};

export const StepProgressVariants: Story = {
  render: () => (
    <div className="space-y-8 w-96">
      <div>
        <Typography element="label" className="mb-4">Default</Typography>
        <StepProgress
          steps={[
            { label: "Step 1", complete: true },
            { label: "Step 2", current: true },
            { label: "Step 3" },
            { label: "Step 4" },
          ]}
        />
      </div>
      <div>
        <Typography element="label" className="mb-4">Blood</Typography>
        <StepProgress
          variant="blood"
          steps={[
            { label: "Step 1", complete: true },
            { label: "Step 2", current: true },
            { label: "Step 3" },
          ]}
        />
      </div>
      <div>
        <Typography element="label" className="mb-4">Wine</Typography>
        <StepProgress
          variant="wine"
          steps={[
            { label: "Step 1", complete: true },
            { label: "Step 2", current: true },
            { label: "Step 3" },
          ]}
        />
      </div>
      <div>
        <Typography element="label" className="mb-4">Ritual</Typography>
        <StepProgress
          variant="ritual"
          steps={[
            { label: "Step 1", complete: true },
            { label: "Step 2", current: true },
            { label: "Step 3" },
          ]}
        />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-8 w-96">
      <div>
        <Typography element="headline" className="mb-4">Ritual of Binding</Typography>
        <StepProgress
          variant="ritual"
          size="lg"
          steps={[
            { label: "Invocation", description: "Speak the true name at midnight", icon: <GothicIcons.Sigil className="h-5 w-5" />, complete: true },
            { label: "Binding", description: "Seal with black wax and sigils", icon: <GothicIcons.WaxSeal className="h-5 w-5" />, current: true },
            { label: "Offering", description: "Sacrifice a cherished memory", icon: <GothicIcons.Dagger className="h-5 w-5" /> },
            { label: "Manifestation", description: "The entity claims its vessel", icon: <GothicIcons.Ouroboros className="h-5 w-5" /> },
          ]}
        />
      </div>
      <div>
        <Typography element="headline" className="mb-4">Blood Collection</Typography>
        <Progress
          value={3.2}
          max={5}
          variant="blood"
          showLabel
          labelPosition="outside"
          labelFormat={(value) => `${value.toFixed(1)} / 5.0 liters`}
          animated
        />
      </div>
    </div>
  ),
};
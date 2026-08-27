import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "../components/ui/divider";
import { Typography } from "../components/ui/typography";

const meta: Meta<typeof Divider> = {
  title: "UI/Divider",
  component: Divider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Divider component with ornate, blood-line, gold-leaf, velvet-fade, and other gothic variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "blood",
        "blood-gradient",
        "wine",
        "wine-gradient",
        "velvet",
        "velvet-fade",
        "gold",
        "gold-leaf",
        "ornate",
        "double",
        "dashed",
      ],
      description: "Divider variant",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation",
    },
    thickness: {
      control: "select",
      options: ["thin", "medium", "thick"],
      description: "Line thickness",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Blood: Story = {
  args: {
    variant: "blood",
  },
};

export const BloodGradient: Story = {
  args: {
    variant: "blood-gradient",
  },
};

export const Wine: Story = {
  args: {
    variant: "wine",
  },
};

export const WineGradient: Story = {
  args: {
    variant: "wine-gradient",
  },
};

export const Velvet: Story = {
  args: {
    variant: "velvet",
  },
};

export const VelvetFade: Story = {
  args: {
    variant: "velvet-fade",
  },
};

export const Gold: Story = {
  args: {
    variant: "gold",
  },
};

export const GoldLeaf: Story = {
  args: {
    variant: "gold-leaf",
  },
};

export const Ornate: Story = {
  args: {
    variant: "ornate",
  },
};

export const Double: Story = {
  args: {
    variant: "double",
  },
};

export const Dashed: Story = {
  args: {
    variant: "dashed",
  },
};

export const WithLabel: Story = {
  args: {
    variant: "blood-gradient",
    children: "RITUAL BOUNDARY",
  },
};

export const WithLabelWine: Story = {
  args: {
    variant: "wine-gradient",
    children: "COVEN SEAL",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <Typography element="caption">DEFAULT</Typography>
        <Divider variant="default" className="mt-2" />
      </div>
      <div>
        <Typography element="caption">BLOOD</Typography>
        <Divider variant="blood" className="mt-2" />
      </div>
      <div>
        <Typography element="caption">BLOOD GRADIENT</Typography>
        <Divider variant="blood-gradient" className="mt-2" />
      </div>
      <div>
        <Typography element="caption">WINE</Typography>
        <Divider variant="wine" className="mt-2" />
      </div>
      <div>
        <Typography element="caption">WINE GRADIENT</Typography>
        <Divider variant="wine-gradient" className="mt-2" />
      </div>
      <div>
        <Typography element="caption">VELVET</Typography>
        <Divider variant="velvet" className="mt-2" />
      </div>
      <div>
        <Typography element="caption">VELVET FADE</Typography>
        <Divider variant="velvet-fade" className="mt-2" />
      </div>
      <div>
        <Typography element="caption">GOLD</Typography>
        <Divider variant="gold" className="mt-2" />
      </div>
      <div>
        <Typography element="caption">GOLD LEAF</Typography>
        <Divider variant="gold-leaf" className="mt-2" />
      </div>
      <div>
        <Typography element="caption">ORNATE</Typography>
        <Divider variant="ornate" className="mt-2" />
      </div>
      <div>
        <Typography element="caption">DOUBLE</Typography>
        <Divider variant="double" className="mt-2" />
      </div>
      <div>
        <Typography element="caption">DASHED</Typography>
        <Divider variant="dashed" className="mt-2" />
      </div>
    </div>
  ),
};

export const SectionDividers: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <Typography element="headline">Section One</Typography>
        <Typography element="body" className="mt-2">Content in the first section.</Typography>
      </div>
      <Divider variant="ornate" />
      <div>
        <Typography element="headline">Section Two</Typography>
        <Typography element="body" className="mt-2">Content in the second section.</Typography>
      </div>
      <Divider variant="blood-gradient" />
      <div>
        <Typography element="headline">Section Three</Typography>
        <Typography element="body" className="mt-2">Content in the third section.</Typography>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 h-48">
      <Typography element="body" color="secondary">Left content</Typography>
      <Divider variant="blood-gradient" orientation="vertical" className="h-24" />
      <Typography element="body" color="secondary">Right content</Typography>
    </div>
  ),
};
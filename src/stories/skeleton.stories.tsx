"use client";

import type { Meta, StoryObj } from "@storybook/react";
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonInput,
  SkeletonList,
  SkeletonTable,
} from "../components/ui/skeleton";
import { Typography } from "../components/ui/typography";
import { Divider } from "../components/ui/divider";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Skeleton loading components with velvet shimmer animation for all UI patterns.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "blood", "wine", "velvet", "text", "card", "avatar", "button", "input"],
      description: "Skeleton variant",
    },
    animation: {
      control: "select",
      options: ["pulse", "wave", "shimmer", "none"],
      description: "Animation type",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    variant: "default",
    width: 200,
    height: 20,
  },
};

export const TextLines: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <SkeletonText lines={1} />
      <SkeletonText lines={2} />
      <SkeletonText lines={3} />
      <SkeletonText lines={4} />
      <SkeletonText lines={5} />
    </div>
  ),
};

export const CardSkeleton: Story = {
  args: {
    variant: "card",
    hasImage: true,
    lines: 3,
    className: "max-w-md",
  },
};

export const AvatarSkeleton: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <SkeletonAvatar size="xs" />
      <SkeletonAvatar size="sm" />
      <SkeletonAvatar size="md" />
      <SkeletonAvatar size="lg" />
      <SkeletonAvatar size="xl" />
      <SkeletonAvatar size="2xl" />
    </div>
  ),
};

export const ButtonSkeleton: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <SkeletonButton size="xs" />
      <SkeletonButton size="sm" />
      <SkeletonButton size="md" />
      <SkeletonButton size="lg" />
      <SkeletonButton size="xl" />
    </div>
  ),
};

export const InputSkeleton: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <SkeletonInput size="sm" />
      <SkeletonInput size="md" />
      <SkeletonInput size="lg" />
    </div>
  ),
};

export const ListSkeleton: Story = {
  args: {
    items: 5,
    hasAvatar: true,
    hasAction: true,
    lines: 2,
  },
};

export const TableSkeleton: Story = {
  args: {
    rows: 5,
    columns: 4,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <Typography element="label" className="mb-2">Default</Typography>
        <Skeleton variant="default" width="200" height="20" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Blood</Typography>
        <Skeleton variant="blood" width="200" height="20" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Wine</Typography>
        <Skeleton variant="wine" width="200" height="20" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Velvet</Typography>
        <Skeleton variant="velvet" width="200" height="20" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Text</Typography>
        <Skeleton variant="text" width="200" height="20" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Card</Typography>
        <Skeleton variant="card" width="200" height="120" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Avatar</Typography>
        <Skeleton variant="avatar" width="60" height="60" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Button</Typography>
        <Skeleton variant="button" width="120" height="44" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Input</Typography>
        <Skeleton variant="input" width="300" height="44" />
      </div>
    </div>
  ),
};

export const Animations: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <Typography element="label" className="mb-2">Pulse</Typography>
        <Skeleton variant="default" width="200" height="20" animation="pulse" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Wave (default)</Typography>
        <Skeleton variant="default" width="200" height="20" animation="wave" />
      </div>
      <div>
        <Typography element="label" className="mb-2">Shimmer</Typography>
        <Skeleton variant="default" width="200" height="20" animation="shimmer" />
      </div>
      <div>
        <Typography element="label" className="mb-2">None</Typography>
        <Skeleton variant="default" width="200" height="20" animation="none" />
      </div>
    </div>
  ),
};

export const FullPageLayout: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width="150" height="24" />
        <div className="flex gap-4">
          <Skeleton variant="button" width="100" height="40" />
          <Skeleton variant="button" width="100" height="40" />
        </div>
      </div>
      <SkeletonCard hasImage lines={2} />
      <Divider variant="blood-gradient" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkeletonCard hasImage lines={2} />
        <SkeletonCard hasImage lines={2} />
        <SkeletonCard hasImage lines={2} />
      </div>
      <Divider variant="blood-gradient" />
      <SkeletonList items={4} hasAvatar hasAction lines={3} />
      <Divider variant="blood-gradient" />
      <SkeletonTable rows={4} columns={5} />
    </div>
  ),
};

import { Divider } from "../components/ui/divider";
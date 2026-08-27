"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup } from "../components/ui/avatar";
import { GothicIcons } from "../components/ui/icon";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Avatar component with gothic frame variants including blood, wine, velvet, gold, skull, bat, rose, crown, and ornate styles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
      description: "Avatar size",
    },
    variant: {
      control: "select",
      options: ["default", "blood", "wine", "velvet", "gold", "ornate", "skull", "bat", "rose", "crown"],
      description: "Frame variant",
    },
    shape: {
      control: "select",
      options: ["circle", "square", "gothic"],
      description: "Avatar shape",
    },
    status: {
      control: "select",
      options: ["online", "offline", "busy", "away"],
      description: "Status indicator",
    },
    statusPosition: {
      control: "select",
      options: ["bottom-right", "bottom-left", "top-right", "top-left"],
      description: "Status position",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=dark",
    alt: "Dark entity",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Avatar size="xs" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
      <Avatar size="sm" src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" />
      <Avatar size="md" src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" />
      <Avatar size="lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=4" />
      <Avatar size="xl" src="https://api.dicebear.com/7.x/avataaars/svg?seed=5" />
      <Avatar size="2xl" src="https://api.dicebear.com/7.x/avataaars/svg?seed=6" />
      <Avatar size="3xl" src="https://api.dicebear.com/7.x/avataaars/svg?seed=7" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Avatar variant="default" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
      <Avatar variant="blood" src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" />
      <Avatar variant="wine" src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" />
      <Avatar variant="velvet" src="https://api.dicebear.com/7.x/avataaars/svg?seed=4" />
      <Avatar variant="gold" src="https://api.dicebear.com/7.x/avataaars/svg?seed=5" />
      <Avatar variant="ornate" src="https://api.dicebear.com/7.x/avataaars/svg?seed=6" />
      <Avatar variant="skull" icon="skull" />
      <Avatar variant="bat" icon="bat" />
      <Avatar variant="rose" icon="rose" />
      <Avatar variant="crown" icon="crown" />
    </div>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Avatar fallback="JD" variant="blood" />
      <Avatar fallback="AE" variant="wine" />
      <Avatar fallback="VR" variant="velvet" />
      <Avatar fallback="??" variant="skull" />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-6 flex-wrap">
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=1"
        status="online"
        variant="blood"
      />
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=2"
        status="away"
        variant="wine"
      />
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=3"
        status="busy"
        variant="rose"
      />
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=4"
        status="offline"
        variant="void"
      />
    </div>
  ),
};

export const StatusPositions: Story = {
  render: () => (
    <div className="flex items-center gap-6 flex-wrap">
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=1"
        status="online"
        statusPosition="bottom-right"
        variant="blood"
      />
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=2"
        status="online"
        statusPosition="bottom-left"
        variant="blood"
      />
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=3"
        status="online"
        statusPosition="top-right"
        variant="blood"
      />
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=4"
        status="online"
        statusPosition="top-left"
        variant="blood"
      />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Avatar shape="circle" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" variant="blood" size="lg" />
      <Avatar shape="square" src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" variant="wine" size="lg" />
      <Avatar shape="gothic" src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" variant="velvet" size="lg" />
    </div>
  ),
};

export const WithGothicIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Avatar variant="skull" icon="skull" size="lg" />
      <Avatar variant="bat" icon="bat" size="lg" />
      <Avatar variant="rose" icon="rose" size="lg" />
      <Avatar variant="crown" icon="crown" size="lg" />
    </div>
  ),
};

export const AvatarGroupStory: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <AvatarGroup max={5} size="md" variant="blood">
        <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
        <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" />
        <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" />
        <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=4" />
        <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=5" />
        <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=6" />
        <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=7" />
      </AvatarGroup>
      <AvatarGroup max={4} size="lg" variant="velvet">
        <Avatar variant="skull" icon="skull" />
        <Avatar variant="bat" icon="bat" />
        <Avatar variant="rose" icon="rose" />
        <Avatar variant="crown" icon="crown" />
        <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
      </AvatarGroup>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div className="flex items-center gap-4 flex-wrap">
        <Avatar size="md" variant="default" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
        <Avatar size="md" variant="blood" src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" />
        <Avatar size="md" variant="wine" src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" />
        <Avatar size="md" variant="velvet" src="https://api.dicebear.com/7.x/avataaars/svg?seed=4" />
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <Avatar size="md" variant="gold" src="https://api.dicebear.com/7.x/avataaars/svg?seed=5" />
        <Avatar size="md" variant="ornate" src="https://api.dicebear.com/7.x/avataaars/svg?seed=6" />
        <Avatar size="md" variant="skull" icon="skull" />
        <Avatar size="md" variant="bat" icon="bat" />
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <Avatar size="md" variant="rose" icon="rose" />
        <Avatar size="md" variant="crown" icon="crown" />
        <Avatar size="md" variant="blood" status="online" src="https://api.dicebear.com/7.x/avataaars/svg?seed=7" />
        <Avatar size="md" variant="wine" status="busy" src="https://api.dicebear.com/7.x/avataaars/svg?seed=8" />
      </div>
    </div>
  ),
};
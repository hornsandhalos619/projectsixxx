import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../components/ui/tooltip";
import { Button } from "../components/ui/button";
import { GothicIcons } from "../components/ui/icon";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Tooltip component with velvet texture, blood-tip, and other gothic variants. Built on Radix UI.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["velvet", "blood", "wine", "obsidian"],
      description: "Tooltip variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Summon the shadows</TooltipContent>
    </Tooltip>
  ),
};

export const Velvet: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost">Velvet tooltip</Button>
      </TooltipTrigger>
      <TooltipContent variant="velvet">Soft as velvet, dark as night</TooltipContent>
    </Tooltip>
  ),
};

export const Blood: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="blood">Blood tooltip</Button>
      </TooltipTrigger>
      <TooltipContent variant="blood">Arterial knowledge flows here</TooltipContent>
    </Tooltip>
  ),
};

export const Wine: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Wine tooltip</Button>
      </TooltipTrigger>
      <TooltipContent variant="wine">Aged wisdom, amber hue</TooltipContent>
    </Tooltip>
  ),
};

export const Obsidian: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="velvet">Obsidian tooltip</Button>
      </TooltipTrigger>
      <TooltipContent variant="obsidian">Cracked glass reveals truth</TooltipContent>
    </Tooltip>
  ),
};

export const WithIconButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <GothicIcons.Sigil className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent variant="velvet">Settings</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Profile">
            <GothicIcons.Skull className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent variant="blood">Profile</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <GothicIcons.BloodDrop className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent variant="wine">Notifications</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="velvet">Rich content</Button>
      </TooltipTrigger>
      <TooltipContent variant="velvet" className="max-w-xs">
        <div className="space-y-2">
          <p className="font-display-alt text-step-1">Ritual Complete</p>
          <p className="text-pallor-300 text-step-0">The binding has been sealed with wax.</p>
          <div className="flex gap-2 pt-2 border-t border-border-subtle">
            <Button variant="ghost" size="sm">Dismiss</Button>
            <Button variant="blood" size="sm">Confirm</Button>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};

export const DifferentPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">Top</Button>
        </TooltipTrigger>
        <TooltipContent variant="velvet" side="top">Tooltip on top</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">Right</Button>
        </TooltipTrigger>
        <TooltipContent variant="velvet" side="right">Tooltip on right</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent variant="velvet" side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">Left</Button>
        </TooltipTrigger>
        <TooltipContent variant="velvet" side="left">Tooltip on left</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="flex gap-2 flex-wrap">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="primary" size="sm">Primary</Button>
          </TooltipTrigger>
          <TooltipContent variant="velvet">Primary action tooltip</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="sm">Secondary</Button>
          </TooltipTrigger>
          <TooltipContent variant="wine">Secondary action tooltip</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="blood" size="sm">Blood</Button>
          </TooltipTrigger>
          <TooltipContent variant="blood">Blood ritual tooltip</TooltipContent>
        </Tooltip>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Edit">
              <GothicIcons.Dagger className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent variant="velvet">Edit</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Delete">
              <GothicIcons.Skull className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent variant="blood">Delete</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Share">
              <GothicIcons.VelvetRibbon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent variant="wine">Share</TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
};
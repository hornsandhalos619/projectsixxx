"use client";

import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { GothicIcons } from "../components/ui/icon";

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Dialog/Modal component with obsidian-glass backdrop, wax-seal close, and ritual entrance animation. Built on Radix UI.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Dialog size",
    },
    variant: {
      control: "select",
      options: ["default", "obsidian", "blood", "wine", "ritual"],
      description: "Dialog variant",
    },
    overlayVariant: {
      control: "select",
      options: ["default", "blood", "ritual"],
      description: "Overlay variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Summon Ritual</DialogTitle>
          <DialogDescription>
            Are you prepared to bind the entity? This ritual cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button variant="blood">Bind Entity</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Obsidian: Story = {
  render: () => (
    <Dialog variant="obsidian" overlayVariant="ritual">
      <DialogTrigger asChild>
        <Button variant="velvet">Open Obsidian Dialog</Button>
      </DialogTrigger>
      <DialogContent variant="obsidian">
        <DialogHeader>
          <DialogTitle>Obsidian Sanctum</DialogTitle>
          <DialogDescription>
            The glass walls reflect your true nature. Enter if you dare.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Flee</Button>
          <Button variant="primary">Enter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Blood: Story = {
  render: () => (
    <Dialog variant="blood" overlayVariant="blood">
      <DialogTrigger asChild>
        <Button variant="blood">Open Blood Dialog</Button>
      </DialogTrigger>
      <DialogContent variant="blood">
        <DialogHeader>
          <DialogTitle>Blood Covenant</DialogTitle>
          <DialogDescription>
            Sign in blood. The pact is eternal. The price is your soul.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Refuse</Button>
          <Button variant="destructive">Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Wine: Story = {
  render: () => (
    <Dialog variant="wine">
      <DialogTrigger asChild>
        <Button variant="secondary">Open Wine Dialog</Button>
      </DialogTrigger>
      <DialogContent variant="wine">
        <DialogHeader>
          <DialogTitle>Wine Cellar</DialogTitle>
          <DialogDescription>
            Vintage collection aged in darkness. Each bottle holds a memory.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Leave</Button>
          <Button variant="secondary">Taste</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Ritual: Story = {
  render: () => (
    <Dialog variant="ritual" size="lg" overlayVariant="ritual">
      <DialogTrigger asChild>
        <Button variant="primary" size="lg">Begin Ritual</Button>
      </DialogTrigger>
      <DialogContent variant="ritual" size="lg">
        <DialogHeader>
          <DialogTitle>The Great Ritual</DialogTitle>
          <DialogDescription>
            Four phases. Four seals. One outcome. Choose your path wisely.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="p-4 bg-void-700/50 rounded-gothic-md border border-border-subtle">
            <Typography element="label" className="mb-1">Phase 1: Invocation</Typography>
            <Typography element="body-sm" color="secondary">Speak the true name</Typography>
          </div>
          <div className="p-4 bg-void-700/50 rounded-gothic-md border border-border-subtle">
            <Typography element="label" className="mb-1">Phase 2: Binding</Typography>
            <Typography element="body-sm" color="secondary">Seal with wax and blood</Typography>
          </div>
          <div className="p-4 bg-void-700/50 rounded-gothic-md border border-border-subtle">
            <Typography element="label" className="mb-1">Phase 3: Offering</Typography>
            <Typography element="body-sm" color="secondary">Give what is demanded</Typography>
          </div>
          <div className="p-4 bg-void-700/50 rounded-gothic-md border border-border-subtle">
            <Typography element="label" className="mb-1">Phase 4: Manifestation</Typography>
            <Typography element="body-sm" color="secondary">The entity arrives</Typography>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost">Abort</Button>
          <Button variant="primary">Begin</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Dialog size="sm">
        <DialogTrigger asChild>
          <Button variant="primary" size="sm">Small</Button>
        </DialogTrigger>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>Small Dialog</DialogTitle>
            <DialogDescription>Compact dialog for simple confirmations.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog size="md">
        <DialogTrigger asChild>
          <Button variant="primary" size="sm">Medium</Button>
        </DialogTrigger>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Medium Dialog</DialogTitle>
            <DialogDescription>Standard dialog for most use cases.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog size="lg">
        <DialogTrigger asChild>
          <Button variant="primary" size="sm">Large</Button>
        </DialogTrigger>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>Large Dialog</DialogTitle>
            <DialogDescription>Large dialog for complex forms and content.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog size="xl">
        <DialogTrigger asChild>
          <Button variant="primary" size="sm">Extra Large</Button>
        </DialogTrigger>
        <DialogContent size="xl">
          <DialogHeader>
            <DialogTitle>Extra Large Dialog</DialogTitle>
            <DialogDescription>Extra large dialog for detailed workflows.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};

export const WithoutClose: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">No Close Button</Button>
      </DialogTrigger>
      <DialogContent hideClose>
        <DialogHeader>
          <DialogTitle>No Escape</DialogTitle>
          <DialogDescription>
            This dialog has no close button. You must choose an action.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button variant="blood">Proceed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const FormDialog: Story = {
  render: () => (
    <Dialog size="lg">
      <DialogTrigger asChild>
        <Button variant="primary">Create Entity</Button>
      </DialogTrigger>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Summon New Entity</DialogTitle>
          <DialogDescription>
            Fill in the details to bind a new entity to your service.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 px-6">
          <div>
            <label className="block text-step--1 font-medium text-pallor-200 mb-1.5">Entity Name</label>
            <input
              type="text"
              placeholder="Enter true name"
              className="w-full h-11 px-4 rounded-gothic-md bg-void-800 border border-border-subtle text-step-0 text-pallor-100 placeholder:text-pallor-400 focus-blood"
            />
          </div>
          <div>
            <label className="block text-step--1 font-medium text-pallor-200 mb-1.5">Affinity</label>
            <select className="w-full h-11 px-4 rounded-gothic-md bg-void-800 border border-border-subtle text-step-0 text-pallor-100 focus-blood appearance-none pr-10">
              <option value="">Choose affinity</option>
              <option value="blood">Blood</option>
              <option value="shadow">Shadow</option>
              <option value="void">Void</option>
              <option value="fire">Fire</option>
            </select>
          </div>
          <div>
            <label className="block text-step--1 font-medium text-pallor-200 mb-1.5">Power Level</label>
            <input
              type="range"
              min="1"
              max="100"
              value="50"
              className="w-full h-2 bg-void-700 rounded-full appearance-none accent-blood-400"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost">Banish</Button>
          <Button variant="primary">Summon</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Need to import Typography for the stories
import { Typography } from "../components/ui/typography";
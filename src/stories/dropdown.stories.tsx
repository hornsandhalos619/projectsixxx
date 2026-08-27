"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "../components/ui/dropdown";
import { GothicIcons } from "../components/ui/icon";

const meta: Meta<typeof Dropdown> = {
  title: "UI/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Custom styled dropdown/select component with keyboard accessibility and gothic styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "blood", "wine", "error", "success"],
      description: "Dropdown variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Dropdown size",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    required: {
      control: "boolean",
      description: "Required field",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    placeholder: "Select an option",
    options: [
      { value: "blood", label: "Blood" },
      { value: "wine", label: "Wine" },
      { value: "velvet", label: "Velvet" },
      { value: "void", label: "Void" },
      { value: "obsidian", label: "Obsidian" },
    ],
  },
};

export const WithLabel: Story = {
  args: {
    label: "Blood Type",
    placeholder: "Choose your affinity",
    options: [
      { value: "blood", label: "Blood" },
      { value: "wine", label: "Wine" },
      { value: "velvet", label: "Velvet" },
      { value: "void", label: "Void" },
      { value: "obsidian", label: "Obsidian" },
    ],
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Coven",
    placeholder: "Select coven",
    options: [
      { value: "night", label: "Night Walkers" },
      { value: "blood", label: "Blood Council" },
      { value: "shadow", label: "Shadow Court" },
    ],
    error: "You must pledge to a coven",
  },
};

export const WithHint: Story = {
  args: {
    label: "Ritual Type",
    placeholder: "Choose ritual",
    options: [
      { value: "binding", label: "Binding" },
      { value: "summoning", label: "Summoning" },
      { value: "banishment", label: "Banishment" },
      { value: "divination", label: "Divination" },
    ],
    hint: "Select the type of ritual to perform",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Dropdown label="Default" placeholder="Default variant" options={[
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
      ]} />
      <Dropdown variant="blood" label="Blood" placeholder="Blood variant" options={[
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ]} />
      <Dropdown variant="wine" label="Wine" placeholder="Wine variant" options={[
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ]} />
      <Dropdown variant="error" label="Error" placeholder="Error variant" options={[
        { value: "1", label: "Option 1" },
      ]} error="Invalid selection" />
      <Dropdown variant="success" label="Success" placeholder="Success variant" options={[
        { value: "1", label: "Option 1" },
      ]} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Dropdown size="sm" label="Small" placeholder="Small size" options={[
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ]} />
      <Dropdown size="md" label="Medium" placeholder="Medium size" options={[
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ]} />
      <Dropdown size="lg" label="Large" placeholder="Large size" options={[
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ]} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    placeholder: "Cannot select",
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
    ],
    disabled: true,
  },
};

export const WithIcons: Story = {
  args: {
    label: "With Icons",
    placeholder: "Select with icons",
    options: [
      { value: "blood", label: "Blood", icon: <GothicIcons.BloodDrop className="h-4 w-4" /> },
      { value: "wine", label: "Wine", icon: <GothicIcons.Chalice className="h-4 w-4" /> },
      { value: "velvet", label: "Velvet", icon: <GothicIcons.VelvetRibbon className="h-4 w-4" /> },
      { value: "void", label: "Void", icon: <GothicIcons.Skull className="h-4 w-4" /> },
    ],
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: "Disabled Options",
    placeholder: "Some options disabled",
    options: [
      { value: "blood", label: "Blood" },
      { value: "wine", label: "Wine" },
      { value: "velvet", label: "Velvet (Unavailable)", disabled: true },
      { value: "void", label: "Void (Sealed)", disabled: true },
      { value: "obsidian", label: "Obsidian" },
    ],
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Dropdown
        label="Blood Affinity"
        placeholder="Choose your blood"
        options={[
          { value: "", label: "Select..." },
          { value: "pure", label: "Pure Blood" },
          { value: "mixed", label: "Mixed Blood" },
          { value: "cursed", label: "Cursed Blood" },
        ]}
        required
      />
      <Dropdown
        label="Ritual Circle"
        placeholder="Select circle"
        options={[
          { value: "1", label: "First Circle" },
          { value: "2", label: "Second Circle" },
          { value: "3", label: "Third Circle" },
          { value: "4", label: "Fourth Circle" },
          { value: "5", label: "Fifth Circle" },
        ]}
        hint="Higher circles require greater sacrifice"
      />
    </div>
  ),
};
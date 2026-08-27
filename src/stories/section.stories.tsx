import type { Meta, StoryObj } from "@storybook/react";
import { Section } from "../components/ui/section";
import { Container } from "../components/ui/container";
import { Typography } from "../components/ui/typography";
import { Divider } from "../components/ui/divider";

const meta: Meta<typeof Section> = {
  title: "UI/Section",
  component: Section,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A section component with gothic background variants including void, velvet, obsidian, gold-leaf, blood, wine, ritual, and sanctum.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["void", "velvet", "obsidian", "gold-leaf", "blood", "wine", "ritual", "sanctum"],
      description: "Background variant",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "full"],
      description: "Vertical padding size",
    },
    divider: {
      control: "select",
      options: ["none", "top", "bottom", "both", "blood-top", "blood-bottom", "wine-top", "wine-bottom", "ornate-top", "ornate-bottom"],
      description: "Divider style",
    },
    container: {
      control: "boolean",
      description: "Whether to include inner container",
    },
    containerSize: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "full", "screen", "screen-2xl"],
      description: "Container max width",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Void: Story = {
  args: {
    variant: "void",
    children: (
      <Container>
        <Typography element="headline" color="primary">Void Section</Typography>
        <Typography element="body" className="mt-2">The deepest abyss, where shadows dwell.</Typography>
      </Container>
    ),
  },
};

export const Velvet: Story = {
  args: {
    variant: "velvet",
    children: (
      <Container>
        <Typography element="headline" color="primary">Velvet Section</Typography>
        <Typography element="body" className="mt-2">Soft texture with subtle gradients.</Typography>
      </Container>
    ),
  },
};

export const Obsidian: Story = {
  args: {
    variant: "obsidian",
    children: (
      <Container>
        <Typography element="headline" color="primary">Obsidian Section</Typography>
        <Typography element="body" className="mt-2">Cracked obsidian texture for dark rituals.</Typography>
      </Container>
    ),
  },
};

export const GoldLeaf: Story = {
  args: {
    variant: "gold-leaf",
    children: (
      <Container>
        <Typography element="headline" color="primary">Gold Leaf Section</Typography>
        <Typography element="body" className="mt-2">Flecks of gold drifting through darkness.</Typography>
      </Container>
    ),
  },
};

export const Blood: Story = {
  args: {
    variant: "blood",
    children: (
      <Container>
        <Typography element="headline" color="primary">Blood Section</Typography>
        <Typography element="body" className="mt-2">Arterial gradients bleeding through void.</Typography>
      </Container>
    ),
  },
};

export const Wine: Story = {
  args: {
    variant: "wine",
    children: (
      <Container>
        <Typography element="headline" color="primary">Wine Section</Typography>
        <Typography element="body" className="mt-2">Aged amber tones in the darkness.</Typography>
      </Container>
    ),
  },
};

export const Ritual: Story = {
  args: {
    variant: "ritual",
    children: (
      <Container>
        <Typography element="headline" color="primary">Ritual Section</Typography>
        <Typography element="body" className="mt-2">Sacred space for dark ceremonies.</Typography>
      </Container>
    ),
  },
};

export const Sanctum: Story = {
  args: {
    variant: "sanctum",
    children: (
      <Container>
        <Typography element="headline" color="primary">Sanctum Section</Typography>
        <Typography element="body" className="mt-2">The inner sanctum, layered darkness.</Typography>
      </Container>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-0">
      {["void", "velvet", "obsidian", "gold-leaf", "blood", "wine", "ritual", "sanctum"].map((variant) => (
        <Section key={variant} variant={variant as any} size="sm" divider="bottom" containerSize="lg">
          <Container>
            <div className="flex items-center justify-between">
              <Typography element="subhead" color="primary" className="capitalize">{variant}</Typography>
              <Typography element="caption">Background variant</Typography>
            </div>
          </Container>
        </Section>
      ))}
    </div>
  ),
};

export const WithOrnateDividers: Story = {
  render: () => (
    <div className="space-y-0">
      <Section variant="void" size="md" divider="ornate-bottom" containerSize="lg">
        <Container>
          <Typography element="headline">Ornate Top Divider</Typography>
          <Typography element="body" className="mt-2">Blood gradient ornament at bottom.</Typography>
        </Container>
      </Section>
      <Section variant="velvet" size="md" divider="ornate-top" containerSize="lg">
        <Container>
          <Typography element="headline">Ornate Bottom Divider</Typography>
          <Typography element="body" className="mt-2">Blood gradient ornament at top.</Typography>
        </Container>
      </Section>
    </div>
  ),
};

export const FullScreen: Story = {
  args: {
    variant: "ritual",
    size: "full",
    children: (
      <Container>
        <div className="text-center">
          <Typography element="display" color="gradient-blood">Full Screen Ritual</Typography>
          <Typography element="subhead" className="mt-4">Min-height viewport section</Typography>
        </div>
      </Container>
    ),
  },
};

export const WithoutContainer: Story = {
  args: {
    variant: "blood",
    container: false,
    children: (
      <div className="px-6 py-12">
        <Typography element="headline" color="primary">No Inner Container</Typography>
        <Typography element="body" className="mt-2">Full width content with manual padding.</Typography>
      </div>
    ),
  },
};
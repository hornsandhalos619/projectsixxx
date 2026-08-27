import type { Meta, StoryObj } from "@storybook/react";
import {
  Typography,
  Display,
  DisplayAlt,
  Headline,
  Subhead,
  Body,
  BodyLg,
  BodySm,
  Caption,
  Label,
  Overline,
  Quote,
  Code,
  CodeBlock,
  Link,
  Muted,
} from "../components/ui/typography";

const meta: Meta<typeof Typography> = {
  title: "UI/Typography",
  component: Typography,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Typography system with fluid clamp scales for all text elements. Includes Display, DisplayAlt, Headline, Body, Caption, Label, and more.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    element: {
      control: "select",
      options: [
        "display",
        "display-alt",
        "headline",
        "subhead",
        "body-lg",
        "body",
        "body-sm",
        "caption",
        "label",
        "overline",
        "quote",
        "code",
        "code-block",
        "link",
        "muted",
      ],
      description: "Typography element type",
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight",
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
      description: "Text alignment",
    },
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "muted",
        "accent",
        "accent-hover",
        "wine",
        "wine-hover",
        "gradient",
        "gradient-blood",
        "gradient-wine",
      ],
      description: "Text color variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const DisplayStory: Story = {
  render: () => (
    <Display className="max-w-3xl">
      Projectsixxx
    </Display>
  ),
};

export const DisplayAltStory: Story = {
  render: () => (
    <DisplayAlt className="max-w-3xl">
      Gothic Luxury Digital Empire
    </DisplayAlt>
  ),
};

export const HeadlineStory: Story = {
  render: () => (
    <Headline className="max-w-3xl">
      Where Luxury Bleeds Into The Profane
    </Headline>
  ),
};

export const SubheadStory: Story = {
  render: () => (
    <Subhead className="max-w-3xl">
      Dracula's penthouse after midnight
    </Subhead>
  ),
};

export const BodyStory: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Body>
        The Nocturne design system emerges from the shadows, bringing gothic elegance
        to every component. Each element is crafted with ritualistic precision,
        using fluid type scales that breathe with the viewport.
      </Body>
      <Body color="secondary">
        Secondary text for supporting content that doesn't demand attention
        but still maintains readability in the darkness.
      </Body>
      <Body color="muted">
        Muted text for tertiary information, timestamps, and metadata.
      </Body>
    </div>
  ),
};

export const BodyLgStory: Story = {
  render: () => (
    <BodyLg className="max-w-2xl">
      Larger body text for important content that needs more presence.
      Perfect for lead paragraphs and introductory text.
    </BodyLg>
  ),
};

export const BodySmStory: Story = {
  render: () => (
    <BodySm className="max-w-2xl">
      Smaller body text for captions, footnotes, and dense information.
      Maintains readability at reduced sizes.
    </BodySm>
  ),
};

export const CaptionStory: Story = {
  render: () => (
    <Caption>UI LABEL / CATEGORY</Caption>
  ),
};

export const LabelStory: Story = {
  render: () => (
    <Label>Form Label</Label>
  ),
};

export const OverlineStory: Story = {
  render: () => (
    <Overline>BLOOD RITUAL</Overline>
  ),
};

export const QuoteStory: Story = {
  render: () => (
    <Quote className="max-w-xl">
      "In the darkness, we find our true power. The shadows are not our enemy —
      they are our canvas."
    </Quote>
  ),
};

export const CodeStory: Story = {
  render: () => (
    <Code>const darkness = "eternal";</Code>
  ),
};

export const CodeBlockStory: Story = {
  render: () => (
    <CodeBlock>{`// Ritual invocation
function summonShadows() {
  const circle = drawPentagram();
  circle.activate();
  return circle.bindEntity();
}`}</CodeBlock>
  ),
};

export const LinkStory: Story = {
  render: () => (
    <Link href="#summon">Summon the Darkness</Link>
  ),
};

export const MutedStory: Story = {
  render: () => (
    <Muted>Last updated: Midnight</Muted>
  ),
};

export const AllElements: Story = {
  render: () => (
    <div className="space-y-8 max-w-3xl">
      <div>
        <Typography element="overline" color="accent">DISPLAY</Typography>
        <Display className="mt-2">Projectsixxx</Display>
      </div>
      <div>
        <Typography element="overline" color="accent">DISPLAY ALT</Typography>
        <DisplayAlt className="mt-2">Gothic Luxury Digital Empire</DisplayAlt>
      </div>
      <div>
        <Typography element="overline" color="accent">HEADLINE</Typography>
        <Headline className="mt-2">Where Luxury Bleeds Into The Profane</Headline>
      </div>
      <div>
        <Typography element="overline" color="accent">SUBHEAD</Typography>
        <Subhead className="mt-2">Dracula's penthouse after midnight</Subhead>
      </div>
      <div>
        <Typography element="overline" color="accent">BODY LG</Typography>
        <BodyLg className="mt-2">
          Larger body text for important content that needs more presence.
        </BodyLg>
      </div>
      <div>
        <Typography element="overline" color="accent">BODY</Typography>
        <Body className="mt-2">
          Standard body text with fluid clamp scaling. The Nocturne design system
          uses CSS clamp() for responsive typography that adapts smoothly.
        </Body>
      </div>
      <div>
        <Typography element="overline" color="accent">BODY SM</Typography>
        <BodySm className="mt-2">
          Smaller body text for captions, footnotes, and dense information.
        </BodySm>
      </div>
      <div>
        <Typography element="overline" color="accent">CAPTION / LABEL / OVERLINE</Typography>
        <div className="flex flex-wrap gap-4 mt-2">
          <Caption>UI CAPTION</Caption>
          <Label>Form Label</Label>
          <Overline>BLOOD RITUAL</Overline>
        </div>
      </div>
      <div>
        <Typography element="overline" color="accent">QUOTE</Typography>
        <Quote className="mt-2">
          "The shadows are not our enemy — they are our canvas."
        </Quote>
      </div>
      <div>
        <Typography element="overline" color="accent">CODE / CODE BLOCK</Typography>
        <div className="mt-2 space-y-2">
          <Code>const ritual = "complete";</Code>
          <CodeBlock>{`function bindEntity(entity) {
  return entity.sealWithWax();
}`}</CodeBlock>
        </div>
      </div>
      <div>
        <Typography element="overline" color="accent">LINK</Typography>
        <Link className="mt-2 inline-block" href="#void">Enter the Void</Link>
      </div>
      <div>
        <Typography element="overline" color="accent">MUTED</Typography>
        <Muted className="mt-2">Muted text for metadata</Muted>
      </div>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Body color="primary">Primary: Pure pallor highlight</Body>
      <Body color="secondary">Secondary: Pallor 300</Body>
      <Body color="muted">Muted: Pallor 400</Body>
      <Body color="accent">Accent: Blood 400</Body>
      <Body color="accent-hover">Accent Hover: Blood 300</Body>
      <Body color="wine">Wine: Wine 300</Body>
      <Body color="wine-hover">Wine Hover: Wine 200</Body>
      <Body color="gradient">Gradient: Velvet gradient</Body>
      <Body color="gradient-blood">Gradient Blood</Body>
      <Body color="gradient-wine">Gradient Wine</Body>
    </div>
  ),
};

export const AlignmentVariants: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Body align="left">Left aligned text — the default for body content.</Body>
      <Body align="center">Center aligned text — for headlines and short content.</Body>
      <Body align="right">Right aligned text — for metadata and asides.</Body>
      <Body align="justify">
        Justified text creates clean edges on both sides, useful for longer
        passages where you want a formal, book-like appearance.
      </Body>
    </div>
  ),
};

export const WeightVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Body weight="normal">Normal weight (400)</Body>
      <Body weight="medium">Medium weight (500)</Body>
      <Body weight="semibold">Semibold weight (600)</Body>
      <Body weight="bold">Bold weight (700)</Body>
    </div>
  ),
};
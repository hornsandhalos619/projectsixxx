import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardMedia,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { GothicIcons } from "../components/ui/icon";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A flexible card component with multiple variants including base, elevated, interactive, media, and gradient border styles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["base", "elevated", "interactive", "media", "gradient-border", "gradient-border-wine", "gradient-border-velvet"],
      description: "Visual style variant",
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Internal padding",
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Border radius style",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Base: Story = {
  args: {
    variant: "base",
    children: (
      <>
        <CardHeader>
          <CardTitle>Base Card</CardTitle>
          <CardDescription>A simple card with default styling</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-pallor-300">This is the base card variant with subtle borders and void background.</p>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm">Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>Elevated with shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-pallor-300">This card has elevation shadow and hover effects.</p>
        </CardContent>
        <CardFooter>
          <Button variant="primary" size="sm">Enter</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Interactive: Story = {
  args: {
    variant: "interactive",
    children: (
      <>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Hover for blood glow</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-pallor-300">Hover this card to see the blood glow effect.</p>
        </CardContent>
        <CardFooter>
          <Button variant="blood" size="sm">Summon</Button>
        </CardFooter>
      </>
    ),
  },
};

export const GradientBorder: Story = {
  args: {
    variant: "gradient-border",
    children: (
      <>
        <CardHeader>
          <CardTitle>Blood Gradient Border</CardTitle>
          <CardDescription>Gradient border variant</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-pallor-300">This card features a blood gradient border.</p>
        </CardContent>
        <CardFooter>
          <Button variant="blood" size="sm">Ritual</Button>
        </CardFooter>
      </>
    ),
  },
};

export const GradientBorderWine: Story = {
  args: {
    variant: "gradient-border-wine",
    children: (
      <>
        <CardHeader>
          <CardTitle>Wine Gradient Border</CardTitle>
          <CardDescription>Wine gradient border variant</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-pallor-300">This card features a wine gradient border.</p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" size="sm">Sip</Button>
        </CardFooter>
      </>
    ),
  },
};

export const GradientBorderVelvet: Story = {
  args: {
    variant: "gradient-border-velvet",
    children: (
      <>
        <CardHeader>
          <CardTitle>Velvet Gradient Border</CardTitle>
          <CardDescription>Velvet gradient border variant</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-pallor-300">This card features a velvet gradient border.</p>
        </CardContent>
        <CardFooter>
          <Button variant="velvet" size="sm">Touch</Button>
        </CardFooter>
      </>
    ),
  },
};

export const MediaCard: Story = {
  args: {
    variant: "media",
    padding: "none",
    children: (
      <>
        <CardMedia aspectRatio="16/9">
          <div className="bg-gradient-to-br from-blood-600/30 via-void-800 to-wine-500/30" />
        </CardMedia>
        <div className="p-6">
          <CardHeader>
            <CardTitle>Media Card</CardTitle>
            <CardDescription>With image/media content</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-pallor-300">This card includes a media section at the top.</p>
          </CardContent>
          <CardFooter>
            <Button variant="primary" size="sm">View</Button>
          </CardFooter>
        </div>
      </>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
      <Card variant="base">
        <CardHeader>
          <CardTitle>Base</CardTitle>
          <CardDescription>Default styling</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-pallor-300">Simple void background with subtle border.</p>
        </CardContent>
      </Card>
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>With shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-pallor-300">Elevated surface with hover shadow.</p>
        </CardContent>
      </Card>
      <Card variant="interactive">
        <CardHeader>
          <CardTitle>Interactive</CardTitle>
          <CardDescription>Hover effects</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-pallor-300">Blood glow on hover.</p>
        </CardContent>
      </Card>
      <Card variant="gradient-border">
        <CardHeader>
          <CardTitle>Blood Border</CardTitle>
          <CardDescription>Gradient border</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-pallor-300">Blood gradient border.</p>
        </CardContent>
      </Card>
      <Card variant="gradient-border-wine">
        <CardHeader>
          <CardTitle>Wine Border</CardTitle>
          <CardDescription>Wine gradient</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-pallor-300">Wine gradient border.</p>
        </CardContent>
      </Card>
      <Card variant="gradient-border-velvet">
        <CardHeader>
          <CardTitle>Velvet Border</CardTitle>
          <CardDescription>Velvet gradient</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-pallor-300">Velvet gradient border.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Card variant="velvet" padding="lg" className="max-w-md">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <GothicIcons.Chalice className="h-12 w-12 text-wine-300" />
        </div>
        <div className="flex-1">
          <CardTitle className="mb-2">The Chalice</CardTitle>
          <p className="text-pallor-300 mb-4">An ancient vessel of power, waiting for the worthy.</p>
          <div className="flex gap-2">
            <Button variant="wine" size="sm">Claim</Button>
            <Button variant="ghost" size="sm">Inspect</Button>
          </div>
        </div>
      </div>
    </Card>
  ),
};
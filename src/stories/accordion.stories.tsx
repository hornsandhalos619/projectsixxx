"use client";

import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";
import { GothicIcons } from "../components/ui/icon";
import { Typography } from "../components/ui/typography";

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Accordion component with ritual open/close animation and chevron rotation. Built on Radix UI.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "blood", "wine", "velvet", "ritual"],
      description: "Accordion variant",
    },
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "Accordion type",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="multiple" className="w-96">
      <AccordionItem value="rituals">
        <AccordionHeader>
          <AccordionTrigger iconLeft={<GothicIcons.Sigil className="h-4 w-4" />}>
            Dark Rituals
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Typography element="body">
            Rituals are the foundation of all dark arts. Each ritual requires specific components,
            precise timing, and unwavering intent. The most powerful rituals demand sacrifice.
          </Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="entities">
        <AccordionHeader>
          <AccordionTrigger iconLeft={<GothicIcons.Skull className="h-4 w-4" />}>
            Summoned Entities
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Typography element="body">
            Entities are beings summoned from other planes of existence. They range from minor
            imps and shadows to ancient primordials and archdemons. Each has its own price.
          </Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="grimoires">
        <AccordionHeader>
          <AccordionTrigger iconLeft={<GothicIcons.Grimoire className="h-4 w-4" />}>
            Forbidden Grimoires
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Typography element="body">
            Grimoires contain the accumulated knowledge of centuries of dark practice. They are
            not mere books — they are vessels of power. Handle with extreme caution.
          </Typography>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const SingleType: Story = {
  render: () => (
    <Accordion type="single" variant="blood" className="w-96">
      <AccordionItem value="first">
        <AccordionHeader>
          <AccordionTrigger>First Seal</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Typography element="body">The first seal binds the physical form to the ritual circle.</Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="second">
        <AccordionHeader>
          <AccordionTrigger>Second Seal</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Typography element="body">The second seal binds the mind, silencing doubt and fear.</Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="third">
        <AccordionHeader>
          <AccordionTrigger>Third Seal</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Typography element="body">The third seal binds the spirit, merging it with the entity.</Typography>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const BloodVariant: Story = {
  render: () => (
    <Accordion variant="blood" type="multiple" className="w-96">
      <AccordionItem value="blood-rituals">
        <AccordionHeader>
          <AccordionTrigger>Blood Rituals</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent variant="blood">
          <Typography element="body">Blood rituals are the most potent form of dark magic. They require life essence as fuel.</Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="blood-oaths">
        <AccordionHeader>
          <AccordionTrigger>Blood Oaths</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent variant="blood">
          <Typography element="body">An oath sworn in blood cannot be broken. The consequences of betrayal are absolute.</Typography>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WineVariant: Story = {
  render: () => (
    <Accordion variant="wine" type="multiple" className="w-96">
      <AccordionItem value="wine-cellar">
        <AccordionHeader>
          <AccordionTrigger iconLeft={<GothicIcons.Chalice className="h-4 w-4" />}>Wine Cellar</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent variant="wine">
          <Typography element="body">Vintage collection aged in oak coffins for centuries. Each bottle holds a memory.</Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="blood-wine">
        <AccordionHeader>
          <AccordionTrigger>Blood Wine</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent variant="wine">
          <Typography element="body">The vintage of the ancients. Distilled from the essence of fallen deities.</Typography>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const VelvetVariant: Story = {
  render: () => (
    <Accordion variant="velvet" type="multiple" className="w-96">
      <AccordionItem value="velvet-touch">
        <AccordionHeader>
          <AccordionTrigger iconLeft={<GothicIcons.VelvetRibbon className="h-4 w-4" />}>Velvet Touch</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent variant="velvet">
          <Typography element="body">The velvet touch — soft, sensual, deadly. It whispers before it strikes.</Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="whispers">
        <AccordionHeader>
          <AccordionTrigger>Whispers in Dark</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent variant="velvet">
          <Typography element="body">Whispers carry secrets through the darkness. Listen closely.</Typography>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const RitualVariant: Story = {
  render: () => (
    <Accordion variant="ritual" type="single" className="w-96">
      <AccordionItem value="phase-1">
        <AccordionHeader>
          <AccordionTrigger iconLeft={<GothicIcons.BloodDrop className="h-4 w-4" />}>Phase 1: Invocation</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent variant="ritual">
          <Typography element="body">Speak the true name at midnight. The circle must be drawn in blood.</Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="phase-2">
        <AccordionHeader>
          <AccordionTrigger iconLeft={<GothicIcons.WaxSeal className="h-4 w-4" />}>Phase 2: Binding</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent variant="ritual">
          <Typography element="body">Seal the entity with wax and sigils. The wax must be from a black candle.</Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="phase-3">
        <AccordionHeader>
          <AccordionTrigger iconLeft={<GothicIcons.Dagger className="h-4 w-4" />}>Phase 3: Offering</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent variant="ritual">
          <Typography element="body">Give what is demanded. The price is always personal. Always painful.</Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="phase-4">
        <AccordionHeader>
          <AccordionTrigger iconLeft={<GothicIcons.Ouroboros className="h-4 w-4" />}>Phase 4: Manifestation</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent variant="ritual">
          <Typography element="body">The entity arrives. The ritual is complete. The covenant is sealed.</Typography>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDefaultOpen: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={["rituals"]} className="w-96">
      <AccordionItem value="rituals">
        <AccordionHeader>
          <AccordionTrigger iconLeft={<GothicIcons.Sigil className="h-4 w-4" />}>Dark Rituals (Open)</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Typography element="body">This accordion item is open by default.</Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="entities">
        <AccordionHeader>
          <AccordionTrigger iconLeft={<GothicIcons.Skull className="h-4 w-4" />}>Summoned Entities</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Typography element="body">This item is closed by default.</Typography>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Accordion type="multiple" variant="velvet" className="w-96">
      <AccordionItem value="faq-1">
        <AccordionHeader>
          <AccordionTrigger>What is the price of power?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Typography element="body">Everything. Your humanity, your memories, your soul. Power demands total surrender.</Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-2">
        <AccordionHeader>
          <AccordionTrigger>Can a ritual be reversed?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Typography element="body">Some rituals can be undone, but the cost of reversal exceeds the original price.</Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-3">
        <AccordionHeader>
          <AccordionTrigger>How do I choose an entity?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Typography element="body">The entity chooses you. You merely open the door and hope it enters.</Typography>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
"use client";

import type { Meta, StoryObj } from "@storybook/react";
import {
  Toast,
  ToastViewport,
  ToastProvider,
  useToast,
  toast,
} from "../components/ui/toast";
import { Button } from "../components/ui/button";
import { GothicIcons } from "../components/ui/icon";
import { Typography } from "../components/ui/typography";

const meta: Meta<typeof Toast> = {
  title: "UI/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Toast/Notification component with obsidian glass, blood accent, and slide-from-crypt animations. Built on Radix UI.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "blood", "wine", "velvet", "obsidian", "success", "error", "warning", "ritual"],
      description: "Toast variant",
    },
    duration: {
      control: "number",
      description: "Duration in ms (0 = persistent)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-4 w-96">
        <Button
          variant="primary"
          onClick={() => {
            const { toast } = useToast();
            toast({ title: "Ritual Complete", description: "The binding has been sealed.", variant: "default" });
          }}
        >
          Show Default Toast
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const BloodToast: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-4 w-96">
        <Button
          variant="blood"
          onClick={() => {
            const { toast } = useToast();
            toast.blood({ title: "Blood Covenant", description: "The pact is sealed in arterial essence." });
          }}
        >
          Show Blood Toast
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const WineToast: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-4 w-96">
        <Button
          variant="secondary"
          onClick={() => {
            const { toast } = useToast();
            toast.wine({ title: "Vintage Ready", description: "The blood wine has aged to perfection." });
          }}
        >
          Show Wine Toast
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const VelvetToast: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-4 w-96">
        <Button
          variant="velvet"
          onClick={() => {
            const { toast } = useToast();
            toast.velvet({ title: "Velvet Whisper", description: "A secret stirs in the darkness." });
          }}
        >
          Show Velvet Toast
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const ObsidianToast: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-4 w-96">
        <Button
          variant="velvet"
          onClick={() => {
            const { toast } = useToast();
            toast.obsidian({ title: "Obsidian Vision", description: "The cracked glass reveals truth." });
          }}
        >
          Show Obsidian Toast
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const SuccessToast: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-4 w-96">
        <Button
          variant="secondary"
          onClick={() => {
            const { toast } = useToast();
            toast.success({ title: "Summoning Successful", description: "The entity has answered your call." });
          }}
        >
          Show Success Toast
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const ErrorToast: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-4 w-96">
        <Button
          variant="destructive"
          onClick={() => {
            const { toast } = useToast();
            toast.error({ title: "Ritual Failed", description: "The spirits are restless. Try again." });
          }}
        >
          Show Error Toast
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const WarningToast: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-4 w-96">
        <Button
          variant="secondary"
          onClick={() => {
            const { toast } = useToast();
            toast.warning({ title: "Dark Omens", description: "The veil grows thin. Proceed with caution." });
          }}
        >
          Show Warning Toast
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const RitualToast: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-4 w-96">
        <Button
          variant="primary"
          onClick={() => {
            const { toast } = useToast();
            toast.ritual({ title: "Great Ritual Begins", description: "Four phases. Four seals. One outcome." });
          }}
        >
          Show Ritual Toast
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-3 w-96">
        {[
          { variant: "default", label: "Default" },
          { variant: "blood", label: "Blood" },
          { variant: "wine", label: "Wine" },
          { variant: "velvet", label: "Velvet" },
          { variant: "obsidian", label: "Obsidian" },
          { variant: "success", label: "Success" },
          { variant: "error", label: "Error" },
          { variant: "warning", label: "Warning" },
          { variant: "ritual", label: "Ritual" },
        ].map(({ variant, label }) => (
          <Button
            key={label}
            variant={variant === "blood" ? "blood" : variant === "wine" ? "wine" : variant === "velvet" ? "velvet" : "ghost"}
            onClick={() => {
              const { toast } = useToast();
              toast[variant as keyof typeof toast]({ title: `${label} Toast`, description: `This is a ${label.toLowerCase()} variant toast.` });
            }}
          >
            {label}
          </Button>
        ))}
      </div>
    </ToastProvider>
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-4 w-96">
        <Button
          variant="velvet"
          onClick={() => {
            const { toast } = useToast();
            toast.ritual({
              title: "Entity Summoned",
              description: "A primordial entity has crossed the veil.",
              action: (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Banish</Button>
                  <Button variant="blood" size="sm">Bind</Button>
                </div>
              ),
            });
          }}
        >
          Show Toast with Action
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const PersistentToast: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-4 w-96">
        <Button
          variant="blood"
          onClick={() => {
            const { toast } = useToast();
            toast.blood({
              title: "Eternal Covenant",
              description: "This toast will not dismiss automatically. You must choose.",
              duration: 0,
              action: (
                <Button variant="blood" size="sm" onClick={() => { /* dismiss handled by close button */ }}>
                  Acknowledge
                </Button>
              ),
            });
          }}
        >
          Show Persistent Toast
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const MultipleToasts: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-4 w-96">
        <Button
          variant="primary"
          onClick={() => {
            const { toast } = useToast();
            toast.default({ title: "First", description: "First toast" });
            setTimeout(() => toast.blood({ title: "Second", description: "Blood toast" }), 200);
            setTimeout(() => toast.wine({ title: "Third", description: "Wine toast" }), 400);
            setTimeout(() => toast.success({ title: "Fourth", description: "Success toast" }), 600);
          }}
        >
          Show Multiple Toasts
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const DifferentPositions: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Typography element="label" className="mb-2">Top Right (default)</Typography>
        <ToastProvider position="top-right">
          <Button variant="ghost" size="sm" onClick={() => {
            const { toast } = useToast();
            toast.default({ title: "Top Right", description: "Default position" });
          }}>
            Top Right
          </Button>
        </ToastProvider>
      </div>
      <div>
        <Typography element="label" className="mb-2">Top Left</Typography>
        <ToastProvider position="top-left">
          <Button variant="ghost" size="sm" onClick={() => {
            const { toast } = useToast();
            toast.default({ title: "Top Left", description: "Top left position" });
          }}>
            Top Left
          </Button>
        </ToastProvider>
      </div>
      <div>
        <Typography element="label" className="mb-2">Bottom Right</Typography>
        <ToastProvider position="bottom-right">
          <Button variant="ghost" size="sm" onClick={() => {
            const { toast } = useToast();
            toast.default({ title: "Bottom Right", description: "Bottom right position" });
          }}>
            Bottom Right
          </Button>
        </ToastProvider>
      </div>
      <div>
        <Typography element="label" className="mb-2">Bottom Left</Typography>
        <ToastProvider position="bottom-left">
          <Button variant="ghost" size="sm" onClick={() => {
            const { toast } = useToast();
            toast.default({ title: "Bottom Left", description: "Bottom left position" });
          }}>
            Bottom Left
          </Button>
        </ToastProvider>
      </div>
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-4 w-96">
        <Button
          variant="ritual"
          onClick={() => {
            const { toast } = useToast();
            toast.ritual({
              title: "Ritual Progress",
              description: (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-pallor-300">Invocation</span>
                    <span className="text-blood-400">Complete</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-pallor-300">Binding</span>
                    <span className="text-wine-300">In Progress</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-pallor-300">Offering</span>
                    <span className="text-pallor-400">Pending</span>
                  </div>
                </div>
              ),
            });
          }}
        >
          Show Rich Content Toast
        </Button>
      </div>
    </ToastProvider>
  ),
};
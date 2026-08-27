import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "../components/ui/container";

const meta: Meta<typeof Container> = {
  title: "UI/Container",
  component: Container,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A responsive container component with fluid padding and multiple size options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "full", "screen", "screen-2xl"],
      description: "Maximum width of container",
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "fluid"],
      description: "Horizontal padding style",
    },
    center: {
      control: "boolean",
      description: "Center the container",
    },
    as: {
      control: "text",
      description: "HTML element to render as",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-void-800 p-6 rounded-gothic-lg border border-border-subtle">
        <h3 className="font-display-alt text-step-2 text-pallor-100">Container Content</h3>
        <p className="text-pallor-300 mt-2">This is the default container with fluid padding.</p>
      </div>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      {["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"].map((size) => (
        <Container key={size} size={size as any} padding="none">
          <div className="bg-void-800 p-4 rounded-gothic-md border border-border-subtle">
            <span className="font-ui text-step-0 text-pallor-200">Size: {size}</span>
          </div>
        </Container>
      ))}
    </div>
  ),
};

export const FluidPadding: Story = {
  args: {
    padding: "fluid",
    children: (
      <div className="bg-void-800 p-6 rounded-gothic-lg border border-border-subtle">
        <h3 className="font-display-alt text-step-2 text-pallor-100">Fluid Padding</h3>
        <p className="text-pallor-300 mt-2">Padding scales fluidly with viewport width.</p>
      </div>
    ),
  },
};

export const AsSection: Story = {
  args: {
    as: "section",
    className: "py-12",
    children: (
      <div className="bg-void-800 p-6 rounded-gothic-lg border border-border-subtle">
        <h3 className="font-display-alt text-step-2 text-pallor-100">Rendered as Section</h3>
        <p className="text-pallor-300 mt-2">Container can render as any HTML element.</p>
      </div>
    ),
  },
};

export const Nested: Story = {
  render: () => (
    <Container size="4xl">
      <div className="bg-void-800 p-6 rounded-gothic-lg border border-border-subtle">
        <h3 className="font-display-alt text-step-2 text-pallor-100 mb-4">Nested Containers</h3>
        <Container size="xl" padding="none">
          <div className="bg-void-700 p-4 rounded-gothic-md border border-blood-400/30">
            <span className="font-ui text-step-0 text-pallor-200">Inner Container (xl)</span>
          </div>
        </Container>
      </div>
    </Container>
  ),
};
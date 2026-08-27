import type { Meta, StoryObj } from "@storybook/react";
import { Input, Textarea, Select, FormField } from "../components/ui/input";
import { GothicIcons } from "../components/ui/icon";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Form input components with floating labels, validation states, and blood-focus rings. Includes Input, Textarea, Select, and FormField wrapper.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "blood", "wine", "error", "success", "ghost"],
      description: "Input variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Input size",
    },
    floatingLabel: {
      control: "boolean",
      description: "Enable floating label animation",
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
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter your name",
    label: "Name",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "you@domain.com",
    type: "email",
    required: true,
  },
};

export const FloatingLabel: Story = {
  args: {
    label: "Username",
    placeholder: " ",
    floatingLabel: true,
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "you@domain.com",
    value: "invalid-email",
    error: "Please enter a valid email address",
    required: true,
  },
};

export const WithHint: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    hint: "Must be at least 8 characters",
    required: true,
  },
};

export const WithIconLeft: Story = {
  args: {
    label: "Search",
    placeholder: "Search the void...",
    iconLeft: <GothicIcons.Sigil className="h-4 w-4" />,
  },
};

export const WithIconRight: Story = {
  args: {
    label: "Amount",
    placeholder: "0.00",
    iconRight: <GothicIcons.BloodDrop className="h-4 w-4" />,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Default" placeholder="Default variant" />
      <Input variant="blood" label="Blood" placeholder="Blood variant" />
      <Input variant="wine" label="Wine" placeholder="Wine variant" />
      <Input variant="ghost" label="Ghost" placeholder="Ghost variant" />
      <Input variant="error" label="Error" value="Error state" error="Something went wrong" />
      <Input variant="success" label="Success" value="Valid input" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input size="sm" label="Small" placeholder="Small size" />
      <Input size="md" label="Medium" placeholder="Medium size" />
      <Input size="lg" label="Large" placeholder="Large size" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    placeholder: "Cannot edit",
    disabled: true,
    value: "Disabled value",
  },
};

export const TextareaStory: Story = {
  render: () => (
    <div className="w-80">
      <Textarea
        label="Message"
        placeholder="Write your confession..."
        rows={4}
        hint="Maximum 500 characters"
      />
    </div>
  ),
};

export const TextareaWithError: Story = {
  render: () => (
    <div className="w-80">
      <Textarea
        label="Bio"
        placeholder="Tell us about yourself..."
        value="Short"
        error="Bio must be at least 50 characters"
        rows={3}
      />
    </div>
  ),
};

export const SelectStory: Story = {
  render: () => (
    <div className="w-80">
      <Select
        label="Blood Type"
        placeholder="Select your affinity"
        options={[
          { value: "", label: "Choose..." },
          { value: "blood", label: "Blood" },
          { value: "wine", label: "Wine" },
          { value: "velvet", label: "Velvet" },
          { value: "void", label: "Void" },
          { value: "obsidian", label: "Obsidian" },
        ]}
      />
    </div>
  ),
};

export const SelectWithError: Story = {
  render: () => (
    <div className="w-80">
      <Select
        label="Coven"
        placeholder="Select coven"
        options={[
          { value: "", label: "Choose..." },
          { value: "night", label: "Night Walkers" },
          { value: "blood", label: "Blood Council" },
          { value: "shadow", label: "Shadow Court" },
        ]}
        error="You must pledge to a coven"
      />
    </div>
  ),
};

export const FormFieldWrapper: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <FormField label="Username" required hint="Unique identifier">
        <Input placeholder="username" />
      </FormField>
      <FormField label="Email" required error="Invalid email format">
        <Input type="email" placeholder="you@domain.com" value="invalid" />
      </FormField>
      <FormField label="Bio" hint="Optional">
        <Textarea placeholder="Your story..." rows={3} />
      </FormField>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="flex gap-2">
        <Input variant="default" placeholder="Default" style={{ width: "100px" }} />
        <Input variant="blood" placeholder="Blood" style={{ width: "100px" }} />
        <Input variant="wine" placeholder="Wine" style={{ width: "100px" }} />
      </div>
      <div className="flex gap-2">
        <Input variant="error" placeholder="Error" style={{ width: "100px" }} />
        <Input variant="success" placeholder="Success" style={{ width: "100px" }} />
        <Input variant="ghost" placeholder="Ghost" style={{ width: "100px" }} />
      </div>
      <div className="flex gap-2">
        <Input size="sm" placeholder="Small" style={{ width: "100px" }} />
        <Input size="md" placeholder="Medium" style={{ width: "100px" }} />
        <Input size="lg" placeholder="Large" style={{ width: "100px" }} />
      </div>
      <Input disabled placeholder="Disabled" />
      <Input placeholder="With icon" iconLeft={<GothicIcons.Sigil className="h-4 w-4" />} />
      <Input placeholder="With icon" iconRight={<GothicIcons.BloodDrop className="h-4 w-4" />} />
    </div>
  ),
};
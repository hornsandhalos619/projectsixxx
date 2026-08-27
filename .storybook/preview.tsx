import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    backgrounds: {
      default: 'void',
      values: [
        { name: 'void', value: '#0a0a0f' },
        { name: 'void-800', value: '#11111a' },
        { name: 'void-700', value: '#1a1a28' },
        { name: 'velvet', value: 'linear-gradient(135deg, #1a1a28 0%, #11111a 50%, #0a0a0f 100%)' },
        { name: 'obsidian', value: '#030305' },
      ],
    },
    layout: 'centered',
    docs: {
      theme: 'dark',
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark min-h-screen bg-void-900 text-pallor-100 p-4">
        <Story />
      </div>
    ),
  ],
};

export default preview;
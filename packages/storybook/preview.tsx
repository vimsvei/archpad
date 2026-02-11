import type { Preview } from '@storybook/react';
import { TooltipProvider } from '@/app/components/ui/tooltip';
import { Toaster } from 'sonner';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0a0a0a',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Story />
          <Toaster />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default preview;

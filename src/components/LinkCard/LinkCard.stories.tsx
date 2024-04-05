import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import { LinkCard } from './LinkCard';

export default {
  title: 'Components/LinkCard',
  component: LinkCard,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof LinkCard>;

export const Default: StoryFn<typeof LinkCard> = () => <LinkCard />;
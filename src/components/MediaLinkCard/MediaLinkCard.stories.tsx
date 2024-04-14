import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import { MediaLinkCard } from './MediaLinkCard';

export default {
  title: 'Components/MediaLinkCard',
  component: MediaLinkCard,
  argTypes: {
      title: { control: 'text' },
      id: { control: 'text' },
      imageUrl : { control: 'text' },
      imageAlt : { control: 'text' },
  },
} as Meta;

const Template: StoryFn<typeof MediaLinkCard> = (args) => (
  <MediaLinkCard {...args} />
);
export const Default = Template.bind({});

Default.args = {
  title: 'Maximum 公式X(Twitter)',
  id: '@maximum03400346',
  imageUrl: '/logos/Maximum-icon.svg',
  imageAlt: 'Twitter',
};

// src/components/AchievementCard/AchievementCard.stories.tsx
import { StoryFn, Meta } from '@storybook/react';
import React from 'react';

import AchievementCard from './AchievementCard';

export default {
  title: 'Components/AchievementCard',
  component: AchievementCard,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    description: { control: 'text' },
    iconUrl: { control: 'text' },
    slug: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<typeof AchievementCard> = (args) => (
  <AchievementCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Sample Title',
  subtitle: 'Sample Subtitle',
  description: 'Sample Description',
  iconUrl: '/images/maximum-card.png',
  slug: 'sample-slug',
};

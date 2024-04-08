import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import { NewsLinkCard } from './NewsLinkCard';

export default {
  title: 'Components/LinkCard',
  component: NewsLinkCard,
  argTypes: {
    style: { control: 'object' },
    title: { control: 'text' },
    content: { control: 'text' },
    date: { control: 'text' },
    group: { control: 'text' },
    to: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<typeof NewsLinkCard> = (args) => <NewsLinkCard {...args} />;
export const Default = Template.bind({});

Default.args = {
  title: 'Maximum Cup 2023',
  content: 'description',
  date: '2024/08',
  group: 'Web研',
  to: '/',
};

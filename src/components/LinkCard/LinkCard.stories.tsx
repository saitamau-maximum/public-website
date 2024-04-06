import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import { LinkCard } from './LinkCard';

export default {
  title: 'Components/LinkCard',
  component: LinkCard,
  argTypes: {
    style: { control: 'object' },
    title: { control: 'text' },
    content: { control: 'text' },
    date: { control: 'text' },
    group: { control: 'text' },
    to: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<typeof LinkCard> = (args) => <LinkCard {...args} />;
export const Default = Template.bind({});

Default.args = {
  title: 'Maximum Cup 2023',
  content:
    'AtCoder社の協力により◯年ぶりにMaximum主催の競技プログラミングコンテストを主催しましたAtCoder社の協力により◯年ぶりにMaximum主催の競技プログラミングコンテストを主催しました',
  date: '2024/08',
  group: 'Web研',
  to: '/',
};
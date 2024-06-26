import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import Card from './NewsCard';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    style: { control: 'object' },
    title: { control: 'text' },
    content: { control: 'text' },
    date: { control: 'text' },
    group: { control: 'text' },
    to: { control: 'text' },
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />;
export const Default = Template.bind({});

Default.args = {
  style: {
    width: '100%',
  },
  title: 'OOOOOOOOOOOOOOOOOOOOOOOOOO',
  content:
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  date: 'YYYY.MM.DD',
  group: 'OOO',
  to: '/',
  imageSrc: '/images/maximum-card.png',
  imageAlt: 'maximum',
};

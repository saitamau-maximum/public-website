import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import Card from './Card';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    date: { control: 'text' },
    group: { control: 'text' },
    to: { control: 'text' },
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text' },
    cardWidth: {control: 'text'},
  },
} as Meta;

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />;
export const Default = Template.bind({});

Default.args = {
  title: 'OOOOOOOOOOOOOOOOOOOOOOOOOO',
  content:
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  date: 'YYYY.MM.DD',
  group: 'OOO',
  to: '/',
  imageSrc: '/images/maximum-card.png',
  imageAlt: 'maximum',
  cardWidth: '100%'
};

import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import { Header } from './Header';

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof Header>;

export const Default: StoryFn<typeof Header> = () => <Header />;

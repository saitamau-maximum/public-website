import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import { Footer } from './Footer';

export default {
  title: 'Components/Footer',
  component: Footer,
} as Meta<typeof Footer>;

export const Default: StoryFn<typeof Footer> = () => <Footer />;

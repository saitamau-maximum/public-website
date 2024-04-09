import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import { HeroImage } from './HeroImage';

export default {
  title: 'Components/HeroImage',
  component: HeroImage,
} as Meta;

const Template: StoryFn<typeof HeroImage> = (args) => (
  <HeroImage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Maximumの活動について',
  blur: false,
};

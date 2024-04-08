import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import { DynamicHeroImage } from './DynamicHeroImage';

export default {
  title: 'Components/DynamicHeroImage',
  component: DynamicHeroImage,
} as Meta;

const Template: StoryFn<typeof DynamicHeroImage> = (args) => (
  <DynamicHeroImage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Maximumの活動について',
  blur: false,
};

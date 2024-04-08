import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import { HeroImages } from './heroImages';

export default {
  title: 'Components/HeroImages',
  component: HeroImages,
} as Meta;

const Template: StoryFn<typeof HeroImages> = (args) => <HeroImages {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Maximumの活動について',
  blur: false,
};

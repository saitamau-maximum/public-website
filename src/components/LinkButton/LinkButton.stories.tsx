import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import { LinkButton } from './LinkButton';

export default {
  title: 'Components/LinkButton',
  component: LinkButton,
} as Meta;

const Template: StoryFn<typeof LinkButton> = (args) => (
  <LinkButton {...args}  />
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Click Me',
  variant: 'green',
  href: '/',
};

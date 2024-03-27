import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import { LinkButton } from './LinkButton';

export default {
  title: 'Components/LinkButton',
  component: LinkButton,
} as Meta;

const Template: StoryFn<typeof LinkButton> = (args) => <LinkButton {...args} />;

export const Green = Template.bind({});
Green.args = {
  children: 'Click Me',
  variant: 'green',
  href: '/',
  size: 'medium',
};

export const Gray = Template.bind({});
Gray.args = {
  children: 'Click Me',
  variant: 'gray',
  href: '/',
  size: 'medium',
};

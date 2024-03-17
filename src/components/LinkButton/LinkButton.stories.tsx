import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { LinkButton } from './LinkButton';

export default {
  title: 'Components/LinkButton',
  component: LinkButton,
} as Meta;

const Template: Story = (args) => (
  <LinkButton {...args} onClick={action('button-click')} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Click Me',
  variant: 'green',
  href: '/',
};
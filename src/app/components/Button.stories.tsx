import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const Template: Story = (args) => (
  <Button {...args} onClick={action('button-click')} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Click Me',
  variant: 'green',
  href: '/',
};

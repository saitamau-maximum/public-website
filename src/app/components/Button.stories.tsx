import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from './Button';
import { action } from '@storybook/addon-actions';

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

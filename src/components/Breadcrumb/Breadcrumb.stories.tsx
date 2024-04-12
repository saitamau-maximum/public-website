import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import { Breadcrumb } from './Breadcrumb';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    items: {
      href: { control: 'text' },
      title: { control: 'text' },
    },
  },
} as Meta;

const Template: StoryFn<typeof Breadcrumb> = (args) => <Breadcrumb {...args} />;
export const Default = Template.bind({});

Default.args = {
  items: [
    { title: 'Top', href: '/' },
    { title: 'Maximumの活動について', href: '/about' },
  ],
};

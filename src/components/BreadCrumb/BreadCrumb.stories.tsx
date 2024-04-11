import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import { BreadCrumb } from './BreadCrumb';

export default {
  title: 'Components/BreadCrumb',
  component: BreadCrumb,
  argTypes: {
    items: {
      href: { control: 'text' },
      title: { control: 'text' },
    }
  },
} as Meta;

const Template: StoryFn<typeof BreadCrumb> = (args) => <BreadCrumb {...args} />;
export const Default = Template.bind({});

Default.args = {
  items: [
    { title: 'Top', href: '/' },
    { title: 'Maximumの活動について', href: '/about' },
  ],
};

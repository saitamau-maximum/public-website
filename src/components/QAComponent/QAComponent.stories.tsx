import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import { QAComponent } from './QAComponent';

export default {
  title: 'Components/QAComponent',
  component: QAComponent,
} as Meta;

const Template: StoryFn<typeof QAComponent> = (args) => (
  <QAComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  question: 'QQQQQQQQQQQQQQQQQQQQQQQQQ',
  answer: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
};
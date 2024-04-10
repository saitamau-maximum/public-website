import { StoryFn, Meta } from '@storybook/react';
import React from 'react';
import Toc from './Toc';

export default {
  title: 'Components/Toc',
  componnt: Toc,
  argTypes: {
    tocData: { control: 'object' },
  },
} as Meta;

const Template: StoryFn<typeof Toc> = (args) => <Toc {...args} />;
export const Default = Template.bind({});

Default.args = {
  tocData: [
    {
      depth: 1,
      value: 'Section 1',
      data: { id: 'section1' },
      children: [
        {
          depth: 2,
          value: 'Subsection 1.1',
          data: { id: 'subsection1.1' },
          children: [],
        },
        {
          depth: 2,
          value: 'Subsection 1.2',
          data: { id: 'subsection1.2' },
          children: [],
        },
      ],
    },
    {
      depth: 1,
      value: 'Section 2',
      data: { id: 'section2' },
      children: [],
    },
  ],
};

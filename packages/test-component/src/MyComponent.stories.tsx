import React from 'react';
import { Args, Meta } from '@storybook/react';
import MyComponent from './MyComponent';

const config: Meta<Args> = {
  title: '@monorepo/test-component/MyComponent',
  component: MyComponent,
};

export default config;

export const BasicUsage = () => (
  <div>
    <div style={{ marginBottom: '10px' }}>
      <MyComponent
        initialValue='value'
      />
    </div>
  </div>
);

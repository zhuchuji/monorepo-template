import React, { useState } from 'react';
import styled from 'styled-components';

import CustomPromise from '@monorepo/test-util';

const Input = styled.input`
  border: red;
`;

interface ComponentProps {
  initialValue: string;
}

const MyComponent: React.FC<ComponentProps> = ({ initialValue }) => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (value: string) => {
    CustomPromise.all();
    setValue(value);
  };

  return <Input value={value} onChange={(e) => onChange(e.target.value)} />;
};

export default MyComponent;

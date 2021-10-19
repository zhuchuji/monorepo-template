import React from 'react';

import BaseInput, { BaseInputProps } from '../BaseInput';

type InputProps = BaseInputProps;

const TextInput: React.FC<InputProps> = (props) => {
  return <BaseInput {...props} />;
};
TextInput.defaultProps = {
  type: 'text',
  size: 'medium',
  fullWidth: false,
  disabled: false,
};
export default TextInput;

import React from 'react';
import styled from 'styled-components';

import FormItem from './FormItem';

interface FormProps {
  onSubmit?: () => void;
}
interface IForm extends React.FC<FormProps> {
  FormItem: typeof FormItem;
}

const Form: IForm = ({ onSubmit, children }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    typeof onSubmit === 'function' && onSubmit();
  };
  return <FormWrapper onSubmit={handleSubmit}>{children}</FormWrapper>;
};
export default Form;
Form.FormItem = FormItem;

const FormWrapper = styled.form``;

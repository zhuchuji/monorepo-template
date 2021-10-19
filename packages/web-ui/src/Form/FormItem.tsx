import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Grid, { GridProps } from '../Grid';

interface FormItemProps {
  validator?: RegExp;
  className?: string;
  tip?: string;
  error?: string;
  labelGrid?: GridProps;
  inputGrid?: GridProps;
  label?: ReactNode;
}

const FormItem: React.FC<FormItemProps> = ({
  labelGrid = { span: 'auto' },
  inputGrid = { span: true },
  label,
  tip,
  error,
  className,
  children,
}) => {
  return (
    <Wrapper className={className} wide={Boolean(error || tip)}>
      <Grid flex alignItems="center">
        <Grid {...labelGrid} tag="label">
          {label}
        </Grid>
        <InputWrapper {...inputGrid}>
          {children}
          {error ||
            (tip && (
              <Prepend>{error ? <Error>{error}</Error> : tip ? <Tip>{tip}</Tip> : null}</Prepend>
            ))}
        </InputWrapper>
      </Grid>
    </Wrapper>
  );
};
export default FormItem;

const Wrapper = styled(Grid)<{ wide: boolean }>`
  margin-bottom: ${({ wide }) => (wide ? '54px' : '30px')};
`;

const InputWrapper = styled(Grid)`
  position: relative;
`;

const Prepend = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  font-size: 14px;
`;

const Tip = styled.p`
  color: #999999;
`;

const Error = styled.p`
  color: red;
`;

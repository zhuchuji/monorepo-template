import React, {
  ReactNode,
  forwardRef,
  useState,
  CSSProperties,
  useRef,
  useImperativeHandle,
} from 'react';
import styled from 'styled-components';

import { Size } from '../../typings';
import theme from '../../theme';

export interface BaseInputProps {
  value?: any;
  defaultValue?: any;
  placeholder?: string;
  type?: string;
  size?: Size;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  onChange?: (value: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
  children?: ReactNode;
  prepend?: ReactNode;
  append?: ReactNode;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
  const {
    value: valueProp,
    defaultValue,
    placeholder,
    type = 'text',
    size = 'medium',
    disabled = false,
    style,
    prepend,
    append,
    className,
    children,
    onChange,
    onFocus,
    onBlur,
    onClick,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
  const value = 'value' in props ? valueProp : defaultValue;

  const [focused, toggleFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    typeof onChange === 'function' && onChange(event.target.value);

  const handleFocus = () => {
    toggleFocused(true);
    typeof onFocus === 'function' && onFocus();
  };

  const handleBlur = () => {
    toggleFocused(false);
    typeof onBlur === 'function' && onBlur();
  };

  let finalClassName = className || '';
  if (disabled) {
    finalClassName += ' disabled';
  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    typeof onClick === 'function' && onClick();
  };

  return (
    <Wrapper className={finalClassName} style={style}>
      <InputWrapper
        size={size}
        focused={focused}
        className={finalClassName}
        style={style}
        onClick={handleClick}
      >
        {prepend != null && <Prepend>{prepend}</Prepend>}
        <Input
          ref={inputRef}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          onChange={handleChange}
          // @ts-ignore
          size={size}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {append != null && <Append>{append}</Append>}
      </InputWrapper>
      {children}
    </Wrapper>
  );
});
BaseInput.defaultProps = {
  type: 'text',
  size: 'medium',
  disabled: false,
};
export default BaseInput;

const Wrapper = styled.div`
  position: relative;
`;

const InputWrapper = styled.div<{ focused: boolean; size: Size }>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  padding: ${({ size }) => theme.input.padding[size]};
  border: 1px solid ${({ focused }) => (focused ? theme.input.activeColor : '#e5e5e5')};
  border-radius: 4px;

  &.disabled {
    background-color: ${theme.input.disabledColor.light};
    border-color: ${theme.input.disabledColor.dark};
    pointer-events: none;
  }
`;

const Input = styled.input<{ disabled: boolean }>`
  display: block;
  width: 100%;
  border: 0;
  padding: 0;
  outline: none;
  color: ${({ disabled }) => (disabled ? theme.input.disabledColor.dark : '#333333')};
  ${({ disabled }) => (disabled ? `background-color: ${theme.input.disabledColor.light}` : null)};
  font-size: 1rem;
`;

const Prepend = styled.span`
  margin-right: 10px;
`;

const Append = styled.span`
  margin-left: 10px;
`;

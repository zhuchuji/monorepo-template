import React, { ReactNode, useState, useEffect, CSSProperties } from 'react';
import styled from 'styled-components';

import theme from '../../theme';

interface RadioGroupProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
  options: Array<{
    value: any;
    name: ReactNode;
  }>;
  style?: CSSProperties;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    // children,
    options,
    disabled = false,
    // direction = 'horizontal',
    style,
    className,
  } = props;

  const initialValue = 'value' in props ? valueProp : defaultValue;

  const [internalValue, setInternalValue] = useState(initialValue);

  useEffect(() => {
    setInternalValue(valueProp);
  }, [valueProp]);

  const [idPrefix] = useState<string>(String(Math.random()));

  const handleClick = (radioValue: any) => {
    setInternalValue(radioValue);
    if (internalValue !== radioValue) {
      typeof onChange === 'function' && onChange(radioValue);
    }
  };

  return (
    <Group style={style} className={className}>
      {options.map(({ value, name }) => {
        return (
          <Radio key={value} disabled={disabled} onClick={() => handleClick(value)}>
            <CheckState checked={internalValue === value} disabled={disabled} />
            <input name={idPrefix} hidden type="radio" value={value} />
            <RadioLabel>{name}</RadioLabel>
          </Radio>
        );
      })}
    </Group>
  );
};
RadioGroup.defaultProps = {
  direction: 'horizontal',
  disabled: false,
};
export default RadioGroup;

const Group = styled.span`
  display: inline-block;
`;

const Radio = styled.label<{ disabled: boolean }>`
  margin-left: 20px;
  cursor: pointer;
  ${({ disabled }) => (disabled ? 'pointer-events: none' : null)};

  &:first-child {
    margin-left: 0;
  }
`;

const RadioLabel = styled.span``;

const CheckState = styled.span<{ checked: boolean; disabled: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-right: 10px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: ${({ checked, disabled }) =>
    checked
      ? `6px solid ${disabled ? theme.input.disabledColor.dark : theme.color.primary}`
      : '2px solid #e5e5e5'};
  vertical-align: middle;
`;

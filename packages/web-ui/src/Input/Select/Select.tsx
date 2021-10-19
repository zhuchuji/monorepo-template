import React, { ReactNode, useState, useEffect, useCallback, useRef, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

import { Size } from '../../typings';
import theme from '../../theme';
import BaseInput, { BaseInputProps } from '../BaseInput/';
import SvgIcon from '../../SvgIcon';

const selectTheme = {
  loadingSize: {
    small: '16px',
    medium: '16px',
    large: '16px',
  },
};

interface SelectProps extends Omit<BaseInputProps, 'onFocus' | 'onBlur'> {
  options: Array<{ value: any; name: string }>;
  loading?: boolean;
  emptyPlaceholder?: ReactNode;
  onToggleDropdown?: (collapsed: boolean) => void;
}

const Select: React.FC<SelectProps> = (props) => {
  const {
    value: valueProp,
    defaultValue,
    loading,
    placeholder,
    emptyPlaceholder,
    size = 'medium',
    fullWidth = false,
    disabled = false,
    style,
    className,
    onChange,
    options,
    onToggleDropdown,
  } = props;
  const [filtering, setFiltering] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>();

  const finalValue = 'value' in props ? valueProp : defaultValue;

  const getSelectedName = useCallback(
    (selectedValue: any): string => {
      for (const { value, name } of options) {
        if (value === selectedValue) {
          return name;
        }
      }
      return '';
    },
    [options],
  );

  const dropdownRef = useRef<HTMLUListElement>(null);
  const [collapsed, toggleCollapsed] = useState<boolean>(false);
  const [selectedName, setSelectedName] = useState<string>(() => getSelectedName(finalValue));

  useEffect(() => {
    setSelectedName(getSelectedName(finalValue));
  }, [finalValue, getSelectedName]);

  const toggleDropdown = (collapsed: boolean) => {
    toggleCollapsed(collapsed);
    typeof onToggleDropdown === 'function' && onToggleDropdown(collapsed);
  };

  useEffect(() => {
    if (collapsed && dropdownRef != null) {
      const handleClickAway = (event: MouseEvent) => {
        setFiltering(false);
        setFilterText('');
        if (!dropdownRef.current?.contains(event.target as Element)) {
          toggleDropdown(false);
        }
      };
      document.body.addEventListener('click', handleClickAway);

      return () => {
        document.body.removeEventListener('click', handleClickAway);
      };
    }
  }, [collapsed, dropdownRef, toggleDropdown]);

  const handleClickOption = (value: any) => {
    toggleDropdown(false);
    setFiltering(false);
    setFilterText('');
    if (finalValue !== value) {
      if (!('value' in props)) {
        setSelectedName(getSelectedName(value));
      }
      typeof onChange === 'function' && onChange(value);
    }
  };

  const handleClickInput = () => {
    toggleDropdown(true);
    setFiltering(true);
    setFilterText('');
  };

  const filteredOptions = useMemo(() => {
    return filterText != undefined
      ? options.filter(({ name }) => name.includes(filterText))
      : options;
  }, [options, filterText]);

  const inputValue = useMemo(() => {
    if (filtering) {
      return filterText;
    } else {
      return selectedName;
    }
  }, [filtering, filterText, selectedName]);

  return (
    <BaseInput
      value={inputValue}
      placeholder={placeholder}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={handleClickInput}
      onChange={(text) => setFilterText(text)}
      style={style}
      className={className}
      append={<Icon collapsed={collapsed} id="icon-arrow-down" />}
    >
      <Dropdown show={collapsed} ref={dropdownRef}>
        {loading ? (
          <Option disabled size={size}>
            <Loading size={size} />
            加载中
          </Option>
        ) : filteredOptions.length > 0 ? (
          filteredOptions.map(({ value, name }) => (
            <Option
              active={finalValue === value}
              key={value}
              size={size}
              onClick={() => handleClickOption(value)}
            >
              {name}
            </Option>
          ))
        ) : (
          <Option disabled size={size}>
            {emptyPlaceholder || '无选项'}
          </Option>
        )}
      </Dropdown>
    </BaseInput>
  );
};
Select.defaultProps = {
  loading: false,
};
export default Select;

const Dropdown = styled.ul<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  z-index: 1;
  top: calc(100% + 10px);
  left: 0;
  border-radius: 4px;
  width: 100%;
  max-height: 300px;
  padding: 10px 0;
  background: #ffffff;
  box-shadow: 0px 1px 10px 0px rgba(102, 102, 102, 0.1);
  overflow: auto;
`;

const Option = styled.li<{ active?: boolean; size: Size; disabled?: boolean }>`
  padding: ${({ size }) => theme.input.padding[size]};
  ${({ disabled }) => (!disabled ? 'cursor: pointer' : null)};

  &:hover {
    ${({ disabled }) => (!disabled ? 'background: #e5e5e5' : null)};
  }

  ${({ active }) => (active ? `color: ${theme.color.primary}` : null)};
`;

const Icon = styled(SvgIcon)<{ collapsed: boolean }>`
  font-size: 14px;
  color: #d8d8d8;
  vertical-align: middle;
  cursor: pointer;
  transform: rotate(${({ collapsed }) => (collapsed ? '180deg' : '0deg')});
  transition: all 0.2s;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.span<{ size: Size }>`
  box-sizing: border-box;
  margin-right: 4px;
  display: inline-block;
  border-radius: 50%;
  border: 2px solid;
  border-color: transparent transparent currentColor currentColor;
  width: ${({ size }) => selectTheme.loadingSize[size]};
  height: ${({ size }) => selectTheme.loadingSize[size]};
  animation: ${rotate} 0.4s linear infinite;
`;

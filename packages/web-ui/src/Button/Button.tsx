import React, { ReactNode, ElementType, MouseEvent, CSSProperties } from 'react';
import styled, { keyframes } from 'styled-components';

import { Color, ButtonType, Size } from '../typings';
import theme, { ColorMap, ButtonTypeMap } from '../theme';

interface StyleProps {
  disabled: boolean;
  color: Color;
  fullWidth: boolean;
  size: Size;
  type: ButtonType;
  href: string;
  round: boolean;
  disabledBgColor: string;
}

interface ButtonProps extends Partial<StyleProps> {
  tag?: ElementType;
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: ReactNode;
  loading?: boolean;
  disabledBgColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  tag,
  color,
  disabled,
  fullWidth,
  size = 'medium',
  round,
  type,
  href,
  onClick,
  loading,
  style,
  className,
  children,
  disabledBgColor,
}) => {
  let componentTag = tag;
  if (componentTag == null) {
    componentTag = 'button';
  } else if (href != null) {
    componentTag = 'a';
  }
  let finalClassName = className || '';
  if (disabled) {
    finalClassName += ' disabled';
  }

  return (
    <BaseButton
      as={componentTag}
      disabled={disabled || loading}
      color={color}
      fullWidth={fullWidth}
      size={size}
      round={round}
      type={type}
      href={href}
      onClick={onClick}
      className={finalClassName}
      style={style}
      disabledBgColor={disabledBgColor}
    >
      {loading ? <Loading size={size} /> : null}
      {children}
    </BaseButton>
  );
};
Button.defaultProps = {
  tag: 'button',
  disabled: false,
  color: 'primary',
  fullWidth: false,
  size: 'medium',
  type: 'contained',
  onClick: () => {},
};
export default Button;

const BaseButton = styled.span<StyleProps>`
  display: ${({ fullWidth }) => (fullWidth ? 'block' : 'inline-block')};
  border: ${({ type, color }) => {
    switch (type) {
      case 'contained':
        return `1px solid ${color === ColorMap.inherit ? 'currentColor' : theme.color[color]}`;
      case 'text':
        return 0;
      case 'outlined': {
        return `1px solid ${color === ColorMap.inherit ? 'currentColor' : theme.color[color]}`;
      }
      default:
        return 0;
    }
  }};
  padding: ${({ type, size }) => {
    if (type !== ButtonTypeMap.text) {
      return theme.button.padding[size];
    }
    return '0';
  }};
  background-color: ${({ color, type }) => {
    switch (type) {
      case 'contained': {
        return theme.color[color];
      }
      case 'outlined':
      case 'text': {
        return 'transparent';
      }
      default:
        return 'transparent';
    }
  }};
  color: ${({ color, type }) => {
    switch (type) {
      case 'contained':
        if (color === 'inherit') {
          return 'currentColor';
        }
        return '#ffffff';
      case 'outlined':
      case 'text':
        return theme.color[color];
      default:
        return '#ffffff';
    }
  }};
  border-radius: ${({ round, size }) => {
    if (round) {
      return theme.button.borderRadius[size];
    } else {
      return theme.borderRadius;
    }
  }};
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  ${({ fullWidth }) => (fullWidth ? 'width: 100%' : null)};
  ${({ href }) => (href != null ? 'text-decoration: none' : null)};
  outline: 0;
  user-select: none;
  text-align: center;
  font-size: ${({ size }) => theme.fontSize[size]};

  &:active {
    ${({ type, color }) => {
      switch (type) {
        case ButtonTypeMap.contained: {
          return `background-color: ${theme.button.activeColor[color]}`;
        }
        case ButtonTypeMap.outlined: {
          return `background-color: ${theme.button.outlineActiveColor[color]}`;
        }
        case ButtonTypeMap.text: {
          return `color: ${theme.button.activeColor[color]}`;
        }
        default:
          return ``;
      }
    }}
  }

  &.disabled {
    ${({ type, disabledBgColor }) => {
      switch (type) {
        case 'contained': {
          return `
            background-color: ${disabledBgColor || theme.button.disabledColor.dark};
            border-color: ${theme.button.disabledColor.dark};
          `;
        }
        case 'outlined': {
          return `
            background-color: ${disabledBgColor || theme.button.disabledColor.light};
            border-color: ${theme.button.disabledColor.dark};
            color: ${theme.button.disabledColor.dark};
          `;
        }
        case 'text': {
          return `
            color: ${theme.button.disabledColor.dark}
          `;
        }
        default:
          return ``;
      }
    }};
    pointer-events: none;
  }
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
  width: ${({ size }) => theme.button.loadingSize[size]};
  height: ${({ size }) => theme.button.loadingSize[size]};
  animation: ${rotate} 0.4s linear infinite;
`;

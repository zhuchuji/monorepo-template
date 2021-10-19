import React from 'react';
import styled, { CSSProperties } from 'styled-components';

import theme from '../theme';

export interface TabProps {
  key: string;
  style?: CSSProperties;
  className?: string;
  active?: boolean;
  onClick?: (key: string) => void;
}

const Tab: React.FC<TabProps> = ({ key, style, className, active = false, children, onClick }) => {
  const componsedclassName = active ? className + ' active' : className;

  const handleClick = () => {
    if (!active && typeof onClick === 'function') {
      onClick(key);
    }
  };

  return (
    <Item style={style} className={componsedclassName} onClick={handleClick}>
      {children}
    </Item>
  );
};
Tab.defaultProps = {
  active: false,
};
export default Tab;

const Item = styled.li`
  display: inline-block;
  position: relative;
  top: 1px;
  margin-left: 30px;
  padding: 14px 0;
  color: #666666;
  font-size: 20px;
  cursor: pointer;
  border-bottom: 4px solid transparent;
  user-select: none;

  &:first-child {
    margin-left: 0;
  }

  &.active {
    border-bottom-color: ${theme.color.primary};
    font-weight: 500;
    color: #333333;
  }
`;

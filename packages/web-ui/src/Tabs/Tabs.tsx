import React, { cloneElement } from 'react';
import styled, { CSSProperties } from 'styled-components';

import { TabProps } from './Tab';

interface Props {
  style?: CSSProperties;
  className?: string;
  activeKey: string;
  onChange: (key: string) => void;
  children: React.ReactElement<TabProps>[];
}

const Tabs: React.FC<Props> = ({ style, className, activeKey, onChange, children }) => {
  const handleClick = (key: string) => {
    if (activeKey !== key) {
      onChange(key);
    }
  };

  return (
    <List className={className} style={style}>
      {children.map((element: React.ReactElement<TabProps>) =>
        cloneElement(element, {
          active: element.key === activeKey,
          onClick: () => handleClick(element.key as string),
        }),
      )}
    </List>
  );
};
export default Tabs;

const List = styled.ul`
  border-bottom: 1px solid #f3f3f3;
`;

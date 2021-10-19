import React, { CSSProperties } from 'react';

import { FadeIn } from '../Transition';

interface TabPaneProps {
  index: string;
  value: string;
  className?: string;
  style?: CSSProperties;
}

const TabPane: React.FC<TabPaneProps> = ({ index, value, className, style, children }) => {
  return index === value ? (
    <FadeIn className={className} style={style}>
      {children}
    </FadeIn>
  ) : null;
};

export default TabPane;

import React from 'react';
import styled from 'styled-components';

export interface ItemProps {
  active?: boolean;
  className?: string;
}
const Item: React.FC<ItemProps> = ({ active = false, className, children }) => {
  let finalClassName = className || '';
  if (active) {
    finalClassName += ' active';
  }
  return <Wrapper className={finalClassName}>{children}</Wrapper>;
};
Item.defaultProps = {
  active: false,
};
export default Item;

const Wrapper = styled.span`
  color: #666666;

  &.active {
    color: #333333;
    font-weight: 500;
  }
`;

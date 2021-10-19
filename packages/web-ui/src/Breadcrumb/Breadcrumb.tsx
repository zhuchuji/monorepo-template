import React, { ReactNode, Children, cloneElement, ReactElement } from 'react';
import styled from 'styled-components';
import Item, { ItemProps } from './Item';

interface BreadcrumbProps {
  separator?: ReactNode;
  className?: string;
  children: ReactElement<ItemProps> | Array<ReactElement<ItemProps>>;
}

interface IBreadcrumb extends React.FC<BreadcrumbProps> {
  Item: typeof Item;
}

const Breadcrumb: IBreadcrumb = ({ separator = <Separator />, className, children }) => {
  const items = Children.toArray(children) as Array<ReactElement<ItemProps>>;
  return (
    <Wrapper className={className}>
      {items.map((element, index) => (
        <ItemWrapper key={element.key}>
          {index > 0 ? <SeparatorWrapper>{separator}</SeparatorWrapper> : null}
          {cloneElement(element, { active: index === items.length - 1 })}
        </ItemWrapper>
      ))}
    </Wrapper>
  );
};
Breadcrumb.Item = Item;
export default Breadcrumb;

const Wrapper = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

const ItemWrapper = styled.li``;

const SeparatorWrapper = styled.span``;

const Separator = styled.span`
  display: inline-block;
  margin: 0 10px;
  width: 1px;
  height: 100%;
  min-height: 14px;
  background: #666666;
`;

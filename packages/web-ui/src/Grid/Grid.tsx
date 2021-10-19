import React, { ElementType, CSSProperties } from 'react';
import styled from 'styled-components';

const GRID_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const GRID_NUM = 12;

interface StyleProps {
  flex?: boolean;
  span?: 'auto' | boolean | number;
  direction?: 'row' | 'column';
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  alignContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'stretch'
    | 'space-between'
    | 'space-around';
  wrap?: boolean;
  overflow?: string;
  fillHeight?: boolean;
  title?: string;
}

export interface GridProps extends StyleProps {
  tag?: ElementType;
  style?: CSSProperties;
  className?: string;
}
const Grid: React.FC<GridProps> = ({
  tag = 'div',
  flex,
  span,
  direction,
  justify,
  alignItems,
  alignContent,
  wrap,
  overflow,
  fillHeight,
  children,
  style,
  className,
  title,
}) => {
  return (
    <Wrapper
      as={tag}
      flex={flex}
      span={span}
      direction={direction}
      justify={justify}
      alignItems={alignItems}
      alignContent={alignContent}
      wrap={wrap}
      overflow={overflow}
      fillHeight={fillHeight}
      style={style}
      className={className}
      title={title}
    >
      {children}
    </Wrapper>
  );
};
Grid.defaultProps = {
  tag: 'div',
};
export default Grid;

const Wrapper = styled.div<StyleProps>`
  ${({ flex }) => (flex ? 'display: flex' : null)};
  ${({ flex, direction }) => (flex && direction ? `flex-direction: ${direction}` : '')};
  ${({ span, direction }) => {
    if (span === 'auto') {
      return `flex: 0 0 auto; ${direction !== 'column' ? 'max-width: 100%;' : ''}`;
    } else if (span === true) {
      return `flex: 1 1 auto; ${direction !== 'column' ? 'max-width: 100%;' : ''}`;
    } else if (typeof span === 'number' && GRID_ARRAY.includes(span)) {
      return `flex: 0 0 ${(span / GRID_NUM) * 100}%;
        ${direction !== 'column' ? `max-width: ${(span / GRID_NUM) * 100}%` : ''}`;
    } else {
      return null;
    }
  }};
  ${({ flex, justify }) => (flex && justify ? `justify-content: ${justify}` : null)};
  ${({ flex, alignItems }) => (flex && alignItems ? `align-items: ${alignItems}` : null)};
  ${({ flex, alignContent }) => (flex && alignContent ? `align-content: ${alignContent}` : null)};
  ${({ flex, wrap }) => (flex && wrap ? 'flex-wrap: wrap' : null)};
  ${({ overflow }) => (overflow ? `overflow : ${overflow}` : null)};
  ${({ fillHeight }) => (fillHeight ? 'height: 100%' : null)};
`;

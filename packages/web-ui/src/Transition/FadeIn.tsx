import React, { useState, useEffect, CSSProperties } from 'react';
import styled from 'styled-components';

interface Props {
  style?: CSSProperties;
  className?: string;
}
const FadeIn: React.FC<Props> = ({ style, className, children }) => {
  const [transitioning, toggleTransitioning] = useState<boolean>(false);

  useEffect(() => {
    toggleTransitioning(true);
  }, []);

  return (
    <Wrapper style={style} className={className} transitioning={Boolean(transitioning)}>
      {children}
    </Wrapper>
  );
};
export default FadeIn;

const Wrapper = styled.div<{ transitioning: boolean }>`
  opacity: ${({ transitioning }) => (transitioning ? '1' : '0')};
  transition: all 0.2s;
`;

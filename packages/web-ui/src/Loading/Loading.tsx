import React, { forwardRef, CSSProperties } from 'react';
import styled from 'styled-components';

import LOADING_GIF from '../static/loading.gif';

export interface LoadingProps {
  loadingImage?: string;
  style?: CSSProperties;
  height?: string;
  onClick?: () => void;
  className?: string;
}
const Loading = forwardRef<HTMLDivElement, LoadingProps>(
  ({ loadingImage = LOADING_GIF, style, height = '100%', onClick, className }, ref) => (
    <Wrapper ref={ref} height={height} style={style} className={className} onClick={onClick}>
      <Img src={loadingImage} alt="loading" />
    </Wrapper>
  ),
);
Loading.defaultProps = {
  loadingImage: LOADING_GIF,
};
export default Loading;

const Wrapper = styled.div<{ height: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height};
`;

const Img = styled.img`
  width: 50%;
  max-width: 60px;
`;

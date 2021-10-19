import React, { CSSProperties, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../Theming';

import IconfontLoader from './IconfontLoader';

interface SvgIconProps {
  style?: CSSProperties;
  className?: string;
  id: string;
  onClick?: () => void;
}

const Container = styled.svg`
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
`;

const iconfontLoader = new IconfontLoader();

const SvgIcon: React.FC<SvgIconProps> = ({ style, className, id, onClick }) => {
  const theme = useContext(ThemeContext);
  const svgId = id ? `#${id}` : 'icon';

  useEffect(() => {
    if (iconfontLoader.shouldLoadFont()) {
      iconfontLoader.loadIconfont(theme.iconfont.source);
    }
  }, []);

  return (
    <Container style={style} className={className} aria-hidden="true" onClick={onClick}>
      <use xlinkHref={svgId} />
    </Container>
  );
};

export default SvgIcon;

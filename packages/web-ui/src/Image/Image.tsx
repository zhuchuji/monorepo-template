/**
 *
 */

import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import styled from 'styled-components';

import ObserveManager from './ObserveManager';

import LOADING_IMAGE from '../static/loading.gif';

interface ImageProps {
  lazyload?: boolean;
  loadingImage?: string;
  className?: string;
  src: string;
  alt?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const Image = ({
  lazyload = true,
  loadingImage,
  src,
  onClick,
  alt = 'image',
  style,
  className,
}: ImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    let loading = false;

    if (!loaded) {
      const loadImage = () => {
        if (!loaded && !loading) {
          loading = true;
          const image = new window.Image();
          image.src = src;
          image.onload = () => {
            loading = false;
            if (mounted) {
              setLoaded(true);
            }
          };
        }
      };

      if (lazyload && ref.current != null) {
        const manager = ObserveManager.getInstance();
        manager.observe({ element: ref.current, onIntersect: loadImage });
        return () => {
          mounted = false;
          if (ref.current != null) {
            manager.unobserve(ref.current);
          }
        };
      } else if (!lazyload) {
        loadImage();
        return () => {
          mounted = false;
        };
      }
    }
  }, [src, ref, lazyload, loaded]);

  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  return loaded ? (
    <ImageWrapper style={style} className={className} src={src} alt={alt} onClick={handleClick} />
  ) : (
    <Wrapper ref={ref} style={style} className={className} onClick={handleClick}>
      <img src={loadingImage} alt="loading image" />
    </Wrapper>
  );
};
Image.defaultProps = {
  lazyload: true,
  loadingImage: LOADING_IMAGE,
};
export default Image;

const ImageWrapper = styled.img`
  display: block;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eeeeee;
`;

import React, { CSSProperties } from 'react';
import styled from 'styled-components';

const DEFAULT_AVATAR = 'https://static.guorou.net/static/images/default_avatar.png';

interface AvatarProps {
  url?: string;
  width?: number | string;
  height?: number | string;
  round?: boolean;
  style?: CSSProperties;
  alt?: string;
  className?: string;
  onClick?: () => void;
}

function formatSize(size: number | string | undefined): string {
  return typeof size === 'number' ? `${size}px` : (size as string);
}

const Avatar: React.FC<AvatarProps> = ({
  url,
  width,
  height,
  round,
  style,
  alt,
  className,
  onClick,
}) => {
  return (
    <Image
      width={width}
      height={height}
      round={round}
      style={style}
      className={className}
      src={url}
      alt={alt}
      onClick={onClick}
    />
  );
};
Avatar.defaultProps = {
  url: DEFAULT_AVATAR,
  width: '100px',
  round: true,
  alt: 'avatar',
};
export default Avatar;

type StyleProps = Pick<AvatarProps, 'width' | 'height' | 'round'>;

const Image = styled.img<StyleProps>`
  display: inline-block;
  width: ${({ width }) => formatSize(width)};
  height: ${({ width, height }) => formatSize(height || width)};
  ${(props) => (props.round ? 'border-radius: 50%' : null)};
  overflow: hidden;
`;

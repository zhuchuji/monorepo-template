/**
 * @issue rendering issue, the component render too many times
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { COLOR_THEME_PRIMARY, COLOR_THEME_CONTRACT } from '../../styles';
import SvgIcon from '../../SvgIcon';

interface RateProps {
  className?: string;
  count?: number; // star 总数
  value?: number; // 当前值
  onHoverChange?: (value: number) => void; // 鼠标经过数值变化的回调
  onChange?: (value: number) => void; // 选择值之后的回调
  disabled?: boolean;
}

interface Star {
  value: number;
  active: boolean;
}

const Rate: React.FC<RateProps> = ({ className, count = 5, value = 0, onChange, disabled }) => {
  const [stars, setStars] = useState<Star[]>([]);

  const onMouseLeaveList = () => {
    setStars((prev) =>
      prev.map((item) => ({
        ...item,
        active: item.value <= value,
      })),
    );
  };

  const onMouseEnterStart = (star: Star) => () => {
    setStars((prev) =>
      prev.map((item) => ({
        ...item,
        active: item.value <= star.value,
      })),
    );
  };

  const onStarClick = (star: Star) => () => {
    onChange && onChange(star.value);
  };

  useEffect(() => {
    setStars(
      Array(count)
        .fill(null)
        .map((_, index) => ({
          value: index + 1,
          active: index + 1 <= value,
        })),
    );
  }, [value, count]);

  return (
    <StarList className={className} onMouseLeave={onMouseLeaveList} disabled={disabled}>
      {stars.map((star) => (
        <StarItem
          key={star.value}
          active={star.active}
          onMouseEnter={onMouseEnterStart(star)}
          onClick={onStarClick(star)}
          disabled={disabled}
        >
          <SvgIcon id="icon-star" />
        </StarItem>
      ))}
    </StarList>
  );
};

export default Rate;

const StarList = styled.ul<{ disabled?: boolean }>`
  ${({ disabled }) => (disabled ? 'pointer-events: none' : null)};
`;

const StarItem = styled.li<{
  active?: boolean;
  disabled?: boolean;
}>`
  box-sizing: border-box;
  display: inline-block;
  margin-left: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all 0.2s;
  color: ${({ active }) => (active ? COLOR_THEME_PRIMARY : COLOR_THEME_CONTRACT)};

  &:hover {
    color: ${COLOR_THEME_PRIMARY};
  }

  &:first-child {
    margin-left: 0;
  }
  ${({ disabled }) => (disabled ? 'pointer-events: none' : null)};
`;

import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import SvgIcon from '../SvgIcon';
import { IOptions } from './typings';

interface ToastProps extends IOptions {
  className?: string;
}
const Toast: React.FC<ToastProps> = ({ type = 'info', duration = 1500, className, children }) => {
  const [mounted, setMounted] = useState<boolean>(true);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMounted(false);
    }, duration);
    return () => {
      window.clearTimeout(timer);
    };
  }, [duration]);

  const { icon, color } = useMemo(() => {
    switch (type) {
      case 'info': {
        return {
          icon: 'icon-warning',
          color: '#FAAD15',
        };
      }
      case 'warning': {
        return {
          icon: 'icon-warning',
          color: '#FAAD15',
        };
      }
      case 'success': {
        return {
          icon: 'icon-success',
          color: '#53C31C',
        };
      }
      case 'error': {
        return {
          icon: 'icon-error',
          color: '#FF4D4F',
        };
      }
      default:
        return {
          icon: 'icon-warning',
          color: '#53C31C',
        };
    }
  }, [type]);

  return mounted ? (
    <Wrapper className={className}>
      <Icon id={icon} color={color} />
      <Content>{children}</Content>
    </Wrapper>
  ) : null;
};
export default Toast;

const Wrapper = styled.div`
  position: fixed;
  top: 100px;
  left: 50%;
  z-index: 2000;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  min-width: 300px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0px 1px 10px 0px rgba(102, 102, 102, 0.1);
  background: #ffffff;
`;

const Content = styled.div`
  margin-left: 10px;
`;

const Icon = styled(SvgIcon)<{ color: string }>`
  color: ${({ color }) => color};
`;

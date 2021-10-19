import React, { CSSProperties, ReactNode, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { Size } from '../typings';
import theme, { SizeMap } from '../theme';

export interface ModalProps {
  open: boolean;
  title?: ReactNode;
  modalStyle?: CSSProperties;
  className?: string;
  bodyStyle?: CSSProperties;
  size?: Size;
  onClose?: () => any;
  showHeader?: boolean;
}
const Modal: React.FC<ModalProps> = ({
  open,
  title = '',
  modalStyle,
  className,
  bodyStyle,
  onClose,
  size = SizeMap.small,
  children,
  showHeader = true,
}) => {
  const [transitioning, toggleTransitioning] = useState<boolean>(false);
  const [exited, setExited] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTransitionEnd = () => {
    // open or close dialog
    setExited(!open);
    toggleTransitioning(false);
  };

  useEffect(() => {
    // open or close dialog
    if ((exited && open) || (!exited && !open)) {
      toggleTransitioning(true);
    }
  }, [open, exited]);

  return mounted
    ? ReactDOM.createPortal(
        <Mask
          onTransitionEnd={handleTransitionEnd}
          open={open}
          transitioning={transitioning}
          exited={exited}
        >
          <Dialog style={modalStyle} className={className} size={size}>
            {showHeader && (
              <Header>
                {title && <Title>{title}</Title>}
                <CloseIcon onClick={onClose}>&times;</CloseIcon>
              </Header>
            )}
            <Body style={bodyStyle}>{children}</Body>
          </Dialog>
        </Mask>,
        document.body,
      )
    : null;
};
Modal.defaultProps = {
  size: SizeMap.small,
  onClose: () => {},
};

export default Modal;

const Mask = styled.div<{
  open: boolean;
  transitioning: boolean;
  exited: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: ${({ open, transitioning, exited }) =>
    open || transitioning || !exited ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  opacity: ${({ open, transitioning, exited }) => {
    if (open) {
      if (transitioning || !exited) {
        return '1';
      }
      return '0';
    } else {
      if (transitioning || !exited) {
        return '0';
      }
      return '1';
    }
  }};
  transition: all 0.2s;
`;

const Dialog = styled.div<{ size: Size }>`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  width: ${({ size }) => theme.modal.size[size]};
  max-width: 80%;
  max-height: 80%;
  background: #ffffff;
`;

const Header = styled.div`
  flex: 0 0 auto;
  position: relative;
  border-radius: 4px;
  padding: 20px;
  background: #f6f6f6;
`;

const Title = styled.h3`
  margin: 0;
  line-height: 1;
  text-align: center;
  font-size: 20px;
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 12px;
  right: 20px;
  display: block;
  color: #000000;
  font-size: 30px;
  line-height: 1;
  cursor: pointer;
`;

const Body = styled.div`
  flex: 1 1 auto;
  border-radius: 4px;
  padding: 20px;
  overflow: auto;
`;

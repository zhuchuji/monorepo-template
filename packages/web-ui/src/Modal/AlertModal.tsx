import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { Size } from '../typings';
import theme, { SizeMap, FontSizeMap } from '../theme';
import Modal, { ModalProps } from './Modal';

interface AlertModalProps extends ModalProps {
  confirmText?: ReactNode;
  onConfirm?: () => any;
}

const ConfirmModal: React.FC<AlertModalProps> = ({
  open,
  confirmText,
  onConfirm,
  modalStyle,
  size = SizeMap.small,
  className,
  children,
  bodyStyle,
}) => {
  return (
    <Modal
      open={open}
      modalStyle={modalStyle}
      className={className}
      size={size}
      showHeader={false}
      bodyStyle={{ padding: 0 }}
    >
      <Content style={bodyStyle}>{children}</Content>
      <ModalAction size={size} onClick={onConfirm}>
        {confirmText}
      </ModalAction>
    </Modal>
  );
};
ConfirmModal.defaultProps = {
  confirmText: '确认',
  onConfirm: () => {},
};

export default ConfirmModal;

const ModalAction = styled.div<{ size: Size }>`
  display: flex;
  justify-content: center;
  font-size: ${({ size }) => FontSizeMap[size]};
  height: 50px;
  font-weight: 500;
  color: ${theme.color.primary};
  cursor: pointer;
`;

const Content = styled.div`
  padding: 30px 20px;
`;

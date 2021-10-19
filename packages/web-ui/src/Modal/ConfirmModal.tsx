import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Modal, { ModalProps } from './Modal';
import Button from '../Button';

interface ConfirmModalProps extends ModalProps {
  cancelText?: ReactNode;
  onCancel?: () => any;
  confirmText?: ReactNode;
  onConfirm?: () => any;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  onClose,
  cancelText,
  onCancel,
  confirmText,
  onConfirm,
  modalStyle,
  size,
  className,
  children,
}) => {
  const handleCancel = () => {
    typeof onClose === 'function' && onClose();
    typeof onCancel === 'function' && onCancel();
  };
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      modalStyle={modalStyle}
      className={className}
      size={size}
    >
      {children}
      <ModalAction>
        <ActionButton color="default" round onClick={handleCancel}>
          {cancelText}
        </ActionButton>
        <ConfirmButton color="primary" round onClick={onConfirm}>
          {confirmText}
        </ConfirmButton>
      </ModalAction>
    </Modal>
  );
};
ConfirmModal.defaultProps = {
  cancelText: '取消',
  confirmText: '确认',
  onCancel: () => {},
  onConfirm: () => {},
};

export default ConfirmModal;

const ModalAction = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const ActionButton = styled(Button)`
  min-width: 100px;
  color: #333333;
`;

const ConfirmButton = styled(Button)`
  min-width: 100px;
  margin-left: 30px;
`;

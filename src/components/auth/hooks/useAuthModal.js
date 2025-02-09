// src/components/auth/hooks/useAuthModal.js
import { useCallback } from 'react';
import { useAuthContext } from '../../../context/AuthContext';

export const useAuthModal = () => {
  const { modalState, openModal, closeModal, navigateToView } = useAuthContext();

  const handleClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  return {
    isOpen: modalState.isOpen,
    currentView: modalState.view,
    randomImage: modalState.randomImage,
    openModal,
    closeModal: handleClose,
    navigateToView
  };
};
import { useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return {
    isModalOpen,
    closeModal,
    openModal,
  };
};

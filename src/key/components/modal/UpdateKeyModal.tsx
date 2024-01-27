import { MainModal } from "@/common/components/modal";
import { UpdateKeyForm } from "../form/UpdateKeyForm";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export const UpdateKeyModal = ({ isOpen, handleClose }: Props) => {
  return (
    <MainModal isOpen={isOpen} handleClose={handleClose}>
      <UpdateKeyForm handleClose={handleClose} />
    </MainModal>
  );
};

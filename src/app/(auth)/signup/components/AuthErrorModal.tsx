'use client';
import { Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

interface AuthErrorModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  error?: string;
}

const AuthErrorModal: React.FC<AuthErrorModalProps> = ({ openModal, setOpenModal, error }) => {
  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size="md" popup>
      <Modal.Header />
      <Modal.Body className="flex flex-col gap-[20px]">
        <div className="text-center">
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14" />
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          {error ?? "Algo deu errado :("}
        </h3>
      </div>
      </Modal.Body>
    </Modal>
  );
}

export default AuthErrorModal;

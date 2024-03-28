import { create } from "zustand";

interface SignUpModalStoreProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useSignUpModal = create<SignUpModalStoreProps>((set) => ({
  isOpen: true,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useSignUpModal;

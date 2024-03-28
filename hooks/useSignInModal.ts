import { create } from "zustand";

interface SignInModalStoreProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useSignInModal = create<SignInModalStoreProps>((set) => ({
  isOpen: true,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useSignInModal;

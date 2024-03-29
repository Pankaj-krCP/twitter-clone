import { create } from "zustand";

interface signUpModalStateProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const signUpModalState = create<signUpModalStateProps>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default signUpModalState;

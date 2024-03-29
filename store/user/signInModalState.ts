import { create } from "zustand";

interface signInModalStateProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const signInModalState = create<signInModalStateProps>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default signInModalState;

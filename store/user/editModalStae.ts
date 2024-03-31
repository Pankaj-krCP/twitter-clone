import { create } from "zustand";

interface editModalStateProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const editModalState = create<editModalStateProps>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default editModalState;

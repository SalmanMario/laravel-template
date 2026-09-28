import { createStore } from '@tanstack/react-store';

export const counterStore = createStore({ count: 0 }, ({ setState }) => ({
    increment: () => setState((state) => ({ ...state, count: state.count + 1 })),
    reset: () => setState((state) => ({ ...state, count: 0 })),
}));

import { create } from 'zustand';
import { toast } from 'react-toastify';
import type { GewogType, GewogUpdateType } from '../types';
import { createGewogApi, deleteGewogApi, getGewogsApi, updateGewogApi } from '../api/gewogApi';

type GewogStore = {
  gewogs: GewogType[];
  loading: boolean;
  error: string | null;

  fetchGewogs: () => Promise<void>;
  createGewog: (payload: GewogUpdateType) => Promise<void>;
  updateGewog: (id: string, payload: GewogUpdateType) => Promise<void>;
  deleteGewog: (id: string) => Promise<void>;
};

// Helper function to safely extract error messages
function getErrorMessage(error: unknown): string {
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as { message: string }).message === 'string'
  ) {
    return (error as { message: string }).message;
  }
  return 'An unknown error occurred';
}

export const useGewogStore = create<GewogStore>((set) => ({
  gewogs: [],
  loading: false,
  error: null,

  fetchGewogs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getGewogsApi();
      set({ gewogs: res.data });
    } catch (err: unknown) {
      const msg = getErrorMessage(err) || 'Failed to fetch gewogs';
      toast.error(msg);
      set({ error: msg });
    } finally {
      set({ loading: false });
    }
  },

  createGewog: async (payload: GewogUpdateType) => {
    set({ loading: true, error: null });
    try {
      const res = await createGewogApi(payload);
      set((state) => ({
        gewogs: [...state.gewogs, res.data],
      }));
      toast.success('Gewog created successfully!');
    } catch (err: unknown) {
      const msg = getErrorMessage(err) || 'Failed to create gewog';
      toast.error(msg);
      set({ error: msg });
    } finally {
      set({ loading: false });
    }
  },

  updateGewog: async (id: string, payload: GewogUpdateType) => {
    set({ loading: true, error: null });
    try {
      await updateGewogApi({ _id: id, ...payload });

      // Refetch the entire list to sync updated data
      const res = await getGewogsApi();
      set({ gewogs: res.data });

      toast.success('Gewog updated successfully!');
    } catch (err: unknown) {
      const msg = getErrorMessage(err) || 'Failed to update gewog';
      toast.error(msg);
      set({ error: msg });
    } finally {
      set({ loading: false });
    }
  },

  deleteGewog: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await deleteGewogApi(id);
      set((state) => ({
        gewogs: state.gewogs.filter((g) => g._id !== id),
      }));
      toast.success('Gewog deleted successfully!');
    } catch (err: unknown) {
      const msg = getErrorMessage(err) || 'Failed to delete gewog';
      toast.error(msg);
      set({ error: msg });
    } finally {
      set({ loading: false });
    }
  },
}));

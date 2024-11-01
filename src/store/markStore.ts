import { Mark } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

interface MarkStoreState {
  marks: Mark[];
  setMarks: (marks: [Mark]) => void;
  mark: Mark | null;
  setMark: (mark: Mark) => void;
  createMark: (mark: Partial<Mark>) => void;
  getMarks: () => void;
  getMark: (_id: string) => void;
  updateMark: (mark: Partial<Mark>) => void;
  deleteMark: (_id: string) => void;
  isNull: boolean;
  setIsNull: (isNull: boolean) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}

const useMarkStore = create<MarkStoreState>((set) => ({
  isNull: false,
  setIsNull: (isNull) => set({ isNull }),
  errorMessage: "",
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  marks: [],
  setMarks: (marks) => set({ marks }),
  mark: null,
  setMark: (mark) => set({ mark }),
  createMark: async (mark) => {
    const loadingToast = toast.loading("Creating mark...");
    try {
      await axios
        .post(`${import.meta.env.API_URL}/mark`, mark)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            toast.success("Mark created successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to create mark`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to create mark`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to create mark`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to create mark`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  getMarks: async () => {
    set({ marks: [] });
    set({ isNull: true });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`${import.meta.env.API_URL}/mark`)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ marks: response.data });
            set({ isNull: false });
          } else if (response.status === 200) {
            set({
              errorMessage:
                response?.data?.message || `Failed to fetch marks`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch marks`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch marks`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch marks`,
      });
    }
  },
  getMark: async (_id) => {
    set({ mark: null });
    set({ isNull: true });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`${import.meta.env.API_URL}/mark/${_id}`)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ mark: response.data });
            set({ isNull: false });
          } else if (response.status === 200) {
            set({
              errorMessage: response?.data?.message || `Mark not found`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch mark`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch mark`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch mark`,
      });
    }
  },
  updateMark: async (mark) => {
    const loadingToast = toast.loading("Updating mark...");
    try {
      await axios
        .put(`${import.meta.env.API_URL}/mark/${mark._id}`, mark)
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success("Mark updated successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 404) {
            toast.error(response?.data?.message || `Mark not found`, {
              id: loadingToast,
              duration: 3000,
            });
          } else {
            toast.error(`Failed to update mark`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to update mark`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to update mark`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  deleteMark: async (_id) => {
    const loadingToast = toast.loading("Deleting mark...");
    try {
      await axios
        .delete(`${import.meta.env.API_URL}/mark/${_id}`)
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success("Mark deleted successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 404) {
            toast.error(response?.data?.message || `Mark not found`, {
              id: loadingToast,
              duration: 3000,
            });
          } else {
            toast.error(`Failed to delete mark`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to delete mark`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to delete mark`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
}));

export default useMarkStore;

import { MarkColumn } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";
import api from "@/config/axios";

interface MarkColumnStoreState {
  markColumns: MarkColumn[];
  setMarkColumns: (markColumns: [MarkColumn]) => void;
  markColumn: MarkColumn | null;
  setMarkColumn: (markColumn: MarkColumn) => void;
  createMarkColumn: (markColumn: Omit<MarkColumn, "_id">) => void;
  getMarkColumns: () => void;
  getMarkColumn: (_id: string) => void;
  updateMarkColumn: (markColumn: MarkColumn) => void;
  deleteMarkColumn: (_id: string) => void;
  isNull: boolean;
  setIsNull: (isNull: boolean) => void;
  isCreateOpen: boolean;
  setIsCreateOpen: (isCreateOpen: boolean) => void;
  isUpdateOpen: boolean;
  setIsUpdateOpen: (isUpdateOpen: boolean) => void;
  isDeleteOpen: boolean;
  setIsDeleteOpen: (isDeleteOpen: boolean) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}

const useMarkColumnStore = create<MarkColumnStoreState>((set) => ({
  isNull: false,
  setIsNull: (isNull) => set({ isNull }),
  isCreateOpen: false,
  setIsCreateOpen: (isCreateOpen) => set({ isCreateOpen }),
  isUpdateOpen: false,
  setIsUpdateOpen: (isUpdateOpen) => set({ isUpdateOpen }),
  isDeleteOpen: false,
  setIsDeleteOpen: (isDeleteOpen) => set({ isDeleteOpen }),
  errorMessage: "",
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  markColumns: [],
  setMarkColumns: (markColumns) => set({ markColumns }),
  markColumn: null,
  setMarkColumn: (markColumn) => set({ markColumn }),
  createMarkColumn: async (markColumn) => {
    const loadingToast = toast.loading("Creating markColumn...");
    try {
      await api
        .post(`/api/markColumn`, markColumn, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({
              markColumns: [
                ...useMarkColumnStore.getState().markColumns,
                response.data,
              ],
            });
            useMarkColumnStore.getState().markColumns.length > 0 &&
              set({ isNull: false });
            toast.success("MarkColumn created successfully", {
              id: loadingToast,
              duration: 3000,
            });
            set({ isCreateOpen: false });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to create markColumn`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to create markColumn`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to create markColumn`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to create markColumn`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  getMarkColumns: async () => {
    set({ markColumns: [] });
    set({ isNull: false });
    set({ errorMessage: "" });
    try {
      await api
        .get(`/api/markColumn`)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ markColumns: response.data });
            if (response.data.length === 0) {
              set({ isNull: true });
            }
          } else if (response.status === 200) {
            set({
              errorMessage:
                response?.data?.message || `Failed to fetch markColumns`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch markColumns`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch markColumns`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch markColumns`,
      });
    }
  },
  getMarkColumn: async (_id) => {
    set({ markColumn: null });
    set({ errorMessage: "" });
    try {
      await api
        .get(`/api/markColumn/${_id}`)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ markColumn: response.data });
          } else if (response.status === 200) {
            set({
              errorMessage: response?.data?.message || `MarkColumn not found`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch markColumn`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch markColumn`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch markColumn`,
      });
    }
  },
  updateMarkColumn: async (markColumn) => {
    const loadingToast = toast.loading("Updating markColumn...");
    try {
      await api
        .put(
          `/api/markColumn/${markColumn._id}`,
          markColumn,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({
              markColumns: useMarkColumnStore
                .getState()
                .markColumns.map((item) =>
                  item._id === markColumn._id ? markColumn : item
                ),
            });
            toast.success("MarkColumn updated successfully", {
              id: loadingToast,
              duration: 3000,
            });
            set({ isUpdateOpen: false });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to update MarkColumn`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to update MarkColumn`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to update MarkColumn`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to update MarkColumn`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  deleteMarkColumn: async (_id) => {
    const loadingToast = toast.loading("Deleting markColumn...");
    try {
      await api
        .delete(`/api/markColumn/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({
              markColumns: useMarkColumnStore
                .getState()
                .markColumns.filter((item) => item._id !== _id),
            });
            useMarkColumnStore.getState().markColumns.length === 0 &&
              set({ isNull: true });
            toast.success("MarkColumn deleted successfully", {
              id: loadingToast,
              duration: 3000,
            });
            set({ isDeleteOpen: false });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to delete markColumn`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to delete markColumn`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to delete markColumn`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to delete markColumn`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
}));

export default useMarkColumnStore;

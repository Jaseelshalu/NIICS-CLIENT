import { MarkColumn } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

interface MarkColumnStoreState {
  markColumns: MarkColumn[];
  setMarkColumns: (markColumns: [MarkColumn]) => void;
  markColumn: MarkColumn | null;
  setMarkColumn: (markColumn: MarkColumn) => void;
  createMarkColumn: (markColumn: Partial<MarkColumn>) => void;
  getMarkColumns: () => void;
  getMarkColumn: (_id: string) => void;
  updateMarkColumn: (markColumn: Partial<MarkColumn>) => void;
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
  setIsDeleteOpen: (isDeleteOpen) => set({ isDeleteOpen }),  errorMessage: "",
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  markColumns: [],
  setMarkColumns: (markColumns) => set({ markColumns }),
  markColumn: null,
  setMarkColumn: (markColumn) => set({ markColumn }),
  createMarkColumn: async (markColumn) => {
    const loadingToast = toast.loading("Creating markColumn...");
    try {
      await axios
        .post(`https://niics-server.vercel.app/api/markColumn`, markColumn,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            toast.success("MarkColumn created successfully", {
              id: loadingToast,
              duration: 3000,
            });
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
    set({ isNull:false });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`https://niics-server.vercel.app/api/markColumn`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ markColumns: response.data });
            set({ isNull: false });
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
    set({ isNull:false });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`https://niics-server.vercel.app/api/markColumn/${_id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ markColumn: response.data });
            set({ isNull: false });
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
      await axios
        .put(`https://niics-server.vercel.app/api/markColumn/${markColumn._id}`, markColumn,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success("MarkColumn updated successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 404) {
            toast.error(response?.data?.message || `MarkColumn not found`, {
              id: loadingToast,
              duration: 3000,
            });
          } else {
            toast.error(`Failed to update markColumn`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to update markColumn`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to update markColumn`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  deleteMarkColumn: async (_id) => {
    const loadingToast = toast.loading("Deleting markColumn...");
    try {
      await axios
        .delete(`https://niics-server.vercel.app/api/markColumn/${_id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success("MarkColumn deleted successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 404) {
            toast.error(response?.data?.message || `MarkColumn not found`, {
              id: loadingToast,
              duration: 3000,
            });
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

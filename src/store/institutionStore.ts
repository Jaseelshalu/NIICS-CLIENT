import api from "@/config/axios";
import { Institution } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface InstitutionStoreState {
  institutions: Institution[];
  setInstitutions: (institutions: [Institution]) => void;
  institution: Institution | null;
  setInstitution: (institution: Institution) => void;
  createInstitution: (institution: Omit<Institution, "_id">) => void;
  getInstitutions: () => void;
  getInstitution: (_id: string) => void;
  updateInstitution: (institution: Institution) => void;
  deleteInstitution: (_id: string) => void;
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

const useInstitutionStore = create<InstitutionStoreState>((set) => ({
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
  institutions: [],
  setInstitutions: (institutions) => set({ institutions }),
  institution: null,
  setInstitution: (institution) => set({ institution }),
  createInstitution: async (institution) => {
    const loadingToast = toast.loading("Creating institution...");
    try {
      await api
        .post(`/api/institution`, institution, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({
              institutions: [
                ...useInstitutionStore.getState().institutions,
                response.data,
              ],
            });
            useInstitutionStore.getState().institutions.length > 0 &&
              set({ isNull: false });
            toast.success("Institution created successfully", {
              id: loadingToast,
              duration: 3000,
            });
            set({ isCreateOpen: false });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to create institution`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to create institution`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to create institution`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to create institution`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  getInstitutions: async () => {
    set({ institutions: [] });
    set({ isNull: false });
    set({ errorMessage: "" });
    try {
      await api
        .get(`/api/institution`)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ institutions: response.data });
            if (response.data.length === 0) {
              set({ isNull: true });
            }
          } else if (response.status === 200) {
            set({
              errorMessage:
                response?.data?.message || `Failed to fetch institutions`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch institutions`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch institutions`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch institutions`,
      });
    }
  },
  getInstitution: async (_id) => {
    set({ institution: null });
    set({ errorMessage: "" });
    try {
      await api
        .get(`/api/institution/${_id}`)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ institution: response.data });
          } else if (response.status === 200) {
            set({
              errorMessage: response?.data?.message || `Institution not found`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch institution`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch institution`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch institution`,
      });
    }
  },
  updateInstitution: async (institution) => {
    const loadingToast = toast.loading("Updating institution...");
    try {
      await api
        .put(
          `/api/institution/${institution._id}`,
          institution,
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
              institutions: useInstitutionStore
                .getState()
                .institutions.map((item) =>
                  item._id === institution._id ? institution : item
                ),
            });
            toast.success("Institution updated successfully", {
              id: loadingToast,
              duration: 3000,
            });
            set({ isUpdateOpen: false });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to update Institution`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to update Institution`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to update Institution`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to update Institution`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  deleteInstitution: async (_id) => {
    const loadingToast = toast.loading("Deleting institution...");
    try {
      await api
        .delete(`/api/institution/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({
              institutions: useInstitutionStore
                .getState()
                .institutions.filter((item) => item._id !== _id),
            });
            useInstitutionStore.getState().institutions.length === 0 &&
              set({ isNull: true });
            toast.success("Institution deleted successfully", {
              id: loadingToast,
              duration: 3000,
            });
            set({ isDeleteOpen: false });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to delete institution`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to delete institution`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to delete institution`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to delete institution`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
}));

export default useInstitutionStore;

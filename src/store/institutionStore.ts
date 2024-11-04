import { Institution } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

interface InstitutionStoreState {
  institutions: Institution[];
  setInstitutions: (institutions: [Institution]) => void;
  institution: Institution | null;
  setInstitution: (institution: Institution) => void;
  createInstitution: (institution: Partial<Institution>) => void;
  getInstitutions: () => void;
  getInstitution: (_id: string) => void;
  updateInstitution: (institution: Partial<Institution>) => void;
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
  setIsDeleteOpen: (isDeleteOpen) => set({ isDeleteOpen }),  errorMessage: "",
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  institutions: [],
  setInstitutions: (institutions) => set({ institutions }),
  institution: null,
  setInstitution: (institution) => set({ institution }),
  createInstitution: async (institution) => {
    const loadingToast = toast.loading("Creating institution...");
    try {
      await axios
        .post(`https://niics-server.vercel.app/api/institution`, institution,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            toast.success("Institution created successfully", {
              id: loadingToast,
              duration: 3000,
            });
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
    set({ isNull:false });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`https://niics-server.vercel.app/api/institution`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ institutions: response.data });
            set({ isNull: false });
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
    set({ isNull:false });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`https://niics-server.vercel.app/api/institution/${_id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ institution: response.data });
            set({ isNull: false });
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
      await axios
        .put(`https://niics-server.vercel.app/api/institution/${institution._id}`, institution,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success("Institution updated successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 404) {
            toast.error(response?.data?.message || `Institution not found`, {
              id: loadingToast,
              duration: 3000,
            });
          } else {
            toast.error(`Failed to update institution`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to update institution`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to update institution`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  deleteInstitution: async (_id) => {
    const loadingToast = toast.loading("Deleting institution...");
    try {
      await axios
        .delete(`https://niics-server.vercel.app/api/institution/${_id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success("Institution deleted successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 404) {
            toast.error(response?.data?.message || `Institution not found`, {
              id: loadingToast,
              duration: 3000,
            });
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

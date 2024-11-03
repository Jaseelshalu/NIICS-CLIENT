import { Applicant } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

interface ApplicantStoreState {
  applicants: Applicant[];
  newApplicant: Applicant | null;
  setNewApplicant: (applicant: Applicant) => void;
  setApplicants: (applicants: [Applicant]) => void;
  getNewApplicant: () => void;
  applicant: Applicant | null;
  setApplicant: (applicant: Applicant) => void;
  createApplicant: (applicant: Partial<Applicant>) => void;
  getApplicants: () => void;
  getApplicant: (_id: string) => void;
  updateApplicant: (applicant: Partial<Applicant>) => void;
  deleteApplicant: (_id: string) => void;
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

const useApplicantStore = create<ApplicantStoreState>((set) => ({
  isNull: false,
setIsNull: (isNull) => set({ isNull }),
  isCreateOpen: false,
  setIsCreateOpen: (isCreateOpen) => set({ isCreateOpen }),
  isUpdateOpen: false,
  setIsUpdateOpen: (isUpdateOpen) => set({ isUpdateOpen }),
  isDeleteOpen: false,
  setIsDeleteOpen: (isDeleteOpen) => set({ isDeleteOpen }),  errorMessage: "",
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  applicants: [],
  newApplicant: null,
  setNewApplicant: (applicant) => {
    // set new applicant to the store and to the local storage
    set({ newApplicant: applicant });
    localStorage.setItem("newApplicant", JSON.stringify(applicant));
  },
  getNewApplicant: () => {
    // get new applicant from the local storage
    const newApplicant = localStorage.getItem("newApplicant");
    if (newApplicant) {
      set({ newApplicant: JSON.parse(newApplicant) });
    }
  },
  setApplicants: (applicants) => set({ applicants }),
  applicant: null,
  setApplicant: (applicant) => set({ applicant }),
  createApplicant: async (applicant) => {
    const loadingToast = toast.loading("Creating applicant...");

    try {
      await axios
        .post(`http://localhost:3000/api/applicant`, applicant, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            toast.success("Applicant created successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to create applicant`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to create applicant`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to create applicant`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to create applicant`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  getApplicants: async () => {
    set({ applicants: [] });
    set({ isNull: true });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`http://localhost:3000/api/applicant`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ applicants: response.data });
            set({ isNull: false });
          } else if (response.status === 200) {
            set({
              errorMessage:
                response?.data?.message || `Failed to fetch applicants`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch applicants`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch applicants`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch applicants`,
      });
    }
  },
  getApplicant: async (_id) => {
    set({ applicant: null });
    set({ isNull: true });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`http://localhost:3000/api/applicant/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ applicant: response.data });
            set({ isNull: false });
          } else if (response.status === 200) {
            set({
              errorMessage: response?.data?.message || `Applicant not found`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch applicant`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch applicant`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch applicant`,
      });
    }
  },
  updateApplicant: async (applicant) => {
    const loadingToast = toast.loading("Updating applicant...");
    try {
      await axios
        .put(
          `http://localhost:3000/api/applicant/${applicant._id}`,
          applicant,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success("Applicant updated successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 404) {
            toast.error(response?.data?.message || `Applicant not found`, {
              id: loadingToast,
              duration: 3000,
            });
          } else {
            toast.error(`Failed to update applicant`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to update applicant`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to update applicant`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  deleteApplicant: async (_id) => {
    const loadingToast = toast.loading("Deleting applicant...");
    try {
      await axios
        .delete(`http://localhost:3000/api/applicant/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success("Applicant deleted successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 404) {
            toast.error(response?.data?.message || `Applicant not found`, {
              id: loadingToast,
              duration: 3000,
            });
          } else {
            toast.error(`Failed to delete applicant`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to delete applicant`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to delete applicant`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
}));

export default useApplicantStore;

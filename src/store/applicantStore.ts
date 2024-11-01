import { Applicant } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

interface ApplicantStoreState {
  applicants: Applicant[];
  newApplicant: Applicant | null;
  setApplicants: (applicants: [Applicant]) => void;
  applicant: Applicant | null;
  setApplicant: (applicant: Applicant) => void;
  createApplicant: (applicant: Partial<Applicant>) => void;
  getApplicants: () => void;
  getApplicant: (_id: string) => void;
  updateApplicant: (applicant: Partial<Applicant>) => void;
  deleteApplicant: (_id: string) => void;
  isNull: boolean;
  setIsNull: (isNull: boolean) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}

const useApplicantStore = create<ApplicantStoreState>((set) => ({
  isNull: false,
  setIsNull: (isNull) => set({ isNull }),
  errorMessage: "",
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  applicants: [],
  newApplicant: null,
  setApplicants: (applicants) => set({ applicants }),
  applicant: null,
  setApplicant: (applicant) => set({ applicant }),
  createApplicant: async (applicant) => {
    const loadingToast = toast.loading("Creating applicant...");
    try {
      await axios
        .post(`${import.meta.env.API_URL}/applicant`, applicant)
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
        .get(`${import.meta.env.API_URL}/applicant`)
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
        .get(`${import.meta.env.API_URL}/applicant/${_id}`)
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
        .put(`${import.meta.env.API_URL}/applicant/${applicant._id}`, applicant)
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
        .delete(`${import.meta.env.API_URL}/applicant/${_id}`)
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

import { Applicant } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

interface ApplicantStoreState {
  applicants: Applicant[];
  setApplicants: (applicants: [Applicant]) => void;
  applicant: Applicant | null;
  setApplicant: (applicant: Applicant) => void;
  createApplicant: (applicant: Applicant) => void;
  getApplicants: () => void;
  getApplicant: (id: string) => void;
  updateApplicant: (applicant: Applicant) => void;
  deleteApplicant: (id: string) => void;
  isNull: boolean;
  setIsNull: (isNull: boolean) => void;
}

const useApplicantStore = create<ApplicantStoreState>((set) => ({
  applicants: [],
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
            toast.error(response?.data?.error || `Failed to create applicant`, {
              id: loadingToast,
              duration: 3000,
            });
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
  getApplicants: async () => {},
  getApplicant: async (id) => {},
  updateApplicant: async (applicant) => {},
  deleteApplicant: async (id) => {},
  isNull: false,
  setIsNull: (isNull) => set({ isNull }),
}));

import { Applicant } from "@/types/types";
import { create } from "zustand";

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
  createApplicant: async (applicant) => {},
  getApplicants: async () => {},
  getApplicant: async (id) => {},
  updateApplicant: async (applicant) => {},
  deleteApplicant: async (id) => {},
  isNull: false,
  setIsNull: (isNull) => set({ isNull }),
}));

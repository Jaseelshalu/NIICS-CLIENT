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
  authApplicant: (number: string, dob: Date) => Promise<Boolean>;
  updateStatus: (_id: string, key: string, value: boolean) => void;
  createApplicant: (applicant: Partial<Applicant>) => Promise<Boolean>;
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
  initialApplicantLoad: (data: Applicant) => void;
}

const useApplicantStore = create<ApplicantStoreState>((set) => ({
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
  authApplicant: async (number, dob) => {
    const loadingToast = toast.loading("Logging In applicant...");
    let auth = false;
    try {
      await axios
        .post(`https://niics-server.vercel.app/api/applicant/auth`, {
          number,
          dob,
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            toast.success("Applicant logged in successfully", {
              id: loadingToast,
              duration: 3000,
            });
            set({ applicant: response.data });
            // set to local storage
            localStorage.setItem("applicant", JSON.stringify(response.data));
            auth = true;
            return true;
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to log in applicant`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
            return false;
          } else {
            toast.error(`Failed to log in applicant`, {
              id: loadingToast,
              duration: 3000,
            });
          }
          return false;
        });
    } catch (error) {
      toast.error(`Failed to log in applicant`, {
        id: loadingToast,
        duration: 3000,
      });
      return false;
    }
    return auth;
  },
  updateStatus: async (_id, key, value) => {
    const loadingToast = toast.loading("Updating status...");
    try {
      await axios
        .put(
          `https://niics-server.vercel.app/api/applicant/update-status/${_id}`,
          { key, value },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            toast.success("Status updated successfully", {
              id: loadingToast,
              duration: 3000,
            });
            set({
              applicants: useApplicantStore
                .getState()
                .applicants.map((applicant) => {
                  if (applicant._id === _id) {
                    return { ...applicant, [key]: value };
                  }
                  return applicant;
                }),
            });
            set({
              isUpdateOpen: false,
            });
          } else if (response.status === 200) {
            toast.error(response?.data?.message || `Failed to update status`, {
              id: loadingToast,
              duration: 3000,
            });
          } else {
            toast.error(`Failed to update status`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        });
    } catch (error) {
      toast.error(`Failed to update status`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  createApplicant: async (applicant) => {
    const loadingToast = toast.loading("Creating applicant...");
    let created = false;

    try {
      await axios
        .post(`https://niics-server.vercel.app/api/applicant`, applicant, {
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
            set({ applicant: response.data });
            // set to local storage
            localStorage.setItem("applicant", JSON.stringify(response.data));
            created = true;
            return true;
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to create applicant`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
            return false;
          } else {
            toast.error(`Failed to create applicant`, {
              id: loadingToast,
              duration: 3000,
            });
            return false;
          }
        })
        .catch((error) => {
          toast.error(`Failed to create applicant`, {
            id: loadingToast,
            duration: 3000,
          });
          return false;
        });
    } catch (error) {
      toast.error(`Failed to create applicant`, {
        id: loadingToast,
        duration: 3000,
      });
      return false;
    }
    return created;
  },
  getApplicants: async () => {
    set({ applicants: [] });
    set({ isNull: false });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`https://niics-server.vercel.app/api/applicant`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ applicants: response.data });
            if (response.data.length === 0) {
              set({ isNull: true });
            }
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
    set({ isNull: false });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`https://niics-server.vercel.app/api/applicant/${_id}`, {
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
          `https://niics-server.vercel.app/api/applicant/${applicant._id}`,
          applicant,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            toast.success("Applicant updated successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 200) {
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
        .delete(`https://niics-server.vercel.app/api/applicant/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            toast.success("Applicant deleted successfully", {
              id: loadingToast,
              duration: 3000,
            });
            set({
              applicants: useApplicantStore
                .getState()
                .applicants.filter((applicant) => applicant._id !== _id),
            });
            set({
              isDeleteOpen: false,
            });
            if (useApplicantStore.getState().applicants.length === 0) {
              set({ isNull: true });
            }
          } else if (response.status === 200) {
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
  initialApplicantLoad: (data) => {
    set({ applicant: data });
  },
}));

export default useApplicantStore;

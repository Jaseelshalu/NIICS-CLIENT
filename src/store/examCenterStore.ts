import { ExamCenter } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

interface ExamCenterStoreState {
  examCenters: ExamCenter[];
  setExamCenters: (examCenters: [ExamCenter]) => void;
  examCenter: ExamCenter | null;
  setExamCenter: (examCenter: ExamCenter) => void;
  createExamCenter: (examCenter: Partial<ExamCenter>) => void;
  getExamCenters: () => void;
  getExamCenter: (_id: string) => void;
  updateExamCenter: (examCenter: Partial<ExamCenter>) => void;
  deleteExamCenter: (_id: string) => void;
  isNull: boolean;
  setIsNull: (isNull: boolean) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}

const useExamCenterStore = create<ExamCenterStoreState>((set) => ({
  isNull: false,
  setIsNull: (isNull) => set({ isNull }),
  errorMessage: "",
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  examCenters: [],
  setExamCenters: (examCenters) => set({ examCenters }),
  examCenter: null,
  setExamCenter: (examCenter) => set({ examCenter }),
  createExamCenter: async (examCenter) => {
    const loadingToast = toast.loading("Creating examCenter...");
    try {
      await axios
        .post(`${import.meta.env.API_URL}/examCenter`, examCenter)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            toast.success("ExamCenter created successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to create examCenter`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to create examCenter`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to create examCenter`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to create examCenter`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  getExamCenters: async () => {
    set({ examCenters: [] });
    set({ isNull: true });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`${import.meta.env.API_URL}/examCenter`)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ examCenters: response.data });
            set({ isNull: false });
          } else if (response.status === 200) {
            set({
              errorMessage:
                response?.data?.message || `Failed to fetch examCenters`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch examCenters`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch examCenters`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch examCenters`,
      });
    }
  },
  getExamCenter: async (_id) => {
    set({ examCenter: null });
    set({ isNull: true });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`${import.meta.env.API_URL}/examCenter/${_id}`)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ examCenter: response.data });
            set({ isNull: false });
          } else if (response.status === 200) {
            set({
              errorMessage: response?.data?.message || `ExamCenter not found`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch examCenter`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch examCenter`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch examCenter`,
      });
    }
  },
  updateExamCenter: async (examCenter) => {
    const loadingToast = toast.loading("Updating examCenter...");
    try {
      await axios
        .put(`${import.meta.env.API_URL}/examCenter/${examCenter._id}`, examCenter)
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success("ExamCenter updated successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 404) {
            toast.error(response?.data?.message || `ExamCenter not found`, {
              id: loadingToast,
              duration: 3000,
            });
          } else {
            toast.error(`Failed to update examCenter`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to update examCenter`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to update examCenter`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  deleteExamCenter: async (_id) => {
    const loadingToast = toast.loading("Deleting examCenter...");
    try {
      await axios
        .delete(`${import.meta.env.API_URL}/examCenter/${_id}`)
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success("ExamCenter deleted successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 404) {
            toast.error(response?.data?.message || `ExamCenter not found`, {
              id: loadingToast,
              duration: 3000,
            });
          } else {
            toast.error(`Failed to delete examCenter`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to delete examCenter`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to delete examCenter`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
}));

export default useExamCenterStore;

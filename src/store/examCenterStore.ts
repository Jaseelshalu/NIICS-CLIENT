import { ExamCenter } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import api from "@/config/axios";

interface ExamCenterStoreState {
  examCenters: ExamCenter[];
  setExamCenters: (examCenters: [ExamCenter]) => void;
  examCenter: ExamCenter | null;
  setExamCenter: (examCenter: ExamCenter) => void;
  createExamCenter: (examCenter: Omit<ExamCenter, "_id">) => void;
  getExamCenters: () => void;
  getExamCenter: (_id: string) => void;
  updateExamCenter: (examCenter: ExamCenter) => void;
  deleteExamCenter: (_id: string) => void;
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

const useExamCenterStore = create<ExamCenterStoreState>((set) => ({
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
  examCenters: [],
  setExamCenters: (examCenters) => set({ examCenters }),
  examCenter: null,
  setExamCenter: (examCenter) => set({ examCenter }),
  createExamCenter: async (examCenter) => {
    const loadingToast = toast.loading("Creating exam center...");
    try {
      await api
        .post(`/api/examCenter`, examCenter, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({
              examCenters: [
                ...useExamCenterStore.getState().examCenters,
                response.data,
              ],
            });
            useExamCenterStore.getState().examCenters.length > 0 &&
              set({ isNull: false });
            toast.success("Exam Center created successfully", {
              id: loadingToast,
              duration: 3000,
            });
            set({ isCreateOpen: false });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to create exam center`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to create exam center`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to create exam center`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to create exam center`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  getExamCenters: async () => {
    set({ examCenters: [] });
    set({ isNull: false });
    set({ errorMessage: "" });
    try {
      await api
        .get(`/api/examCenter`)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ examCenters: response.data });
            if (response.data.length === 0) {
              set({ isNull: true });
            }
          } else if (response.status === 200) {
            set({
              errorMessage:
                response?.data?.message || `Failed to fetch exam centers`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch exam centers`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch exam centers`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch exam centers`,
      });
    }
  },
  getExamCenter: async (_id) => {
    set({ examCenter: null });
    set({ errorMessage: "" });
    try {
      await api
        .get(`/api/examCenter/${_id}`)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ examCenter: response.data });
          } else if (response.status === 200) {
            set({
              errorMessage: response?.data?.message || `ExamCenter not found`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch exam center`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch exam center`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch exam center`,
      });
    }
  },
  updateExamCenter: async (examCenter) => {
    const loadingToast = toast.loading("Updating exam center...");
    try {
      await api
        .put(
          `/api/examCenter/${examCenter._id}`,
          examCenter,
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
              examCenters: useExamCenterStore
                .getState()
                .examCenters.map((item) =>
                  item._id === examCenter._id ? examCenter : item
                ),
            });
            toast.success("Exam Center updated successfully", {
              id: loadingToast,
              duration: 3000,
            });
            set({ isUpdateOpen: false });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to update Exam Center`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to update Exam Center`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to update Exam Center`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to update Exam Center`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  deleteExamCenter: async (_id) => {
    const loadingToast = toast.loading("Deleting exam center...");
    try {
      await api
        .delete(`/api/examCenter/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({
              examCenters: useExamCenterStore
                .getState()
                .examCenters.filter((item) => item._id !== _id),
            });
            useExamCenterStore.getState().examCenters.length === 0 &&
              set({ isNull: true });
            toast.success("Exam Center deleted successfully", {
              id: loadingToast,
              duration: 3000,
            });
            set({ isDeleteOpen: false });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to delete exam center`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to delete exam center`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to delete exam center`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to delete exam center`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
}));

export default useExamCenterStore;

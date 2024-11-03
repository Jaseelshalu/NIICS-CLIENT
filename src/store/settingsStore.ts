import { Settings } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

interface SettingsStoreState {
  settingss: Settings[];
  setSettingss: (settingss: [Settings]) => void;
  settings: Settings | null;
  setSettings: (settings: Settings) => void;
  createSettings: (settings: Partial<Settings>) => void;
  getSettingss: () => void;
  getSettings: (_id: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  deleteSettings: (_id: string) => void;
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

const useSettingsStore = create<SettingsStoreState>((set) => ({
  isNull: false,
setIsNull: (isNull) => set({ isNull }),
  isCreateOpen: false,
  setIsCreateOpen: (isCreateOpen) => set({ isCreateOpen }),
  isUpdateOpen: false,
  setIsUpdateOpen: (isUpdateOpen) => set({ isUpdateOpen }),
  isDeleteOpen: false,
  setIsDeleteOpen: (isDeleteOpen) => set({ isDeleteOpen }),  errorMessage: "",
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  settingss: [],
  setSettingss: (settingss) => set({ settingss }),
  settings: null,
  setSettings: (settings) => set({ settings }),
  createSettings: async (settings) => {
    const loadingToast = toast.loading("Creating settings...");
    try {
      await axios
        .post(`http://localhost:3000/api/settings`, settings,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            toast.success("Settings created successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to create settings`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to create settings`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to create settings`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to create settings`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  getSettingss: async () => {
    set({ settingss: [] });
    set({ isNull: true });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`http://localhost:3000/api/settings`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ settingss: response.data });
            set({ isNull: false });
          } else if (response.status === 200) {
            set({
              errorMessage:
                response?.data?.message || `Failed to fetch settingss`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch settingss`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch settingss`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch settingss`,
      });
    }
  },
  getSettings: async (_id) => {
    set({ settings: null });
    set({ isNull: true });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`http://localhost:3000/api/settings/${_id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ settings: response.data });
            set({ isNull: false });
          } else if (response.status === 200) {
            set({
              errorMessage: response?.data?.message || `Settings not found`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch settings`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch settings`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch settings`,
      });
    }
  },
  updateSettings: async (settings) => {
    const loadingToast = toast.loading("Updating settings...");
    try {
      await axios
        .put(`http://localhost:3000/api/settings/${settings._id}`, settings,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success("Settings updated successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 404) {
            toast.error(response?.data?.message || `Settings not found`, {
              id: loadingToast,
              duration: 3000,
            });
          } else {
            toast.error(`Failed to update settings`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to update settings`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to update settings`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  deleteSettings: async (_id) => {
    const loadingToast = toast.loading("Deleting settings...");
    try {
      await axios
        .delete(`http://localhost:3000/api/settings/${_id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success("Settings deleted successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 404) {
            toast.error(response?.data?.message || `Settings not found`, {
              id: loadingToast,
              duration: 3000,
            });
          } else {
            toast.error(`Failed to delete settings`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to delete settings`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to delete settings`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
}));

export default useSettingsStore;

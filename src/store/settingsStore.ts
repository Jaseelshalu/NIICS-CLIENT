import { Settings } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

interface SettingsStoreState {
  settings: Settings | null;
  setSettings: (settings: Settings) => void;
  getSettings: () => void;
  updateSettings: (settings: Settings) => void;
  isNull: boolean;
  setIsNull: (isNull: boolean) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}

const useSettingsStore = create<SettingsStoreState>((set) => ({
  isNull: false,
  setIsNull: (isNull) => set({ isNull }),
  errorMessage: "",
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  settings: null,
  setSettings: (settings) => set({ settings }),
  getSettings: async () => {
    set({ settings: null });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`https://niics-server.vercel.app/api/settings/`, {})
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ settings: response.data });
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
        .put(`https://niics-server.vercel.app/api/settings/`, settings, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({
              settings: response.data,
            });
            toast.success("Settings updated successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to update Settings`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to update Settings`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to update Settings`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to update Settings`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
}));

export default useSettingsStore;

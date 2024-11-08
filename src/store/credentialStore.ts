import { Credential } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

interface CredentialStoreState {
  credentials: Credential[];
  setCredentials: (credentials: [Credential]) => void;
  credential: Credential | null;
  setCredential: (credential: Credential) => void;
  authCredential: (username: string, password: string) => void;
  createCredential: (credential: Omit<Credential, "_id">) => void;
  getCredentials: () => void;
  getCredential: (_id: string) => void;
  updateCredential: (credential: Credential) => void;
  deleteCredential: (_id: string) => void;
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

const useCredentialStore = create<CredentialStoreState>((set) => ({
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
  credentials: [],
  setCredentials: (credentials) => set({ credentials }),
  credential: null,
  setCredential: (credential) => set({ credential }),
  authCredential: async (userName, password) => {
    const loadingToast = toast.loading("Logging in...");
    try {
      await axios
        .post(
          `https://niics-server.vercel.app/api/credential/login`,
          {
            userName,
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            localStorage.setItem("token", response.data.token);
            toast.success("Logged in successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 200) {
            toast.error(response?.data?.message || `Failed to login`, {
              id: loadingToast,
              duration: 3000,
            });
          } else {
            toast.error(`Failed to login`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to login`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to login`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  createCredential: async (credential) => {
    const loadingToast = toast.loading("Creating credential...");
    try {
      await axios
        .post(`https://niics-server.vercel.app/api/credential`, credential, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({
              credentials: [
                ...useCredentialStore.getState().credentials,
                response.data,
              ],
            });
            useCredentialStore.getState().credentials.length > 0 &&
              set({ isNull: false });
            toast.success("Credential created successfully", {
              id: loadingToast,
              duration: 3000,
            });
            set({ isCreateOpen: false });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to create credential`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to create credential`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to create credential`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to create credential`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  getCredentials: async () => {
    set({ credentials: [] });
    set({ isNull: false });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`https://niics-server.vercel.app/api/credential`)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ credentials: response.data });
            if (response.data.length === 0) {
              set({ isNull: true });
            }
          } else if (response.status === 200) {
            set({
              errorMessage:
                response?.data?.message || `Failed to fetch credentials`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch credentials`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch credentials`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch credentials`,
      });
    }
  },
  getCredential: async (_id) => {
    set({ credential: null });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`https://niics-server.vercel.app/api/credential/${_id}`)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ credential: response.data });
          } else if (response.status === 200) {
            set({
              errorMessage: response?.data?.message || `Credential not found`,
            });
          } else {
            set({
              errorMessage: `Failed to fetch credential`,
            });
          }
        })
        .catch((error) => {
          set({
            errorMessage: `Failed to fetch credential`,
          });
        });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch credential`,
      });
    }
  },
  updateCredential: async (credential) => {
    const loadingToast = toast.loading("Updating credential...");
    try {
      await axios
        .put(
          `https://niics-server.vercel.app/api/credential/${credential._id}`,
          credential,
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
              credentials: useCredentialStore
                .getState()
                .credentials.map((item) =>
                  item._id === credential._id ? credential : item
                ),
            });
            toast.success("Credential updated successfully", {
              id: loadingToast,
              duration: 3000,
            });
            set({ isUpdateOpen: false });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to update Credential`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to update Credential`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to update Credential`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to update Credential`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  deleteCredential: async (_id) => {
    const loadingToast = toast.loading("Deleting credential...");
    try {
      await axios
        .delete(`https://niics-server.vercel.app/api/credential/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({
              credentials: useCredentialStore
                .getState()
                .credentials.filter((item) => item._id !== _id),
            });
            useCredentialStore.getState().credentials.length === 0 &&
              set({ isNull: true });
            toast.success("Credential deleted successfully", {
              id: loadingToast,
              duration: 3000,
            });
            set({ isDeleteOpen: false });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to delete credential`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to delete credential`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to delete credential`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to delete credential`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
}));

export default useCredentialStore;

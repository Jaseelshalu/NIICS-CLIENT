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
  createCredential: (credential: Partial<Credential>) => void;
  getCredentials: () => void;
  getCredential: (_id: string) => void;
  updateCredential: (credential: Partial<Credential>) => void;
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
  setIsDeleteOpen: (isDeleteOpen) => set({ isDeleteOpen }),  errorMessage: "",
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  credentials: [],
  setCredentials: (credentials) => set({ credentials }),
  credential: null,
  setCredential: (credential) => set({ credential }),
  authCredential: async (username, password) => {
    const loadingToast = toast.loading("Authenticating credential...");
    try {
      await axios
        .post(`http://localhost:3000/api/credential/login`, {
          username,
          password,
        },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            toast.success("Credential authenticated successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 200) {
            toast.error(
              response?.data?.message || `Failed to authenticate credential`,
              {
                id: loadingToast,
                duration: 3000,
              }
            );
          } else {
            toast.error(`Failed to authenticate credential`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to authenticate credential`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to authenticate credential`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  createCredential: async (credential) => {
    const loadingToast = toast.loading("Creating credential...");
    try {
      await axios
        .post(`http://localhost:3000/api/credential`, credential,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            toast.success("Credential created successfully", {
              id: loadingToast,
              duration: 3000,
            });
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
    set({ isNull: true });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`http://localhost:3000/api/credential`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ credentials: response.data });
            set({ isNull: false });
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
    set({ isNull: true });
    set({ errorMessage: "" });
    try {
      await axios
        .get(`http://localhost:3000/api/credential/${_id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            set({ credential: response.data });
            set({ isNull: false });
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
          `http://localhost:3000/api/credential/${credential._id}`,
          credential
        ,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success("Credential updated successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 404) {
            toast.error(response?.data?.message || `Credential not found`, {
              id: loadingToast,
              duration: 3000,
            });
          } else {
            toast.error(`Failed to update credential`, {
              id: loadingToast,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(`Failed to update credential`, {
            id: loadingToast,
            duration: 3000,
          });
        });
    } catch (error) {
      toast.error(`Failed to update credential`, {
        id: loadingToast,
        duration: 3000,
      });
    }
  },
  deleteCredential: async (_id) => {
    const loadingToast = toast.loading("Deleting credential...");
    try {
      await axios
        .delete(`http://localhost:3000/api/credential/${_id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success("Credential deleted successfully", {
              id: loadingToast,
              duration: 3000,
            });
          } else if (response.status === 404) {
            toast.error(response?.data?.message || `Credential not found`, {
              id: loadingToast,
              duration: 3000,
            });
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

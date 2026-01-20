import { IProfileData } from "../types/user";
import api from "./api";

export const getUserProfile = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const updateUserProfile = async (profileData: IProfileData) => {
  const response = await api.put("/users/update", profileData);
  return response.data;
};

export const updateUserById = async (id: string, profileData: IProfileData) => {
  const response = await api.patch(`/admin/user`, {
    userId: id,
    updates: profileData,
  });
  return response.data;
};

export const removeCode = async (id: string) => {
  const response = await api.patch(`/admin/remove-code`, {
    userId: id,
  });
  return response.data;
};

export const resetPin = async (id: string) => {
  const response = await api.post(`/admin/reset-pin`, {
    userId: id,
  });
  return response.data;
};

export const fetchAllUsers = async (data?: { search?: string }) => {
  try {
    const response = await api.get("/users/all", {
      params: { ...data },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const createTransactionCode = async (data: {
  transactionCode: string;
}) => {
  try {
    await api.post<string>("/users/create-transaction-code", data);
    return true;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/admin/user/${id}`);
  return response.data;
};

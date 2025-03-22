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

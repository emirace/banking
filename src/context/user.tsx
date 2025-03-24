import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  createTransactionCode,
  getUserProfile,
  updateUserProfile,
} from "../services/user";
import { IProfileData, IUser } from "../types/user";

// Define the context types
interface UserContextType {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  getUser: () => Promise<void>;
  updateUser: (profileData: IProfileData) => Promise<void>;
  createTxnCode: (data: { transactionCode: string }) => void;
  logout: () => void;
  stats: {
    currentMonth: {
      deposits: number;
      transfers: number;
    };
    lastMonth: {
      deposits: number;
      transfers: number;
    };
    increasePercentage: {
      deposits: string;
      transfers: string;
    };
  };
}

// Create the context with a default value of null
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider Component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    currentMonth: {
      deposits: 0,
      transfers: 0,
    },
    lastMonth: {
      deposits: 0,
      transfers: 0,
    },
    increasePercentage: {
      deposits: "",
      transfers: "",
    },
  });

  // Function to fetch the user profile
  const getUser = async () => {
    try {
      const data = await getUserProfile();
      setUser(data.user);
      setStats(data.stats);
    } catch (err: any) {
      throw err;
    }
  };

  // Function to update the user profile
  const updateUser = async (profileData: IProfileData) => {
    try {
      const updatedUser = await updateUserProfile(profileData);
      setUser(updatedUser);
    } catch (err: any) {
      throw err;
    }
  };

  const createTxnCode = async (data: { transactionCode: string }) => {
    try {
      await createTransactionCode(data);
      setUser(
        (prev) => ({ ...prev, hasTransactionCode: true } as IUser | null)
      );
    } catch (error) {
      console.error("Failed to register:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    // googleLogout();
    localStorage.removeItem("authToken");
  };

  // Fetch the user profile when the component is mounted
  useEffect(() => {
    setLoading(true);
    getUser()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch user profile");
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        stats,
        getUser,
        updateUser,
        createTxnCode,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

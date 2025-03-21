import api from "./api";

export const fundUser = (data: {
  userId: string;
  amount: number;
  createdAt?: string;
}) => api.post(`/admin/fund`, data).then((res) => res.data);

// Admin debit user (deduct balance)
export const debitUser = (data: {
  userId: string;
  amount: number;
  createdAt?: string;
}) => api.post(`/admin/debit`, data).then((res) => res.data);

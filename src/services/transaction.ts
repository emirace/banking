import api from "./api";

// Fetch user transactions (filtered by type if provided)
export const getUserTransactions = (type?: string) =>
  api
    .get(`/transactions`, { params: type ? { type } : {} })
    .then((res) => res.data);

// Fetch all transactions (Admin only)
export const getAllTransactions = (type?: string) =>
  api
    .get(`/transactions/admin`, { params: type ? { type } : {} })
    .then((res) => res.data);

// Approve transaction (Admin only)
export const approveTransaction = (transactionId: string) =>
  api.post(`/deposit/approve`, { transactionId }).then((res) => res.data);

// Decline transaction (Admin only)
export const declineTransaction = (transactionId: string, reason: string) =>
  api
    .post(`/deposit/decline`, { transactionId, reason })
    .then((res) => res.data);

export const deposit = (amount: number, method: string, receipt: string) =>
  api.post(`/deposit`, { amount, method, receipt }).then((res) => res.data);

export const makeTransfer = (transferData: {
  accountNumber: string;
  bankName: string;
  accountName: string;
  amount: string;
  iban?: string;
  swiftCode?: string;
}) => api.post(`/transfer`, transferData).then((res) => res.data);

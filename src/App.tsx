import { Routes } from "react-router";
import { Route } from "react-router";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import Overview from "./pages/dashboard/overview";
import Transactions from "./pages/dashboard/transactions";
import Transfer from "./pages/dashboard/transfer";
import Deposit from "./pages/dashboard/deposit";
import ToastNotification from "./pages/_components/toastNotification";
import User from "./pages/dashboard/user";
import AdminSettings from "./pages/dashboard/AdminSetting";
import Profile from "./pages/dashboard/settings";
import AllTransactions from "./pages/dashboard/allTransaction";
import AboutUs from "./pages/about";
import Service from "./pages/services";
import ProtectedRoute from "./pages/_components/protectedRoute";
import TransactionCode from "./pages/transactionCode";
import AdminChat from "./pages/dashboard/support";
import Contact from "./pages/contact";
import UserSupport from "./pages/dashboard/userSupport";

function App() {
  return (
    <div className="font-dmsans md:text-lg">
      <ToastNotification />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/code" element={<TransactionCode />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="transfer" element={<Transfer />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="user" element={<User />} />
            <Route path="user" element={<User />} />
            <Route path="admin-settings" element={<AdminSettings />} />
            <Route path="settings" element={<Profile />} />
            <Route path="all-transactions" element={<AllTransactions />} />
            <Route path="support" element={<AdminChat />} />
            <Route path="support-user" element={<UserSupport />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

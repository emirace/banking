import { ReactNode } from "react";
import { ToastNotificationProvider } from "./toastNotification";
import { UserProvider } from "./user";
import { SettingProvider } from "./setting";

function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastNotificationProvider>
      <UserProvider>
        <SettingProvider>{children}</SettingProvider>
      </UserProvider>
    </ToastNotificationProvider>
  );
}

export default Providers;

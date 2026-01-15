"use client";

import { useTranslations } from "next-intl";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton() {
  const t = useTranslations("Header.Logout");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/users/logout");
      if (response.status === 200) {
        document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        toast.success(t("success"));
        router.refresh();
        setTimeout(() => {
          router.push("/");
        }, 500);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || t("error"));
      } else {
        toast.error(t("error"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
    >
      <LogOut className="w-4 h-4" />
      <span>{t("title")}</span>
      {isLoading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
    </button>
  );
}
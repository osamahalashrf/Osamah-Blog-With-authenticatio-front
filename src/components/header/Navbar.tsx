"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import {
  Home,
  FileText,
  Info,
  Settings,
  X,
  ChevronDown,
  BookOpen,
  LogOut,
  Moon,
  Sun,
  Globe,
  Menu
} from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import MobileMenuPortal from "./MobileMenuPortal";

interface NavbarProps {
  userPayload: any; // تغيير من isAdmin إلى userPayload
}

export default function Navbar({ userPayload }: NavbarProps) {
  const t = useTranslations("Header");
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [localUserPayload, setLocalUserPayload] = useState(userPayload); // استخدام حالة محلية
  const [isLoading, setIsLoading] = useState(false);

  useBodyScrollLock(isMobileMenuOpen);


  useEffect(() => {
    setLocalUserPayload(userPayload);
  }, [userPayload]);

  // التحقق من حالة المستخدم
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('jwtToken='))
      ?.split('=')[1];

    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        setLocalUserPayload(payload);
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, []);

  // إغلاق القائمة عند تغيير المسار
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const navItems = [
    { href: "/", label: t("home"), icon: Home },
    { href: "/articles", label: t("articles"), icon: FileText },
    {
      href: "/guide?tab=frontend",
      label: t("guide.title"),
      icon: BookOpen,
      dropdown: [
        { href: "/guide?tab=frontend", label: t("guide.frontend") },
        { href: "/guide?tab=backend", label: t("guide.backend") },
        { href: "/guide?tab=mobile", label: t("guide.mobile") },
        { href: "/guide?tab=devops", label: t("guide.devops") },
        { href: "/guide?tab=ai", label: t("guide.ai") },
        { href: "/guide?tab=security", label: t("guide.security") },
      ]
    },
    { href: "/about", label: t("about"), icon: Info },
  ];

  // استخدم localUserPayload بدلاً من userPayload المباشر
  if (localUserPayload?.isAdmin) {
    navItems.push({
      href: "/admin",
      label: t("admin"),
      icon: Settings
    });
  }

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/users/logout");
      if (response.status === 200) {
        document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        toast.success(t("Logout.success"));
        setLocalUserPayload(null);
        setIsMobileMenuOpen(false);
        router.refresh();
        router.replace(`/${locale}/`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || t("Logout.error"));
      } else {
        toast.error(t("Logout.error"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchLanguage = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
        {navItems.map((item) => (
          <div key={item.href} className="relative"
            onMouseEnter={() => item.dropdown && setActiveDropdown(item.href)}
            onMouseLeave={() => item.dropdown && setActiveDropdown(null)}>
            <Link
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-all duration-300 group"
            >
              <item.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
              <span className="font-medium group-hover:text-primary transition-colors">
                {item.label}
              </span>
              {item.dropdown && (
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.href ? 'rotate-180' : ''
                  }`} />
              )}
            </Link>

            {item.dropdown && activeDropdown === item.href && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
              >
                {item.dropdown.map((subItem, index) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  >
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {subItem.label}
                    </span>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        aria-label={t("menu")}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenuPortal>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 md:hidden"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto"
              >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-primary/10 rounded-xl">
                        <div className="w-7 h-7 bg-gradient-to-br from-primary to-purple-600 rounded-lg" />
                      </div>
                      <div>
                        <span className="font-bold text-lg block text-gray-900 dark:text-white">
                          {t("logoPart1")}{t("logoPart2")}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {t("tagline")}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                </div>

                {/* User Info */}
                {/* هنا التغيير الهام: استخدم localUserPayload */}
                {localUserPayload ? (
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-primary/5 to-purple-500/5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {localUserPayload.username?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {localUserPayload.username}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {localUserPayload.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-4 py-2.5 bg-primary text-white rounded-lg font-medium text-center hover:bg-primary/90 transition-colors"
                      >
                        {t("login")}
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-4 py-2.5 border border-primary text-primary rounded-lg font-medium text-center hover:bg-primary/5 transition-colors"
                      >
                        {t("register")}
                      </Link>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <div className="p-4">
                  <h3 className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t("menu")}
                  </h3>
                  <nav className="space-y-1">
                    {navItems.map((item, index) => (
                      <div key={item.href}>
                        {item.dropdown ? (
                          <div className="px-2">
                            <button
                              onClick={() => setActiveDropdown(
                                activeDropdown === item.href ? null : item.href
                              )}
                              className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <item.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {item.label}
                                </span>
                              </div>
                              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${activeDropdown === item.href ? 'rotate-180' : ''
                                }`} />
                            </button>

                            {activeDropdown === item.href && (
                              <div className="ml-10 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-4">
                                {item.dropdown.map((subItem) => (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mx-2"
                          >
                            <item.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {item.label}
                            </span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Settings Section */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800 mt-4">
                  <h3 className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    الإعدادات
                  </h3>

                  {/* Theme Toggle */}
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {theme === "dark" ? (
                        <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      ) : (
                        <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      )}
                      <span className="font-medium text-gray-900 dark:text-white">المظهر</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {theme === "dark" ? "داكن" : "فاتح"}
                    </span>
                  </button>

                  {/* Language Switcher */}
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-3 mb-2">
                      <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      <span className="font-medium text-gray-900 dark:text-white">اللغة</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => switchLanguage("ar")}
                        className={`flex-1 px-3 py-2 rounded-lg border transition-colors ${locale === "ar"
                          ? "bg-primary text-white border-primary"
                          : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                      >
                        العربية
                      </button>
                      <button
                        onClick={() => switchLanguage("en")}
                        className={`flex-1 px-3 py-2 rounded-lg border transition-colors ${locale === "en"
                          ? "bg-primary text-white border-primary"
                          : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                      >
                        English
                      </button>
                    </div>
                  </div>

                  {/* Logout Button */}
                  {localUserPayload && (
                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors mt-2"                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium flex-1 text-right">
                        {t("logout")}
                      </span>
                      {isLoading && (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      )}
                    </button>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
                  <p className="text-gray-900 dark:text-white">© 2024 {t("logoPart1")}{t("logoPart2")}</p>
                  <p className="mt-1">{t("tagline")}</p>
                </div>
              </motion.div>
            </motion.div>
          </MobileMenuPortal>

        )}
      </AnimatePresence>
    </>
  );
}
import { Link } from "@/i18n/navigation";
import Navbar from "./Navbar";
import LanguageSwitcher from "../LanguageSwitcher";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/Utils/verifyToken";
import LogoutButton from "./LogoutButton";
import { getTranslations } from "next-intl/server";
import { Search } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

export default async function Header() {
  const t = await getTranslations("Header");

  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const userPayload = verifyTokenForPage(token);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - Always visible */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="p-2 bg-primary/10 rounded-lg">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-purple-600 rounded" />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-xl font-bold text-gradient">
              {t("logoPart1")}
              <span className="text-primary">{t("logoPart2")}</span>
            </span>
            <span className="text-xs text-muted-foreground">
              {t("tagline")}
            </span>
          </div>
          <div className="md:hidden text-xl font-bold text-gradient">
            {t("logoPart1")}
            <span className="text-primary">{t("logoPart2")}</span>
          </div>
        </Link>

        {/* Desktop Navigation & Mobile Menu Button */}
        {/* هنا تمرير userPayload كاملاً */}
        <Navbar userPayload={userPayload} />

        {/* Desktop Navigation & Mobile Menu Button */}
        {/* <Navbar isAdmin={userPayload?.isAdmin || false} /> */}

        {/* Desktop Right Side - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          {/* Search Button */}
          <button 
            className="p-2 hover:bg-muted rounded-lg transition-colors relative group"
            aria-label={t("search")}
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {userPayload ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {userPayload.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium hidden lg:inline-block">
                    {userPayload.username}
                  </span>
                </div>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium hover:text-primary transition-colors px-3 py-2"
                >
                  {t("login")}
                </Link>
                <Link
                  href="/register"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300"
                >
                  {t("register")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
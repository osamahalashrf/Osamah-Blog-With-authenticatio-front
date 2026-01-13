import { Link } from "@/i18n/navigation";
import Navbar from "./Navbar";
import LanguageSwitcher from "../LanguageSwitcher";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/Utils/verifyToken";
import LogoutButton from "./LogoutButton";
import { getTranslations } from "next-intl/server";
import { Search, Menu } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

export default async function Header() {
  const t = await getTranslations("Header");

  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const userPayload = verifyTokenForPage(token);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-purple-600 rounded" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gradient">
              {t("logoPart1")}
              <span className="text-primary">{t("logoPart2")}</span>
            </span>
            <span className="text-xs text-muted-foreground">
              {t("tagline")}
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <Navbar isAdmin={userPayload?.isAdmin || false} />

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {userPayload ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {userPayload.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{userPayload.username}</span>
                </div>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {t("login")}
                </Link>
                <Link
                  href="/register"
                  className="btn-primary text-sm px-4 py-2"
                >
                  {t("register")}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
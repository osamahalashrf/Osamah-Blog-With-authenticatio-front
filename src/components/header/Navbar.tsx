"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { Home, FileText, Info, Settings, X, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  isAdmin: boolean;
}

export default function Navbar({ isAdmin }: NavbarProps) {
  const t = useTranslations("Header");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { 
      href: "/", 
      label: t("home"), 
      icon: Home 
    },
    { 
      href: "/articles", 
      label: t("articles"), 
      icon: FileText,
      dropdown: [
        { href: "/articles?category=frontend", label: "Frontend" },
        { href: "/articles?category=backend", label: "Backend" },
        { href: "/articles?category=mobile", label: "Mobile" },
      ]
    },
    { 
      href: "/about", 
      label: t("about"), 
      icon: Info 
    },
  ];

  if (isAdmin) {
    navItems.push({ 
      href: "/admin", 
      label: t("admin"), 
      icon: Settings 
    });
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`hidden md:flex items-center gap-1 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}>
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
            onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
            onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
          >
            <Link
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-all duration-300 group"
            >
              <item.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
              <span className="font-medium group-hover:text-primary transition-colors">
                {item.label}
              </span>
              {item.dropdown && (
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                  activeDropdown === item.label ? 'rotate-180' : ''
                }`} />
              )}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                scrolled ? 'w-0 group-hover:w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>

            {/* Dropdown Menu */}
            {item.dropdown && (
              <AnimatePresence>
                {activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border z-50"
                  >
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-3 hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`md:hidden p-2 hover:bg-muted rounded-lg transition-all duration-300 ${
          scrolled ? 'bg-background/80 backdrop-blur-sm' : ''
        }`}
      >
        <div className="space-y-1.5">
          <span className="block w-6 h-0.5 bg-foreground transition-transform duration-300" />
          <span className="block w-6 h-0.5 bg-foreground transition-transform duration-300" />
          <span className="block w-4 h-0.5 bg-foreground transition-transform duration-300" />
        </div>
      </motion.button>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
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
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-background shadow-2xl"
            >
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-xl">
                      <div className="w-7 h-7 bg-gradient-to-br from-primary to-purple-600 rounded-lg" />
                    </div>
                    <div>
                      <span className="font-bold text-lg">{t("logoPart1")}{t("logoPart2")}</span>
                      <div className="text-xs text-muted-foreground">
                        {t("tagline")}
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => (
                    <motion.div
                      key={item.href}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <item.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {item.label}
                        </span>
                        {item.dropdown && (
                          <ChevronDown className="w-4 h-4 ml-auto transition-transform group-hover:rotate-180" />
                        )}
                      </Link>
                      {item.dropdown && (
                        <div className="ml-8 pl-4 border-l border-muted space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className="block py-2 px-3 text-sm hover:text-primary transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
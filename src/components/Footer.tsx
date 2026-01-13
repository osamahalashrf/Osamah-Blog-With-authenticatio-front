import { useTranslations } from "next-intl";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("Footer");

  const links = [
    { href: "/", label: t("home") },
    { href: "/articles", label: t("articles") },
    { href: "/about", label: t("about") },
    { href: "/privacy", label: t("privacy") },
    { href: "/terms", label: t("terms") },
  ];

  const categories = [
    t("categoriesItems.frontend"),
    t("categoriesItems.backend"),
    t("categoriesItems.mobile"),
    t("categoriesItems.devops"),
    t("categoriesItems.cloud"),
    t("categoriesItems.programming"),
    t("categoriesItems.others"),
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-gray-100 dark:from-gray-900 dark:to-gray-950 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-purple-600 rounded" />
              </div>
              <span className="text-xl font-bold text-gradient">
                {t("logoPart1")}
                <span className="text-primary">{t("logoPart2")}</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              {t("description")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-muted hover:bg-primary/10 rounded-lg transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("categories")}</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-muted hover:bg-primary/10 rounded-full text-sm cursor-pointer transition-colors"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("newsletter")}</h3>
            <p className="text-muted-foreground mb-4">
              {t("newsletterText")}
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="btn-primary w-full"
              >
                {t("subscribe")}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>{t("copyright")}</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
}
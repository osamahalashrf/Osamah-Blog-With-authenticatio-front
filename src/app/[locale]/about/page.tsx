"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Users,
  Target,
  Eye,
  Heart,
  Award,
  BookOpen,
  MessageSquare,
  Code,
  Globe,
  Sparkles,
  TrendingUp,
  Zap,
  Mail,
  Linkedin,
  Twitter,
  Github,
  Star,
  Shield,
  Clock
} from "lucide-react";

const teamMembers = [
  {
    name: "أحمد محمد",
    role: "مؤسس ورئيس التحرير",
    description: "مطور برمجيات بخبرة 10 سنوات في مجال تطوير الويب وتقنيات JavaScript.",
    imageColor: "from-blue-500 to-cyan-500"
  },
  {
    name: "سارة علي",
    role: "مديرة المحتوى",
    description: "متخصصة في كتابة المحتوى التقني وترجمة المصادر التقنية العالمية للعربية.",
    imageColor: "from-purple-500 to-pink-500"
  },
  {
    name: "محمد خالد",
    role: "مطور ومحرر تقني",
    description: "خبير في تقنيات Backend وأنظمة قواعد البيانات وأمن المعلومات.",
    imageColor: "from-green-500 to-emerald-500"
  },
  {
    name: "علي حسن",
    role: "مصمم واجهات المستخدم",
    description: "متخصص في تجربة المستخدم وتصميم الواجهات التفاعلية الحديثة.",
    imageColor: "from-orange-500 to-red-500"
  }
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Mail, href: "mailto:contact@techblog.com", label: "Email" }
];

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-purple-500/5 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 opacity-20" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">{t("subtitle")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="text-gradient">{t("title")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <BookOpen className="w-5 h-5" />
                استكشف المقالات
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Users className="w-5 h-5" />
                {t("ctaButton")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gradient">
              {t("statsTitle")}
            </h2>
            <p className="text-muted-foreground">
              نفتخر بما حققناه مع مجتمعنا الرائع
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {t.raw("stats").map((stat: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-3xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t("missionTitle")}
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {t("mission")}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Eye className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t("visionTitle")}
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {t("vision")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              {t("valuesTitle")}
            </h2>
            <p className="text-muted-foreground">
              المبادئ التي نؤمن بها ونعمل بها
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.raw("values").map((value: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${index === 0 ? "from-blue-500 to-cyan-500" :
                    index === 1 ? "from-green-500 to-emerald-500" :
                      index === 2 ? "from-purple-500 to-pink-500" :
                        "from-orange-500 to-red-500"
                  } flex items-center justify-center mb-4`}>
                  {index === 0 ? <Award className="w-6 h-6 text-white" /> :
                    index === 1 ? <Users className="w-6 h-6 text-white" /> :
                      index === 2 ? <TrendingUp className="w-6 h-6 text-white" /> :
                        <Shield className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              {t("featuresTitle")}
            </h2>
            <p className="text-muted-foreground">
              ما يميز منصتنا عن غيرها
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.raw("features").map((feature: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${index === 0 ? "from-blue-500 to-cyan-500" :
                    index === 1 ? "from-green-500 to-emerald-500" :
                      index === 2 ? "from-purple-500 to-pink-500" :
                        "from-orange-500 to-red-500"
                  } flex items-center justify-center mb-4`}>
                  {index === 0 ? <BookOpen className="w-6 h-6 text-white" /> :
                    index === 1 ? <Code className="w-6 h-6 text-white" /> :
                      index === 2 ? <Zap className="w-6 h-6 text-white" /> :
                        <MessageSquare className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              {t("teamTitle")}
            </h2>
            <p className="text-muted-foreground">
              {t("teamDescription")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className={`h-40 bg-gradient-to-r ${member.imageColor} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="w-16 h-16 text-white/50" />
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-white to-purple-500/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">{t("ctaTitle")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              {t("ctaDescription")}
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {t("ctaButton")}
              <Users className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-gradient">
              {t("contactTitle")}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t("contactDescription")}
            </p>

            <div className="flex justify-center gap-4 mb-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 hover:scale-105"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </a>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-primary" />
                <span className="font-medium">contact@techblog.com</span>
              </div>
              <p className="text-sm text-muted-foreground">
                نرد على جميع الاستفسارات خلال 24 ساعة
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
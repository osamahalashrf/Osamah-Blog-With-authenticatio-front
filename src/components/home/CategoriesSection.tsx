"use client";

import { motion } from "framer-motion";
import { Code, Database, Smartphone, Cloud, Cpu, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const categories = [
  { icon: Code, label: "Frontend", count: 45, color: "from-blue-500 to-cyan-500" },
  { icon: Database, label: "Backend", count: 38, color: "from-green-500 to-emerald-500" },
  { icon: Smartphone, label: "Mobile", count: 28, color: "from-purple-500 to-pink-500" },
  { icon: Cloud, label: "DevOps", count: 32, color: "from-orange-500 to-red-500" },
  { icon: Cpu, label: "الذكاء الاصطناعي", count: 25, color: "from-indigo-500 to-purple-500" },
  { icon: Lock, label: "الأمان", count: 18, color: "from-red-500 to-orange-500" },
];

export default function CategoriesSection() {

    const t = useTranslations("CategoriesSection");

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">{t("title")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`/articles?category=${category.label}`}
                className="group block bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {category.count} مقال
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {category.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  اكتشف أحدث المقالات في مجال {category.label}
                </p>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      عرض المقالات
                    </span>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-purple-600 group-hover:scale-150 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
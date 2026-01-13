"use client";

import { motion } from "framer-motion";
import { Code, Database, Smartphone, Cloud, Cpu, Lock, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

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
    const params = useParams();
    const locale = params.locale as string;

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold mb-4"
                        >
                            <span className="text-gradient">{t("title")}</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground max-w-2xl"
                        >
                            {t("subtitle")}
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mt-6 lg:mt-0"
                    >
                        <Link
                            href={`/${locale}/guide?tab=frontend`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium group"
                        >
                            <BookOpen className="w-5 h-5" />
                            استعرض الدليل الشامل
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link
                                href={`/${locale}/guide?tab=${category.label.toLowerCase()}`}
                                className="group block bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20"
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
                                <p className="text-sm text-muted-foreground mb-4">
                                    اكتشف أحدث المقالات في مجال {category.label}
                                </p>
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium group-hover:text-primary transition-colors flex items-center gap-2">
                                            استعرض الدليل
                                            <span className="w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
                                                →
                                            </span>
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
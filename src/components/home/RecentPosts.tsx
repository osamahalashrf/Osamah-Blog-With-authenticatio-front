"use client";

import { motion } from "framer-motion";
import { Calendar, User, Eye } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "use-intl";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

const recentPosts = [
    {
        id: 1,
        title: "أفضل ممارسات JavaScript الحديثة",
        excerpt: "تعرف على أفضل الممارسات والتقنيات الحديثة في JavaScript",
        author: "أحمد محمد",
        date: "2024-01-12",
        views: 1245,
        readTime: 5,
    },
    {
        id: 2,
        title: "بناء REST API باستخدام Express.js",
        excerpt: "دليل شامل لبناء واجهات برمجة تطبيقات RESTful",
        author: "سارة علي",
        date: "2024-01-11",
        views: 892,
        readTime: 8,
    },
    {
        id: 3,
        title: "تحسين أداء تطبيقات React",
        excerpt: "تقنيات متقدمة لتحسين أداء تطبيقات React.js",
        author: "محمد خالد",
        date: "2024-01-10",
        views: 1567,
        readTime: 6,
    },
    {
        id: 4,
        title: "Docker للمطورين المبتدئين",
        excerpt: "مقدمة شاملة للحاويات وتقنية Docker",
        author: "علي حسن",
        date: "2024-01-09",
        views: 2103,
        readTime: 10,
    },
];

function PostCard({ post, index, locale, t }: {
    post: typeof recentPosts[0];
    index: number;
    locale: string;
    t: (key: string) => string;
}) {
    const [formattedViews, setFormattedViews] = useState<string>(post.views.toString());

    useEffect(() => {
        setFormattedViews(post.views.toLocaleString(locale));
    }, [post.views, locale]);

    return (
        <motion.article
            key={post.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
        >
            <Link
                href={`/articles/${post.id}`}
                className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
            >
                <div className="flex-1">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{formattedViews} مشاهدة</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">
                            {post.readTime} دقيقة للقراءة
                        </span>
                        <span className="text-sm font-medium group-hover:text-primary transition-colors">
                            {t("readMore")}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

export default function RecentPosts() {
    const t = useTranslations("RecentPosts");
    const locale = useLocale();

    return (
        <section className="py-20">
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
                    <p className="text-muted-foreground">
                        {t("subtitle")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {recentPosts.map((post, index) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            index={index}
                            locale={locale}
                            t={t}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/articles"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        عرض جميع المقالات
                        <span className="animate-pulse">✨</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}


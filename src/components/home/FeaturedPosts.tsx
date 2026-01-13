"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
// import Image from "next/image";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: number;
  category: string;
  image: string;
}

export default function FeaturedPosts() {
  const t = useTranslations("HomePage");

  const posts: Post[] = [
  {
    id: 1,
    title: t("posts.React.title"),
    excerpt: t("posts.React.excerpt"),
    author: t("posts.React.author"),
    date: "2024-01-15",
    readTime: 8,
    category: t("posts.React.fronEnd"),
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h-300&fit=crop",
  },
  {
    id: 2,
    title: t("posts.NextJS.title"),
    excerpt: t("posts.NextJS.excerpt"),
    author: t("posts.NextJS.author"),
    date: "2024-01-10",
    readTime: 12,
    category: t("posts.NextJS.fullStack"),
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: t("posts.Typescript.title"),
    excerpt: t("posts.Typescript.excerpt"),
    author: t("posts.Typescript.author"),
    date: "2024-01-05",
    readTime: 15,
    category: t("posts.Typescript.programmingLanguages"),
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
  },
];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              <span className="text-gradient">{t("featuredPosts")}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              {t("description")}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group"
            >
              {t("viewAll")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cls-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg card-hover"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
                <div className="absolute inset-0 shimmer" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} {t("ArticleCard.readTime")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-2">
                  {post.excerpt}
                </p>

                <Link
                  href={`/articles/${post.id}`}
                  className="inline-flex items-center gap-2 text-primary font-medium group/link"
                >
                  {t("ArticleCard.readMore")}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
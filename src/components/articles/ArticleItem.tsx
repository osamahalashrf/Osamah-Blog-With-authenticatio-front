"use client";

import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Article } from "@/generated/prisma";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";


// interface Article {
//   id: number;
//   title: string;
//   description: string;
//   createdAt: Date;
//   updatedAt: Date;
//   user?: {
//     username: string;
//   };
// }


interface ArticleItemProps {
  article: Article & {
    author?: string;
    user?: {
      username: string;
    };
  };
  index: number;
}




export default function ArticleItem({ article, index }: ArticleItemProps) {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("HomePage.ArticleCard");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link
        href={`/${locale}/articles/${article.id}`}
        className="block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.createdAt).toLocaleDateString(locale)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{article.user?.username || "مجهول"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>5 {t("readTime")}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-muted-foreground mb-4 line-clamp-3">
            {article.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {t("category")}
            </span>
            <span className="text-sm font-medium group-hover:text-primary transition-colors flex items-center gap-1">
              {t("readMore")} <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
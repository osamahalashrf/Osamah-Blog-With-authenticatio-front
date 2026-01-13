import { getArticles } from "@/app/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import Pagination from "@/components/articles/Pagination";
import { Article } from "@/generated/prisma";
import { ARTICLE_PER_PAGE } from "@/Utils/constants";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/Utils/db";

export const metadata: Metadata = {
  title: "المقالات التقنية - مدونة التقنية",
  description: "تصفح أحدث المقالات التقنية في البرمجة والتطوير",
};

interface ArticlePageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ pageNumber: string }>; // إضافة Promise هنا
}

export default async function ArticlesPage({ params, searchParams }: ArticlePageProps) {
  const t = await getTranslations("ArticlesPage");

  const resolvedParams = await searchParams;
  const pageNumber = resolvedParams?.pageNumber || "1";

  const { locale } = await params;

  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="min-h-screen py-10 gradient-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <SearchArticleInput />
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-2">{t("noResults")}</h3>
            <p className="text-muted-foreground">{t("noResultsDescription")}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article, index) => (
                <ArticleItem key={article.id} article={article} index={index} />
              ))}
            </div>

            {pages > 1 && (
              <Pagination
                pageNumber={parseInt(pageNumber)}
                pages={pages}
                route={`/${locale}/articles`}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
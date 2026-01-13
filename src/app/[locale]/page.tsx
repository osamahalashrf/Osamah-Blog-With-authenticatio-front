import BlogHero from "@/components/home/BlogHero";
import FeaturedPosts from "@/components/home/FeaturedPosts";
import RecentPosts from "@/components/home/RecentPosts";
import Newsletter from "@/components/home/Newsletter";
import CategoriesSection from "@/components/home/CategoriesSection";
// import { useTranslations } from "next-intl";

export default function HomePage() {
  // const t = useTranslations("HomePage");

  return (
    <div className="min-h-screen">
      <BlogHero />
      <FeaturedPosts />
      <RecentPosts />
      <CategoriesSection />
      <Newsletter />
    </div>
  );
}
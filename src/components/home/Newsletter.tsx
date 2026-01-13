// src/components/home/Newsletter.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Newsletter() {
  const t = useTranslations("Footer");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubscribed(true);
    setLoading(false);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 to-purple-500/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <Send className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("newsletter")}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t("newsletterText")}
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/30 rounded-2xl"
            >
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="text-green-700 dark:text-green-300 font-medium">
                {t("subscribed")}
                              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                required
                className="flex-1 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t("subscribing")}
                  </span>
                ) : (
                  t("subscribe")
                )}
              </button>
            </form>
          )}
          
          <p className="text-sm text-muted-foreground mt-4">
            {t("newsletterText2")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
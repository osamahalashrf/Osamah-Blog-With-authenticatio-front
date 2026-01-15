// layout.tsx
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {routing} from '@/i18n/routing';
import { Metadata } from 'next';
import Header from '@/components/header/Header';
import { ToastContainer } from 'react-toastify';
import Footer from '@/components/Footer';
import "../globals.css";
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@/providers/ThemeProvider';
// import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: "مدونة التقنية - المعرفة التقنية للجميع",
  description: "مدونة تقنية متخصصة في البرمجة، التطوير، وأحدث التقنيات مع شروحات عربية مفصلة",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    return notFound();
  }
 
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale}>
            <div className="relative z-10">
              <Header />
            </div>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={locale === 'ar'}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              className="z-[10000]"
            />
            <div id="mobile-menu-root" />
            <main className="min-h-screen relative z-0">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
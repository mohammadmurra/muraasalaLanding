import React, { useState, useEffect } from "react";

interface Feature {
  readonly title: string;
  readonly description: string;
}
interface HeroContent {
  readonly heading: string;
  readonly subheading: string;
  readonly callToAction: string;
}
interface ContactContent {
  readonly title: string;
  readonly description: string;
  readonly button: string;
}

interface HomePageProps {
  lang: "en" | "ar";
  hero: HeroContent;
  features: { readonly title: string; readonly items: readonly Feature[] };
  contact: ContactContent;
  comingSoonTitles: readonly string[];
}

const HomePage: React.FC<HomePageProps> = ({
  lang,
  hero,
  features,
  contact,
  comingSoonTitles,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getFeatureIcon = (title: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      "Bulk Send": (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      ),
      "إرسال جماعي": (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      ),
      Personalization: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
      التخصيص: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
      Scheduling: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      الجدولة: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      Analytics: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      التحليلات: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      Templates: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      القوالب: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      "API & Webhooks": (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      "واجهات برمجة التطبيقات والتنبيهات": (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    };
    return (
      iconMap[title] || (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      )
    );
  };

  return (
    <>
      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Elements */}
        <div className="hero-bg absolute inset-0"></div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent, rgba(147, 51, 234, 0.1))",
          }}
        ></div>

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-green-400/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 pt-20 md:pt-28 pb-16 md:pb-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div
              className={`space-y-8 ${
                isLoaded ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span
                    className="text-shadow-lg dark:text-white dark:text-shadow-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
            {hero.heading}
                  </span>
          </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-200 max-w-2xl leading-relaxed">
            {hero.subheading}
          </p>
              </div>

              <div className="flex flex-wrap gap-4">
          <a
            href="#contact"
                  className="btn-primary text-lg px-8 py-4 group"
                >
                  <span className="relative z-10">{hero.callToAction}</span>
                </a>
                <a
                  href="#features"
                  className="btn-secondary text-lg px-8 py-4 group"
                >
                  <span className="relative z-10">
                    {lang === "en" ? "Explore Features" : "استكشف الميزات"}
                  </span>
                </a>
              </div>

              {/* Status Indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {lang === "en"
                      ? "Online • 99.9% Uptime"
                      : "متصل • 99.9% وقت تشغيل"}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {lang === "en" ? "Arabic & English" : "العربية والإنجليزية"}
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Element */}
            <div
              className={`relative flex items-center justify-center ${
                isLoaded ? "animate-fadeInScale" : "opacity-0"
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative group">
                <div
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-20 scale-110 group-hover:opacity-30 group-hover:scale-125 transition-all duration-700"
                  style={{
                    background: "linear-gradient(to right, #2563eb, #9333ea)",
                  }}
                ></div>
                <div className="card w-full max-w-lg tilt relative">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                    <img
                      src="/logo.png"
                      alt="Muraasala Logo"
                      className="w-full h-full object-contain p-8"
                    />
                    <div className="absolute inset-0 pointer-events-none animate-shimmer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="scroll-indicator">
          <svg
            className="w-6 h-6 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="py-24 md:py-32 relative overflow-hidden"
      >
        {/* Background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white text-shadow-lg">
            {features.title}
          </h2>
            <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {lang === "en"
                ? "Everything you need to launch, schedule and analyze WhatsApp campaigns — with an API when you want to automate."
                : "كل ما تحتاجه لإطلاق وجدولة وتحليل حملات واتساب — مع واجهة برمجة تطبيقات للأتمتة."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.items.map((item, idx) => (
              <div
                key={idx}
                className={`feature-card group ${
                  isLoaded ? "animate-fadeInUp" : "opacity-0"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
                onMouseEnter={() => setActiveFeature(idx)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div
                  className="mb-6 flex items-center justify-center h-16 w-16 rounded-2xl transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                  }}
                >
                  <div className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    {getFeatureIcon(item.title)}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                {comingSoonTitles.includes(item.title) && (
                    <span className="badge-warning animate-pulse">
                      {lang === "en" ? "Coming Soon" : "قريبًا"}
                  </span>
                )}
                </div>

                <p className="text-gray-600 dark:text-gray-200 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl animate-float"
          style={{
            background:
              "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
          }}
        ></div>

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div
            className={`contact-card ${
              isLoaded ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white text-shadow-lg">
                {contact.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {contact.description}
          </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="https://wa.me/972568085611"
            target="_blank"
            rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105"
                style={{
                  background: "linear-gradient(to right, #10b981, #059669)",
                }}
              >
                <svg
                  className="w-6 h-6 mr-3 rtl:ml-3 rtl:mr-0 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.5 0 .2 5.29.2 11.85c0 2.09.53 4.16 1.54 5.99L0 24l6.31-1.65a11.87 11.87 0 0 0 5.75 1.47h.01c6.56 0 11.85-5.29 11.85-11.85 0-3.17-1.23-6.14-3.4-8.32zM12.07 21.2h-.01a9.3 9.3 0 0 1-4.75-1.3l-.34-.2-3.74.98 1-3.66-.22-.36a9.33 9.33 0 0 1-1.45-4.8c0-5.15 4.19-9.33 9.35-9.33 2.49 0 4.83.97 6.6 2.73a9.27 9.27 0 0 1 2.74 6.61c0 5.15-4.19 9.33-9.35 9.33zm5.3-7.43c-.3-.15-1.77-.9-2.05-1-.28-.1-.47-.15-.66.15-.19.3-.76.99-.93 1.17-.17.2-.34.23-.62.08-.29-.15-1.22-.45-2.32-1.44-1.06-.95-1.79-2.13-2-2.43-.21-.3-.02-.47.13-.62.14-.14.3-.36.45-.53.15-.18.2-.31.3-.5.1-.19.05-.37-.02-.53-.07-.15-.73-1.78-1-2.43-.26-.65-.53-.56-.72-.57-.19-.01-.41-.01-.63-.01-.22 0-.58.08-.89.42-.3.33-1.17 1.19-1.17 2.88 0 1.68 1.2 3.3 1.36 3.52.17.22 2.35 3.6 5.68 5.04.79.34 1.41.55 1.89.7.79.25 1.52.21 2.09.13.63-.1 1.96-.8 2.23-1.57.27-.77.27-1.44.19-1.57-.08-.13-.3-.22-.64-.39z" />
            </svg>
                <span className="text-lg">{contact.button}</span>
              </a>

              <div className="flex items-center gap-4 text-gray-400 dark:text-gray-500">
                <span className="hidden sm:inline">
                  {lang === "en" ? "or" : "أو"}
                </span>
                <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1 sm:w-0"></div>
              </div>

            <a
              href="mailto:hello@muraasla.com"
                className="btn-secondary text-lg px-8 py-4 group"
              >
                <svg
                  className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 transition-transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>hello@muraasla.com</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {lang === "en" ? "24/7 Support" : "دعم على مدار الساعة"}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "en"
                      ? "Always here to help"
                      : "نحن هنا دائماً للمساعدة"}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {lang === "en" ? "Reliable" : "موثوق"}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "en" ? "99.9% uptime" : "99.9% وقت تشغيل"}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-600 dark:text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {lang === "en" ? "Fast Setup" : "إعداد سريع"}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === "en" ? "Get started in minutes" : "ابدأ في دقائق"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <img src="/icon.png" alt="Muraasala Icon" className="h-8 w-8" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Muraasala
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
                {lang === "en"
                  ? "The most powerful WhatsApp Business API for modern businesses. Send, schedule, and analyze your campaigns with ease."
                  : "أقوى واجهة برمجة تطبيقات واتساب للأعمال للشركات الحديثة. أرسل وجدول وحلل حملاتك بسهولة."}
              </p>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <a
                  href="https://wa.me/972568085611"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.5 0 .2 5.29.2 11.85c0 2.09.53 4.16 1.54 5.99L0 24l6.31-1.65a11.87 11.87 0 0 0 5.75 1.47h.01c6.56 0 11.85-5.29 11.85-11.85 0-3.17-1.23-6.14-3.4-8.32zM12.07 21.2h-.01a9.3 9.3 0 0 1-4.75-1.3l-.34-.2-3.74.98 1-3.66-.22-.36a9.33 9.33 0 0 1-1.45-4.8c0-5.15 4.19-9.33 9.35-9.33 2.49 0 4.83.97 6.6 2.73a9.27 9.27 0 0 1 2.74 6.61c0 5.15-4.19 9.33-9.35 9.33zm5.3-7.43c-.3-.15-1.77-.9-2.05-1-.28-.1-.47-.15-.66.15-.19.3-.76.99-.93 1.17-.17.2-.34.23-.62.08-.29-.15-1.22-.45-2.32-1.44-1.06-.95-1.79-2.13-2-2.43-.21-.3-.02-.47.13-.62.14-.14.3-.36.45-.53.15-.18.2-.31.3-.5.1-.19.05-.37-.02-.53-.07-.15-.73-1.78-1-2.43-.26-.65-.53-.56-.72-.57-.19-.01-.41-.01-.63-.01-.22 0-.58.08-.89.42-.3.33-1.17 1.19-1.17 2.88 0 1.68 1.2 3.3 1.36 3.52.17.22 2.35 3.6 5.68 5.04.79.34 1.41.55 1.89.7.79.25 1.52.21 2.09.13.63-.1 1.96-.8 2.23-1.57.27-.77.27-1.44.19-1.57-.08-.13-.3-.22-.64-.39z" />
                  </svg>
                </a>
                <a
                  href="mailto:hello@muraasla.com"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {lang === "en" ? "Product" : "المنتج"}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {lang === "en" ? "Features" : "الميزات"}
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {lang === "en" ? "Pricing" : "الأسعار"}
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {lang === "en" ? "API Docs" : "وثائق API"}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {lang === "en" ? "Company" : "الشركة"}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {lang === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {lang === "en" ? "Terms of Service" : "شروط الخدمة"}
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {lang === "en" ? "Contact" : "اتصل بنا"}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Muraasala.{" "}
                {lang === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {lang === "en"
                    ? "All systems operational"
                    : "جميع الأنظمة تعمل"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;

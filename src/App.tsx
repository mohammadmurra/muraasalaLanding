import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import { translations, Lang } from "./i18n";
import { useScrollProgress } from "./hooks";

gsap.registerPlugin(ScrollTrigger);

// Scroll Progress Bar
const ScrollProgressBar: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div 
      className="scroll-progress"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
};

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return null;
};

function App() {
  const getStored = (k: string) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  };

  const initialLang = ((): Lang => {
    const raw = getStored("lang");
    return raw === "en" || raw === "ar" ? raw : "ar";
  })();

  const initialDark = ((): boolean => getStored("theme") === "dark")();

  const [lang, setLang] = useState<Lang>(initialLang);
  const [darkMode, setDarkMode] = useState<boolean>(initialDark);
  const [isLoading, setIsLoading] = useState(true);

  const DEFAULT = translations.en;
  const t = translations[lang] ?? DEFAULT;
  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  const comingSoonTitles: string[] = useMemo(
    () =>
      lang === "en"
        ? ["Personalization", "Scheduling", "Analytics"]
        : ["التخصيص", "الجدولة", "التحليلات"],
    [lang]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("dir", dir);
    root.setAttribute("lang", lang);
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");

    try {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
      localStorage.setItem("lang", lang);
    } catch {}

    document.title =
      lang === "en"
        ? "Muraasala — WhatsApp Business API"
        : "مراسلة — واجهة برمجة تطبيقات واتساب";
  }, [dir, lang, darkMode]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [lang]);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-[var(--bg)]">
        {/* Loading Screen */}
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 ${
            isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ backgroundColor: 'var(--bg)' }}
        >
          <div className="relative">
            <img 
              src="/icon.png" 
              alt="Muraasala" 
              className="w-16 h-16 rounded-2xl shadow-2xl"
              style={{ 
                animation: isLoading ? 'pulse 2s ease-in-out infinite' : 'none'
              }}
            />
            <div 
              className="absolute inset-0 rounded-2xl animate-ping opacity-20"
              style={{ backgroundColor: 'var(--brand)' }}
            />
          </div>
        </div>

        {/* Scroll Progress */}
        <ScrollProgressBar />

        {/* Header */}
        <Header
          brand={t.brand ?? DEFAULT.brand}
          nav={t.nav ?? DEFAULT.nav}
          lang={lang}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((v) => !v)}
          onToggleLang={() => setLang((l) => (l === "en" ? "ar" : "en"))}
          dir={dir}
        />

        {/* Main Content */}
        <main className="relative">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  lang={lang}
                  hero={t.hero ?? DEFAULT.hero}
                  features={t.features ?? DEFAULT.features}
                  contact={t.contact ?? DEFAULT.contact}
                  comingSoonTitles={comingSoonTitles}
                />
              }
            />
            <Route
              path="/privacy"
              element={
                <PrivacyPage lang={lang} privacy={t.privacy ?? DEFAULT.privacy} />
              }
            />
            <Route
              path="/terms"
              element={
                <TermsPage lang={lang} terms={t.terms ?? DEFAULT.terms} />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

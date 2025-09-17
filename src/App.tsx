import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import { translations, Lang } from "./i18n";

export default function App() {
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

  // SAFE fallback if something goes wrong
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
        ? "Muraasala — WhatsApp Business"
        : "مراسلة — حلول واتساب للأعمال";
  }, [dir, lang, darkMode]);

  return (
    <Router>
      <div className="relative min-h-screen">
        <div className="spotlight" />
        <div className="noise" />
        <Header
          brand={t.brand ?? DEFAULT.brand}
          nav={t.nav ?? DEFAULT.nav}
          lang={lang}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((v) => !v)}
          onToggleLang={() => setLang((l) => (l === "en" ? "ar" : "en"))}
          dir={dir}
        />
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
            element={<TermsPage lang={lang} terms={t.terms ?? DEFAULT.terms} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

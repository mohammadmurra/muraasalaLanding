import React, { useEffect, useRef, useState } from "react";
import { useScrollReveal, useParallax } from "../hooks";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

// Feature Icons
const getIcon = (title: string): string => {
  const icons: { [key: string]: string } = {
    "Bulk Send": "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
    "إرسال جماعي": "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
    Personalization: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
    التخصيص: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
    Scheduling: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    الجدولة: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    Analytics: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    التحليلات: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    Templates: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    القوالب: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    "API & Webhooks": "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    "واجهات برمجة التطبيقات والتنبيهات": "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    "Multilingual Support": "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
    "دعم متعدد اللغات": "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
  };
  return icons[title] || "M13 10V3L4 14h7v7l9-11h-7z";
};

// Scroll Reveal Component
const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  scale?: boolean;
}> = ({ children, className = "", delay = 0, scale = false }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1, delay });
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'translateY(0) scale(1)' 
          : `translateY(40px) scale(${scale ? 0.95 : 1})`,
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Floating decoration
const FloatingDeco: React.FC<{ className?: string; delay?: number; children: React.ReactNode }> = ({ 
  className = "", 
  delay = 0,
  children 
}) => {
  return (
    <div 
      className={`absolute ${className}`}
      style={{
        animation: `float 8s ease-in-out ${delay}s infinite`,
      }}
    >
      {children}
    </div>
  );
};

const HomePage: React.FC<HomePageProps> = ({
  lang,
  hero,
  features,
  contact,
  comingSoonTitles,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { ref: parallaxRef, offset } = useParallax(0.1);

  useEffect(() => {
    setIsLoaded(true);

    const ctx = gsap.context(() => {
      gsap.to(".hero-float", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(".feature-card-item", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 85%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden"
      >
        {/* Aurora Background */}
        <div className="aurora">
          <div className="aurora-blob aurora-blob-1" />
          <div className="aurora-blob aurora-blob-2" />
          <div className="aurora-blob aurora-blob-3" />
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(to right, var(--text) 1px, transparent 1px),
                              linear-gradient(to bottom, var(--text) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating Decorations */}
        <FloatingDeco className="top-32 right-[10%] hidden lg:block" delay={0}>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400/20 to-gold-400/20 backdrop-blur-sm border border-white/20" />
        </FloatingDeco>
        <FloatingDeco className="bottom-40 left-[8%] hidden lg:block" delay={2}>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400/20 to-primary-400/20 backdrop-blur-sm border border-white/20" />
        </FloatingDeco>
        <FloatingDeco className="top-1/2 right-[5%] hidden lg:block" delay={1}>
          <div className="w-12 h-12 rounded-xl bg-primary-300/20 backdrop-blur-sm border border-white/20 rotate-12" />
        </FloatingDeco>

        {/* Content */}
        <div className="container-narrow relative z-10 text-center">
          {/* Badge */}
          <div 
            className={`inline-flex mb-8 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="badge-brand">
              {lang === "en" ? "WhatsApp Business API" : "واجهة برمجة تطبيقات واتساب"}
            </span>
          </div>

          {/* Headline */}
          <h1 
            className={`text-hero mb-6 transition-all duration-1000 delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {hero.heading}
          </h1>

          {/* Subheadline */}
          <p 
            className={`text-lead max-w-2xl mx-auto mb-10 transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {hero.subheading}
          </p>

          {/* CTAs */}
          <div 
            className={`flex flex-wrap gap-4 justify-center mb-20 transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a href="#contact" className="btn-primary btn-lg">
              {hero.callToAction}
            </a>
            <a href="#features" className="btn-secondary btn-lg">
              {lang === "en" ? "Explore Features" : "استكشف الميزات"}
            </a>
          </div>

          {/* Product Showcase */}
          <div 
            ref={parallaxRef}
            className={`relative max-w-lg mx-auto hero-float transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transform: `translateY(${offset}px)` }}
          >
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/30 to-gold-400/30 rounded-3xl blur-3xl opacity-60" />
            
            {/* Card */}
            <div className="relative card-glass p-8 sm:p-12">
              <img
                src="/logo.png"
                alt="Muraasala"
                className="w-full max-w-sm mx-auto drop-shadow-2xl"
              />
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <div 
                  className="absolute inset-0 -translate-x-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    animation: 'shimmer 3s infinite',
                  }}
                />
              </div>
            </div>

            {/* Floating Badge */}
            <div 
              className="absolute -top-4 -right-4 badge-accent px-4 py-2 text-sm shadow-lg"
              style={{ animation: 'float 6s ease-in-out infinite' }}
            >
              {lang === "en" ? "New" : "جديد"}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div 
            className={`flex flex-col items-center gap-2 transition-all duration-1000 delay-700 ${
              isLoaded ? 'opacity-40' : 'opacity-0'
            }`}
          >
            <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
              <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="section bg-[var(--bg-soft)]">
        <div className="container-premium">
          {/* Header */}
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-caption text-primary-600 mb-4 block">
              {lang === "en" ? "FEATURES" : "الميزات"}
            </span>
            <h2 className="text-headline mb-4">
              {features.title}
            </h2>
            <p className="text-lead">
              {lang === "en"
                ? "Everything you need to launch, schedule, and analyze WhatsApp campaigns."
                : "كل ما تحتاجه لإطلاق وجدولة وتحليل حملات واتساب."}
            </p>
          </Reveal>

          {/* Bento Grid */}
          <div className="features-grid bento">
            {/* Large Feature Card */}
            <Reveal className="bento-col-12" delay={0}>
              <div className="card-premium p-8 sm:p-12 min-h-[400px] flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1 text-center lg:text-left">
                  <div className="icon-box mx-auto lg:mx-0 mb-6">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-headline mb-4">
                    {lang === "en" ? "Powerful API" : "واجهة برمجة قوية"}
                  </h3>
                  <p className="text-lead max-w-lg">
                    {lang === "en"
                      ? "Integrate Muraasala into your systems with our robust REST API. Automate messaging, manage contacts, and track deliveries."
                      : "دمج مراسلة في أنظمتك مع واجهة برمجة REST القوية. أتمتة الرسائل، إدارة جهات الاتصال، وتتبع التسليمات."}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <img src="/icon.png" alt="API" className="w-32 h-32 rounded-3xl shadow-xl opacity-80" />
                </div>
              </div>
            </Reveal>

            {/* Feature Cards */}
            {features.items.map((item, idx) => (
              <Reveal 
                key={idx} 
                className="bento-col-6 lg:bento-col-4"
                delay={idx * 100}
              >
                <div className="feature-card h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="icon-box">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={getIcon(item.title)} />
                      </svg>
                    </div>
                    {comingSoonTitles.includes(item.title) && (
                      <span className="badge-accent">
                        {lang === "en" ? "Soon" : "قريباً"}
                      </span>
                    )}
                  </div>
                  <h3 className="text-title mb-2">{item.title}</h3>
                  <p className="text-body">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section">
        <div className="container-narrow">
          <Reveal scale>
            <div className="card-glass text-center p-8 sm:p-12 lg:p-16">
              <span className="text-caption text-primary-600 mb-4 block">
                {lang === "en" ? "GET STARTED" : "ابدأ الآن"}
              </span>
              <h2 className="text-headline mb-4">
                {contact.title}
              </h2>
              <p className="text-lead mb-10 max-w-xl mx-auto">
                {contact.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <a
                  href="https://wa.me/972568085611"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-lg w-full sm:w-auto"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.52 3.48A11.94 11.94 0 0012.06 0C5.5 0 .2 5.29.2 11.85c0 2.09.53 4.16 1.54 5.99L0 24l6.31-1.65a11.87 11.87 0 005.75 1.47h.01c6.56 0 11.85-5.29 11.85-11.85 0-3.17-1.23-6.14-3.4-8.32z"/>
                  </svg>
                  {contact.button}
                </a>
                <a
                  href="mailto:hello@muraasla.com"
                  className="btn-secondary btn-lg w-full sm:w-auto"
                >
                  hello@muraasla.com
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-[var(--border)]">
                {[
                  { value: "24/7", label: lang === "en" ? "Support" : "دعم" },
                  { value: "99.9%", label: lang === "en" ? "Uptime" : "تشغيل" },
                  { value: lang === "en" ? "Fast" : "سريع", label: lang === "en" ? "Setup" : "إعداد" },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-title text-primary-600 mb-1">{stat.value}</div>
                    <div className="text-caption">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[var(--bg-muted)] border-t border-[var(--border)]">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/icon.png" alt="Muraasala" className="w-10 h-10 rounded-xl shadow-lg" />
              <span className="text-lg font-bold">Muraasala</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-[var(--text-secondary)]">
              <a href="/privacy" className="hover:text-primary-600 transition-colors">
                {lang === "en" ? "Privacy" : "الخصوصية"}
              </a>
              <a href="/terms" className="hover:text-primary-600 transition-colors">
                {lang === "en" ? "Terms" : "الشروط"}
              </a>
              <a href="#contact" className="hover:text-primary-600 transition-colors">
                {lang === "en" ? "Contact" : "اتصل بنا"}
              </a>
            </div>

            <p className="text-sm text-[var(--text-muted)]">
              © {new Date().getFullYear()} Muraasala
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;

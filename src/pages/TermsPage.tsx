import React from "react";
import { useScrollReveal } from '../hooks';

interface TermsContent {
  readonly title: string;
  readonly paragraphs: readonly string[];
}

interface TermsPageProps {
  lang: "en" | "ar";
  terms: TermsContent;
}

const TermsPage: React.FC<TermsPageProps> = ({ lang, terms }) => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal<HTMLDivElement>({ delay: 150 });

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[var(--bg)]">
      <div className="container-narrow">
        {/* Header */}
        <div 
          ref={headerRef}
          className="mb-12"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>{lang === 'en' ? 'Back to Home' : 'العودة للرئيسية'}</span>
          </a>
          
          <h1 className="text-headline">
            {terms.title}
          </h1>
        </div>

        {/* Content */}
        <div 
          ref={contentRef}
          className="card-premium"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          <div className="space-y-6">
            {terms.paragraphs.map((para, idx) => (
              <p key={idx} className="text-lead">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 text-center">
          <p className="text-caption">
            © {new Date().getFullYear()} Muraasala. {lang === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsPage;

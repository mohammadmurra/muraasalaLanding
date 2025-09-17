import React from 'react';

interface PrivacyContent { readonly title: string; readonly paragraphs: readonly string[]; }
interface PrivacyPageProps { lang: 'en' | 'ar'; privacy: PrivacyContent; }

const PrivacyPage: React.FC<PrivacyPageProps> = ({ privacy }) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_0%,rgba(99,102,241,0.18),transparent),radial-gradient(600px_300px_at_80%_0%,rgba(16,185,129,0.15),transparent)] -z-10" />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary-600 dark:text-primary-400">
          {privacy.title}
        </h1>
        {privacy.paragraphs.map((para, idx) => (
          <p key={idx} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">{para}</p>
        ))}
        <footer className="mt-12 pt-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-black/5 dark:border-white/10">
          <p>© {new Date().getFullYear()} Muraasala. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPage;

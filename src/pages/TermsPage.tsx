import React from 'react';

interface TermsContent {
  title: string;
  paragraphs: string[];
}

interface TermsPageProps {
  lang: 'en' | 'ar';
  terms: TermsContent;
}

/**
 * Terms of service page. Shows the terms text in the selected language. The
 * page uses the same footer styling as other pages. Header is provided
 * externally by App.tsx.
 */
const TermsPage: React.FC<TermsPageProps> = ({ terms }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
        {terms.title}
      </h1>
      {terms.paragraphs.map((para, idx) => (
        <p key={idx} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          {para}
        </p>
      ))}
      <footer className="mt-12 py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <p>© {new Date().getFullYear()} Muraasala. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TermsPage;
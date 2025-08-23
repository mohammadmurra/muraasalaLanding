import React from 'react';

interface PrivacyContent {
  title: string;
  paragraphs: string[];
}

interface PrivacyPageProps {
  lang: 'en' | 'ar';
  privacy: PrivacyContent;
}

/**
 * Privacy policy page. Displays the policy text in the selected language.
 * It reuses the same footer styling as other pages to maintain visual
 * consistency. The header is rendered by App.tsx, not here.
 */
const PrivacyPage: React.FC<PrivacyPageProps> = ({ privacy }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
        {privacy.title}
      </h1>
      {privacy.paragraphs.map((para, idx) => (
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

export default PrivacyPage;
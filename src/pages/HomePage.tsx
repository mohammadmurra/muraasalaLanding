import React from 'react';

interface Feature {
  title: string;
  description: string;
}

interface HeroContent {
  heading: string;
  subheading: string;
  callToAction: string;
}

interface ContactContent {
  title: string;
  description: string;
  button: string;
}

interface HomePageProps {
  lang: 'en' | 'ar';
  hero: HeroContent;
  features: {
    title: string;
    items: Feature[];
  };
  contact: ContactContent;
  comingSoonTitles: string[];
}

/**
 * Home page component. Displays the hero, features and contact sections.
 * It is purely presentational and receives all text via props. The
 * `comingSoonTitles` array lists feature titles that should display a
 * "Coming soon" badge.
 */
const HomePage: React.FC<HomePageProps> = ({ lang, hero, features, contact, comingSoonTitles }) => {
  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="fade-in flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-20 md:py-32 gap-10">
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            {hero.heading}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0">
            {hero.subheading}
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors shadow-lg"
          >
            {hero.callToAction}
          </a>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img src="/logo.png" alt="Muraasala Logo" className="w-80 h-auto drop-shadow-xl" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="fade-in bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            {features.title}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.items.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-primary-500/10">
                  <span className="text-primary-600 dark:text-primary-400 text-xl font-bold">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                {/* Coming soon badge */}
                {comingSoonTitles.includes(item.title) && (
                  <span className="inline-block mb-2 text-xs font-medium bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                    {lang === 'en' ? 'Coming soon' : 'قريبًا'}
                  </span>
                )}
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="fade-in bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{contact.title}</h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {contact.description}
          </p>
          <a
            href="https://wa.me/972568085611"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 rtl:space-x-reverse px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
          >
            {/* WhatsApp icon as inline SVG */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.56 4.19 1.619 6.01L0 24l6.127-1.602A11.948 11.948 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.125c-2.11 0-4.174-.575-5.984-1.663l-.428-.253-3.516.904.937-3.437-.279-.441A9.952 9.952 0 0 1 2.063 12c0-5.48 4.457-9.937 9.937-9.937 5.48 0 9.937 4.457 9.937 9.937S17.48 22.125 12 22.125zm5.23-7.913c-.292-.146-1.727-.855-1.995-.954-.268-.099-.463-.146-.658.146-.196.292-.756.954-.927 1.146-.171.195-.342.219-.634.073-.292-.146-1.231-.454-2.343-1.447-.865-.771-1.448-1.723-1.616-2.015-.171-.292-.018-.45.128-.596.133-.132.292-.342.439-.512.146-.171.195-.292.292-.487.097-.195.048-.366-.024-.512-.073-.146-.658-1.592-.903-2.173-.24-.578-.487-.5-.658-.512-.171-.012-.366-.012-.561-.012-.195 0-.512.073-.78.366-.268.292-1.024 1.024-1.024 2.487 0 1.463 1.048 2.875 1.195 3.073.146.195 2.06 3.146 4.985 4.404.698.302 1.243.48 1.667.614.699.222 1.335.191 1.84.116.561-.085 1.727-.704 1.971-1.383.244-.68.244-1.268.171-1.383-.073-.116-.268-.195-.561-.341z" />
            </svg>
            <span>{contact.button}</span>
          </a>
          {/* Contact email */}
          <div className="mt-4">
            <a
              href="mailto:hello@muraasla.com"
              className="text-primary-600 dark:text-primary-400 underline"
            >
              hello@muraasla.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <p>
          © {new Date().getFullYear()} Muraasala. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default HomePage;
/**
 * Internationalisation utilities for the Muraasla landing page. This file
 * exports the supported languages and a translations object that maps
 * language codes to the strings used throughout the site. When adding
 * new copy or languages, update this file accordingly.
 */

export type Language = 'en' | 'ar';

/**
 * The structure of translations used by the site. Each field corresponds to
 * a piece of text in the UI. Arrays are used for repeating structures like
 * features, where each entry contains a title, description and an emoji
 * used as an icon. Emojis are used here as a lightweight way of adding
 * visual interest without external assets.
 */
export interface Translations {
  heroTitle: string;
  heroSubtitle: string;
  heroCTA: string;
  navHome: string;
  navFeatures: string;
  navPricing: string;
  navContact: string;
  navPolicies: string;
  featuresTitle: string;
  features: { title: string; description: string; icon: string }[];
  pricingTitle: string;
  pricingSubtitle: string;
  pricingPlanName: string;
  pricingPrice: string;
  pricingDescription: string;
  contactTitle: string;
  contactSubtitle: string;
  contactButton: string;
  privacyTitle: string;
  privacyContent: string;
  termsTitle: string;
  termsContent: string;
}

/**
 * A record of translations keyed by language. New languages can be added
 * by extending this object and providing values for all keys defined in
 * Translations. The Arabic copy has been translated manually; feel free
 * to adjust phrasing to better suit your audience.
 */
export const translations: Record<Language, Translations> = {
  en: {
    heroTitle: 'Connect with your audience',
    heroSubtitle: 'Modern communication simplified. Use Muraasla to send unlimited messages with ease.',
    heroCTA: 'Get Started',
    navHome: 'Home',
    navFeatures: 'Features',
    navPricing: 'Pricing',
    navContact: 'Contact',
    navPolicies: 'Policies',
    featuresTitle: 'Features',
    features: [
      {
        title: 'Easy Integration',
        description: 'Integrate your website and start sending messages easily.',
        icon: '💬'
      },
      {
        title: 'Affordable Pricing',
        description: 'Only 800₪ per year for up to 36K messages.',
        icon: '💰'
      },
      {
        title: 'Dedicated Support',
        description: 'Our team is ready to assist you at any time.',
        icon: '🤝'
      }
    ],
    pricingTitle: 'Pricing',
    pricingSubtitle: 'Simple and transparent',
    pricingPlanName: 'Annual Plan',
    pricingPrice: '₪800/year',
    pricingDescription: 'Send up to 36,000 messages per year. No hidden fees.',
    contactTitle: 'Contact Us',
    contactSubtitle: "We'd love to hear from you. Reach us via WhatsApp.",
    contactButton: 'Message on WhatsApp',
    privacyTitle: 'Privacy Policy',
    privacyContent:
      'We value your privacy and only collect the information necessary to provide our services. We do not share your data with third parties except as required by law.',
    termsTitle: 'Terms of Service',
    termsContent:
      'Use of Muraasla is subject to the following terms: Do not use the service to send spam or illegal content. Muraasla reserves the right to cancel service for policy violations.'
  },
  ar: {
    heroTitle: 'تواصل مع جمهورك',
    heroSubtitle: 'تواصل عصري مبسط. استخدم مراسلة لإرسال رسائل غير محدودة بسهولة.',
    heroCTA: 'ابدأ الآن',
    navHome: 'الرئيسية',
    navFeatures: 'الميزات',
    navPricing: 'الأسعار',
    navContact: 'تواصل',
    navPolicies: 'السياسات',
    featuresTitle: 'الميزات',
    features: [
      {
        title: 'تكامل سهل',
        description: 'دمج موقعك والبدء في إرسال الرسائل بسهولة.',
        icon: '💬'
      },
      {
        title: 'تسعير مناسب',
        description: '٨٠٠ شيكل سنوياً لما يصل إلى ٣٦ ألف رسالة.',
        icon: '💰'
      },
      {
        title: 'دعم مخصص',
        description: 'فريقنا متاح لمساعدتك في أي وقت.',
        icon: '🤝'
      }
    ],
    pricingTitle: 'الأسعار',
    pricingSubtitle: 'بسيطة وشفافة',
    pricingPlanName: 'الخطة السنوية',
    pricingPrice: '٨٠٠₪/سنة',
    pricingDescription: 'أرسل حتى ٣٦,٠٠٠ رسالة في السنة. بدون رسوم إضافية.',
    contactTitle: 'تواصل معنا',
    contactSubtitle: 'نحب سماعك. تواصل معنا عبر واتساب.',
    contactButton: 'أرسل رسالة عبر واتساب',
    privacyTitle: 'سياسة الخصوصية',
    privacyContent:
      'نحن نقدر خصوصيتك ونقوم بجمع المعلومات الضرورية فقط لتقديم خدماتنا. لا نشارك بياناتك مع طرف ثالث إلا إذا طلب القانون ذلك.',
    termsTitle: 'شروط الخدمة',
    termsContent:
      'يخضع استخدامك لمراسلة للشروط التالية: يمنع استخدام الخدمة في إرسال الرسائل غير المرغوب فيها أو المحتوى غير القانوني. تحتفظ مراسلة بالحق في إلغاء الخدمة في حالة انتهاك السياسات.'
  }
};
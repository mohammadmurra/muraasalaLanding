// src/i18n.ts
export type Lang = 'en' | 'ar';

export const translations = {
  en: {
    brand: 'Muraasala',
    nav: { features: 'Features', contact: 'Contact', privacy: 'Privacy Policy', terms: 'Terms of Service', language: 'العربية' },
    hero: {
      heading: 'Reach your customers effortlessly',
      subheading: 'Muraasala is a secure, reliable messaging platform for businesses.',
      callToAction: 'Get Started'
    },
    features: {
      title: 'Features',
      items: [
        { title: 'Bulk Send', description: 'Send messages to thousands of recipients at once with just one click.' },
        { title: 'Personalization', description: 'Customize each message with recipient-specific data for higher engagement.' },
        { title: 'Scheduling', description: 'Schedule campaigns to go out at the perfect time for your audience.' },
        { title: 'Analytics', description: 'Track delivery and engagement metrics in real time.' },
        { title: 'Templates', description: 'Create and reuse message templates to save time.' },
        { title: 'API & Webhooks', description: 'Integrate Muraasala into your systems via robust APIs and receive webhooks.' },
        { title: 'Multilingual Support', description: 'Works seamlessly in Arabic (RTL) and English (LTR) contexts.' }
      ]
    },
    contact: {
      title: 'Contact',
      description: 'Reach out via WhatsApp or email if you have any questions.',
      button: 'Chat on WhatsApp'
    },
    privacy: {
      title: 'Privacy Policy',
      paragraphs: [
        'Muraasala respects your privacy and ensures the confidentiality of your personal data.',
        'We collect only essential information required to provide our messaging services. This may include your contact information, message content and usage metrics.',
        'We do not sell or share your data with third parties, except as required by law or to maintain the service.',
        'You can contact us to manage or delete your data at any time.'
      ]
    },
    terms: {
      title: 'Terms of Service',
      paragraphs: [
        'By using Muraasala you agree to comply with all applicable laws and not misuse the service.',
        'You are responsible for the content you send. Do not send illegal or harmful messages.',
        'Muraasala provides messaging tools as-is without warranties of any kind.',
        'We may modify or terminate the service at any time; continued use constitutes acceptance of the updated terms.'
      ]
    }
  },
  ar: {
    brand: 'مراسلة',
    nav: { features: 'الميزات', contact: 'التواصل', privacy: 'سياسة الخصوصية', terms: 'شروط الخدمة', language: 'English' },
    hero: {
      heading: 'تواصل مع عملائك بسهولة',
      subheading: 'مراسلة هي منصة رسائل آمنة وموثوقة للأعمال.',
      callToAction: 'ابدأ الآن'
    },
    features: {
      title: 'الميزات',
      items: [
        { title: 'إرسال جماعي', description: 'أرسل رسائل إلى آلاف المستلمين دفعة واحدة بضغطة زر.' },
        { title: 'التخصيص', description: 'خصص كل رسالة ببيانات خاصة بالمستلم لزيادة التفاعل.' },
        { title: 'الجدولة', description: 'جدولة الحملات لتخرج في الوقت المثالي لجمهورك.' },
        { title: 'التحليلات', description: 'تتبع مقاييس التسليم والتفاعل في الوقت الفعلي.' },
        { title: 'القوالب', description: 'أنشئ واحفظ قوالب الرسائل لإعادة استخدامها لاحقًا.' },
        { title: 'واجهات برمجة التطبيقات والتنبيهات', description: 'دمج مراسلة في أنظمتك عبر واجهات برمجة تطبيقات قوية واستقبال التنبيهات.' },
        { title: 'دعم متعدد اللغات', description: 'يعمل بسلاسة مع العربية (يمين إلى يسار) والإنجليزية (يسار إلى يمين).' }
      ]
    },
    contact: {
      title: 'التواصل',
      description: 'تواصل معنا عبر واتساب أو البريد الإلكتروني إذا كان لديك أي أسئلة.',
      button: 'الدردشة على واتساب'
    },
    privacy: {
      title: 'سياسة الخصوصية',
      paragraphs: [
        'تحترم مراسلة خصوصيتك وتضمن سرية بياناتك الشخصية.',
        'نقوم بجمع المعلومات الأساسية فقط اللازمة لتوفير خدمات الرسائل لدينا، والتي قد تشمل معلومات الاتصال ومحتوى الرسائل ومقاييس الاستخدام.',
        'لا نبيع أو نشارك بياناتك مع أطراف ثالثة، إلا إذا تطلب القانون ذلك أو للحفاظ على الخدمة.',
        'يمكنك الاتصال بنا لإدارة أو حذف بياناتك في أي وقت.'
      ]
    },
    terms: {
      title: 'شروط الخدمة',
      paragraphs: [
        'باستخدامك لمراسلة فإنك توافق على الالتزام بجميع القوانين المعمول بها وعدم إساءة استخدام الخدمة.',
        'أنت مسؤول عن المحتوى الذي ترسله. لا ترسل رسائل غير قانونية أو ضارة.',
        'تقدم مراسلة أدوات المراسلة كما هي دون أي ضمانات من أي نوع.',
        'يجوز لنا تعديل أو إنهاء الخدمة في أي وقت؛ ويشكل استمرارك في الاستخدام قبولك للشروط المحدثة.'
      ]
    }
  }
} as const;

export type Translations = typeof translations;

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

export const siteMetadata = {
  siteName: 'ArchPad',
  siteUrl: 'https://archpad.io', // Замените на ваш домен
  defaultImage: '/images/og-default.jpg', // Замените на вашу картинку
  twitterHandle: '@archpad', // Замените на ваш Twitter
  locale: 'ru_RU',
};

export const pageMetadata: Record<string, PageMetadata> = {
  '/': {
    title:
      'ArchPad — Современная платформа для управления архитектурой и портфолио проектов',
    description:
      'Управляйте архитектурой как код. Централизованное хранилище, автоматизация документации и управление техническим долгом. Запросите ранний доступ!',
    keywords:
      'архитектурный репозиторий, портфолио менеджмент, enterprise architecture, системная архитектура, управление техническим долгом',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  '/register': {
    title: 'Регистрация в ArchPad — Ранний доступ к платформе',
    description:
      'Зарегистрируйтесь и получите ранний доступ к ArchPad. Начните управлять архитектурой вашей организации эффективнее.',
    keywords: 'регистрация archpad, ранний доступ, архитектурная платформа',
    ogType: 'website',
  },
  '/contact': {
    title: 'Связаться с нами — ArchPad',
    description:
      'Свяжитесь с командой ArchPad для демонстрации платформы, консультации или партнерства.',
    keywords: 'контакты archpad, демо, консультация',
    ogType: 'website',
  },
  '/pricing': {
    title: 'Тарифы и цены ArchPad — SaaS и On-Premise решения',
    description:
      'Гибкие тарифные планы ArchPad: Starter от 3,490₽, Team от 8,990₽, Business от 17,990₽. SaaS и On-Premise решения для любого масштаба.',
    keywords: 'цены archpad, тарифы, saas, on-premise, стоимость',
    ogType: 'website',
  },
  '/design-partner-program': {
    title: 'Программа партнерства дизайнеров — ArchPad',
    description:
      'Присоединяйтесь к программе Design Partner и участвуйте в развитии ArchPad. Ранний доступ и эксклюзивные преимущества.',
    keywords: 'партнерская программа, design partner, ранний доступ',
    ogType: 'website',
  },
  '/features/centralized-repository': {
    title: 'Централизованный репозиторий — Функции ArchPad',
    description:
      'Единое хранилище для всех архитектурных артефактов, документации и диаграмм с версионированием и историей изменений.',
    keywords: 'архитектурный репозиторий, версионирование, документация',
    ogType: 'article',
  },
  '/features/team-collaboration': {
    title: 'Командная работа — Функции ArchPad',
    description:
      'Совместная работа над архитектурой в реальном времени, комментарии, обсуждения и утверждение решений.',
    keywords: 'совместная работа, коллаборация, командная работа',
    ogType: 'article',
  },
  '/features/automation': {
    title: 'Автоматизация процессов — Функции ArchPad',
    description:
      'Автоматическая генерация документации, проверка соответствия стандартам и интеграция с CI/CD.',
    keywords: 'автоматизация, ci/cd, генерация документации',
    ogType: 'article',
  },
  '/features/analytics': {
    title: 'Аналитика и метрики — Функции ArchPad',
    description:
      'Отслеживание метрик архитектурного долга, сложности систем и эффективности решений.',
    keywords: 'аналитика, метрики, архитектурный долг',
    ogType: 'article',
  },
  '/features/integrations': {
    title: 'Интеграции — Функции ArchPad',
    description:
      'Подключение к Jira, Confluence, GitHub, GitLab и другим инструментам вашей команды.',
    keywords: 'интеграции, jira, confluence, github, gitlab',
    ogType: 'article',
  },
  '/features/security': {
    title: 'Безопасность и контроль — Функции ArchPad',
    description:
      'Гранулярные права доступа, аудит действий, соответствие SOC 2 и ISO 27001.',
    keywords: 'безопасность, soc 2, iso 27001, аудит',
    ogType: 'article',
  },
  '/terms': {
    title: 'Условия использования — ArchPad',
    description: 'Ознакомьтесь с условиями использования платформы ArchPad.',
    keywords: 'условия использования, terms of service',
    ogType: 'website',
  },
  '/privacy': {
    title: 'Политика конфиденциальности — ArchPad',
    description:
      'Политика конфиденциальности ArchPad. Узнайте, как мы защищаем ваши данные.',
    keywords: 'конфиденциальность, privacy policy, защита данных',
    ogType: 'website',
  },
  '/cookie-policy': {
    title: 'Политика использования файлов cookie — ArchPad',
    description:
      'Как ArchPad использует файлы cookie для улучшения пользовательского опыта.',
    keywords: 'cookie, политика cookie',
    ogType: 'website',
  },
  '/coming-soon': {
    title: 'Скоро — ArchPad',
    description:
      'Эта страница находится в разработке. Скоро здесь появится что-то интересное!',
    ogType: 'website',
  },
  '/404': {
    title: 'Страница не найдена — ArchPad',
    description: 'К сожалению, запрашиваемая страница не найдена.',
    ogType: 'website',
  },
  '/_not-found': {
    title: 'Страница не найдена — ArchPad',
    description: 'К сожалению, запрашиваемая страница не найдена.',
    ogType: 'website',
  },
};

export function getPageMetadata(pathname: string): PageMetadata {
  const metadata = pageMetadata[pathname];

  if (metadata) {
    return metadata;
  }

  // Fallback для несуществующих страниц
  return {
    title: 'ArchPad — Современная платформа для управления архитектурой',
    description:
      'Управляйте архитектурой как код. Централизованное хранилище, автоматизация документации и управление техническим долгом.',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  };
}

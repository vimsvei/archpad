---
slug: pricing
title: Pricing Page
metadata:
  heroBadge: "Pricing"
  heroTitle: "Выберите"
  heroTitleAccent: "подходящий тариф"
  heroDescription: "Гибкие тарифы для команд любого размера. От стартапов до enterprise-компаний."

  deploymentToggle:
    saas: "SaaS"
    onprem: "On-prem / Private Cloud"

  currencyToggle:
    rub: "₽ Рубли"
    usd: "$ Доллары"

  recommendedBadge: "Рекомендуем"

  saasPrices:
    rub:
      starter: "3,490"
      team: "8,990"
      business: "17,990"
    usd:
      starter: "39"
      team: "99"
      business: "199"

  saasPlans:
    - name: "Starter"
      description: "Для небольших команд"
      priceKey: "starter"
      periodRub: "₽/пользователь/мес"
      periodUsd: "$/user/mo"
      icon: "Users"
      features:
        - "До 5 пользователей"
        - "До 1k объектов"
        - "Базовая история изменений"
        - "Экспорт данных"
        - "Email поддержка"
      notIncluded:
        - "SSO"
        - "RBAC"
        - "API доступ"
        - "SLA"
      cta: "Начать"
      highlight: false
    - name: "Team"
      description: "Для растущих команд"
      priceKey: "team"
      periodRub: "₽/пользователь/мес"
      periodUsd: "$/user/mo"
      icon: "Users"
      features:
        - "До 30 пользователей"
        - "До 10k объектов"
        - "Governance Lite"
        - "API read-only"
        - "Полная история изменений"
        - "Приоритетная поддержка"
      notIncluded:
        - "SSO"
        - "Полный RBAC"
        - "SLA гарантии"
      cta: "Выбрать"
      highlight: false
    - name: "Business"
      description: "Для архитектурных практик"
      priceKey: "business"
      periodRub: "₽/пользователь/мес"
      periodUsd: "$/user/mo"
      icon: "Building2"
      features:
        - "Неограниченно пользователей"
        - "Неограниченно объектов"
        - "Полный Governance"
        - "Impact & Risk Analysis"
        - "SSO (SAML, OAuth)"
        - "Полный RBAC"
        - "Полный API доступ"
        - "Интеграции (Jira, Git, CI/CD)"
        - "SLA 99.9%"
        - "Приоритетная поддержка 24/7"
      notIncluded: []
      cta: "Связаться с продажами"
      highlight: true
      note: "Минимальный объём обсуждается"
    - name: "Enterprise"
      description: "Выделенный контур"
      period: "Свяжитесь с отделом продаж"
      icon: "Shield"
      features:
        - "Всё из Business"
        - "Выделенный контур"
        - "Кастомизация под требования"
        - "Compliance (ISO, SOC2)"
        - "Dedicated support"
        - "Обучение команды"
        - "Custom SLA"
        - "On-boarding assistance"
      notIncluded: []
      cta: "Связаться с нами"
      highlight: false

  onpremCore:
    title: "Archpad Core"
    subtitle: "On-premise / Private Cloud"
    price: "Свяжитесь с отделом продаж"
    description: "Базовая платформа включает центральный репозиторий, управление зависимостями, базовую аналитику и экспорт данных."
    cta: "Запросить коммерческое предложение"

  onpremAddonsTitle: "Дополнительные модули и поддержка"
  onpremAddons:
    - name: "Governance Pack"
      price: "Свяжитесь с отделом продаж"
    - name: "Impact & Risk Pack"
      price: "Свяжитесь с отделом продаж"
    - name: "Integrations Pack"
      price: "Свяжитесь с отделом продаж"
    - name: "Standard Support (20%)"
      price: "от базовой стоимости"
    - name: "Premium Support 24×7 (30%)"
      price: "от базовой стоимости"

  saasAddons:
    title: "Дополнительные"
    titleAccent: "возможности"
    description: "Расширьте функционал платформы с помощью специализированных модулей"
    items:
      - name: "Impact & Risk Analysis"
        description: "Анализ влияния изменений"
      - name: "Compliance & Reporting"
        description: "Отчётность и соответствие"
      - name: "Delivery Integrations"
        description: "Интеграции с CI/CD"
      - name: "AI Assistance"
        description: "Помощь ИИ (в roadmap)"

  faqSection:
    title: "Часто задаваемые"
    titleAccent: "вопросы о покупке"
    items:
      - question: "Как считается стоимость?"
        answer: "Для SaaS-тарифов стоимость рассчитывается на основе количества активных пользователей в месяц. Для on-premise версии стоимость фиксированная и зависит от выбранных модулей и уровня поддержки."
      - question: "Можно ли начать с SaaS и перейти на on-premise?"
        answer: "Да, возможна миграция с SaaS на on-premise версию. Мы поможем с переносом данных и настройкой. Свяжитесь с нами для обсуждения деталей миграции."
      - question: "Какие требования по безопасности?"
        answer: "Мы обеспечиваем шифрование данных (TLS 1.3, AES-256), регулярные аудиты безопасности, соответствие стандартам ISO 27001 (в процессе сертификации). Для корпоративных клиентов доступны SSO, детальные логи аудита и geo-redundancy."
      - question: "Как устроена поддержка?"
        answer: "Starter/Team тарифы включают email поддержку (ответ в течение 48 часов). Business включает приоритетную поддержку 24/7 с SLA. Enterprise тарифы включают выделенного менеджера и custom SLA."

  finalCta:
    title: "Остались вопросы?"
    description: "Свяжитесь с нами, и мы поможем подобрать оптимальный тариф для вашей команды"
    salesButton: "Связаться с отделом продаж"
    demoButton: "Запросить демо"
---

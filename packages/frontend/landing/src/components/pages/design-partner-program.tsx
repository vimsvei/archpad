'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion } from 'motion/react';
import { Award, Calendar } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { getIcon } from '@/lib/icons';
import {
  getTextBlockBySlug,
  getMetadata,
  getMetadataValue,
} from '@/lib/text-blocks';

type Audience = {
  icon: string;
  title: string;
  description: string;
};

type BenefitCategory = {
  category: string;
  items: string[];
};

type TimelineItem = {
  period: string;
  title: string;
  description: string;
};

type PricingCard = {
  title: string;
  value: string;
  description: string;
};

type DeploymentOption = {
  value: string;
  label: string;
};

type FormFields = {
  companyLabel: string;
  companyPlaceholder: string;
  roleLabel: string;
  rolePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  sizeLabel: string;
  sizePlaceholder: string;
  goalsLabel: string;
  goalsPlaceholder: string;
  deploymentLabel: string;
  deploymentOptions: DeploymentOption[];
  submitButton: string;
  requiredHint: string;
};

export function DesignPartnerProgram() {
  usePageMeta();
  const content = getTextBlockBySlug('design-partner-program');

  const targetAudiences = getMetadataValue<Audience[]>(
    content,
    'targetAudiences',
    [],
  );
  const benefitCategories = getMetadataValue<BenefitCategory[]>(
    content,
    'benefitCategories',
    [],
  );
  const expectations = getMetadataValue<string[]>(content, 'expectations', []);
  const timeline = getMetadataValue<TimelineItem[]>(content, 'timeline', []);
  const pricingCards = getMetadataValue<PricingCard[]>(
    content,
    'pricingCards',
    [],
  );
  const formFields = getMetadataValue<FormFields>(content, 'formFields', {
    companyLabel: '',
    companyPlaceholder: '',
    roleLabel: '',
    rolePlaceholder: '',
    emailLabel: '',
    emailPlaceholder: '',
    sizeLabel: '',
    sizePlaceholder: '',
    goalsLabel: '',
    goalsPlaceholder: '',
    deploymentLabel: '',
    deploymentOptions: [],
    submitButton: '',
    requiredHint: '',
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#7CB342] to-[#689F38] text-white">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4 font-medium">
                {getMetadata(content, 'heroBadge')}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                {getMetadata(content, 'heroTitle')}{' '}
                <span className="text-white/90">
                  {getMetadata(content, 'heroTitleAccent')}
                </span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                {getMetadata(content, 'heroDescription')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#application-form"
                  className="px-8 py-4 bg-white text-[#7CB342] rounded-full font-medium hover:bg-gray-50 transition-all shadow-lg inline-flex items-center justify-center"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById('application-form')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {getMetadata(content, 'applyButton')}
                </a>
                <button className="px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all">
                  {getMetadata(content, 'presentationButton')}
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Target Audiences */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {getMetadata(content, 'targetTitle')}{' '}
                <span className="text-[#7CB342]">
                  {getMetadata(content, 'targetTitleAccent')}
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {getMetadata(content, 'targetDescription')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {targetAudiences.map((audience, index) => {
                const Icon = getIcon(audience.icon);
                return (
                  <motion.div
                    key={audience.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white to-[#F1F8E9]/30 rounded-2xl p-6 border-2 border-gray-100 hover:border-[#7CB342] hover:shadow-xl transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#7CB342] flex items-center justify-center mb-4">
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {audience.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {audience.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F1F8E9]/30">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {getMetadata(content, 'benefitsTitle')}{' '}
                <span className="text-[#7CB342]">
                  {getMetadata(content, 'benefitsTitleAccent')}
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {getMetadata(content, 'benefitsDescription')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefitCategories.map((benefit, index) => (
                <motion.div
                  key={benefit.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 border-2 border-gray-100"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-[#7CB342]">
                    {benefit.category}
                  </h3>
                  <ul className="space-y-4">
                    {benefit.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#F1F8E9] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-[#7CB342]" />
                        </div>
                        <span className="text-gray-700 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Expectations */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {getMetadata(content, 'expectationsTitle')}{' '}
                <span className="text-[#7CB342]">
                  {getMetadata(content, 'expectationsTitleAccent')}
                </span>
              </h2>
              <p className="text-lg text-gray-600">
                {getMetadata(content, 'expectationsDescription')}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {expectations.map((expectation, index) => (
                <motion.div
                  key={expectation}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white to-[#F1F8E9]/30 rounded-2xl p-6 border-2 border-gray-100 flex items-start gap-4"
                >
                  <Award className="text-[#7CB342] flex-shrink-0" size={24} />
                  <p className="text-gray-700 leading-relaxed">{expectation}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F1F8E9]/30">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {getMetadata(content, 'timelineTitle')}{' '}
                <span className="text-[#7CB342]">
                  {getMetadata(content, 'timelineTitleAccent')}
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {getMetadata(content, 'timelineDescription')}
              </p>
            </motion.div>

            <div className="space-y-6">
              {timeline.map((phase, index) => (
                <motion.div
                  key={`${phase.period}-${phase.title}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#7CB342] transition-all flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0 md:w-40">
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7CB342] text-white rounded-full text-sm font-medium">
                        <Calendar size={16} />
                        {phase.period}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {phase.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </div>

                  {index < timeline.length - 1 && (
                    <div className="hidden md:block absolute left-[76px] top-full w-0.5 h-6 bg-[#7CB342]/30" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {getMetadata(content, 'pricingTitle')}{' '}
                <span className="text-[#7CB342]">
                  {getMetadata(content, 'pricingTitleAccent')}
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {pricingCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white to-[#F1F8E9]/30 rounded-2xl p-8 border-2 border-gray-100"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {card.title}
                  </h3>
                  <div className="text-3xl font-bold text-[#7CB342] mb-2">
                    {card.value}
                  </div>
                  <p className="text-gray-600">{card.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center text-gray-500 mt-8"
            >
              {getMetadata(content, 'pricingFootnote')}
            </motion.p>
          </div>
        </section>

        {/* Application Form */}
        <section
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#7CB342] to-[#689F38]"
          id="application-form"
        >
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {getMetadata(content, 'formSectionTitle')}
              </h2>
              <p className="text-xl text-white/90">
                {getMetadata(content, 'formSectionDescription')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 lg:p-10"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {formFields.companyLabel}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#7CB342] focus:outline-none transition-colors"
                      placeholder={formFields.companyPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {formFields.roleLabel}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#7CB342] focus:outline-none transition-colors"
                      placeholder={formFields.rolePlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formFields.emailLabel}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#7CB342] focus:outline-none transition-colors"
                    placeholder={formFields.emailPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formFields.sizeLabel}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#7CB342] focus:outline-none transition-colors"
                    placeholder={formFields.sizePlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formFields.goalsLabel}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#7CB342] focus:outline-none transition-colors resize-none"
                    placeholder={formFields.goalsPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formFields.deploymentLabel}
                  </label>
                  <div className="flex gap-4">
                    {formFields.deploymentOptions.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="deployment"
                          value={option.value}
                          className="w-4 h-4 text-[#7CB342] focus:ring-[#7CB342]"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#7CB342] hover:bg-[#689F38] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  {formFields.submitButton}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  {formFields.requiredHint}
                </p>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

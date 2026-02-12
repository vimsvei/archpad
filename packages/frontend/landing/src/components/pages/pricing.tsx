'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Check, X, HelpCircle, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router';
import { usePageMeta } from '@/hooks/usePageMeta';
import { getIcon } from '@/lib/icons';
import {
  getTextBlockBySlug,
  getMetadata,
  getMetadataValue,
} from '@/lib/text-blocks';

type Currency = 'rub' | 'usd';
type DeploymentType = 'saas' | 'onprem';

type SaasPrices = {
  rub: Record<string, string>;
  usd: Record<string, string>;
};

type SaasPlan = {
  name: string;
  description: string;
  priceKey?: string;
  period?: string;
  periodRub?: string;
  periodUsd?: string;
  icon: string;
  features: string[];
  notIncluded: string[];
  cta: string;
  highlight: boolean;
  note?: string;
};

type OnpremAddon = {
  name: string;
  price: string;
};

type AddonItem = {
  name: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type OnpremCore = {
  title: string;
  subtitle: string;
  price: string;
  description: string;
  cta: string;
};

export function Pricing() {
  usePageMeta();
  const content = getTextBlockBySlug('pricing');

  const [deploymentType, setDeploymentType] = useState<DeploymentType>('saas');
  const [currency, setCurrency] = useState<Currency>('rub');

  const saasPrices = getMetadataValue<SaasPrices>(content, 'saasPrices', {
    rub: {},
    usd: {},
  });
  const saasPlans = getMetadataValue<SaasPlan[]>(content, 'saasPlans', []);
  const onpremCore = getMetadataValue<OnpremCore>(content, 'onpremCore', {
    title: '',
    subtitle: '',
    price: '',
    description: '',
    cta: '',
  });
  const onpremAddons = getMetadataValue<OnpremAddon[]>(
    content,
    'onpremAddons',
    [],
  );
  const saasAddonItems = getMetadataValue<AddonItem[]>(
    content,
    'saasAddons.items',
    [],
  );
  const faqItems = getMetadataValue<FaqItem[]>(content, 'faqSection.items', []);

  const getSaasPrice = (plan: SaasPlan): string | null => {
    if (!plan.priceKey) return null;
    return saasPrices[currency]?.[plan.priceKey] ?? null;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F1F8E9] to-white">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-block px-4 py-2 bg-[#7CB342] text-white rounded-full text-sm mb-4 font-medium">
                {getMetadata(content, 'heroBadge')}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                {getMetadata(content, 'heroTitle')}{' '}
                <span className="text-[#7CB342]">
                  {getMetadata(content, 'heroTitleAccent')}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {getMetadata(content, 'heroDescription')}
              </p>
            </motion.div>

            {/* Toggles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
            >
              <div className="inline-flex items-center bg-white rounded-full p-1 border-2 border-gray-200">
                <button
                  onClick={() => setDeploymentType('saas')}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    deploymentType === 'saas'
                      ? 'bg-[#7CB342] text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {getMetadata(content, 'deploymentToggle.saas')}
                </button>
                <button
                  onClick={() => setDeploymentType('onprem')}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    deploymentType === 'onprem'
                      ? 'bg-[#7CB342] text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {getMetadata(content, 'deploymentToggle.onprem')}
                </button>
              </div>

              {deploymentType === 'saas' && (
                <div className="inline-flex items-center bg-white rounded-full p-1 border-2 border-gray-200">
                  <button
                    onClick={() => setCurrency('rub')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      currency === 'rub'
                        ? 'bg-[#7CB342] text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {getMetadata(content, 'currencyToggle.rub')}
                  </button>
                  <button
                    onClick={() => setCurrency('usd')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      currency === 'usd'
                        ? 'bg-[#7CB342] text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {getMetadata(content, 'currencyToggle.usd')}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards - SaaS */}
        {deploymentType === 'saas' && (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {saasPlans.map((plan, index) => {
                  const Icon = getIcon(plan.icon);
                  const price = getSaasPrice(plan);
                  const period =
                    currency === 'rub' ? plan.periodRub : plan.periodUsd;

                  return (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative rounded-3xl p-8 ${
                        plan.highlight
                          ? 'bg-gradient-to-br from-[#7CB342] to-[#689F38] text-white shadow-2xl scale-105'
                          : 'bg-white border-2 border-gray-100'
                      }`}
                    >
                      {plan.highlight && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white text-[#7CB342] rounded-full text-sm font-medium shadow-lg">
                          {getMetadata(content, 'recommendedBadge')}
                        </div>
                      )}

                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                          plan.highlight
                            ? 'bg-white/20 backdrop-blur-sm'
                            : 'bg-[#F1F8E9]'
                        }`}
                      >
                        <Icon
                          className={
                            plan.highlight ? 'text-white' : 'text-[#7CB342]'
                          }
                          size={24}
                        />
                      </div>

                      <h3
                        className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`text-sm mb-6 ${plan.highlight ? 'text-white/80' : 'text-gray-600'}`}
                      >
                        {plan.description}
                      </p>

                      <div className="mb-6">
                        {price ? (
                          <>
                            <div
                              className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}
                            >
                              {price}
                            </div>
                            <div
                              className={`text-sm ${plan.highlight ? 'text-white/80' : 'text-gray-600'}`}
                            >
                              {period}
                            </div>
                          </>
                        ) : (
                          <div
                            className={`text-lg font-medium ${plan.highlight ? 'text-white' : 'text-gray-900'}`}
                          >
                            {plan.period}
                          </div>
                        )}
                        {plan.note && (
                          <div
                            className={`text-xs mt-2 ${plan.highlight ? 'text-white/70' : 'text-gray-500'}`}
                          >
                            {plan.note}
                          </div>
                        )}
                      </div>

                      <button
                        className={`w-full py-3 rounded-full font-medium mb-6 transition-all ${
                          plan.highlight
                            ? 'bg-white text-[#7CB342] hover:bg-gray-50'
                            : 'bg-[#7CB342] text-white hover:bg-[#689F38]'
                        }`}
                      >
                        {plan.cta}
                      </button>

                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <Check
                              className={`flex-shrink-0 ${plan.highlight ? 'text-white' : 'text-[#7CB342]'}`}
                              size={18}
                            />
                            <span
                              className={`text-sm ${plan.highlight ? 'text-white' : 'text-gray-700'}`}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                        {plan.notIncluded.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 opacity-50"
                          >
                            <X
                              className={`flex-shrink-0 ${plan.highlight ? 'text-white' : 'text-gray-400'}`}
                              size={18}
                            />
                            <span
                              className={`text-sm ${plan.highlight ? 'text-white' : 'text-gray-500'}`}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* On-prem Pricing */}
        {deploymentType === 'onprem' && (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-[#7CB342] to-[#689F38] rounded-3xl p-10 text-white mb-12"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Shield className="text-white" size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{onpremCore.title}</h3>
                    <p className="text-white/80">{onpremCore.subtitle}</p>
                  </div>
                </div>

                <div className="text-5xl font-bold mb-6">
                  {onpremCore.price}
                </div>

                <p className="text-white/90 mb-8 text-lg">
                  {onpremCore.description}
                </p>

                <button className="px-10 py-4 bg-white text-[#7CB342] rounded-full font-medium hover:bg-gray-50 transition-all shadow-lg">
                  {onpremCore.cta}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {getMetadata(content, 'onpremAddonsTitle')}
                </h3>

                <div className="grid sm:grid-cols-2 gap-6">
                  {onpremAddons.map((addon) => (
                    <div
                      key={addon.name}
                      className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#7CB342]/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">
                            {addon.name}
                          </h4>
                          <p className="text-sm text-gray-600">{addon.price}</p>
                        </div>
                        <Zap className="text-[#7CB342]" size={24} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Add-ons Section (for SaaS) */}
        {deploymentType === 'saas' && (
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F1F8E9]/30">
            <div className="container mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {getMetadata(content, 'saasAddons.title')}{' '}
                  <span className="text-[#7CB342]">
                    {getMetadata(content, 'saasAddons.titleAccent')}
                  </span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {getMetadata(content, 'saasAddons.description')}
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {saasAddonItems.map((addon, index) => (
                  <motion.div
                    key={addon.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#7CB342] hover:shadow-lg transition-all"
                  >
                    <Zap className="text-[#7CB342] mb-4" size={32} />
                    <h4 className="font-bold text-gray-900 mb-2">
                      {addon.name}
                    </h4>
                    <p className="text-sm text-gray-600">{addon.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {getMetadata(content, 'faqSection.title')}{' '}
                <span className="text-[#7CB342]">
                  {getMetadata(content, 'faqSection.titleAccent')}
                </span>
              </h2>
            </motion.div>

            <div className="space-y-6">
              {faqItems.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-100 rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <HelpCircle
                      className="text-[#7CB342] flex-shrink-0"
                      size={24}
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#7CB342] to-[#689F38]">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                {getMetadata(content, 'finalCta.title')}
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {getMetadata(content, 'finalCta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact?subject=sales"
                  className="px-8 py-4 bg-white text-[#7CB342] rounded-full font-medium hover:bg-gray-50 transition-all shadow-lg inline-flex items-center justify-center"
                >
                  {getMetadata(content, 'finalCta.salesButton')}
                </Link>
                <Link
                  to="/contact?subject=demo"
                  className="px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all inline-flex items-center justify-center"
                >
                  {getMetadata(content, 'finalCta.demoButton')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

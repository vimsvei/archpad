'use client';

import { motion } from 'motion/react';
import { Link } from 'react-router';
import { getIcon } from '@/lib/icons';
import { features } from '@/content';
import {
  getTextBlockBySlug,
  getMetadata,
  getMetadataValue,
} from '@/lib/text-blocks';

export function Features() {
  const sortedFeatures = [...features].sort((a, b) => a.order - b.order);
  const content = getTextBlockBySlug('features');
  const featureRoutes = getMetadataValue<
    Array<{ title: string; path: string }>
  >(content, 'featureRoutes', []);
  const featureRouteMap = new Map(
    featureRoutes.map((item) => [item.title, item.path]),
  );

  // Map feature titles to route paths
  const getFeaturePath = (title: string): string => {
    return featureRouteMap.get(title) || '/';
  };

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#F1F8E9] text-[#7CB342] rounded-full text-sm mb-4">
            {getMetadata(content, 'badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {getMetadata(content, 'headline')}{' '}
            <span className="text-[#7CB342]">
              {getMetadata(content, 'headlineAccent')}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {getMetadata(content, 'description')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedFeatures.map((feature, index) => {
            const Icon = getIcon(feature.icon);

            return (
              <Link to={getFeaturePath(feature.title)} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all cursor-pointer h-full"
                >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl from-green-500 to-emerald-500" />

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="text-white" size={28} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Arrow Icon */}
                  <div className="text-[#7CB342] opacity-0 group-hover:opacity-100 transition-opacity">
                    → {getMetadata(content, 'learnMore')}
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

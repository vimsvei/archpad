'use client';

import { motion } from 'motion/react';
import { getIcon } from '@/lib/icons';
import { ImageWithFallback } from './figma/image-with-fallback';
import { useCases } from '@/content';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getTextBlockBySlug, getMetadata } from '@/lib/text-blocks';

export function UseCases() {
  const sortedUseCases = [...useCases].sort((a, b) => a.order - b.order);
  const content = getTextBlockBySlug('use-cases');
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="cases" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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

        {/* Use Cases Carousel */}
        <div className="relative">
          <div className="overflow-hidden pb-6" ref={emblaRef}>
            <div className="flex">
              {sortedUseCases.map((useCase, index) => {
                const Icon = getIcon(useCase.icon);

                return (
                  <div
                    key={useCase.title}
                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all h-[560px]"
                    >
                      {/* Image - 2/3 of the card height */}
                      <div className="relative h-80 overflow-hidden bg-[#F1F8E9]">
                        <ImageWithFallback
                          src={useCase.image}
                          alt={useCase.title}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-6"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                        {/* Icon */}
                        <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="text-[#7CB342]" size={24} />
                        </div>
                      </div>

                      {/* Content - 1/3 of the card height */}
                      <div className="p-6 flex flex-col h-[240px]">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {useCase.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                          {useCase.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {useCase.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#7CB342] hover:text-white transition-all"
            aria-label={getMetadata(content, 'prevButton')}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#7CB342] hover:text-white transition-all"
            aria-label={getMetadata(content, 'nextButton')}
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === selectedIndex
                    ? 'bg-[#7CB342] w-8'
                    : 'bg-[#7CB342] opacity-25 hover:opacity-50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-[#7CB342] rounded-2xl p-1">
            <div className="bg-white rounded-xl p-8 sm:p-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {getMetadata(content, 'ctaTitle')}
              </h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                {getMetadata(content, 'ctaDescription')}
              </p>
              <Link
                to="/contact"
                className="inline-flex px-8 py-4 bg-[#7CB342] hover:bg-[#689F38] text-white rounded-full hover:shadow-xl transition-all"
              >
                {getMetadata(content, 'ctaButton')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

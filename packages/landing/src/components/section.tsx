import * as React from 'react';
import { cn } from '@/lib/utils';

type SectionProps = React.ComponentProps<'section'> & {
  id?: string;
  variant?: 'default' | 'hero' | 'muted';
  title?: React.ReactNode;
};

export function Section({
  id,
  variant = 'default',
  title,
  className,
  children,
  ...props
}: SectionProps) {
  const isHero = variant === 'hero';
  const isMuted = variant === 'muted';

  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24',
        isHero && 'flex min-h-[60vh] flex-col justify-center',
        isMuted && 'bg-muted/50',
        className
      )}
      {...props}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {title && (
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

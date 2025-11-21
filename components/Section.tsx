
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', narrow = false }) => {
  return (
    <section className={`${narrow ? 'py-12 md:py-16' : 'py-20 md:py-24'} ${className}`}>
      <div className="max-w-[1200px] mx-auto px-5 h-full w-full">
        {children}
      </div>
    </section>
  );
};

export const PageHero: React.FC<{ title: string; sub?: string; children?: React.ReactNode }> = ({ title, sub, children }) => {
  return (
    <Section className="pt-10 pb-10 md:pt-16 md:pb-12">
       <div className="text-xs uppercase tracking-[0.18em] text-secondary font-medium mb-3">
          HEONA MEDIA
       </div>
       <h1 className="font-heading font-extrabold text-4xl md:text-5xl mb-4 relative inline-block">
          <span className="relative z-10">{title}</span>
          <span className="absolute bottom-1.5 left-0 w-full h-[0.3em] bg-gradient-to-r from-primary/50 to-secondary/40 -z-0 rounded-full opacity-60"></span>
       </h1>
       {sub && <p className="max-w-3xl text-textMuted text-base md:text-lg leading-relaxed">{sub}</p>}
       {children}
    </Section>
  );
};

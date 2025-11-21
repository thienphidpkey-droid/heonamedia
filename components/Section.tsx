import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', narrow = false }) => {
  return (
    <section className={`${narrow ? 'py-16 md:py-20' : 'py-24 md:py-28'} ${className}`}>
      <div className="max-w-[1200px] mx-auto px-5 h-full w-full">
        {children}
      </div>
    </section>
  );
};

export const PageHero: React.FC<{ title: string; sub?: string; children?: React.ReactNode }> = ({ title, sub, children }) => {
  return (
    <Section className="pt-12 pb-12 md:pt-20 md:pb-14">
       <div className="text-sm uppercase tracking-[0.18em] text-secondary font-medium mb-4">
          HEONA MEDIA
       </div>
       <h1 className="font-heading font-extrabold text-5xl md:text-6xl mb-6 relative inline-block">
          <span className="relative z-10">{title}</span>
          <span className="absolute bottom-2 left-0 w-full h-[0.3em] bg-gradient-to-r from-primary/50 to-secondary/40 -z-0 rounded-full opacity-60"></span>
       </h1>
       {sub && <p className="max-w-3xl text-textMuted text-lg md:text-xl leading-relaxed">{sub}</p>}
       {children}
    </Section>
  );
};
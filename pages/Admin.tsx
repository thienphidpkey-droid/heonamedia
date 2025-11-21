
import React from 'react';
import { PageHero, Section } from '../components/Section';

export const Admin: React.FC = () => {
  return (
    <>
      <PageHero title="Admin Disabled" sub="This feature has been disabled for production." />
      <Section narrow>
        <div className="text-center text-textMuted">
          Please edit the content directly in the source code.
        </div>
      </Section>
    </>
  );
};

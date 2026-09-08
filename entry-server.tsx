import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { StaticRouter } from 'react-router';
import { AppRoutes } from './App';
import { ContentProvider } from './context/ContentContext';

interface HelmetContext {
  helmet?: HelmetServerState;
}

export const render = (url: string) => {
  const helmetContext: HelmetContext = {};
  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <ContentProvider>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </ContentProvider>
      </HelmetProvider>
    </React.StrictMode>
  );

  const helmet = helmetContext.helmet;
  const head = helmet
    ? [helmet.title, helmet.priority, helmet.meta, helmet.link, helmet.script]
        .map(part => part.toString())
        .join('\n')
    : '';

  return { html, head };
};

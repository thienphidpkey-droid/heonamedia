
import React, { useLayoutEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Projects } from './pages/Projects';
import { Pricing } from './pages/Pricing';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { ContentProvider } from './context/ContentContext';

// Scroll to top on route change using useLayoutEffect for immediate execution
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </ContentProvider>
  );
};

export default App;

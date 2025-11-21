
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { path: '/', label: 'Trang chủ' },
  { path: '/about', label: 'Giới thiệu' },
  { path: '/services', label: 'Dịch vụ' },
  { path: '/projects', label: 'Dự án' },
  { path: '/pricing', label: 'Bảng giá' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Liên hệ' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Đóng menu khi chuyển trang
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Hàm xử lý đóng menu khi click vào link trên mobile
  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-[rgba(5,5,9,0.94)] backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={handleMobileLinkClick}>
            <img 
              src="https://i.postimg.cc/nck9qgG5/481456887-122109905270769501-305987371640573178-n.jpg" 
              alt="HEONA MEDIA"
              className="w-12 h-12 rounded-full object-cover shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform border border-white/10"
            />
            <div className="flex flex-col">
              <span className="font-heading text-[15px] uppercase tracking-[0.08em] text-white font-bold leading-none mb-1.5">
                HEONA MEDIA
              </span>
              <span className="text-[11px] text-textMuted uppercase tracking-[0.12em] leading-none">
                Event • Media Production
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 text-base font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-primary hover:to-secondary ${
                  location.pathname === link.path ? 'text-white' : 'text-textMuted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#5a2dff] via-primary to-secondary text-white text-base font-bold hover:from-secondary hover:to-secondary hover:shadow-lg hover:shadow-secondary/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              Nhận báo giá
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden w-10 h-10 rounded-full border border-borderSubtle flex items-center justify-center text-white hover:bg-white/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Nav with Smooth Transition */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <nav className="flex flex-col gap-2 pt-4 border-t border-white/5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleMobileLinkClick}
                className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-white/5 text-white'
                    : 'text-textMuted hover:text-white hover:bg-gradient-to-r hover:from-primary hover:to-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-4 px-2 pb-2">
              <Link
                to="/contact"
                onClick={handleMobileLinkClick}
                className="w-full text-center px-4 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-base font-bold hover:from-secondary hover:to-secondary transition-all"
              >
                Nhận báo giá
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

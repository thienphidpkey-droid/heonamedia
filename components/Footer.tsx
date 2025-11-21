
import React from 'react';
import { Facebook, Youtube, Instagram, Linkedin, Phone, Mail } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Footer: React.FC = () => {
  const { contactInfo } = useContent();

  return (
    <footer className="border-t border-white/5 bg-[#050507] py-14 mt-20">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-5">
            <div>
                <div className="font-heading font-bold text-base tracking-wide text-white">© HEONA MEDIA</div>
                <div className="text-sm text-textMuted uppercase tracking-wider mt-2">Tổ chức sự kiện – Thi công sân khấu – Media</div>
            </div>

            <div className="flex flex-col gap-3">
                 <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-textMuted hover:text-primary transition-colors w-fit">
                    <Phone size={16} />
                    <span>{contactInfo.phone}</span>
                 </a>
                 <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 text-sm text-textMuted hover:text-primary transition-colors w-fit">
                    <Mail size={16} />
                    <span>{contactInfo.email}</span>
                 </a>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-sm text-textMuted">Theo dõi:</span>
            <div className="flex gap-4">
              <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-borderSubtle flex items-center justify-center text-textMuted hover:text-white hover:border-primary hover:bg-primary/10 transition-all duration-300">
                  <Facebook size={18} />
              </a>
              <a href={contactInfo.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-borderSubtle flex items-center justify-center text-textMuted hover:text-white hover:border-primary hover:bg-primary/10 transition-all duration-300">
                  <Youtube size={18} />
              </a>
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-borderSubtle flex items-center justify-center text-textMuted hover:text-white hover:border-primary hover:bg-primary/10 transition-all duration-300">
                  <Instagram size={18} />
              </a>
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-borderSubtle flex items-center justify-center text-textMuted hover:text-white hover:border-primary hover:bg-primary/10 transition-all duration-300">
                  <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

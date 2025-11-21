
import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero, Section } from '../components/Section';
import { Zap, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Services: React.FC = () => {
  const { services } = useContent();

  return (
    <>
      <PageHero 
        title="Các gói dịch vụ" 
        sub="Giải pháp linh hoạt, đồng hành cùng cá nhân & doanh nghiệp trong kỷ nguyên số." 
      />

      <Section narrow>
        {/* 4 Columns strictly on Large screens for horizontal layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={service.id} className="animate-fade-in h-full flex" style={{ animationDelay: `${index * 100}ms` }}>
              {/* Vertical Card Styling */}
              <div className="w-full flex flex-col bg-[#111115]/60 backdrop-blur border border-white/5 rounded-xl overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_20px_rgba(111,58,255,0.15)] transition-all duration-300 relative">
                
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111115] to-transparent" />
                  
                  <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 rounded-md bg-black/60 backdrop-blur border border-white/10 text-xs font-bold uppercase tracking-widest text-white">
                        {service.tag}
                      </span>
                  </div>
                </div>

                <div className="flex flex-col flex-grow p-7 -mt-8 relative z-10">
                  <h2 className="font-heading font-bold text-2xl leading-snug mb-2 group-hover:text-primary transition-colors">{service.title}</h2>
                  {service.subTitle && <div className="text-secondary text-sm font-medium mb-4 tracking-wide">{service.subTitle}</div>}
                  
                  <div className="w-16 h-[1px] bg-white/10 mb-5" />

                  <ul className="space-y-3 mb-8 flex-grow">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-base text-textMuted group-hover:text-textMain transition-colors">
                        <Zap size={14} className="mt-[5px] text-secondary shrink-0" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    to="/contact" 
                    className="mt-auto w-full py-3.5 rounded bg-white/5 border border-white/10 text-sm font-bold uppercase tracking-wider text-center hover:bg-primary hover:border-primary hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-primary/20"
                  >
                    Nhận báo giá <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};
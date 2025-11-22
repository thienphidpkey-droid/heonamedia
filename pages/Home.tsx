
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { ArrowRight, Hexagon, Layers, Radio, Phone, Mail, MapPin } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SEO } from '../components/SEO';

const HERO_IMAGES = [
  "https://i.postimg.cc/hvSh7Y9d/a1.jpg",
  "https://i.postimg.cc/zvJ3RQnW/a2.jpg",
  "https://i.postimg.cc/zvJ3RQnW/a2.jpg"
];

export const Home: React.FC = () => {
  const { projects, contactInfo } = useContent();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <SEO 
        title="Tổ chức sự kiện & Sản xuất Media"
        description="HEONA MEDIA chuyên tổ chức sự kiện trọn gói, livestream chuyên nghiệp, quay phim doanh nghiệp và xây dựng thương hiệu cá nhân uy tín tại TP.HCM."
      />

      {/* Hero Section */}
      <Section className="pt-10 pb-8 md:pt-20 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0" />
        
        <div className="absolute top-24 left-5 w-4 h-4 border-t border-l border-white/20" />
        <div className="absolute top-24 right-5 w-4 h-4 border-t border-r border-white/20" />
        <div className="absolute bottom-10 left-5 w-4 h-4 border-b border-l border-white/20" />
        <div className="absolute bottom-10 right-5 w-4 h-4 border-b border-r border-white/20" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center relative z-10">
          {/* Left Content */}
          <div className="animate-slide-up relative">
            <div className="flex items-center gap-3 mb-5">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
                </span>
                <div className="text-xs uppercase tracking-[0.2em] text-secondary font-mono font-bold">
                  Tổ chức sự kiện • Sản xuất media
                </div>
            </div>
            
            <h1 className="font-heading font-extrabold text-2xl md:text-4xl lg:text-5xl leading-[1.1] mb-6 tracking-tight">
              TỔ CHỨC SỰ KIỆN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#9d7aff] to-secondary drop-shadow-[0_0_10px_rgba(111,58,255,0.5)] text-xl md:text-3xl lg:text-4xl block mt-2">
                CHUYÊN NGHIỆP
              </span>
            </h1>
             <h2 className="font-heading font-bold text-white/90 text-lg md:text-xl mb-6">
                HEONA MEDIA – Giải pháp đồng bộ từ ý tưởng đến triển khai
            </h2>
            
            <p className="text-textMuted text-lg mb-8 leading-relaxed max-w-2xl pl-5 border-l-4 border-primary/50">
              Từ khai trương, hội nghị đến Year End Party, HEONA MEDIA đồng hành cùng doanh nghiệp xây dựng trải nghiệm sự kiện rõ ràng, kiểm soát tốt chất lượng và ngân sách.
              <br/><br/>
              <span className="text-white italic text-base">“Chúng tôi hiện thực hóa mọi sự kiện với tư duy sản xuất tinh gọn, đội ngũ kỹ thuật lành nghề và phong cách làm việc kỷ luật.”</span>
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/projects" className="group relative px-8 py-4 rounded-none clip-path-slant bg-white text-bgMain font-bold text-sm transition-all hover:bg-secondary hover:text-white overflow-hidden" aria-label="Xem danh sách dự án">
                 <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
                 <span className="relative z-10 flex items-center gap-2">
                    XEM DỰ ÁN <ArrowRight size={16} />
                 </span>
              </Link>
              <Link to="/contact" className="px-8 py-4 rounded-none clip-path-slant border border-white/20 bg-white/5 backdrop-blur text-white font-bold text-sm hover:bg-secondary hover:border-secondary hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300" aria-label="Liên hệ báo giá">
                NHẬN BÁO GIÁ NHANH
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-textMuted font-mono tracking-tight pt-6 border-t border-white/5">
              <span className="flex items-center gap-2"><Layers size={16} className="text-primary" /> Thi công sân khấu</span>
              <span className="flex items-center gap-2"><Radio size={16} className="text-primary" /> Livestream – Media</span>
              <span className="flex items-center gap-2"><Hexagon size={16} className="text-primary" /> Chi phí minh bạch</span>
            </div>
          </div>

          {/* Right Visual (Slider) */}
          <div className="relative animate-fade-in delay-200 group perspective-1000">
             <div className="absolute -inset-3 border border-white/5 rounded-xl skew-y-2 group-hover:skew-y-1 transition-transform duration-700"></div>
             <div className="absolute -inset-3 border border-primary/20 rounded-xl skew-y-2 blur-sm opacity-50 group-hover:opacity-80 transition-opacity"></div>

             <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] bg-bgSoft">
                {HERO_IMAGES.map((img, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img 
                        src={img} 
                        alt={`Heona Media Event Highlight ${index + 1}`} 
                        className="w-full h-full object-cover"
                        loading={index === 0 ? "eager" : "lazy"} // Optimize LCP
                        width="800" 
                        height="600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bgMain via-transparent to-transparent opacity-40"></div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </Section>

      {/* Dịch vụ Tóm tắt */}
      <Section className="relative border-t border-white/5 pt-16 pb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        <div className="text-center mb-12">
          <div className="text-xs font-mono text-primary uppercase tracking-widest mb-2">[ SERVICES ]</div>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl">Dịch vụ trọng tâm của HEONA MEDIA</h2>
          <p className="text-textMuted text-base mt-4 max-w-3xl mx-auto">
             HEONA MEDIA tập trung vào hai mảng: tổ chức sự kiện là lõi chính, media là nhánh mở rộng giúp nội dung sự kiện được ghi lại và tái sử dụng cho truyền thông.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link to="/pricing" className="group relative bg-[#111115] border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 flex flex-col" aria-label="Chi tiết dịch vụ Tổ chức sự kiện">
             <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="p-8 relative z-10 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-5">
                    <h3 className="font-heading font-bold text-2xl group-hover:text-primary transition-colors">Tổ chức sự kiện</h3>
                    <ArrowRight className="text-white/20 group-hover:text-primary -translate-x-2 group-hover:translate-x-0 transition-all w-6 h-6" />
                </div>
                <p className="text-textMuted text-sm mb-6 leading-relaxed">
                  Lên ý tưởng – kịch bản – thi công – vận hành trọn gói theo mục tiêu doanh nghiệp.
                </p>
                
                <ul className="space-y-3 mb-8 flex-grow">
                    {['Lễ khai trương – khánh thành', 'Hội nghị – hội thảo – họp báo', 'Tiệc tất niên – Year End Party', 'Activation – Roadshow', 'Ra mắt sản phẩm'].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-textMuted group-hover:text-white transition-colors">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="flex gap-2 mt-auto pt-6 border-t border-white/5">
                   <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded text-secondary font-mono uppercase tracking-wide">Ý tưởng bám sát mục tiêu</span>
                   <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded text-secondary font-mono uppercase tracking-wide">Thi công đúng timeline</span>
                </div>
             </div>
          </Link>

          <Link to="/pricing" className="group relative bg-[#111115] border border-white/10 rounded-xl overflow-hidden hover:border-secondary/50 transition-all duration-500 flex flex-col" aria-label="Chi tiết dịch vụ Xây dựng thương hiệu">
             <div className="absolute inset-0 bg-gradient-to-l from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="p-8 relative z-10 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-5">
                    <h3 className="font-heading font-bold text-2xl group-hover:text-secondary transition-colors">Xây dựng nhân hiệu cá nhân</h3>
                    <ArrowRight className="text-white/20 group-hover:text-secondary -translate-x-2 group-hover:translate-x-0 transition-all w-6 h-6" />
                </div>
                <p className="text-textMuted text-sm mb-6 leading-relaxed">
                  Ghi hình – chụp ảnh – livestream đa camera – dựng highlight và TVC doanh nghiệp.
                </p>
                
                <ul className="space-y-3 mb-8 flex-grow">
                    {['Quay phim & chụp ảnh sự kiện', 'Livestream đa camera', 'Dựng video highlight', 'TVC – Video doanh nghiệp'].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-textMuted group-hover:text-white transition-colors">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></div>
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="flex gap-2 mt-auto pt-6 border-t border-white/5">
                   <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded text-primary font-mono uppercase tracking-wide">Thiết bị hiện đại</span>
                   <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded text-primary font-mono uppercase tracking-wide">Đội ngũ trẻ</span>
                </div>
             </div>
          </Link>
        </div>
      </Section>

      {/* Dự án nổi bật */}
      <Section narrow className="relative pb-16">
         <div className="flex flex-col items-center mb-10 text-center">
            <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-2">[ PROJECTS ]</div>
            <h2 className="font-heading font-extrabold text-4xl">DỰ ÁN TIÊU BIỂU</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 4).map((item) => (
                <div key={item.id} className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-bgCard hover:border-primary/50 transition-all duration-500">
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        loading="lazy"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="text-xs font-mono text-primary mb-1 px-2 py-1 bg-primary/20 w-fit rounded border border-primary/30 backdrop-blur-sm">
                            {item.category}
                        </div>
                        <h3 className="font-heading font-bold text-xl md:text-2xl text-white leading-tight mb-1">{item.title}</h3>
                        <p className="text-textMuted text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
         </div>
         
         <div className="mt-12 flex justify-center">
            <Link to="/projects" className="group relative px-10 py-4 bg-white text-bgMain font-heading font-bold text-base tracking-wider rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(111,58,255,0.6)] flex items-center gap-2 overflow-hidden" aria-label="Xem tất cả dự án">
                <span className="relative z-10">XEM TẤT CẢ DỰ ÁN</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute inset-0 bg-white mix-blend-screen opacity-0 group-hover:opacity-20"></span>
            </Link>
         </div>
      </Section>

      {/* Contact Info Section */}
      <Section narrow className="pt-8 pb-16 border-t border-white/5 bg-[#08080a]">
        <div className="max-w-4xl mx-auto bg-[#111115] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10 rounded-full group-hover:bg-primary/20 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 blur-3xl -z-10 rounded-full group-hover:bg-secondary/20 transition-colors"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                    <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-2">Kết nối ngay</div>
                    <h2 className="font-heading font-bold text-2xl md:text-3xl mb-5 text-white">Thông tin liên hệ</h2>
                    <div className="space-y-5">
                         <div className="flex items-start gap-4">
                            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5 shrink-0">
                                <Phone size={16} />
                            </div>
                            <div>
                                <div className="text-[10px] text-textMuted uppercase tracking-wider mb-0.5">Hotline / Zalo</div>
                                <div className="text-lg font-bold text-white">{contactInfo.phone}</div>
                            </div>
                         </div>
                         <div className="flex items-start gap-4">
                            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5 shrink-0">
                                <Mail size={16} />
                            </div>
                            <div>
                                <div className="text-[10px] text-textMuted uppercase tracking-wider mb-0.5">Email</div>
                                <div className="text-lg font-bold text-white break-all">{contactInfo.email}</div>
                            </div>
                         </div>
                         <div className="flex items-start gap-4">
                            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5 shrink-0">
                                <MapPin size={16} />
                            </div>
                            <div>
                                <div className="text-[10px] text-textMuted uppercase tracking-wider mb-0.5">Địa chỉ</div>
                                <div className="text-base text-white leading-snug">{contactInfo.address}</div>
                            </div>
                         </div>
                    </div>
                </div>
                
                <div className="flex-shrink-0">
                     <Link to="/contact" className="inline-flex items-center justify-center w-full md:w-auto px-7 py-3.5 bg-white text-black font-bold text-base rounded-full hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white hover:scale-105 transition-all shadow-lg" aria-label="Gửi yêu cầu tư vấn ngay">
                        Gửi yêu cầu tư vấn <ArrowRight className="ml-2" size={18} />
                     </Link>
                     <div className="mt-3 text-center text-xs text-textMuted">
                        Phản hồi nhanh trong 24h
                     </div>
                </div>
            </div>
        </div>
      </Section>
    </>
  );
};

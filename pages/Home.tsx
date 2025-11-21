
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { ArrowRight, Hexagon, Layers, Radio, Phone, Mail, MapPin } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const HERO_IMAGES = [
  "https://picsum.photos/1200/800?random=10",
  "https://picsum.photos/1200/800?random=11",
  "https://picsum.photos/1200/800?random=12"
];

export const Home: React.FC = () => {
  const { projects, contactInfo } = useContent(); // Lấy dữ liệu động từ Context
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-12 pb-10 md:pt-24 md:pb-20 relative overflow-hidden">
        {/* Tech Decor - Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0" />
        
        {/* Corner Markers */}
        <div className="absolute top-24 left-5 w-4 h-4 border-t border-l border-white/20" />
        <div className="absolute top-24 right-5 w-4 h-4 border-t border-r border-white/20" />
        <div className="absolute bottom-10 left-5 w-4 h-4 border-b border-l border-white/20" />
        <div className="absolute bottom-10 right-5 w-4 h-4 border-b border-r border-white/20" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="animate-slide-up relative">
            <div className="flex items-center gap-3 mb-6">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                </span>
                <div className="text-sm uppercase tracking-[0.2em] text-secondary font-mono font-bold">
                  Tổ chức sự kiện • Sản xuất media
                </div>
            </div>
            
            <h1 className="font-heading font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 tracking-tight">
              TỔ CHỨC SỰ KIỆN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#9d7aff] to-secondary drop-shadow-[0_0_10px_rgba(111,58,255,0.5)] text-3xl md:text-5xl lg:text-6xl block mt-3">
                CHUYÊN NGHIỆP
              </span>
            </h1>
             <h2 className="font-heading font-bold text-white/90 text-xl md:text-2xl mb-8">
                HEONA MEDIA – Giải pháp đồng bộ từ ý tưởng đến triển khai
            </h2>
            
            <p className="text-textMuted text-xl mb-10 leading-relaxed max-w-2xl pl-6 border-l-4 border-primary/50">
              Từ khai trương, hội nghị đến Year End Party, HEONA MEDIA đồng hành cùng doanh nghiệp xây dựng trải nghiệm sự kiện rõ ràng, kiểm soát tốt chất lượng và ngân sách.
              <br/><br/>
              <span className="text-white italic text-lg">“Chúng tôi hiện thực hóa mọi sự kiện với tư duy sản xuất tinh gọn, đội ngũ kỹ thuật lành nghề và phong cách làm việc kỷ luật.”</span>
            </p>
            
            <div className="flex flex-wrap gap-5 mb-12">
              <Link to="/projects" className="group relative px-10 py-5 rounded-none clip-path-slant bg-white text-bgMain font-bold text-base transition-all hover:bg-secondary hover:text-white overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
                 <span className="relative z-10 flex items-center gap-3">
                    XEM DỰ ÁN <ArrowRight size={18} />
                 </span>
              </Link>
              <Link to="/contact" className="px-10 py-5 rounded-none clip-path-slant border border-white/20 bg-white/5 backdrop-blur text-white font-bold text-base hover:bg-secondary hover:border-secondary hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300">
                NHẬN BÁO GIÁ NHANH
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 text-sm text-textMuted font-mono tracking-tight pt-8 border-t border-white/5">
              <span className="flex items-center gap-3"><Layers size={18} className="text-primary" /> Thi công sân khấu – âm thanh – ánh sáng</span>
              <span className="flex items-center gap-3"><Radio size={18} className="text-primary" /> Livestream – quay phim – dựng highlight</span>
              <span className="flex items-center gap-3"><Hexagon size={18} className="text-primary" /> Quy trình rõ ràng – chi phí minh bạch</span>
            </div>
          </div>

          {/* Right Visual (Slider) */}
          <div className="relative animate-fade-in delay-200 group perspective-1000">
             {/* Frame Borders */}
             <div className="absolute -inset-4 border border-white/5 rounded-xl skew-y-2 group-hover:skew-y-1 transition-transform duration-700"></div>
             <div className="absolute -inset-4 border border-primary/20 rounded-xl skew-y-2 blur-sm opacity-50 group-hover:opacity-80 transition-opacity"></div>

             <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] bg-bgSoft">
                {HERO_IMAGES.map((img, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img src={img} alt="Hero" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bgMain via-transparent to-transparent opacity-60"></div>
                  </div>
                ))}
                
                {/* Overlay HUD elements */}
                <div className="absolute bottom-8 left-8 z-10">
                   <div className="flex gap-3 items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-mono text-white/80 tracking-widest">Live Event • Media Production</span>
                   </div>
                </div>
             </div>
              <div className="flex justify-center gap-6 mt-6 text-xs text-textMuted uppercase tracking-wider font-bold">
                <span>Tổ chức sự kiện trọn gói</span>
                <span>•</span>
                <span>Thi công sân khấu – LED</span>
                <span>•</span>
                <span>Quay phim, livestream</span>
             </div>
          </div>
        </div>
      </Section>

      {/* Dịch vụ Tóm tắt */}
      <Section className="relative border-t border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        <div className="text-center mb-16">
          <div className="text-sm font-mono text-primary uppercase tracking-widest mb-3">[ SERVICES ]</div>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl">Dịch vụ trọng tâm của HEONA MEDIA</h2>
          <p className="text-textMuted text-lg mt-6 max-w-3xl mx-auto">
             HEONA MEDIA tập trung vào hai mảng: tổ chức sự kiện là lõi chính, media là nhánh mở rộng giúp nội dung sự kiện được ghi lại và tái sử dụng cho truyền thông.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <Link to="/pricing" className="group relative bg-[#111115] border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 flex flex-col">
             <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="p-10 relative z-10 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="font-heading font-bold text-3xl group-hover:text-primary transition-colors">Tổ chức sự kiện</h3>
                    <ArrowRight className="text-white/20 group-hover:text-primary -translate-x-2 group-hover:translate-x-0 transition-all w-8 h-8" />
                </div>
                <p className="text-textMuted text-base mb-8 leading-relaxed">
                  Lên ý tưởng – kịch bản – thi công – vận hành trọn gói theo mục tiêu doanh nghiệp.
                </p>
                
                <ul className="space-y-4 mb-10 flex-grow">
                    {['Lễ khai trương – khánh thành', 'Hội nghị – hội thảo – họp báo', 'Tiệc tất niên – Year End Party', 'Activation – Roadshow – Brand activation', 'Ra mắt sản phẩm – Launching', 'Sự kiện doanh nghiệp nội bộ'].map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-base text-textMuted group-hover:text-white transition-colors">
                            <div className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0"></div>
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="flex gap-3 mt-auto pt-8 border-t border-white/5">
                   <span className="text-xs bg-white/5 border border-white/10 px-4 py-2 rounded text-secondary font-mono uppercase tracking-wide">Ý tưởng bám sát mục tiêu</span>
                   <span className="text-xs bg-white/5 border border-white/10 px-4 py-2 rounded text-secondary font-mono uppercase tracking-wide">Thi công đúng timeline</span>
                </div>
             </div>
          </Link>

          <Link to="/pricing" className="group relative bg-[#111115] border border-white/10 rounded-xl overflow-hidden hover:border-secondary/50 transition-all duration-500 flex flex-col">
             <div className="absolute inset-0 bg-gradient-to-l from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="p-10 relative z-10 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="font-heading font-bold text-3xl group-hover:text-secondary transition-colors">Xây dựng nhân hiệu cá nhân</h3>
                    <ArrowRight className="text-white/20 group-hover:text-secondary -translate-x-2 group-hover:translate-x-0 transition-all w-8 h-8" />
                </div>
                <p className="text-textMuted text-base mb-8 leading-relaxed">
                  Ghi hình – chụp ảnh – livestream đa camera – dựng highlight và TVC doanh nghiệp.
                </p>
                
                <ul className="space-y-4 mb-10 flex-grow">
                    {['Quay phim & chụp ảnh sự kiện', 'Livestream đa camera', 'Dựng video highlight', 'TVC – Video doanh nghiệp'].map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-base text-textMuted group-hover:text-white transition-colors">
                            <div className="mt-2 w-2 h-2 rounded-full bg-secondary shrink-0"></div>
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="flex gap-3 mt-auto pt-8 border-t border-white/5">
                   <span className="text-xs bg-white/5 border border-white/10 px-4 py-2 rounded text-primary font-mono uppercase tracking-wide">Thiết bị cập nhật thường xuyên</span>
                   <span className="text-xs bg-white/5 border border-white/10 px-4 py-2 rounded text-primary font-mono uppercase tracking-wide">Đội ngũ trẻ, linh hoạt</span>
                </div>
             </div>
          </Link>
        </div>
      </Section>

      {/* Dự án nổi bật */}
      <Section narrow className="relative pb-24">
         <div className="flex flex-col items-center mb-14 text-center">
            <div className="text-sm font-mono text-secondary uppercase tracking-widest mb-3">[ PROJECTS ]</div>
            <h2 className="font-heading font-extrabold text-5xl">DỰ ÁN TIÊU BIỂU</h2>
         </div>

         {/* Grid 2x2: 2 trên 2 dưới, khung ngang */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sử dụng slice để lấy 4 dự án đầu tiên từ Context */}
            {projects.slice(0, 4).map((item) => (
                <div key={item.id} className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-bgCard hover:border-primary/50 transition-all duration-500">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    
                    {/* Overlay gradient đậm hơn để chữ rõ hơn */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="text-sm font-mono text-primary mb-2 px-3 py-1 bg-primary/20 w-fit rounded border border-primary/30 backdrop-blur-sm">
                            {item.category}
                        </div>
                        <h3 className="font-heading font-bold text-2xl md:text-3xl text-white leading-tight mb-2">{item.title}</h3>
                        <p className="text-textMuted text-base line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
         </div>
         
         {/* Nút xem thêm to rõ */}
         <div className="mt-16 flex justify-center">
            <Link to="/projects" className="group relative px-12 py-5 bg-white text-bgMain font-heading font-bold text-lg tracking-wider rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(111,58,255,0.6)] flex items-center gap-3 overflow-hidden">
                <span className="relative z-10">XEM TẤT CẢ DỰ ÁN</span>
                <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute inset-0 bg-white mix-blend-screen opacity-0 group-hover:opacity-20"></span>
            </Link>
         </div>
      </Section>

      {/* Contact Info Section (New) */}
      <Section narrow className="pt-10 pb-20 border-t border-white/5 bg-[#08080a]">
        <div className="max-w-4xl mx-auto bg-[#111115] border border-white/10 rounded-2xl p-10 md:p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-3xl -z-10 rounded-full group-hover:bg-primary/20 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/10 blur-3xl -z-10 rounded-full group-hover:bg-secondary/20 transition-colors"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex-1">
                    <div className="text-sm font-mono text-secondary uppercase tracking-widest mb-2">Kết nối ngay</div>
                    <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-white">Thông tin liên hệ</h2>
                    <div className="space-y-6">
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1 shrink-0">
                                <Phone size={18} />
                            </div>
                            <div>
                                <div className="text-xs text-textMuted uppercase tracking-wider mb-1">Hotline / Zalo</div>
                                <div className="text-xl font-bold text-white">{contactInfo.phone}</div>
                            </div>
                         </div>
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1 shrink-0">
                                <Mail size={18} />
                            </div>
                            <div>
                                <div className="text-xs text-textMuted uppercase tracking-wider mb-1">Email</div>
                                <div className="text-xl font-bold text-white break-all">{contactInfo.email}</div>
                            </div>
                         </div>
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1 shrink-0">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <div className="text-xs text-textMuted uppercase tracking-wider mb-1">Địa chỉ</div>
                                <div className="text-lg text-white leading-snug">{contactInfo.address}</div>
                            </div>
                         </div>
                    </div>
                </div>
                
                <div className="flex-shrink-0">
                     <Link to="/contact" className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white hover:scale-105 transition-all shadow-lg">
                        Gửi yêu cầu tư vấn <ArrowRight className="ml-2" size={20} />
                     </Link>
                     <div className="mt-4 text-center text-sm text-textMuted">
                        Phản hồi nhanh trong 24h
                     </div>
                </div>
            </div>
        </div>
      </Section>
    </>
  );
};

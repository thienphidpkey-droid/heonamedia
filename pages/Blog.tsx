
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PageHero, Section } from '../components/Section';
import { BlogPost } from '../types';
import { X, Calendar, User, Clock, ArrowRight } from 'lucide-react';

// Dữ liệu mẫu với nội dung chi tiết
const POSTS: BlogPost[] = [
  { 
    id: 1, 
    tag: 'Checklist', 
    title: 'Checklist tổ chức sự kiện cơ bản', 
    meta: 'Các hạng mục căn bản để sự kiện vận hành trơn tru.',
    date: '10/02/2025',
    author: 'Admin Heona',
    image: 'https://i.postimg.cc/zvJ3RQnW/a2.jpg',
    content: `
      <h3 class="text-xl font-bold text-white mb-3">1. Giai đoạn trước sự kiện (Pre-event)</h3>
      <p class="mb-4">Đây là giai đoạn quan trọng nhất quyết định 80% thành công của sự kiện. Bạn cần chuẩn bị:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6 text-textMuted">
        <li><strong>Mục tiêu & Ý tưởng:</strong> Xác định rõ mục đích sự kiện (Launch, Thank you party, Kick-off...) và Concept chủ đạo.</li>
        <li><strong>Địa điểm & Thời gian:</strong> Khảo sát địa điểm (sức chứa, trần cao, nguồn điện) và chốt ngày giờ.</li>
        <li><strong>Xin giấy phép:</strong> Các thủ tục pháp lý cần thiết với sở văn hóa (nếu có biểu diễn) hoặc chính quyền địa phương.</li>
        <li><strong>Thiết kế & Sản xuất:</strong> Key visual, backdrop, standee, thư mời, quà tặng.</li>
      </ul>

      <h3 class="text-xl font-bold text-white mb-3">2. Trong sự kiện (In-event)</h3>
      <p class="mb-4">Sự phối hợp nhịp nhàng giữa các bộ phận là chìa khóa:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6 text-textMuted">
        <li><strong>Rehearsal (Tổng duyệt):</strong> Chạy thử âm thanh, ánh sáng, MC script ít nhất 4 tiếng trước giờ G.</li>
        <li><strong>Check-in:</strong> Quy trình đón khách, cài hoa, chụp hình check-in.</li>
        <li><strong>Điều phối sân khấu:</strong> Cue list cho âm thanh, ánh sáng khớp với kịch bản MC.</li>
      </ul>

      <h3 class="text-xl font-bold text-white mb-3">3. Sau sự kiện (Post-event)</h3>
      <p>Gửi thư cảm ơn, xử lý hình ảnh/video highlight để làm truyền thông sau sự kiện (Recap) và báo cáo nghiệm thu.</p>
    `
  },
  { 
    id: 2, 
    tag: 'Chi phí', 
    title: 'Chi phí tổ chức hội nghị gồm những gì?', 
    meta: 'Phân nhóm chi phí rõ ràng – minh bạch.',
    date: '12/02/2025',
    author: 'Admin Heona',
    image: 'https://i.postimg.cc/6q9TGPdG/a3.jpg',
    content: `
      <p class="mb-4">Để tránh phát sinh không kiểm soát, ngân sách sự kiện cần được chia thành các nhóm chính sau:</p>
      
      <h4 class="text-lg font-bold text-white mt-6 mb-2">1. Chi phí địa điểm (Venue)</h4>
      <p class="mb-4">Chiếm khoảng 30-40% ngân sách. Bao gồm thuê sảnh, Teabreak, Set menu ăn uống và phí phục vụ.</p>

      <h4 class="text-lg font-bold text-white mt-6 mb-2">2. Chi phí trang thiết bị (AV & Decor)</h4>
      <ul class="list-disc pl-5 space-y-2 mb-4 text-textMuted">
        <li>Hệ thống Âm thanh – Ánh sáng (tính theo quy mô khách).</li>
        <li>Màn hình LED (P3 hoặc P4) hoặc Máy chiếu.</li>
        <li>Sân khấu, Backdrop, Photobooth chụp hình.</li>
      </ul>

      <h4 class="text-lg font-bold text-white mt-6 mb-2">3. Chi phí nhân sự (Personnel)</h4>
      <p class="mb-4">MC, PG/PB đón khách, Media (quay phim chụp ảnh), Đạo diễn sự kiện và Ekip chạy chương trình.</p>

      <h4 class="text-lg font-bold text-white mt-6 mb-2">4. Chi phí dự phòng</h4>
      <p>Luôn trích lập 10% tổng ngân sách cho các khoản phát sinh không tên (thêm bàn ghế, thêm nước, làm lại file in ấn...).</p>
    `
  },
  { 
    id: 3, 
    tag: 'Thiết bị', 
    title: 'Cách chọn màn hình LED phù hợp', 
    meta: 'Chọn P3, P4 hay P5 theo quy mô sân khấu?',
    date: '15/02/2025',
    author: 'Kỹ thuật Heona',
    image: 'https://i.postimg.cc/zvJ3RQnW/a2.jpg',
    content: `
      <p class="mb-4">Màn hình LED được phân loại dựa trên "Pixel Pitch" (khoảng cách giữa các điểm ảnh). Số P càng nhỏ, độ nét càng cao nhưng chi phí cũng cao hơn.</p>

      <div class="bg-white/5 p-4 rounded-lg border border-white/10 mb-6">
        <h4 class="text-primary font-bold mb-2">LED P3 (Indoor)</h4>
        <p class="text-sm mb-2">Khoảng cách nhìn tối ưu: Từ 3m trở lên.</p>
        <p class="text-sm text-textMuted">Phù hợp cho: Hội nghị khách hàng, tiệc cưới sang trọng, sự kiện cần trình chiếu slide chữ nhỏ, chi tiết sắc nét.</p>
      </div>

      <div class="bg-white/5 p-4 rounded-lg border border-white/10 mb-6">
        <h4 class="text-secondary font-bold mb-2">LED P4 (Indoor/Outdoor)</h4>
        <p class="text-sm mb-2">Khoảng cách nhìn tối ưu: Từ 4m trở lên.</p>
        <p class="text-sm text-textMuted">Phù hợp cho: Sân khấu ngoài trời, sự kiện Year End Party quy mô lớn, background sân khấu ca nhạc.</p>
      </div>

      <p><strong>Lời khuyên:</strong> Với các sảnh tiệc khách sạn thông thường, LED P3 là lựa chọn cân bằng nhất giữa chi phí và chất lượng hình ảnh.</p>
    `
  },
  { 
    id: 4, 
    tag: 'Livestream', 
    title: 'Livestream sự kiện: quy trình chuẩn', 
    meta: 'Chuẩn bị thiết bị, ánh sáng và đường truyền.',
    date: '18/02/2025',
    author: 'Media Team',
    image: 'https://i.postimg.cc/6q9TGPdG/a3.jpg',
    content: `
      <p class="mb-4">Livestream sự kiện khác hoàn toàn với livestream bán hàng bằng điện thoại. Nó đòi hỏi tính ổn định và chuyên nghiệp cao.</p>
      
      <h3 class="text-xl font-bold text-white mb-3">1. Đường truyền Internet (Quan trọng nhất)</h3>
      <p class="mb-4">Tuyệt đối không dùng Wifi công cộng của sảnh. Cần kéo dây mạng LAN riêng (tốc độ upload tối thiểu 40Mbps) hoặc sử dụng bộ gộp mạng 4G chuyên dụng (LiveU/Bonding).</p>

      <h3 class="text-xl font-bold text-white mb-3">2. Hệ thống Camera & Bàn trộn</h3>
      <ul class="list-disc pl-5 space-y-2 mb-4 text-textMuted">
        <li>Sử dụng ít nhất 2 góc máy (1 toàn, 1 cận) để hình ảnh không bị nhàm chán.</li>
        <li>Bàn trộn hình (Switcher) để chuyển cảnh mượt mà, chèn logo, lower-third (tên diễn giả).</li>
      </ul>

      <h3 class="text-xl font-bold text-white mb-3">3. Âm thanh (Audio)</h3>
      <p>Lấy tín hiệu trực tiếp (Line-out) từ bàn mixer âm thanh của sự kiện vào thiết bị livestream để âm thanh trong trẻo, không bị tạp âm ồn ào từ môi trường.</p>
    `
  },
  { 
    id: 5, 
    tag: 'Kinh nghiệm', 
    title: '5 lỗi thường gặp khi tự tổ chức sự kiện', 
    meta: 'Những lỗi nhỏ nhưng ảnh hưởng trải nghiệm.',
    date: '20/02/2025',
    author: 'Admin Heona',
    image: 'https://i.postimg.cc/zvJ3RQnW/a2.jpg',
    content: `
      <ol class="list-decimal pl-5 space-y-4 text-textMuted">
        <li>
            <strong class="text-white">Âm thanh bị hú/rè:</strong> Do bố trí loa sai vị trí hoặc kỹ thuật viên không cắt tần số hú. Đây là lỗi gây khó chịu nhất cho khán giả.
        </li>
        <li>
            <strong class="text-white">Ánh sáng mặt MC bị tối:</strong> Chỉ chú trọng đèn màu sân khấu mà quên đèn mặt (Face light/COB) khiến mặt nhân vật chính bị tối đen khi lên hình.
        </li>
        <li>
            <strong class="text-white">Timeline bị trễ (Overtime):</strong> Không có người quản lý thời gian (Stage Manager), khiến chương trình kéo dài lê thê, khách mời bỏ về sớm.
        </li>
        <li>
            <strong class="text-white">File trình chiếu lỗi font/không chạy video:</strong> Không test kỹ file trên máy tính điều khiển của sự kiện trước giờ G.
        </li>
        <li>
            <strong class="text-white">Thiếu phương án Backup:</strong> Mất điện, trời mưa (với tiệc ngoài trời) mà không có mái che dự phòng.
        </li>
      </ol>
    `
  },
  { 
    id: 6, 
    tag: 'Thực tế', 
    title: 'Làm việc với agency sự kiện: cần chuẩn bị gì?', 
    meta: 'Checklist trước khi gửi brief.',
    date: '22/02/2025',
    author: 'Admin Heona',
    image: 'https://i.postimg.cc/6q9TGPdG/a3.jpg',
    content: `
      <p class="mb-4">Để nhận được báo giá chính xác và ý tưởng sát sườn nhất từ Agency (như Heona Media), khách hàng cần chuẩn bị "Brief" (đề bài) bao gồm:</p>
      
      <ul class="list-disc pl-5 space-y-3 text-textMuted mb-6">
        <li><strong>Mục tiêu sự kiện:</strong> Bạn muốn khách mời cảm thấy gì sau khi tham dự? (Vui vẻ, Trang trọng, hay Xúc động?)</li>
        <li><strong>Đối tượng khách tham dự (Target Audience):</strong> Độ tuổi, nghề nghiệp, phong cách.</li>
        <li><strong>Số lượng khách (Pax):</strong> Để tính toán không gian và tiệc.</li>
        <li><strong>Ngân sách dự kiến (Budget):</strong> Cực kỳ quan trọng để Agency thiết kế các hạng mục "liệu cơm gắp mắm" phù hợp nhất.</li>
        <li><strong>Địa điểm & Thời gian:</strong> Đã có sẵn hay cần Agency đề xuất?</li>
      </ul>
      
      <p>Càng cung cấp thông tin chi tiết, giải pháp bạn nhận được càng tối ưu và tiết kiệm thời gian chỉnh sửa.</p>
    `
  },
];

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPost]);

  return (
    <>
      <PageHero title="Blog – Chia sẻ kinh nghiệm" sub="Các bài viết hướng dẫn, checklist và kinh nghiệm thực tế trong ngành sự kiện – media." />

      <Section narrow>
        <div className="grid md:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <div 
              key={post.id} 
              onClick={() => setSelectedPost(post)}
              className="group bg-bgCard border border-borderSubtle rounded-xl overflow-hidden hover:border-primary hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(111,58,255,0.2)] transition-all duration-300 cursor-pointer flex flex-col h-full relative"
            >
               {/* Image Top */}
               <div className="h-56 w-full overflow-hidden relative">
                    {post.image && (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                    <div className="absolute top-4 left-4">
                       <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-black/80 border border-secondary/30 px-2 py-1 rounded backdrop-blur-md">
                         {post.tag}
                       </span>
                    </div>
               </div>

               {/* Content Bottom */}
               <div className="p-6 flex flex-col flex-grow relative z-10">
                   <h3 className="font-heading font-bold text-2xl mb-3 group-hover:text-primary transition-colors leading-snug min-h-[4rem]">
                     {post.title}
                   </h3>
                   
                   <p className="text-base text-textMuted leading-relaxed mb-6 line-clamp-3 flex-grow">
                     {post.meta}
                   </p>

                   <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-textMuted/60 font-mono">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                        Đọc thêm <ArrowRight size={16} />
                      </span>
                   </div>
               </div>
            </div>
          ))}
        </div>
      </Section>

      {/* BLOG DETAIL MODAL */}
      {selectedPost && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 animate-fade-in overflow-hidden"
          onClick={() => setSelectedPost(null)}
        >
            <div 
              className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-3xl bg-[#111115] md:rounded-2xl border border-white/10 shadow-2xl flex flex-col animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
                {/* Header của Modal (Fixed) */}
                <div className="flex items-start justify-between p-6 md:p-8 border-b border-white/10 bg-[#111115] z-10">
                    <div className="pr-10">
                        <span className="inline-block px-3 py-1 rounded bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-3 border border-primary/20">
                            {selectedPost.tag}
                        </span>
                        <h2 className="font-heading font-bold text-2xl md:text-3xl text-white leading-tight">
                            {selectedPost.title}
                        </h2>
                        <div className="flex items-center gap-6 mt-4 text-sm text-textMuted">
                             <div className="flex items-center gap-2">
                                <Calendar size={14} /> {selectedPost.date}
                             </div>
                             <div className="flex items-center gap-2">
                                <User size={14} /> {selectedPost.author}
                             </div>
                             <div className="flex items-center gap-2">
                                <Clock size={14} /> 5 phút đọc
                             </div>
                        </div>
                    </div>
                    <button 
                        onClick={() => setSelectedPost(null)}
                        className="p-2 rounded-full bg-white/5 hover:bg-red-500 hover:text-white text-textMuted transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Nội dung bài viết (Scrollable) */}
                <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
                    {/* Image Banner inside Modal */}
                    {selectedPost.image && (
                        <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8 border border-white/10 shadow-lg relative">
                            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-transparent to-transparent opacity-80"></div>
                        </div>
                    )}

                    <div className="prose prose-invert prose-lg max-w-none text-textMuted/90">
                        <p className="text-lg font-medium text-white italic border-l-4 border-secondary pl-4 mb-8">
                            {selectedPost.meta}
                        </p>
                        
                        {/* Render HTML content safely */}
                        <div dangerouslySetInnerHTML={{ __html: selectedPost.content || '' }} />
                    </div>

                    <div className="mt-10 pt-8 border-t border-white/10 text-center">
                        <p className="text-textMuted mb-4">Bạn cần tư vấn chi tiết về chủ đề này?</p>
                        <button 
                          onClick={() => {
                             setSelectedPost(null);
                             window.location.href = '#/contact';
                          }}
                          className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-lg hover:shadow-primary/25 transition-all"
                        >
                            Liên hệ HEONA MEDIA ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
      )}
    </>
  );
};

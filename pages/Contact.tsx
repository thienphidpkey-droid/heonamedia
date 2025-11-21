
import React, { useState } from 'react';
import { PageHero, Section } from '../components/Section';
import { Card } from '../components/Card';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Contact: React.FC = () => {
  const { contactInfo } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '',
    budget: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã gửi thông tin. Chúng tôi sẽ liên hệ sớm nhất!');
  };

  return (
    <>
      <PageHero title="Liên hệ HEONA MEDIA" sub="Gửi thông tin để chúng tôi tư vấn giải pháp truyền thông & sự kiện phù hợp nhất cho bạn." />

      <Section narrow>
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 items-start">
          {/* Info Card */}
          <Card noHover className="p-8">
             <h2 className="font-heading font-bold text-3xl mb-2">Thông tin liên hệ</h2>
             <p className="text-base text-textMuted mb-8">HEONA MEDIA – Truyền thông • Branding • Sự kiện</p>

             <div className="space-y-8">
                <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Phone size={24} />
                    </div>
                    <div>
                        <div className="text-sm text-textMuted uppercase mb-1">Phone</div>
                        <div className="font-medium text-white text-lg">{contactInfo.phone}</div>
                    </div>
                </div>

                <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Mail size={24} />
                    </div>
                    <div>
                        <div className="text-sm text-textMuted uppercase mb-1">Email</div>
                        <div className="font-medium text-white text-lg">{contactInfo.email}</div>
                    </div>
                </div>

                <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <div className="text-sm text-textMuted uppercase mb-1">Địa chỉ</div>
                        <div className="font-medium text-white text-lg">{contactInfo.address}</div>
                    </div>
                </div>
             </div>
             
             <div className="mt-10 pt-8 border-t border-borderSubtle text-sm text-textMuted italic">
                Vui lòng để lại nội dung chi tiết, Heona Media sẽ phản hồi trong thời gian sớm nhất.
             </div>
          </Card>

          {/* Form Card */}
          <Card noHover className="p-8">
            <h2 className="font-heading font-bold text-3xl mb-2">Gửi yêu cầu báo giá</h2>
            <p className="text-base text-textMuted mb-8">Cho chúng tôi biết nhu cầu của bạn, đội ngũ sẽ tư vấn gói dịch vụ phù hợp.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                        <label className="text-sm text-textMuted font-medium">Họ tên *</label>
                        <input 
                            type="text" 
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nhập họ tên..." 
                            className="bg-[#111116] border border-borderSubtle rounded-lg px-5 py-3.5 text-base text-white focus:border-primary focus:outline-none focus:bg-[#15151c] transition-all"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-sm text-textMuted font-medium">Công ty</label>
                        <input 
                            type="text" 
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Tên công ty..." 
                            className="bg-[#111116] border border-borderSubtle rounded-lg px-5 py-3.5 text-base text-white focus:border-primary focus:outline-none focus:bg-[#15151c] transition-all"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                        <label className="text-sm text-textMuted font-medium">Số điện thoại *</label>
                        <input 
                            type="tel" 
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="SĐT liên hệ..." 
                            className="bg-[#111116] border border-borderSubtle rounded-lg px-5 py-3.5 text-base text-white focus:border-primary focus:outline-none focus:bg-[#15151c] transition-all"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-sm text-textMuted font-medium">Email *</label>
                        <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email..." 
                            className="bg-[#111116] border border-borderSubtle rounded-lg px-5 py-3.5 text-base text-white focus:border-primary focus:outline-none focus:bg-[#15151c] transition-all"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                        <label className="text-sm text-textMuted font-medium">Loại dịch vụ</label>
                        <select 
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="bg-[#111116] border border-borderSubtle rounded-lg px-5 py-3.5 text-base text-white focus:border-primary focus:outline-none focus:bg-[#15151c] transition-all appearance-none"
                        >
                            <option value="">Chọn loại dịch vụ</option>
                            <option value="personal-brand">Xây dựng thương hiệu</option>
                            <option value="event">Tổ chức sự kiện</option>
                            <option value="marketing">Truyền thông</option>
                            <option value="branding-photo">Hình ảnh thương hiệu</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-sm text-textMuted font-medium">Ngân sách dự kiến</label>
                        <select 
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="bg-[#111116] border border-borderSubtle rounded-lg px-5 py-3.5 text-base text-white focus:border-primary focus:outline-none focus:bg-[#15151c] transition-all appearance-none"
                        >
                            <option value="">Chưa xác định</option>
                            <option value="under50">Dưới 50 triệu</option>
                            <option value="50-100">50 – 100 triệu</option>
                            <option value="100-300">100 – 300 triệu</option>
                            <option value="300plus">Trên 300 triệu</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="text-sm text-textMuted font-medium">Nội dung yêu cầu</label>
                    <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Mô tả chi tiết..." 
                        className="bg-[#111116] border border-borderSubtle rounded-lg px-5 py-3.5 text-base text-white focus:border-primary focus:outline-none focus:bg-[#15151c] transition-all min-h-[140px]"
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                    Gửi thông tin & Nhận báo giá
                </button>
            </form>
          </Card>
        </div>
      </Section>
    </>
  );
};
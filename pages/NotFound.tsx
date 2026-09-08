import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageHero, Section } from '../components/Section';

export const NotFound: React.FC = () => (
  <>
    <SEO
      title="Không Tìm Thấy Trang"
      description="Trang bạn tìm kiếm không tồn tại hoặc đã được chuyển sang địa chỉ khác."
      url="/404"
      robots="noindex, follow"
    />
    <PageHero title="Không tìm thấy trang" sub="Đường dẫn bạn vừa mở không tồn tại hoặc đã được thay đổi." />
    <Section narrow>
      <div className="text-center">
        <Link className="inline-flex rounded-full bg-primary px-6 py-3 font-bold text-white hover:bg-secondary transition-colors" to="/">
          Về trang chủ
        </Link>
      </div>
    </Section>
  </>
);

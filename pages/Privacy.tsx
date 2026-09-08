import React from 'react';
import { SEO } from '../components/SEO';
import { PageHero, Section } from '../components/Section';

export const Privacy: React.FC = () => (
  <>
    <SEO
      title="Chính Sách Quyền Riêng Tư"
      description="Chính sách thu thập, sử dụng và bảo vệ thông tin cá nhân khi khách hàng liên hệ với HEONA MEDIA."
      url="/privacy"
    />
    <PageHero
      title="Chính sách quyền riêng tư"
      sub="Thông tin về cách HEONA MEDIA tiếp nhận và sử dụng dữ liệu bạn cung cấp qua website."
    />
    <Section narrow>
      <article className="max-w-3xl mx-auto space-y-8 text-textMuted leading-relaxed">
        <section>
          <h2 className="font-heading text-xl font-bold text-white mb-3">Thông tin được thu thập</h2>
          <p>Form liên hệ có thể tiếp nhận họ tên, số điện thoại, email, tên công ty, loại dịch vụ, ngân sách dự kiến và nội dung yêu cầu do bạn chủ động cung cấp.</p>
        </section>
        <section>
          <h2 className="font-heading text-xl font-bold text-white mb-3">Mục đích sử dụng</h2>
          <p>HEONA MEDIA sử dụng thông tin để phản hồi yêu cầu tư vấn, chuẩn bị báo giá và trao đổi về dịch vụ phù hợp. Thông tin không được bán cho bên thứ ba.</p>
        </section>
        <section>
          <h2 className="font-heading text-xl font-bold text-white mb-3">Đơn vị hỗ trợ xử lý</h2>
          <p>Website sử dụng EmailJS để chuyển nội dung form đến hộp thư của HEONA MEDIA. Dữ liệu có thể được xử lý theo chính sách và hạ tầng của nhà cung cấp này trong quá trình gửi email.</p>
        </section>
        <section>
          <h2 className="font-heading text-xl font-bold text-white mb-3">Bảo vệ và thời gian lưu trữ</h2>
          <p>HEONA MEDIA giới hạn quyền truy cập thông tin cho mục đích tư vấn và vận hành. Dữ liệu được lưu trong thời gian cần thiết để xử lý yêu cầu, thực hiện nghĩa vụ liên quan hoặc giải quyết tranh chấp.</p>
        </section>
        <section>
          <h2 className="font-heading text-xl font-bold text-white mb-3">Quyền của bạn</h2>
          <p>Bạn có thể yêu cầu xem, cập nhật hoặc xóa thông tin đã cung cấp bằng cách gửi email đến <a className="text-primary hover:underline" href="mailto:heonamedia@gmail.com">heonamedia@gmail.com</a> hoặc gọi <a className="text-primary hover:underline" href="tel:0931899427">0931 899 427</a>.</p>
        </section>
        <p className="text-sm">Cập nhật lần cuối: <time dateTime="2026-09-08">08/09/2026</time>.</p>
      </article>
    </Section>
  </>
);

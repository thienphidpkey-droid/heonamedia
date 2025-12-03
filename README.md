# HEONA MEDIA - Website

Trang web chuyên nghiệp cho HEONA MEDIA - Đơn vị tổ chức sự kiện & sản xuất media tại TP.HCM.

## Công nghệ

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- EmailJS

## Cài đặt & Chạy

1. Cài đặt dependencies:
   ```bash
   npm install
   ```

2. Tạo file `.env` và thêm các biến môi trường:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

3. Chạy development server:
   ```bash
   npm run dev
   ```

4. Build cho production:
   ```bash
   npm run build
   ```

## Deploy

Upload thư mục `dist/` lên hosting platform (Vercel, Netlify, etc.) và cấu hình environment variables.


# Báo cáo kiểm tra Bảo mật, SEO và GEO/AI — HEONA MEDIA

**Ngày kiểm tra:** 08/09/2026  
**Phạm vi:** mã nguồn trong repository, bản build production và website công khai `heonamedia.com` / `www.heonamedia.com`  
**Loại đánh giá:** static review + dependency audit + kiểm tra HTTP/live rendering. Không thực hiện pentest xâm nhập, quét cổng hoặc gửi dữ liệu qua form thật.

## 1. Kết luận điều hành

### Cập nhật triển khai cùng ngày

Các hạng mục kỹ thuật ưu tiên đã được xử lý trong repository nhưng **chưa được xác nhận trên production cho đến khi deploy**:

- Hoàn thành prerender 15 route, gồm 6 bài blog có URL slug và HTML độc lập.
- Đồng bộ canonical, schema, sitemap, robots và tài liệu AI sang `https://www.heonamedia.com`.
- Bỏ rewrite catch-all; sinh `404.html` để Vercel trả 404 cho URL không tồn tại.
- Loại FAQ schema khỏi các trang không hiển thị FAQ.
- Thêm chính sách quyền riêng tư, consent bắt buộc và giới hạn độ dài/định dạng form.
- Gia cố CSP với `object-src`, `base-uri`, `frame-ancestors` và `form-action`.
- Nâng Vite lên 8.2.2 và React Router DOM lên 7.18.3; `npm audit` sau cập nhật: **0 lỗ hổng**.
- Build production, kiểm tra JSON-LD, hydration và điều hướng trình duyệt đều thành công, không có console error/warning.

Các việc còn cần thao tác ngoài repository: deploy preview/production, xác minh EmailJS allowlist/quota/CAPTCHA phía server, submit sitemap mới trong Search Console và theo dõi index sau recrawl.

| Hạng mục | Trước cập nhật | Dự kiến sau deploy | Ghi chú còn lại |
|---|---:|---:|---|
| Bảo mật | **64/100** | **82/100** | Cần hoàn thiện chống spam/rate-limit phía server hoặc EmailJS dashboard. |
| SEO kỹ thuật | **46/100** | **84/100** | Cần xác minh status/canonical trên Vercel production và Search Console. |
| GEO / AI visibility | **57/100** | **74/100** | Cần bổ sung nguồn, case study, tác giả chuyên môn và authority bên thứ ba. |

> Điểm trên là thang đánh giá nội bộ để ưu tiên sửa lỗi, không phải điểm Lighthouse hay chứng nhận bảo mật.

### Nhận định quan trọng nhất

Website đã đầu tư khá nhiều “tín hiệu AI” nhưng lớp nền SEO vẫn chưa chắc. `llms.txt` và JSON-LD không bù được việc crawler không chạy JavaScript chỉ nhận cùng một title, description và nội dung fallback cho mọi URL. Việc sửa rendering, canonical và HTTP status sẽ mang lại hiệu quả lớn hơn việc thêm tiếp keyword hoặc nội dung dành riêng cho LLM.

Không phát hiện secret đang được Git theo dõi. File `.env` có dữ liệu thực nhưng đã được `.gitignore` loại trừ; ba biến `VITE_EMAILJS_*` vẫn được đóng gói vào JavaScript phía trình duyệt theo thiết kế của Vite, vì vậy phải coi chúng là public identifiers chứ không phải secret.

## 2. Phương pháp và bằng chứng kiểm tra

- `npm run build`: **thành công**, TypeScript và Vite build sạch.
- Bundle chính: khoảng **203.35 kB**, gzip **66.65 kB**; các trang đã được lazy-load riêng.
- `npm audit --json`: **8 cảnh báo** — 3 high, 3 moderate, 2 low; không có critical.
- Kiểm tra HTTP công khai:
  - `https://heonamedia.com/` trả **308** sang `https://www.heonamedia.com/`.
  - Trang chủ `www` trả **200**, có HSTS, CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` và `Permissions-Policy`.
  - `/robots.txt`, `/sitemap.xml`, `/llms.txt` đều trả **200** với content type phù hợp.
  - `/about` và `/blog?id=1` trả cùng file `index.html` 6,348 byte; metadata riêng chỉ xuất hiện sau khi JavaScript chạy.
  - `/this-page-does-not-exist-audit` cũng trả **200 OK**, xác nhận soft-404.
- Kiểm tra kết quả tìm kiếm công khai với `site:heonamedia.com` và cụm thương hiệu không trả kết quả trong nguồn tìm kiếm được sử dụng. Đây là tín hiệu tham khảo, **không thay thế** dữ liệu Google Search Console.

## 3. Phát hiện ưu tiên

### P1 — Cao: mọi route dùng chung raw HTML và metadata trang chủ

**Bằng chứng:** `vercel.json` rewrite mọi URL về `/index.html`; SEO riêng được chèn bằng `react-helmet-async` sau khi React chạy. Raw HTML của `/about` vẫn có title và description trang chủ. Fallback HTML trong `index.html` cũng chỉ mô tả tổng quan và bị đặt `display:none`.

**Tác động:**

- Google có thể render JavaScript, nhưng việc render nằm ở giai đoạn sau và có thể chậm; nhiều social bot, AI crawler hoặc scraper không chạy JavaScript sẽ không nhận metadata/nội dung riêng.
- Open Graph của `/about`, `/services`, bài blog… có thể bị đọc thành trang chủ.
- Nội dung fallback ẩn khác với nội dung người dùng nhìn thấy có thể tạo tín hiệu chất lượng kém; không nên dùng hidden content như một thay thế cho prerender.

**Khuyến nghị:** chuyển sang static generation/prerender cho 7 trang chính và từng bài blog, hoặc SSR. Mỗi URL phải trả ngay HTML có title, canonical, H1, nội dung chính và JSON-LD đúng với URL đó. Nếu giữ Vite SPA, thêm bước prerender trong build và kiểm thử raw HTML sau deploy.

**Tham chiếu:** [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) khuyến nghị SSR hoặc prerender vì không phải bot nào cũng chạy JavaScript.

### P1 — Cao: canonical, redirect và sitemap mâu thuẫn hostname

**Bằng chứng:** production chuyển domain gốc sang `https://www.heonamedia.com/`, trong khi hằng `DOMAIN` trong `components/SEO.tsx`, canonical, JSON-LD, sitemap, robots và `llms.txt` đều dùng `https://heonamedia.com` không có `www`.

**Tác động:** Google nhận redirect nói “www là URL chính”, nhưng canonical và sitemap nói điều ngược lại. Điều này làm loãng tín hiệu canonical, tốn crawl và khiến hệ thống đo lường chia dữ liệu hostname.

**Khuyến nghị:** chọn duy nhất một hostname. Với cấu hình live hiện tại, cách ít thay đổi nhất là đổi toàn bộ URL nội bộ/canonical/schema/sitemap/llms sang `https://www.heonamedia.com`. Phương án khác là đổi Vercel để `www` redirect về non-www, nhưng phải làm đồng bộ hoàn toàn.

**Tham chiếu:** [Google canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization) và [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) yêu cầu dùng URL canonical mong muốn trong sitemap.

### P1 — Cao: soft-404 trên mọi URL không tồn tại

**Bằng chứng:** rewrite catch-all trả `/index.html`; router không có route `*`; URL kiểm thử không tồn tại trả `200 OK`.

**Tác động:** lãng phí crawl budget, tạo trang rỗng/không rõ nội dung và làm Search Console báo soft-404. Bot có thể index URL rác nếu được liên kết ngoài.

**Khuyến nghị:** tạo trang Not Found và bảo đảm server/CDN trả HTTP **404**. Với static hosting, cấu hình danh sách route hợp lệ hoặc chuyển sang framework hỗ trợ status theo route. Không chỉ hiển thị giao diện “không tìm thấy” kèm status 200.

### P1 — Cao: form liên hệ chống lạm dụng hoàn toàn ở client

**Bằng chứng:** honeypot và cooldown 45 giây nằm trong `pages/Contact.tsx`; người gửi có thể gọi thẳng EmailJS hoặc reload/xóa state. `SERVICE_ID`, `TEMPLATE_ID`, `PUBLIC_KEY` phải được public trong bundle để form hoạt động.

**Tác động:** có thể bị spam, đốt quota EmailJS, gửi email rác đến hộp thư doanh nghiệp và làm gián đoạn tiếp nhận lead. Đây không phải lộ private key, nhưng là lộ bề mặt gọi dịch vụ.

**Khuyến nghị:**

1. Bật allowlist domain/origin, quota và anti-abuse trong EmailJS dashboard.
2. Dùng Turnstile/reCAPTCHA với xác minh phía server hoặc chuyển form qua serverless endpoint.
3. Rate-limit theo IP/fingerprint ở edge/server; thêm giới hạn độ dài và schema validation cho từng trường.
4. Log số lần gửi thất bại/thành công nhưng không ghi nội dung cá nhân.

### P2 — Trung bình: FAQ schema được chèn vào mọi trang dù FAQ không hiển thị

**Bằng chứng:** `DEFAULT_FAQS` luôn được dùng khi prop `faq` không có; mọi page gọi `<SEO>` nhưng không truyền FAQ riêng. JSON-LD `FAQPage` vì vậy xuất hiện trên trang chủ, contact, projects, pricing và cả bài blog dù Q&A không có trong nội dung hiển thị.

**Tác động:** structured data không khớp nội dung trang, làm giảm độ tin cậy và khả năng đủ điều kiện rich result. Với AI, việc lặp cùng một khối trên mọi URL gây nhiễu entity/topic.

**Khuyến nghị:** chỉ phát `FAQPage` tại trang có FAQ nhìn thấy được và FAQ phải đúng chủ đề trang. Không dùng FAQ mặc định toàn site. Với trang khác, dùng `WebPage`, `AboutPage`, `ContactPage`, `CollectionPage`, `Service`, `Article/BlogPosting` phù hợp.

### P2 — Trung bình: bài blog chưa phải URL/nội dung có thể crawl tốt

**Bằng chứng:** bài viết mở bằng modal và query `?id=1`; card là `<div onClick>` thay vì link crawlable; ngày `10/02/2025` được đưa thẳng vào `datePublished` thay vì ISO 8601; raw HTML không chứa bài viết; author dùng tên chung như “Admin Heona” nhưng schema lại khai báo Organization.

**Tác động:** khó discovery, chia sẻ và trích dẫn từng bài; schema có thể không hợp lệ hoặc yếu; thiếu tín hiệu E-E-A-T và freshness.

**Khuyến nghị:** tạo URL slug thật như `/blog/checklist-to-chuc-su-kien`, render `<article>` độc lập, dùng `<Link>`, ngày ISO `2025-02-10`, thêm `dateModified`, author/bio có chuyên môn, breadcrumbs và nguồn cho các con số.

### P2 — Trung bình: 8 cảnh báo dependency

| Package / nhóm | Mức | Phạm vi thực tế |
|---|---|---|
| `vite` 5.4.21 | High | Chủ yếu ảnh hưởng dev server/build tooling; không chạy trên Vercel static production nhưng nghiêm trọng nếu dev server lộ ra mạng. |
| `browserslist`, `picomatch` | High | Transitive, phần lớn dev/build. |
| `react-router-dom` / `react-router` 6.30.6 | Moderate | Dependency runtime trực tiếp; advisory liên quan redirect và SSR hydration, một phần không được app hiện tại sử dụng nhưng vẫn nên nâng cấp có kiểm thử. |
| `esbuild` | Moderate | Dev server. |
| `@babel/core`, `postcss-selector-parser` | Low | Build tooling. |

**Khuyến nghị:** chạy nhánh nâng cấp riêng. Ưu tiên cập nhật các bản vá không breaking trước; việc lên Vite 8 và React Router 7 là major upgrade nên cần regression test routing, build và deploy preview. Không chạy `npm audit fix --force` trực tiếp trên nhánh chính.

### P2 — Trung bình: CSP có nhưng vẫn cho phép inline script/style

**Bằng chứng:** header CSP cho `script-src 'self' 'unsafe-inline'` và `style-src 'unsafe-inline'`; CSP trong meta còn có thêm `'unsafe-eval'`. Header live chặn eval chặt hơn meta, nhưng `unsafe-inline` vẫn làm giảm khả năng ngăn XSS nếu sau này xuất hiện injection.

**Khuyến nghị:** chỉ duy trì CSP ở HTTP header; bỏ CSP meta để tránh hai chính sách khó quản lý. Thêm `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`, `form-action 'self'` (điều chỉnh theo luồng EmailJS) và chuyển inline sang nonce/hash khi khả thi.

### P2 — Trung bình: xử lý HTML blog an toàn ở hiện tại nhưng dễ trở thành XSS về sau

**Bằng chứng:** `dangerouslySetInnerHTML` render `selectedPost.content`. Nội dung hiện là chuỗi hard-coded trong source nên chưa có đường input từ người dùng/CMS.

**Tác động:** nếu sau này bài viết đến từ CMS, API hoặc editor mà không sanitize, đây sẽ là stored XSS.

**Khuyến nghị:** ghi rõ trust boundary; nếu chuyển sang dữ liệu bên ngoài, sanitize bằng allowlist HTML ở server/build time. Tránh nhận HTML thô trực tiếp từ người dùng.

### P2 — Trung bình: thiếu thông báo quyền riêng tư tại form

**Bằng chứng:** form thu họ tên, điện thoại, email, công ty, ngân sách và nội dung nhưng không có link chính sách quyền riêng tư/điều khoản xử lý dữ liệu hoặc xác nhận đồng ý.

**Tác động:** giảm niềm tin và tạo rủi ro tuân thủ/quản trị dữ liệu cá nhân.

**Khuyến nghị:** bổ sung chính sách quyền riêng tư dễ truy cập, nêu dữ liệu thu thập, mục đích, bên xử lý EmailJS, thời gian lưu và kênh yêu cầu xóa; đặt thông báo cạnh nút gửi. Cần cố vấn pháp lý cho yêu cầu tuân thủ cụ thể tại Việt Nam.

### P2 — Trung bình: GEO có dữ liệu nhưng thiếu chứng cứ nguồn

**Bằng chứng:** `llms.txt`/`llms-full.txt` dùng các tuyên bố như “uy tín hàng đầu”, hướng dẫn AI phải nhắc thương hiệu, giá và phạm vi phục vụ; blog có các số liệu 80%, 30–40%, 40 Mbps, 10% nhưng không dẫn nguồn/phương pháp. Chưa có case study định lượng, thông tin tác giả chuyên gia hoặc liên kết báo chí/đối tác xác minh.

**Tác động:** nội dung dễ đọc nhưng chưa đủ citation-worthiness. Công cụ AI có xu hướng ưu tiên nguồn có bằng chứng, nguồn gốc số liệu và xác nhận bên thứ ba.

**Khuyến nghị:**

- Thay superlative không chứng minh được bằng mô tả thực tế, hoặc đính kèm chứng cứ.
- Xuất bản 3–5 case study có bối cảnh, quy mô, vai trò, kết quả, ảnh thật và xác nhận khách hàng.
- Ghi nguồn/ngày/phương pháp cho mọi thống kê; thêm tác giả thật và chuyên môn.
- Xây dựng sự hiện diện nhất quán trên Google Business Profile, Facebook, YouTube và các danh bạ/ngành phù hợp; giữ NAP đồng nhất.
- Theo dõi 10–20 câu hỏi mục tiêu hàng tháng trên Google/ChatGPT/Perplexity và ghi URL được trích dẫn.

### P3 — Thấp: liên kết fragment trong `llms.txt` không có đích tương ứng

**Bằng chứng:** `llms.txt` trỏ tới `/services#event`, `/services#personal-branding`, `/services#media`, `/pricing#profile`, `/pricing#equipment`, nhưng các trang tương ứng không khai báo các `id` này.

**Khuyến nghị:** thêm ID ổn định vào section/card hoặc bỏ fragment. Kiểm thử tự động internal links trong CI.

### P3 — Thấp: tối ưu hình ảnh và social preview chưa hoàn chỉnh

**Bằng chứng:** component ảnh hỗ trợ `width`/`height` nhưng nhiều lời gọi không truyền kích thước; OG image mặc định là logo WebP thay vì ảnh preview 1200×630 riêng cho từng trang/bài.

**Tác động:** có thể gây layout shift và preview mạng xã hội kém hấp dẫn; ảnh dự án/blog dùng lặp lại nhiều asset nên tín hiệu nội dung hình ảnh còn yếu.

**Khuyến nghị:** khai báo kích thước thật hoặc `aspect-ratio`, tạo ảnh OG 1200×630 cho từng page/article, dùng alt mô tả tiếng Việt cụ thể và ảnh dự án thật nếu có quyền sử dụng.

## 4. Điểm mạnh hiện có

### Bảo mật

- HTTPS và redirect vĩnh viễn hoạt động; HSTS đã bật.
- Header chống clickjacking, MIME sniffing, referrer leakage và quyền camera/microphone/geolocation đã có.
- Không phát hiện token/secret bị commit; source map production không được tạo mặc định.
- Link mở tab mới có `noopener noreferrer` tại các vị trí đã kiểm tra.
- React escape text theo mặc định; điểm dùng raw HTML hiện chỉ nhận dữ liệu hard-coded.

### SEO

- Mỗi page đã có cấu hình title, description và canonical phía client.
- Có một H1 hợp lý trên các page chính; hierarchy nhìn chung rõ.
- Sitemap và robots tồn tại, endpoint trả content type đúng.
- Ảnh dùng WebP, lazy loading và route-level code splitting.
- Homepage có nội dung dịch vụ, dự án, social proof và CTA rõ.

### GEO / AI

- Cho phép các crawler AI phổ biến trong robots, gồm GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot và PerplexityBot.
- Có `llms.txt` và `llms-full.txt`, được phục vụ dưới dạng Markdown và được liên kết từ HTML/HTTP header.
- Có JSON-LD cho tổ chức, website, dịch vụ và bài blog; NAP được lặp nhất quán trong source.
- Nội dung FAQ, bảng giá và mô tả dịch vụ có cấu trúc dễ trích xuất.

> `llms.txt` là tín hiệu hỗ trợ đang phát triển, không phải bảo đảm index hoặc citation. Nền tảng vẫn là HTML crawlable, nội dung có nguồn và authority bên ngoài.

## 5. Kế hoạch khắc phục đề xuất

### Trong 48 giờ

1. Chốt `www` hoặc non-www và đồng bộ redirect, canonical, sitemap, robots, schema, Open Graph, `llms.txt`.
2. Sửa soft-404 để URL không hợp lệ trả đúng 404.
3. Bật giới hạn/allowlist của EmailJS; thêm CAPTCHA có xác minh server nếu form đang bị spam.
4. Chỉ giữ FAQ schema ở nơi FAQ thực sự hiển thị.

### Trong 1 tuần

1. Prerender/SSG 7 route chính; kiểm tra raw HTML từng URL sau deploy.
2. Chuyển 6 bài blog thành route slug độc lập và link crawlable.
3. Chuẩn hóa schema ngày tháng, author, `dateModified`, breadcrumb và page type.
4. Bổ sung trang chính sách quyền riêng tư và thông báo cạnh form.
5. Nâng dependency trên nhánh riêng, chạy build + smoke test + deploy preview.

### Trong 2–4 tuần

1. Xuất bản case study có số liệu/ảnh/chứng cứ và bổ sung tác giả thật.
2. Rà lại toàn bộ claim, số liệu và nguồn; bỏ nội dung superlative không chứng minh được.
3. Tạo OG image/page, tối ưu kích thước ảnh và kiểm tra Core Web Vitals.
4. Kết nối Google Search Console và Bing Webmaster Tools; submit sitemap canonical mới.
5. Thiết lập bảng theo dõi query SEO/GEO, citation, sentiment và referral từ AI theo tháng.

## 6. Tiêu chí nghiệm thu sau khi sửa

- `curl` tới mỗi URL chính trả HTML có title, canonical, H1 và nội dung đúng **mà không cần chạy JavaScript**.
- Mọi URL canonical, sitemap và schema dùng cùng hostname đích của redirect.
- URL ngẫu nhiên trả HTTP 404; URL bài blog hợp lệ trả 200 và có nội dung article trong raw HTML.
- Rich Results Test/Schema Validator không báo lỗi; FAQ schema chỉ tương ứng FAQ nhìn thấy.
- `npm audit` không còn high ở runtime/build workflow được dùng; dev server chỉ bind localhost hoặc mạng tin cậy.
- Form bị giới hạn khi gọi trực tiếp, không chỉ khi bấm từ UI; dashboard có cảnh báo quota.
- Search Console xác nhận sitemap đọc được, canonical do Google chọn trùng canonical khai báo và số trang hợp lệ tăng sau recrawl.

## 7. Giới hạn đánh giá

- Không có quyền truy cập Vercel, EmailJS dashboard, Google Search Console, DNS/WAF log hoặc analytics nên không xác minh được cấu hình allowlist, quota, lịch sử tấn công và trạng thái index chính thức.
- Không gửi form thật để tránh tạo lead/rác; không kiểm thử DDoS, brute force hoặc exploit dependency.
- Chưa chạy Lighthouse/PageSpeed và chưa có dữ liệu người dùng thực (CrUX); nhận xét hiệu năng chỉ dựa trên build và source.
- Các thông tin pháp lý, địa chỉ, số liệu dự án và claim thương hiệu được đánh giá về cách trình bày/citation, không xác minh tính pháp lý hay tính đúng thực tế.


import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContentState, Project, Service, ContactInfo } from '../types';

// --- CẤU HÌNH NỘI DUNG WEBSITE TẠI ĐÂY ---

// 1. DANH SÁCH DỰ ÁN
const DEFAULT_PROJECTS: Project[] = [
  { 
    id: 1, 
    title: "Xây dựng thương hiệu cá nhân Facebook", 
    description: "Xây dựng tuyến chủ đề bài viết chân thật, gần gũi. Định vị chuyên gia.", 
    image: "https://i.postimg.cc/BnZfD0Lp/1.jpg", 
    category: "Branding" 
  },
  { 
    id: 2, 
    title: "Workshop AI FOR TRAINER", 
    description: "Heona đảm nhận toàn bộ khâu tổ chức từ thiết kế nhận diện, setup không gian đến vận hành.", 
    image: "https://i.postimg.cc/QdNZ539n/5.jpg", 
    category: "Event" 
  },
  { 
    id: 3, 
    title: "Xây dựng thương hiệu trên TIKTOK – “Tịnh Khiêm Tarot”", 
    description: "Tăng nhận diện chuyên gia Tarot, video viral cao nhất đạt triệu view.", 
    image: "https://i.postimg.cc/QdNZ539q/2.jpg", 
    category: "Tiktok" 
  },
  { 
    id: 4, 
    title: "Lễ Ra Mắt Dự Án UNIHONE", 
    description: "Sự kiện đánh dấu bước ngoặt hệ sinh thái UniHome. Phụ trách trọn gói ý tưởng, concept, media.", 
    image: "https://i.postimg.cc/13R16Qnj/7.jpg", 
    category: "Event" 
  },
  { 
    id: 5, 
    title: "Xây dựng thương hiệu TRAINER THANH NGUYEN", 
    description: "Hệ thống giao diện hình ảnh được làm mới hoàn toàn, chuyên nghiệp và uy tín.", 
    image: "https://i.postimg.cc/bwYfbhD9/3.jpg", 
    category: "Branding" 
  },
  { 
    id: 7, 
    title: "Đêm nhạc yêu thương 4", 
    description: "Chương trình thiện nguyện lan tỏa Ánh Sáng & Tình Yêu Thương.", 
    image: "https://i.postimg.cc/HkW15gc3/4.jpg", 
    category: "Event" 
  },
  { 
    id: 8, 
    title: "Livestream Talkshow Series", 
    description: "Setup studio, ánh sáng và vận hành livestream đa điểm cầu chuyên nghiệp.", 
    image: "https://i.postimg.cc/2SjNvDbM/6.jpg", 
    category: "Livestream" 
  },
];

// 2. DANH SÁCH DỊCH VỤ
const DEFAULT_SERVICES: Service[] = [
  {
    id: 'A',
    tag: 'Gói A',
    title: 'Xây dựng thương hiệu cá nhân',
    features: [
      'Tư vấn định vị thương hiệu cá nhân.',
      'Xây dựng nội dung truyền thông (hình ảnh, video, bài viết).',
      'Huấn luyện kỹ năng nói, phong thái chuyên nghiệp.',
      'Triển khai kênh truyền thông cá nhân (TikTok, Facebook, YouTube).'
    ],
    image: "https://i.postimg.cc/hvSh7Y9d/a1.jpg"
  },
  {
    id: 'B',
    tag: 'Gói B',
    title: 'Tổ chức sự kiện & khóa học',
    subTitle: '(workshop, seminar, đào tạo, retreat...)',
    features: [
      'Tổ chức sự kiện offline, workshop đào tạo.',
      'Hỗ trợ truyền thông sự kiện, quảng bá diễn giả.',
      'Dịch vụ tổ chức sự kiện trọn gói cho cá nhân & doanh nghiệp giáo dục / tâm linh.'
    ],
    image: "https://i.postimg.cc/zvJ3RQnW/a2.jpg"
  },
  {
    id: 'C',
    tag: 'Gói C',
    title: 'Hỗ trợ truyền thông & marketing',
    features: [
      'Dịch vụ viết bài PR, content marketing.',
      'Sản xuất nội dung video, bài viết viral.',
      'Quảng cáo Facebook, TikTok chuyên nghiệp.'
    ],
    image: "https://i.postimg.cc/6q9TGPdG/a3.jpg"
  },
  {
    id: 'D',
    tag: 'Gói D',
    title: 'Giải pháp hình ảnh thương hiệu',
    features: [
      'Thiết kế thương hiệu: Logo, bộ nhận diện thương hiệu, ấn phẩm truyền thông.',
      'Chụp ảnh Profile & Beauty cho doanh nhân, chuyên gia, diễn giả.'
    ],
    image: "https://i.postimg.cc/PJtN87m1/a4.webp"
  }
];

// 3. THÔNG TIN LIÊN HỆ
const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone: '0931 899 427',
  email: 'heonamedia@gmail.com',
  address: '45/30 đường số 1, Phường Thống Tây Hội, TP. HCM',
  facebook: '#',
  youtube: '#',
  instagram: '#',
  linkedin: '#'
};

// --- KẾT THÚC PHẦN CẤU HÌNH ---

// Context Definition
interface ContentContextType extends ContentState {
  updateProjects: (projects: Project[]) => void;
  updateServices: (services: Service[]) => void;
  updateContact: (contactInfo: ContactInfo) => void;
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization with lazy loading from localStorage
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('heona_projects');
      return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  const [services, setServices] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem('heona_services');
      return saved ? JSON.parse(saved) : DEFAULT_SERVICES;
    } catch {
      return DEFAULT_SERVICES;
    }
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    try {
      const saved = localStorage.getItem('heona_contact');
      return saved ? JSON.parse(saved) : DEFAULT_CONTACT_INFO;
    } catch {
      return DEFAULT_CONTACT_INFO;
    }
  });

  // Effects to save to localStorage on change
  useEffect(() => {
    localStorage.setItem('heona_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('heona_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('heona_contact', JSON.stringify(contactInfo));
  }, [contactInfo]);

  // Update functions
  const updateProjects = (newProjects: Project[]) => setProjects(newProjects);
  const updateServices = (newServices: Service[]) => setServices(newServices);
  const updateContact = (newContact: ContactInfo) => setContactInfo(newContact);

  const resetToDefaults = () => {
    if (window.confirm('Khôi phục dữ liệu gốc? Mọi thay đổi sẽ bị mất.')) {
      setProjects(DEFAULT_PROJECTS);
      setServices(DEFAULT_SERVICES);
      setContactInfo(DEFAULT_CONTACT_INFO);
      localStorage.removeItem('heona_projects');
      localStorage.removeItem('heona_services');
      localStorage.removeItem('heona_contact');
    }
  };

  const value: ContentContextType = {
    projects,
    services,
    contactInfo,
    updateProjects,
    updateServices,
    updateContact,
    resetToDefaults,
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};

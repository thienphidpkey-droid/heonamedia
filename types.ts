
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

export interface Service {
  id: string;
  tag: string;
  title: string;
  subTitle?: string;
  features: string[];
  image: string;
}

export interface BlogPost {
  id: number;
  tag: string;
  title: string;
  meta: string;
  content?: string; // Nội dung chi tiết HTML
  date?: string;
  author?: string;
  image?: string;
}

export interface PricingPlan {
  id: number;
  label: string;
  name: string;
  desc: string;
  features: string[];
  price: string;
  note: string;
  highlight?: boolean;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  facebook: string;
  youtube: string;
  zalo: string; // Added Zalo
  // Removed instagram & linkedin
}

export interface ContentState {
  projects: Project[];
  services: Service[];
  contactInfo: ContactInfo;
}

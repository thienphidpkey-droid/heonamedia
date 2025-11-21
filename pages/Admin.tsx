
import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { PageHero, Section } from '../components/Section';
import { Card } from '../components/Card';
import { Save, RotateCcw, Plus, Trash2, Download } from 'lucide-react';
import { Project, Service } from '../types';

export const Admin: React.FC = () => {
  const { 
    contactInfo, updateContact, 
    services, updateServices,
    projects, updateProjects,
    resetToDefaults
  } = useContent();

  const [activeTab, setActiveTab] = useState<'general' | 'services' | 'projects'>('general');

  // --- Handlers for General ---
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateContact({ ...contactInfo, [e.target.name]: e.target.value });
  };

  // --- Handlers for Services ---
  const handleServiceChange = (index: number, field: keyof Service, value: any) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], [field]: value };
    updateServices(newServices);
  };

  const handleFeatureChange = (serviceIndex: number, featureIndex: number, value: string) => {
    const newServices = [...services];
    const newFeatures = [...newServices[serviceIndex].features];
    newFeatures[featureIndex] = value;
    newServices[serviceIndex].features = newFeatures;
    updateServices(newServices);
  };

  // --- Handlers for Projects ---
  const handleProjectChange = (id: number, field: keyof Project, value: any) => {
    const newProjects = projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    updateProjects(newProjects);
  };

  const handleDeleteProject = (id: number) => {
    if(window.confirm("Xóa dự án này?")) {
      updateProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleAddProject = () => {
    // Fix bug: Math.max on empty array is -Infinity
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    
    const newProject: Project = {
      id: newId,
      title: "Dự án mới",
      description: "Mô tả dự án...",
      category: "Event",
      image: "https://picsum.photos/600/800"
    };
    updateProjects([newProject, ...projects]);
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ contactInfo, services, projects }, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "heona_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <>
      <PageHero title="Quản trị nội dung (CMS)" sub="Chỉnh sửa nội dung website trực quan. Dữ liệu được lưu trên trình duyệt của bạn." />
      
      <Section narrow className="pt-0">
        <div className="flex flex-wrap gap-4 mb-10 border-b border-white/10 pb-6">
          <button 
            onClick={() => setActiveTab('general')}
            className={`px-8 py-3 rounded-full text-base font-bold transition-all ${activeTab === 'general' ? 'bg-primary text-white' : 'bg-white/5 hover:bg-white/10'}`}
          >
            Thông tin chung
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`px-8 py-3 rounded-full text-base font-bold transition-all ${activeTab === 'services' ? 'bg-primary text-white' : 'bg-white/5 hover:bg-white/10'}`}
          >
            Dịch vụ (Gói A-D)
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`px-8 py-3 rounded-full text-base font-bold transition-all ${activeTab === 'projects' ? 'bg-primary text-white' : 'bg-white/5 hover:bg-white/10'}`}
          >
            Quản lý Dự án
          </button>

          <div className="ml-auto flex gap-3">
             <button onClick={resetToDefaults} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-red-500/50 text-red-400 text-sm font-bold hover:bg-red-500/10">
                <RotateCcw size={16} /> Reset gốc
             </button>
             <button onClick={exportData} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-bold hover:bg-green-700">
                <Download size={16} /> Export JSON
             </button>
          </div>
        </div>

        {/* GENERAL TAB */}
        {activeTab === 'general' && (
          <div className="grid md:grid-cols-2 gap-10 animate-fade-in">
             <Card noHover>
               <h3 className="font-heading font-bold text-2xl mb-6">Thông tin liên hệ (Footer & Contact)</h3>
               <div className="space-y-5">
                 {Object.keys(contactInfo).map((key) => (
                   <div key={key} className="flex flex-col gap-2">
                     <label className="text-sm text-textMuted uppercase">{key}</label>
                     <input 
                       name={key}
                       value={(contactInfo as any)[key]}
                       onChange={handleContactChange}
                       className="bg-[#111116] border border-borderSubtle rounded p-3 text-base text-white w-full focus:border-primary outline-none"
                     />
                   </div>
                 ))}
               </div>
             </Card>
             <Card noHover className="flex items-center justify-center">
                <div className="text-center p-8">
                   <Save size={56} className="mx-auto text-primary mb-6" />
                   <h3 className="text-2xl font-bold">Tự động lưu</h3>
                   <p className="text-textMuted text-base mt-3">Mọi thay đổi bạn nhập được lưu tự động vào trình duyệt.</p>
                </div>
             </Card>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 gap-10 animate-fade-in">
             {services.map((service, idx) => (
               <Card key={service.id} noHover>
                 <div className="grid md:grid-cols-[240px_1fr] gap-8">
                    <div className="flex flex-col gap-3">
                        <img src={service.image} className="w-full h-40 object-cover rounded-lg" alt="Preview" />
                        <input 
                          value={service.image}
                          onChange={(e) => handleServiceChange(idx, 'image', e.target.value)}
                          placeholder="URL hình ảnh..."
                          className="bg-[#111116] border border-borderSubtle rounded p-2 text-sm text-white w-full"
                        />
                         <input 
                          value={service.tag}
                          onChange={(e) => handleServiceChange(idx, 'tag', e.target.value)}
                          className="bg-[#111116] border border-borderSubtle rounded p-2 text-sm text-white w-full text-center font-bold"
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <input 
                          value={service.title}
                          onChange={(e) => handleServiceChange(idx, 'title', e.target.value)}
                          className="bg-[#111116] border border-borderSubtle rounded p-3 text-xl font-bold text-white w-full focus:border-primary outline-none"
                        />
                         <input 
                          value={service.subTitle || ''}
                          onChange={(e) => handleServiceChange(idx, 'subTitle', e.target.value)}
                          placeholder="Subtitle (nếu có)"
                          className="bg-[#111116] border border-borderSubtle rounded p-3 text-base text-secondary w-full focus:border-primary outline-none"
                        />
                        <div className="space-y-3 mt-2">
                            <label className="text-sm text-textMuted">Đặc điểm (Features)</label>
                            {service.features.map((feature, fIdx) => (
                                <input 
                                  key={fIdx}
                                  value={feature}
                                  onChange={(e) => handleFeatureChange(idx, fIdx, e.target.value)}
                                  className="bg-[#111116] border border-borderSubtle rounded p-3 text-base text-white w-full focus:border-primary outline-none block"
                                />
                            ))}
                        </div>
                    </div>
                 </div>
               </Card>
             ))}
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-8 animate-fade-in">
             <button onClick={handleAddProject} className="w-full py-4 border border-dashed border-white/20 rounded-xl text-textMuted hover:text-white hover:border-primary hover:bg-white/5 flex items-center justify-center gap-3 transition-all text-lg">
                <Plus size={24} /> Thêm dự án mới
             </button>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                   <Card key={project.id} noHover className="relative">
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="absolute top-5 right-5 p-2.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors z-10"
                      >
                          <Trash2 size={20} />
                      </button>
                      <div className="flex flex-col gap-4">
                          <div className="aspect-video rounded-lg overflow-hidden bg-black/20 relative group">
                              <img src={project.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                              <input 
                                value={project.image}
                                onChange={(e) => handleProjectChange(project.id, 'image', e.target.value)}
                                className="absolute bottom-0 left-0 w-full bg-black/80 text-sm text-white p-3 border-none outline-none"
                                placeholder="Image URL..."
                              />
                          </div>
                          
                          <div className="grid grid-cols-[1fr_100px] gap-3">
                              <input 
                                value={project.title}
                                onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                                className="bg-[#111116] border border-borderSubtle rounded p-3 text-lg font-bold text-white focus:border-primary outline-none"
                                placeholder="Tên dự án"
                              />
                               <input 
                                value={project.category}
                                onChange={(e) => handleProjectChange(project.id, 'category', e.target.value)}
                                className="bg-[#111116] border border-borderSubtle rounded p-3 text-sm text-center text-primary font-mono focus:border-primary outline-none"
                                placeholder="Loại"
                              />
                          </div>
                          <textarea 
                            value={project.description}
                            onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                            className="bg-[#111116] border border-borderSubtle rounded p-3 text-base text-textMuted focus:border-primary outline-none h-28 resize-none"
                            placeholder="Mô tả chi tiết..."
                          />
                      </div>
                   </Card>
                ))}
             </div>
          </div>
        )}

      </Section>
    </>
  );
};
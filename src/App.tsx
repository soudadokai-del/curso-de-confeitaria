/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  PlayCircle, 
  Trophy, 
  CheckCircle2, 
  ChevronLeft, 
  Lock, 
  Clock, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { cn } from "./lib/utils";
import { MODULES, CERTIFICATE_LINK } from "./constants";
import { Lesson, Module } from "./types";

// --- Components ---

const getEmbedUrl = (url: string) => {
  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }
  return url;
};

const ProgressBar = ({ progress, className }: { progress: number; className?: string }) => (
  <div className={cn("h-2 w-full bg-chocolate/10 rounded-full overflow-hidden", className)}>
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-full bg-pink-soft"
    />
  </div>
);

const BottomNav = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-chocolate/5 px-6 py-3 flex justify-around items-center z-50">
    {[
      { id: "home", icon: Home, label: "Início" },
      { id: "progress", icon: PlayCircle, label: "Aulas" },
      { id: "certificate", icon: Trophy, label: "Certificado" },
    ].map((tab) => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={cn(
          "flex flex-col items-center gap-1 transition-all duration-300",
          activeTab === tab.id ? "text-chocolate scale-110" : "text-chocolate/40 hover:text-chocolate/60"
        )}
      >
        <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
        <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
      </button>
    ))}
  </nav>
);

// --- Pages ---

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem("confeitaria_progress");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("confeitaria_progress", JSON.stringify(completedLessons));
  }, [completedLessons]);

  const totalLessons = useMemo(() => MODULES.reduce((acc, m) => acc + m.lessons.length, 0), []);
  const overallProgress = useMemo(() => (completedLessons.length / totalLessons) * 100, [completedLessons, totalLessons]);

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessons(prev => 
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    );
  };

  const getModuleProgress = (module: Module) => {
    const completedInModule = module.lessons.filter(l => completedLessons.includes(l.id)).length;
    return (completedInModule / module.lessons.length) * 100;
  };

  const handleBack = () => {
    if (selectedLesson) {
      setSelectedLesson(null);
    } else if (selectedModule) {
      setSelectedModule(null);
    }
  };

  // Render Logic
  const renderContent = () => {
    if (selectedLesson) {
      return (
        <motion.div 
          key="lesson"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="pb-24"
        >
          <div className="relative aspect-video w-full bg-black shadow-2xl overflow-hidden rounded-b-3xl">
            <iframe
              width="100%"
              height="100%"
              src={getEmbedUrl(selectedLesson.videoUrl)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-chocolate leading-tight">{selectedLesson.title}</h1>
            </div>

            <p className="text-chocolate/70 mb-8 leading-relaxed">
              Assista à aula completa para dominar esta técnica. Lembre-se de anotar os detalhes importantes para o seu sucesso na confeitaria.
            </p>

            <button
              onClick={() => toggleLessonCompletion(selectedLesson.id)}
              className={cn(
                "w-full py-5 rounded-2xl font-bold text-lg transition-all duration-500 shadow-lg flex items-center justify-center gap-3 mb-4",
                completedLessons.includes(selectedLesson.id)
                  ? "bg-green-500 text-white shadow-green-200"
                  : "bg-chocolate text-cream shadow-chocolate/20 active:scale-95"
              )}
            >
              {completedLessons.includes(selectedLesson.id) ? (
                <>
                  <CheckCircle2 size={24} />
                  Aula Concluída
                </>
              ) : (
                "Marcar como Concluída"
              )}
            </button>

            {selectedModule && selectedModule.lessons.findIndex(l => l.id === selectedLesson.id) < selectedModule.lessons.length - 1 && (
              <button
                onClick={() => {
                  const currentIndex = selectedModule.lessons.findIndex(l => l.id === selectedLesson.id);
                  const nextLesson = selectedModule.lessons[currentIndex + 1];
                  setSelectedLesson(nextLesson);
                  window.scrollTo(0, 0);
                }}
                className="w-full py-5 rounded-2xl font-bold text-lg bg-pink-soft text-chocolate shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                Próxima Aula
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        </motion.div>
      );
    }

    if (selectedModule) {
      return (
        <motion.div 
          key="module"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="px-6 pt-8 pb-24"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-chocolate mb-2">{selectedModule.title}</h2>
            <p className="text-chocolate/60 font-medium">{selectedModule.lessons.length} aulas • {Math.round(getModuleProgress(selectedModule))}% concluído</p>
          </div>

          <div className="space-y-4">
            {selectedModule.lessons.map((lesson, idx) => (
              <motion.button
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedLesson(lesson)}
                className="w-full bg-white p-5 rounded-2xl flex items-center gap-4 shadow-sm border border-chocolate/5 hover:border-pink-soft/30 transition-all group active:scale-[0.98]"
              >
                <div className="relative">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    completedLessons.includes(lesson.id) ? "bg-green-100 text-green-600" : "bg-chocolate/5 text-chocolate/40 group-hover:bg-pink-soft/10 group-hover:text-pink-soft"
                  )}>
                    {completedLessons.includes(lesson.id) ? <CheckCircle2 size={24} /> : <PlayCircle size={24} />}
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-chocolate text-lg leading-tight mb-1">{lesson.title}</h4>
                  <p className="text-xs text-chocolate/40 font-medium uppercase tracking-wider">Vídeo Aula</p>
                </div>
                <ChevronRight size={20} className="text-chocolate/20 group-hover:text-pink-soft transition-colors" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      );
    }

    if (activeTab === "certificate") {
      const isUnlocked = overallProgress === 100;
      return (
        <motion.div 
          key="certificate"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pt-12 pb-24 flex flex-col items-center text-center"
        >
          <div className={cn(
            "w-full max-w-sm aspect-[1.4/1] rounded-3xl p-8 flex flex-col items-center justify-center gap-6 shadow-2xl relative overflow-hidden transition-all duration-700",
            isUnlocked 
              ? "bg-gradient-to-br from-gold via-yellow-100 to-gold text-chocolate border-4 border-white" 
              : "bg-chocolate/10 text-chocolate/30 grayscale"
          )}>
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/30" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30" />
            
            <Trophy size={80} strokeWidth={1} className={isUnlocked ? "text-chocolate" : "text-chocolate/20"} />
            
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-2">Certificado Premium</h3>
              <p className="text-sm font-medium opacity-70">Confeitaria de Elite</p>
            </div>

            {!isUnlocked && (
              <div className="absolute inset-0 bg-chocolate/40 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Lock size={32} className="text-chocolate" />
                </div>
                <p className="text-white font-bold text-lg">Bloqueado</p>
              </div>
            )}
          </div>

          <div className="mt-12 max-w-xs">
            <h2 className="text-2xl font-bold text-chocolate mb-4">
              {isUnlocked ? "Parabéns, Mestre!" : "Quase lá, Confeiteira!"}
            </h2>
            <p className="text-chocolate/60 leading-relaxed mb-8">
              {isUnlocked 
                ? "Você concluiu todas as aulas com excelência. Seu certificado de mestre confeiteira está pronto para ser emitido."
                : "Complete 100% do curso para desbloquear seu certificado exclusivo e comprovar sua expertise."}
            </p>

            {isUnlocked ? (
              <a
                href={CERTIFICATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-chocolate text-cream px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Solicitar Certificado
                <ExternalLink size={20} />
              </a>
            ) : (
              <div className="w-full space-y-2">
                <div className="flex justify-between text-xs font-bold text-chocolate/40 uppercase tracking-tighter">
                  <span>Progresso Atual</span>
                  <span>{Math.round(overallProgress)}%</span>
                </div>
                <ProgressBar progress={overallProgress} />
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    if (activeTab === "progress") {
      return (
        <motion.div 
          key="progress-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-6 pt-8 pb-24"
        >
          <h2 className="text-2xl font-bold text-chocolate mb-6">Suas Aulas</h2>
          <div className="space-y-6">
            {MODULES.map((module) => (
              <div key={module.id} className="space-y-3">
                <h3 className="text-sm font-bold text-chocolate/40 uppercase tracking-widest">{module.title}</h3>
                <div className="space-y-2">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className="w-full bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm border border-chocolate/5 active:scale-[0.98] transition-all"
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        completedLessons.includes(lesson.id) ? "bg-green-100 text-green-600" : "bg-chocolate/5 text-chocolate/40"
                      )}>
                        {completedLessons.includes(lesson.id) ? <CheckCircle2 size={18} /> : <PlayCircle size={18} />}
                      </div>
                      <span className={cn(
                        "flex-1 text-left font-medium text-sm",
                        completedLessons.includes(lesson.id) ? "text-chocolate/50 line-through" : "text-chocolate"
                      )}>
                        {lesson.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      );
    }

    // Default: Home
    return (
      <motion.div 
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-6 pt-8 pb-24"
      >
        <header className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-chocolate leading-tight">Olá, Confeiteira 👋</h1>
              <p className="text-chocolate/50 font-medium">Pronta para criar doçuras hoje?</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-pink-soft/20 flex items-center justify-center text-pink-soft">
              <Trophy size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-chocolate/5">
            <div className="flex justify-between items-end mb-3">
              <span className="text-xs font-bold text-chocolate/40 uppercase tracking-widest">Seu Progresso Geral</span>
              <span className="text-2xl font-bold text-chocolate">{Math.round(overallProgress)}%</span>
            </div>
            <ProgressBar progress={overallProgress} className="h-3" />
          </div>
        </header>

        <section>
          <h2 className="text-xl font-bold text-chocolate mb-6 flex items-center gap-2">
            Módulos do Curso
            <span className="text-xs bg-pink-soft/10 text-pink-soft px-2 py-1 rounded-full">{MODULES.length}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MODULES.map((module, idx) => (
              <motion.button
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedModule(module)}
                className="group relative w-full aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-xl active:scale-[0.98] transition-all"
              >
                <img 
                  src={module.imageUrl} 
                  alt={module.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate via-chocolate/40 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
                  <div className="mb-2">
                    <span className="text-[10px] font-bold text-cream/60 uppercase tracking-[0.2em]">Módulo {idx + 1}</span>
                    <h3 className="text-2xl font-bold text-cream leading-tight">{module.title}</h3>
                  </div>
                  
                  <div className="flex items-center justify-between w-full mt-2">
                    <p className="text-xs font-medium text-cream/70">{module.lessons.length} aulas exclusivas</p>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      <ChevronRight size={18} />
                    </div>
                  </div>

                  <div className="mt-4">
                    <ProgressBar progress={getModuleProgress(module)} className="bg-white/10 h-1.5" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto bg-cream relative">
      {/* Header for subpages */}
      {(selectedModule || selectedLesson) && (
        <header className="sticky top-0 left-0 right-0 px-6 py-4 bg-cream/80 backdrop-blur-md z-40 flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-chocolate active:scale-90 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="font-bold text-chocolate truncate">
            {selectedLesson ? selectedLesson.title : selectedModule?.title}
          </span>
        </header>
      )}

      <main>
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      {!selectedLesson && (
        <BottomNav 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setSelectedModule(null);
            setSelectedLesson(null);
          }} 
        />
      )}
    </div>
  );
}

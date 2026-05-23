import { MessageCircle, Plus, Search, Menu, Music2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const FEED_DATA = [
  {
    id: 1,
    url: "https://storage.googleapis.com/test-media-human/611953/611953_0.png",
    username: "TongEr",
    description: "妈 您不懂现在的年轻人都这么穿 #今天穿什么 #ootd 穿搭",
    music: "风吹一夏 - 阿水SWEI/Ra",
    likes: "7.9万",
    comments: "706",
    shares: "1.4万",
    favorites: "6423"
  },
  {
    id: 2,
    url: "https://storage.googleapis.com/test-media-human/611953/611953_1.png",
    username: "TongEr",
    description: "夏日晚风与桥边 🌙 #生活碎片",
    music: "原声 - TongEr",
    likes: "5.2万",
    comments: "412",
    shares: "8092",
    favorites: "3120"
  },
  {
    id: 3,
    url: "https://storage.googleapis.com/test-media-human/611953/611953_2.png",
    username: "TongEr",
    description: "街头的红色风景线 ❤️ #时尚穿搭",
    music: "City Lights - Midnight Radio",
    likes: "12.4万",
    comments: "1534",
    shares: "3.2万",
    favorites: "1.2万"
  }
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="h-[100dvh] w-full bg-black text-white relative overflow-hidden flex flex-col font-sans selection:bg-emerald-500/30">
      
      {/* Top Navigation Overlay */}
      <div className="absolute top-0 w-full z-40 pt-10 pb-4 px-5 flex justify-between items-center text-white/90 drop-shadow-md bg-gradient-to-b from-black/40 to-transparent pointer-events-none">
        <Menu className="w-7 h-7 pointer-events-auto" strokeWidth={2.5} />
        <div className="flex gap-6 text-[17px] font-semibold tracking-wide pointer-events-auto">
          <span className="opacity-60 transition-opacity hover:opacity-100 cursor-pointer">关注</span>
          <span className="opacity-60 transition-opacity hover:opacity-100 cursor-pointer">发现</span>
          <span className="relative opacity-100 cursor-pointer">
            推荐
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </span>
          <span className="opacity-60 transition-opacity hover:opacity-100 cursor-pointer">附近</span>
        </div>
        <Search className="w-7 h-7 pointer-events-auto" strokeWidth={2.5} />
      </div>

      {/* Main Feed Content Area */}
      <div className="flex-1 relative z-10 overflow-hidden">
        <div 
          className="h-full transition-transform duration-500 ease-out flex flex-col"
          style={{ transform: `translateY(-${currentIndex * 100}%)` }}
        >
          {FEED_DATA.map((item, index) => (
            <div key={item.id} className="h-full w-full flex-shrink-0 relative">
              {/* Full-screen Image */}
              <img 
                src={item.url} 
                className="w-full h-full object-cover" 
                alt={`feed-${item.id}`}
                referrerPolicy="no-referrer"
              />
              
              {/* Gradual Overlay for Text Readability */}
              <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

              {/* Bottom Info Section */}
              <div className="absolute bottom-20 left-4 right-16 z-30 pointer-events-none">
                <h3 className="text-[17px] font-bold mb-2 flex items-center gap-1">
                  @{item.username}
                </h3>
                <p className="text-[15px] leading-relaxed mb-3 pr-4">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="flex-shrink-0">
                    <Music2 className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden whitespace-nowrap">
                    <p className="inline-block animate-marquee pl-[100%] text-sm opacity-90">
                      {item.music}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Interaction Sidebar */}
              <div className="absolute right-3 bottom-20 flex flex-col items-center gap-5 z-40">
                <div className="relative mb-2">
                  <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden bg-gray-800">
                    <img src={item.id === 1 ? "https://api.dicebear.com/7.x/avataaars/svg?seed=TongEr" : `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.username}`} alt="avatar" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                    <Plus className="w-3 h-3 text-white" strokeWidth={4} />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-0.5 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white/90 drop-shadow-lg group-hover:text-red-500 transition-colors">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </div>
                  <span className="text-white text-[11px] font-semibold drop-shadow-md">{item.likes}</span>
                </div>

                <div className="flex flex-col items-center gap-0.5 cursor-pointer">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white/90 drop-shadow-lg">
                    <MessageCircle className="w-8 h-8 fill-current stroke-current" />
                  </div>
                  <span className="text-white text-[11px] font-semibold drop-shadow-md">{item.comments}</span>
                </div>

                <div className="flex flex-col items-center gap-0.5 cursor-pointer">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white/90 drop-shadow-lg">
                    <svg fill="currentColor" style={{ opacity: 0.9 }} width="28" height="28" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/></svg>
                  </div>
                  <span className="text-white text-[11px] font-semibold drop-shadow-md">{item.favorites}</span>
                </div>

                <div className="flex flex-col items-center gap-0.5 cursor-pointer">
                   <div className="w-10 h-10 rounded-full flex items-center justify-center text-white/90 drop-shadow-lg">
                     <svg fill="currentColor" width="34" height="34" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
                   </div>
                   <span className="text-white text-[11px] font-semibold drop-shadow-md">{item.shares}</span>
                </div>

                <div className="w-11 h-11 rounded-full border-[10px] border-gray-800/80 overflow-hidden bg-black flex items-center justify-center animate-spin-slow mt-2 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                   <img src={item.url} className="w-full h-full object-cover scale-[2.5] opacity-80" alt="music record" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Swipe Controls (Hidden overlay) */}
        <div className="absolute inset-0 z-20 flex flex-col">
          <div 
            className="flex-1 cursor-ns-resize" 
            onClick={() => setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev))}
          />
          <div 
            className="flex-1 cursor-ns-resize" 
            onClick={() => setCurrentIndex(prev => (prev < FEED_DATA.length - 1 ? prev + 1 : prev))}
          />
        </div>
      </div>

      {/* Bottom Status Bar / Navigation */}
      <div className="bg-black pb-8 pt-3 px-4 flex justify-around items-center z-40 border-t border-white/5 relative">
        <button className="text-white text-base font-bold opacity-100 transition-opacity drop-shadow-md">首页</button>
        <button className="text-white text-base font-bold opacity-60 hover:opacity-100 transition-opacity drop-shadow-md">朋友</button>
        
        {/* Create Button */}
        <button className="relative group active:scale-95 transition-transform flex items-center justify-center">
          <div className="w-[45px] h-[30px] rounded-[8px] bg-white relative flex items-center justify-center">
            <div className="absolute -left-1 w-2 h-full bg-cyan-400 rounded-l-[8px] -z-10"></div>
            <div className="absolute -right-1 w-2 h-full bg-red-500 rounded-r-[8px] -z-10"></div>
            <Plus className="w-5 h-5 text-black" strokeWidth={3.5} />
          </div>
        </button>
        
        <button className="text-white text-base font-bold opacity-60 hover:opacity-100 transition-opacity relative drop-shadow-md">
          消息
          <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="text-white text-base font-bold opacity-60 hover:opacity-100 transition-opacity drop-shadow-md">我</button>
      </div>

      {/* Custom Global Styles */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
          display: inline-block;
          white-space: nowrap;
        }
        button { touch-action: manipulation; }
      `}</style>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bus, 
  MapPin, 
  Camera, 
  Wallet, 
  ChevronRight, 
  ChevronLeft,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Wifi,
  ShoppingBag,
  ArrowRight,
  Globe,
  StepForward,
  CreditCard,
  Phone,
  Search,
  Users
} from 'lucide-react';

// Types
interface DayInfo {
  day: number | string;
  title: string;
  subtitle: string;
  tasks?: string[];
  transport?: { type: string; price: string }[];
  locations?: { name: string; desc: string; icon: React.ReactNode }[];
  notes?: string[];
  phase?: string;
  timeline?: { time: string; text: string; icon: React.ReactNode }[];
}

const DAYS_OVERVIEW_CONTENT = [
  {
    day: "1-2",
    title: "清萊",
    subtitle: "建立後勤基地、文化巡禮",
    phase: "建立後勤"
  },
  {
    day: "3-5",
    title: "美塞",
    subtitle: "推進邊界、地理實測、最後整備",
    phase: "推進準備"
  },
  {
    day: "6",
    title: "大其力",
    subtitle: "正式跨國、進入緬甸",
    phase: "正式行動"
  }
];

const DAILY_DETAILS: DayInfo[] = [
  {
    day: 1,
    title: "Day 1：抵達清萊 — 建立後勤基地",
    subtitle: "下機後第一時間確保通訊與物資",
    transport: [
      { type: "Grab", price: "約 200 泰銖" },
      { type: "CR Bus", price: "20 泰銖" }
    ],
    tasks: ["辦理入住飯店", "巡視夜市 (Night Bazaar)"],
    notes: ["必辦：購買長效 SIM 卡", "必換：換足泰銖現鈔"],
  },
  {
    day: 2,
    title: "Day 2：文化沸騰 — 清萊經典巡禮",
    subtitle: "深入探索清萊最具代表性的建築與美食",
    locations: [
      { name: "白廟 (Wat Rong Khun)", desc: "全白純淨外觀，視覺震撼力極強。門票 100 泰銖。", icon: <Camera className="w-5 h-5" /> },
      { name: "藍廟 (Wat Rong Suea Ten)", desc: "湛藍色調神祕感十足，免費入場。與白廟形成強烈對比。", icon: <Camera className="w-5 h-5" /> },
      { name: "Khao Soy Maesai", desc: "必吃！在地最強的泰北咖哩麵，濃郁經典，CP 值超高。", icon: <ShoppingBag className="w-5 h-5" /> }
    ],
    notes: ["防曬、穿著得體 (進入廟宇需蓋過肩膀、膝蓋)", "Grab 在清萊市區非常便利"]
  },
  {
    day: 3,
    title: "Day 3：推進邊界 — 清萊 -> 美塞",
    subtitle: "向北方移動，建立邊際後的行動基礎",
    locations: [
      { name: "黑屋博物館 (黑廟)", desc: "融合當代與泰國古老藝術的建築群，是清萊極具深度的一環。", icon: <Camera className="w-5 h-5" /> }
    ],
    transport: [
      { type: "Local Bus (無空調)", price: "45 泰銖" },
      { type: "Minivan (有空調)", price: "100 泰銖" }
    ],
    notes: ["美塞住宿必備：穩定 Wi-Fi (供工作/連繫)", "預設「實體工位」：環境需有利於邊境觀察"]
  },
  {
    day: 4,
    title: "Day 4：地理實測 — 金三角區域攻略",
    subtitle: "踏訪三國邊界交匯點",
    tasks: ["今日重點：金三角 (Golden Triangle)", "參觀鴉片博物館", "地理環境建模與實測"],
    notes: ["必測：Google Maps 在邊界的連線速度", "嘟嘟車包車 500-800 泰銖"]
  },
  {
    day: 5,
    title: "Day 5：最後準備 — 備戰狀態",
    subtitle: "正式跨境前的最終總結與心態建設",
    tasks: [
      "路線回顧：上午配合模擬演練，取得第一階段的反饋與優化。",
      "物資補足：瓶裝水、乾糧、雨傘、行動電源。",
      "VPN 測試：測試泰緬邊境連線，準備多組穩定連線方案。",
      "補足公款：確認公帳預算與應急準備。"
    ],
    notes: ["情緒穩定是最高優先級", "確認保平安聯絡機制"]
  },
  {
    day: 6,
    title: "Day 6：正式跨國 — 進入緬甸大其力",
    subtitle: "挑戰跨境流程：美塞 -> 大其力",
    timeline: [
      { time: "08:00", text: "抵達美塞口岸", icon: <MapPin className="w-4 h-4" /> },
      { time: "08:45", text: "泰國移民局辦理出境", icon: <CheckCircle2 className="w-4 h-4" /> },
      { time: "09:15", text: "步行跨越泰緬友誼大橋", icon: <Navigation className="w-4 h-4" /> },
      { time: "09:45", text: "緬甸海關入境查驗", icon: <Globe className="w-4 h-4" /> },
      { time: "10:30", text: "成功抵達碰面地點", icon: <StepForward className="w-4 h-4" /> }
    ],
    notes: ["跨境通訊切換需快速反應", "緬甸大其力物價參考", "注意證件隨身安全"]
  }
];

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % 10);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + 10) % 10);

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 lg:p-16"
        >
          {activeSlide === 0 && <HeroSlide onNext={nextSlide} />}
          {activeSlide === 1 && <OverviewSlide />}
          {activeSlide >= 2 && activeSlide <= 7 && <DayDetailSlide data={DAILY_DETAILS[activeSlide - 2]} />}
          {activeSlide === 8 && <BudgetSlide />}
          {activeSlide === 9 && <ChecklistSlide />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-8 z-50">
        <button 
          onClick={prevSlide}
          disabled={activeSlide === 0}
          className={`p-3 rounded-full transition-all border ${activeSlide === 0 ? 'opacity-20 cursor-not-allowed border-white/5' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
        >
          <ChevronLeft className="w-5 h-5 text-blue-400" />
        </button>
        
        <div className="flex space-x-2 items-center">
          {Array.from({ length: 10 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === i ? 'w-10 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'w-2 bg-white/10 hover:bg-white/20'}`}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide}
          disabled={activeSlide === 9}
          className={`p-3 rounded-full transition-all border ${activeSlide === 9 ? 'opacity-20 cursor-not-allowed border-white/5' : 'bg-blue-600 hover:bg-blue-500 border-blue-400/30'}`}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="fixed top-8 right-8 z-50 flex items-center space-x-3 text-[10px] font-mono text-gray-500 tracking-[0.2em] font-bold uppercase">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>Active Mission: Tachileik Crossing</span>
      </div>
    </div>
  );
}

function HeroSlide({ onNext }: { onNext: () => void }) {
  return (
    <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-12"
      >
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">
            清萊 <span className="text-blue-500">→</span> 大其力<br />
            <span className="text-4xl md:text-6xl text-gray-100">6天跨境行動指南</span>
          </h1>
          <div className="h-2 w-48 bg-blue-600 rounded-full" />
        </div>
        
        <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed">
          從清萊跨入緬甸，這份行程幫你把後勤、文化、邊界三件事一次搞定。<br />
          預算 <span className="text-white font-bold underline decoration-blue-600 decoration-4 underline-offset-8">NT$30,000</span>，輕鬆自由行。
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <button 
            className="px-10 py-5 bg-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all text-white shadow-2xl shadow-blue-600/20"
          >
            臺灣自由行客適用
          </button>
          <button 
            onClick={onNext}
            className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            6天全流程攻略 <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative hidden lg:block"
      >
        <div className="absolute inset-0 bg-blue-600/5 rounded-[4rem] blur-3xl" />
        <div className="relative rounded-[4rem] border border-white/5 bg-slate-900/50 p-12 aspect-[4/5] flex flex-col justify-between overflow-hidden">
             <div className="space-y-2">
                <Globe className="w-12 h-12 text-blue-500" />
                <div className="text-[10px] font-black tracking-[0.3em] text-gray-600 uppercase">Cross-Border Protocol</div>
             </div>
             
             <div className="space-y-6">
                <h3 className="text-4xl font-black italic uppercase leading-none text-blue-500">Logistics<br />Cultural<br />Border</h3>
                <p className="text-sm text-gray-500 max-w-xs font-medium">A systematic approach to navigating the Thai-Myanmar boundary for independent travelers.</p>
             </div>
             
             <div className="absolute top-[-50px] right-[-50px] opacity-[0.03]">
                <Search className="w-96 h-96" />
             </div>
        </div>
      </motion.div>
    </div>
  );
}

function OverviewSlide() {
  return (
    <div className="max-w-6xl w-full space-y-20">
      <div className="space-y-4 text-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">行程總覽</h2>
        <p className="text-blue-500 font-mono font-bold tracking-[0.3em] text-sm uppercase">6 天，3 個核心任務</p>
      </div>

      <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4 px-10">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-900/20 -translate-y-1/2 hidden md:block" />
        
        {DAYS_OVERVIEW_CONTENT.map((day, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="w-full md:w-[30%] group relative z-10"
          >
            <div className="p-12 rounded-[3.5rem] border border-white/5 bg-slate-900/80 backdrop-blur-3xl group-hover:bg-blue-600/10 group-hover:border-blue-500/30 transition-all space-y-6">
              <span className="inline-block px-4 py-1 rounded-full bg-blue-500 text-[10px] font-black text-white uppercase tracking-widest">Day {day.day}</span>
              <div className="space-y-2">
                <h3 className="text-3xl font-black leading-tight tracking-tighter">{day.title}</h3>
                <p className="text-gray-500 font-bold text-sm leading-relaxed">{day.subtitle}</p>
              </div>
            </div>
            {idx < 2 && (
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 translate-x-1/2 hidden md:block">
                <ChevronRight className="w-12 h-12 text-blue-900" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <p className="text-center text-gray-700 text-xs font-mono uppercase tracking-[0.5em] font-black">每階段皆有明確任務指標，跨境行動必備確認事項。</p>
    </div>
  );
}

function DayDetailSlide({ data }: { data: DayInfo }) {
  return (
    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      <div className="lg:col-span-5 space-y-12">
        <div className="space-y-8">
          <div className="group inline-flex items-center space-x-3 px-5 py-2 rounded-2xl bg-blue-600/10 border border-blue-600/20">
            <span className="text-blue-500 font-mono font-black text-sm uppercase tracking-widest">CHAPTER {typeof data.day === 'number' && data.day < 10 ? `0${data.day}` : data.day}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95]">{data.title}</h2>
          <p className="text-xl md:text-2xl text-gray-500 font-medium leading-tight">{data.subtitle}</p>
        </div>

        {data.timeline ? (
          <div className="space-y-4">
            {data.timeline.map((item, i) => (
              <div key={i} className="flex items-center gap-6 p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                <span className="font-mono font-black text-blue-500 text-sm">{item.time}</span>
                <div className="flex items-center space-x-4 text-gray-200 font-bold">
                  <span className="opacity-40">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {data.tasks?.map((t, i) => (
              <div key={i} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center gap-6 group hover:translate-x-2 transition-transform">
                <div className="w-10 h-10 shrink-0 rounded-2xl bg-blue-600/10 flex items-center justify-center font-black text-sm text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">0{i + 1}</div>
                <span className="font-bold text-gray-200 text-lg leading-snug">{t}</span>
              </div>
            ))}
          </div>
        )}

        {data.notes && (
          <div className="p-10 rounded-[3rem] bg-blue-600 text-white space-y-6 shadow-2xl shadow-blue-500/20">
            <h4 className="flex items-center font-black text-sm uppercase tracking-widest opacity-80 underline decoration-white/20 underline-offset-4">
              <AlertCircle className="w-5 h-5 mr-3" /> 行動必辦事項
            </h4>
            <div className="space-y-4">
              {data.notes.map((n, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-3xl bg-white/10 backdrop-blur-md">
                  <CheckCircle2 className="w-6 h-6 shrink-0 mt-1 opacity-50" />
                  <p className="text-base font-bold leading-relaxed">{n}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-7 space-y-12">
        {data.locations && (
          <div className="grid grid-cols-1 gap-8">
            {data.locations.map((loc, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-[3.5rem] bg-slate-900/50 border border-white/5 hover:border-blue-500/40 transition-all flex gap-10"
              >
                <div className="w-24 h-24 shrink-0 rounded-[2rem] bg-white/5 group-hover:bg-blue-600/10 transition-colors flex items-center justify-center text-blue-500">
                  {loc.icon}
                </div>
                <div className="space-y-3">
                  <h5 className="font-black text-3xl group-hover:text-blue-500 transition-colors">{loc.name}</h5>
                  <p className="text-lg text-gray-500 leading-relaxed font-medium">{loc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {data.transport && (
          <div className="p-12 rounded-[4rem] bg-white text-black space-y-10 relative overflow-hidden group">
            <div className="flex items-center justify-between relative z-10">
              <h4 className="flex items-center font-black text-xs uppercase tracking-[0.3em] text-gray-400">
                <Bus className="w-5 h-5 mr-3" /> Logistics / Finance
              </h4>
              <div className="text-[10px] font-black text-blue-600 bg-blue-100 px-4 py-2 rounded-full uppercase tracking-tighter">Budget Control</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              {data.transport.map((tr, i) => (
                <div key={i} className="space-y-2 border-l-[6px] border-blue-600 pl-8 group-hover:translate-x-2 transition-transform">
                  <div className="text-xs font-black text-gray-500 uppercase tracking-widest">{tr.type}</div>
                  <div className="text-5xl font-black italic tracking-tighter">{tr.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-[4rem] aspect-video bg-blue-600/5 border-2 border-dashed border-white/5 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-blue-900/10" />
            <div className="text-center space-y-4 relative z-10 px-10">
                <Camera className="w-20 h-20 text-gray-800 mx-auto" />
                <div className="space-y-1">
                    <p className="text-xs text-gray-700 font-black uppercase tracking-[0.4em]">Visual Reconnaissance Point</p>
                    <p className="text-[10px] text-gray-800 font-mono">NORTHERN BORDER REGION</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function BudgetSlide() {
  const categories = [
    { name: "機票 / 簽證", price: "約 12,000", percentage: 40, color: "bg-blue-600" },
    { name: "住宿費用", price: "約 7,500", percentage: 25, color: "bg-indigo-600" },
    { name: "餐飲開支", price: "約 4,500", percentage: 15, color: "bg-teal-600" },
    { name: "交通費用", price: "約 3,000", percentage: 10, color: "bg-blue-800" },
    { name: "保險 / 緊急", price: "約 3,000", percentage: 10, color: "bg-slate-700" }
  ];

  return (
    <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-20 items-center">
      <div className="flex-1 space-y-16">
        <div className="space-y-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20">
            <span className="text-blue-500 font-mono font-black text-xs uppercase tracking-widest">Financial Deployment</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">旅費規劃 <br /><span className="text-gray-700 italic">NT$30,000</span></h2>
          <p className="text-2xl text-gray-500 font-medium leading-relaxed max-w-xl">預算 NT$30,000 怎麼分配？這是以商務與穩定移動為導向的配置方案。</p>
        </div>

        <div className="space-y-8">
          {categories.map((cat, i) => (
            <div key={i} className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="font-black text-2xl tracking-tight">{cat.name}</div>
                <div className="font-mono text-sm text-gray-500 font-bold">{cat.price} ({cat.percentage}%)</div>
              </div>
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.percentage}%` }}
                  transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className={`h-full ${cat.color}`} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[480px] aspect-square relative flex items-center justify-center p-12">
        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="relative z-10 w-full h-full">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="12" className="text-white/[0.04]" />
            <motion.circle 
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 - (283 * 0.85) }} 
              transition={{ duration: 2.5, ease: "circOut" }}
              cx="50" cy="50" r="45" fill="none" 
              stroke="url(#budgetGradient)" strokeWidth="12" 
              strokeDasharray="283" strokeLinecap="round" 
              className="drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            />
            <defs>
              <linearGradient id="budgetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-2">
            <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">Total Resource Cap</div>
            <div className="text-8xl font-black tracking-tighter italic leading-none">30K</div>
            <div className="text-xs font-black text-blue-600 tracking-widest uppercase">New Taiwan Dollar</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChecklistSlide() {
  const points = [
    { num: "1", title: "證件資金", value: "護照、泰國 e-Visa、一萬泰銖現鈔、實體美金一份。", icon: <CreditCard className="w-8 h-8" /> },
    { num: "2", title: "通訊地圖", value: "至少兩張不同電信商 SIM 卡、VPN 下載與連線測試。", icon: <Wifi className="w-8 h-8" /> },
    { num: "3", title: "物資具足", value: "必備裝備、雨傘、手套、乾糧與隨身藥品。", icon: <ShoppingBag className="w-8 h-8" /> },
    { num: "4", title: "緊急聯絡", value: "臺灣駐泰處代表聯絡方式、清萊行動指南數位本。", icon: <Phone className="w-8 h-8" /> }
  ];

  return (
    <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div className="space-y-12">
        <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20">
                <span className="text-blue-500 font-mono font-black text-xs uppercase tracking-widest">Pre-Crossing Protocol</span>
            </div>
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter italic uppercase leading-[0.9]">
            出發前<br /><span className="text-blue-600">最後確認</span>
          </h2>
          <div className="h-3 w-48 bg-blue-600 rounded-full" />
        </div>
        <p className="text-gray-500 text-2xl font-bold max-w-xl leading-relaxed">任務開始。物資齊全、心態沉穩，確保每一個細節都已就位。</p>
        
        <div className="pt-12">
            <button 
                onClick={() => window.location.reload()}
                className="group relative px-14 py-6 rounded-3xl bg-white text-black font-black text-base uppercase tracking-[0.3em] overflow-hidden transition-transform active:scale-95 shadow-2xl shadow-white/10"
            >
                <span className="relative z-10 flex items-center">REBOOT MISSION <StepForward className="ml-3 w-6 h-6" /></span>
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
        </div>
      </div>

      <div className="space-y-6">
        {points.map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group p-10 rounded-[3.5rem] bg-slate-900 border border-white/5 hover:border-blue-500/40 transition-all flex items-center gap-12"
          >
            <div className="w-20 h-20 shrink-0 rounded-3xl bg-blue-600/10 flex items-center justify-center font-black text-4xl text-blue-500 italic group-hover:bg-blue-600 group-hover:text-white transition-all">
              {p.num}
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] group-hover:text-blue-400/60 transition-colors">{p.title}</div>
              <div className="text-2xl font-black text-gray-200 leading-tight group-hover:text-white transition-colors">{p.value}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

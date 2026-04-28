import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Heart, MessageCircle, Share2, X, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 2 seconds, hide after 6 seconds
    const showTimer = setTimeout(() => setShowTooltip(true), 2000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 6000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      {/* Mobile Device Simulator */}
      <div className="relative w-full max-w-[400px] h-[800px] max-h-screen bg-black overflow-hidden shadow-2xl rounded-xl">
        
        {/* Feed Video Background Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-white/30 text-xl font-medium tracking-wider">
            [ 广告视频内容播放区 ]
          </div>
        </div>

        {/* Ad Info Overlay (Bottom Left) */}
        <div className="absolute bottom-20 left-4 text-white z-10 w-3/4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 border border-white/50" />
            <span className="font-bold text-base">XX少儿英语官方</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">广告</span>
          </div>
          <p className="text-sm mb-2 leading-relaxed">
            【春季特惠】原价299元的外教口语课，现在只要 9.9 元！培养孩子英语思维，不满意随时退！
          </p>
        </div>

        {/* Action Bar (Bottom Right) */}
        <div className="absolute bottom-24 right-2 flex flex-col items-center gap-6 text-white z-10">
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-white mb-2 overflow-hidden flex justify-center items-center">
              <span className="text-xs">头像</span>
            </div>
            <Heart className="w-8 h-8" />
            <span className="text-xs">1.2w</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <MessageCircle className="w-8 h-8" />
            <span className="text-xs">856</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Share2 className="w-8 h-8" />
            <span className="text-xs">分享</span>
          </div>
        </div>

        {/* Bottom Conversion Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#ff2a5f] flex items-center justify-between px-4 z-10 cursor-pointer">
          <div className="text-white font-medium">9.9元立即抢占名额</div>
          <ChevronRight className="text-white w-5 h-5" />
        </div>

        {/* The Floating Ball - 安心管家 */}
        <div className="absolute bottom-60 right-3 z-20 flex flex-col items-end">
          <AnimatePresence>
            {showTooltip && !isPanelOpen && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mb-2 mr-10 bg-white/95 backdrop-blur-sm text-gray-800 text-xs px-3 py-2 rounded-lg shadow-lg relative max-w-[180px]"
              >
                <span className="font-bold text-[#ff2a5f]">🛡️ 平台优选</span>
                <span className="block mt-0.5 text-gray-600">专享不满意包退特权</span>
                {/* Arrow */}
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-white/95"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            onClick={() => setIsPanelOpen(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-xl border-2 border-white/80 flex items-center justify-center relative active:scale-95 transition-transform"
          >
            <ShieldCheck className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
          </motion.button>
        </div>

        {/* Bottom Sheet Panel */}
        <AnimatePresence>
          {isPanelOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPanelOpen(false)}
                className="absolute inset-0 bg-black/60 z-30"
              />

              {/* Panel */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute bottom-0 left-0 right-0 bg-gray-50 h-[65%] z-40 rounded-t-2xl flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white rounded-t-2xl relative">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-300 rounded-full" />
                  <div className="flex items-center gap-2 mt-2">
                    <ShieldCheck className="w-5 h-5 text-amber-500" />
                    <span className="font-bold text-gray-800">安心管家</span>
                  </div>
                  <button onClick={() => setIsPanelOpen(false)} className="p-1 mt-2 bg-gray-100 rounded-full text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex bg-white px-4 border-b border-gray-100">
                  <button 
                    onClick={() => setActiveTab('current')}
                    className={`pb-2 mr-6 font-medium text-sm transition-colors relative ${activeTab === 'current' ? 'text-[#ff2a5f]' : 'text-gray-500'}`}
                  >
                    当前广告
                    {activeTab === 'current' && (
                      <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#ff2a5f] rounded-t" />
                    )}
                  </button>
                  <button 
                    onClick={() => setActiveTab('history')}
                    className={`pb-2 font-medium text-sm transition-colors relative flex items-center gap-1 ${activeTab === 'history' ? 'text-[#ff2a5f]' : 'text-gray-500'}`}
                  >
                    我的保障足迹
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    {activeTab === 'history' && (
                      <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#ff2a5f] rounded-t" />
                    )}
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  {activeTab === 'current' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {/* 荣誉背书 */}
                      <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl p-4 mb-4 border border-amber-200/50">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">🏆</span>
                          <span className="font-bold text-amber-800">本市教培行业 Top 5% 优选商家</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200">
                            <CheckCircle2 className="w-3 h-3" /> 退款爽快
                          </span>
                          <span className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200">
                            <CheckCircle2 className="w-3 h-3" /> 老师专业
                          </span>
                          <span className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200">
                            <CheckCircle2 className="w-3 h-3" /> 无隐形消费
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3 px-1">
                        <div className="w-1 h-4 bg-[#ff2a5f] rounded" />
                        <h3 className="font-bold text-gray-800 text-sm">查看更多 Top 5% 优选机构</h3>
                      </div>

                      {/* 优选推荐列表 */}
                      <div className="space-y-3">
                        {[
                          { name: 'YY英语', desc: '1对1定制 | 履约分 4.9', tags: ['好评榜一'], price: '9.9' },
                          { name: 'ZZ外教', desc: '纯正口语 | 履约分 4.8', tags: ['性价比之选'], price: '0' }
                        ].map((item, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-3 flex items-center justify-between shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-500 font-bold">
                                {item.name[0]}
                              </div>
                              <div>
                                <div className="flex items-center gap-1">
                                  <span className="font-bold text-sm text-gray-800">{item.name}</span>
                                  <span className="text-[10px] bg-amber-100 text-amber-700 px-1 rounded">{item.tags[0]}</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                              </div>
                            </div>
                            <button className="bg-[#ff2a5f]/10 text-[#ff2a5f] text-xs font-bold px-3 py-1.5 rounded-full">
                              预约
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="bg-blue-50 text-blue-800 text-xs px-3 py-2 rounded-lg mb-4 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>🔔 您近期有 1 笔咨询记录，若遇外部纠纷，可在此发起平台介入求助。</span>
                      </div>

                      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                        <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                          <span className="text-xs text-gray-500">2026-04-25 14:30</span>
                          <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">表单留资</span>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-md flex items-center justify-center text-purple-600 font-bold">
                              创
                            </div>
                            <div>
                              <div className="font-bold text-sm text-gray-800">XX少儿编程机构</div>
                              <div className="text-xs text-gray-500 mt-0.5">【免费体验】价值399元编程启蒙课</div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <button className="flex-1 bg-gray-50 text-gray-600 text-sm py-2 rounded-lg font-medium border border-gray-200">
                              查看凭证快照
                            </button>
                            <button className="flex-1 bg-red-50 text-red-600 text-sm py-2 rounded-lg font-medium border border-red-200 flex items-center justify-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              投诉 / 维权
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;

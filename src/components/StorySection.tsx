import React from 'react';
import { Compass, Flame, Leaf, Clock, MapPin, Phone } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="craft-philosophy" className="py-20 bg-stone-900/40 border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Roastery Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500">
              <Compass className="w-4 h-4" />
              <span>ROASTING ETHOS & SOIL</span>
            </div>

            <h2 className="font-serif-tc text-3xl sm:text-4xl font-bold text-stone-100 leading-snug">
              從赤道高地到青田街，
              <br />
              一場關於微氣候的純粹對話
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              「木暮」取自夕陽隱入山林、天光轉為溫潤琥珀色的片刻。我們認為一杯好的精品咖啡，不該被過度的烘焙焦苦所掩蓋，而是要讓飲者清晰品嚐到生豆在海拔兩千公尺火山土壤與晨霧中所凝鍊的花香與果酸。
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-stone-950 border border-stone-800 text-amber-400 shrink-0 mt-0.5">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-tc text-sm font-semibold text-stone-100">
                    透明永續的莊園直尋
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 leading-normal font-light">
                    直接與哥倫比亞、衣索比亞及台灣阿里山獨立莊園合作，確保農民獲得高於公平貿易的高品質溢價收購。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-stone-950 border border-stone-800 text-amber-400 shrink-0 mt-0.5">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-tc text-sm font-semibold text-stone-100">
                    德國 Probat 少量烘焙溫控
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 leading-normal font-light">
                    每批次僅烘焙 5 公斤，精確描繪升溫率（RoR）曲線，讓每支生豆展現出最具辨識度的地域風土風味。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Store Visit Information */}
          <div className="lg:col-span-6 bg-stone-950 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 block">
              VISIT OUR ESPRESSO BAR
            </span>

            <h3 className="font-serif-tc text-2xl font-bold text-stone-100">
              木暮珈琲 青田總店
            </h3>

            <div className="space-y-3.5 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[11px]">門市地址</span>
                  <span className="text-stone-100">台北市大安區青田街 12 巷 8 號 1 樓</span>
                  <span className="text-stone-500 block mt-0.5">
                    (捷運東門站 5 號出口步行約 7 分鐘 / 師大圖書館旁)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[11px]">營業時段</span>
                  <span className="text-stone-100">週一至週日 09:00 - 19:30</span>
                  <span className="text-stone-500 block mt-0.5">
                    手沖吧檯席位與外帶自取可先透過網頁預約
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[11px]">門市電話</span>
                  <span className="text-stone-100 font-mono">(02) 2391-8840</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800 text-xs text-stone-400 leading-relaxed">
              🌿 店內提供全區免費高鐵速無線網路與三孔電源插座，歡迎攜帶筆電專注創作或攜同伴共享手沖咖啡時光。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

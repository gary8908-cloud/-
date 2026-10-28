import React, { useState } from 'react';
import { X, Flame, Droplets, Clock, Thermometer, Sparkles, Check, Plus, Minus } from 'lucide-react';
import { CoffeeItem, CustomizationOption } from '../types';
import { useCart } from '../context/CartContext';
import { CoffeeCardIllustration } from './CoffeeCardIllustration';

interface CoffeeDetailModalProps {
  coffee: CoffeeItem | null;
  onClose: () => void;
}

export const CoffeeDetailModal: React.FC<CoffeeDetailModalProps> = ({ coffee, onClose }) => {
  const { addToCart } = useCart();
  const [temperature, setTemperature] = useState<'hot' | 'iced'>('hot');
  const [milkType, setMilkType] = useState<'regular' | 'oat' | 'none'>('regular');
  const [grindChoice, setGrindChoice] = useState<'whole' | 'filter' | 'espresso'>('filter');
  const [quantity, setQuantity] = useState(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  if (!coffee) return null;

  const isBean = coffee.category === 'beans';
  const isDrink = coffee.category === 'pourover' || coffee.category === 'espresso' || coffee.category === 'coldbrew';

  const handleAddToCart = () => {
    const customOptions: CustomizationOption = {
      temperature: isDrink ? temperature : undefined,
      milkType: coffee.category === 'espresso' ? milkType : undefined,
      grindChoice: isBean ? grindChoice : undefined,
    };

    addToCart(coffee, customOptions, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
      onClose();
    }, 600);
  };

  const calculatedUnitPrice =
    coffee.price + (coffee.category === 'espresso' && milkType === 'oat' ? 20 : 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden text-stone-200 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-stone-100 transition-colors"
          aria-label="關閉"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual & Origin Identity */}
          <div className="md:col-span-5 bg-stone-950 p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-stone-800">
            <div className="w-full text-center">
              {coffee.tag && (
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400">
                  {coffee.tag}
                </span>
              )}
              <h3 className="font-serif-tc text-xl font-bold text-stone-100 mt-1">
                {coffee.name}
              </h3>
              <p className="text-xs text-stone-400 font-mono mt-0.5">{coffee.nameEn}</p>
            </div>

            {/* Illustration */}
            <div className="w-full aspect-square max-w-[200px] my-6 rounded-xl overflow-hidden border border-stone-800/80">
              <CoffeeCardIllustration
                type={coffee.visualTheme.iconType}
                accentColor={coffee.visualTheme.accentColor}
              />
            </div>

            {/* Sensory Radar / Meters */}
            <div className="w-full space-y-2 bg-stone-900/60 p-3.5 rounded-xl border border-stone-800/80 text-xs">
              <div className="flex items-center justify-between text-stone-400">
                <span>果酸活潑度 (Acidity)</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <span
                      key={lvl}
                      className={`w-2 h-2 rounded-full ${
                        lvl <= coffee.acidity ? 'bg-amber-400' : 'bg-stone-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-stone-400">
                <span>厚實度 (Body)</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <span
                      key={lvl}
                      className={`w-2 h-2 rounded-full ${
                        lvl <= coffee.body ? 'bg-amber-500' : 'bg-stone-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-stone-400">
                <span>餘韻甜感 (Sweetness)</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <span
                      key={lvl}
                      className={`w-2 h-2 rounded-full ${
                        lvl <= coffee.sweetness ? 'bg-amber-300' : 'bg-stone-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Story, Brewing Guide & Customizer */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Origin metadata with clean unboxed text */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-400 border-b border-stone-800 pb-3">
                <span className="text-stone-300 font-medium">產區: {coffee.origin}</span>
                {coffee.altitude && (
                  <>
                    <span>·</span>
                    <span>海拔: {coffee.altitude}</span>
                  </>
                )}
                <span>·</span>
                <span>烘焙: {coffee.roastLevel}</span>
                <span>·</span>
                <span>處理法: {coffee.process}</span>
              </div>

              {/* Flavor Profile notes */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-500 block mb-2">
                  風味輪廓 Tasting Notes
                </span>
                <div className="flex flex-wrap gap-2">
                  {coffee.flavorNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-stone-800 text-stone-200 text-xs border border-stone-700"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-300 leading-relaxed font-light">
                {coffee.description}
              </p>

              {/* Brewing Recipe Guide (if single origin pour-over or beans) */}
              {coffee.brewingRecipe && (
                <div className="bg-stone-950/70 p-4 rounded-xl border border-stone-800/90 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>木暮咖啡師專屬萃取參數 (Brewing Guide)</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2 rounded bg-stone-900 border border-stone-800">
                      <span className="text-stone-500 block text-[10px]">粉水比</span>
                      <span className="font-mono text-stone-200 font-medium">
                        {coffee.brewingRecipe.ratio.split(' ')[0]}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-stone-900 border border-stone-800">
                      <span className="text-stone-500 block text-[10px] flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-amber-500" />
                        水溫
                      </span>
                      <span className="font-mono text-stone-200 font-medium">
                        {coffee.brewingRecipe.waterTemp.split(' ')[0]}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-stone-900 border border-stone-800">
                      <span className="text-stone-500 block text-[10px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" />
                        總時間
                      </span>
                      <span className="font-mono text-stone-200 font-medium">
                        {coffee.brewingRecipe.time}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-stone-900 border border-stone-800">
                      <span className="text-stone-500 block text-[10px]">研磨度</span>
                      <span className="text-stone-200 truncate block text-[11px]">
                        {coffee.brewingRecipe.grindSize.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-400 italic bg-stone-900/40 p-2.5 rounded border border-stone-800/50">
                    💡 {coffee.brewingRecipe.recommendation}
                  </p>
                </div>
              )}

              {/* Customization Options */}
              <div className="space-y-3 pt-2 border-t border-stone-800">
                {isDrink && (
                  <div className="space-y-1.5">
                    <span className="text-xs text-stone-400">溫度規格:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTemperature('hot')}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors border ${
                          temperature === 'hot'
                            ? 'bg-amber-900/40 border-amber-500 text-amber-300'
                            : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        熱飲 (Hot · 68°C)
                      </button>
                      <button
                        onClick={() => setTemperature('iced')}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors border ${
                          temperature === 'iced'
                            ? 'bg-amber-900/40 border-amber-500 text-amber-300'
                            : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        冰鎮 (Iced · 冷萃晶冰)
                      </button>
                    </div>
                  </div>
                )}

                {coffee.category === 'espresso' && (
                  <div className="space-y-1.5">
                    <span className="text-xs text-stone-400">乳品選擇:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setMilkType('regular')}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors border ${
                          milkType === 'regular'
                            ? 'bg-amber-900/40 border-amber-500 text-amber-300'
                            : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        鮮乳坊嚴選鮮乳
                      </button>
                      <button
                        onClick={() => setMilkType('oat')}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors border ${
                          milkType === 'oat'
                            ? 'bg-amber-900/40 border-amber-500 text-amber-300'
                            : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        Oatly 咖啡師燕麥奶 (+NT$20)
                      </button>
                    </div>
                  </div>
                )}

                {isBean && (
                  <div className="space-y-1.5">
                    <span className="text-xs text-stone-400">研磨服務:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setGrindChoice('whole')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors border ${
                          grindChoice === 'whole'
                            ? 'bg-amber-900/40 border-amber-500 text-amber-300'
                            : 'bg-stone-800 border-stone-700 text-stone-400'
                        }`}
                      >
                        原豆未研磨 (Whole Bean)
                      </button>
                      <button
                        onClick={() => setGrindChoice('filter')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors border ${
                          grindChoice === 'filter'
                            ? 'bg-amber-900/40 border-amber-500 text-amber-300'
                            : 'bg-stone-800 border-stone-700 text-stone-400'
                        }`}
                      >
                        手沖 / 濾泡濾掛研磨
                      </button>
                      <button
                        onClick={() => setGrindChoice('espresso')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors border ${
                          grindChoice === 'espresso'
                            ? 'bg-amber-900/40 border-amber-500 text-amber-300'
                            : 'bg-stone-800 border-stone-700 text-stone-400'
                        }`}
                      >
                        摩卡壺 / 義式極細
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Purchase Bar */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-700 rounded-lg bg-stone-800">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-stone-400 hover:text-stone-100"
                    aria-label="減少數量"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 font-mono text-sm tabular-nums text-stone-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-stone-400 hover:text-stone-100"
                    aria-label="增加數量"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <div className="text-xl font-mono font-bold text-amber-400 tabular-nums">
                    NT$ {calculatedUnitPrice * quantity}
                  </div>
                  <div className="text-[11px] text-stone-400">
                    可獲約{' '}
                    <span className="font-mono text-amber-500">
                      {Math.floor(((calculatedUnitPrice * quantity) / 10) * 1.2)}
                    </span>{' '}
                    點積分
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddedFeedback}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition-all shadow-md shadow-amber-950"
              >
                {isAddedFeedback ? (
                  <>
                    <Check className="w-4 h-4 text-stone-950" />
                    <span>已加入預訂清單</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>加入預約 / 外帶單</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

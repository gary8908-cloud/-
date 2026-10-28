import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Info, Plus } from 'lucide-react';
import { COFFEE_MENU } from '../data/coffeeData';
import { CoffeeCategory, CoffeeItem, RoastLevel } from '../types';
import { CoffeeCardIllustration } from './CoffeeCardIllustration';
import { useCart } from '../context/CartContext';

const CATEGORIES: { id: CoffeeCategory | 'all'; label: string }[] = [
  { id: 'all', label: '全部賞味' },
  { id: 'pourover', label: '手沖單品' },
  { id: 'espresso', label: '濃縮與拿鐵' },
  { id: 'coldbrew', label: '慢速冷萃' },
  { id: 'beans', label: '烘焙豆袋' },
  { id: 'dessert', label: '手作甜點' },
];

const ROAST_LEVELS: RoastLevel[] = ['淺焙', '中淺焙', '中焙', '中深焙'];

export const CoffeeExplorer: React.FC = () => {
  const { setSelectedCoffeeForDetail, addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<CoffeeCategory | 'all'>('all');
  const [selectedRoast, setSelectedRoast] = useState<RoastLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFlavor, setActiveFlavor] = useState<string | 'all'>('all');

  const allFlavorTags = useMemo(() => {
    const set = new Set<string>();
    COFFEE_MENU.forEach((item) => {
      item.flavorNotes.forEach((fn) => set.add(fn));
    });
    return Array.from(set).slice(0, 8);
  }, []);

  const filteredItems = useMemo(() => {
    return COFFEE_MENU.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;
      // Roast filter
      if (selectedRoast !== 'all' && item.roastLevel !== selectedRoast) return false;
      // Flavor filter
      if (activeFlavor !== 'all' && !item.flavorNotes.includes(activeFlavor)) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q) || item.nameEn.toLowerCase().includes(q);
        const matchOrigin = item.origin.toLowerCase().includes(q);
        const matchFlavor = item.flavorNotes.some((fn) => fn.toLowerCase().includes(q));
        if (!matchName && !matchOrigin && !matchFlavor) return false;
      }
      return true;
    });
  }, [activeCategory, selectedRoast, activeFlavor, searchQuery]);

  return (
    <section id="coffee-menu" className="py-20 bg-stone-950 border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800/80 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500">
              <span>EXPLORE SPECIALTY TASTING NOTES</span>
            </div>
            <h2 className="font-serif-tc text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-100">
              精品咖啡探索系統
            </h2>
            <p className="text-sm text-stone-400 max-w-xl font-light">
              完整記錄莊園產區、杯測風味輪、烘焙焙度與咖啡師沖煮參數。點選卡片即可查閱沖煮指南或加入預約訂單。
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋風味、產區或豆名..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-stone-900 border border-stone-800 focus:border-amber-500 focus:outline-none text-xs text-stone-200 placeholder-stone-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls: Category Buttons & Roast / Flavor Segmented controls */}
        <div className="space-y-4">
          {/* Main Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all border ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 border-amber-400 font-semibold shadow-sm'
                      : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Secondary Filters: Roast Level & Flavor Tags */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-xs text-stone-400">
            {/* Roast level */}
            <div className="flex items-center gap-2">
              <span className="text-stone-500 whitespace-nowrap">焙度:</span>
              <div className="flex items-center gap-1 p-1 bg-stone-900/90 rounded-lg border border-stone-800">
                <button
                  onClick={() => setSelectedRoast('all')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    selectedRoast === 'all'
                      ? 'bg-stone-800 text-amber-400'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  全部
                </button>
                {ROAST_LEVELS.map((rl) => (
                  <button
                    key={rl}
                    onClick={() => setSelectedRoast(rl)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      selectedRoast === rl
                        ? 'bg-stone-800 text-amber-400'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {rl}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular flavor filter tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-stone-500 whitespace-nowrap">風味快搜:</span>
              <button
                onClick={() => setActiveFlavor('all')}
                className={`px-2 py-0.5 rounded text-[11px] border transition-colors ${
                  activeFlavor === 'all'
                    ? 'border-amber-500 text-amber-400 bg-amber-950/30'
                    : 'border-stone-800 text-stone-500 hover:text-stone-300'
                }`}
              >
                不限
              </button>
              {allFlavorTags.map((flavor) => (
                <button
                  key={flavor}
                  onClick={() => setActiveFlavor(activeFlavor === flavor ? 'all' : flavor)}
                  className={`px-2 py-0.5 rounded text-[11px] border transition-colors ${
                    activeFlavor === flavor
                      ? 'border-amber-500 text-amber-400 bg-amber-950/30'
                      : 'border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid (3 columns on desktop per guidelines) */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-stone-900/40 rounded-2xl border border-stone-800/80">
            <SlidersHorizontal className="w-8 h-8 mx-auto text-stone-600 mb-2" />
            <p className="text-sm text-stone-400">查無符合條件的咖啡品項，請嘗試更換篩選條件</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedRoast('all');
                setActiveFlavor('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-amber-400 hover:underline"
            >
              清除所有篩選條件
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-stone-900/70 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-600/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
              >
                {/* Visual Area (approx 65% of header, with illustration) */}
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer"
                  onClick={() => setSelectedCoffeeForDetail(item)}
                >
                  <CoffeeCardIllustration
                    type={item.visualTheme.iconType}
                    accentColor={item.visualTheme.accentColor}
                  />

                  {/* Roast & Origin overlay tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-mono text-stone-300 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-stone-800">
                    <span>{item.roastLevel}</span>
                    <span>·</span>
                    <span className="truncate max-w-[120px]">{item.origin.split(' ')[0]}</span>
                  </div>

                  {item.tag && (
                    <div className="absolute top-3 right-3 text-[11px] font-medium text-amber-400 bg-amber-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-amber-800/80">
                      {item.tag}
                    </div>
                  )}
                </div>

                {/* Card Content & Metadata */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Quiet clean metadata line */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                      <span>{item.category.toUpperCase()}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.process}</span>
                    </div>

                    <h3
                      onClick={() => setSelectedCoffeeForDetail(item)}
                      className="font-serif-tc text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>

                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed font-light">
                      {item.description}
                    </p>

                    {/* Flavor notes: clean unboxed text with typographic separators */}
                    <div className="text-xs text-amber-400/90 font-light flex flex-wrap gap-x-1.5 gap-y-1 pt-1">
                      {item.flavorNotes.map((note, idx) => (
                        <React.Fragment key={idx}>
                          <span>{note}</span>
                          {idx < item.flavorNotes.length - 1 && (
                            <span className="text-stone-600" aria-hidden="true">
                              /
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action Module */}
                  <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-mono text-lg font-bold text-stone-100 tabular-nums">
                        NT$ {item.price}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        贈 <span className="font-mono text-amber-400">{item.pointsReward}</span> 積分
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCoffeeForDetail(item)}
                        className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 text-xs transition-colors"
                        title="查看萃取參數與履歷"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => addToCart(item)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>預約選購</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

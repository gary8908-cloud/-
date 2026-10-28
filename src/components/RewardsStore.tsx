import React, { useState } from 'react';
import { Award, Sparkles, Check, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
import { REWARDS_CATALOG, TIER_CONFIG } from '../data/coffeeData';
import { RewardItem, RedeemedVoucher } from '../types';
import { useMember } from '../context/MemberContext';
import { useCart } from '../context/CartContext';
import { CoffeeCardIllustration } from './CoffeeCardIllustration';

export const RewardsStore: React.FC = () => {
  const { member, isLoggedIn, tierInfo, redeemReward } = useMember();
  const { setIsMemberModalOpen, applyVoucher, setIsCartOpen } = useCart();

  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [redeemedResult, setRedeemedResult] = useState<{
    success: boolean;
    message: string;
    voucher?: RedeemedVoucher;
  } | null>(null);

  const handleRedeemClick = (reward: RewardItem) => {
    if (!isLoggedIn || !member) {
      setIsMemberModalOpen(true);
      return;
    }

    const result = redeemReward(reward);
    setRedeemedResult(result);
  };

  const currentPoints = member?.points || 0;

  return (
    <section id="rewards-catalog" className="py-20 bg-stone-950 border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Loyalty Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-stone-800/80 pb-12">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500">
              <Sparkles className="w-4 h-4" />
              <span>LOYALTY & PRIVILEGE REWARDS</span>
            </div>
            <h2 className="font-serif-tc text-3xl sm:text-4xl font-bold text-stone-100">
              會員積分賞 · 職人兌換所
            </h2>
            <p className="text-sm text-stone-400 font-light leading-relaxed">
              每一杯咖啡的品味時光，都在為下一次的味蕾驚喜鋪路。消費每 NT$10
              即可累積 1 點積分，隨時兌換手作甜點、經典濾掛禮盒、折抵票券與限量手作咖啡器具。
            </p>
          </div>

          {/* Member Points Status Banner */}
          <div className="lg:col-span-5 bg-stone-900 border border-stone-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <span className="text-xs text-stone-500 block">目前登入會員</span>
                <span className="font-serif-tc font-bold text-stone-100 text-base">
                  {member ? member.name : '訪客 (尚未登入)'}
                </span>
              </div>
              <div
                className="px-2.5 py-1 rounded text-xs font-mono font-medium border"
                style={{
                  color: tierInfo.color,
                  borderColor: `${tierInfo.color}40`,
                  backgroundColor: `${tierInfo.color}15`,
                }}
              >
                {tierInfo.nameZh}
              </div>
            </div>

            <div className="py-4 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-stone-400 block mb-1">可用點數餘額</span>
                <div className="font-mono text-3xl font-bold text-amber-400 tabular-nums">
                  {currentPoints}{' '}
                  <span className="text-xs text-stone-500 font-normal">pts</span>
                </div>
              </div>
              <button
                onClick={() => setIsMemberModalOpen(true)}
                className="text-xs text-stone-300 hover:text-amber-400 underline decoration-stone-600 underline-offset-4 transition-colors"
              >
                查看點數明細與票夾 →
              </button>
            </div>

            {/* Points multiplier note */}
            <div className="text-[11px] text-stone-400 bg-stone-950/60 p-2.5 rounded-lg border border-stone-800/60 flex items-center justify-between">
              <span>當前等級加成：消費享 {((tierInfo.discountRate || 0) * 100).toFixed(0)}% 優惠</span>
              <span className="text-amber-500 font-medium">
                {member?.tier === 'AMBER_VIP' ? '2.0x 點數' : member?.tier === 'GOLD' ? '1.5x 點數' : member?.tier === 'SILVER' ? '1.2x 點數' : '1.0x 點數'}
              </span>
            </div>
          </div>
        </div>

        {/* Rewards Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {REWARDS_CATALOG.map((reward) => {
            const canAfford = currentPoints >= reward.pointsCost;
            const progressPct = Math.min(100, Math.round((currentPoints / reward.pointsCost) * 100));

            return (
              <div
                key={reward.id}
                className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-600/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  {/* Category icon & Value header */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-mono uppercase tracking-wider text-stone-500">
                      {reward.category.toUpperCase()}
                    </span>
                    <span className="text-amber-400 font-mono">
                      等值約 NT$ {reward.equivalentValue}
                    </span>
                  </div>

                  <h3 className="font-serif-tc text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors mb-2">
                    {reward.title}
                  </h3>

                  <p className="text-xs text-stone-400 leading-relaxed font-light mb-4">
                    {reward.description}
                  </p>

                  <div className="text-[11px] text-stone-500 italic border-l-2 border-stone-800 pl-2.5 mb-6">
                    {reward.terms}
                  </div>
                </div>

                {/* Bottom Action & Cost */}
                <div className="pt-4 border-t border-stone-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-500 block uppercase font-mono">
                        POINTS REQUIRED
                      </span>
                      <div className="font-mono text-xl font-bold text-amber-400 tabular-nums">
                        {reward.pointsCost}{' '}
                        <span className="text-xs text-stone-400 font-normal">pts</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRedeemClick(reward)}
                      className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md shadow-amber-950'
                          : 'bg-stone-800 hover:bg-stone-700 text-stone-400'
                      }`}
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>{canAfford ? '立即兌換' : `尚缺 ${reward.pointsCost - currentPoints} 點`}</span>
                    </button>
                  </div>

                  {/* Progress bar towards this reward */}
                  {!canAfford && (
                    <div className="space-y-1">
                      <div className="w-full bg-stone-800 h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                        <span>進度 {progressPct}%</span>
                        <span>{currentPoints} / {reward.pointsCost} 點</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Member Tier Privileges Matrix */}
        <div className="bg-stone-900/40 rounded-2xl border border-stone-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-500 block">
                MEMBERSHIP PRIVILEGE MATRIX
              </span>
              <h3 className="font-serif-tc text-xl font-bold text-stone-100">
                木暮會籍權益說明
              </h3>
            </div>
            <p className="text-xs text-stone-400 max-w-md">
              點數永久有效，會籍依累積點數自動升等，終身享有專屬尊榮禮遇。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(TIER_CONFIG).map(([key, t]) => {
              const isCurrent = member?.tier === key;
              return (
                <div
                  key={key}
                  className={`p-5 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-stone-900 border-amber-500/80 shadow-lg shadow-black/40'
                      : 'bg-stone-950/70 border-stone-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-bold font-serif-tc"
                      style={{ color: t.color }}
                    >
                      {t.nameZh}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono">
                        目前等級
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-stone-400 mb-3 font-mono">
                    {t.minPoints === 0 ? '註冊即享有' : `累積滿 ${t.minPoints} 點`}
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-300">
                    {t.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-500 text-xs">·</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Redemption Result Feedback Modal */}
      {redeemedResult && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-md w-full p-6 text-stone-200 shadow-2xl space-y-4">
            <div className="text-center space-y-2">
              <div
                className={`inline-flex p-3 rounded-full ${
                  redeemedResult.success
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {redeemedResult.success ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Award className="w-6 h-6" />
                )}
              </div>
              <h4 className="font-serif-tc text-xl font-bold text-stone-100">
                {redeemedResult.success ? '兌換成功！' : '兌換未完成'}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                {redeemedResult.message}
              </p>
            </div>

            {redeemedResult.voucher && (
              <div className="p-4 bg-stone-950 rounded-xl border border-amber-600/30 text-xs space-y-2 font-mono">
                <div className="flex justify-between text-stone-400">
                  <span>電子票券代碼</span>
                  <span className="text-amber-400 font-bold">
                    {redeemedResult.voucher.code}
                  </span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>有效期限至</span>
                  <span className="text-stone-300">{redeemedResult.voucher.expireAt}</span>
                </div>
                <div className="pt-2 text-center text-[11px] text-stone-500">
                  可於線上預約結帳時選擇使用，或到店出示條碼
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setRedeemedResult(null)}
                className="flex-1 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium"
              >
                關閉
              </button>
              {redeemedResult.voucher && (
                <button
                  onClick={() => {
                    applyVoucher(redeemedResult.voucher!);
                    setRedeemedResult(null);
                    setIsCartOpen(true);
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold"
                >
                  立即在購物車折抵
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

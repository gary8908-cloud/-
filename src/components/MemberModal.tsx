import React, { useState } from 'react';
import { X, User, LogOut, Ticket, History, Award, Check, Sparkles, Smartphone, QrCode } from 'lucide-react';
import { useMember } from '../context/MemberContext';
import { useCart } from '../context/CartContext';

export const MemberModal: React.FC = () => {
  const {
    member,
    isLoggedIn,
    tierInfo,
    login,
    register,
    logout,
    useVoucher,
    setDemoAccount,
  } = useMember();
  const { isMemberModalOpen, setIsMemberModalOpen, applyVoucher, setIsCartOpen } = useCart();

  // Mode: 'profile' (if logged in), or 'login' / 'register'
  const [activeTab, setActiveTab] = useState<'card' | 'vouchers' | 'orders' | 'points'>('card');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isMemberModalOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setFeedback('請填寫姓名與電子郵件');
      return;
    }
    const success = register(name, email, phone);
    if (success) {
      setFeedback('🎉 註冊成功！已贈送 200 點迎新積分與 NT$50 折價券！');
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setFeedback('請輸入電子信箱');
      return;
    }
    const success = login(loginEmail);
    if (success) {
      setFeedback('登入成功！');
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden text-stone-200 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/50">
          <div className="flex items-center gap-2">
            <span className="font-serif-tc text-lg font-bold text-stone-100">
              木暮珈琲 會員俱樂部
            </span>
            <span className="text-xs font-mono text-stone-500">MEMBER PASS</span>
          </div>
          <button
            onClick={() => setIsMemberModalOpen(false)}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {feedback && (
          <div className="px-6 py-2.5 bg-amber-500/10 border-b border-amber-500/30 text-amber-400 text-xs text-center font-medium">
            {feedback}
          </div>
        )}

        {/* Content Body */}
        {isLoggedIn && member ? (
          <div className="p-6 space-y-6">
            {/* Quick Demo Switcher Bar */}
            <div className="flex items-center justify-between p-2.5 bg-stone-950 rounded-xl border border-stone-800/80 text-xs">
              <span className="text-stone-400 text-[11px]">快速體驗不同會籍帳號：</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setDemoAccount('newbie')}
                  className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px]"
                >
                  初訪新會員
                </button>
                <button
                  onClick={() => setDemoAccount('regular')}
                  className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px]"
                >
                  銀卡熟客
                </button>
                <button
                  onClick={() => setDemoAccount('vip')}
                  className="px-2.5 py-1 rounded bg-amber-950 border border-amber-700/60 text-amber-400 text-[11px]"
                >
                  黑卡 VIP
                </button>
              </div>
            </div>

            {/* Digital Membership Pass Card */}
            <div
              className={`p-6 rounded-2xl border text-stone-100 shadow-xl relative overflow-hidden bg-gradient-to-br ${tierInfo.bg}`}
              style={{ borderColor: `${tierInfo.color}50` }}
            >
              {/* Card Watermark */}
              <div className="absolute right-4 bottom-2 text-6xl font-serif-tc opacity-10 font-bold select-none pointer-events-none">
                木暮
              </div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-xs uppercase font-mono tracking-widest opacity-70">
                    MUGURE SPECIALTY CLUB
                  </div>
                  <div className="text-xl font-bold font-serif-tc mt-0.5">{member.name}</div>
                  <div className="text-xs opacity-75">{member.phone}</div>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold border"
                  style={{
                    backgroundColor: `${tierInfo.color}25`,
                    borderColor: tierInfo.color,
                    color: tierInfo.color,
                  }}
                >
                  {tierInfo.nameZh}
                </div>
              </div>

              <div className="flex items-end justify-between pt-4 border-t border-white/10">
                <div>
                  <span className="text-[11px] opacity-70 block uppercase font-mono">
                    POINTS BALANCE
                  </span>
                  <div className="font-mono text-3xl font-bold tabular-nums text-amber-300">
                    {member.points}{' '}
                    <span className="text-xs font-normal opacity-80">pts</span>
                  </div>
                </div>

                {/* Simulated Barcode */}
                <div className="text-right">
                  <div className="flex items-center gap-0.5 h-7 justify-end opacity-85">
                    {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2, 4, 1, 2, 1, 3].map((w, i) => (
                      <span
                        key={i}
                        className="bg-stone-200 h-full inline-block"
                        style={{ width: `${w * 1.5}px` }}
                      />
                    ))}
                  </div>
                  <div className="text-[10px] font-mono tracking-widest opacity-70 mt-1">
                    {member.barcode}
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex border-b border-stone-800 text-xs font-medium">
              <button
                onClick={() => setActiveTab('card')}
                className={`pb-3 px-4 transition-colors relative ${
                  activeTab === 'card'
                    ? 'text-amber-400 font-semibold border-b-2 border-amber-500'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                會籍權益
              </button>
              <button
                onClick={() => setActiveTab('vouchers')}
                className={`pb-3 px-4 transition-colors relative flex items-center gap-1.5 ${
                  activeTab === 'vouchers'
                    ? 'text-amber-400 font-semibold border-b-2 border-amber-500'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <span>我的票券</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-800 text-amber-400 font-mono">
                  {member.vouchers.filter((v) => v.status === 'valid').length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`pb-3 px-4 transition-colors relative ${
                  activeTab === 'orders'
                    ? 'text-amber-400 font-semibold border-b-2 border-amber-500'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                預約訂單紀錄 ({member.orders.length})
              </button>
              <button
                onClick={() => setActiveTab('points')}
                className={`pb-3 px-4 transition-colors relative ${
                  activeTab === 'points'
                    ? 'text-amber-400 font-semibold border-b-2 border-amber-500'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                點數異動明細
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'card' && (
              <div className="space-y-4 text-xs">
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
                  <span className="font-mono text-amber-500 uppercase tracking-wider block font-semibold">
                    您當前享有的專屬權益
                  </span>
                  <ul className="space-y-1.5 text-stone-300">
                    {tierInfo.benefits.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-stone-400 text-[11px] leading-relaxed">
                  加入日期：{member.joinedDate} · 會員信箱：{member.email}
                </div>
              </div>
            )}

            {activeTab === 'vouchers' && (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {member.vouchers.length === 0 ? (
                  <div className="py-8 text-center text-xs text-stone-500 bg-stone-950 rounded-xl">
                    目前沒有可用的電子票券，可至「積分兌換」將累積點數換為折價券或甜點券！
                  </div>
                ) : (
                  member.vouchers.map((vch) => (
                    <div
                      key={vch.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                        vch.status === 'valid'
                          ? 'bg-stone-950 border-amber-600/40 text-stone-200'
                          : 'bg-stone-950/40 border-stone-800 text-stone-500 opacity-60'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-medium text-stone-100">{vch.title}</div>
                        <div className="font-mono text-[11px] text-amber-400">
                          代碼: {vch.code}
                        </div>
                        <div className="text-[10px] text-stone-500">
                          期限: {vch.expireAt} · {vch.status === 'valid' ? '未使用' : '已兌畢'}
                        </div>
                      </div>

                      {vch.status === 'valid' ? (
                        <button
                          onClick={() => {
                            applyVoucher(vch);
                            setIsMemberModalOpen(false);
                            setIsCartOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition-colors"
                        >
                          使用折抵
                        </button>
                      ) : (
                        <span className="text-[11px] text-stone-500">已使用</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {member.orders.length === 0 ? (
                  <div className="py-8 text-center text-xs text-stone-500 bg-stone-950 rounded-xl">
                    尚無線上預訂或外帶訂單紀錄
                  </div>
                ) : (
                  member.orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 text-xs space-y-2"
                    >
                      <div className="flex justify-between items-center text-stone-400 font-mono">
                        <span className="text-amber-400 font-bold">{ord.orderNo}</span>
                        <span>{ord.createdAt}</span>
                      </div>
                      <div className="text-stone-300 font-medium">
                        {ord.pickupTimeOrSeat}
                      </div>
                      <div className="text-stone-400 text-[11px]">
                        餐點：
                        {ord.items.map((i) => `${i.name} x${i.quantity}`).join('、')}
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-stone-800/80">
                        <span className="text-amber-500 text-[11px]">
                          +獲贈 {ord.pointsEarned} 點
                        </span>
                        <span className="font-mono text-stone-100 font-semibold">
                          總額 NT$ {ord.totalAmount}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'points' && (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {member.pointsHistory.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-stone-950 rounded-xl border border-stone-800/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="text-stone-200">{log.title}</div>
                      <div className="text-[10px] text-stone-500 font-mono">{log.date}</div>
                    </div>
                    <div className="text-right font-mono">
                      <div
                        className={`font-bold tabular-nums ${
                          log.points > 0 ? 'text-amber-400' : 'text-stone-400'
                        }`}
                      >
                        {log.points > 0 ? `+${log.points}` : log.points} pts
                      </div>
                      <div className="text-[10px] text-stone-500">結餘 {log.balanceAfter}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Logout button */}
            <div className="pt-2 border-t border-stone-800 flex justify-end">
              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-300 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>登出會員帳戶</span>
              </button>
            </div>
          </div>
        ) : (
          /* Authentication Form: Register or Login */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex justify-center border-b border-stone-800 pb-4">
              <div className="flex p-1 bg-stone-950 rounded-xl border border-stone-800">
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`px-5 py-2 rounded-lg text-xs font-medium transition-colors ${
                    authMode === 'register'
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  新會員註冊 (贈200點)
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`px-5 py-2 rounded-lg text-xs font-medium transition-colors ${
                    authMode === 'login'
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  會員登入
                </button>
              </div>
            </div>

            {authMode === 'register' ? (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-xs text-stone-400 block mb-1">姓名 / 暱稱</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="例：林晨曦"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-stone-400 block mb-1">電子信箱 Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="coffee@example.com"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-stone-400 block mb-1">行動電話 (用以接收自取簡訊)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09xx-xxx-xxx"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 text-[11px] text-stone-400 space-y-1">
                  <div className="text-amber-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>入會限定迎新禮遇：</span>
                  </div>
                  <div>· 即刻獲得 200 點迎新積分（可直接兌換飲品折抵券）</div>
                  <div>· 贈送 NT$50 全品項咖啡電子抵用券乙張</div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors shadow-lg shadow-amber-950"
                >
                  確認註冊並領取迎新禮
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs text-stone-400 block mb-1">已註冊的電子信箱 Email</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="chenxi.lin@example.com"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors"
                >
                  登入會員帳戶
                </button>
              </form>
            )}

            {/* Quick 1-click test button */}
            <div className="pt-4 border-t border-stone-800 text-center">
              <span className="text-[11px] text-stone-500 block mb-2">免填寫，直接一鍵體驗：</span>
              <button
                type="button"
                onClick={() => setDemoAccount('regular')}
                className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-medium transition-colors"
              >
                以「銀卡會員 林晨曦 (520點)」快速登入體驗
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

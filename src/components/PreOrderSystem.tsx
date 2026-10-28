import React, { useState } from 'react';
import { Calendar, Clock, Users, Coffee, CheckCircle, Sparkles, MapPin, Ticket } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMember } from '../context/MemberContext';
import { COFFEE_MENU } from '../data/coffeeData';

export const PreOrderSystem: React.FC = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    tierDiscountAmount,
    finalTotal,
    pointsToEarn,
    appliedVoucher,
    applyVoucher,
    clearCart,
    addToCart,
    setIsCartOpen,
  } = useCart();
  const { member, tierInfo, recordOrder, useVoucher } = useMember();

  // Booking Form State
  const [orderType, setOrderType] = useState<'pickup' | 'dinein'>('pickup');
  const [pickupTime, setPickupTime] = useState('15分鐘後 (即刻新鮮製作)');
  const [dineDate, setDineDate] = useState('2026-10-28 (明日)');
  const [dineTime, setDineTime] = useState('14:30 - 16:00');
  const [guestCount, setGuestCount] = useState(2);
  const [seatArea, setSeatArea] = useState<'bar' | 'window' | 'sofa'>('bar');
  const [contactName, setContactName] = useState(member?.name || '林晨曦');
  const [contactPhone, setContactPhone] = useState(member?.phone || '0988-123-456');
  const [specialNote, setSpecialNote] = useState('');

  // Post-submission state
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const availableVouchers = member?.vouchers.filter((v) => v.status === 'valid') || [];

  const handleQuickAddRecommended = () => {
    // Add top 2 coffees if cart empty
    addToCart(COFFEE_MENU[0], { temperature: 'hot' }, 1);
    addToCart(COFFEE_MENU[4], { temperature: 'hot', milkType: 'oat' }, 1);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('請先挑選您喜愛的咖啡或甜點品項！');
      return;
    }

    if (!contactName.trim() || !contactPhone.trim()) {
      alert('請填寫聯絡人姓名與電話');
      return;
    }

    const orderRecord = recordOrder({
      type: orderType,
      items: cart.map((c) => ({
        name: c.coffee.name,
        quantity: c.quantity,
        subtotal: c.subtotal,
        customizationStr: [
          c.customization.temperature === 'iced' ? '冰飲' : '熱飲',
          c.customization.milkType === 'oat' ? '燕麥奶' : null,
          c.customization.grindChoice ? `研磨: ${c.customization.grindChoice}` : null,
        ]
          .filter(Boolean)
          .join(' · '),
      })),
      totalAmount: finalTotal,
      pointsEarned: pointsToEarn,
      pickupTimeOrSeat:
        orderType === 'pickup'
          ? `外帶自取 · ${pickupTime}`
          : `內用預約 · ${dineDate} ${dineTime} (${guestCount}人 / ${
              seatArea === 'bar' ? '吧檯景觀席' : seatArea === 'window' ? '窗邊自然光' : '靜謐沙發席'
            })`,
      contactName,
      contactPhone,
      status: 'preparing',
    });

    if (appliedVoucher) {
      useVoucher(appliedVoucher.id);
      applyVoucher(null);
    }

    clearCart();
    setCompletedOrder(orderRecord);
  };

  return (
    <section id="pre-order" className="py-20 bg-stone-900/60 border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500">
            <span>ONLINE RESERVATION & PICKUP</span>
          </div>
          <h2 className="font-serif-tc text-3xl sm:text-4xl font-bold text-stone-100">
            線上預訂與自取服務
          </h2>
          <p className="text-sm text-stone-400 font-light">
            為您在繁忙步調中預留一杯手沖的沉靜時間。支援外帶免排隊自取與內用吧檯預約，消費即享積分回饋。
          </p>
        </div>

        {completedOrder ? (
          /* Confirmation Success Ticket */
          <div className="max-w-2xl mx-auto bg-stone-950 border border-amber-600/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center space-y-2 pb-6 border-b border-stone-800">
              <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-400 mb-2">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif-tc text-2xl font-bold text-stone-100">
                預約訂單已成功送出！
              </h3>
              <p className="text-xs text-stone-400">
                訂單編號：
                <span className="font-mono text-amber-400 font-bold ml-1">
                  {completedOrder.orderNo}
                </span>
                （已存入您的會員紀錄）
              </p>
            </div>

            <div className="py-6 space-y-4 text-xs text-stone-300">
              <div className="grid grid-cols-2 gap-4 bg-stone-900/80 p-4 rounded-xl border border-stone-800">
                <div>
                  <span className="text-stone-500 block">服務類型 / 席位時段</span>
                  <span className="text-stone-100 font-medium block mt-0.5">
                    {completedOrder.pickupTimeOrSeat}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block">預約聯絡人</span>
                  <span className="text-stone-100 font-medium block mt-0.5">
                    {completedOrder.contactName} ({completedOrder.contactPhone})
                  </span>
                </div>
              </div>

              {/* Items recap */}
              <div className="space-y-2 border-b border-stone-800 pb-4">
                <span className="text-stone-500 font-mono uppercase tracking-wider block">
                  預約餐點清單 ({completedOrder.items.length} 項)
                </span>
                {completedOrder.items.map((it: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div>
                      <span className="text-stone-200">{it.name}</span>
                      <span className="text-stone-500 ml-2">x{it.quantity}</span>
                      {it.customizationStr && (
                        <div className="text-[11px] text-stone-500">{it.customizationStr}</div>
                      )}
                    </div>
                    <span className="font-mono tabular-nums text-stone-300">NT$ {it.subtotal}</span>
                  </div>
                ))}
              </div>

              {/* Total & Points earned */}
              <div className="flex justify-between items-center text-sm pt-2">
                <div className="text-amber-400 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>本次獲得積分：+{completedOrder.pointsEarned} 點</span>
                </div>
                <div className="text-right">
                  <span className="text-stone-500 text-xs block">應付總額</span>
                  <span className="font-mono text-xl font-bold text-stone-100 tabular-nums">
                    NT$ {completedOrder.totalAmount}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-stone-900 rounded-lg text-center text-stone-400 text-xs">
                ☕ 門市地址：台北市大安區青田街 12 巷 8 號 · 現場憑訂單號取件付款或入座
              </div>
            </div>

            <div className="pt-4 text-center">
              <button
                onClick={() => setCompletedOrder(null)}
                className="px-6 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
              >
                再建立一筆預訂
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Reservation & Order Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Mode Select & Reservation Schedule */}
            <div className="lg:col-span-7 bg-stone-950 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
              {/* Step 1: Mode Switch Buttons */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-500 block mb-2">
                  01. 選擇預約型態
                </span>
                <div className="grid grid-cols-2 gap-3 p-1 bg-stone-900 rounded-xl border border-stone-800">
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-3 px-4 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                      orderType === 'pickup'
                        ? 'bg-amber-500 text-stone-950 font-semibold shadow-md'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Coffee className="w-4 h-4" />
                    <span>外帶自取 (免排隊)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('dinein')}
                    className={`py-3 px-4 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                      orderType === 'dinein'
                        ? 'bg-amber-500 text-stone-950 font-semibold shadow-md'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>內用座位預約</span>
                  </button>
                </div>
              </div>

              {/* Mode Specific Configurations */}
              {orderType === 'pickup' ? (
                <div className="space-y-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-500 block">
                    02. 預計到店自取時段
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      '15分鐘後',
                      '30分鐘後',
                      '45分鐘後',
                      '今日 14:00',
                      '今日 15:30',
                      '今日 17:00',
                      '今日 18:30',
                      '指定備註時段',
                    ].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setPickupTime(time)}
                        className={`p-2.5 rounded-lg text-xs border text-center transition-colors ${
                          pickupTime === time
                            ? 'bg-amber-950/40 border-amber-500 text-amber-300 font-medium'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-stone-500">
                    💡 自取備註：咖啡師將在您預計到達前 5 分鐘現磨現沖，保持最豐沛香氣。
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-500 block">
                    02. 內用席位與時間挑選
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Date */}
                    <div>
                      <label className="text-[11px] text-stone-400 block mb-1">預約日期</label>
                      <select
                        value={dineDate}
                        onChange={(e) => setDineDate(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                      >
                        <option value="2026-10-28 (明日)">2026-10-28 (明日)</option>
                        <option value="2026-10-29 (後天)">2026-10-29 (後天)</option>
                        <option value="2026-10-30 (五)">2026-10-30 (五)</option>
                        <option value="2026-10-31 (週末席)">2026-10-31 (週末席)</option>
                      </select>
                    </div>

                    {/* Time Slot */}
                    <div>
                      <label className="text-[11px] text-stone-400 block mb-1">場次時段 (90分)</label>
                      <select
                        value={dineTime}
                        onChange={(e) => setDineTime(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                      >
                        <option value="11:30 - 13:00">11:30 - 13:00</option>
                        <option value="13:00 - 14:30">13:00 - 14:30</option>
                        <option value="14:30 - 16:00">14:30 - 16:00 (熱門)</option>
                        <option value="16:00 - 17:30">16:00 - 17:30</option>
                        <option value="17:30 - 19:00">17:30 - 19:00</option>
                      </select>
                    </div>

                    {/* Guest Count */}
                    <div>
                      <label className="text-[11px] text-stone-400 block mb-1">預約人數</label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                      >
                        <option value="1">1 位 (獨享手沖)</option>
                        <option value="2">2 位 (雙人品飲)</option>
                        <option value="3">3 位</option>
                        <option value="4">4 位 (方桌)</option>
                        <option value="6">5-6 位 (大長桌)</option>
                      </select>
                    </div>
                  </div>

                  {/* Seat Area Preference */}
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1.5">席位偏好</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSeatArea('bar')}
                        className={`p-2.5 rounded-lg text-xs border text-center transition-colors ${
                          seatArea === 'bar'
                            ? 'bg-amber-950/40 border-amber-500 text-amber-300 font-medium'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        吧檯手沖景觀席
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeatArea('window')}
                        className={`p-2.5 rounded-lg text-xs border text-center transition-colors ${
                          seatArea === 'window'
                            ? 'bg-amber-950/40 border-amber-500 text-amber-300 font-medium'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        綠意窗邊雙人席
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeatArea('sofa')}
                        className={`p-2.5 rounded-lg text-xs border text-center transition-colors ${
                          seatArea === 'sofa'
                            ? 'bg-amber-950/40 border-amber-500 text-amber-300 font-medium'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        靜謐閱覽沙發區
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Contact details */}
              <div className="space-y-3 pt-2 border-t border-stone-800">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-500 block">
                  03. 訂位聯絡資訊
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">姓名</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="請輸入訂位人姓名"
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">行動電話</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="09xx-xxx-xxx"
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-stone-400 block mb-1">特殊需求備註 (選填)</label>
                  <input
                    type="text"
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    placeholder="如：自備環保保溫杯、需要安靜插座座位、附嬰兒椅..."
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Pre-ordered Items & Settlement Summary */}
            <div className="lg:col-span-5 bg-stone-950 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="font-serif-tc text-lg font-bold text-stone-100">
                  預約餐點清單 ({cart.length})
                </h3>
                {cart.length > 0 && (
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    編輯購物車
                  </button>
                )}
              </div>

              {/* Cart List */}
              {cart.length === 0 ? (
                <div className="py-8 text-center bg-stone-900/40 rounded-xl border border-stone-800/80 space-y-3">
                  <Coffee className="w-8 h-8 mx-auto text-stone-600" />
                  <p className="text-xs text-stone-400">目前預約清單尚無飲品或甜點</p>
                  <button
                    onClick={handleQuickAddRecommended}
                    className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-medium transition-colors"
                  >
                    快速加入店長推薦組合 (藝伎手沖 + 燕麥馥芮白)
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-stone-900/80 rounded-xl border border-stone-800/80 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-medium text-stone-200">{item.coffee.name}</div>
                        <div className="text-[11px] text-stone-500">
                          {item.customization.temperature === 'iced' ? '冰飲' : '熱飲'}
                          {item.customization.milkType === 'oat' && ' · 燕麥奶'}
                          {' · '}數量: {item.quantity}
                        </div>
                      </div>
                      <div className="font-mono tabular-nums text-stone-200 font-semibold">
                        NT$ {item.subtotal}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Loyalty Voucher Selector */}
              {availableVouchers.length > 0 && (
                <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400 flex items-center gap-1.5">
                      <Ticket className="w-3.5 h-3.5 text-amber-500" />
                      使用會員兌換券折抵:
                    </span>
                    {appliedVoucher ? (
                      <button
                        onClick={() => applyVoucher(null)}
                        className="text-[11px] text-red-400 hover:underline"
                      >
                        取消使用
                      </button>
                    ) : null}
                  </div>

                  <select
                    value={appliedVoucher?.id || ''}
                    onChange={(e) => {
                      const v = availableVouchers.find((v) => v.id === e.target.value);
                      applyVoucher(v || null);
                    }}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="">不使用折價券</option>
                    {availableVouchers.map((vch) => (
                      <option key={vch.id} value={vch.id}>
                        {vch.title} (代碼: {vch.code})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Price Calculation breakdown */}
              <div className="space-y-2 text-xs border-t border-stone-800 pt-4">
                <div className="flex justify-between text-stone-400">
                  <span>商品小計 (Subtotal)</span>
                  <span className="font-mono tabular-nums text-stone-200">NT$ {subtotal}</span>
                </div>

                {member && tierInfo.discountRate > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>
                      會員專屬折扣 ({tierInfo.nameZh} {(tierInfo.discountRate * 100).toFixed(0)}% OFF)
                    </span>
                    <span className="font-mono tabular-nums">-NT$ {tierDiscountAmount}</span>
                  </div>
                )}

                {appliedVoucher && appliedVoucher.discountValue && (
                  <div className="flex justify-between text-emerald-400">
                    <span>票券折抵 ({appliedVoucher.title})</span>
                    <span className="font-mono tabular-nums">
                      -NT$ {appliedVoucher.discountValue}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-stone-100 text-sm font-semibold pt-2 border-t border-stone-800">
                  <span>預估結帳金額</span>
                  <span className="font-mono text-xl text-amber-400 tabular-nums font-bold">
                    NT$ {finalTotal}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-stone-400 pt-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    完成預訂將為您累計約{' '}
                    <span className="font-mono font-bold text-amber-400">{pointsToEarn}</span> 點會員積分
                  </span>
                </div>
              </div>

              {/* Submit Action */}
              <button
                type="button"
                onClick={handleSubmitOrder}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all shadow-lg shadow-amber-950 flex items-center justify-center gap-2"
              >
                <span>
                  {orderType === 'pickup' ? '確認送出外帶自取預訂' : '確認送出內用席位預訂'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMember } from '../context/MemberContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    tierDiscountAmount,
    appliedVoucher,
    discountAmount,
    finalTotal,
    pointsToEarn,
  } = useCart();
  const { member, tierInfo } = useMember();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-stone-900 border-l border-stone-800 text-stone-200 shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h3 className="font-serif-tc text-lg font-bold text-stone-100">
                預訂選單 ({cart.reduce((sum, it) => sum + it.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
              aria-label="關閉預訂單"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <ShoppingBag className="w-12 h-12 text-stone-700" />
                <p className="text-stone-400 text-sm">您的預訂清單目前是空的</p>
                <p className="text-xs text-stone-500 max-w-xs">
                  探索產區手沖、特調濃縮或手工甜點，加入清單即可預約自取或席位
                </p>
                <a
                  href="#coffee-menu"
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-medium transition-colors"
                >
                  前往探索風味豆單 →
                </a>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-stone-950/80 border border-stone-800/90 flex flex-col justify-between gap-3 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-serif-tc font-bold text-stone-100 text-sm">
                        {item.coffee.name}
                      </h4>
                      <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                        {item.customization.temperature === 'iced' ? '冰鎮 Iced' : '溫熱 Hot'}
                        {item.customization.milkType === 'oat' && ' · 燕麥奶 (+NT$20)'}
                        {item.customization.grindChoice &&
                          ` · 研磨: ${item.customization.grindChoice}`}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-500 hover:text-red-400 p-1"
                      title="移除品項"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-800/60">
                    <div className="flex items-center border border-stone-700 rounded-lg bg-stone-900">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 text-stone-400 hover:text-stone-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 font-mono text-xs tabular-nums text-stone-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 text-stone-400 hover:text-stone-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-sm font-bold text-stone-100 tabular-nums">
                        NT$ {item.subtotal}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-800 bg-stone-950 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>小計</span>
                  <span className="font-mono tabular-nums text-stone-200">NT$ {subtotal}</span>
                </div>

                {member && tierInfo.discountRate > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>會籍優惠 ({tierInfo.nameZh})</span>
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

                <div className="flex justify-between text-stone-100 text-sm font-bold pt-2 border-t border-stone-800">
                  <span>結帳總額</span>
                  <span className="font-mono text-xl text-amber-400 tabular-nums">
                    NT$ {finalTotal}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-stone-400">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>預估可獲約 +{pointsToEarn} 點會員積分</span>
                </div>
              </div>

              <a
                href="#pre-order"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all shadow-lg shadow-amber-950 flex items-center justify-center gap-2"
              >
                <span>前往選擇到店時段 / 席位確認</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

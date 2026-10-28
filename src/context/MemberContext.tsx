import React, { createContext, useContext, useState, useEffect } from 'react';
import { Member, MembershipTier, RewardItem, RedeemedVoucher, PointsLog, OrderRecord } from '../types';
import { TIER_CONFIG } from '../data/coffeeData';

interface MemberContextType {
  member: Member | null;
  isLoggedIn: boolean;
  tierInfo: typeof TIER_CONFIG.BROWN;
  login: (email: string) => boolean;
  register: (name: string, email: string, phone: string) => boolean;
  logout: () => void;
  earnPoints: (amount: number, reason: string) => void;
  redeemReward: (reward: RewardItem) => { success: boolean; message: string; voucher?: RedeemedVoucher };
  useVoucher: (voucherId: string) => boolean;
  recordOrder: (order: Omit<OrderRecord, 'id' | 'orderNo' | 'createdAt'>) => OrderRecord;
  setDemoAccount: (type: 'newbie' | 'regular' | 'vip') => void;
}

const STORAGE_KEY = 'mugure_coffee_member_v2';

const DEFAULT_MEMBER: Member = {
  id: 'usr_882194',
  name: '林晨曦',
  email: 'chenxi.lin@example.com',
  phone: '0988-123-456',
  tier: 'SILVER',
  points: 520,
  joinedDate: '2026-03-15',
  barcode: 'MG-8821-9402',
  vouchers: [
    {
      id: 'vch-init-1',
      rewardId: 'rew-voucher-50',
      title: '全品項飲品折抵券 NT$50',
      code: 'MUGURE-50-891',
      pointsCost: 150,
      redeemedAt: '2026-10-20',
      expireAt: '2026-12-20',
      status: 'valid',
      category: 'voucher',
      discountValue: 50,
    },
  ],
  pointsHistory: [
    {
      id: 'pt-1',
      date: '2026-10-20',
      type: 'redeem',
      points: -150,
      title: '兌換「全品項飲品折抵券 NT$50」',
      balanceAfter: 520,
    },
    {
      id: 'pt-2',
      date: '2026-10-18',
      type: 'earn',
      points: 70,
      title: '門市品飲消費獲得點數 (銀卡 1.2x 加成)',
      balanceAfter: 670,
    },
    {
      id: 'pt-3',
      date: '2026-09-01',
      type: 'bonus',
      points: 100,
      title: '銀卡會員升等迎新禮遇',
      balanceAfter: 600,
    },
  ],
  orders: [
    {
      id: 'ord-8812',
      orderNo: '#MG-8812',
      createdAt: '2026-10-18 14:30',
      type: 'dinein',
      items: [
        {
          name: '衣索比亞 谷吉 瑰夏村 藝伎 G1',
          quantity: 1,
          subtotal: 240,
          customizationStr: '熱飲 · 中粗研磨',
        },
        {
          name: '京都小山園 濃抹茶焦糖磅蛋糕',
          quantity: 1,
          subtotal: 150,
          customizationStr: '正常切片',
        },
      ],
      totalAmount: 370,
      pointsEarned: 44,
      pickupTimeOrSeat: '窗邊雙人座 (桌號 B-02)',
      contactName: '林晨曦',
      contactPhone: '0988-123-456',
      status: 'completed',
    },
  ],
};

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [member, setMember] = useState<Member | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_MEMBER;
  });

  useEffect(() => {
    if (member) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(member));
      } catch {
        // ignore
      }
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [member]);

  // Determine tier based on points/tier history
  const tierInfo = member ? TIER_CONFIG[member.tier] : TIER_CONFIG.BROWN;

  const calculateUpdatedTier = (currentPoints: number, currentTier: MembershipTier): MembershipTier => {
    if (currentPoints >= 2500 || currentTier === 'AMBER_VIP') return 'AMBER_VIP';
    if (currentPoints >= 1200 || currentTier === 'GOLD') return 'GOLD';
    if (currentPoints >= 500 || currentTier === 'SILVER') return 'SILVER';
    return 'BROWN';
  };

  const login = (email: string): boolean => {
    if (!email) return false;
    // If logging in with matching email or new session
    const existing = member && member.email === email ? member : {
      ...DEFAULT_MEMBER,
      email,
      name: email.split('@')[0],
    };
    setMember(existing);
    return true;
  };

  const register = (name: string, email: string, phone: string): boolean => {
    if (!name || !email) return false;
    const newMember: Member = {
      id: `usr_${Math.floor(100000 + Math.random() * 900000)}`,
      name,
      email,
      phone: phone || '0900-000-000',
      tier: 'BROWN',
      points: 200, // Welcome bonus points!
      joinedDate: new Date().toISOString().split('T')[0],
      barcode: `MG-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      vouchers: [
        {
          id: `vch-welcome-${Date.now()}`,
          rewardId: 'rew-voucher-50',
          title: '新會員迎新禮券 NT$50',
          code: `WELCOME-${Math.floor(100 + Math.random() * 899)}`,
          pointsCost: 0,
          redeemedAt: new Date().toISOString().split('T')[0],
          expireAt: new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString().split('T')[0],
          status: 'valid',
          category: 'voucher',
          discountValue: 50,
        },
      ],
      pointsHistory: [
        {
          id: `pt-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          type: 'bonus',
          points: 200,
          title: '新會員註冊迎新贈點 +200 點',
          balanceAfter: 200,
        },
      ],
      orders: [],
    };
    setMember(newMember);
    return true;
  };

  const logout = () => {
    setMember(null);
  };

  const earnPoints = (amount: number, reason: string) => {
    if (!member) return;
    const newBalance = member.points + amount;
    const newTier = calculateUpdatedTier(newBalance, member.tier);
    const newLog: PointsLog = {
      id: `pt-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'earn',
      points: amount,
      title: reason,
      balanceAfter: newBalance,
    };

    setMember({
      ...member,
      points: newBalance,
      tier: newTier,
      pointsHistory: [newLog, ...member.pointsHistory],
    });
  };

  const redeemReward = (reward: RewardItem) => {
    if (!member) {
      return { success: false, message: '請先登入或註冊會員以進行點數兌換' };
    }
    if (member.points < reward.pointsCost) {
      return {
        success: false,
        message: `點數不足！兌換此獎勵需 ${reward.pointsCost} 點，目前僅有 ${member.points} 點。`,
      };
    }

    const newBalance = member.points - reward.pointsCost;
    const redemptionCode = `MUGURE-${reward.category.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newVoucher: RedeemedVoucher = {
      id: `vch-${Date.now()}`,
      rewardId: reward.id,
      title: reward.title,
      code: redemptionCode,
      pointsCost: reward.pointsCost,
      redeemedAt: new Date().toISOString().split('T')[0],
      expireAt: new Date(Date.now() + 45 * 24 * 3600 * 1000).toISOString().split('T')[0],
      status: 'valid',
      category: reward.category,
      discountValue: reward.category === 'voucher' ? reward.equivalentValue : undefined,
    };

    const newLog: PointsLog = {
      id: `pt-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'redeem',
      points: -reward.pointsCost,
      title: `兌換「${reward.title}」`,
      balanceAfter: newBalance,
    };

    setMember({
      ...member,
      points: newBalance,
      vouchers: [newVoucher, ...member.vouchers],
      pointsHistory: [newLog, ...member.pointsHistory],
    });

    return {
      success: true,
      message: `成功兌換「${reward.title}」！已扣除 ${reward.pointsCost} 點，電子票券已存入您的票夾。`,
      voucher: newVoucher,
    };
  };

  const useVoucher = (voucherId: string): boolean => {
    if (!member) return false;
    const exists = member.vouchers.find((v) => v.id === voucherId && v.status === 'valid');
    if (!exists) return false;

    setMember({
      ...member,
      vouchers: member.vouchers.map((v) => (v.id === voucherId ? { ...v, status: 'used' as const } : v)),
    });
    return true;
  };

  const recordOrder = (orderData: Omit<OrderRecord, 'id' | 'orderNo' | 'createdAt'>): OrderRecord => {
    const orderNo = `#MG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderRecord = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNo,
      createdAt: new Date().toLocaleString('zh-TW', { hour12: false }),
    };

    if (member) {
      earnPoints(orderData.pointsEarned, `訂單 ${orderNo} 完成消費累點`);
      setMember((prev) => (prev ? { ...prev, orders: [newOrder, ...prev.orders] } : null));
    }

    return newOrder;
  };

  const setDemoAccount = (type: 'newbie' | 'regular' | 'vip') => {
    if (type === 'newbie') {
      register('初訪旅人', 'coffee.lover@mugure.tw', '0912-345-678');
    } else if (type === 'regular') {
      setMember(DEFAULT_MEMBER);
    } else {
      setMember({
        ...DEFAULT_MEMBER,
        id: 'usr_vip_9999',
        name: '莊園藏家 王品策',
        email: 'collector.wang@mugure.tw',
        tier: 'AMBER_VIP',
        points: 3420,
        barcode: 'MG-VIP-9999',
      });
    }
  };

  return (
    <MemberContext.Provider
      value={{
        member,
        isLoggedIn: !!member,
        tierInfo,
        login,
        register,
        logout,
        earnPoints,
        redeemReward,
        useVoucher,
        recordOrder,
        setDemoAccount,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMember must be used within MemberProvider');
  }
  return context;
};

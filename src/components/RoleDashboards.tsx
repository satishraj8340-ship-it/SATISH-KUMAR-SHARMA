import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  User, Shield, Smartphone, MapPin, Landmark, Briefcase, 
  TrendingUp, Award, DollarSign, ShoppingCart, Percent, 
  Truck, HelpCircle, Users, Activity, Settings, Bell, 
  FileCheck, AlertTriangle, ChevronRight, Check, X, ShieldAlert,
  ClipboardList, Package, Coins, Map, UserX, UserCheck, Eye, Download, LogOut, Trash2
} from 'lucide-react';
import { PartnerRole } from '../types';
import { UserAccount, AppNotification, AuthLog, SessionDevice, getSystemState, saveSystemState } from './EnterpriseAuthSystem';

interface RoleDashboardsProps {
  user: UserAccount;
  language: 'EN' | 'HI';
  onLogout: () => void;
  onStateUpdate?: () => void;
}

export default function RoleDashboards({ user, language, onLogout, onStateUpdate }: RoleDashboardsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'security' | 'notifications' | 'admin'>('overview');
  const [localState, setLocalState] = useState<any>(null);
  
  // Dynamic UI actions
  const [selectedUserForReview, setSelectedUserForReview] = useState<UserAccount | null>(null);
  const [kycRejectNote, setKycRejectNote] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [adminSearch, setAdminSearch] = useState('');
  const [adminRoleFilter, setAdminRoleFilter] = useState<string>('all');
  
  // Simulation metrics
  const [walletAmountInput, setWalletAmountInput] = useState('');
  const [customerCart, setCustomerCart] = useState<Array<{ name: string; price: number; qty: number }>>([
    { name: 'Basmati Rice Premium (1kg)', price: 85, qty: 2 },
    { name: 'Double Refined Mustard Oil (1L)', price: 175, qty: 1 },
    { name: 'Panchayat Organic Spices Mix', price: 45, qty: 3 }
  ]);
  const [merchantRestockInput, setMerchantRestockInput] = useState({ name: 'Super Grains Ghee Crate', qty: 5 });

  useEffect(() => {
    setLocalState(getSystemState());
  }, []);

  const triggerStateRefresh = () => {
    const updated = getSystemState();
    setLocalState(updated);
    if (onStateUpdate) onStateUpdate();
  };

  if (!localState) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 rounded-full border-2 border-t-brand-primary border-r-transparent animate-spin"></div>
      </div>
    );
  }

  // Update wallet simulation
  const handleAddWalletBalance = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(walletAmountInput);
    if (isNaN(amt) || amt <= 0) return;

    const state = getSystemState();
    const target = state.accounts.find((acc: any) => acc.phone === user.phone);
    if (target) {
      target.walletBalance += amt;
      state.notifications.unshift({
        id: 'not_w_' + Date.now(),
        title: 'Wallet Deposited Successfully',
        message: `₹${amt} was credited into your local secure wallet via Instant UPI Transfer.`,
        type: 'wallet',
        timestamp: new Date().toISOString(),
        read: false
      });
      state.logs.unshift({
        id: 'log_w_' + Date.now(),
        timestamp: new Date().toISOString(),
        action: 'login_success',
        ip: '127.0.0.1',
        details: `₹${amt} added to wallet for ${user.fullName}.`
      } as any);
      saveSystemState(state);
      setWalletAmountInput('');
      triggerStateRefresh();
    }
  };

  // Revoke active login device session
  const handleRevokeSession = (sessionId: string) => {
    const state = getSystemState();
    state.sessions = state.sessions.filter((s: any) => s.id !== sessionId);
    state.logs.unshift({
      id: 'log_rev_' + Date.now(),
      timestamp: new Date().toISOString(),
      action: 'session_revoked',
      ip: '103.241.12.84',
      details: `Active login session revoked successfully.`,
      isSuspicious: false
    });
    saveSystemState(state);
    triggerStateRefresh();
  };

  // Admin Actions: Approve User KYC
  const handleAdminApproveKyc = (phone: string) => {
    const state = getSystemState();
    const found = state.accounts.find((acc: any) => acc.phone === phone);
    if (found) {
      found.kycStatus = 'approved';
      found.kycNotes = 'All uploaded documents verified successfully.';
      
      // Notify user
      state.notifications.unshift({
        id: 'not_ap_' + Date.now(),
        title: 'KYC Verification Approved!',
        message: `Congratulations ${found.fullName}, your digital credentials for ${found.role.toUpperCase()} portal have been verified. Complete access unlocked.`,
        type: 'kyc_approved',
        timestamp: new Date().toISOString(),
        read: false
      });

      state.logs.unshift({
        id: 'log_ap_' + Date.now(),
        timestamp: new Date().toISOString(),
        action: 'kyc_approved',
        ip: '103.241.12.84',
        details: `Approved credentials for user: ${found.fullName} (${found.phone}).`
      } as any);

      saveSystemState(state);
      setSelectedUserForReview(null);
      setShowRejectInput(false);
      triggerStateRefresh();
    }
  };

  // Admin Actions: Reject User KYC
  const handleAdminRejectKyc = (phone: string) => {
    if (!kycRejectNote.trim()) return;
    const state = getSystemState();
    const found = state.accounts.find((acc: any) => acc.phone === phone);
    if (found) {
      found.kycStatus = 'rejected';
      found.kycNotes = kycRejectNote;

      state.notifications.unshift({
        id: 'not_rj_' + Date.now(),
        title: 'KYC Identification Rejected',
        message: `Reason: ${kycRejectNote}. Please log in and re-upload clear scanned documents.`,
        type: 'kyc_rejected',
        timestamp: new Date().toISOString(),
        read: false
      });

      state.logs.unshift({
        id: 'log_rj_' + Date.now(),
        timestamp: new Date().toISOString(),
        action: 'kyc_rejected',
        ip: '103.241.12.84',
        details: `Rejected credentials for ${found.fullName}. Reason: ${kycRejectNote}.`
      } as any);

      saveSystemState(state);
      setSelectedUserForReview(null);
      setShowRejectInput(false);
      setKycRejectNote('');
      triggerStateRefresh();
    }
  };

  // Suspend/Activate User account
  const handleToggleUserStatus = (phone: string, active: boolean) => {
    const state = getSystemState();
    const found = state.accounts.find((acc: any) => acc.phone === phone);
    if (found) {
      found.isActive = active;
      state.logs.unshift({
        id: 'log_st_' + Date.now(),
        timestamp: new Date().toISOString(),
        action: active ? 'user_activated' : 'user_suspended',
        ip: '103.241.12.84',
        details: `${active ? 'Activated' : 'Suspended'} user account for ${found.fullName} (${found.phone}).`
      } as any);
      saveSystemState(state);
      triggerStateRefresh();
    }
  };

  // Mark all notifications read
  const handleMarkNotificationsRead = () => {
    const state = getSystemState();
    state.notifications.forEach((n: any) => n.read = true);
    saveSystemState(state);
    triggerStateRefresh();
  };

  const activeUserAccount = localState.accounts.find((acc: any) => acc.phone === user.phone) || user;

  // Render Charts Data
  const commissionChartData = [
    { name: 'Week 1', Commission: 4200, Deliveries: 45 },
    { name: 'Week 2', Commission: 5800, Deliveries: 62 },
    { name: 'Week 3', Commission: 4900, Deliveries: 50 },
    { name: 'Week 4', Commission: 6720, Deliveries: 80 },
  ];

  const regionalSalesData = [
    { name: 'Gaya', sales: 480000, merchants: 120 },
    { name: 'Patna', sales: 950000, merchants: 240 },
    { name: 'Nawada', sales: 320000, merchants: 85 },
    { name: 'Jehanabad', sales: 210000, merchants: 50 },
    { name: 'Aurangabad', sales: 430000, merchants: 110 }
  ];

  const roleColors: { [key: string]: string } = {
    'super-admin': 'bg-rose-500 text-white border-rose-500',
    'admin': 'bg-pink-500 text-white',
    'ceo': 'bg-slate-900 text-white',
    'director': 'bg-indigo-900 text-white',
    'customer': 'bg-emerald-500 text-white',
    'merchant': 'bg-blue-500 text-white',
    'ppm': 'bg-amber-500 text-white',
    'franchise': 'bg-purple-500 text-white',
    'distributor': 'bg-teal-500 text-white'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Banner Dashboard Status */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 border border-gray-100 dark:border-gray-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5 mb-8">
        <div className="flex items-center gap-4 text-left w-full md:w-auto">
          <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-2xl">
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-black text-gray-900 dark:text-white">{activeUserAccount.fullName}</h2>
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${roleColors[activeUserAccount.role] || 'bg-gray-500 text-white'}`}>
                {activeUserAccount.role.replace('-', ' ')}
              </span>
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
                activeUserAccount.kycStatus === 'approved' ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5' :
                activeUserAccount.kycStatus === 'pending' ? 'border-amber-500 text-amber-500 bg-amber-500/5' :
                'border-rose-500 text-rose-500 bg-rose-500/5'
              }`}>
                KYC {activeUserAccount.kycStatus.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Local Address: {activeUserAccount.village}, {activeUserAccount.panchayat}, {activeUserAccount.block}, {activeUserAccount.district}, {activeUserAccount.state}</p>
          </div>
        </div>

        {/* Dynamic Quick stats row */}
        <div className="flex items-center gap-4 justify-between w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 dark:border-gray-800">
          <div className="text-right">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Local Secure Wallet</span>
            <span className="text-lg font-black text-emerald-500 font-mono">₹{activeUserAccount.walletBalance.toLocaleString('en-IN')}.00</span>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main workspace panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-3">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-md space-y-1">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 block mb-2">Workspace Navigation</span>
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full py-2.5 px-4 text-xs font-bold rounded-2xl flex items-center gap-2.5 transition-colors text-left cursor-pointer ${
                activeTab === 'overview' ? 'bg-brand-primary text-white' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              <Activity className="w-4 h-4" /> Role Dashboard
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full py-2.5 px-4 text-xs font-bold rounded-2xl flex items-center gap-2.5 transition-colors text-left cursor-pointer ${
                activeTab === 'profile' ? 'bg-brand-primary text-white' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              <User className="w-4 h-4" /> Personal Profile
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full py-2.5 px-4 text-xs font-bold rounded-2xl flex items-center gap-2.5 transition-colors text-left cursor-pointer ${
                activeTab === 'security' ? 'bg-brand-primary text-white' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              <Shield className="w-4 h-4" /> Security & Sessions
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full py-2.5 px-4 text-xs font-bold rounded-2xl flex items-center justify-between transition-colors text-left cursor-pointer ${
                activeTab === 'notifications' ? 'bg-brand-primary text-white' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4" /> Notifications
              </div>
              {localState.notifications.some((n: any) => !n.read) && (
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              )}
            </button>

            {/* Display Admin Panel link ONLY for Admin roles */}
            {['admin', 'super-admin', 'ceo', 'director'].includes(activeUserAccount.role) && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`w-full py-2.5 px-4 text-xs font-bold rounded-2xl flex items-center gap-2.5 transition-colors text-left cursor-pointer ${
                  activeTab === 'admin' ? 'bg-brand-primary text-white' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-rose-500" /> Admin Controller
              </button>
            )}
          </div>

          {/* Quick wallet Deposit component */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 border border-gray-100 dark:border-gray-800 shadow-md text-left space-y-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Instant Deposit Simulator</span>
            <form onSubmit={handleAddWalletBalance} className="space-y-2">
              <div className="relative">
                <Coins className="absolute left-3 top-2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  required
                  value={walletAmountInput}
                  onChange={(e) => setWalletAmountInput(e.target.value)}
                  placeholder="Deposit Amount (₹)"
                  className="w-full bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl py-1.5 pl-9 pr-3 text-xs focus:outline-hidden"
                />
              </div>
              <button
                type="submit"
                className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] rounded-lg transition-colors cursor-pointer uppercase font-mono tracking-wider"
              >
                Add simulated Credit
              </button>
            </form>
          </div>
        </div>

        {/* Content Box */}
        <div className="lg:col-span-9">
          
          {/* OVERVIEW TAB - Role-Specific Dashboards */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* WARN IN CASE OF PENDING KYC */}
              {activeUserAccount.kycStatus === 'pending' && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-2xl text-xs text-left space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Your account KYC verification is currently PENDING review.</span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    While pending, you can review dashboards and use local simulated features, but actual logistics operations will require Super Admin document approval. Check notifications regularly.
                  </p>
                </div>
              )}

              {/* DYNAMIC DASHBOARD SELECTOR */}
              
              {/* 1. CUSTOMER DASHBOARD */}
              {activeUserAccount.role === 'customer' && (
                <div className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Loyalty Cashbacks</span>
                      <p className="text-xl font-black text-emerald-500">5% Applied</p>
                      <p className="text-[9px] text-gray-400">Panchayat Welcome Offer Code: PPMWELCOME</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Associated Local PPM</span>
                      <p className="text-sm font-black text-gray-900 dark:text-white">Suresh Paswan</p>
                      <p className="text-[9px] text-gray-400">Village Point: Gaya South Bakraur Hub</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Active Grocery Orders</span>
                      <p className="text-xl font-black text-brand-primary">02 Deliveries</p>
                      <p className="text-[9px] text-gray-400">Est Handover: July 03</p>
                    </div>
                  </div>

                  {/* Cart Simulator */}
                  <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-black text-gray-900 dark:text-white">Village Grocery Consolidated Order Cart</h4>
                      <span className="text-[10px] bg-brand-primary/10 text-brand-primary font-mono font-bold px-2 py-0.5 rounded-full">Consolidated via Suresh (PPM)</span>
                    </div>

                    <div className="space-y-2.5">
                      {customerCart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs pb-2 border-b dark:border-gray-800">
                          <div>
                            <span className="font-bold text-gray-900 dark:text-white">{item.name}</span>
                            <span className="text-gray-400 block text-[10px]">Price: ₹{item.price} each</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-500">Qty: {item.qty}</span>
                            <span className="font-bold text-gray-900 dark:text-white">₹{item.price * item.qty}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 font-black text-sm">
                      <span>Consolidated Total:</span>
                      <span className="text-brand-primary font-mono">₹{customerCart.reduce((sum, item) => sum + (item.price * item.qty), 0)}</span>
                    </div>

                    <button
                      onClick={() => alert('Order Placed Successfully via Simulated Local PPM Group!')}
                      className="w-full py-2.5 bg-brand-primary hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Verify and Place Order via Local PPM Suresh
                    </button>
                  </div>
                </div>
              )}

              {/* 2. MERCHANT DASHBOARD */}
              {activeUserAccount.role === 'merchant' && (
                <div className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Kirana Wholesale Line</span>
                      <p className="text-xl font-black text-brand-primary">₹75,000 credit</p>
                      <p className="text-[9px] text-gray-400">Available interest-free limit</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">GST Registration Status</span>
                      <p className="text-xs font-black text-emerald-500 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Minor Exemption
                      </p>
                      <p className="text-[9px] text-gray-400">Turnover below government limit</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Restocked This Month</span>
                      <p className="text-xl font-black text-gray-900 dark:text-white">42 Metric Items</p>
                      <p className="text-[9px] text-gray-400">Direct warehouse delivery</p>
                    </div>
                  </div>

                  {/* Restocking sheet */}
                  <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                    <h4 className="text-sm font-black text-gray-900 dark:text-white">Kirana Wholesale Direct Restock Scheduler</h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 block uppercase">Product Stock Item</label>
                        <select
                          value={merchantRestockInput.name}
                          onChange={(e) => setMerchantRestockInput({ ...merchantRestockInput, name: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl py-2 px-3 focus:outline-hidden font-bold"
                        >
                          <option value="Fortune Soyabean Oil (Crate)">Fortune Soyabean Oil (Crate)</option>
                          <option value="Aashirvaad Atta 10kg (10 Bags)">Aashirvaad Atta 10kg (10 Bags)</option>
                          <option value="Tata Salt (25kg Crate)">Tata Salt (25kg Crate)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 block uppercase">Quantity Requested</label>
                        <input
                          type="number"
                          value={merchantRestockInput.qty}
                          onChange={(e) => setMerchantRestockInput({ ...merchantRestockInput, qty: parseInt(e.target.value) || 1 })}
                          className="w-full bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl py-2 px-3 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => alert(`Direct Restock Order of ${merchantRestockInput.qty}x ${merchantRestockInput.name} queued for Gaya Depot!`)}
                      className="w-full py-2.5 bg-brand-primary hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Place Wholesale Direct order
                    </button>
                  </div>
                </div>
              )}

              {/* 3. PPM & PPM LEADER DASHBOARDS */}
              {['ppm', 'ppm-leader'].includes(activeUserAccount.role) && (
                <div className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Commision Rate</span>
                      <p className="text-xl font-black text-emerald-500">₹12 per Household</p>
                      <p className="text-[9px] text-gray-400">High-Fulfillment Bonus active</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Assigned Households</span>
                      <p className="text-xl font-black text-gray-900 dark:text-white">82 village Families</p>
                      <p className="text-[9px] text-gray-400">Mastipur Panchayat area</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Fulfillment status</span>
                      <p className="text-xl font-black text-brand-primary">98.5% Complete</p>
                      <p className="text-[9px] text-gray-400">Excellent performance rating</p>
                    </div>
                  </div>

                  {/* Commission chart */}
                  <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md">
                    <h4 className="text-sm font-black text-gray-900 dark:text-white mb-4">Panchayat Commission Tracking (Recharts Analytics)</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={commissionChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" stroke="#9ca3af" />
                          <YAxis stroke="#9ca3af" />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="Commission" stroke="#10b981" strokeWidth={3} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. BLOCK / DISTRICT / STATE MANAGERS */}
              {['block-manager', 'district-manager', 'state-manager'].includes(activeUserAccount.role) && (
                <div className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Active Kiranas under Admin</span>
                      <p className="text-xl font-black text-brand-primary">145 Merchants</p>
                      <p className="text-[9px] text-gray-400">Directly monitored blocks</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Active Panchayat PPMs</span>
                      <p className="text-xl font-black text-emerald-500">42 PPM Partners</p>
                      <p className="text-[9px] text-gray-400">Fulfillment corridors</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Regional Growth Rating</span>
                      <p className="text-xl font-black text-amber-500">+14.2% Growth</p>
                      <p className="text-[9px] text-gray-400">Quarter on Quarter</p>
                    </div>
                  </div>

                  {/* Recharts sales overview */}
                  <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md">
                    <h4 className="text-sm font-black text-gray-900 dark:text-white mb-4">Regional Sales Revenue Contribution (Gaya Division)</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={regionalSalesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" stroke="#9ca3af" />
                          <YAxis stroke="#9ca3af" />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. FRANCHISE / DISTRIBUTOR / WAREHOUSE / DELIVERY */}
              {['franchise', 'distributor', 'warehouse-staff', 'delivery-partner'].includes(activeUserAccount.role) && (
                <div className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Assigned Depot Corridor</span>
                      <p className="text-base font-black text-gray-900 dark:text-white">Gaya Central - Bodhgaya Route</p>
                      <p className="text-[9px] text-gray-400">Fulfillment depot #04</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Pending Crate Dispatch</span>
                      <p className="text-xl font-black text-amber-500">12 Consolidations</p>
                      <p className="text-[9px] text-gray-400">Est loading: Within 2 hours</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Fulfillment GPS Status</span>
                      <p className="text-xs font-black text-emerald-500 flex items-center gap-1">
                        ● GPS Transmitting Live
                      </p>
                      <p className="text-[9px] text-gray-400">Update frequency: 5s interval</p>
                    </div>
                  </div>

                  {/* Route checklists */}
                  <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                    <h4 className="text-sm font-black text-gray-900 dark:text-white">Active Daily Dispatch Load Checklist</h4>
                    <div className="space-y-2.5 text-xs">
                      {[
                        { title: 'Crate Pack #1024 - Mastipur village Kirana', status: 'Approved for Transit' },
                        { title: 'Bulk Grain Bags #2091 - Gaya South Depot', status: 'Loaded in Truck' },
                        { title: 'Mustard Oil Cases #4081 - Bakraur Village PPM', status: 'Handovers Complete' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2.5 bg-gray-50 dark:bg-gray-800/50 border rounded-xl">
                          <span className="font-bold text-gray-900 dark:text-white">{item.title}</span>
                          <span className="text-[9px] font-mono bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full font-bold">{item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. SUPPORT / HR / ACCOUNTS */}
              {['support-executive', 'hr', 'accounts'].includes(activeUserAccount.role) && (
                <div className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Operational Backlog Tasks</span>
                      <p className="text-xl font-black text-rose-500">04 Pending Actions</p>
                      <p className="text-[9px] text-gray-400">Average response limit: 12m</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Processed Requests Today</span>
                      <p className="text-xl font-black text-emerald-500">48 Tickets Closed</p>
                      <p className="text-[9px] text-gray-400">98% Satisfied Customer Rating</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">System Security Compliance</span>
                      <p className="text-xs font-black text-brand-primary">Level-3 ISO Certified</p>
                      <p className="text-[9px] text-gray-400">Daily integrity scans green</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                    <h4 className="text-sm font-black text-gray-900 dark:text-white">Active Queue Monitoring Dashboard</h4>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white">Ticket #10912 - Mahesh Shaw Kirana Credit Update</span>
                        <p className="text-[10px] text-gray-400">Reason: Verify balance statements ledger sheet.</p>
                      </div>
                      <span className="text-[9px] bg-rose-500 text-white px-2 py-0.5 rounded font-extrabold uppercase font-mono">High priority</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 7. CEO / DIRECTOR / SUPER-ADMIN EXECUTIVE PANELS */}
              {['ceo', 'director', 'super-admin', 'admin'].includes(activeUserAccount.role) && (
                <div className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Total Indian State Divisions</span>
                      <p className="text-base font-black text-gray-900 dark:text-white">Bihar, UP, Jharkhand</p>
                      <p className="text-[9px] text-gray-400">3 Regional State HQ active</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Total Ecosystem partners</span>
                      <p className="text-xl font-black text-brand-primary">{localState.accounts.length} onboarded</p>
                      <p className="text-[9px] text-gray-400">Active credentials verified</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Pending Review KYC Queue</span>
                      <p className="text-xl font-black text-rose-500">
                        {localState.accounts.filter((a: any) => a.kycStatus === 'pending').length} Users
                      </p>
                      <p className="text-[9px] text-gray-400">Needs instant approval actions</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Total Consolidated Sales</span>
                      <p className="text-xl font-black text-emerald-500">₹24,50,000</p>
                      <p className="text-[9px] text-gray-400">Gaya Block Logistics</p>
                    </div>
                  </div>

                  {/* Recharts Executive visual charts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md">
                      <h4 className="text-xs font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Statewise Regional partner Distribution</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={regionalSalesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip />
                            <Bar dataKey="merchants" fill="#10b981" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md">
                      <h4 className="text-xs font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wider">National Supply Chain Operations</h4>
                      <div className="space-y-4 text-xs font-sans">
                        <div>
                          <div className="flex justify-between font-bold mb-1">
                            <span>Basmati Rice Stock Levels (Gaya Depot)</span>
                            <span>92%</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-primary" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between font-bold mb-1">
                            <span>GPS Active Fleet (32 Trucks)</span>
                            <span>100%</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between font-bold mb-1">
                            <span>Double Refined Oils Storage Volume</span>
                            <span>45%</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500" style={{ width: '45%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* PROFILE MANAGEMENT TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-md text-left space-y-6">
              <h3 className="text-base font-black text-gray-900 dark:text-white pb-3 border-b dark:border-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-brand-primary" /> View & Edit Personal Identification Profile
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
                <div className="space-y-1">
                  <span className="text-gray-400 font-bold block uppercase text-[10px]">Full Legal Name</span>
                  <input
                    type="text"
                    disabled
                    value={activeUserAccount.fullName}
                    className="w-full bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl py-2 px-3 focus:outline-hidden text-gray-500"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400 font-bold block uppercase text-[10px]">Registered Contact Number</span>
                  <input
                    type="text"
                    disabled
                    value={activeUserAccount.phone}
                    className="w-full bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl py-2 px-3 focus:outline-hidden text-gray-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400 font-bold block uppercase text-[10px]">Email Address</span>
                  <input
                    type="text"
                    disabled
                    value={activeUserAccount.email || 'N/A'}
                    className="w-full bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl py-2 px-3 focus:outline-hidden text-gray-500"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400 font-bold block uppercase text-[10px]">Registered Aadhaar Identification</span>
                  <input
                    type="text"
                    disabled
                    value={activeUserAccount.aadhaarNo || 'N/A'}
                    className="w-full bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl py-2 px-3 focus:outline-hidden text-gray-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400 font-bold block uppercase text-[10px]">Bank Details (Account No)</span>
                  <input
                    type="text"
                    disabled
                    value={activeUserAccount.bankAccount || 'N/A'}
                    className="w-full bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl py-2 px-3 focus:outline-hidden text-gray-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400 font-bold block uppercase text-[10px]">IFSC Bank Code</span>
                  <input
                    type="text"
                    disabled
                    value={activeUserAccount.ifscCode || 'N/A'}
                    className="w-full bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl py-2 px-3 focus:outline-hidden text-gray-500 font-mono"
                  />
                </div>
              </div>

              <div className="p-4 bg-brand-primary/5 rounded-2xl border border-brand-primary/10">
                <span className="text-[10px] text-brand-primary font-bold block uppercase font-mono tracking-wider">Enterprise Security Compliance Notice:</span>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal mt-1">
                  Legal name, bank credentials, and Aadhaar identity values are frozen once approved. In case of accounts transition requirements, please write directly to Support executive detailing structural changes.
                </p>
              </div>
            </div>
          )}

          {/* SECURITY & LOGIN HISTORY SESSIONS TAB */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              
              {/* Active Sessions list */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-md text-left space-y-4">
                <h3 className="text-base font-black text-gray-900 dark:text-white pb-3 border-b dark:border-gray-800 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-500" /> Active System Login Sessions Security (JWT Control)
                </h3>

                <div className="space-y-3.5">
                  {localState.sessions.map((session: SessionDevice) => (
                    <div key={session.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-800/40 border rounded-2xl gap-3">
                      <div className="text-xs font-sans space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-extrabold text-gray-900 dark:text-white">{session.deviceType}</span>
                          {session.isCurrent && (
                            <span className="text-[9px] bg-emerald-500 text-white font-mono font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">Current Device</span>
                          )}
                        </div>
                        <p className="text-gray-400 text-[11px]">{session.browser} • IP: <span className="font-mono font-bold text-gray-500">{session.ip}</span></p>
                        <p className="text-gray-400 text-[11px]">Location detected: {session.location} • Last active: {session.lastActive}</p>
                      </div>

                      {!session.isCurrent && (
                        <button
                          onClick={() => handleRevokeSession(session.id)}
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-500 font-bold rounded-lg text-[10px] flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Revoke Session
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Authentication Logs logs */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-md text-left space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pb-2 border-b dark:border-gray-800">
                  Secure Audit Trails Log Matrix
                </h3>

                <div className="space-y-2.5 font-mono text-[10px] leading-relaxed">
                  {localState.logs.map((log: AuthLog) => (
                    <div key={log.id} className={`p-2.5 rounded-xl border flex gap-2 items-start ${
                      log.isSuspicious ? 'bg-rose-500/5 border-rose-500/25 text-rose-500' : 'bg-gray-500/5 border-gray-200 dark:border-gray-800 text-gray-500'
                    }`}>
                      <span className="text-[8.5px] font-bold shrink-0">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      <div>
                        <strong>[{log.action.toUpperCase()}]</strong> - {log.details}
                        <span className="block text-[8.5px] text-gray-400 mt-0.5">IP: {log.ip}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-md text-left space-y-4">
              <div className="flex justify-between items-center pb-3 border-b dark:border-gray-800">
                <h3 className="text-base font-black text-gray-900 dark:text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-500" /> Notifications Inbox
                </h3>
                <button
                  onClick={handleMarkNotificationsRead}
                  className="text-xs text-brand-primary hover:underline font-bold"
                >
                  Mark all read
                </button>
              </div>

              <div className="space-y-3.5 font-sans">
                {localState.notifications.map((notif: AppNotification) => (
                  <div key={notif.id} className={`p-3.5 rounded-2xl border text-xs text-left relative flex gap-3 ${
                    notif.read ? 'bg-white dark:bg-gray-900/50 border-gray-100 dark:border-gray-800/80 text-gray-500' : 'bg-indigo-500/5 border-indigo-500/20 text-gray-900 dark:text-white'
                  }`}>
                    <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl h-fit">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-xs">{notif.title}</h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">{notif.message}</p>
                      <span className="block text-[9px] text-gray-400 mt-1 font-mono">{new Date(notif.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADMIN CONTROLLER TAB */}
          {activeTab === 'admin' && (
            <div className="space-y-6">
              
              {/* Users search filters */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between text-left">
                <div className="flex-1 space-y-1 w-full">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Search Partner Database</label>
                  <input
                    type="text"
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    placeholder="Search by legal name or phone..."
                    className="w-full bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl py-2 px-3 text-xs focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1 w-full sm:w-48">
                  <label className="text-[10px] font-bold text-gray-400 uppercase font-mono">Role Filter</label>
                  <select
                    value={adminRoleFilter}
                    onChange={(e) => setAdminRoleFilter(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl py-2 px-3 text-xs focus:outline-hidden font-bold"
                  >
                    <option value="all">All Roles</option>
                    <option value="customer">Customer</option>
                    <option value="merchant">Merchant</option>
                    <option value="ppm">PPM</option>
                    <option value="super-admin">Super Admin</option>
                  </select>
                </div>
              </div>

              {/* Users list database representation */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-md text-left space-y-4">
                <h3 className="text-base font-black text-gray-900 dark:text-white pb-2 border-b dark:border-gray-800">
                  National Ecosystem Registration Records ({localState.accounts.length})
                </h3>

                <div className="space-y-4 font-sans text-xs">
                  {localState.accounts
                    .filter((acc: any) => 
                      (adminRoleFilter === 'all' || acc.role === adminRoleFilter) &&
                      (acc.fullName.toLowerCase().includes(adminSearch.toLowerCase()) || acc.phone.includes(adminSearch))
                    )
                    .map((acc: UserAccount) => (
                      <div key={acc.phone} className="p-4 bg-gray-50 dark:bg-gray-800/40 border rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-sm text-gray-900 dark:text-white">{acc.fullName}</span>
                            <span className={`text-[8.5px] font-extrabold px-1.5 py-0.2 rounded uppercase ${roleColors[acc.role] || 'bg-gray-500 text-white'}`}>
                              {acc.role}
                            </span>
                            <span className={`text-[9px] font-mono font-bold px-2 py-0.1 rounded border ${
                              acc.kycStatus === 'approved' ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5' :
                              acc.kycStatus === 'pending' ? 'border-amber-500 text-amber-500 bg-amber-500/5' :
                              'border-rose-500 text-rose-500 bg-rose-500/5'
                            }`}>
                              KYC: {acc.kycStatus.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-400 font-mono text-[11px]">{acc.phone} • {acc.email || 'No email'}</p>
                          <p className="text-gray-400 text-[11px]">{acc.village}, {acc.panchayat}, {acc.district}</p>
                        </div>

                        {/* Actions controls */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => { setSelectedUserForReview(acc); setShowRejectInput(false); }}
                            className="px-3 py-1.5 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary font-bold rounded-xl text-[10px] flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" /> View Docs
                          </button>

                          {acc.isActive ? (
                            <button
                              onClick={() => handleToggleUserStatus(acc.phone, false)}
                              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-500 font-bold rounded-xl text-[10px] flex items-center gap-1 cursor-pointer"
                            >
                              <UserX className="w-3.5 h-3.5" /> Suspend
                            </button>
                          ) : (
                            <button
                              onClick={() => handleToggleUserStatus(acc.phone, true)}
                              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-500 font-bold rounded-xl text-[10px] flex items-center gap-1 cursor-pointer"
                            >
                              <UserCheck className="w-3.5 h-3.5" /> Activate
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* DOCUMENT REVIEW DIALOG POPUP */}
              {selectedUserForReview && (
                <div className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white dark:bg-gray-950 w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden text-xs text-left">
                    <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
                      <div>
                        <span className="text-[9px] text-brand-accent uppercase tracking-widest font-mono font-bold">Verification Console</span>
                        <h4 className="text-sm font-black font-display text-white">Reviewing: {selectedUserForReview.fullName}</h4>
                      </div>
                      <button 
                        onClick={() => setSelectedUserForReview(null)}
                        className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Scanned Document OCR Verification Layouts</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border">
                          <span className="font-bold text-[10px] text-gray-400 block mb-1">Aadhaar Card Scanned</span>
                          <div className="h-20 bg-linear-to-br from-indigo-500/10 to-indigo-950/20 rounded border flex items-center justify-center font-mono text-[9px] text-center p-2 text-indigo-500">
                            ID: {selectedUserForReview.aadhaarNo}
                          </div>
                        </div>

                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border">
                          <span className="font-bold text-[10px] text-gray-400 block mb-1">PAN Card Scanned</span>
                          <div className="h-20 bg-linear-to-br from-yellow-500/10 to-yellow-950/20 rounded border flex items-center justify-center font-mono text-[9px] text-center p-2 text-yellow-600">
                            PAN: {selectedUserForReview.panNo || 'N/A'}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border space-y-1">
                        <span className="font-bold text-[10px] text-gray-400 block mb-1">Cancelled Cheque Scanned</span>
                        <div className="h-20 bg-linear-to-br from-emerald-500/10 to-emerald-950/20 rounded border flex flex-col justify-center items-center font-mono text-[9px] text-center p-2 text-emerald-600">
                          <span>A/C: {selectedUserForReview.bankAccount}</span>
                          <span>IFSC: {selectedUserForReview.ifscCode}</span>
                        </div>
                      </div>

                      <div className="p-4 bg-brand-primary/5 rounded-2xl border border-brand-primary/10">
                        <span className="font-bold block uppercase text-[10px] text-brand-primary">Bank details matching UPI identity:</span>
                        <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200 mt-1">{selectedUserForReview.upiId}</p>
                      </div>

                      {showRejectInput ? (
                        <div className="space-y-2.5 animate-fade-in p-3 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
                          <label className="text-[10px] font-bold text-rose-500 block uppercase">Specify Rejection Reason</label>
                          <select
                            value={kycRejectNote}
                            onChange={(e) => setKycRejectNote(e.target.value)}
                            className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 text-xs focus:outline-hidden font-bold"
                          >
                            <option value="">-- Choose Reason --</option>
                            <option value="Uploaded Aadhaar image is blurry">Aadhaar image blurry</option>
                            <option value="Invalid IFSC Bank Code or Account No">Invalid IFSC or A/C</option>
                            <option value="Identity name does not match Bank Records">Name Mismatch</option>
                          </select>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowRejectInput(false)}
                              className="px-3 py-1.5 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg font-bold"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleAdminRejectKyc(selectedUserForReview.phone)}
                              className="px-3 py-1.5 bg-rose-500 text-white rounded-lg font-bold"
                            >
                              Confirm Rejection
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2 justify-end pt-4 border-t dark:border-gray-800">
                          <button
                            onClick={() => setShowRejectInput(true)}
                            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-500 font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                          >
                            <X className="w-4 h-4" /> Reject KYC
                          </button>
                          <button
                            onClick={() => handleAdminApproveKyc(selectedUserForReview.phone)}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/15"
                          >
                            <Check className="w-4 h-4" /> Approve KYC
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

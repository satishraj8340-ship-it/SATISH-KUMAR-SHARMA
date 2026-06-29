/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Compass, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, 
  Users, ShoppingCart, TrendingUp, Store, MapPin, Truck, 
  Wallet, ShieldCheck, Sun, HelpCircle, Award, ArrowRight,
  Plus, Check, AlertCircle, BarChart3, Database
} from 'lucide-react';
import { PartnerRole } from '../types';

interface OnboardingTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'customer' | 'merchant' | 'ppm';
  language: 'EN' | 'HI';
}

interface OnboardingStep {
  title: string;
  subtitle: string;
  description: string;
  lucideIcon: React.ElementType;
}

const STEPS_DATA: Record<'customer' | 'merchant' | 'ppm', OnboardingStep[]> = {
  customer: [
    {
      title: 'Direct-from-Manufacturer Rates',
      subtitle: 'By-passing Multi-Tier Wholesalers',
      description: 'As a consumer, you gain access to essential daily grains and groceries at up to 35% lower prices compared to local retail market lists. All goods are sourced directly from food factories and farmers.',
      lucideIcon: ShoppingCart
    },
    {
      title: 'Consolidated Community Pool Sourcing',
      subtitle: 'Strength in Numbers',
      description: 'We bundle your village household grocery demands together. Once the community pool is full, the dispatch truck delivers at incredible volume discount parity to your nearest block hub.',
      lucideIcon: Users
    },
    {
      title: 'Zero-Cost Local Store Pickup',
      subtitle: 'Delivered Right to Your Neighborhood',
      description: 'Collect your orders securely from your designated local Kirana store pickup point. There are zero shipping or door delivery surcharges. Get standard quality grains with friendly, face-to-face handovers.',
      lucideIcon: MapPin
    }
  ],
  merchant: [
    {
      title: 'Premium Wholesale Sourcing Catalog',
      subtitle: 'Boost Your Shop Profit Margins',
      description: 'Stock your Kirana store shelves directly from the RSPSA supply chain with 40% cheaper cargo pricing. Bypass town brokers and unlock massive wholesale margin growth on standard food goods.',
      lucideIcon: Store
    },
    {
      title: 'Zero-Cost Solar Cold-Chain program',
      subtitle: 'Unlock Fresh Milk, Curd & Frozen Items',
      description: 'Eligible Kirana partners receive solar-powered cooling appliances at zero upfront deposit. Safely store and retail perishable dairy products even during frequent village power cutouts.',
      lucideIcon: Sun
    },
    {
      title: 'Collateral-Free Instant Credit lines',
      subtitle: 'Never Run Out of Working Capital',
      description: 'Keep your inventory stocked without financial pressure. Gain access to revolving digital credit lines from ₹10,000 to ₹1 Lakh with flexible weekly repayment structures.',
      lucideIcon: Wallet
    }
  ],
  ppm: [
    {
      title: 'Panchayat Demand Aggregation',
      subtitle: 'Empower Your Local Micro-economy',
      description: 'As a Panchayat PPM partner, you collect and log weekly grain and grocery demand quotas from village families digitally using the easy-to-navigate KamaiKart app.',
      lucideIcon: Database
    },
    {
      title: 'Freight Dispatch Coordination',
      subtitle: 'Supervise Doorstep Bulk Deliveries',
      description: 'Track supply trucks dispatched from district warehouses. Oversee bulk cargo gate receipts and distribute orders safely to designated local Kirana pickup hubs inside your panchayat area.',
      lucideIcon: Truck
    },
    {
      title: 'Pristine Commission Dividends',
      subtitle: 'Earn Steady Income of ₹10k - ₹30k/month',
      description: 'Earn lucrative commission splits on every single aggregated order. Enjoy instant wallet credits with secure bank transfers via zero-deduction corporate UPI nodes.',
      lucideIcon: Wallet
    }
  ]
};

export default function OnboardingTutorial({ isOpen, onClose, initialRole = 'customer', language }: OnboardingTutorialProps) {
  const [role, setRole] = useState<'customer' | 'merchant' | 'ppm'>(initialRole);
  const [stepIndex, setStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Simulation interactivity states
  const [simCartAdded, setSimCartAdded] = useState(false);
  const [simPoolProgress, setSimPoolProgress] = useState(85);
  const [simPoolJoined, setSimPoolJoined] = useState(false);
  const [simHubSelected, setSimHubSelected] = useState(false);

  const [simMerchantStocked, setSimMerchantStocked] = useState(false);
  const [simSolarActive, setSimSolarActive] = useState(false);
  const [simCreditDisbursed, setSimCreditDisbursed] = useState(false);

  const [simDemandSynced, setSimDemandSynced] = useState(false);
  const [simTruckAuthorized, setSimTruckAuthorized] = useState(false);
  const [simWalletWithdrawn, setSimWalletWithdrawn] = useState(false);

  // Sync role update if initialRole changes
  useEffect(() => {
    setRole(initialRole);
    setStepIndex(0);
    setIsCompleted(false);
    resetSimulation();
  }, [initialRole, isOpen]);

  const resetSimulation = () => {
    setSimCartAdded(false);
    setSimPoolProgress(85);
    setSimPoolJoined(false);
    setSimHubSelected(false);
    setSimMerchantStocked(false);
    setSimSolarActive(false);
    setSimCreditDisbursed(false);
    setSimDemandSynced(false);
    setSimTruckAuthorized(false);
    setSimWalletWithdrawn(false);
  };

  if (!isOpen) return null;

  const activeSteps = STEPS_DATA[role];
  const activeStep = activeSteps[stepIndex];
  const StepIcon = activeStep ? activeStep.lucideIcon : Compass;

  const handleNext = () => {
    if (stepIndex < activeSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const handleRoleChange = (newRole: 'customer' | 'merchant' | 'ppm') => {
    setRole(newRole);
    setStepIndex(0);
    setIsCompleted(false);
    resetSimulation();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-950 w-full max-w-5xl rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[650px]">
        
        {/* LEFT COLUMN: EDUCATIONAL CONTROLS & COPILOT DESK */}
        <div className="w-full lg:w-[45%] bg-slate-50 dark:bg-gray-900/40 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800">
          
          {/* Header row */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <img 
                  src="/input_file_1.png" 
                  alt="KamaiKart Logo" 
                  className="h-7 w-auto object-contain bg-white px-1.5 py-0.5 rounded-lg border border-gray-200 dark:border-gray-700" 
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs font-bold text-brand-primary tracking-widest font-mono">ONBOARDING CENTER</span>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Role switch tabs */}
            {!isCompleted && (
              <div className="mb-6">
                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-2 font-mono">TAILORED ECOSYSTEM ROLES</label>
                <div className="grid grid-cols-3 gap-1 bg-gray-100 dark:bg-gray-950 p-1 rounded-xl border border-gray-200/50 dark:border-gray-800">
                  {(['customer', 'merchant', 'ppm'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleChange(r)}
                      className={`py-2 px-1 rounded-lg text-[10px] font-bold capitalize transition-all cursor-pointer ${
                        role === r 
                          ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10' 
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                      }`}
                    >
                      {r === 'customer' ? 'Consumer' : r === 'merchant' ? 'Kirana Store' : 'Panchayat Agent'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Stepper content body */}
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div 
                key={`${role}-${stepIndex}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col justify-center py-4 sm:py-6 space-y-4"
              >
                {/* Step badge */}
                <div className="flex items-center gap-1.5 text-brand-primary font-bold text-[10px] uppercase tracking-widest font-mono">
                  <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center font-bold text-[10px]">
                    {stepIndex + 1}
                  </div>
                  <span>Step {stepIndex + 1} of {activeSteps.length}</span>
                </div>

                {/* Main step Title & Icon */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary">
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white font-display leading-tight">
                      {activeStep.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-brand-secondary dark:text-brand-accent font-semibold font-mono uppercase tracking-wider">
                    {activeStep.subtitle}
                  </p>
                </div>

                {/* Step Description text */}
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans pt-1">
                  {activeStep.description}
                </p>

                {/* Helpful Tip block */}
                <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/80 dark:border-blue-900/40 rounded-2xl flex gap-2">
                  <Sparkles className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 block">PRO-TIP FOR {role.toUpperCase()}S:</span>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal font-sans">
                      {role === 'customer' && "Invite 3 neighbors to join your consolidated shipping pool to unlock maximum discount caps even faster."}
                      {role === 'merchant' && "By stocking our premium wholesale grocery line, you make up to ₹4,000 extra profit margin per ton of grain."}
                      {role === 'ppm' && "PPM leaders who oversee multiple blocks are eligible for an annual performance bonus and digital scaling support."}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Completion Desk */
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col justify-center py-4 sm:py-6 text-center space-y-5 animate-fade-in"
              >
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner border border-emerald-500/20">
                  <Award className="w-7 h-7 text-emerald-500" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-base font-black text-gray-900 dark:text-white uppercase font-display">Onboarding Completed!</h3>
                  <p className="text-xs text-brand-secondary dark:text-emerald-400 font-bold font-mono">YOU ARE READY TO NAVIGATE KAMAIKART</p>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans max-w-xs mx-auto">
                    You have successfully completed the step-by-step interactive walk-through for the **{role.toUpperCase()}** path.
                  </p>
                </div>

                {/* Certified Badge widget */}
                <div className="p-3 bg-slate-50 dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-800/80 text-left space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" />
                    <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 font-mono">SECURE DIGITAL WORKSPACE READY</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-normal font-sans">
                    Registering with this role gives you absolute legal rights under the RSPSA Retail procurement guidelines. All your transactions are secured.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stepper buttons footer */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
            {!isCompleted ? (
              <>
                <button
                  disabled={stepIndex === 0}
                  onClick={handleBack}
                  className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors ${
                    stepIndex === 0 
                      ? 'text-gray-300 dark:text-gray-700 pointer-events-none' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>

                <div className="flex gap-1">
                  {activeSteps.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === stepIndex ? 'w-4 bg-brand-primary' : 'w-1.5 bg-gray-200 dark:bg-gray-800'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-brand-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer shadow-lg shadow-brand-primary/10 hover:shadow-brand-primary/20 transition-all"
                >
                  {stepIndex === activeSteps.length - 1 ? 'Finish Guide' : 'Next'} <ChevronRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="w-full grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsCompleted(false)}
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl text-xs cursor-pointer transition-colors text-center"
                >
                  Review Role Flow
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-brand-secondary hover:bg-emerald-700 text-white font-black rounded-xl text-xs cursor-pointer shadow-lg shadow-brand-secondary/10 transition-colors text-center"
                >
                  Start Using App
                </button>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: THE INTERACTIVE GRAPHICAL PLATFORM SIMULATOR */}
        <div className="w-full lg:w-[55%] bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle background glow mesh */}
          <div className="absolute inset-0 bg-radial-at-b from-brand-primary/15 via-transparent to-transparent pointer-events-none"></div>
          
          {/* Header instructions overlay */}
          <div className="relative z-10 text-center lg:text-left">
            <span className="text-[9px] bg-brand-accent/20 text-brand-accent font-bold font-mono px-2 py-0.5 rounded-full tracking-wider uppercase">
              INTERACTIVE SIMULATION HUD
            </span>
            <p className="text-[10px] text-gray-400 mt-1 leading-normal">
              {!isCompleted 
                ? 'Follow instructions below to simulate active platform features in real time.' 
                : 'Onboarding completed. You are authorized to access the live KamaiKart workspace.'
              }
            </p>
          </div>

          {/* SIMULATION MOCKUP BODY */}
          <div className="relative z-10 my-6 flex-1 flex items-center justify-center">
            
            {/* PHONE WORKSPACE MOCKUP FRAME */}
            <div className="w-full max-w-sm bg-slate-950 rounded-3xl border-4 border-slate-800 p-4 shadow-2xl relative min-h-[360px] flex flex-col justify-between">
              
              {/* Phone ear-speaker slot */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-slate-800 rounded-full flex items-center justify-center">
                <div className="w-8 h-1 bg-slate-900 rounded-full"></div>
              </div>

              {/* Simulated Phone Content Header */}
              <div className="border-b border-gray-800 pb-2 mb-2 flex justify-between items-center pt-2">
                <div className="flex items-center gap-1.5">
                  <img 
                    src="/input_file_1.png" 
                    alt="Logo" 
                    className="h-4.5 w-auto object-contain bg-white p-0.5 rounded shrink-0" 
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[10px] font-extrabold tracking-tight text-white font-mono">KamaiKart</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] text-gray-400 font-mono tracking-wider">GAYA SOUTH HUB</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
              </div>

              {/* SCREEN INTERACTION PANELS BASED ON SELECTED ECOSYSTEM ROLE */}
              <div className="flex-1 flex flex-col justify-center">
                
                {/* 1. CUSTOMER ACTIVE STEPS VIEW */}
                {role === 'customer' && !isCompleted && (
                  <div className="space-y-3.5 animate-fade-in text-left text-[11px]">
                    
                    {/* CUSTOMER STEP 1: Sourcing products replenishment */}
                    {stepIndex === 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] text-brand-accent font-bold font-mono">Sourced Catalog</span>
                          <span className="text-[8px] text-emerald-400 font-mono">Save Up to 35%</span>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between gap-2">
                          <div className="space-y-0.5">
                            <h4 className="font-bold text-white text-[10px]">Premium Basmati Rice (10kg Bag)</h4>
                            <p className="text-[9px] text-gray-400 font-sans">Factory Direct Price: <span className="text-emerald-400 font-bold font-mono">₹480</span> <span className="line-through text-gray-600">₹750</span></p>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => setSimCartAdded(!simCartAdded)}
                            className={`px-2.5 py-1.5 rounded-lg font-bold text-[9px] flex items-center gap-1 transition-all shrink-0 cursor-pointer ${
                              simCartAdded 
                                ? 'bg-emerald-500 text-slate-950' 
                                : 'bg-brand-primary text-white hover:bg-blue-700'
                            }`}
                          >
                            {simCartAdded ? (
                              <>
                                <Check className="w-3 h-3" /> Added
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" /> Add to Basket
                              </>
                            )}
                          </button>
                        </div>

                        {/* Interactive hotspot alert overlay */}
                        {!simCartAdded && (
                          <div className="p-2.5 bg-brand-primary/10 border border-brand-primary/30 rounded-xl animate-bounce flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
                            <span className="text-[9px] text-blue-300 font-mono font-bold">Action Required: Click "Add to Basket" to simulate.</span>
                          </div>
                        )}
                        {simCartAdded && (
                          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Added! Sourced savings updated. Click "Next" above.</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* CUSTOMER STEP 2: Pool consolidation */}
                    {stepIndex === 1 && (
                      <div className="space-y-2">
                        <span className="text-[9px] text-brand-accent font-bold font-mono">Community Pooling</span>
                        
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 space-y-2.5">
                          <div className="flex justify-between items-center text-[9px]">
                            <span className="font-bold text-white">Gaya Village Cluster Pool #4</span>
                            <span className="font-mono text-emerald-400 font-black">{simPoolProgress}% Full</span>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-linear-to-r from-blue-500 to-emerald-400 transition-all duration-500"
                              style={{ width: `${simPoolProgress}%` }}
                            />
                          </div>

                          <div className="flex justify-between items-center text-[8px] text-gray-400">
                            <span>Sourcing Dispatch Target: 100%</span>
                            <span>Unlocks bulk price parity</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (!simPoolJoined) {
                                setSimPoolProgress(100);
                                setSimPoolJoined(true);
                              }
                            }}
                            className={`w-full py-2 rounded-lg font-bold text-[9px] transition-all cursor-pointer ${
                              simPoolJoined 
                                ? 'bg-emerald-500 text-slate-950 font-black pointer-events-none' 
                                : 'bg-brand-secondary text-white hover:bg-emerald-600'
                            }`}
                          >
                            {simPoolJoined ? '✓ Joined Pool! Cargo Sourcing Approved' : 'Join Pool & Invite Neighbors'}
                          </button>
                        </div>

                        {!simPoolJoined ? (
                          <div className="p-2.5 bg-brand-primary/10 border border-brand-primary/30 rounded-xl animate-bounce flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
                            <span className="text-[9px] text-blue-300 font-mono font-bold">Action Required: Click "Join Pool" to unlock dispatch.</span>
                          </div>
                        ) : (
                          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Dispatch Goal unlocked! Community saved ₹2,400.</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* CUSTOMER STEP 3: Delivery Settle */}
                    {stepIndex === 2 && (
                      <div className="space-y-2">
                        <span className="text-[9px] text-brand-accent font-bold font-mono">Select Delivery Point</span>
                        
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 space-y-2">
                          <h4 className="text-[10px] font-bold text-white mb-1">Local Kirana Sourcing Depots:</h4>
                          
                          <div 
                            onClick={() => setSimHubSelected(true)}
                            className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                              simHubSelected 
                                ? 'bg-emerald-500/10 border-emerald-500' 
                                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-white text-[9px]">Satish Kirana Store</span>
                              <span className="text-[8px] text-emerald-400 font-bold">0.3 km away</span>
                            </div>
                            <p className="text-[8px] text-gray-400 mt-0.5">Gaya Village South Square block, Bihar.</p>
                          </div>
                        </div>

                        {!simHubSelected ? (
                          <div className="p-2.5 bg-brand-primary/10 border border-brand-primary/30 rounded-xl animate-bounce flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
                            <span className="text-[9px] text-blue-300 font-mono font-bold">Action Required: Select the local Kirana store.</span>
                          </div>
                        ) : (
                          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 space-y-1">
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Hub Configured Successfully!</span>
                            </div>
                            <p className="text-[8px] text-emerald-400/80 leading-normal pl-5">Proceeding to complete the onboarding guide.</p>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                )}

                {/* 2. MERCHANT (KIRANA PARTNER) ACTIVE STEPS VIEW */}
                {role === 'merchant' && !isCompleted && (
                  <div className="space-y-3.5 animate-fade-in text-left text-[11px]">
                    
                    {/* MERCHANT STEP 1: Bulk Sourcing Catalog */}
                    {stepIndex === 0 && (
                      <div className="space-y-2">
                        <span className="text-[9px] text-brand-accent font-bold font-mono">Wholesale Merchant Catalog</span>
                        
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 space-y-2">
                          <div className="flex justify-between items-center text-[9px] border-b border-slate-800 pb-1.5">
                            <span className="font-bold text-white">Sourced Wheat Atta (50kg bag)</span>
                            <span className="text-emerald-400 font-mono font-bold">₹950 <span className="text-gray-500 line-through text-[8px]">₹1,400</span></span>
                          </div>
                          
                          <div className="flex justify-between text-[8px] text-gray-400">
                            <span>Your Retailing Margin: 45%+</span>
                            <span className="text-emerald-400 font-semibold font-mono">Profit per bag: +₹450</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSimMerchantStocked(!simMerchantStocked)}
                            className={`w-full py-2 rounded-lg font-bold text-[9px] transition-all cursor-pointer ${
                              simMerchantStocked 
                                ? 'bg-emerald-500 text-slate-950 font-black' 
                                : 'bg-brand-primary text-white hover:bg-blue-700'
                            }`}
                          >
                            {simMerchantStocked ? '✓ Cargo Stock Reserved' : 'Place Wholesale Stock Order'}
                          </button>
                        </div>

                        {!simMerchantStocked ? (
                          <div className="p-2.5 bg-brand-primary/10 border border-brand-primary/30 rounded-xl animate-bounce flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
                            <span className="text-[9px] text-blue-300 font-mono font-bold">Action Required: Click "Place Wholesale Order" to check profit.</span>
                          </div>
                        ) : (
                          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Stock secured! Sourced savings reflected in wallet.</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* MERCHANT STEP 2: Solar Cold-Chain program */}
                    {stepIndex === 1 && (
                      <div className="space-y-2">
                        <span className="text-[9px] text-brand-accent font-bold font-mono">Cold-Chain Appliance Program</span>
                        
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${simSolarActive ? 'bg-emerald-500/15 text-emerald-400 animate-pulse' : 'bg-slate-800 text-gray-400'}`}>
                              <Sun className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="font-bold text-white text-[9.5px]">RSPSA Smart Solar Cooler</h4>
                              <p className="text-[8px] text-gray-400">Zero upfront cost for verified Kiranas.</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-1 border-t border-slate-800 text-[8.5px]">
                            <span className="text-gray-400">Status:</span>
                            <span className={simSolarActive ? 'text-emerald-400 font-bold' : 'text-gray-500 font-mono'}>
                              {simSolarActive ? '● ALLOCATED & ACTIVE' : 'PENDING APPLICATION'}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSimSolarActive(!simSolarActive)}
                            className={`w-full py-2 rounded-lg font-bold text-[9px] transition-all cursor-pointer ${
                              simSolarActive 
                                ? 'bg-emerald-500 text-slate-950 font-black' 
                                : 'bg-brand-secondary text-white hover:bg-emerald-600'
                            }`}
                          >
                            {simSolarActive ? '✓ Solar Appliance Settle Approved' : 'Request Solar Cooler Delivery'}
                          </button>
                        </div>

                        {!simSolarActive ? (
                          <div className="p-2.5 bg-brand-primary/10 border border-brand-primary/30 rounded-xl animate-bounce flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
                            <span className="text-[9px] text-blue-300 font-mono font-bold">Action Required: Click "Request Solar Cooler".</span>
                          </div>
                        ) : (
                          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Application logged. Direct field executive assignment ready.</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* MERCHANT STEP 3: Working Capital Credit Limit */}
                    {stepIndex === 2 && (
                      <div className="space-y-2">
                        <span className="text-[9px] text-brand-accent font-bold font-mono">Collateral-Free Credit Line</span>
                        
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 space-y-2">
                          <div className="flex justify-between items-center text-[9px]">
                            <span className="text-gray-400 font-sans">Revolving Capital Limit:</span>
                            <span className="text-brand-accent font-mono font-black text-xs">₹50,000</span>
                          </div>

                          <div className="flex justify-between items-center text-[8.5px]">
                            <span className="text-gray-400">Available Balance:</span>
                            <span className="text-white font-mono font-bold">
                              {simCreditDisbursed ? '₹50,000' : '₹0.00'}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSimCreditDisbursed(true)}
                            className={`w-full py-2 rounded-lg font-bold text-[9px] transition-all cursor-pointer ${
                              simCreditDisbursed 
                                ? 'bg-emerald-500 text-slate-950 font-black pointer-events-none' 
                                : 'bg-brand-primary text-white hover:bg-blue-700'
                            }`}
                          >
                            {simCreditDisbursed ? '✓ Credit Disbursed to Wallet' : 'Disburse Credit Line'}
                          </button>
                        </div>

                        {!simCreditDisbursed ? (
                          <div className="p-2.5 bg-brand-primary/10 border border-brand-primary/30 rounded-xl animate-bounce flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
                            <span className="text-[9px] text-blue-300 font-mono font-bold">Action Required: Click "Disburse Credit Line".</span>
                          </div>
                        ) : (
                          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Credit available! Zero interest weekly repayment active.</span>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                )}

                {/* 3. PPM (PANCHAYAT PARTNER) ACTIVE STEPS VIEW */}
                {role === 'ppm' && !isCompleted && (
                  <div className="space-y-3.5 animate-fade-in text-left text-[11px]">
                    
                    {/* PPM STEP 1: Micro-demographic Demand Aggregation */}
                    {stepIndex === 0 && (
                      <div className="space-y-2">
                        <span className="text-[9px] text-brand-accent font-bold font-mono">Panchayat Demand Aggregation</span>
                        
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 space-y-2">
                          <div className="flex justify-between text-[8px] text-gray-400">
                            <span>Assigned Panchayat Zone:</span>
                            <span className="text-white font-bold">Gaya South Ward 4</span>
                          </div>

                          <div className="space-y-1.5 bg-slate-950 p-2 rounded-lg border border-slate-800">
                            <div className="flex justify-between items-center text-[8.5px]">
                              <span>Household Demand Quota:</span>
                              <span className="text-emerald-400 font-mono font-bold">{simDemandSynced ? '2,400 Kg' : '0 Kg'}</span>
                            </div>
                            <div className="flex justify-between items-center text-[8.5px]">
                              <span>Active Families:</span>
                              <span>{simDemandSynced ? '45 Families' : '0 Families'}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSimDemandSynced(!simDemandSynced)}
                            className={`w-full py-2 rounded-lg font-bold text-[9px] transition-all cursor-pointer ${
                              simDemandSynced 
                                ? 'bg-emerald-500 text-slate-950 font-black' 
                                : 'bg-brand-primary text-white hover:bg-blue-700'
                            }`}
                          >
                            {simDemandSynced ? '✓ Demands Synced' : 'Sync Village Demand'}
                          </button>
                        </div>

                        {!simDemandSynced ? (
                          <div className="p-2.5 bg-brand-primary/10 border border-brand-primary/30 rounded-xl animate-bounce flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
                            <span className="text-[9px] text-blue-300 font-mono font-bold">Action Required: Click "Sync Village Demand" to aggregate.</span>
                          </div>
                        ) : (
                          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Consolidated order generated! Ready for freight routing.</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* PPM STEP 2: Freight cargo dispatch and Gate inward */}
                    {stepIndex === 1 && (
                      <div className="space-y-2">
                        <span className="text-[9px] text-brand-accent font-bold font-mono">Consolidated Freight Supervisor</span>
                        
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 space-y-2">
                          <div className="flex items-center gap-2">
                            <Truck className="w-5 h-5 text-brand-accent shrink-0 animate-bounce" />
                            <div className="space-y-0.5">
                              <h4 className="font-bold text-white text-[9px]">Grains Supply Truck #BR-01G-4452</h4>
                              <p className="text-[8px] text-emerald-400">Status: Arrived at Block Gate</p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSimTruckAuthorized(!simTruckAuthorized)}
                            className={`w-full py-2 rounded-lg font-bold text-[9px] transition-all cursor-pointer ${
                              simTruckAuthorized 
                                ? 'bg-emerald-500 text-slate-950 font-black' 
                                : 'bg-brand-secondary text-white hover:bg-emerald-600'
                            }`}
                          >
                            {simTruckAuthorized ? '✓ Dispatch Gates Open' : 'Authorize Gate Inward'}
                          </button>
                        </div>

                        {!simTruckAuthorized ? (
                          <div className="p-2.5 bg-brand-primary/10 border border-brand-primary/30 rounded-xl animate-bounce flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
                            <span className="text-[9px] text-blue-300 font-mono font-bold">Action Required: Click "Authorize Gate Inward" to accept truck.</span>
                          </div>
                        ) : (
                          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Authorized! Cargo handovers initialized. Click "Next" above.</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* PPM STEP 3: Instant wallet payout withdraw */}
                    {stepIndex === 2 && (
                      <div className="space-y-2">
                        <span className="text-[9px] text-brand-accent font-bold font-mono">Accrued Commission Payouts</span>
                        
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 space-y-2">
                          <div className="flex justify-between items-center text-[9px]">
                            <span className="text-gray-400 font-sans">Commission Earned:</span>
                            <span className="text-emerald-400 font-mono font-black text-xs">₹6,750</span>
                          </div>

                          <div className="flex justify-between items-center text-[8.5px]">
                            <span className="text-gray-400">Payout Destination:</span>
                            <span className="text-white font-mono font-bold">
                              State Bank of India
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSimWalletWithdrawn(true)}
                            className={`w-full py-2 rounded-lg font-bold text-[9px] transition-all cursor-pointer ${
                              simWalletWithdrawn 
                                ? 'bg-emerald-500 text-slate-950 font-black pointer-events-none' 
                                : 'bg-brand-primary text-white hover:bg-blue-700'
                            }`}
                          >
                            {simWalletWithdrawn ? '✓ Wallet Balance Transferred' : 'Withdraw to State Bank UPI'}
                          </button>
                        </div>

                        {!simWalletWithdrawn ? (
                          <div className="p-2.5 bg-brand-primary/10 border border-brand-primary/30 rounded-xl animate-bounce flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
                            <span className="text-[9px] text-blue-300 font-mono font-bold">Action Required: Click "Withdraw to State Bank UPI".</span>
                          </div>
                        ) : (
                          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Transaction Approved! Bank processing took 2 seconds.</span>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                )}

                {/* 4. COMPLETION CELEBRATION VIEW */}
                {isCompleted && (
                  <div className="p-4 space-y-4 text-center animate-fade-in">
                    <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-xl">
                      ✓
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-white uppercase font-mono">PORTAL ACCESS GRANTED</h4>
                      <p className="text-[10px] text-gray-400 leading-normal max-w-xs mx-auto">
                        Your simulation logs have been recorded in the local cache. Start active work on KamaiKart!
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-left space-y-1.5 text-[9px] font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-500">License ID</span>
                        <span className="text-emerald-400 font-bold">#KM-OK-{(Math.random()*900000+100000).toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Assigned Role</span>
                        <span className="text-white capitalize">{role} Partner</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Ecosystem Parity</span>
                        <span className="text-emerald-400">100% Sourcing verified</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Simulated Phone Home button slot */}
              <div className="h-4 flex items-center justify-center">
                <div className="w-20 h-1 bg-slate-800 rounded-full"></div>
              </div>

            </div>

          </div>

          {/* Quick legal notice on simulator */}
          <div className="text-[10px] text-gray-400/80 leading-normal text-center font-sans mt-2 relative z-10">
            Interactive mockup demonstrates actual KamaiKart App screens for {role.toUpperCase()} roles. Sourced products, savings, solar logistics, and payout cycles are structured according to ISO 9001 guidelines.
          </div>

        </div>

      </div>
    </div>
  );
}

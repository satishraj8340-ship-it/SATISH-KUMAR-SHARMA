/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, CheckCircle, ChevronRight, AlertCircle, 
  UserCheck, Award, FileSpreadsheet, MapPin, Briefcase, Sparkles, Check, ClipboardCheck
} from 'lucide-react';
import { PARTNER_ROLE_DETAILS } from '../data/websiteContent';
import { PartnerRole, RegistrationFormData } from '../types';

interface BecomePartnerViewProps {
  selectedRole: PartnerRole;
  setSelectedRole: (role: PartnerRole) => void;
  language: 'EN' | 'HI';
}

const STATES_AND_DISTRICTS = [
  { state: 'Bihar', districts: ['Gaya', 'Patna', 'Deoria', 'Nalanda', 'Muzaffarpur'] },
  { state: 'Uttar Pradesh', districts: ['Gorakhpur', 'Deoria', 'Varanasi', 'Lucknow', 'Ballia'] },
  { state: 'Rajasthan', districts: ['Alwar', 'Jaipur', 'Udaipur', 'Kota', 'Jodhpur'] },
  { state: 'Madhya Pradesh', districts: ['Indore', 'Bhopal', 'Gwalior', 'Jabalpur'] }
];

export default function BecomePartnerView({ selectedRole, setSelectedRole, language }: BecomePartnerViewProps) {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<RegistrationFormData>({
    role: selectedRole,
    fullName: '',
    email: '',
    phone: '',
    state: 'Bihar',
    district: 'Gaya',
    block: '',
    address: '',
    experienceYears: '2',
    businessName: '',
    investmentCapacity: '₹2.5 Lakhs to ₹5 Lakhs',
    aadhaarNo: '',
    panNo: ''
  });

  // Sync role changes if props selectedRole updates
  useEffect(() => {
    setFormData((prev) => ({ ...prev, role: selectedRole }));
  }, [selectedRole]);

  const activeDetails = PARTNER_ROLE_DETAILS[selectedRole];

  const handleNextStep = () => {
    const stepErrors: string[] = [];
    
    if (wizardStep === 1) {
      if (!formData.fullName.trim()) stepErrors.push('Full Name is required.');
      if (!formData.phone.trim() || formData.phone.length !== 10 || isNaN(Number(formData.phone))) {
        stepErrors.push('Please enter a valid 10-digit mobile number.');
      }
      if (formData.aadhaarNo && (formData.aadhaarNo.length !== 12 || isNaN(Number(formData.aadhaarNo)))) {
        stepErrors.push('Aadhaar number must be exactly 12 digits.');
      }
    } else if (wizardStep === 2) {
      if (!formData.block?.trim()) stepErrors.push('Block administration area is required.');
      if (!formData.address.trim()) stepErrors.push('Physical address is required.');
    }

    if (stepErrors.length > 0) {
      setErrors(stepErrors);
    } else {
      setErrors([]);
      setWizardStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setErrors([]);
    setWizardStep((prev) => prev - 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitErrors: string[] = [];
    
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      submitErrors.push('Basic details missing.');
    }

    if (submitErrors.length > 0) {
      setErrors(submitErrors);
    } else {
      setErrors([]);
      setFormSubmitted(true);
    }
  };

  const resetWizard = () => {
    setWizardOpen(false);
    setWizardStep(1);
    setFormSubmitted(false);
    setErrors([]);
    setFormData({
      role: selectedRole,
      fullName: '',
      email: '',
      phone: '',
      state: 'Bihar',
      district: 'Gaya',
      block: '',
      address: '',
      experienceYears: '2',
      businessName: '',
      investmentCapacity: '₹2.5 Lakhs to ₹5 Lakhs',
      aadhaarNo: '',
      panNo: ''
    });
  };

  const rolesList = [
    { id: 'customer', label: 'Consumer' },
    { id: 'merchant', label: 'Kirana Store' },
    { id: 'ppm', label: 'Panchayat PPM' },
    { id: 'ppm-leader', label: 'PPM Leader' },
    { id: 'block-manager', label: 'Block Manager' },
    { id: 'district-manager', label: 'District Manager' },
    { id: 'state-manager', label: 'State Manager' },
    { id: 'franchise', label: 'Block Franchise' },
    { id: 'distributor', label: 'Distributor' }
  ] as { id: PartnerRole; label: string }[];

  const activeDistricts = STATES_AND_DISTRICTS.find(s => s.state === formData.state)?.districts || [];

  return (
    <div className="space-y-20 pb-20 bg-white dark:bg-gray-950 transition-colors">
      
      {/* 1. PROFESSIONAL ROLE BANNER */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 via-indigo-950 to-emerald-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-radial-at-t from-brand-primary/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-8 space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              RSPSA PARTNERSHIP PORTAL
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
              {activeDetails.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              {activeDetails.tagline}
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <button
              onClick={() => { setWizardOpen(true); }}
              className="px-6 py-3.5 bg-brand-accent text-gray-950 font-black rounded-xl shadow-2xl hover:scale-102 transition-transform cursor-pointer flex items-center gap-2 text-xs"
            >
              <ClipboardCheck className="w-5 h-5 text-gray-950" />
              Launch Registration Form
            </button>
          </div>

        </div>
      </section>

      {/* 2. ROLE SELECTION HUD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-mono">Ecosystem Role Selection</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">Select Your Partner Destination</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">Click through the corporate roles below to view custom specifications and eligibility terms.</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {rolesList.map((rl) => (
            <button
              key={rl.id}
              onClick={() => { setSelectedRole(rl.id); }}
              className={`px-4 py-2.5 text-xs font-bold rounded-xl cursor-pointer transition-all ${
                selectedRole === rl.id 
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/15 scale-102 font-extrabold' 
                  : 'bg-slate-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-800 hover:border-gray-300'
              }`}
            >
              {rl.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. DYNAMIC SPECIFICATION CONTENT BOX (ELIGIBILITY, BENEFITS, INCOME) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
          
          {/* Eligibility checklist block */}
          <div className="lg:col-span-6 space-y-5">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-brand-primary font-mono flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-primary" />
              Minimum Eligibility checklist
            </h4>
            
            <div className="space-y-3">
              {activeDetails.eligibility.map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-brand-primary shrink-0 mt-0.5 font-bold">
                    {idx + 1}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            {/* Income potential banner */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 space-y-2">
              <h5 className="text-[11px] font-bold text-brand-secondary uppercase tracking-wider font-mono">Projected Income Opportunity</h5>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold leading-relaxed font-sans">
                {activeDetails.income}
              </p>
            </div>
          </div>

          {/* Benefits list block */}
          <div className="lg:col-span-6 space-y-5">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-brand-secondary font-mono flex items-center gap-1.5">
              <Users className="w-4 h-4 text-brand-secondary" />
              Exclusive Partner Benefits
            </h4>

            <div className="space-y-4">
              {activeDetails.benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-3 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="font-sans">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setWizardOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 bg-brand-primary hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-lg cursor-pointer text-center"
              >
                Apply for {selectedRole.toUpperCase()} Position
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. THE INTERACTIVE REGISTRATION MULTI-STEP WIZARD */}
      {wizardOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-950 w-full max-w-xl rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-slide-in">
            
            {/* Header portion */}
            <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center border-b border-gray-800">
              <div className="space-y-1">
                <span className="text-[10px] text-brand-accent uppercase tracking-widest font-mono">RSPSA Portal - STEP {wizardStep} OF 3</span>
                <p className="text-xs font-bold text-white">Application: {activeDetails.title}</p>
              </div>
              <button 
                onClick={resetWizard} 
                className="text-gray-400 hover:text-white font-mono text-xs cursor-pointer bg-white/10 px-2.5 py-1 rounded"
              >
                Cancel
              </button>
            </div>

            {/* Error notifications */}
            {errors.length > 0 && (
              <div className="bg-rose-50 dark:bg-rose-950/20 border-b border-rose-100 dark:border-rose-900/60 p-4 space-y-1 text-xs text-rose-600 dark:text-rose-400">
                <div className="flex items-center gap-1 font-bold">
                  <AlertCircle className="w-4 h-4" /> Please resolve errors:
                </div>
                <ul className="list-disc pl-5">
                  {errors.map((e, idx) => <li key={idx}>{e}</li>)}
                </ul>
              </div>
            )}

            {formSubmitted ? (
              /* Success Board Receipt */
              <div className="p-6 sm:p-10 text-center space-y-6 animate-fade-in">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-extrabold text-gray-900 dark:text-white font-display">Application Logged Successfully!</h4>
                  <p className="text-xs text-gray-500 leading-normal max-w-sm mx-auto">
                    Welcome to the RSPSA Retail network. We have securely registered your application on the KamaiKart corporate ledger.
                  </p>
                </div>

                {/* Receipt credentials */}
                <div className="p-4 bg-slate-50 dark:bg-gray-900 rounded-2xl text-left border border-gray-100 dark:border-gray-800 space-y-2 text-xs font-mono text-gray-700 dark:text-gray-300">
                  <div className="flex justify-between border-b pb-1.5 border-gray-200 dark:border-gray-800">
                    <span className="font-bold text-gray-400">Application ID</span>
                    <span className="text-brand-primary font-black">#RSPSA-2026-{(Math.random() * 900000 + 100000).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Partner Role</span>
                    <span className="text-gray-900 dark:text-white font-bold capitalize">{selectedRole}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Applicant Name</span>
                    <span className="text-gray-900 dark:text-white font-bold">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target District</span>
                    <span className="text-gray-900 dark:text-white font-bold">{formData.district} ({formData.state})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verified Contact</span>
                    <span className="text-gray-900 dark:text-white font-bold">{formData.phone}</span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 italic">
                  Note: A regional block verification executive will contact you within 24–48 working hours. Keep your Aadhaar and proof of location ready.
                </p>

                <div className="pt-2">
                  <button
                    onClick={resetWizard}
                    className="px-6 py-2 bg-brand-primary hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Close & Return
                  </button>
                </div>
              </div>
            ) : (
              /* Steps wizard panels */
              <form onSubmit={handleFormSubmit} className="p-6 space-y-5 text-left text-xs">
                
                {/* Step 1: Basic Applicant Credentials */}
                {wizardStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Full Legal Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="E.g. Satish Raj"
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden focus:border-brand-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Active Mobile *</label>
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="10-Digit Mobile"
                          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden focus:border-brand-primary"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Corporate Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="E.g. user@example.com"
                          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden focus:border-brand-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Aadhaar Card No (12-Digit)</label>
                        <input
                          type="text"
                          maxLength={12}
                          value={formData.aadhaarNo}
                          onChange={(e) => setFormData({ ...formData, aadhaarNo: e.target.value })}
                          placeholder="E.g. 843059203952"
                          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden focus:border-brand-primary"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">PAN Card No (10-Digit Alphanumeric)</label>
                        <input
                          type="text"
                          maxLength={10}
                          value={formData.panNo}
                          onChange={(e) => setFormData({ ...formData, panNo: e.target.value })}
                          placeholder="E.g. ABCDE1234F"
                          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Location specifications */}
                {wizardStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Select State *</label>
                        <select
                          value={formData.state}
                          onChange={(e) => {
                            const selectedState = e.target.value;
                            const newDistricts = STATES_AND_DISTRICTS.find(s => s.state === selectedState)?.districts || [];
                            setFormData({ ...formData, state: selectedState, district: newDistricts[0] || '' });
                          }}
                          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden"
                        >
                          {STATES_AND_DISTRICTS.map((s) => <option key={s.state} value={s.state}>{s.state}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Select District *</label>
                        <select
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden"
                        >
                          {activeDistricts.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Block / Subdivision Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.block || ''}
                        onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                        placeholder="E.g. Gaya South Block B"
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Physical Address / Landmark *</label>
                      <textarea
                        rows={3}
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Exact village community / storefront address details..."
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden"
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* Step 3: Experience & Financial commitments */}
                {wizardStep === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Business Experience (Years)</label>
                        <select
                          value={formData.experienceYears}
                          onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden"
                        >
                          <option value="0">Less than 1 Year</option>
                          <option value="2">1 to 3 Years</option>
                          <option value="5">3 to 5 Years</option>
                          <option value="10">More than 5 Years</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Business / Shop Name (If any)</label>
                        <input
                          type="text"
                          value={formData.businessName || ''}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="E.g. S.K. Kirana Store"
                          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Planned Investment Capacity</label>
                      <select
                        value={formData.investmentCapacity}
                        onChange={(e) => setFormData({ ...formData, investmentCapacity: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden"
                      >
                        <option value="None">None (Applying as Customer or minor PPM)</option>
                        <option value="₹50,000 to ₹1 Lakh">₹50,000 to ₹1 Lakh (Minor Kirana/PPM)</option>
                        <option value="₹2.5 Lakhs to ₹5 Lakhs">₹2.5 Lakhs to ₹5 Lakhs (Block Franchise Depot)</option>
                        <option value="Above ₹10 Lakhs">Above ₹10 Lakhs (Super Distributorship)</option>
                      </select>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/60 flex items-start gap-2 text-[11px] text-gray-500">
                      <AlertCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                      <p className="leading-normal">
                        I hereby declare that all entered information is legal, authentic, and matches my identification papers. I authorize RSPSA Retail to perform address checks.
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer buttons of the Wizard */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between">
                  {wizardStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {wizardStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-5 py-2 bg-brand-primary hover:bg-blue-700 text-white font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2 bg-brand-secondary hover:bg-emerald-700 text-white font-black rounded-lg transition-colors cursor-pointer"
                    >
                      Submit Registration
                    </button>
                  )}
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

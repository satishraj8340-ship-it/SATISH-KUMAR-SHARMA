/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Briefcase, ArrowUpRight, BookOpen, Send, Mail, Phone, MapPin, 
  CheckCircle2, FileText, Award, BadgeHelp, HelpCircle, Users, Sparkles
} from 'lucide-react';
import { NEWS_ARTICLES } from '../data/websiteContent';

interface OtherViewsProps {
  viewType: 'career' | 'blog' | 'news' | 'support';
  language: 'EN' | 'HI';
}

const CAREERS = [
  { id: 'c1', title: 'District Distribution Coordinator', dept: 'Supply Chain & Logistics', loc: 'Patna HQ', pay: '₹4.5 - ₹6.2 LPA', desc: 'Manage central warehouse inventory dispatch cycles, truck driver scheduling, and block franchise hub inventory alignment.' },
  { id: 'c2', title: 'Rural Digital Trainer & Onboarder', dept: 'PPM Network & Training', loc: 'Gaya Block Cluster', pay: '₹3.2 - ₹4.5 LPA', desc: 'Conduct bi-weekly regional training workshops for newly enrolled Panchayat PPM partners. Teach app usage, billing, and order handling.' },
  { id: 'c3', title: 'FMCG Procurement Manager', dept: 'Corporate Sourcing', loc: 'Patna Corporate Office', pay: '₹6.5 - ₹8.0 LPA', desc: 'Direct negotiation with global manufacturer representatives for bulk grocery and grains pricing models under ISO quality terms.' }
];

const BLOGS = [
  { id: 'b1', title: 'How Volume Consolidation Solves the Rural Supply Gap', author: 'Ramanathan Iyer (Logistics Chief)', date: 'June 25, 2026', readTime: '5 min read', summary: 'Explore how aggregating household grain demands inside village panchayats enables us to bypass standard multi-tier wholesalers and supply items at deep discount parity.', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500' },
  { id: 'b2', title: '5 Simple Steps to Double Kirana Sales This Festive Season', author: 'Satish Raj (MD)', date: 'May 12, 2026', readTime: '4 min read', summary: 'Practical tips for local village shopkeepers to structure display shelves, arrange solar-powered dairy boxes, and utilize zero-interest working capital credit lines.', image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=500' }
];

export default function OtherViews({ viewType, language }: OtherViewsProps) {
  const [careerSubmitted, setCareerSubmitted] = useState(false);
  const [supportTicket, setSupportTicket] = useState({ name: '', phone: '', reason: 'billing', query: '' });
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  const handleCareerApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCareerSubmitted(true);
    setTimeout(() => setCareerSubmitted(false), 4000);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSupportSubmitted(true);
    setTimeout(() => {
      setSupportTicket({ name: '', phone: '', reason: 'billing', query: '' });
      setSupportSubmitted(false);
    }, 4000);
  };

  return (
    <div className="space-y-20 pb-20 bg-white dark:bg-gray-950 transition-colors">
      
      {/* Dynamic Header Banner */}
      <section className="relative py-16 bg-slate-900 text-white overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-linear-to-b from-brand-primary/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left space-y-3">
          <span className="text-xs font-bold text-brand-accent uppercase tracking-widest font-mono">
            {viewType.toUpperCase()} SUB-PORTAL
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display capitalize">
            {viewType === 'career' && 'Careers at RSPSA Retail'}
            {viewType === 'blog' && 'Rural Commerce Blog'}
            {viewType === 'news' && 'Corporate Press Room'}
            {viewType === 'support' && 'Help & Customer Support Desk'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
            {viewType === 'career' && 'Build the future of village supply chains. Join our professional corporate family in Bihar, Uttar Pradesh and Rajasthan.'}
            {viewType === 'blog' && 'Expert analysis, merchant strategies, and tech highlights directly from the RSPSA committee leadership.'}
            {viewType === 'news' && 'Official corporate updates, media briefings, and societal announcements for RSPSA Retail India Private Limited.'}
            {viewType === 'support' && 'Access priority billing help, registration tracking, or log complaints with block grievance officers.'}
          </p>
        </div>
      </section>

      {/* 1. CAREER VIEW */}
      {viewType === 'career' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Job listings */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white font-display uppercase tracking-wider">Active Openings</h3>
            <div className="space-y-4">
              {CAREERS.map((job) => (
                <div key={job.id} className="p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm space-y-3 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h4 className="text-xs font-black text-gray-900 dark:text-white font-display uppercase">{job.title}</h4>
                      <p className="text-[10px] text-brand-primary font-bold mt-1 font-mono">{job.dept} — {job.loc}</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full font-mono">{job.pay}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-sans">{job.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Apply Form */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-gray-900/60 p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white font-display uppercase mb-4">Quick Application form</h4>
            
            {careerSubmitted ? (
              <div className="py-8 text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h5 className="text-xs font-bold text-gray-900 dark:text-white">Application Logged</h5>
                <p className="text-[11px] text-gray-500 max-w-xs mx-auto">
                  Our HR desk has received your details. We will email interview slots within 3 working days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCareerApply} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 block uppercase">Full Name *</label>
                  <input type="text" required placeholder="E.g. satish raj" className="w-full bg-white dark:bg-gray-800 border rounded-xl py-2 px-3 focus:outline-hidden" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 block uppercase">Mobile *</label>
                  <input type="tel" required pattern="[0-9]{10}" placeholder="10-Digit phone" className="w-full bg-white dark:bg-gray-800 border rounded-xl py-2 px-3 focus:outline-hidden" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 block uppercase">Target Position *</label>
                  <select className="w-full bg-white dark:bg-gray-800 border rounded-xl py-2 px-3 focus:outline-hidden">
                    {CAREERS.map((c) => <option key={c.id} value={c.title}>{c.title}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 block uppercase">Brief Experience Summary</label>
                  <textarea rows={3} placeholder="Tell us about your distribution/sales background..." className="w-full bg-white dark:bg-gray-800 border rounded-xl py-2 px-3 focus:outline-hidden"></textarea>
                </div>
                <button type="submit" className="w-full py-2 bg-brand-primary hover:bg-blue-700 text-white font-bold rounded-xl cursor-pointer">
                  Submit CV Details
                </button>
              </form>
            )}
          </div>

        </section>
      )}

      {/* 2. BLOG VIEW */}
      {viewType === 'blog' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOGS.map((blog) => (
            <div key={blog.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between group">
              <div>
                <div className="aspect-video w-full overflow-hidden bg-slate-100">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                    <span>By {blog.author}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white leading-tight font-display">{blog.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans">{blog.summary}</p>
                </div>
              </div>
              <div className="p-6 pt-0 flex justify-between items-center border-t border-gray-50 dark:border-gray-800/80 mt-2">
                <span className="text-[10px] text-gray-400 font-mono">{blog.date}</span>
                <span className="text-xs font-bold text-brand-primary cursor-pointer hover:underline flex items-center">Read Article <ArrowUpRight className="w-3.5 h-3.5" /></span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 3. NEWS PRESS VIEW */}
      {viewType === 'news' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ARTICLES.map((art) => (
            <div key={art.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between group">
              <div>
                <div className="aspect-video w-full overflow-hidden bg-slate-50">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform" />
                </div>
                <div className="p-5 space-y-3">
                  <span className="text-[9px] bg-brand-primary/10 text-brand-primary font-bold font-mono px-2 py-0.5 rounded-full uppercase">{art.category}</span>
                  <h4 className="text-xs font-black text-gray-900 dark:text-white leading-snug font-display">{art.title}</h4>
                  <p className="text-[11px] text-gray-500 leading-normal line-clamp-3 font-sans">{art.summary}</p>
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-gray-50 dark:border-gray-800 mt-2 flex justify-between items-center text-[10px] text-gray-400 font-mono">
                <span>{art.date}</span>
                <span className="text-brand-primary hover:underline cursor-pointer">Official PDF →</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 4. SUPPORT HELPDESK VIEW */}
      {viewType === 'support' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Support options and details */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white font-display uppercase tracking-wider">Priority Contact Channels</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border rounded-2xl space-y-2">
                <Phone className="w-5 h-5 text-brand-primary" />
                <h4 className="text-xs font-bold text-gray-800 dark:text-white">PPM Partner Helpline</h4>
                <p className="text-[10px] text-gray-500">Dedicated operational assistance for Panchayat agents.</p>
                <p className="text-xs font-bold font-mono text-brand-primary">1800-889-6339 (Toll Free)</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-900 border rounded-2xl space-y-2">
                <Mail className="w-5 h-5 text-brand-secondary" />
                <h4 className="text-xs font-bold text-gray-800 dark:text-white">Wholesale Inquiries</h4>
                <p className="text-[10px] text-gray-500">Corporate bulk grains and commercial procurement desk.</p>
                <p className="text-xs font-bold font-mono text-brand-secondary">procure@kamaikart.com</p>
              </div>
            </div>

            {/* Standard QA block */}
            <div className="p-5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/60 rounded-3xl space-y-3">
              <h4 className="text-xs font-bold text-gray-800 dark:text-white flex items-center gap-1.5 font-display uppercase">
                <BadgeHelp className="w-4 h-4 text-brand-primary" />
                Grievance Escalation Path
              </h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                For unresolved block-level problems, partners can submit formal letters directly to our Patna headquarters. Please specify your assigned corporate application ID or PPM licence credentials.
              </p>
            </div>
          </div>

          {/* Ticket Logger form */}
          <div className="lg:col-span-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 sm:p-10 rounded-3xl shadow-2xl">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white font-display uppercase mb-4 text-center">Log Online Support Ticket</h4>
            
            {supportSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-2xl">✓</div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 dark:text-white">Support Ticket Logged</h5>
                  <p className="text-[11px] text-gray-500 mt-1 max-w-xs mx-auto">
                    Your issue was logged as Ticket **#TKT-{(Math.random()*10000).toFixed(0)}**. A block coordinator will call your mobile shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 block uppercase">Your Name *</label>
                    <input type="text" required value={supportTicket.name} onChange={(e) => setSupportTicket({...supportTicket, name: e.target.value})} placeholder="E.g. Preeti Sharma" className="w-full bg-gray-50 dark:bg-gray-800 border rounded-xl py-2 px-3 focus:outline-hidden" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 block uppercase">Mobile *</label>
                    <input type="tel" required pattern="[0-9]{10}" value={supportTicket.phone} onChange={(e) => setSupportTicket({...supportTicket, phone: e.target.value})} placeholder="10-Digit phone" className="w-full bg-gray-50 dark:bg-gray-800 border rounded-xl py-2 px-3 focus:outline-hidden" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 block uppercase">Grievance Reason *</label>
                  <select value={supportTicket.reason} onChange={(e) => setSupportTicket({...supportTicket, reason: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-800 border rounded-xl py-2 px-3 focus:outline-hidden">
                    <option value="billing">PPM Commission Payout Queries</option>
                    <option value="delivery">Logistics / Doorstep Supply Delay</option>
                    <option value="tech">App login or OTP issues</option>
                    <option value="franchise">New Block territory proposal</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 block uppercase">Describe Issue *</label>
                  <textarea rows={4} required value={supportTicket.query} onChange={(e) => setSupportTicket({...supportTicket, query: e.target.value})} placeholder="Give block coordinates and order numbers where applicable..." className="w-full bg-gray-50 dark:bg-gray-800 border rounded-xl py-2 px-3 focus:outline-hidden"></textarea>
                </div>

                <button type="submit" className="w-full py-2.5 bg-brand-primary hover:bg-blue-700 text-white font-bold rounded-xl cursor-pointer">
                  Submit Support Ticket
                </button>
              </form>
            )}
          </div>

        </section>
      )}

    </div>
  );
}

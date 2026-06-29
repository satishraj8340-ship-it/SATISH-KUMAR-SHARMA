/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActivePage = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'kamaikart' 
  | 'partner' 
  | 'career' 
  | 'blog' 
  | 'news' 
  | 'support' 
  | 'contact'
  | 'portal';

export type PartnerRole = 
  | 'guest'
  | 'customer'
  | 'merchant'
  | 'ppm'
  | 'ppm-leader'
  | 'block-manager'
  | 'district-manager'
  | 'state-manager'
  | 'franchise'
  | 'distributor'
  | 'warehouse-staff'
  | 'delivery-partner'
  | 'support-executive'
  | 'hr'
  | 'accounts'
  | 'admin'
  | 'super-admin'
  | 'ceo'
  | 'director';

export interface RegistrationFormData {
  role: PartnerRole;
  fullName: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  block?: string;
  address: string;
  experienceYears?: string;
  businessName?: string;
  investmentCapacity?: string;
  aadhaarNo?: string;
  panNo?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  iconName: string;
  benefits: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'platform' | 'partner' | 'franchise';
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  image: string;
}

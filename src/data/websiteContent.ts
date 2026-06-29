/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Testimonial, FaqItem, TeamMember, NewsItem } from '../types';

export const SYSTEM_STATS = [
  { label: 'Rural Customers', value: '75,000+', description: 'Active village consumers' },
  { label: 'Verified Merchants', value: '12,000+', description: 'Local kirana & retailers' },
  { label: 'PPM Associates', value: '4,500+', description: 'Panchayat Pratinidhi Merchants' },
  { label: 'Villages Connected', value: '2,500+', description: 'Across multiple states' },
  { label: 'Active Blocks', value: '180+', description: 'Empowered local zones' },
  { label: 'District Hubs', value: '35+', description: 'Strategic storage & logistics hubs' }
];

export const TIMELINE_JOURNEY = [
  { year: '2023', title: 'The Genesis', description: 'RSPSA Retail India Private Limited was incorporated with a vision to revolutionize the rural supply chain. Began pilot operations with 50 local village kiranas.' },
  { year: '2024', title: 'KamaiKart App Launch', description: 'Formally launched the KamaiKart digital platform. Expanded logistics infrastructure, integrating the Panchayat Pratinidhi Merchant (PPM) model.' },
  { year: '2025', title: 'Rapid State-Wide Expansion', description: 'Reached 1,500+ villages. Empowered over 1,000 women through the Rural Women Entrepreneurship Program. Opened 15 district-level micro-warehouses.' },
  { year: '2026', title: 'Hyper-Local Commerce Pioneer', description: 'Currently scaling nationwide with next-generation smart warehousing, IoT-based rural cold-chains, and dynamic digital financial services.' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sanjeev Kumar Yadav',
    role: 'PPM Partner',
    location: 'Gaya, Bihar',
    quote: 'Joining KamaiKart as a PPM changed my family’s life. I run our local digital storefront and facilitate grocery deliveries. My monthly income has doubled, and the villagers respect me as a rural commerce pioneer.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 5
  },
  {
    id: '2',
    name: 'Preeti Sharma',
    role: 'Kirana Merchant',
    location: 'Alwar, Rajasthan',
    quote: 'As a retail partner, I no longer have to travel 35km to the city market twice a week to stock my store. I order premium items on the KamaiKart app, and they deliver right to my shop. This is true freedom!',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    rating: 5
  },
  {
    id: '3',
    name: 'Rajendra Prasad Ojha',
    role: 'Block Manager Partner',
    location: 'Deoria, Uttar Pradesh',
    quote: 'Managing operations for my block under the RSPSA Retail network is highly satisfying. We supervise 15 PPMs and ensure streamlined grocery distribution. The corporate support and digital tools are truly premium quality.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    rating: 5
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Satish Raj',
    role: 'Managing Director & Chairman',
    description: 'A visionary entrepreneur with 15+ years of experience in rural supply chains and micro-retail frameworks.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300'
  },
  {
    name: 'Anjali Kumari',
    role: 'Director of Rural Development',
    description: 'Spearheads the Women Employment Initiative and Panchayat mobilization programs across operational states.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300'
  },
  {
    name: 'Ramanathan Iyer',
    role: 'Chief of Logistics & Supply Chain',
    description: 'Ex-corporate logistics leader who engineered KamaiKart’s proprietary hub-and-spoke distribution system.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300'
  }
];

export const NEWS_ARTICLES: NewsItem[] = [
  {
    id: 'n1',
    title: 'KamaiKart Celebrates Empowering 5000+ Rural Women',
    summary: 'Through our dedicated Rural Women Employment and Micro-Merchant Initiative, RSPSA Retail India Private Limited has distributed over ₹2 Crores in direct income to women entrepreneurs.',
    date: 'June 18, 2026',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500'
  },
  {
    id: 'n2',
    title: 'Introducing Cold Chain Logistics for Village Kiranas',
    summary: 'KamaiKart is rolling out automated solar-powered cold boxes to village merchants, enabling them to sell fresh dairy, beverages, and frozen foods to rural consumers for the first time.',
    date: 'May 24, 2026',
    category: 'Innovation',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500'
  },
  {
    id: 'n3',
    title: 'Strategic Partnership with Nationalized Banks for Rural Credit',
    summary: 'We are proud to announce a digital tie-up offering instant low-interest working capital loans to verified KamaiKart merchant partners directly via our mobile application.',
    date: 'April 12, 2026',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'q1',
    question: 'What is RSPSA Retail India Private Limited?',
    answer: 'RSPSA Retail India Private Limited is an incorporated corporate retail enterprise dedicated to building India’s most robust rural commerce supply chain. Our main brand, KamaiKart, operates as an advanced hybrid digital-physical ecosystem providing standard logistics, high-quality groceries, and financial services directly to village blocks.',
    category: 'general'
  },
  {
    id: 'q2',
    question: 'How does the KamaiKart App work?',
    answer: 'The KamaiKart Mobile App serves as an all-in-one inventory and order engine. Kirana merchants order products at wholesale prices, Panchayat Partners (PPM) manage order distribution, and consumers explore daily catalogs of highly trusted FMCG goods.',
    category: 'platform'
  },
  {
    id: 'q3',
    question: 'What is a Panchayat Pratinidhi Merchant (PPM)?',
    answer: 'A Panchayat Pratinidhi Merchant (PPM) is an exclusive KamaiKart partner assigned to a village panchayat. They act as the local digital link, collecting consumer demand, managing bulk supplies, and running a micro-delivery center. They earn solid commissions on every order routed through their panchayat area.',
    category: 'partner'
  },
  {
    id: 'q4',
    question: 'What are the eligibility requirements to buy a Block Franchise?',
    answer: 'To buy a Block Franchise, you should have access to a small storage space (approx. 300–500 sq.ft.), a computer/smartphone, and an investment capacity of ₹2.5 to ₹5 Lakhs for stock inventory. You will earn dynamic margins on all retail and PPM transactions executed across your block.',
    category: 'franchise'
  },
  {
    id: 'q5',
    question: 'Is there any registration fee for Merchants?',
    answer: 'No, registering as a Kirana merchant on the KamaiKart platform is free of cost. Our representatives will visit your store to complete physical verification and provide app onboarding training.',
    category: 'partner'
  }
];

export const SERVICES_LIST = [
  {
    id: 's1',
    title: 'Retail Distribution Hubs',
    subtitle: 'Direct-to-store commercial fulfillment',
    description: 'We cut out complex middlemen by sourcing directly from top national manufacturers and delivering products to village retailers. Our state-level mega hubs and district centers maintain strict quality standards.',
    iconName: 'Building2',
    benefits: ['Up to 15% lower stock procurement costs', '100% genuine and original products', 'Flexible credit terms for high-performing merchants']
  },
  {
    id: 's2',
    title: 'Premium Grocery Supply',
    subtitle: 'Pure, branded, and local staples',
    description: 'We distribute top-tier packaged grains, fresh pulses, spices, edible oils, personal care, and dairy items. We enforce premium quality checks on all products to guarantee consumer safety.',
    iconName: 'ShoppingBag',
    benefits: ['Double-sealed hygienic packaging', 'Both global brands and verified regional staples', 'Next-day priority supply delivery']
  },
  {
    id: 's3',
    title: 'Panchayat & PPM Network',
    subtitle: 'Localized order micro-fulfillment',
    description: 'Through our patented Panchayat Pratinidhi Merchant model, we establish a human-centered digital node in every village. This bridges the digital literacy gap by offering offline ordering and localized home delivery.',
    iconName: 'Users',
    benefits: ['Zero shipping cost for end-consumers', 'Earn up to ₹25,000 monthly in local commissions', 'Frictionless tech suite customized for regional users']
  },
  {
    id: 's4',
    title: 'Village Digital Services',
    subtitle: 'Financial and e-governance solutions',
    description: 'Our partners facilitate utilities like bill payments, mobile recharges, banking micro-ATMs, crop insurance, and customized e-commerce buying on behalf of local villagers.',
    iconName: 'Cpu',
    benefits: ['Incremental income from digital transactions', 'High footfall driver for physical stores', 'Secured and RBI-compliant financial gateways']
  },
  {
    id: 's5',
    title: 'Integrated Rural Logistics',
    subtitle: 'Last-mile smart fleet management',
    description: 'Our proprietary fleet of GPS-tracked delivery vans and local PPM loaders navigate difficult rural terrains daily, ensuring guaranteed delivery cycles regardless of weather.',
    iconName: 'Truck',
    benefits: ['Reliable delivery windows', 'Full real-time vehicle trackability', 'Trained local eco-system drivers']
  },
  {
    id: 's6',
    title: 'Block Franchise & Distributors',
    subtitle: 'District-level entrepreneurship opportunities',
    description: 'We authorize exclusive franchise territories to local business leaders, allowing them to manage regional storage warehouses and run distribution logistics for an entire block.',
    iconName: 'Briefcase',
    benefits: ['Monopolistic territory rights', 'Continuous operational and marketing support', 'Compounded returns on rural growth']
  }
];

export const PARTNER_ROLE_DETAILS = {
  customer: {
    title: 'KamaiKart Value Customer',
    bannerImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800',
    tagline: 'Access premium global brands and fresh grocery staples right in your village at unmatched city wholesale prices.',
    eligibility: [
      'Must reside in an active operational village panchayat or block area.',
      'Possess a valid Indian active mobile number for authentication.',
      'Keen to access verified genuine products with strict quality assurance.'
    ],
    benefits: [
      'Guaranteed authentic FMCG, home-care, and premium grocery staples.',
      'Say goodbye to fake/counterfeit duplicates that flood local weekly markets.',
      'Convenient local collection at your nearest village Panchayat Partner (PPM) point.',
      'Access to flash loyalty programs, discounts, and custom festive package offers.'
    ],
    income: 'Save up to ₹1,500 to ₹3,000 monthly on family grocery budgets through wholesale price parity and elimination of travel transport expenses to town markets.'
  },
  merchant: {
    title: 'KamaiKart Merchant Partner (Kirana Retailer)',
    bannerImage: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=800',
    tagline: 'Modernize your local Kirana store. Order directly from your mobile, enjoy free doorstep delivery, and earn premium margins.',
    eligibility: [
      'Must own or operate a physical retail store, Kirana, or wholesale shop.',
      'Valid identity verification (Aadhaar Card or PAN Card required).',
      'Willingness to learn and use the KamaiKart Merchant app for automated inventory orders.'
    ],
    benefits: [
      'Order 1,500+ premium products at direct company-to-retailer wholesale rates.',
      'Free next-day consolidated delivery directly at your shop doorstep.',
      'No need to shut your shop down to travel to urban wholesale hubs.',
      'Access to interest-free digital working capital credits up to ₹1,00,000.'
    ],
    income: 'Increase your monthly shop net margins by 18% to 25% through direct manufacturer procurement discounts, high stock turnover, and added micro-ATM/recharge fee commission streams.'
  },
  ppm: {
    title: 'Panchayat Pratinidhi Merchant (PPM)',
    bannerImage: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1141?w=800',
    tagline: 'Become the exclusive digital retail representative for your village panchayat. Empower your neighbors, earn massive rewards.',
    eligibility: [
      'A passionate individual (youth, housewife, or local shopkeeper) residing in the target Panchayat.',
      'Minimum educational qualification of 10th or 12th standard.',
      'Owns an Android smartphone with basic internet connectivity.'
    ],
    benefits: [
      'Exclusive commercial authorization for your entire Panchayat area (no competition).',
      'Complete digital training, business branding kits, and customer brochures provided.',
      'Operate with zero stock holding cost; order on demand as local villagers request.',
      'Priority access to governmental and digital e-services distribution.'
    ],
    income: 'Earn high commissions (2% to 6%) on all product transactions ordered in your Panchayat. Monthly potential earnings range between ₹15,000 to ₹35,000 depending on active village outreach.'
  },
  'ppm-leader': {
    title: 'Panchayat Leader Partner (PPM Leader)',
    bannerImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    tagline: 'Lead and manage a group of 10-15 local village PPMs. Build your local commercial cell and earn overriding incentives.',
    eligibility: [
      'Prior experience in sales coordination, marketing, or community leadership.',
      'Good communication skills and native understanding of regional blocks.',
      'Ability to travel across adjacent villages to guide and train PPM associates.'
    ],
    benefits: [
      'Direct management control and overrides over a localized cluster of Panchayat zones.',
      'High-grade corporate training workshops and dynamic quarterly bonus programs.',
      'A proud status of bringing modern retail supply chains to rural clusters.'
    ],
    income: 'Earn an additional overriding performance commission (1% to 2.5%) on the aggregate monthly gross sales of all PPMs under your leadership. Potential earnings of ₹30,000 to ₹55,000 per month.'
  },
  'block-manager': {
    title: 'Block Operations Manager Partner',
    bannerImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    tagline: 'Supervise all commercial and logistics distribution operations across an entire block. Coordinate hubs and lead teams.',
    eligibility: [
      'Graduate in Business Administration, Rural Management, or relevant experience.',
      'Two years of team leadership or operational distribution experience.',
      'Strong organizational skills to coordinate inventory and last-mile dispatch.'
    ],
    benefits: [
      'A professional corporate career path based in your local native region.',
      'Fixed structural travel allowances, health insurance cover, and performance-linked stocks.',
      'Empower up to 100+ local retail stores in your block.'
    ],
    income: 'Combination of high fixed monthly management salary and powerful variable block growth targets. Annual compensation package starting from ₹3.6 Lakhs to ₹6.0 Lakhs plus bonus pools.'
  },
  'district-manager': {
    title: 'District Strategic Manager Partner',
    bannerImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    tagline: 'High-level strategic lead managing block teams and central warehouse logistics for a full district. Accelerate the RSPSA model.',
    eligibility: [
      'MBA or Master’s in Rural Development, Commerce, or Supply Chain.',
      '5+ years of strategic sales or field operation leadership.',
      'Experience in dealing with local distributor networks and government bodies.'
    ],
    benefits: [
      'Corporate executive leadership status with active state committee involvement.',
      'Direct command of a state-of-the-art district hub warehouse.',
      'Annual corporate stock options (ESOPs) in RSPSA Retail India Private Limited.'
    ],
    income: 'Highly competitive executive base compensation, vehicle allowance, and extensive performance overrides. Total CTC ranges from ₹6.5 Lakhs to ₹12.0 Lakhs per annum.'
  },
  'state-manager': {
    title: 'State Cluster Director Partner',
    bannerImage: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800',
    tagline: 'Top-tier state administrator. Plan mega hubs, design macro-logistics networks, and expand the brand brand across states.',
    eligibility: [
      '10+ years of senior-level corporate distribution experience in FMCG/Retail.',
      'Proven track record of managing multi-crore business operations.',
      'Strong regional networks and administrative acumen.'
    ],
    benefits: [
      'Directly reports to the Board of Directors of RSPSA Retail.',
      'High autonomy to draft state-level commercial policies and investment strategies.',
      'Full corporate benefits, annual executive bonuses, and premium medical schemes.'
    ],
    income: 'Senior-level executive compensation structure. Direct profit-sharing incentives on state gross margins. Annual potential compensation starting from ₹15 Lakhs up to ₹25 Lakhs.'
  },
  franchise: {
    title: 'Exclusive Block Franchise Owner',
    bannerImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800',
    tagline: 'Invest in India’s fastest-growing rural retail franchise. Set up your block fulfillment warehouse and enjoy secure profits.',
    eligibility: [
      'Possess a small commercial warehouse or storage space of 400 to 800 sq.ft.',
      'Investment capacity of ₹3.0 to ₹6.0 Lakhs for stock reserves.',
      'Local resident of the block with respectable social credit and clean business background.'
    ],
    benefits: [
      'Exclusive monopolistic franchise rights for the entire administrative block.',
      'Fully computerized POS systems and automated inventory management software provided free of cost.',
      'Extensive visual branding, storefront signage, and local pamphlet marketing funded by KamaiKart.'
    ],
    income: 'Earn high wholesale margins (4% to 10%) on every grocery box distributed to block merchants and PPMs. Highly stable business with monthly ROI of 24% to 35% and payback period of 12-14 months.'
  },
  distributor: {
    title: 'Super Distributor & Logistics Partner',
    bannerImage: 'https://images.unsplash.com/photo-1516507115590-ea4f61e8971f?w=800',
    tagline: 'Partner with us at the top level of supply chain. Feed multiple blocks and manage bulk raw storage logistics.',
    eligibility: [
      'Commercial warehouse facility of 1,500 to 3,000 sq.ft. with convenient truck loading bays.',
      'Investment capacity of ₹10 Lakhs to ₹20 Lakhs.',
      'Prior background in FMCG bulk distributorship or large-scale wholesale operations.'
    ],
    benefits: [
      'Bulk product direct supply contracts with multinational FMCG brands via RSPSA.',
      'Full integration with KamaiKart ERP for automated inventory restocking.',
      'Dedicated logistics manager from corporate headquarters assigned to your warehouse.'
    ],
    income: 'Direct bulk distribution margin overrides. Projected annual net profits range from ₹8 Lakhs to ₹18 Lakhs with extremely reliable repeat consumer demand streams.'
  }
};

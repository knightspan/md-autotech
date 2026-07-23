/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { Product, DistributorLocation, ProcessStep } from './types';

/*
  ============================================================
  REAL PRODUCT PHOTOS — already linked below
  Folder: public/images/products/
  Hero video: public/videos/hlins-expanding-our-legacy.mp4
  ============================================================
*/

function shockProduct(opts: {
  id: string;
  partNo: string;
  name: string;
  fitment: string;
  springNote: string;
  imageFile: string;
  rating?: number;
  reviewsCount?: number;
}): Product {
  return {
    id: opts.id,
    name: opts.name,
    category: 'suspension',
    type: 'Shock Absorber',
    description: `Part No. ${opts.partNo} — OEM-fit rear shock absorber for ${opts.fitment}. ${opts.springNote}`,
    longDescription: `MD Autotech ${opts.name} (Part No. ${opts.partNo}) is a factory-grade gas-hydraulic shock absorber engineered for ${opts.fitment}. ${opts.springNote} Built with a precision-honed damper tube, multi-lip oil seals, and durable mounting bushings for Indian road conditions — potholes, speed breakers, and loaded commuting.`,
    price: '',
    imageUrl: `/images/products/${opts.imageFile}`,
    rating: opts.rating ?? 4.8,
    reviewsCount: opts.reviewsCount ?? 64,
    specs: [
      { label: 'Part Number', value: opts.partNo },
      { label: 'Product Line', value: 'Shock Absorbers' },
      { label: 'Fitment', value: opts.fitment },
      { label: 'Spring / Finish', value: opts.springNote },
      { label: 'Application', value: 'OEM Replacement / Aftermarket Upgrade' },
    ],
    features: [
      `Genuine MD Autotech part ${opts.partNo}`,
      `Application: ${opts.fitment}`,
      opts.springNote,
      'Gas-hydraulic damping tuned for Indian road loads',
      'Multi-lip seals and OEM-style eyelet bushings',
      'Wholesale & dealer supply available via WhatsApp',
    ],
    technicalDetails: {
      dampingType: 'Gas-Hydraulic Twin-Tube',
      pistonDiameter: 'OEM Spec',
      strokeLength: 'OEM Spec',
      preloadAdjustable: true,
      reboundClicks: 0,
    },
  };
}

export const PRODUCTS: Product[] = [
  shockProduct({
    id: 'md2031',
    partNo: 'MD2031',
    name: 'HR Passion Plated',
    fitment: 'Hero Passion',
    springNote: 'Chrome / plated spring finish for a premium look.',
    imageFile: 'md2031-hr-passion-plated.png',
    rating: 4.9,
    reviewsCount: 118,
  }),
  shockProduct({
    id: 'md2032',
    partNo: 'MD2032',
    name: 'HR Passion Red',
    fitment: 'Hero Passion',
    springNote: 'High-visibility red spring coil.',
    imageFile: 'md2032-hr-passion-red.png',
    rating: 4.8,
    reviewsCount: 96,
  }),
  shockProduct({
    id: 'md2007',
    partNo: 'MD2007',
    name: 'HR Splendor BCG',
    fitment: 'Hero Splendor',
    springNote: 'Black coil with chrome accent cover (BCG).',
    imageFile: 'md2007-hr-splendor-bcg.png',
    rating: 4.9,
    reviewsCount: 210,
  }),
  shockProduct({
    id: 'md3004',
    partNo: 'MD3004',
    name: 'Bajaj Comfortec',
    fitment: 'Bajaj Comfortec / compatible Bajaj models',
    springNote: 'Gold / yellow spring on black damper body.',
    imageFile: 'md3004-bajaj-comfortec.png',
    rating: 4.8,
    reviewsCount: 142,
  }),
  shockProduct({
    id: 'md3001',
    partNo: 'MD3001',
    name: 'Bajaj Platina',
    fitment: 'Bajaj Platina',
    springNote: 'Orange performance spring with dual-coil support.',
    imageFile: 'md3001-bajaj-platina.png',
    rating: 4.9,
    reviewsCount: 175,
  }),
  shockProduct({
    id: 'md4003',
    partNo: 'MD4003',
    name: 'TVS Star City + Red',
    fitment: 'TVS Star City+',
    springNote: 'Red spring on black body.',
    imageFile: 'md4003-tvs-star-city-plus.png',
    rating: 4.7,
    reviewsCount: 88,
  }),
  shockProduct({
    id: 'md4002',
    partNo: 'MD4002',
    name: 'TVS Star City + White',
    fitment: 'TVS Star City+',
    springNote: 'White spring on black body.',
    imageFile: 'md4002-tvs-star-city-plus.png',
    rating: 4.7,
    reviewsCount: 81,
  }),
  shockProduct({
    id: 'md1002',
    partNo: 'MD1002',
    name: 'Honda Shine Red',
    fitment: 'Honda Shine',
    springNote: 'Red spring with silver / chrome damper finish.',
    imageFile: 'md1002-honda-shine-red.png',
    rating: 4.9,
    reviewsCount: 156,
  }),
  shockProduct({
    id: 'md1001',
    partNo: 'MD1001',
    name: 'Honda Shine Black',
    fitment: 'Honda Shine',
    springNote: 'Black spring with silver / chrome damper finish.',
    imageFile: 'md1001-honda-shine-blk.png',
    rating: 4.8,
    reviewsCount: 149,
  }),
  shockProduct({
    id: 'md1003',
    partNo: 'MD1003',
    name: 'Honda Shine Silver',
    fitment: 'Honda Shine',
    springNote: 'Full silver / chrome plated spring and body.',
    imageFile: 'md1003-honda-shine-slvr.png',
    rating: 4.8,
    reviewsCount: 133,
  }),
  shockProduct({
    id: 'md1004',
    partNo: 'MD1004',
    name: 'Honda Dream Red',
    fitment: 'Honda Dream',
    springNote: 'Red spring with silver damper finish.',
    imageFile: 'md1004-honda-dream-red.png',
    rating: 4.8,
    reviewsCount: 102,
  }),
  shockProduct({
    id: 'md1005',
    partNo: 'MD1005',
    name: 'Honda Dream Black',
    fitment: 'Honda Dream',
    springNote: 'Black spring with silver damper finish.',
    imageFile: 'md1005-honda-dream-blk.png',
    rating: 4.8,
    reviewsCount: 97,
  }),
  shockProduct({
    id: 'md5001',
    partNo: 'MD5001',
    name: 'Yamaha Crux',
    fitment: 'Yamaha Crux',
    springNote: 'Heavy-duty black casing with chrome lower section.',
    imageFile: 'md5001-yamaha-crux.png',
    rating: 4.7,
    reviewsCount: 74,
  }),
  shockProduct({
    id: 'md5003',
    partNo: 'MD5003',
    name: 'Yamaha Rx100',
    fitment: 'Yamaha RX100',
    springNote: 'Heavy-duty black casing tuned for classic RX geometry.',
    imageFile: 'md5003-yamaha-rx100.png',
    rating: 4.9,
    reviewsCount: 168,
  }),
  shockProduct({
    id: 'md1008',
    partNo: 'MD1008',
    name: 'Honda Activa Front LH',
    fitment: 'Honda Activa (front, LH / pair style)',
    springNote: 'Slim dual front shock set for scooter applications.',
    imageFile: 'md1008-honda-act-fr-lh.png',
    rating: 4.8,
    reviewsCount: 121,
  }),
];

export const DISTRIBUTORS: DistributorLocation[] = [
  {
    id: 'nasik-hq',
    city: 'Nasik',
    state: 'Maharashtra',
    country: 'India',
    address: 'E 31, MIDC Satpur, Nasik - 422007',
    phone: '+91 70307 27770',
    email: 'contact@mdautotech.com',
    type: 'Factory Outlet',
    coordinates: { lat: 19.9975, lng: 73.7498 }
  },
  {
    id: 'hq-plant',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    address: 'Plot 42, MIDC Automotive Zone, Bhosari, Pune - 411026',
    phone: '+91 20 6634 8922',
    email: 'factory@mdautotech.com',
    type: 'Regional Warehouse',
    coordinates: { lat: 18.6265, lng: 73.8475 }
  },
  {
    id: 'south-dist',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    address: 'MD AutoTech Center, 108 Mount Road, Guindy, Chennai - 600032',
    phone: '+91 44 2235 4488',
    email: 'chennai@mdautotech.com',
    type: 'Premium Dealer',
    coordinates: { lat: 13.0067, lng: 80.2206 }
  },
  {
    id: 'north-dist',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    address: 'A-24, Okhla Industrial Area Phase-II, New Delhi - 110020',
    phone: '+91 11 4165 9900',
    email: 'delhi.sales@mdautotech.com',
    type: 'Premium Dealer',
    coordinates: { lat: 28.5355, lng: 77.2639 }
  },
  {
    id: 'bengaluru-sales',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '5th Main, Peenya Industrial Area 3rd Stage, Bengaluru - 560058',
    country: 'India',
    phone: '+91 80 4115 5220',
    email: 'blr.sales@mdautotech.com',
    type: 'Regional Warehouse',
    coordinates: { lat: 12.9716, lng: 77.5946 }
  }
];

export const MANUFACTURING_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Precision Tube Honing & Superfinishing',
    description: 'Seamless cold-drawn tubes are internal bored and precision micro-honed to a mirror roughness rating of Ra 0.05μm. This prevents oil-seal stiction and maintains consistent sealing contact on rough road tracks.',
    stat: 'Ra 0.05μm',
    statLabel: 'Superfinish Level'
  },
  {
    id: 2,
    title: 'Silicon-Manganese Coil Winding',
    description: 'We use high-tensile CrSi (Chromium Silicon) and SiMn (Silicon Manganese) steel wires wound on state-of-the-art CNC wire formers, followed by cold shot-peening and stress relief baking cycles to prevent fatigue.',
    stat: '10M+',
    statLabel: 'Cycles Lifespan'
  },
  {
    id: 3,
    title: 'Automatic Dual-Chamber Charging',
    description: 'Chambers are scrubbed under hard vacuum, injected with synthetic multigrade hydraulic fluid, and then pressurized with pure dry Nitrogen Gas (99.99%) through a dynamic valve insertion system to lock out oxygen.',
    stat: '15 Bar',
    statLabel: 'Nitrogen Charging'
  },
  {
    id: 4,
    title: 'Endurance & Dynamometer Testing',
    description: '100% of our production batch shock absorbers undergo full force-displacement dynamometer testing. We record hysteresis loops and damping coefficients across variable speeds (0.1m/s to 1.5m/s) for ultimate performance.',
    stat: '100%',
    statLabel: 'Dyna Checked'
  }
];

export const FAQS = [
  {
    question: 'What is the role of gas-charging (Nitrogen) in MD AutoTech shocks?',
    answer: 'Traditional hydraulic shocks suffer from "cavitation" or "fading". Under continuous vibration (such as speed bumps or road ruts), rapid piston movement causes air-oil foaming, which drops damping resistance to zero. Pressurizing the fluid with pure nitrogen gas under 15 bar pressure raises the fluid’s boiling threshold, preventing cavitation. This ensures steady damping force even on terrible off-road terrains.'
  },
  {
    question: 'How do progressive-rate springs work on potholes or speed bumps?',
    answer: 'A progressive coil spring features variable spacings (pitches) between its coils. Under light, ordinary ripples, the tightly spaced soft coils compress with ease, keeping steering soft and isolated. When the vehicle collides with a deep pothole or travels fast over a speed breaker, these soft coils close completely, and the widely spaced stiff coils engage. This prevents bottoming out and dampens heavy forces safely.'
  },
  {
    question: 'Are MD AutoTech suspension kits compatible with standard OEM two-wheelers?',
    answer: 'Yes! We manufacture direct factory-replacement (OEM size) shock absorbers for Hero Passion, Hero Splendor, Bajaj Platina, TVS Star City+, Honda Shine, Honda Dream, Honda Activa, Yamaha Crux, Yamaha RX100, and more. Check the Part No. on each product card or contact our Nasik team.'
  },
  {
    question: 'Does MD AutoTech offer wholesale dealer distribution or custom racing setups?',
    answer: 'Absolutely. We are certified by ISO 9001:2015 and IATF 16949 for bulk manufacture, quality assurance, and distribution. We work with spare part retailers, regional distributors, fleet owners, and custom motorcycle building garages. You can submit your bulk query via our built-in customized Interactive Inquiry Form or contact our Nasik headquarters directly.'
  },
  {
    question: 'What is stiction, and how does Titanium-Gold coating help front forks?',
    answer: 'Stiction is static-friction that prevents the telescopic fork from responding to micro-bumps on smooth tarmac. Inner tubes coated with titanium-gold undergo an electron physical vapor deposition (PVD) treatment that alters the surface friction coefficient, allowing the slider bushings to move smoothly over microscopic undulations for maximum front-tire traction.'
  }
];

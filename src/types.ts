/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: 'suspension' | 'parts' | 'performance';
  type: string; // e.g. "Mono-Shock", "Dual-Shock", "Sprocket", etc.
  description: string;
  longDescription: string;
  price: string; // e.g., "$189" or "₹12,499"
  specs: {
    label: string;
    value: string;
  }[];
  features: string[];
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  technicalDetails: {
    dampingType: string;
    pistonDiameter: string;
    strokeLength: string;
    preloadAdjustable: boolean;
    reboundClicks?: number;
  };
}

export interface QuoteRequest {
  id: string;
  customerName: string;
  companyName?: string;
  email: string;
  phone: string;
  vehicleModel: string;
  productInterest: string;
  quantity: number;
  customSpringColor: string;
  dampingPreference: 'comfort' | 'balanced' | 'sport' | 'race';
  message?: string;
  status: 'pending' | 'reviewed' | 'approved';
  createdAt: string;
}

export interface SimulationParams {
  roadType: 'pothole' | 'speed_breaker' | 'rumble_strips' | 'smooth';
  obstacleHeight: number; // in mm, e.g. 10 to 100
  vehicleSpeed: number; // in km/h, e.g. 10 to 80
  springStiffness: number; // in N/mm, e.g. 20 to 100
  dampingCoefficient: number; // in Ns/mm, e.g. 1 to 10
  gasPressure: number; // in bar, e.g. 5 to 20
}

export interface DistributorLocation {
  id: string;
  city: string;
  state: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  type: 'Factory Outlet' | 'Premium Dealer' | 'Regional Warehouse';
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}

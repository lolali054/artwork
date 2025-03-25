// Define all shared types for the application

import { Painting } from './data';

export interface CartItem {
  painting: Painting;
  quantity: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  shippingMethod: string;
  paymentMethod: string;
  saveInfo: boolean;
}

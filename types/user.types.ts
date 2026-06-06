export type UserRole = "customer" | "admin" | "super_admin";

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  type: "home" | "work" | "other";
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface UserProfile extends User {
  addresses: Address[];
}

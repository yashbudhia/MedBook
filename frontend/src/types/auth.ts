export type UserRole = 'doctor' | 'patient';

export interface UserMetadata {
  role: UserRole;
  full_name: string;
  specialization?: string;  // For doctors only
  license_number?: string;  // For doctors only
}
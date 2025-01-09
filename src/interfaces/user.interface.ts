export interface Profile {
  id: number;
  email: string;
  passwordHash: string;
  address: string;
  name: string;
  restoreToken?: unknown;
  phone: string;
}
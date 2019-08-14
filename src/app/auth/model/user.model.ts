export interface User {
  uid: string;
  username?: string; // optional mark as ?
  email: string;
  password?: string;
  // confirmPassword?: string;
  rememberMe?: boolean;
  terms?: boolean;
  fullName?: string;
  photoURL?: string;
  displayName?: string;
  phoneNumber?: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  disabled?: boolean;
  // registeredAt?: string;
  // createdAt?: boolean;
  // updatedAt?: boolean;
  // providerId?: string;
}

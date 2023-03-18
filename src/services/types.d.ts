import { UserTypeEnum } from './enums';
export type SigninParams = {
  email: string;
  password: string;
};
export type SignUpParams = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;

  sendingFrom: string;
  sendingTo: string;
};
export type ResetPasswordParams = {
  email: string;
  UserRole: UserTypeEnum;
};

export type UpdatePasswordParams = {
  password: string;
  code: string;
  userTypeString: string;
};

export type KeychainCredentials = {
  token: string;
  user?: any;
};

export type UserDTO = {
  FirstName?: string;
  LastName?: string;
  PhoneNumber?: string;
  CountryId?: number;
  Gender?: number;
  DateOfBirth?: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  image: string;
  countryId?: number;
  gender?: number;
  dateOfBirth?: string;
};

export type Country = {
  id: number;
  code: string;
  name: string;
  phone: string;
  flag: string;
};

export type File = {
  uri: string;
  name: string;
  type: string;
};

export type FileUploadParams = {
  url: string;
  file: File;
  token?: string;
  bodyKey?: string;
  onUploadProgress?: (progress: number) => void;
};

export interface Role {
    id: number;
    roleName: string;
  }
  
  export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    mobile: string | null;
    firstName: string;
    lastName: string;
    isActive: boolean;
    emailVerified: boolean;
    mobileVerified: boolean;
    userLocked: boolean;
    roles: Role[];
    createdBy: string | null;
    createdDate: string | null;
    modifiedBy: string | null;
    modifiedDate: string | null;
  }
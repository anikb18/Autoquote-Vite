export const UserRoles = {
    USER: 'user',
    DEALER: 'dealer',
    ADMIN: 'admin'
  } as const;
  
  export type Role = typeof UserRoles[keyof typeof UserRoles];
  
  export type RoleHierarchy = {
    [key in Role]: number;
  };
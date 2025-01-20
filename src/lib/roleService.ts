import { UserRoles, type Role, type RoleHierarchy } from '../types/roles';

const roleHierarchy: RoleHierarchy = {
  [UserRoles.USER]: 1,
  [UserRoles.DEALER]: 2,
  [UserRoles.ADMIN]: 3
};

export const roleService = {
  hierarchy: roleHierarchy,

  checkAccess(userRole: Role, requiredRoles: Role[]): boolean {
    const userLevel = this.hierarchy[userRole];
    return requiredRoles.some(role => this.hierarchy[role] <= userLevel);
  },

  isAuthorized(userRole: Role, minimumRole: Role): boolean {
    return this.hierarchy[userRole] >= this.hierarchy[minimumRole];
  }
};
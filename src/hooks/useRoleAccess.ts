import { useEffect, useState } from 'react';
import { roleService } from '@/lib/roleService';
import { UserRoles, type Role } from '@/types/roles';

export function useRoleAccess() {
  const [role, setRole] = useState<Role>(UserRoles.USER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const profile = await profileService.getCurrentProfile();
        setRole(profile.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return {
    loading,
    role,
    isUser: role === UserRoles.USER,
    isDealer: role === UserRoles.DEALER, 
    isAdmin: role === UserRoles.ADMIN,
    checkAccess: (requiredRoles: Role[]) => roleService.checkAccess(role, requiredRoles)
  };
}

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Adjust the path according to your project structure

export function useRoleAccess() {
  const [role, setRole] = useState<Role>('profiles'); // Default role
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data, error } = await supabase
        .from('profiles') // Replace 'users' with your actual table name
        .select('user_roles') // Assuming 'role' is the column name
        .eq('id', supabase.auth.profiles()?.id) // Fetch the role for the logged-in user
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        setLoading(false);
        return;
      }

      setRole(data?.role || 'user'); // Set the role or default to 'user'
      setLoading(false);
    };

    fetchUserRole();
  }, []);

  const checkAccess = (allowedRoles: UserRole[]): boolean => {
    const roleHierarchy: Record<UserRole, number> = {
      user: 1,
      dealer: 2,
      admin: 3,
    };

    const currentRoleLevel = roleHierarchy[role];
    return allowedRoles.some(role => roleHierarchy[role] <= currentRoleLevel);
  };

  return {
    loading,
    role,
    isUser: role === 'user',
    isDealer: role === 'dealer',
    isAdmin: role === 'admin',
    checkAccess,
  };
}
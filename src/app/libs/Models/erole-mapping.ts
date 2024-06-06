import { ERole } from './erole';

export const ERoleMapping: Record<ERole, string> = {
  [ERole.Admin]: 'ROLE_ADMIN',
  [ERole.User]: 'ROLE_USER',
};
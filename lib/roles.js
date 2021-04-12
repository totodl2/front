export const ROLE_LEECHER = 1;
export const ROLE_UPLOADER = 2;
export const ROLE_ADMIN = 64;

export const hasRole = (roles, role) => (roles & role) === role;

const ROLES = {
  ROLE_ADMIN,
  ROLE_LEECHER,
  ROLE_UPLOADER,
};

export default ROLES;

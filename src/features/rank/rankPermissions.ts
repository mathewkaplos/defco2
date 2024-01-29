import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const rankPermissions = {
  rankImport: {
    id: 'rankImport',
    allowedRoles: [roles.admin],
  },

  rankCreate: {
    id: 'rankCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  rankUpdate: {
    id: 'rankUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  rankRead: {
    id: 'rankRead',
    allowedRoles: [roles.admin, roles.custom],
  },

  rankAutocomplete: {
    id: 'rankAutocomplete',
    allowedRoles: [roles.admin, roles.custom],
  },

  rankDestroy: {
    id: 'rankDestroy',
    allowedRoles: [roles.admin],
  },
};

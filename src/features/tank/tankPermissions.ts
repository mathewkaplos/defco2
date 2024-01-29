import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const tankPermissions = {
  tankImport: {
    id: 'tankImport',
    allowedRoles: [roles.admin],
  },

  tankCreate: {
    id: 'tankCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  tankUpdate: {
    id: 'tankUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  tankRead: {
    id: 'tankRead',
    allowedRoles: [roles.admin, roles.custom],
  },

  tankAutocomplete: {
    id: 'tankAutocomplete',
    allowedRoles: [roles.admin, roles.custom],
  },

  tankDestroy: {
    id: 'tankDestroy',
    allowedRoles: [roles.admin],
  },
};

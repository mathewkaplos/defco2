import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const dispenserPermissions = {
  dispenserImport: {
    id: 'dispenserImport',
    allowedRoles: [roles.admin],
  },

  dispenserCreate: {
    id: 'dispenserCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  dispenserUpdate: {
    id: 'dispenserUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  dispenserRead: {
    id: 'dispenserRead',
    allowedRoles: [roles.admin, roles.custom],
  },

  dispenserAutocomplete: {
    id: 'dispenserAutocomplete',
    allowedRoles: [roles.admin, roles.custom],
  },

  dispenserDestroy: {
    id: 'dispenserDestroy',
    allowedRoles: [roles.admin],
  },
};

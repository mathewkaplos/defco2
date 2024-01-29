import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const devicePermissions = {
  deviceImport: {
    id: 'deviceImport',
    allowedRoles: [roles.admin],
  },

  deviceCreate: {
    id: 'deviceCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  deviceUpdate: {
    id: 'deviceUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  deviceRead: {
    id: 'deviceRead',
    allowedRoles: [roles.admin, roles.custom],
  },

  deviceAutocomplete: {
    id: 'deviceAutocomplete',
    allowedRoles: [roles.admin, roles.custom],
  },

  deviceDestroy: {
    id: 'deviceDestroy',
    allowedRoles: [roles.admin],
  },
};

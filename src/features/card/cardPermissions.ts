import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const cardPermissions = {
  cardImport: {
    id: 'cardImport',
    allowedRoles: [roles.admin],
  },

  cardCreate: {
    id: 'cardCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  cardUpdate: {
    id: 'cardUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  cardRead: {
    id: 'cardRead',
    allowedRoles: [roles.admin, roles.custom],
  },

  cardAutocomplete: {
    id: 'cardAutocomplete',
    allowedRoles: [roles.admin, roles.custom],
  },

  cardDestroy: {
    id: 'cardDestroy',
    allowedRoles: [roles.admin],
  },
};

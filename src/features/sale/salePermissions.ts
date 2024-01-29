import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const salePermissions = {
  saleImport: {
    id: 'saleImport',
    allowedRoles: [roles.admin],
  },

  saleCreate: {
    id: 'saleCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  saleUpdate: {
    id: 'saleUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  saleRead: {
    id: 'saleRead',
    allowedRoles: [roles.admin, roles.custom],
  },

  saleAutocomplete: {
    id: 'saleAutocomplete',
    allowedRoles: [roles.admin, roles.custom],
  },

  saleDestroy: {
    id: 'saleDestroy',
    allowedRoles: [roles.admin],
  },
};

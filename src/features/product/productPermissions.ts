import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const productPermissions = {
  productImport: {
    id: 'productImport',
    allowedRoles: [roles.admin],
  },

  productCreate: {
    id: 'productCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  productUpdate: {
    id: 'productUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  productRead: {
    id: 'productRead',
    allowedRoles: [roles.admin, roles.custom],
  },

  productAutocomplete: {
    id: 'productAutocomplete',
    allowedRoles: [roles.admin, roles.custom],
  },

  productDestroy: {
    id: 'productDestroy',
    allowedRoles: [roles.admin],
  },
};

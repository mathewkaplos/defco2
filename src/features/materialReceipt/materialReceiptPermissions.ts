import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const materialReceiptPermissions = {
  materialReceiptImport: {
    id: 'materialReceiptImport',
    allowedRoles: [roles.admin],
  },

  materialReceiptCreate: {
    id: 'materialReceiptCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  materialReceiptUpdate: {
    id: 'materialReceiptUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  materialReceiptRead: {
    id: 'materialReceiptRead',
    allowedRoles: [roles.admin, roles.custom],
  },

  materialReceiptAutocomplete: {
    id: 'materialReceiptAutocomplete',
    allowedRoles: [roles.admin, roles.custom],
  },

  materialReceiptDestroy: {
    id: 'materialReceiptDestroy',
    allowedRoles: [roles.admin],
  },
};

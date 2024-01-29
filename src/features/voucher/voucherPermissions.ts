import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const voucherPermissions = {
  voucherImport: {
    id: 'voucherImport',
    allowedRoles: [roles.admin],
  },

  voucherCreate: {
    id: 'voucherCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  voucherUpdate: {
    id: 'voucherUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  voucherRead: {
    id: 'voucherRead',
    allowedRoles: [roles.admin, roles.custom],
  },

  voucherAutocomplete: {
    id: 'voucherAutocomplete',
    allowedRoles: [roles.admin, roles.custom],
  },

  voucherDestroy: {
    id: 'voucherDestroy',
    allowedRoles: [roles.admin],
  },
};

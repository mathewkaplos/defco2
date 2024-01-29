import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const customerPermissions = {
  customerImport: {
    id: 'customerImport',
    allowedRoles: [roles.admin],
  },

  customerCreate: {
    id: 'customerCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  customerUpdate: {
    id: 'customerUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  customerRead: {
    id: 'customerRead',
    allowedRoles: [roles.admin, roles.custom],
  },

  customerAutocomplete: {
    id: 'customerAutocomplete',
    allowedRoles: [roles.admin, roles.custom],
  },

  customerDestroy: {
    id: 'customerDestroy',
    allowedRoles: [roles.admin],
  },
};

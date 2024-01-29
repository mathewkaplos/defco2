import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const stationPermissions = {
  stationImport: {
    id: 'stationImport',
    allowedRoles: [roles.admin],
  },

  stationCreate: {
    id: 'stationCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  stationUpdate: {
    id: 'stationUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  stationRead: {
    id: 'stationRead',
    allowedRoles: [roles.admin, roles.custom],
  },

  stationAutocomplete: {
    id: 'stationAutocomplete',
    allowedRoles: [roles.admin, roles.custom],
  },

  stationDestroy: {
    id: 'stationDestroy',
    allowedRoles: [roles.admin],
  },
};

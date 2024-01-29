import { roles } from 'src/features/roles';
import { storage } from 'src/features/storage';

export const vehiclePermissions = {
  vehicleImport: {
    id: 'vehicleImport',
    allowedRoles: [roles.admin],
  },

  vehicleCreate: {
    id: 'vehicleCreate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  vehicleUpdate: {
    id: 'vehicleUpdate',
    allowedRoles: [roles.admin],
    allowedStorage: [],
  },

  vehicleRead: {
    id: 'vehicleRead',
    allowedRoles: [roles.admin, roles.custom],
  },

  vehicleAutocomplete: {
    id: 'vehicleAutocomplete',
    allowedRoles: [roles.admin, roles.custom],
  },

  vehicleDestroy: {
    id: 'vehicleDestroy',
    allowedRoles: [roles.admin],
  },
};

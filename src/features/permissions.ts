import { uniqBy } from 'lodash';
import { apiKeyPermissions } from 'src/features/apiKey/apiKeyPermissions';
import { auditLogPermissions } from 'src/features/auditLog/auditLogPermissions';
import { stationPermissions } from 'src/features/station/stationPermissions';
import { dispenserPermissions } from 'src/features/dispenser/dispenserPermissions';
import { tankPermissions } from 'src/features/tank/tankPermissions';
import { customerPermissions } from 'src/features/customer/customerPermissions';
import { vehiclePermissions } from 'src/features/vehicle/vehiclePermissions';
import { salePermissions } from 'src/features/sale/salePermissions';
import { cardPermissions } from 'src/features/card/cardPermissions';
import { productPermissions } from 'src/features/product/productPermissions';
import { devicePermissions } from 'src/features/device/devicePermissions';
import { voucherPermissions } from 'src/features/voucher/voucherPermissions';
import { materialReceiptPermissions } from 'src/features/materialReceipt/materialReceiptPermissions';
import { rankPermissions } from 'src/features/rank/rankPermissions';
import { membershipPermissions } from 'src/features/membership/membershipPermissions';
import { subscriptionPermissions } from 'src/features/subscription/subscriptionPermissions';
import { tenantPermissions } from 'src/features/tenant/tenantPermissions';

export interface Permission {
  id: string;
  allowedRoles: Array<string>;
  allowedStorage?: Array<string>;
}

export const permissions = {
  ...auditLogPermissions,
  ...apiKeyPermissions,
  ...membershipPermissions,
  ...subscriptionPermissions,
  ...tenantPermissions,
  ...stationPermissions,
  ...dispenserPermissions,
  ...tankPermissions,
  ...customerPermissions,
  ...vehiclePermissions,
  ...salePermissions,
  ...cardPermissions,
  ...productPermissions,
  ...devicePermissions,
  ...voucherPermissions,
  ...materialReceiptPermissions,
  ...rankPermissions,
} as const;

export function availablePermissions(roles: Array<string>) {
  return uniqBy(
    Object.values(permissions).filter((permission) => {
      return permission.allowedRoles.some((role) => roles.includes(role));
    }),
    'id',
  );
}

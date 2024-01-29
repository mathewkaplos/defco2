// @ts-ignore
const path = require('path');
// @ts-ignore
const fs = require('fs');

// @ts-ignore
const triggers = [
  'src/features/auditLog/auditLogTriggers.sql',
  'src/features/station/stationTriggers.sql',
  'src/features/dispenser/dispenserTriggers.sql',
  'src/features/tank/tankTriggers.sql',
  'src/features/customer/customerTriggers.sql',
  'src/features/vehicle/vehicleTriggers.sql',
  'src/features/sale/saleTriggers.sql',
  'src/features/card/cardTriggers.sql',
  'src/features/product/productTriggers.sql',
  'src/features/device/deviceTriggers.sql',
  'src/features/voucher/voucherTriggers.sql',
  'src/features/materialReceipt/materialReceiptTriggers.sql',
  'src/features/rank/rankTriggers.sql',
  'src/features/apiKey/apiKeyTriggers.sql',
  'src/features/membership/membershipTriggers.sql',
  'src/features/subscription/subscriptionTriggers.sql',
  'src/features/tenant/tenantTriggers.sql',
  'src/features/user/userTriggers.sql',
]
  .map((triggerSqlPath) => {
    return fs
      .readFileSync(path.join(process.cwd(), ...triggerSqlPath.split('/')))
      .toString();
  })
  .join('\n\n');

exports.triggers = triggers;

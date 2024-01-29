/**
 * Storage permissions.
 *
 * @id - Used to identify the rule on permissions and upload.
 * @folder - Folder where the files will be saved
 * @maxSizeInBytes - Max allowed size in bytes
 * @publicRead - The file can be publicly accessed via the URL without the need for a signed token
 */

import { membershipStorage } from 'src/features/membership/membershipStorage';
import { stationStorage } from 'src/features/station/stationStorage';
import { dispenserStorage } from 'src/features/dispenser/dispenserStorage';
import { tankStorage } from 'src/features/tank/tankStorage';
import { customerStorage } from 'src/features/customer/customerStorage';
import { vehicleStorage } from 'src/features/vehicle/vehicleStorage';
import { saleStorage } from 'src/features/sale/saleStorage';
import { cardStorage } from 'src/features/card/cardStorage';
import { productStorage } from 'src/features/product/productStorage';
import { deviceStorage } from 'src/features/device/deviceStorage';
import { voucherStorage } from 'src/features/voucher/voucherStorage';
import { materialReceiptStorage } from 'src/features/materialReceipt/materialReceiptStorage';
import { rankStorage } from 'src/features/rank/rankStorage';

export interface StorageConfig {
  id: string;
  folder: string;
  maxSizeInBytes: number;
  publicRead?: boolean;
}

export const storage = {
  ...membershipStorage,
  ...stationStorage,
  ...dispenserStorage,
  ...tankStorage,
  ...customerStorage,
  ...vehicleStorage,
  ...saleStorage,
  ...cardStorage,
  ...productStorage,
  ...deviceStorage,
  ...voucherStorage,
  ...materialReceiptStorage,
  ...rankStorage,
};

import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';
import { apiKeyApiDocs } from 'src/features/apiKey/apiKeyApiDocs';
import { auditLogApiDocs } from 'src/features/auditLog/auditLogApiDocs';
import { authApiDocs } from 'src/features/auth/authApiDocs';
import { stationApiDocs } from 'src/features/station/stationApiDocs';
import { dispenserApiDocs } from 'src/features/dispenser/dispenserApiDocs';
import { tankApiDocs } from 'src/features/tank/tankApiDocs';
import { customerApiDocs } from 'src/features/customer/customerApiDocs';
import { vehicleApiDocs } from 'src/features/vehicle/vehicleApiDocs';
import { saleApiDocs } from 'src/features/sale/saleApiDocs';
import { cardApiDocs } from 'src/features/card/cardApiDocs';
import { productApiDocs } from 'src/features/product/productApiDocs';
import { deviceApiDocs } from 'src/features/device/deviceApiDocs';
import { voucherApiDocs } from 'src/features/voucher/voucherApiDocs';
import { materialReceiptApiDocs } from 'src/features/materialReceipt/materialReceiptApiDocs';
import { rankApiDocs } from 'src/features/rank/rankApiDocs';
import { fileApiDocs } from 'src/features/file/fileApiDocs';
import { membershipApiDocs } from 'src/features/membership/membershipApiDocs';
import { subscriptionApiDocs } from 'src/features/subscription/subscriptionApiDocs';
import { tenantApiDocs } from 'src/features/tenant/tenantApiDocs';

const registry = new OpenAPIRegistry();

const apiKey = registry.registerComponent('securitySchemes', 'API Key', {
  type: 'http',
  scheme: 'bearer',
});

const security = [{ [apiKey.name]: [] }];

authApiDocs(registry, security);
apiKeyApiDocs(registry, security);
auditLogApiDocs(registry, security);
stationApiDocs(registry, security);
dispenserApiDocs(registry, security);
tankApiDocs(registry, security);
customerApiDocs(registry, security);
vehicleApiDocs(registry, security);
saleApiDocs(registry, security);
cardApiDocs(registry, security);
productApiDocs(registry, security);
deviceApiDocs(registry, security);
voucherApiDocs(registry, security);
materialReceiptApiDocs(registry, security);
rankApiDocs(registry, security);
membershipApiDocs(registry, security);
tenantApiDocs(registry, security);
subscriptionApiDocs(registry, security);
fileApiDocs(registry, security);

export function buildApiDocs() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    info: {
      version: '1.0.0',
      title: 'API',
    },
    openapi: '3.0.0',
  });
}

import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { voucherAutocompleteApiDoc } from 'src/features/voucher/controllers/voucherAutocompleteController';
import { voucherCreateApiDoc } from 'src/features/voucher/controllers/voucherCreateController';
import { voucherDestroyManyApiDoc } from 'src/features/voucher/controllers/voucherDestroyManyController';
import { voucherFindApiDoc } from 'src/features/voucher/controllers/voucherFindController';
import { voucherFindManyApiDoc } from 'src/features/voucher/controllers/voucherFindManyController';
import { voucherImportApiDoc } from 'src/features/voucher/controllers/voucherImporterController';
import { voucherUpdateApiDoc } from 'src/features/voucher/controllers/voucherUpdateController';

export function voucherApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    voucherAutocompleteApiDoc,
    voucherCreateApiDoc,
    voucherDestroyManyApiDoc,
    voucherFindApiDoc,
    voucherFindManyApiDoc,
    voucherUpdateApiDoc,
    voucherImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Voucher'],
      security,
    });
  });
}

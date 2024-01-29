'use client';

import { productImportApiCall } from 'src/features/product/productApiCalls';
import {
  productImportFileSchema,
  productImportInputSchema,
} from 'src/features/product/productSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function ProductImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'name',
        'price',
      ]}
      labels={context.dictionary.product.fields}
      context={context}
      validationSchema={productImportInputSchema}
      fileSchema={productImportFileSchema}
      importerFn={productImportApiCall}
      breadcrumbRoot={[context.dictionary.product.list.menu, '/product']}
      queryKeyToInvalidate={['product']}
    />
  );
}

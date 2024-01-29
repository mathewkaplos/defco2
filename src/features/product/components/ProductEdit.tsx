'use client';

import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductForm } from 'src/features/product/components/ProductForm';
import { productFindApiCall } from 'src/features/product/productApiCalls';
import { productLabel } from 'src/features/product/productLabel';
import { ProductWithRelationships } from 'src/features/product/productSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function ProductEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [product, setProduct] = useState<ProductWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setProduct(undefined);
        const product = await productFindApiCall(id);

        if (!product) {
          router.push('/product');
        }

        setProduct(product);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/product');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.product.list.menu, '/product'],
          [productLabel(product, context.dictionary), `/product/${product?.id}`],
          [dictionary.product.edit.menu],
        ]}
      />
      <div className="my-10">
        <ProductForm
          context={context}
          product={product}
          onSuccess={(product: Product) => router.push(`/product/${product.id}`)}
          onCancel={() => router.push('/product')}
        />
      </div>
    </div>
  );
}

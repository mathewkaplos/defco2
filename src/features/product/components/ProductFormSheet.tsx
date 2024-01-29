import { ProductWithRelationships } from 'src/features/product/productSchemas';
import { ProductForm } from 'src/features/product/components/ProductForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function ProductFormSheet({
  product,
  context,
  onCancel,
  onSuccess,
}: {
  product?: Partial<ProductWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (product: ProductWithRelationships) => void;
}) {
  return (
    <Sheet
      open={true}
      onOpenChange={(open) => (!open ? onCancel() : null)}
      modal={true}
    >
      <SheetContent className="overflow-y-scroll sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {product
              ? context.dictionary.product.edit.title
              : context.dictionary.product.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <ProductForm
            product={product}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

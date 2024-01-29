import { SaleWithRelationships } from 'src/features/sale/saleSchemas';
import { SaleForm } from 'src/features/sale/components/SaleForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function SaleFormSheet({
  sale,
  context,
  onCancel,
  onSuccess,
}: {
  sale?: Partial<SaleWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (sale: SaleWithRelationships) => void;
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
            {sale
              ? context.dictionary.sale.edit.title
              : context.dictionary.sale.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <SaleForm
            sale={sale}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

import { MaterialReceiptWithRelationships } from 'src/features/materialReceipt/materialReceiptSchemas';
import { MaterialReceiptForm } from 'src/features/materialReceipt/components/MaterialReceiptForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function MaterialReceiptFormSheet({
  materialReceipt,
  context,
  onCancel,
  onSuccess,
}: {
  materialReceipt?: Partial<MaterialReceiptWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (materialReceipt: MaterialReceiptWithRelationships) => void;
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
            {materialReceipt
              ? context.dictionary.materialReceipt.edit.title
              : context.dictionary.materialReceipt.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <MaterialReceiptForm
            materialReceipt={materialReceipt}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

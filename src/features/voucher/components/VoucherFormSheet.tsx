import { VoucherWithRelationships } from 'src/features/voucher/voucherSchemas';
import { VoucherForm } from 'src/features/voucher/components/VoucherForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function VoucherFormSheet({
  voucher,
  context,
  onCancel,
  onSuccess,
}: {
  voucher?: Partial<VoucherWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (voucher: VoucherWithRelationships) => void;
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
            {voucher
              ? context.dictionary.voucher.edit.title
              : context.dictionary.voucher.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <VoucherForm
            voucher={voucher}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

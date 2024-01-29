import { CustomerWithRelationships } from 'src/features/customer/customerSchemas';
import { CustomerForm } from 'src/features/customer/components/CustomerForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function CustomerFormSheet({
  customer,
  context,
  onCancel,
  onSuccess,
}: {
  customer?: Partial<CustomerWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (customer: CustomerWithRelationships) => void;
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
            {customer
              ? context.dictionary.customer.edit.title
              : context.dictionary.customer.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <CustomerForm
            customer={customer}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

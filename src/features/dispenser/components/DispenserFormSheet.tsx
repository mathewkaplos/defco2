import { DispenserWithRelationships } from 'src/features/dispenser/dispenserSchemas';
import { DispenserForm } from 'src/features/dispenser/components/DispenserForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function DispenserFormSheet({
  dispenser,
  context,
  onCancel,
  onSuccess,
}: {
  dispenser?: Partial<DispenserWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (dispenser: DispenserWithRelationships) => void;
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
            {dispenser
              ? context.dictionary.dispenser.edit.title
              : context.dictionary.dispenser.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <DispenserForm
            dispenser={dispenser}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

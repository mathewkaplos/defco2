import { TankWithRelationships } from 'src/features/tank/tankSchemas';
import { TankForm } from 'src/features/tank/components/TankForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function TankFormSheet({
  tank,
  context,
  onCancel,
  onSuccess,
}: {
  tank?: Partial<TankWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (tank: TankWithRelationships) => void;
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
            {tank
              ? context.dictionary.tank.edit.title
              : context.dictionary.tank.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <TankForm
            tank={tank}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

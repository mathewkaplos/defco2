import { VehicleWithRelationships } from 'src/features/vehicle/vehicleSchemas';
import { VehicleForm } from 'src/features/vehicle/components/VehicleForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function VehicleFormSheet({
  vehicle,
  context,
  onCancel,
  onSuccess,
}: {
  vehicle?: Partial<VehicleWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (vehicle: VehicleWithRelationships) => void;
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
            {vehicle
              ? context.dictionary.vehicle.edit.title
              : context.dictionary.vehicle.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <VehicleForm
            vehicle={vehicle}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

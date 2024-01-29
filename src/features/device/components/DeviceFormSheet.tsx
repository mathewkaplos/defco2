import { DeviceWithRelationships } from 'src/features/device/deviceSchemas';
import { DeviceForm } from 'src/features/device/components/DeviceForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function DeviceFormSheet({
  device,
  context,
  onCancel,
  onSuccess,
}: {
  device?: Partial<DeviceWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (device: DeviceWithRelationships) => void;
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
            {device
              ? context.dictionary.device.edit.title
              : context.dictionary.device.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <DeviceForm
            device={device}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

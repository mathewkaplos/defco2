import { StationWithRelationships } from 'src/features/station/stationSchemas';
import { StationForm } from 'src/features/station/components/StationForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function StationFormSheet({
  station,
  context,
  onCancel,
  onSuccess,
}: {
  station?: Partial<StationWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (station: StationWithRelationships) => void;
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
            {station
              ? context.dictionary.station.edit.title
              : context.dictionary.station.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <StationForm
            station={station}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

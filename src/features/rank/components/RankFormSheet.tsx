import { RankWithRelationships } from 'src/features/rank/rankSchemas';
import { RankForm } from 'src/features/rank/components/RankForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function RankFormSheet({
  rank,
  context,
  onCancel,
  onSuccess,
}: {
  rank?: Partial<RankWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (rank: RankWithRelationships) => void;
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
            {rank
              ? context.dictionary.rank.edit.title
              : context.dictionary.rank.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <RankForm
            rank={rank}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

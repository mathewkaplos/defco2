import { CardWithRelationships } from 'src/features/card/cardSchemas';
import { CardForm } from 'src/features/card/components/CardForm';
import { AppContext } from 'src/shared/controller/appContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'src/shared/components/ui/sheet';

export function CardFormSheet({
  card,
  context,
  onCancel,
  onSuccess,
}: {
  card?: Partial<CardWithRelationships>;
  context: AppContext;
  onCancel: () => void;
  onSuccess: (card: CardWithRelationships) => void;
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
            {card
              ? context.dictionary.card.edit.title
              : context.dictionary.card.new.title}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-8">
          <CardForm
            card={card}
            context={context}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

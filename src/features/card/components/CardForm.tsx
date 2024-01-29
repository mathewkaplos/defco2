import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { CardWithRelationships } from 'src/features/card/cardSchemas';
import {
  cardCreateApiCall,
  cardUpdateApiCall,
} from 'src/features/card/cardApiCalls';
import { AppContext } from 'src/shared/controller/appContext';
import { Button } from 'src/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/shared/components/ui/form';
import { toast } from 'src/shared/components/ui/use-toast';
import { getZodErrorMap } from 'src/translation/getZodErrorMap';
import { z } from 'zod';
import { cardCreateInputSchema } from 'src/features/card/cardSchemas';
import { Input } from 'src/shared/components/ui/input';
import { Switch } from 'src/shared/components/ui/switch';
import DatePickerInput from 'src/shared/components/form/DatePickerInput';
import { CustomerAutocompleteInput } from 'src/features/customer/components/CustomerAutocompleteInput';

export function CardForm({
  card,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (card: CardWithRelationships) => void;
  card?: Partial<CardWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(card?.id);

  const [initialValues] = React.useState({
    cardNo: card?.cardNo || '',
    isActive: card?.isActive || false,
    issueDate: card?.issueDate || '',
    deactivationDate: card?.deactivationDate || '',
    customer: card?.customer || null,
  });

  const form = useForm({
    resolver: zodResolver(cardCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof cardCreateInputSchema>) => {
      if (card?.id) {
        return cardUpdateApiCall(card.id, data);
      } else {
        return cardCreateApiCall(data);
      }
    },
    onSuccess: (card: Card) => {
      queryClient.invalidateQueries({
        queryKey: ['card'],
      });

      onSuccess(card);

      toast({
        description: isEditing
          ? dictionary.card.edit.success
          : dictionary.card.new.success,
      });
    },
    onError: (error: Error) => {
      toast({
        description: error.message || dictionary.shared.errors.unknown,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutateAsync(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          form.handleSubmit(onSubmit)(e);
        }}
      >
        <div className="grid w-full gap-8">
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="cardNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    {dictionary.card.fields.cardNo}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    autoFocus
          {...field}
                  />

                  {dictionary.card.hints.cardNo ? (
                    <FormDescription>
                      {dictionary.card.hints.cardNo}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="cardNo-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={mutation.isPending || mutation.isSuccess}
                      />
                    </FormControl>
                    <FormLabel>
                      {dictionary.card.fields.isActive}
                    </FormLabel>
                  </div>

                  {dictionary.card.hints.isActive ? (
                    <FormDescription>
                      {dictionary.card.hints.isActive}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="isActive-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="issueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    {dictionary.card.fields.issueDate}
                  </FormLabel>

                  <div>
                    <DatePickerInput
                      onChange={field.onChange}
                      value={field.value}
                      dictionary={dictionary}
                      disabled={mutation.isPending || mutation.isSuccess}
                      isClearable={true}
                    />
                  </div>

                  {dictionary.card.hints.issueDate ? (
                    <FormDescription>
                      {dictionary.card.hints.issueDate}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="issueDate-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="deactivationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary.card.fields.deactivationDate}
                  </FormLabel>

                  <div>
                    <DatePickerInput
                      onChange={field.onChange}
                      value={field.value}
                      dictionary={dictionary}
                      disabled={mutation.isPending || mutation.isSuccess}
                      isClearable={true}
                    />
                  </div>

                  {dictionary.card.hints.deactivationDate ? (
                    <FormDescription>
                      {dictionary.card.hints.deactivationDate}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="deactivationDate-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.card.fields.customer}</FormLabel>

                  <CustomerAutocompleteInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    isClearable={true}
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.card.hints.customer ? (
                    <FormDescription>
                      {dictionary.card.hints.customer}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="customer-error" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <Button
              disabled={mutation.isPending || mutation.isSuccess}
              type="submit"
            >
              {(mutation.isPending || mutation.isSuccess) && (
                <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {dictionary.shared.save}
            </Button>

            <Button
              disabled={mutation.isPending || mutation.isSuccess}
              type="button"
              variant={'secondary'}
              onClick={onCancel}
            >
              {dictionary.shared.cancel}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

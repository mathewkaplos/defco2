import { zodResolver } from '@hookform/resolvers/zod';
import { Dispenser } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { DispenserWithRelationships } from 'src/features/dispenser/dispenserSchemas';
import {
  dispenserCreateApiCall,
  dispenserUpdateApiCall,
} from 'src/features/dispenser/dispenserApiCalls';
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
import { dispenserCreateInputSchema } from 'src/features/dispenser/dispenserSchemas';
import { Input } from 'src/shared/components/ui/input';
import { dispenserEnumerators } from 'src/features/dispenser/dispenserEnumerators';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import SelectInput from 'src/shared/components/form/SelectInput';
import { StationAutocompleteInput } from 'src/features/station/components/StationAutocompleteInput';

export function DispenserForm({
  dispenser,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (dispenser: DispenserWithRelationships) => void;
  dispenser?: Partial<DispenserWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(dispenser?.id);

  const [initialValues] = React.useState({
    name: dispenser?.name || '',
    model: dispenser?.model || '',
    fuelType: dispenser?.fuelType || null,
    station: dispenser?.station || null,
  });

  const form = useForm({
    resolver: zodResolver(dispenserCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof dispenserCreateInputSchema>) => {
      if (dispenser?.id) {
        return dispenserUpdateApiCall(dispenser.id, data);
      } else {
        return dispenserCreateApiCall(data);
      }
    },
    onSuccess: (dispenser: Dispenser) => {
      queryClient.invalidateQueries({
        queryKey: ['dispenser'],
      });

      onSuccess(dispenser);

      toast({
        description: isEditing
          ? dictionary.dispenser.edit.success
          : dictionary.dispenser.new.success,
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    {dictionary.dispenser.fields.name}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    autoFocus
          {...field}
                  />

                  {dictionary.dispenser.hints.name ? (
                    <FormDescription>
                      {dictionary.dispenser.hints.name}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="name-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    {dictionary.dispenser.fields.model}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    {...field}
                  />

                  {dictionary.dispenser.hints.model ? (
                    <FormDescription>
                      {dictionary.dispenser.hints.model}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="model-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
          <FormField
            control={form.control}
            name="fuelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">{dictionary.dispenser.fields.fuelType}</FormLabel>

                <SelectInput
                  options={Object.keys(dispenserEnumerators.fuelType).map(
                    (value) => ({
                      value,
                      label: enumeratorLabel(
                        dictionary.dispenser.enumerators.fuelType,
                        value,
                      ),
                    }),
                  )}
                  dictionary={dictionary}
                  isClearable={true}
                  disabled={mutation.isPending || mutation.isSuccess}
                  onChange={field.onChange}
                  value={field.value}
                />

                {dictionary.dispenser.hints.fuelType ? (
                  <FormDescription>
                    {dictionary.dispenser.hints.fuelType}
                  </FormDescription>
                ) : null}

                <FormMessage data-testid="fuelType-error" />
              </FormItem>
            )}
          />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="station"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.dispenser.fields.station}</FormLabel>

                  <StationAutocompleteInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    isClearable={true}
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.dispenser.hints.station ? (
                    <FormDescription>
                      {dictionary.dispenser.hints.station}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="station-error" />
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

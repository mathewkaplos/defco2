import { zodResolver } from '@hookform/resolvers/zod';
import { Tank } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { TankWithRelationships } from 'src/features/tank/tankSchemas';
import {
  tankCreateApiCall,
  tankUpdateApiCall,
} from 'src/features/tank/tankApiCalls';
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
import { tankCreateInputSchema } from 'src/features/tank/tankSchemas';
import { Input } from 'src/shared/components/ui/input';
import { StationAutocompleteInput } from 'src/features/station/components/StationAutocompleteInput';

export function TankForm({
  tank,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (tank: TankWithRelationships) => void;
  tank?: Partial<TankWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(tank?.id);

  const [initialValues] = React.useState({
    name: tank?.name || '',
    capacity: tank?.capacity || '',
    station: tank?.station || null,
  });

  const form = useForm({
    resolver: zodResolver(tankCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof tankCreateInputSchema>) => {
      if (tank?.id) {
        return tankUpdateApiCall(tank.id, data);
      } else {
        return tankCreateApiCall(data);
      }
    },
    onSuccess: (tank: Tank) => {
      queryClient.invalidateQueries({
        queryKey: ['tank'],
      });

      onSuccess(tank);

      toast({
        description: isEditing
          ? dictionary.tank.edit.success
          : dictionary.tank.new.success,
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
                    {dictionary.tank.fields.name}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    autoFocus
          {...field}
                  />

                  {dictionary.tank.hints.name ? (
                    <FormDescription>
                      {dictionary.tank.hints.name}
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
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {dictionary.tank.fields.capacity}
                    </FormLabel>

                    <Input
                      type="number"
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.tank.hints.capacity ? (
                      <FormDescription>
                        {dictionary.tank.hints.capacity}
                      </FormDescription>
                    ) : null}

                    <FormMessage data-testid="capacity-error" />
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
                  <FormLabel>{dictionary.tank.fields.station}</FormLabel>

                  <StationAutocompleteInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    isClearable={true}
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.tank.hints.station ? (
                    <FormDescription>
                      {dictionary.tank.hints.station}
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

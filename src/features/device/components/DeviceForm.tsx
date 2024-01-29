import { zodResolver } from '@hookform/resolvers/zod';
import { Device } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { DeviceWithRelationships } from 'src/features/device/deviceSchemas';
import {
  deviceCreateApiCall,
  deviceUpdateApiCall,
} from 'src/features/device/deviceApiCalls';
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
import { deviceCreateInputSchema } from 'src/features/device/deviceSchemas';
import { Input } from 'src/shared/components/ui/input';
import { StationAutocompleteInput } from 'src/features/station/components/StationAutocompleteInput';

export function DeviceForm({
  device,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (device: DeviceWithRelationships) => void;
  device?: Partial<DeviceWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(device?.id);

  const [initialValues] = React.useState({
    deviceId: device?.deviceId || '',
    description: device?.description || '',
    station: device?.station || null,
  });

  const form = useForm({
    resolver: zodResolver(deviceCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof deviceCreateInputSchema>) => {
      if (device?.id) {
        return deviceUpdateApiCall(device.id, data);
      } else {
        return deviceCreateApiCall(data);
      }
    },
    onSuccess: (device: Device) => {
      queryClient.invalidateQueries({
        queryKey: ['device'],
      });

      onSuccess(device);

      toast({
        description: isEditing
          ? dictionary.device.edit.success
          : dictionary.device.new.success,
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
              name="deviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    {dictionary.device.fields.deviceId}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    autoFocus
          {...field}
                  />

                  {dictionary.device.hints.deviceId ? (
                    <FormDescription>
                      {dictionary.device.hints.deviceId}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="deviceId-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary.device.fields.description}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    {...field}
                  />

                  {dictionary.device.hints.description ? (
                    <FormDescription>
                      {dictionary.device.hints.description}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="description-error" />
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
                  <FormLabel>{dictionary.device.fields.station}</FormLabel>

                  <StationAutocompleteInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    isClearable={true}
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.device.hints.station ? (
                    <FormDescription>
                      {dictionary.device.hints.station}
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

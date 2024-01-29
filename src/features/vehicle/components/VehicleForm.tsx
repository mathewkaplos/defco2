import { zodResolver } from '@hookform/resolvers/zod';
import { Vehicle } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { VehicleWithRelationships } from 'src/features/vehicle/vehicleSchemas';
import {
  vehicleCreateApiCall,
  vehicleUpdateApiCall,
} from 'src/features/vehicle/vehicleApiCalls';
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
import { vehicleCreateInputSchema } from 'src/features/vehicle/vehicleSchemas';
import { Input } from 'src/shared/components/ui/input';
import { Switch } from 'src/shared/components/ui/switch';
import { CustomerAutocompleteInput } from 'src/features/customer/components/CustomerAutocompleteInput';
import { MembershipAutocompleteInput } from 'src/features/membership/components/MembershipAutocompleteInput';

export function VehicleForm({
  vehicle,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (vehicle: VehicleWithRelationships) => void;
  vehicle?: Partial<VehicleWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(vehicle?.id);

  const [initialValues] = React.useState({
    make: vehicle?.make || '',
    regNo: vehicle?.regNo || '',
    cc: vehicle?.cc || '',
    fullTank: vehicle?.fullTank || '',
    approved: vehicle?.approved || false,
    customer: vehicle?.customer || null,
    approvedBy: vehicle?.approvedBy || null,
  });

  const form = useForm({
    resolver: zodResolver(vehicleCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof vehicleCreateInputSchema>) => {
      if (vehicle?.id) {
        return vehicleUpdateApiCall(vehicle.id, data);
      } else {
        return vehicleCreateApiCall(data);
      }
    },
    onSuccess: (vehicle: Vehicle) => {
      queryClient.invalidateQueries({
        queryKey: ['vehicle'],
      });

      onSuccess(vehicle);

      toast({
        description: isEditing
          ? dictionary.vehicle.edit.success
          : dictionary.vehicle.new.success,
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
              name="make"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    {dictionary.vehicle.fields.make}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    autoFocus
          {...field}
                  />

                  {dictionary.vehicle.hints.make ? (
                    <FormDescription>
                      {dictionary.vehicle.hints.make}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="make-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="regNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    {dictionary.vehicle.fields.regNo}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    {...field}
                  />

                  {dictionary.vehicle.hints.regNo ? (
                    <FormDescription>
                      {dictionary.vehicle.hints.regNo}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="regNo-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
              <FormField
                control={form.control}
                name="cc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">
                      {dictionary.vehicle.fields.cc}
                    </FormLabel>

                    <Input
                      type="number"
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.vehicle.hints.cc ? (
                      <FormDescription>
                        {dictionary.vehicle.hints.cc}
                      </FormDescription>
                    ) : null}

                    <FormMessage data-testid="cc-error" />
                  </FormItem>
                )}
              />
            </div>
          <div className="grid max-w-lg gap-1">
              <FormField
                control={form.control}
                name="fullTank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">
                      {dictionary.vehicle.fields.fullTank}
                    </FormLabel>

                    <Input
                      type="number"
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.vehicle.hints.fullTank ? (
                      <FormDescription>
                        {dictionary.vehicle.hints.fullTank}
                      </FormDescription>
                    ) : null}

                    <FormMessage data-testid="fullTank-error" />
                  </FormItem>
                )}
              />
            </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="approved"
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
                      {dictionary.vehicle.fields.approved}
                    </FormLabel>
                  </div>

                  {dictionary.vehicle.hints.approved ? (
                    <FormDescription>
                      {dictionary.vehicle.hints.approved}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="approved-error" />
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
                  <FormLabel>{dictionary.vehicle.fields.customer}</FormLabel>

                  <CustomerAutocompleteInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    isClearable={true}
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.vehicle.hints.customer ? (
                    <FormDescription>
                      {dictionary.vehicle.hints.customer}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="customer-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="approvedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.vehicle.fields.approvedBy}</FormLabel>

                  <MembershipAutocompleteInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    isClearable={true}
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.vehicle.hints.approvedBy ? (
                    <FormDescription>
                      {dictionary.vehicle.hints.approvedBy}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="approvedBy-error" />
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

import { zodResolver } from '@hookform/resolvers/zod';
import { Customer } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { CustomerWithRelationships } from 'src/features/customer/customerSchemas';
import {
  customerCreateApiCall,
  customerUpdateApiCall,
} from 'src/features/customer/customerApiCalls';
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
import { customerCreateInputSchema } from 'src/features/customer/customerSchemas';
import { Input } from 'src/shared/components/ui/input';
import { customerEnumerators } from 'src/features/customer/customerEnumerators';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import SelectInput from 'src/shared/components/form/SelectInput';
import { RankAutocompleteInput } from 'src/features/rank/components/RankAutocompleteInput';
import { VehicleAutocompleteMultipleInput } from 'src/features/vehicle/components/VehicleAutocompleteMultipleInput';

export function CustomerForm({
  customer,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (customer: CustomerWithRelationships) => void;
  customer?: Partial<CustomerWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(customer?.id);

  const [initialValues] = React.useState({
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    otherNames: customer?.otherNames || '',
    gender: customer?.gender || null,
    serviceNo: customer?.serviceNo || '',
    entitledCards: customer?.entitledCards || '',
    status: customer?.status || null,
    rank: customer?.rank || null,
    vehicles: customer?.vehicles || [],
  });

  const form = useForm({
    resolver: zodResolver(customerCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof customerCreateInputSchema>) => {
      if (customer?.id) {
        return customerUpdateApiCall(customer.id, data);
      } else {
        return customerCreateApiCall(data);
      }
    },
    onSuccess: (customer: Customer) => {
      queryClient.invalidateQueries({
        queryKey: ['customer'],
      });

      onSuccess(customer);

      toast({
        description: isEditing
          ? dictionary.customer.edit.success
          : dictionary.customer.new.success,
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    {dictionary.customer.fields.firstName}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    autoFocus
          {...field}
                  />

                  {dictionary.customer.hints.firstName ? (
                    <FormDescription>
                      {dictionary.customer.hints.firstName}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="firstName-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    {dictionary.customer.fields.lastName}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    {...field}
                  />

                  {dictionary.customer.hints.lastName ? (
                    <FormDescription>
                      {dictionary.customer.hints.lastName}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="lastName-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="otherNames"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary.customer.fields.otherNames}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    {...field}
                  />

                  {dictionary.customer.hints.otherNames ? (
                    <FormDescription>
                      {dictionary.customer.hints.otherNames}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="otherNames-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">{dictionary.customer.fields.gender}</FormLabel>

                <SelectInput
                  options={Object.keys(customerEnumerators.gender).map(
                    (value) => ({
                      value,
                      label: enumeratorLabel(
                        dictionary.customer.enumerators.gender,
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

                {dictionary.customer.hints.gender ? (
                  <FormDescription>
                    {dictionary.customer.hints.gender}
                  </FormDescription>
                ) : null}

                <FormMessage data-testid="gender-error" />
              </FormItem>
            )}
          />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="serviceNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary.customer.fields.serviceNo}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    {...field}
                  />

                  {dictionary.customer.hints.serviceNo ? (
                    <FormDescription>
                      {dictionary.customer.hints.serviceNo}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="serviceNo-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
              <FormField
                control={form.control}
                name="entitledCards"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">
                      {dictionary.customer.fields.entitledCards}
                    </FormLabel>

                    <Input
                      type="number"
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.customer.hints.entitledCards ? (
                      <FormDescription>
                        {dictionary.customer.hints.entitledCards}
                      </FormDescription>
                    ) : null}

                    <FormMessage data-testid="entitledCards-error" />
                  </FormItem>
                )}
              />
            </div>
          <div className="grid max-w-lg gap-1">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary.customer.fields.status}</FormLabel>

                <SelectInput
                  options={Object.keys(customerEnumerators.status).map(
                    (value) => ({
                      value,
                      label: enumeratorLabel(
                        dictionary.customer.enumerators.status,
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

                {dictionary.customer.hints.status ? (
                  <FormDescription>
                    {dictionary.customer.hints.status}
                  </FormDescription>
                ) : null}

                <FormMessage data-testid="status-error" />
              </FormItem>
            )}
          />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="rank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.customer.fields.rank}</FormLabel>

                  <RankAutocompleteInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    isClearable={true}
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.customer.hints.rank ? (
                    <FormDescription>
                      {dictionary.customer.hints.rank}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="rank-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="vehicles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.customer.fields.vehicles}</FormLabel>

                  <VehicleAutocompleteMultipleInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.customer.hints.vehicles ? (
                    <FormDescription>
                      {dictionary.customer.hints.vehicles}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="vehicles-error" />
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

import { zodResolver } from '@hookform/resolvers/zod';
import { Voucher } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { VoucherWithRelationships } from 'src/features/voucher/voucherSchemas';
import {
  voucherCreateApiCall,
  voucherUpdateApiCall,
} from 'src/features/voucher/voucherApiCalls';
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
import { voucherCreateInputSchema } from 'src/features/voucher/voucherSchemas';
import DatePickerInput from 'src/shared/components/form/DatePickerInput';
import { Input } from 'src/shared/components/ui/input';
import { CustomerAutocompleteInput } from 'src/features/customer/components/CustomerAutocompleteInput';
import { VehicleAutocompleteInput } from 'src/features/vehicle/components/VehicleAutocompleteInput';

export function VoucherForm({
  voucher,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (voucher: VoucherWithRelationships) => void;
  voucher?: Partial<VoucherWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(voucher?.id);

  const [initialValues] = React.useState({
    date1: voucher?.date1 || '',
    voucherNo: voucher?.voucherNo || '',
    indentNo: voucher?.indentNo || '',
    approvedBy: voucher?.approvedBy || '',
    qty: voucher?.qty ? Number(voucher?.qty) : '',
    amount: voucher?.amount ? Number(voucher?.amount) : '',
    customer: voucher?.customer || null,
    vehicle: voucher?.vehicle || null,
  });

  const form = useForm({
    resolver: zodResolver(voucherCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof voucherCreateInputSchema>) => {
      if (voucher?.id) {
        return voucherUpdateApiCall(voucher.id, data);
      } else {
        return voucherCreateApiCall(data);
      }
    },
    onSuccess: (voucher: Voucher) => {
      queryClient.invalidateQueries({
        queryKey: ['voucher'],
      });

      onSuccess(voucher);

      toast({
        description: isEditing
          ? dictionary.voucher.edit.success
          : dictionary.voucher.new.success,
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
              name="date1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    {dictionary.voucher.fields.date1}
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

                  {dictionary.voucher.hints.date1 ? (
                    <FormDescription>
                      {dictionary.voucher.hints.date1}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="date1-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="voucherNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    {dictionary.voucher.fields.voucherNo}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    {...field}
                  />

                  {dictionary.voucher.hints.voucherNo ? (
                    <FormDescription>
                      {dictionary.voucher.hints.voucherNo}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="voucherNo-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
            <FormField
              control={form.control}
              name="indentNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    {dictionary.voucher.fields.indentNo}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    {...field}
                  />

                  {dictionary.voucher.hints.indentNo ? (
                    <FormDescription>
                      {dictionary.voucher.hints.indentNo}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="indentNo-error" />
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
                  <FormLabel className="required">
                    {dictionary.voucher.fields.approvedBy}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    {...field}
                  />

                  {dictionary.voucher.hints.approvedBy ? (
                    <FormDescription>
                      {dictionary.voucher.hints.approvedBy}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="approvedBy-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
              <FormField
                control={form.control}
                name="qty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {dictionary.voucher.fields.qty}
                    </FormLabel>

                    <Input
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.voucher.hints.qty ? (
                      <FormDescription>
                        {dictionary.voucher.hints.qty}
                      </FormDescription>
                    ) : null}

                    <FormMessage data-testid="qty-error" />
                  </FormItem>
                )}
              />
            </div>
          <div className="grid max-w-lg gap-1">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {dictionary.voucher.fields.amount}
                    </FormLabel>

                    <Input
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.voucher.hints.amount ? (
                      <FormDescription>
                        {dictionary.voucher.hints.amount}
                      </FormDescription>
                    ) : null}

                    <FormMessage data-testid="amount-error" />
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
                  <FormLabel>{dictionary.voucher.fields.customer}</FormLabel>

                  <CustomerAutocompleteInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    isClearable={true}
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.voucher.hints.customer ? (
                    <FormDescription>
                      {dictionary.voucher.hints.customer}
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
              name="vehicle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.voucher.fields.vehicle}</FormLabel>

                  <VehicleAutocompleteInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    isClearable={true}
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.voucher.hints.vehicle ? (
                    <FormDescription>
                      {dictionary.voucher.hints.vehicle}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="vehicle-error" />
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

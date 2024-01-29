import { zodResolver } from '@hookform/resolvers/zod';
import { Sale } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { SaleWithRelationships } from 'src/features/sale/saleSchemas';
import {
  saleCreateApiCall,
  saleUpdateApiCall,
} from 'src/features/sale/saleApiCalls';
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
import { saleCreateInputSchema } from 'src/features/sale/saleSchemas';
import DateTimePickerInput from 'src/shared/components/form/DateTimePickerInput';
import { saleEnumerators } from 'src/features/sale/saleEnumerators';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import SelectInput from 'src/shared/components/form/SelectInput';
import { Input } from 'src/shared/components/ui/input';
import { CustomerAutocompleteInput } from 'src/features/customer/components/CustomerAutocompleteInput';
import { StationAutocompleteInput } from 'src/features/station/components/StationAutocompleteInput';

export function SaleForm({
  sale,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (sale: SaleWithRelationships) => void;
  sale?: Partial<SaleWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(sale?.id);

  const [initialValues] = React.useState({
    date1: sale?.date1 || '',
    fuelType: sale?.fuelType || null,
    litres: sale?.litres ? Number(sale?.litres) : '',
    rate: sale?.rate ? Number(sale?.rate) : '',
    total: sale?.total ? Number(sale?.total) : '',
    paymode: sale?.paymode || null,
    cashAmount: sale?.cashAmount ? Number(sale?.cashAmount) : '',
    mpesaAmount: sale?.mpesaAmount ? Number(sale?.mpesaAmount) : '',
    invoiceAmount: sale?.invoiceAmount ? Number(sale?.invoiceAmount) : '',
    customer: sale?.customer || null,
    station: sale?.station || null,
  });

  const form = useForm({
    resolver: zodResolver(saleCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof saleCreateInputSchema>) => {
      if (sale?.id) {
        return saleUpdateApiCall(sale.id, data);
      } else {
        return saleCreateApiCall(data);
      }
    },
    onSuccess: (sale: Sale) => {
      queryClient.invalidateQueries({
        queryKey: ['sale'],
      });

      onSuccess(sale);

      toast({
        description: isEditing
          ? dictionary.sale.edit.success
          : dictionary.sale.new.success,
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
                    {dictionary.sale.fields.date1}
                  </FormLabel>

                  <div>
                    <DateTimePickerInput
                      onChange={field.onChange}
                      value={field.value}
                      dictionary={dictionary}
                      disabled={mutation.isPending || mutation.isSuccess}
                      isClearable={true}
                    />
                  </div>

                  {dictionary.sale.hints.date1 ? (
                    <FormDescription>
                      {dictionary.sale.hints.date1}
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
            name="fuelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">{dictionary.sale.fields.fuelType}</FormLabel>

                <SelectInput
                  options={Object.keys(saleEnumerators.fuelType).map(
                    (value) => ({
                      value,
                      label: enumeratorLabel(
                        dictionary.sale.enumerators.fuelType,
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

                {dictionary.sale.hints.fuelType ? (
                  <FormDescription>
                    {dictionary.sale.hints.fuelType}
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
                name="litres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">
                      {dictionary.sale.fields.litres}
                    </FormLabel>

                    <Input
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.sale.hints.litres ? (
                      <FormDescription>
                        {dictionary.sale.hints.litres}
                      </FormDescription>
                    ) : null}

                    <FormMessage data-testid="litres-error" />
                  </FormItem>
                )}
              />
            </div>
          <div className="grid max-w-lg gap-1">
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">
                      {dictionary.sale.fields.rate}
                    </FormLabel>

                    <Input
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.sale.hints.rate ? (
                      <FormDescription>
                        {dictionary.sale.hints.rate}
                      </FormDescription>
                    ) : null}

                    <FormMessage data-testid="rate-error" />
                  </FormItem>
                )}
              />
            </div>
          <div className="grid max-w-lg gap-1">
              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">
                      {dictionary.sale.fields.total}
                    </FormLabel>

                    <Input
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.sale.hints.total ? (
                      <FormDescription>
                        {dictionary.sale.hints.total}
                      </FormDescription>
                    ) : null}

                    <FormMessage data-testid="total-error" />
                  </FormItem>
                )}
              />
            </div>
          <div className="grid max-w-lg gap-1">
          <FormField
            control={form.control}
            name="paymode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">{dictionary.sale.fields.paymode}</FormLabel>

                <SelectInput
                  options={Object.keys(saleEnumerators.paymode).map(
                    (value) => ({
                      value,
                      label: enumeratorLabel(
                        dictionary.sale.enumerators.paymode,
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

                {dictionary.sale.hints.paymode ? (
                  <FormDescription>
                    {dictionary.sale.hints.paymode}
                  </FormDescription>
                ) : null}

                <FormMessage data-testid="paymode-error" />
              </FormItem>
            )}
          />
          </div>
          <div className="grid max-w-lg gap-1">
              <FormField
                control={form.control}
                name="cashAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {dictionary.sale.fields.cashAmount}
                    </FormLabel>

                    <Input
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.sale.hints.cashAmount ? (
                      <FormDescription>
                        {dictionary.sale.hints.cashAmount}
                      </FormDescription>
                    ) : null}

                    <FormMessage data-testid="cashAmount-error" />
                  </FormItem>
                )}
              />
            </div>
          <div className="grid max-w-lg gap-1">
              <FormField
                control={form.control}
                name="mpesaAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {dictionary.sale.fields.mpesaAmount}
                    </FormLabel>

                    <Input
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.sale.hints.mpesaAmount ? (
                      <FormDescription>
                        {dictionary.sale.hints.mpesaAmount}
                      </FormDescription>
                    ) : null}

                    <FormMessage data-testid="mpesaAmount-error" />
                  </FormItem>
                )}
              />
            </div>
          <div className="grid max-w-lg gap-1">
              <FormField
                control={form.control}
                name="invoiceAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {dictionary.sale.fields.invoiceAmount}
                    </FormLabel>

                    <Input
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.sale.hints.invoiceAmount ? (
                      <FormDescription>
                        {dictionary.sale.hints.invoiceAmount}
                      </FormDescription>
                    ) : null}

                    <FormMessage data-testid="invoiceAmount-error" />
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
                  <FormLabel>{dictionary.sale.fields.customer}</FormLabel>

                  <CustomerAutocompleteInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    isClearable={true}
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.sale.hints.customer ? (
                    <FormDescription>
                      {dictionary.sale.hints.customer}
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
              name="station"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.sale.fields.station}</FormLabel>

                  <StationAutocompleteInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    isClearable={true}
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.sale.hints.station ? (
                    <FormDescription>
                      {dictionary.sale.hints.station}
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

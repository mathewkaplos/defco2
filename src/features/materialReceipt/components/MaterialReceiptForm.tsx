import { zodResolver } from '@hookform/resolvers/zod';
import { MaterialReceipt } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { MaterialReceiptWithRelationships } from 'src/features/materialReceipt/materialReceiptSchemas';
import {
  materialReceiptCreateApiCall,
  materialReceiptUpdateApiCall,
} from 'src/features/materialReceipt/materialReceiptApiCalls';
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
import { materialReceiptCreateInputSchema } from 'src/features/materialReceipt/materialReceiptSchemas';
import DatePickerInput from 'src/shared/components/form/DatePickerInput';
import { Input } from 'src/shared/components/ui/input';
import { ProductAutocompleteInput } from 'src/features/product/components/ProductAutocompleteInput';

export function MaterialReceiptForm({
  materialReceipt,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (materialReceipt: MaterialReceiptWithRelationships) => void;
  materialReceipt?: Partial<MaterialReceiptWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(materialReceipt?.id);

  const [initialValues] = React.useState({
    date1: materialReceipt?.date1 || '',
    supplier: materialReceipt?.supplier || '',
    quantity: materialReceipt?.quantity || '',
    price: materialReceipt?.price ? Number(materialReceipt?.price) : '',
    total: materialReceipt?.total ? Number(materialReceipt?.total) : '',
    product: materialReceipt?.product || null,
  });

  const form = useForm({
    resolver: zodResolver(materialReceiptCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof materialReceiptCreateInputSchema>) => {
      if (materialReceipt?.id) {
        return materialReceiptUpdateApiCall(materialReceipt.id, data);
      } else {
        return materialReceiptCreateApiCall(data);
      }
    },
    onSuccess: (materialReceipt: MaterialReceipt) => {
      queryClient.invalidateQueries({
        queryKey: ['materialReceipt'],
      });

      onSuccess(materialReceipt);

      toast({
        description: isEditing
          ? dictionary.materialReceipt.edit.success
          : dictionary.materialReceipt.new.success,
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
                  <FormLabel>
                    {dictionary.materialReceipt.fields.date1}
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

                  {dictionary.materialReceipt.hints.date1 ? (
                    <FormDescription>
                      {dictionary.materialReceipt.hints.date1}
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
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary.materialReceipt.fields.supplier}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    {...field}
                  />

                  {dictionary.materialReceipt.hints.supplier ? (
                    <FormDescription>
                      {dictionary.materialReceipt.hints.supplier}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="supplier-error" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid max-w-lg gap-1">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">
                      {dictionary.materialReceipt.fields.quantity}
                    </FormLabel>

                    <Input
                      type="number"
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.materialReceipt.hints.quantity ? (
                      <FormDescription>
                        {dictionary.materialReceipt.hints.quantity}
                      </FormDescription>
                    ) : null}

                    <FormMessage data-testid="quantity-error" />
                  </FormItem>
                )}
              />
            </div>
          <div className="grid max-w-lg gap-1">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">
                      {dictionary.materialReceipt.fields.price}
                    </FormLabel>

                    <Input
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.materialReceipt.hints.price ? (
                      <FormDescription>
                        {dictionary.materialReceipt.hints.price}
                      </FormDescription>
                    ) : null}

                    <FormMessage data-testid="price-error" />
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
                      {dictionary.materialReceipt.fields.total}
                    </FormLabel>

                    <Input
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.materialReceipt.hints.total ? (
                      <FormDescription>
                        {dictionary.materialReceipt.hints.total}
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
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.materialReceipt.fields.product}</FormLabel>

                  <ProductAutocompleteInput
                    context={context}
                    onChange={field.onChange}
                    value={field.value}
                    isClearable={true}
                    disabled={mutation.isPending || mutation.isSuccess}
                    mode="memory"
                  />

                  {dictionary.materialReceipt.hints.product ? (
                    <FormDescription>
                      {dictionary.materialReceipt.hints.product}
                    </FormDescription>
                  ) : null}

                  <FormMessage data-testid="product-error" />
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

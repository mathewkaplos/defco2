import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { ProductWithRelationships } from 'src/features/product/productSchemas';
import {
  productCreateApiCall,
  productUpdateApiCall,
} from 'src/features/product/productApiCalls';
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
import { productCreateInputSchema } from 'src/features/product/productSchemas';
import { Input } from 'src/shared/components/ui/input';

export function ProductForm({
  product,
  context,
  onSuccess,
  onCancel,
}: {
  onCancel: () => void;
  onSuccess: (product: ProductWithRelationships) => void;
  product?: Partial<ProductWithRelationships>;
  context: AppContext;
}) {
  const { locale, dictionary } = context;

  const queryClient = useQueryClient();

  z.setErrorMap(getZodErrorMap(locale));

  const isEditing = Boolean(product?.id);

  const [initialValues] = React.useState({
    name: product?.name || '',
    price: product?.price ? Number(product?.price) : '',
  });

  const form = useForm({
    resolver: zodResolver(productCreateInputSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.input<typeof productCreateInputSchema>) => {
      if (product?.id) {
        return productUpdateApiCall(product.id, data);
      } else {
        return productCreateApiCall(data);
      }
    },
    onSuccess: (product: Product) => {
      queryClient.invalidateQueries({
        queryKey: ['product'],
      });

      onSuccess(product);

      toast({
        description: isEditing
          ? dictionary.product.edit.success
          : dictionary.product.new.success,
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
                    {dictionary.product.fields.name}
                  </FormLabel>

                  <Input
                    disabled={mutation.isPending || mutation.isSuccess}
                    autoFocus
          {...field}
                  />

                  {dictionary.product.hints.name ? (
                    <FormDescription>
                      {dictionary.product.hints.name}
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {dictionary.product.fields.price}
                    </FormLabel>

                    <Input
                      disabled={mutation.isPending || mutation.isSuccess}
                      {...field}
                    />

                    {dictionary.product.hints.price ? (
                      <FormDescription>
                        {dictionary.product.hints.price}
                      </FormDescription>
                    ) : null}

                    <FormMessage data-testid="price-error" />
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

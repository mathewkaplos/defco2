import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuLoader2, LuSearch } from 'react-icons/lu';
import { RxReset } from 'react-icons/rx';
import { saleFilterFormSchema } from 'src/features/sale/saleSchemas';
import { cn } from 'src/shared/components/cn';
import FilterPreview from 'src/shared/components/dataTable/DataTableFilterPreview';
import { DataTableQueryParams } from 'src/shared/components/dataTable/DataTableQueryParams';
import { dataTableFilterRenders } from 'src/shared/components/dataTable/dataTableFilterRenders';
import { Button } from 'src/shared/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/shared/components/ui/form';
import { AppContext } from 'src/shared/controller/appContext';
import { getZodErrorMap } from 'src/translation/getZodErrorMap';
import { z } from 'zod';
import DateTimePickerRangeInput from 'src/shared/components/form/DateTimePickerRangeInput';
import { saleEnumerators } from 'src/features/sale/saleEnumerators';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import SelectInput from 'src/shared/components/form/SelectInput';
import RangeInput from 'src/shared/components/form/RangeInput';

const emptyValues = {
  date1Range: [],
  fuelType: null,
  litresRange: [],
  rateRange: [],
  totalRange: [],
  paymode: null,
  cashAmountRange: [],
  mpesaAmountRange: [],
  invoiceAmountRange: [],
  customer: null,
  station: null,
};

function SaleListFilter({
  context,
  isLoading,
}: {
  context: AppContext;
  isLoading: boolean;
}) {
  const { dictionary, locale } = context;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState(false);

  z.setErrorMap(getZodErrorMap(locale));

  const previewRenders = {
    date1Range: {
      label: dictionary.sale.fields.date1,
      render: dataTableFilterRenders(context).dateTimeRange(),
    },
    fuelType: {
      label: dictionary.sale.fields.fuelType,
      render: dataTableFilterRenders(context).enumerator(
        dictionary.sale.enumerators.fuelType,
      ),
    },
    litresRange: {
      label: dictionary.sale.fields.litres,
      render: dataTableFilterRenders(context).decimalRange(),
    },
    rateRange: {
      label: dictionary.sale.fields.rate,
      render: dataTableFilterRenders(context).decimalRange(),
    },
    totalRange: {
      label: dictionary.sale.fields.total,
      render: dataTableFilterRenders(context).decimalRange(),
    },
    paymode: {
      label: dictionary.sale.fields.paymode,
      render: dataTableFilterRenders(context).enumerator(
        dictionary.sale.enumerators.paymode,
      ),
    },
    cashAmountRange: {
      label: dictionary.sale.fields.cashAmount,
      render: dataTableFilterRenders(context).decimalRange(),
    },
    mpesaAmountRange: {
      label: dictionary.sale.fields.mpesaAmount,
      render: dataTableFilterRenders(context).decimalRange(),
    },
    invoiceAmountRange: {
      label: dictionary.sale.fields.invoiceAmount,
      render: dataTableFilterRenders(context).decimalRange(),
    },
  };

  const filter = useMemo(
    () =>
      DataTableQueryParams.getFilter<z.infer<typeof saleFilterFormSchema>>(
        searchParams,
        saleFilterFormSchema,
      ),
    [searchParams],
  );

  const form = useForm({
    resolver: zodResolver(saleFilterFormSchema),
    mode: 'onSubmit',
    defaultValues: filter,
  });

  useEffect(() => {
    form.reset({ ...emptyValues, ...filter } as z.infer<
      typeof saleFilterFormSchema
    >);
  }, [filter, form]);

  const onRemove = (key: string) => {
    DataTableQueryParams.onFilterChange(
      { ...filter, [key]: undefined },
      router,
      searchParams,
    );
  };

  const onSubmit = (data: any) => {
    DataTableQueryParams.onFilterChange(data, router, searchParams);
    setExpanded(false);
  };

  const doReset = () => {
    DataTableQueryParams.onFilterChange({}, router, searchParams);
    setExpanded(false);
  };

  return (
    <div className="rounded-md border">
      <FilterPreview
        onClick={() => {
          setExpanded(!expanded);
        }}
        renders={previewRenders}
        values={filter}
        expanded={expanded}
        onRemove={onRemove}
        dictionary={dictionary}
      />
      <div className={cn(expanded ? 'block' : 'hidden', 'p-4')}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="date1Range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {dictionary.sale.fields.date1}
                    </FormLabel>
                    <DateTimePickerRangeInput
                      dictionary={dictionary}
                      locale={locale}
                      disabled={isLoading}
                      isClearable={true}
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fuelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.sale.fields.fuelType}</FormLabel>
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
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="litresRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.sale.fields.litres}</FormLabel>
                    <RangeInput
                      type="text"
                      dictionary={dictionary}
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rateRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.sale.fields.rate}</FormLabel>
                    <RangeInput
                      type="text"
                      dictionary={dictionary}
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.sale.fields.total}</FormLabel>
                    <RangeInput
                      type="text"
                      dictionary={dictionary}
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.sale.fields.paymode}</FormLabel>
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
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cashAmountRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.sale.fields.cashAmount}</FormLabel>
                    <RangeInput
                      type="text"
                      dictionary={dictionary}
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mpesaAmountRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.sale.fields.mpesaAmount}</FormLabel>
                    <RangeInput
                      type="text"
                      dictionary={dictionary}
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="invoiceAmountRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.sale.fields.invoiceAmount}</FormLabel>
                    <RangeInput
                      type="text"
                      dictionary={dictionary}
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button disabled={isLoading} type="submit" size={'sm'}>
                {isLoading ? (
                  <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LuSearch className="mr-2 h-4 w-4" />
                )}
                {dictionary.shared.search}
              </Button>

              <Button
                disabled={isLoading}
                type="button"
                variant={'secondary'}
                onClick={doReset}
                size={'sm'}
              >
                <RxReset className="mr-2 h-4 w-4" />
                {dictionary.shared.reset}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SaleListFilter;


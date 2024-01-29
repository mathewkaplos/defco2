import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuLoader2, LuSearch } from 'react-icons/lu';
import { RxReset } from 'react-icons/rx';
import { voucherFilterFormSchema } from 'src/features/voucher/voucherSchemas';
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
import DatePickerRangeInput from 'src/shared/components/form/DatePickerRangeInput';
import { Input } from 'src/shared/components/ui/input';
import RangeInput from 'src/shared/components/form/RangeInput';

const emptyValues = {
  date1Range: [],
  voucherNo: '',
  indentNo: '',
  approvedBy: '',
  qtyRange: [],
  amountRange: [],
  customer: null,
  vehicle: null,
};

function VoucherListFilter({
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
      label: dictionary.voucher.fields.date1,
      render: dataTableFilterRenders(context).dateRange(),
    },
    voucherNo: {
      label: dictionary.voucher.fields.voucherNo,
    },
    indentNo: {
      label: dictionary.voucher.fields.indentNo,
    },
    approvedBy: {
      label: dictionary.voucher.fields.approvedBy,
    },
    qtyRange: {
      label: dictionary.voucher.fields.qty,
      render: dataTableFilterRenders(context).decimalRange(),
    },
    amountRange: {
      label: dictionary.voucher.fields.amount,
      render: dataTableFilterRenders(context).decimalRange(),
    },
  };

  const filter = useMemo(
    () =>
      DataTableQueryParams.getFilter<z.infer<typeof voucherFilterFormSchema>>(
        searchParams,
        voucherFilterFormSchema,
      ),
    [searchParams],
  );

  const form = useForm({
    resolver: zodResolver(voucherFilterFormSchema),
    mode: 'onSubmit',
    defaultValues: filter,
  });

  useEffect(() => {
    form.reset({ ...emptyValues, ...filter } as z.infer<
      typeof voucherFilterFormSchema
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
                      {dictionary.voucher.fields.date1}
                    </FormLabel>
                    <DatePickerRangeInput
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
                name="voucherNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.voucher.fields.voucherNo}</FormLabel>
                    <Input disabled={isLoading} {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="indentNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.voucher.fields.indentNo}</FormLabel>
                    <Input disabled={isLoading} {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="approvedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.voucher.fields.approvedBy}</FormLabel>
                    <Input disabled={isLoading} {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="qtyRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.voucher.fields.qty}</FormLabel>
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
                name="amountRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.voucher.fields.amount}</FormLabel>
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

export default VoucherListFilter;


'use client';

import { useQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { MaterialReceiptActions } from 'src/features/materialReceipt/components/MaterialReceiptActions';
import MaterialReceiptListActions from 'src/features/materialReceipt/components/MaterialReceiptListActions';
import MaterialReceiptListFilter from 'src/features/materialReceipt/components/MaterialReceiptListFilter';
import { materialReceiptFindManyApiCall } from 'src/features/materialReceipt/materialReceiptApiCalls';
import {
  MaterialReceiptWithRelationships,
  materialReceiptFilterInputSchema,
} from 'src/features/materialReceipt/materialReceiptSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import DataTable from 'src/shared/components/dataTable/DataTable';
import { DataTableColumnIds } from 'src/shared/components/dataTable/DataTableColumnHeader';
import { DataTablePagination } from 'src/shared/components/dataTable/DataTablePagination';
import { DataTableQueryParams } from 'src/shared/components/dataTable/DataTableQueryParams';
import { dataTableHeader } from 'src/shared/components/dataTable/dataTableHeader';
import { dataTablePageCount } from 'src/shared/components/dataTable/dataTablePageCount';
import { dataTableSortToPrisma } from 'src/shared/components/dataTable/dataTableSortToPrisma';
import { Checkbox } from 'src/shared/components/ui/checkbox';
import { AppContext } from 'src/shared/controller/appContext';
import { MaterialReceiptNewButton } from 'src/features/materialReceipt/components/MaterialReceiptNewButton';
import { z } from 'zod';
import { formatDate } from 'src/shared/lib/formatDate';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { MaterialReceipt } from '@prisma/client';

const defaultData: Array<any> = [];

export default function MaterialReceiptList({ context }: { context: AppContext }) {
  const { dictionary } = context;
  const router = useRouter();
  const searchParams = useSearchParams();

  const sorting = useMemo(() => {
    return DataTableQueryParams.getSorting(searchParams);
  }, [searchParams]);

  const pagination = useMemo(() => {
    return DataTableQueryParams.getPagination(searchParams);
  }, [searchParams]);

  const filter = useMemo(() => {
    return DataTableQueryParams.getFilter<
      z.input<typeof materialReceiptFilterInputSchema>
    >(searchParams, materialReceiptFilterInputSchema);
  }, [searchParams]);

  const columns: ColumnDef<MaterialReceiptWithRelationships>[] = [
    {
      id: DataTableColumnIds.select,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label={dictionary.shared.dataTable.selectAll}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={dictionary.shared.dataTable.selectRow}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'date1',
      meta: {
        title: dictionary.materialReceipt.fields.date1,
      },
      cell: ({ row }) => (
        <span className="whitespace-nowrap">
          {formatDate(row.getValue('date1'), dictionary)}
        </span>
      ),
    },
    {
      accessorKey: 'supplier',
      meta: {
        title: dictionary.materialReceipt.fields.supplier,
      },
    },
    {
      accessorKey: 'quantity',
      meta: {
        title: dictionary.materialReceipt.fields.quantity,
      },
      header: dataTableHeader('right', dictionary),
      cell: ({ getValue }) => {
        return (
          <div className="whitespace-nowrap text-right">
            {getValue() as string}
          </div>
        );
      },
    },
    {
      accessorKey: 'price',
      meta: {
        title: dictionary.materialReceipt.fields.price,
      },
      header: dataTableHeader('right', dictionary),
      cell: ({ getValue }) => {
        return (
          <div className="whitespace-nowrap text-right">
            {formatDecimal(getValue() as string, context.locale, 2)}
          </div>
        );
      },
    },
    {
      accessorKey: 'total',
      meta: {
        title: dictionary.materialReceipt.fields.total,
      },
      header: dataTableHeader('right', dictionary),
      cell: ({ getValue }) => {
        return (
          <div className="whitespace-nowrap text-right">
            {formatDecimal(getValue() as string, context.locale, 2)}
          </div>
        );
      },
    },
    {
      id: DataTableColumnIds.actions,
      meta: {
        sticky: true
      },
      cell: ({ row }) => (
        <MaterialReceiptActions
          mode="table"
          materialReceipt={row.original}
          context={context}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const query = useQuery({
    queryKey: ['materialReceipt', 'list', filter, sorting, pagination],
    queryFn: async ({ signal }) => {
      return materialReceiptFindManyApiCall(
        {
          filter: filter,
          skip: pagination.pageIndex * pagination.pageSize,
          take: pagination.pageSize,
          orderBy: dataTableSortToPrisma(sorting),
        },
        signal,
      );
    },
  });

  const table = useReactTable({
    getRowId: ({ originalRow, index }) => originalRow?.id || index,
    data: query.data?.materialReceipts || defaultData,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      header: dataTableHeader('left', dictionary),
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{getValue() as string}</span>
      ),
    },
    state: {
      sorting,
      pagination,
    },
    onSortingChange: DataTableQueryParams.onSortingChange(
      sorting,
      router,
      searchParams,
    ),
    onPaginationChange: DataTableQueryParams.onPaginationChange(
      pagination,
      router,
      searchParams,
    ),
    manualSorting: true,
    manualPagination: true,
    pageCount: dataTablePageCount(query.data?.count, pagination),
    meta: {
      count: query.data?.count,
    },
  });

  return (
    <div className="mb-4 flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[[dictionary.materialReceipt.list.menu]]} />
        <div className="flex gap-2">
          <MaterialReceiptListActions
            filter={filter}
            sorting={sorting}
            count={query.data?.count}
            table={table}
            context={context}
          />
        </div>
      </div>

      <MaterialReceiptListFilter context={context} isLoading={query.isLoading} />

      <DataTable
        table={table}
        isLoading={query.isLoading}
        columns={columns}
        dictionary={dictionary}
        notFoundText={dictionary.materialReceipt.list.noResults}
        newButton={<MaterialReceiptNewButton context={context} />}
      />

      <DataTablePagination table={table} />
    </div>
  );
}

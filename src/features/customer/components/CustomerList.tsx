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
import { CustomerActions } from 'src/features/customer/components/CustomerActions';
import CustomerListActions from 'src/features/customer/components/CustomerListActions';
import CustomerListFilter from 'src/features/customer/components/CustomerListFilter';
import { customerFindManyApiCall } from 'src/features/customer/customerApiCalls';
import {
  CustomerWithRelationships,
  customerFilterInputSchema,
} from 'src/features/customer/customerSchemas';
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
import { CustomerNewButton } from 'src/features/customer/components/CustomerNewButton';
import { z } from 'zod';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { Customer } from '@prisma/client';

const defaultData: Array<any> = [];

export default function CustomerList({ context }: { context: AppContext }) {
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
      z.input<typeof customerFilterInputSchema>
    >(searchParams, customerFilterInputSchema);
  }, [searchParams]);

  const columns: ColumnDef<CustomerWithRelationships>[] = [
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
      accessorKey: 'firstName',
      meta: {
        title: dictionary.customer.fields.firstName,
      },
      cell: ({ getValue, row }) => (
        <span className="whitespace-nowrap">
          <Link
            className="text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400"
            href={`/customer/${row?.original?.id}`}
            prefetch={false}
          >
            {getValue() as string}
          </Link>
        </span>
      ),
    },
    {
      accessorKey: 'lastName',
      meta: {
        title: dictionary.customer.fields.lastName,
      },
    },
    {
      accessorKey: 'otherNames',
      meta: {
        title: dictionary.customer.fields.otherNames,
      },
    },
    {
      accessorKey: 'gender',
      meta: {
        title: dictionary.customer.fields.gender,
      },
      cell: ({ row }) => {
        return enumeratorLabel(
          dictionary.customer.enumerators.gender,
          row.getValue('gender'),
        );
      },
    },
    {
      accessorKey: 'serviceNo',
      meta: {
        title: dictionary.customer.fields.serviceNo,
      },
    },
    {
      accessorKey: 'entitledCards',
      meta: {
        title: dictionary.customer.fields.entitledCards,
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
      accessorKey: 'status',
      meta: {
        title: dictionary.customer.fields.status,
      },
      cell: ({ row }) => {
        return enumeratorLabel(
          dictionary.customer.enumerators.status,
          row.getValue('status'),
        );
      },
    },
    {
      id: DataTableColumnIds.actions,
      meta: {
        sticky: true
      },
      cell: ({ row }) => (
        <CustomerActions
          mode="table"
          customer={row.original}
          context={context}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const query = useQuery({
    queryKey: ['customer', 'list', filter, sorting, pagination],
    queryFn: async ({ signal }) => {
      return customerFindManyApiCall(
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
    data: query.data?.customers || defaultData,
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
        <Breadcrumb items={[[dictionary.customer.list.menu]]} />
        <div className="flex gap-2">
          <CustomerListActions
            filter={filter}
            sorting={sorting}
            count={query.data?.count}
            table={table}
            context={context}
          />
        </div>
      </div>

      <CustomerListFilter context={context} isLoading={query.isLoading} />

      <DataTable
        table={table}
        isLoading={query.isLoading}
        columns={columns}
        dictionary={dictionary}
        notFoundText={dictionary.customer.list.noResults}
        newButton={<CustomerNewButton context={context} />}
      />

      <DataTablePagination table={table} />
    </div>
  );
}

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
import { CardActions } from 'src/features/card/components/CardActions';
import CardListActions from 'src/features/card/components/CardListActions';
import CardListFilter from 'src/features/card/components/CardListFilter';
import { cardFindManyApiCall } from 'src/features/card/cardApiCalls';
import {
  CardWithRelationships,
  cardFilterInputSchema,
} from 'src/features/card/cardSchemas';
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
import { CardNewButton } from 'src/features/card/components/CardNewButton';
import { z } from 'zod';
import { formatDate } from 'src/shared/lib/formatDate';
import { Card } from '@prisma/client';

const defaultData: Array<any> = [];

export default function CardList({ context }: { context: AppContext }) {
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
      z.input<typeof cardFilterInputSchema>
    >(searchParams, cardFilterInputSchema);
  }, [searchParams]);

  const columns: ColumnDef<CardWithRelationships>[] = [
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
      accessorKey: 'cardNo',
      meta: {
        title: dictionary.card.fields.cardNo,
      },
      cell: ({ getValue, row }) => (
        <span className="whitespace-nowrap">
          <Link
            className="text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400"
            href={`/card/${row?.original?.id}`}
            prefetch={false}
          >
            {getValue() as string}
          </Link>
        </span>
      ),
    },
    {
      accessorKey: 'isActive',
      meta: {
        title: dictionary.card.fields.isActive,
      },
      cell: ({ row }) => {
        return row.getValue('isActive')
          ? dictionary.shared.yes
          : dictionary.shared.no;
      },
    },
    {
      accessorKey: 'issueDate',
      meta: {
        title: dictionary.card.fields.issueDate,
      },
      cell: ({ row }) => (
        <span className="whitespace-nowrap">
          {formatDate(row.getValue('issueDate'), dictionary)}
        </span>
      ),
    },
    {
      accessorKey: 'deactivationDate',
      meta: {
        title: dictionary.card.fields.deactivationDate,
      },
      cell: ({ row }) => (
        <span className="whitespace-nowrap">
          {formatDate(row.getValue('deactivationDate'), dictionary)}
        </span>
      ),
    },
    {
      id: DataTableColumnIds.actions,
      meta: {
        sticky: true
      },
      cell: ({ row }) => (
        <CardActions
          mode="table"
          card={row.original}
          context={context}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const query = useQuery({
    queryKey: ['card', 'list', filter, sorting, pagination],
    queryFn: async ({ signal }) => {
      return cardFindManyApiCall(
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
    data: query.data?.cards || defaultData,
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
        <Breadcrumb items={[[dictionary.card.list.menu]]} />
        <div className="flex gap-2">
          <CardListActions
            filter={filter}
            sorting={sorting}
            count={query.data?.count}
            table={table}
            context={context}
          />
        </div>
      </div>

      <CardListFilter context={context} isLoading={query.isLoading} />

      <DataTable
        table={table}
        isLoading={query.isLoading}
        columns={columns}
        dictionary={dictionary}
        notFoundText={dictionary.card.list.noResults}
        newButton={<CardNewButton context={context} />}
      />

      <DataTablePagination table={table} />
    </div>
  );
}

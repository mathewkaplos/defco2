import { Rank } from '@prisma/client';
import { useState } from 'react';
import { LuFileEdit, LuPlus } from 'react-icons/lu';
import { rankAutocompleteApiCall } from 'src/features/rank/rankApiCalls';
import { rankLabel } from 'src/features/rank/rankLabel';
import { RankFormSheet } from 'src/features/rank/components/RankFormSheet';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import AutocompleteInput from 'src/shared/components/form/AutocompleteInput';
import { Button } from 'src/shared/components/ui/button';

export function RankAutocompleteInput({
  onChange,
  value,
  selectPlaceholder,
  searchPlaceholder,
  notFoundPlaceholder,
  isClearable,
  mode,
  disabled,
  context,
  hideFormButton,
  dataTestid,
}: {
  onChange: (value: Partial<Rank> | undefined | null) => void;
  value?: Partial<Rank> | null;
  selectPlaceholder?: string;
  searchPlaceholder?: string;
  notFoundPlaceholder?: string;
  isClearable?: boolean;
  mode: 'memory' | 'async';
  disabled?: boolean;
  context: AppContext;
  hideFormButton?: boolean;
  dataTestid?: string;
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const hasPermissionToCreate = hasPermission(
    permissions.rankCreate,
    context,
  );
  const hasPermissionToEdit = hasPermission(
    permissions.rankUpdate,
    context,
  );

  const queryFn = (
    search?: string,
    exclude?: Array<string>,
    signal?: AbortSignal,
  ) => {
    return rankAutocompleteApiCall(
      {
        search,
        exclude,
        take: mode === 'async' ? 10 : undefined,
      },
      signal,
    );
  };

  return (
    <div className="flex w-full gap-1">
      <div className="flex-1">
        <AutocompleteInput
          queryFn={queryFn}
          dictionary={context.dictionary}
          queryId={['rank', 'autocomplete']}
          isClearable={isClearable}
          labelFn={rankLabel}
          notFoundPlaceholder={notFoundPlaceholder}
          onChange={onChange}
          searchPlaceholder={searchPlaceholder}
          selectPlaceholder={selectPlaceholder}
          value={value}
          mode={mode}
          disabled={disabled}
          dataTestid={dataTestid}
        />
      </div>

      {hasPermissionToCreate && !value && !hideFormButton && (
        <Button
          type="button"
          variant="secondary"
          size={'icon'}
          onClick={() => setIsFormOpen(true)}
          title={context.dictionary.shared.new}
          disabled={disabled}
        >
          <LuPlus className="h-4 w-4" />
        </Button>
      )}

      {hasPermissionToEdit && Boolean(value) && !hideFormButton && (
        <Button
          type="button"
          variant="secondary"
          size={'icon'}
          onClick={() => setIsFormOpen(true)}
          title={context.dictionary.shared.edit}
          disabled={disabled}
        >
          <LuFileEdit className="h-4 w-4" />
        </Button>
      )}

      {isFormOpen && (
        <RankFormSheet
          onCancel={() => setIsFormOpen(false)}
          onSuccess={(rank) => {
            setIsFormOpen(false);
            onChange(rank);
          }}
          context={context}
          rank={value ? value : undefined}
        />
      )}
    </div>
  );
}
